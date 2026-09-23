"""
MkDocs hook: Auto-generate graph.json with both Directory and Assembly views.

Regenerates docs/graph/graph.json on every build with two datasets:
- directory: Folder tree containment (folders + files, parent→child edges)
- assembly: BOM relationships (design nodes only, uses/used_in edges)

The client switches between modes via a dropdown.
"""

import json
import logging
import os
import re
from pathlib import Path

log = logging.getLogger('mkdocs.plugins.graph_hooks')

HUB_PAGES_TO_EXCLUDE = {
    'shortlink index',
    'shortlinks',
    'bom assemblies index',
    'bom / uses index',
    'bom-uses',
    'graph-edges index',
    'migration-candidates',
    'migration candidates',
    'harvest-leftovers',
    'leftovers',
    'hub-projects',
}


def extract_frontmatter(content: str) -> dict | None:
    """Extract YAML frontmatter from markdown content."""
    if not content.startswith('---'):
        return None
    
    end_match = re.search(r'\n---\s*\n', content[3:])
    if not end_match:
        return None
    
    yaml_text = content[3:end_match.start() + 3]
    
    try:
        import yaml
        return yaml.safe_load(yaml_text)
    except Exception as e:
        log.warning(f"Failed to parse frontmatter: {e}")
        return None


def is_hub_page(name: str) -> bool:
    """Check if a name corresponds to a hub/index page that should be excluded."""
    if not name:
        return False
    normalized = name.lower().strip()
    return normalized in HUB_PAGES_TO_EXCLUDE


def generate_directory_graph(docs_dir: Path) -> dict:
    """
    Walk the designs directory tree and build a folder-tree graph.
    
    Returns:
        dict with 'nodes' and 'edges' arrays:
        - Nodes: folders and files with type='folder' or type='file'
        - Edges: parent-folder → child (containment only)
    """
    designs_dir = docs_dir / 'designs'
    if not designs_dir.exists():
        log.warning(f"Designs directory not found: {designs_dir}")
        return {'nodes': [], 'edges': []}
    
    nodes = {}
    edges = []
    
    def ensure_folder_chain(rel_path: str):
        """Ensure all parent folders exist as nodes with edges."""
        parts = rel_path.split('/')
        for i in range(len(parts)):
            folder_path = '/'.join(parts[:i+1])
            if folder_path and folder_path not in nodes:
                folder_name = parts[i]
                nodes[folder_path] = {
                    'id': folder_path,
                    'name': folder_name,
                    'type': 'folder',
                    'shortlink': '',
                    'depth': i,
                    'children_count': 0,
                }
            
            if i > 0:
                parent_path = '/'.join(parts[:i])
                if parent_path in nodes:
                    nodes[parent_path]['children_count'] += 1
                
                edge_key = (parent_path, folder_path)
                if edge_key not in [(e['source'], e['target']) for e in edges]:
                    edges.append({
                        'source': parent_path,
                        'target': folder_path,
                        'type': 'contains'
                    })
    
    for item in sorted(designs_dir.rglob('*')):
        rel_path = str(item.relative_to(designs_dir)).replace(os.sep, '/')
        
        if item.is_dir():
            ensure_folder_chain(rel_path)
        
        elif item.is_file() and item.suffix == '.md':
            file_rel_path = rel_path[:-3]
            
            parent_dir = str(item.parent.relative_to(designs_dir)).replace(os.sep, '/')
            if parent_dir == '.':
                parent_dir = ''
            
            if parent_dir:
                ensure_folder_chain(parent_dir)
            
            file_name = item.stem
            shortlink = ''
            
            try:
                content = item.read_text(encoding='utf-8')
                fm = extract_frontmatter(content)
                if fm:
                    file_name = fm.get('name', file_name)
                    shortlink = fm.get('shortlink', '')
            except Exception as e:
                log.warning(f"Failed to read {item}: {e}")
            
            if parent_dir:
                file_depth = parent_dir.count('/') + 1
            else:
                file_depth = 1
            
            nodes[file_rel_path] = {
                'id': file_rel_path,
                'name': file_name,
                'type': 'file',
                'shortlink': shortlink,
                'depth': file_depth,
                'children_count': 0,
            }
            
            if parent_dir:
                if parent_dir in nodes:
                    nodes[parent_dir]['children_count'] += 1
                edges.append({
                    'source': parent_dir,
                    'target': file_rel_path,
                    'type': 'contains'
                })
            else:
                edges.append({
                    'source': '__root__',
                    'target': file_rel_path,
                    'type': 'contains'
                })
                if '__root__' not in nodes:
                    nodes['__root__'] = {
                        'id': '__root__',
                        'name': 'designs',
                        'type': 'folder',
                        'shortlink': '',
                        'depth': 0,
                        'children_count': 0,
                    }
                nodes['__root__']['children_count'] += 1
    
    for folder_path in [p for p in nodes if nodes[p]['type'] == 'folder']:
        parts = folder_path.split('/')
        if len(parts) == 1 and folder_path != '__root__':
            if '__root__' not in nodes:
                nodes['__root__'] = {
                    'id': '__root__',
                    'name': 'designs',
                    'type': 'folder',
                    'shortlink': '',
                    'depth': 0,
                    'children_count': 0,
                }
            edge_key = ('__root__', folder_path)
            if edge_key not in [(e['source'], e['target']) for e in edges]:
                edges.append({
                    'source': '__root__',
                    'target': folder_path,
                    'type': 'contains'
                })
                nodes['__root__']['children_count'] += 1
    
    node_list = sorted(nodes.values(), key=lambda n: n['id'])
    edge_list = sorted(edges, key=lambda e: (e['source'], e['target']))
    
    unique_edges = []
    seen = set()
    for e in edge_list:
        key = (e['source'], e['target'])
        if key not in seen:
            seen.add(key)
            unique_edges.append(e)
    
    return {'nodes': node_list, 'edges': unique_edges}


def extract_main_folder(path_str: str) -> str:
    """Extract the first path segment (main folder) from a path like 'a-0010-iair6/parts/foo'."""
    if not path_str:
        return ''
    parts = path_str.split('/')
    return parts[0] if parts else ''


def generate_assembly_graph(docs_dir: Path) -> dict:
    """
    Scan design pages and build BOM relationship graph (assembly→part edges).
    
    CRITICAL: Nodes are keyed by file path (unique), not Fusion display name.
    This ensures distinct designs with identical names appear as separate nodes.
    
    Edge resolution for bare name refs:
    - If exactly one path matches the name: resolve to that path
    - If multiple paths share the name: resolve only if source is in the same project
    - Otherwise: leave unresolved (logged) — never invent false BOM edges
    
    Returns:
        dict with 'nodes' and 'edges' arrays:
        - Nodes: design files keyed by path, with name, display_name (when needed),
                 shortlink, project, uses_count, used_in_count
        - Edges: assembly→part uses relationships (resolved by path)
    """
    designs_dir = docs_dir / 'designs'
    if not designs_dir.exists():
        log.warning(f"Designs directory not found: {designs_dir}")
        return {'nodes': [], 'edges': []}
    
    nodes_by_path = {}
    name_to_paths = {}
    
    for md_file in designs_dir.rglob('*.md'):
        try:
            content = md_file.read_text(encoding='utf-8')
        except Exception as e:
            log.warning(f"Failed to read {md_file}: {e}")
            continue
        
        fm = extract_frontmatter(content)
        if not fm:
            continue
        
        name = fm.get('name', '')
        if not name or is_hub_page(name):
            continue
        
        shortlink = fm.get('shortlink', '')
        uses_refs = fm.get('uses', []) or []
        used_in_refs = fm.get('used_in', []) or []
        
        relative_path = md_file.relative_to(designs_dir)
        path_str = str(relative_path.with_suffix('')).replace(os.sep, '/')
        main_folder = extract_main_folder(path_str)
        
        nodes_by_path[path_str] = {
            'id': path_str,
            'name': name,
            'shortlink': shortlink,
            'path': path_str,
            'project': main_folder,
            '_uses_refs': [r for r in uses_refs if r and not is_hub_page(r)],
            '_used_in_refs': [r for r in used_in_refs if r and not is_hub_page(r)],
            '_uses_paths': set(),
            '_used_in_paths': set(),
        }
        
        if name not in name_to_paths:
            name_to_paths[name] = []
        name_to_paths[name].append(path_str)
    
    def resolve_ref(ref_name: str, source_path: str) -> list:
        """
        Resolve a bare Fusion name ref to path(s).
        
        Returns list of target paths. May be empty if unresolvable.
        """
        candidate_paths = name_to_paths.get(ref_name, [])
        
        if len(candidate_paths) == 0:
            return []
        
        if len(candidate_paths) == 1:
            return candidate_paths
        
        source_project = extract_main_folder(source_path)
        same_project = [p for p in candidate_paths if extract_main_folder(p) == source_project]
        
        if len(same_project) == 1:
            return same_project
        
        if len(same_project) > 1:
            log.debug(f"Ambiguous ref '{ref_name}' from {source_path}: {len(same_project)} same-project matches, skipping")
            return []
        
        log.debug(f"Ambiguous ref '{ref_name}' from {source_path}: {len(candidate_paths)} matches across projects, skipping")
        return []
    
    for path_str, node in nodes_by_path.items():
        for ref_name in node['_uses_refs']:
            target_paths = resolve_ref(ref_name, path_str)
            for target_path in target_paths:
                if target_path != path_str:
                    node['_uses_paths'].add(target_path)
                    if target_path in nodes_by_path:
                        nodes_by_path[target_path]['_used_in_paths'].add(path_str)
        
        for ref_name in node['_used_in_refs']:
            source_paths = resolve_ref(ref_name, path_str)
            for source_path in source_paths:
                if source_path != path_str:
                    node['_used_in_paths'].add(source_path)
                    if source_path in nodes_by_path:
                        nodes_by_path[source_path]['_uses_paths'].add(path_str)
    
    def compute_display_name(name: str, path: str) -> str:
        """
        Generate display name. Only add path disambiguation when names collide.
        """
        paths_with_name = name_to_paths.get(name, [])
        if len(paths_with_name) <= 1:
            return name
        
        project = extract_main_folder(path)
        if project:
            if project == '00-parts':
                return f"{name} · 00-Parts"
            return f"{name} · {project.upper()}"
        return name
    
    edges = []
    seen_edges = set()
    for path_str, node in nodes_by_path.items():
        for target_path in node['_uses_paths']:
            edge_key = (path_str, target_path)
            if edge_key not in seen_edges:
                seen_edges.add(edge_key)
                edges.append({
                    'source': path_str,
                    'target': target_path,
                    'type': 'uses'
                })
    
    nodes = []
    for path_str, node in nodes_by_path.items():
        display_name = compute_display_name(node['name'], path_str)
        node_data = {
            'id': path_str,
            'name': node['name'],
            'shortlink': node['shortlink'],
            'path': path_str,
            'project': node['project'],
            'uses_count': len(node['_uses_paths']),
            'used_in_count': len(node['_used_in_paths']),
        }
        if display_name != node['name']:
            node_data['display_name'] = display_name
        nodes.append(node_data)
    
    nodes.sort(key=lambda n: n['id'])
    edges.sort(key=lambda e: (e['source'], e['target']))
    
    return {'nodes': nodes, 'edges': edges}


def on_pre_build(config, **kwargs):
    """
    MkDocs hook: regenerate graph.json before each build.
    
    Emits both directory and assembly datasets for client-side mode switching.
    """
    docs_dir = Path(config['docs_dir'])
    graph_dir = docs_dir / 'graph'
    graph_json_path = graph_dir / 'graph.json'
    
    graph_dir.mkdir(parents=True, exist_ok=True)
    
    log.info("Generating graph.json (directory + assembly modes)...")
    
    directory_data = generate_directory_graph(docs_dir)
    assembly_data = generate_assembly_graph(docs_dir)
    
    combined = {
        'directory': directory_data,
        'assembly': assembly_data,
    }
    
    with open(graph_json_path, 'w', encoding='utf-8') as f:
        json.dump(combined, f, indent=2, ensure_ascii=False)
    
    dir_folders = sum(1 for n in directory_data['nodes'] if n['type'] == 'folder')
    dir_files = sum(1 for n in directory_data['nodes'] if n['type'] == 'file')
    dir_edges = len(directory_data['edges'])
    asm_nodes = len(assembly_data['nodes'])
    asm_edges = len(assembly_data['edges'])
    
    log.info(f"Directory mode: {dir_folders} folders, {dir_files} files, {dir_edges} edges")
    log.info(f"Assembly mode: {asm_nodes} designs, {asm_edges} uses edges")
    
    return config

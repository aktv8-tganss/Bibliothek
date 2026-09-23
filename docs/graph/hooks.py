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
    
    Returns:
        dict with 'nodes' and 'edges' arrays:
        - Nodes: design files only (no folders), with uses_count, used_in_count, and project
        - Edges: assembly→part uses relationships
    """
    designs_dir = docs_dir / 'designs'
    if not designs_dir.exists():
        log.warning(f"Designs directory not found: {designs_dir}")
        return {'nodes': [], 'edges': []}
    
    nodes_map = {}
    edges = []
    
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
        uses = fm.get('uses', []) or []
        used_in = fm.get('used_in', []) or []
        
        relative_path = md_file.relative_to(designs_dir)
        path_str = str(relative_path.with_suffix('')).replace(os.sep, '/')
        main_folder = extract_main_folder(path_str)
        
        if name not in nodes_map:
            nodes_map[name] = {
                'id': name,
                'shortlink': shortlink,
                'path': path_str,
                'project': main_folder,
                'uses_count': 0,
                'used_in_count': 0,
                '_uses': set(),
                '_used_in': set(),
            }
        else:
            if shortlink and not nodes_map[name]['shortlink']:
                nodes_map[name]['shortlink'] = shortlink
            if path_str and not nodes_map[name]['path']:
                nodes_map[name]['path'] = path_str
            if main_folder and not nodes_map[name].get('project'):
                nodes_map[name]['project'] = main_folder
        
        for ref in uses:
            if ref and not is_hub_page(ref):
                nodes_map[name]['_uses'].add(ref)
                if ref not in nodes_map:
                    nodes_map[ref] = {
                        'id': ref,
                        'shortlink': '',
                        'path': '',
                        'project': '',
                        'uses_count': 0,
                        'used_in_count': 0,
                        '_uses': set(),
                        '_used_in': set(),
                    }
                nodes_map[ref]['_used_in'].add(name)
        
        for ref in used_in:
            if ref and not is_hub_page(ref):
                nodes_map[name]['_used_in'].add(ref)
                if ref not in nodes_map:
                    nodes_map[ref] = {
                        'id': ref,
                        'shortlink': '',
                        'path': '',
                        'project': '',
                        'uses_count': 0,
                        'used_in_count': 0,
                        '_uses': set(),
                        '_used_in': set(),
                    }
                nodes_map[ref]['_uses'].add(name)
    
    for node_id, node in nodes_map.items():
        node['uses_count'] = len(node['_uses'])
        node['used_in_count'] = len(node['_used_in'])
        
        for target in node['_uses']:
            edges.append({
                'source': node_id,
                'target': target,
                'type': 'uses'
            })
    
    nodes = []
    for node in nodes_map.values():
        nodes.append({
            'id': node['id'],
            'shortlink': node['shortlink'],
            'path': node['path'],
            'project': node.get('project', ''),
            'uses_count': node['uses_count'],
            'used_in_count': node['used_in_count'],
        })
    
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

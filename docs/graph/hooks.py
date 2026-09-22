"""
MkDocs hook: Auto-generate graph.json from design library folder tree.

Regenerates docs/graph/graph.json on every build by walking the docs/designs/**
directory tree. Creates folder and file nodes with parent→child containment edges.

This is a FOLDER TREE view (containment only), NOT a BOM Uses/Used In view.
"""

import json
import logging
import os
import re
from pathlib import Path

log = logging.getLogger('mkdocs.plugins.graph_hooks')


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


def generate_folder_tree_graph(docs_dir: Path) -> dict:
    """
    Walk the designs directory tree and build a folder-tree graph.
    
    Returns:
        dict with 'nodes' and 'edges' arrays:
        - Nodes: folders and files with type='folder' or type='file'
        - Edges: parent-folder → child (containment only, no BOM edges)
    """
    designs_dir = docs_dir / 'designs'
    if not designs_dir.exists():
        log.warning(f"Designs directory not found: {designs_dir}")
        return {'nodes': [], 'edges': []}
    
    nodes = {}
    edges = []
    
    def get_node_id(rel_path: str) -> str:
        """Generate a stable node ID from relative path."""
        return rel_path
    
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


def on_pre_build(config, **kwargs):
    """
    MkDocs hook: regenerate graph.json before each build.
    
    This ensures the graph always reflects the current design library folder tree.
    """
    docs_dir = Path(config['docs_dir'])
    graph_dir = docs_dir / 'graph'
    graph_json_path = graph_dir / 'graph.json'
    
    graph_dir.mkdir(parents=True, exist_ok=True)
    
    log.info("Generating graph.json from folder tree...")
    
    graph_data = generate_folder_tree_graph(docs_dir)
    
    with open(graph_json_path, 'w', encoding='utf-8') as f:
        json.dump(graph_data, f, indent=2, ensure_ascii=False)
    
    folder_count = sum(1 for n in graph_data['nodes'] if n['type'] == 'folder')
    file_count = sum(1 for n in graph_data['nodes'] if n['type'] == 'file')
    edge_count = len(graph_data['edges'])
    log.info(f"Generated graph.json: {folder_count} folders, {file_count} files, {edge_count} edges")
    
    return config

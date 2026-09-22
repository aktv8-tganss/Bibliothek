"""
MkDocs hook: Auto-generate graph.json from design page frontmatter.

Regenerates docs/graph/graph.json on every build by scanning docs/designs/**/*.md
and extracting BOM relationships (uses/used_in) from YAML frontmatter.

This ensures the graph canvas always reflects the current state of the design
library without manual intervention after batch merges.
"""

import json
import logging
import os
import re
from pathlib import Path

log = logging.getLogger('mkdocs.plugins.graph_hooks')

# Hub pages to exclude from graph (these are index pages, not design nodes)
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


def extract_project_from_path(project_path: str) -> str:
    """Extract project name from project_path like 'AKTV8 LLC / A-0010 iAir6 / ...'"""
    if not project_path:
        return ''
    parts = [p.strip() for p in project_path.split('/')]
    if len(parts) >= 2:
        if parts[0] in ('AKTV8 LLC', 'AKTV8'):
            return parts[1] if len(parts) > 1 else ''
    return parts[0] if parts else ''


def is_hub_page(name: str) -> bool:
    """Check if a name corresponds to a hub/index page that should be excluded."""
    if not name:
        return False
    normalized = name.lower().strip()
    return normalized in HUB_PAGES_TO_EXCLUDE


def generate_graph_data(docs_dir: Path) -> dict:
    """
    Scan design pages and build graph data structure.
    
    Returns:
        dict with 'nodes' and 'edges' arrays suitable for Cytoscape.js
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
        
        project_path = fm.get('project_path', '')
        project = extract_project_from_path(project_path)
        shortlink = fm.get('shortlink', '')
        uses = fm.get('uses', []) or []
        used_in = fm.get('used_in', []) or []
        
        relative_path = md_file.relative_to(designs_dir)
        path_str = str(relative_path.with_suffix('')).replace(os.sep, '/')
        
        if name not in nodes_map:
            nodes_map[name] = {
                'id': name,
                'shortlink': shortlink,
                'project': project,
                'path': path_str,
                'uses_count': 0,
                'used_in_count': 0,
                '_uses': set(),
                '_used_in': set(),
            }
        else:
            if shortlink and not nodes_map[name]['shortlink']:
                nodes_map[name]['shortlink'] = shortlink
            if project and not nodes_map[name]['project']:
                nodes_map[name]['project'] = project
            if path_str and not nodes_map[name]['path']:
                nodes_map[name]['path'] = path_str
        
        for ref in uses:
            if ref and not is_hub_page(ref):
                nodes_map[name]['_uses'].add(ref)
                if ref not in nodes_map:
                    nodes_map[ref] = {
                        'id': ref,
                        'shortlink': '',
                        'project': '',
                        'path': '',
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
                        'project': '',
                        'path': '',
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
            'project': node['project'],
            'path': node['path'],
            'uses_count': node['uses_count'],
            'used_in_count': node['used_in_count'],
        })
    
    nodes.sort(key=lambda n: n['id'])
    edges.sort(key=lambda e: (e['source'], e['target']))
    
    return {'nodes': nodes, 'edges': edges}


def on_pre_build(config, **kwargs):
    """
    MkDocs hook: regenerate graph.json before each build.
    
    This ensures the graph always reflects the current design library state.
    """
    docs_dir = Path(config['docs_dir'])
    graph_dir = docs_dir / 'graph'
    graph_json_path = graph_dir / 'graph.json'
    
    graph_dir.mkdir(parents=True, exist_ok=True)
    
    log.info("Generating graph.json from design frontmatter...")
    
    graph_data = generate_graph_data(docs_dir)
    
    with open(graph_json_path, 'w', encoding='utf-8') as f:
        json.dump(graph_data, f, indent=2, ensure_ascii=False)
    
    node_count = len(graph_data['nodes'])
    edge_count = len(graph_data['edges'])
    log.info(f"Generated graph.json: {node_count} nodes, {edge_count} edges")
    
    return config

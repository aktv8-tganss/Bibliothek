/* Bibliothek Graph Canvas - Cytoscape.js Implementation */

(function() {
  'use strict';

  let cy = null;
  let graphData = null;
  let allProjects = [];

  const CONFIG = {
    NODE_SIZE_MIN: 12,
    NODE_SIZE_MAX: 40,
    EDGE_WIDTH: 1,
    FONT_SIZE: 10,
    LAYOUT_PADDING: 50,
    ZOOM_MIN: 0.1,
    ZOOM_MAX: 3
  };

  function init() {
    const loading = document.getElementById('graph-loading');
    
    const basePath = getBasePath();
    fetch(basePath + 'graph.json')
      .then(r => r.json())
      .then(data => {
        graphData = data;
        allProjects = extractProjects(data.nodes);
        populateProjectFilter(allProjects);
        initGraph(data);
        bindControls();
        if (loading) loading.classList.add('hidden');
        updateStats();
      })
      .catch(err => {
        console.error('Failed to load graph data:', err);
        if (loading) loading.textContent = 'Failed to load graph data';
      });
  }

  function getBasePath() {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.includes('graph.js')) {
        return src.replace('graph.js', '');
      }
    }
    const path = window.location.pathname;
    if (path.endsWith('/')) return path;
    const lastSlash = path.lastIndexOf('/');
    return path.substring(0, lastSlash + 1);
  }

  function extractProjects(nodes) {
    const projects = new Set();
    nodes.forEach(n => {
      if (n.project && n.project.trim()) {
        projects.add(n.project);
      }
    });
    return Array.from(projects).sort();
  }

  function populateProjectFilter(projects) {
    const select = document.getElementById('project-filter');
    if (!select) return;
    projects.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      select.appendChild(opt);
    });
  }

  function computeNodeSize(node) {
    const degree = (node.uses_count || 0) + (node.used_in_count || 0);
    const scale = Math.log2(degree + 1) / Math.log2(50);
    return CONFIG.NODE_SIZE_MIN + 
      Math.min(scale, 1) * (CONFIG.NODE_SIZE_MAX - CONFIG.NODE_SIZE_MIN);
  }

  function initGraph(data) {
    const elements = [];

    data.nodes.forEach(node => {
      const degree = (node.uses_count || 0) + (node.used_in_count || 0);
      elements.push({
        group: 'nodes',
        data: {
          id: node.id,
          shortlink: node.shortlink || '',
          project: node.project || '',
          path: node.path || '',
          uses_count: node.uses_count || 0,
          used_in_count: node.used_in_count || 0,
          degree: degree,
          size: computeNodeSize(node)
        }
      });
    });

    data.edges.forEach((edge, idx) => {
      elements.push({
        group: 'edges',
        data: {
          id: 'e' + idx,
          source: edge.source,
          target: edge.target,
          type: edge.type || 'uses'
        }
      });
    });

    cy = cytoscape({
      container: document.getElementById('cy'),
      elements: elements,
      minZoom: CONFIG.ZOOM_MIN,
      maxZoom: CONFIG.ZOOM_MAX,
      wheelSensitivity: 0.3,
      style: [
        {
          selector: 'node',
          style: {
            'width': 'data(size)',
            'height': 'data(size)',
            'background-color': '#4a9eff',
            'border-width': 1,
            'border-color': '#2a4a6a',
            'label': 'data(id)',
            'font-size': CONFIG.FONT_SIZE,
            'color': '#e0e0e0',
            'text-valign': 'bottom',
            'text-margin-y': 4,
            'text-outline-width': 2,
            'text-outline-color': '#0d0d0d',
            'min-zoomed-font-size': 8
          }
        },
        {
          selector: 'node[degree = 0]',
          style: {
            'background-color': '#666666',
            'border-color': '#444444'
          }
        },
        {
          selector: 'node.highlighted',
          style: {
            'background-color': '#ff6b4a',
            'border-color': '#ff8866',
            'border-width': 2
          }
        },
        {
          selector: 'node.faded',
          style: {
            'opacity': 0.15
          }
        },
        {
          selector: 'node.neighbor',
          style: {
            'background-color': '#6ab0ff',
            'border-color': '#4a9eff',
            'border-width': 2
          }
        },
        {
          selector: 'edge',
          style: {
            'width': CONFIG.EDGE_WIDTH,
            'line-color': '#2a4a6a',
            'target-arrow-color': '#2a4a6a',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 0.8
          }
        },
        {
          selector: 'edge.highlighted',
          style: {
            'line-color': '#ff6b4a',
            'target-arrow-color': '#ff6b4a',
            'width': 2
          }
        },
        {
          selector: 'edge.faded',
          style: {
            'opacity': 0.1
          }
        },
        {
          selector: 'node.hidden, edge.hidden',
          style: {
            'display': 'none'
          }
        }
      ]
    });

    runLayout();

    cy.on('tap', 'node', function(evt) {
      showNodePanel(evt.target.data());
    });

    cy.on('tap', function(evt) {
      if (evt.target === cy) {
        hideNodePanel();
        clearHighlights();
      }
    });
  }

  function runLayout() {
    cy.layout({
      name: 'cose',
      animate: false,
      padding: CONFIG.LAYOUT_PADDING,
      nodeRepulsion: function() { return 8000; },
      idealEdgeLength: function() { return 80; },
      edgeElasticity: function() { return 100; },
      gravity: 0.25,
      numIter: 500,
      initialTemp: 200,
      coolingFactor: 0.95,
      randomize: true
    }).run();
  }

  function bindControls() {
    const showOrphans = document.getElementById('show-orphans');
    const nodeSearch = document.getElementById('node-search');
    const hopCount = document.getElementById('hop-count');
    const projectFilter = document.getElementById('project-filter');
    const btnReset = document.getElementById('btn-reset');
    const btnFit = document.getElementById('btn-fit');
    const panelClose = document.getElementById('panel-close');

    if (showOrphans) {
      showOrphans.addEventListener('change', applyFilters);
    }

    if (nodeSearch) {
      let debounce = null;
      nodeSearch.addEventListener('input', function() {
        clearTimeout(debounce);
        debounce = setTimeout(applySearch, 300);
      });
      nodeSearch.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          clearTimeout(debounce);
          applySearch();
        }
      });
    }

    if (hopCount) {
      hopCount.addEventListener('change', applySearch);
    }

    if (projectFilter) {
      projectFilter.addEventListener('change', applyFilters);
    }

    if (btnReset) {
      btnReset.addEventListener('click', resetView);
    }

    if (btnFit) {
      btnFit.addEventListener('click', function() {
        cy.fit(50);
      });
    }

    if (panelClose) {
      panelClose.addEventListener('click', hideNodePanel);
    }
  }

  function applyFilters() {
    const showOrphans = document.getElementById('show-orphans').checked;
    const projectFilter = document.getElementById('project-filter').value;

    cy.batch(function() {
      cy.nodes().forEach(function(node) {
        const degree = node.data('degree');
        const project = node.data('project');
        
        let hidden = false;

        if (!showOrphans && degree === 0) {
          hidden = true;
        }

        if (projectFilter && project !== projectFilter) {
          hidden = true;
        }

        if (hidden) {
          node.addClass('hidden');
        } else {
          node.removeClass('hidden');
        }
      });

      cy.edges().forEach(function(edge) {
        const src = edge.source();
        const tgt = edge.target();
        if (src.hasClass('hidden') || tgt.hasClass('hidden')) {
          edge.addClass('hidden');
        } else {
          edge.removeClass('hidden');
        }
      });
    });

    updateStats();
  }

  function applySearch() {
    const searchTerm = document.getElementById('node-search').value.trim().toLowerCase();
    const hops = parseInt(document.getElementById('hop-count').value, 10) || 1;

    clearHighlights();

    if (!searchTerm) {
      applyFilters();
      return;
    }

    const matches = cy.nodes().filter(function(node) {
      return node.data('id').toLowerCase().includes(searchTerm);
    });

    if (matches.length === 0) {
      applyFilters();
      return;
    }

    let neighborhood = matches;
    for (let i = 0; i < hops; i++) {
      neighborhood = neighborhood.union(neighborhood.neighborhood());
    }

    cy.batch(function() {
      cy.elements().addClass('faded');
      neighborhood.removeClass('faded');
      matches.addClass('highlighted');
      neighborhood.edges().addClass('highlighted');
      
      neighborhood.nodes().not(matches).addClass('neighbor');
    });

    if (matches.length === 1) {
      cy.animate({
        center: { eles: matches },
        zoom: 1.5
      }, { duration: 300 });
      showNodePanel(matches[0].data());
    } else {
      cy.animate({
        fit: { eles: neighborhood, padding: 50 }
      }, { duration: 300 });
    }

    updateStats();
  }

  function clearHighlights() {
    cy.batch(function() {
      cy.elements()
        .removeClass('highlighted')
        .removeClass('faded')
        .removeClass('neighbor');
    });
  }

  function resetView() {
    document.getElementById('node-search').value = '';
    document.getElementById('hop-count').value = '1';
    document.getElementById('project-filter').value = '';
    document.getElementById('show-orphans').checked = false;

    clearHighlights();
    applyFilters();
    cy.fit(50);
    hideNodePanel();
  }

  function showNodePanel(data) {
    const panel = document.getElementById('node-panel');
    if (!panel) return;

    document.getElementById('panel-name').textContent = data.id;
    document.getElementById('panel-project').textContent = data.project || '—';
    document.getElementById('panel-path').textContent = data.path || '—';
    
    const linkEl = document.getElementById('panel-shortlink');
    if (data.shortlink) {
      linkEl.innerHTML = '<a href="' + data.shortlink + '" target="_blank" rel="noopener">' + 
        data.shortlink + '</a>';
    } else {
      linkEl.textContent = '—';
    }

    document.getElementById('panel-uses').textContent = data.uses_count;
    document.getElementById('panel-used-in').textContent = data.used_in_count;

    panel.classList.add('visible');
  }

  function hideNodePanel() {
    const panel = document.getElementById('node-panel');
    if (panel) panel.classList.remove('visible');
  }

  function updateStats() {
    const statsEl = document.getElementById('graph-stats');
    if (!statsEl) return;

    const visibleNodes = cy.nodes().not('.hidden').length;
    const visibleEdges = cy.edges().not('.hidden').length;
    const totalNodes = cy.nodes().length;
    const totalEdges = cy.edges().length;

    if (visibleNodes === totalNodes) {
      statsEl.textContent = visibleNodes + ' nodes · ' + visibleEdges + ' edges';
    } else {
      statsEl.textContent = visibleNodes + '/' + totalNodes + ' nodes · ' + 
        visibleEdges + '/' + totalEdges + ' edges';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

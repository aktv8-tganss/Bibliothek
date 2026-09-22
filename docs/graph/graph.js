/* Bibliothek Graph Canvas - D3 Force Simulation (Obsidian-style) */

(function() {
  'use strict';

  const STORAGE_KEY = 'bibliothek-graph-settings';

  const DEFAULT_SETTINGS = {
    centerForce: 0.1,
    repelForce: -200,
    linkForce: 0.4,
    linkDistance: 50,
    collideRadius: 15,
    velocityDecay: 0.4,
    sizeFalloff: 0.7,
    showOrphans: false,
    projectFilter: '',
    controlsCollapsed: false
  };

  let canvasWidth = 800;
  let canvasHeight = 600;

  let settings = { ...DEFAULT_SETTINGS };
  let simulation = null;
  let svg = null;
  let g = null;
  let graphData = null;
  let nodes = [];
  let links = [];
  let nodeElements = null;
  let linkElements = null;
  let labelElements = null;
  let zoom = null;
  let allProjects = [];
  let maxDepth = 1;

  const CONFIG = {
    NODE_SIZE_ROOT: 26,
    NODE_SIZE_MIN: 3,
    NODE_SIZE_ORPHAN: 3,
    ZOOM_MIN: 0.1,
    ZOOM_MAX: 4
  };

  function init() {
    loadSettings();
    applyControlsCollapseState();
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
        bindSettingsControls();
        bindCollapseControls();
        if (loading) loading.classList.add('hidden');
        updateStats();
      })
      .catch(err => {
        console.error('Failed to load graph data:', err);
        if (loading) loading.textContent = 'Failed to load graph data';
      });
  }

  function loadSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        settings = { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load settings from localStorage:', e);
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage:', e);
    }
  }

  function applyControlsCollapseState() {
    const controls = document.getElementById('graph-controls');
    const chip = document.getElementById('controls-chip');
    
    if (settings.controlsCollapsed) {
      controls.classList.remove('expanded');
      chip.classList.add('visible');
    } else {
      controls.classList.add('expanded');
      chip.classList.remove('visible');
    }
  }

  function bindCollapseControls() {
    const collapseBtn = document.getElementById('controls-collapse');
    const expandBtn = document.getElementById('controls-expand');
    const controls = document.getElementById('graph-controls');
    const chip = document.getElementById('controls-chip');

    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        controls.classList.remove('expanded');
        chip.classList.add('visible');
        settings.controlsCollapsed = true;
        saveSettings();
      });
    }

    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        controls.classList.add('expanded');
        chip.classList.remove('visible');
        settings.controlsCollapsed = false;
        saveSettings();
      });
    }
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

  function extractProjects(nodeList) {
    const projects = new Set();
    nodeList.forEach(n => {
      if (n.project && n.project.trim()) {
        projects.add(n.project);
      }
    });
    return Array.from(projects).sort();
  }

  function populateProjectFilter(projects) {
    const select = document.getElementById('project-filter');
    if (!select) return;
    select.innerHTML = '<option value="">All projects</option>';
    projects.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      select.appendChild(opt);
    });
    select.value = settings.projectFilter || '';
  }

  function computeDepthFromRoots(nodeList, edgeList) {
    const nodeById = new Map(nodeList.map(n => [n.id, n]));
    const childToParents = new Map();
    const parentToChildren = new Map();
    
    edgeList.forEach(e => {
      const sourceId = typeof e.source === 'string' ? e.source : e.source.id;
      const targetId = typeof e.target === 'string' ? e.target : e.target.id;
      
      if (!childToParents.has(targetId)) childToParents.set(targetId, []);
      childToParents.get(targetId).push(sourceId);
      
      if (!parentToChildren.has(sourceId)) parentToChildren.set(sourceId, []);
      parentToChildren.get(sourceId).push(targetId);
    });
    
    const roots = [];
    nodeList.forEach(n => {
      const usedInCount = n.used_in_count || 0;
      if (usedInCount === 0 && (n.uses_count || 0) > 0) {
        roots.push(n.id);
      }
    });
    
    const depth = new Map();
    
    if (roots.length === 0) {
      nodeList.forEach(n => depth.set(n.id, 0));
      return { depth, maxDepth: 0 };
    }
    
    roots.forEach(r => depth.set(r, 0));
    
    const queue = [...roots];
    let maxD = 0;
    
    while (queue.length > 0) {
      const current = queue.shift();
      const currentDepth = depth.get(current);
      
      const children = parentToChildren.get(current) || [];
      children.forEach(childId => {
        if (!depth.has(childId)) {
          const newDepth = currentDepth + 1;
          depth.set(childId, newDepth);
          maxD = Math.max(maxD, newDepth);
          queue.push(childId);
        }
      });
    }
    
    nodeList.forEach(n => {
      if (!depth.has(n.id)) {
        depth.set(n.id, -1);
      }
    });
    
    return { depth, maxDepth: maxD };
  }

  function computeNodeRadius(node, depthValue, falloff) {
    const degree = (node.uses_count || 0) + (node.used_in_count || 0);
    
    if (degree === 0) {
      return CONFIG.NODE_SIZE_ORPHAN;
    }
    
    if (depthValue < 0) {
      return CONFIG.NODE_SIZE_MIN + 2;
    }
    
    if (depthValue === 0) {
      return CONFIG.NODE_SIZE_ROOT;
    }
    
    const radius = CONFIG.NODE_SIZE_ROOT * Math.pow(falloff, depthValue);
    return Math.max(radius, CONFIG.NODE_SIZE_MIN);
  }

  function isAssemblyNode(node) {
    return (node.uses_count || 0) > 0;
  }

  function isRootNode(node, depthValue) {
    return depthValue === 0 && (node.uses_count || 0) > 0;
  }

  function isOrphanNode(node) {
    return ((node.uses_count || 0) + (node.used_in_count || 0)) === 0;
  }

  function getNodeColor(node, depthValue) {
    if (isOrphanNode(node)) {
      return '#555555';
    }
    if (isRootNode(node, depthValue)) {
      return '#d4a017';
    }
    if (isAssemblyNode(node)) {
      return '#c49515';
    }
    return '#e07020';
  }

  function getNodeBorderColor(node, depthValue) {
    if (isOrphanNode(node)) {
      return '#444444';
    }
    if (isRootNode(node, depthValue)) {
      return '#ffcc00';
    }
    if (isAssemblyNode(node)) {
      return '#a67c00';
    }
    return '#b05010';
  }

  function forceBoundary(margin, strength) {
    let nodes;
    
    function force(alpha) {
      const effectiveStrength = strength * alpha;
      const minX = margin;
      const maxX = canvasWidth - margin;
      const minY = margin;
      const maxY = canvasHeight - margin;
      
      for (const node of nodes) {
        if (node.fx !== null && node.fx !== undefined) continue;
        
        if (node.x < minX) {
          node.vx += (minX - node.x) * effectiveStrength;
        } else if (node.x > maxX) {
          node.vx += (maxX - node.x) * effectiveStrength;
        }
        
        if (node.y < minY) {
          node.vy += (minY - node.y) * effectiveStrength;
        } else if (node.y > maxY) {
          node.vy += (maxY - node.y) * effectiveStrength;
        }
      }
    }
    
    force.initialize = function(_nodes) {
      nodes = _nodes;
    };
    
    force.margin = function(_) {
      return arguments.length ? (margin = _, force) : margin;
    };
    
    force.strength = function(_) {
      return arguments.length ? (strength = _, force) : strength;
    };
    
    return force;
  }

  function initGraph(data) {
    const container = document.getElementById('cy');
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;

    const { depth, maxDepth: maxD } = computeDepthFromRoots(data.nodes, data.edges);
    maxDepth = maxD;

    nodes = data.nodes.map(n => {
      const d = depth.get(n.id);
      return {
        ...n,
        depth: d,
        radius: computeNodeRadius(n, d, settings.sizeFalloff),
        isAssembly: isAssemblyNode(n),
        isRoot: isRootNode(n, d),
        isOrphan: isOrphanNode(n),
        x: canvasWidth / 2 + (Math.random() - 0.5) * 200,
        y: canvasHeight / 2 + (Math.random() - 0.5) * 200
      };
    });

    const nodeById = new Map(nodes.map(n => [n.id, n]));

    links = data.edges
      .filter(e => nodeById.has(e.source) && nodeById.has(e.target))
      .map(e => ({
        source: nodeById.get(e.source),
        target: nodeById.get(e.target),
        type: e.type
      }));

    svg = d3.select('#cy')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('display', 'block');

    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    g = svg.append('g');

    zoom = d3.zoom()
      .scaleExtent([CONFIG.ZOOM_MIN, CONFIG.ZOOM_MAX])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    linkElements = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#2a4a6a')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.6);

    nodeElements = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => getNodeColor(d, d.depth))
      .attr('stroke', d => getNodeBorderColor(d, d.depth))
      .attr('stroke-width', d => d.isRoot ? 2 : 1.5)
      .attr('cursor', 'pointer')
      .on('mouseover', handleNodeMouseOver)
      .on('mouseout', handleNodeMouseOut)
      .on('click', handleNodeClick)
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

    labelElements = g.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.id)
      .attr('font-size', 10)
      .attr('font-family', 'JetBrains Mono, Consolas, monospace')
      .attr('fill', '#e0e0e0')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.radius + 12)
      .attr('pointer-events', 'none')
      .attr('opacity', 0);

    simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id)
        .strength(settings.linkForce)
        .distance(settings.linkDistance))
      .force('charge', d3.forceManyBody()
        .strength(settings.repelForce))
      .force('centerX', d3.forceX(canvasWidth / 2)
        .strength(settings.centerForce))
      .force('centerY', d3.forceY(canvasHeight / 2)
        .strength(settings.centerForce))
      .force('collide', d3.forceCollide()
        .radius(d => d.radius + settings.collideRadius)
        .strength(0.7))
      .force('boundary', forceBoundary(50, 0.3))
      .velocityDecay(settings.velocityDecay)
      .alphaTarget(0.005)
      .alphaDecay(0.005)
      .on('tick', ticked);

    applyFilters();

    window.addEventListener('resize', handleResize);
  }

  function updateNodeSizes() {
    nodes.forEach(n => {
      n.radius = computeNodeRadius(n, n.depth, settings.sizeFalloff);
    });
    
    nodeElements.attr('r', d => d.radius);
    labelElements.attr('dy', d => d.radius + 12);
    
    simulation.force('collide').radius(d => d.radius + settings.collideRadius);
    simulation.alpha(0.3).restart();
  }

  function ticked() {
    linkElements
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    nodeElements
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    labelElements
      .attr('x', d => d.x)
      .attr('y', d => d.y);
  }

  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.1).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0.005);
    d.fx = null;
    d.fy = null;
  }

  function handleNodeMouseOver(event, d) {
    d3.select(event.target)
      .attr('filter', 'url(#glow)')
      .attr('stroke-width', d.isRoot ? 3 : 2.5);

    labelElements
      .filter(n => n.id === d.id)
      .attr('opacity', 1);

    linkElements
      .attr('stroke-opacity', l => 
        (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.15)
      .attr('stroke-width', l => 
        (l.source.id === d.id || l.target.id === d.id) ? 2 : 1);

    nodeElements
      .attr('opacity', n => {
        if (n.id === d.id) return 1;
        const connected = links.some(l => 
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id));
        return connected ? 1 : 0.3;
      });
  }

  function handleNodeMouseOut(event, d) {
    d3.select(event.target)
      .attr('filter', null)
      .attr('stroke-width', d.isRoot ? 2 : 1.5);

    labelElements
      .filter(n => n.id === d.id)
      .attr('opacity', 0);

    linkElements
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1);

    nodeElements
      .attr('opacity', 1);
  }

  function handleNodeClick(event, d) {
    event.stopPropagation();
    showNodePanel(d);
  }

  function handleResize() {
    const container = document.getElementById('cy');
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
    
    simulation.force('centerX', d3.forceX(canvasWidth / 2).strength(settings.centerForce));
    simulation.force('centerY', d3.forceY(canvasHeight / 2).strength(settings.centerForce));
    simulation.force('boundary', forceBoundary(50, 0.3));
    simulation.alpha(0.3).restart();
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
      showOrphans.checked = settings.showOrphans;
      showOrphans.addEventListener('change', () => {
        settings.showOrphans = showOrphans.checked;
        saveSettings();
        applyFilters();
      });
    }

    if (nodeSearch) {
      let debounce = null;
      nodeSearch.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(applySearch, 300);
      });
      nodeSearch.addEventListener('keydown', (e) => {
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
      projectFilter.addEventListener('change', () => {
        settings.projectFilter = projectFilter.value;
        saveSettings();
        applyFilters();
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', resetView);
    }

    if (btnFit) {
      btnFit.addEventListener('click', fitView);
    }

    if (panelClose) {
      panelClose.addEventListener('click', hideNodePanel);
    }

    svg.on('click', () => {
      hideNodePanel();
    });
  }

  function bindSettingsControls() {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');

    if (settingsToggle && settingsPanel) {
      settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('visible');
      });
    }

    bindSlider('slider-center', 'centerForce', val => {
      simulation.force('centerX').strength(val);
      simulation.force('centerY').strength(val);
      simulation.alpha(0.3).restart();
    });

    bindSlider('slider-repel', 'repelForce', val => {
      simulation.force('charge').strength(val);
      simulation.alpha(0.3).restart();
    });

    bindSlider('slider-link', 'linkForce', val => {
      simulation.force('link').strength(val);
      simulation.alpha(0.3).restart();
    });

    bindSlider('slider-distance', 'linkDistance', val => {
      simulation.force('link').distance(val);
      simulation.alpha(0.3).restart();
    });

    bindSlider('slider-collide', 'collideRadius', val => {
      simulation.force('collide').radius(d => d.radius + val);
      simulation.alpha(0.3).restart();
    });

    bindSlider('slider-decay', 'velocityDecay', val => {
      simulation.velocityDecay(val);
      simulation.alpha(0.3).restart();
    });

    bindSlider('slider-size-falloff', 'sizeFalloff', val => {
      updateNodeSizes();
    });

    const btnResetSettings = document.getElementById('btn-reset-settings');
    if (btnResetSettings) {
      btnResetSettings.addEventListener('click', resetSettings);
    }
  }

  function bindSlider(sliderId, settingKey, updateFn) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(sliderId + '-value');
    
    if (!slider) return;

    slider.value = settings[settingKey];
    if (valueDisplay) {
      valueDisplay.textContent = settings[settingKey];
    }

    slider.addEventListener('input', () => {
      const val = parseFloat(slider.value);
      settings[settingKey] = val;
      if (valueDisplay) {
        valueDisplay.textContent = val;
      }
      saveSettings();
      if (updateFn) updateFn(val);
    });
  }

  function resetSettings() {
    const preserveCollapsed = settings.controlsCollapsed;
    settings = { ...DEFAULT_SETTINGS, controlsCollapsed: preserveCollapsed };
    saveSettings();

    document.getElementById('slider-center').value = settings.centerForce;
    document.getElementById('slider-center-value').textContent = settings.centerForce;
    document.getElementById('slider-repel').value = settings.repelForce;
    document.getElementById('slider-repel-value').textContent = settings.repelForce;
    document.getElementById('slider-link').value = settings.linkForce;
    document.getElementById('slider-link-value').textContent = settings.linkForce;
    document.getElementById('slider-distance').value = settings.linkDistance;
    document.getElementById('slider-distance-value').textContent = settings.linkDistance;
    document.getElementById('slider-collide').value = settings.collideRadius;
    document.getElementById('slider-collide-value').textContent = settings.collideRadius;
    document.getElementById('slider-decay').value = settings.velocityDecay;
    document.getElementById('slider-decay-value').textContent = settings.velocityDecay;
    document.getElementById('slider-size-falloff').value = settings.sizeFalloff;
    document.getElementById('slider-size-falloff-value').textContent = settings.sizeFalloff;

    const container = document.getElementById('cy');
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;

    simulation.force('link').strength(settings.linkForce).distance(settings.linkDistance);
    simulation.force('charge').strength(settings.repelForce);
    simulation.force('centerX', d3.forceX(canvasWidth / 2).strength(settings.centerForce));
    simulation.force('centerY', d3.forceY(canvasHeight / 2).strength(settings.centerForce));
    simulation.force('collide').radius(d => d.radius + settings.collideRadius);
    simulation.force('boundary', forceBoundary(50, 0.3));
    simulation.velocityDecay(settings.velocityDecay);
    
    updateNodeSizes();
  }

  function applyFilters() {
    const showOrphans = settings.showOrphans;
    const projectFilter = settings.projectFilter;

    const visibleNodes = new Set();
    nodes.forEach(node => {
      const degree = (node.uses_count || 0) + (node.used_in_count || 0);
      let visible = true;

      if (!showOrphans && degree === 0) {
        visible = false;
      }

      if (projectFilter && node.project !== projectFilter) {
        visible = false;
      }

      if (visible) {
        visibleNodes.add(node.id);
      }
    });

    nodeElements.attr('display', d => visibleNodes.has(d.id) ? null : 'none');
    labelElements.attr('display', d => visibleNodes.has(d.id) ? null : 'none');
    linkElements.attr('display', d => 
      (visibleNodes.has(d.source.id) && visibleNodes.has(d.target.id)) ? null : 'none');

    updateStats();
  }

  function applySearch() {
    const searchInput = document.getElementById('node-search');
    const hopInput = document.getElementById('hop-count');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const hops = hopInput ? parseInt(hopInput.value, 10) || 1 : 1;

    if (!searchTerm) {
      nodeElements.attr('opacity', 1);
      linkElements.attr('stroke-opacity', 0.6);
      applyFilters();
      return;
    }

    const matches = new Set();
    nodes.forEach(n => {
      if (n.id.toLowerCase().includes(searchTerm)) {
        matches.add(n.id);
      }
    });

    if (matches.size === 0) {
      applyFilters();
      return;
    }

    const neighborhood = new Set(matches);
    for (let i = 0; i < hops; i++) {
      const toAdd = [];
      links.forEach(l => {
        if (neighborhood.has(l.source.id) && !neighborhood.has(l.target.id)) {
          toAdd.push(l.target.id);
        }
        if (neighborhood.has(l.target.id) && !neighborhood.has(l.source.id)) {
          toAdd.push(l.source.id);
        }
      });
      toAdd.forEach(id => neighborhood.add(id));
    }

    nodeElements.attr('opacity', d => {
      if (matches.has(d.id)) return 1;
      if (neighborhood.has(d.id)) return 0.8;
      return 0.15;
    });

    linkElements.attr('stroke-opacity', l => {
      if (neighborhood.has(l.source.id) && neighborhood.has(l.target.id)) return 0.8;
      return 0.05;
    });

    if (matches.size === 1) {
      const matchNode = nodes.find(n => matches.has(n.id));
      if (matchNode) {
        showNodePanel(matchNode);
        centerOnNode(matchNode);
      }
    }

    updateStats();
  }

  function centerOnNode(node) {
    const container = document.getElementById('cy');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const transform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(1.5)
      .translate(-node.x, -node.y);
    
    svg.transition()
      .duration(500)
      .call(zoom.transform, transform);
  }

  function fitView() {
    const container = document.getElementById('cy');
    const width = container.clientWidth;
    const height = container.clientHeight;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    nodes.forEach(n => {
      if (nodeElements.filter(d => d.id === n.id).attr('display') !== 'none') {
        minX = Math.min(minX, n.x - n.radius);
        maxX = Math.max(maxX, n.x + n.radius);
        minY = Math.min(minY, n.y - n.radius);
        maxY = Math.max(maxY, n.y + n.radius);
      }
    });

    if (minX === Infinity) return;

    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;
    const padding = 50;

    const scale = Math.min(
      (width - padding * 2) / graphWidth,
      (height - padding * 2) / graphHeight,
      CONFIG.ZOOM_MAX
    );

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const transform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(Math.max(scale, CONFIG.ZOOM_MIN))
      .translate(-centerX, -centerY);

    svg.transition()
      .duration(500)
      .call(zoom.transform, transform);
  }

  function resetView() {
    const searchInput = document.getElementById('node-search');
    const hopInput = document.getElementById('hop-count');
    const projectFilter = document.getElementById('project-filter');
    const showOrphans = document.getElementById('show-orphans');

    if (searchInput) searchInput.value = '';
    if (hopInput) hopInput.value = '1';
    if (projectFilter) {
      projectFilter.value = '';
      settings.projectFilter = '';
    }
    if (showOrphans) {
      showOrphans.checked = false;
      settings.showOrphans = false;
    }
    saveSettings();

    nodeElements.attr('opacity', 1);
    linkElements.attr('stroke-opacity', 0.6);
    applyFilters();
    fitView();
    hideNodePanel();
  }

  function showNodePanel(d) {
    const panel = document.getElementById('node-panel');
    if (!panel) return;

    document.getElementById('panel-name').textContent = d.id;
    document.getElementById('panel-project').textContent = d.project || '—';
    document.getElementById('panel-path').textContent = d.path || '—';
    
    const depthEl = document.getElementById('panel-depth');
    if (depthEl) {
      if (d.isOrphan) {
        depthEl.textContent = 'Orphan';
      } else if (d.depth < 0) {
        depthEl.textContent = 'Disconnected';
      } else {
        depthEl.textContent = d.depth + (d.isRoot ? ' (root)' : '');
      }
    }
    
    const linkEl = document.getElementById('panel-shortlink');
    if (d.shortlink) {
      linkEl.innerHTML = '<a href="' + d.shortlink + '" target="_blank" rel="noopener">' + 
        d.shortlink + '</a>';
    } else {
      linkEl.textContent = '—';
    }

    document.getElementById('panel-uses').textContent = d.uses_count || 0;
    document.getElementById('panel-used-in').textContent = d.used_in_count || 0;

    const typeEl = document.getElementById('panel-type');
    if (typeEl) {
      if (d.isOrphan) {
        typeEl.textContent = 'Orphan';
        typeEl.style.color = '#555555';
      } else if (d.isRoot) {
        typeEl.textContent = 'Root Assembly';
        typeEl.style.color = '#d4a017';
      } else if (d.isAssembly) {
        typeEl.textContent = 'Assembly';
        typeEl.style.color = '#c49515';
      } else {
        typeEl.textContent = 'Part';
        typeEl.style.color = '#e07020';
      }
    }

    panel.classList.add('visible');
  }

  function hideNodePanel() {
    const panel = document.getElementById('node-panel');
    if (panel) panel.classList.remove('visible');
  }

  function updateStats() {
    const statsEl = document.getElementById('graph-stats');
    if (!statsEl) return;

    let visibleNodes = 0;
    let visibleEdges = 0;

    nodeElements.each(function(d) {
      if (d3.select(this).attr('display') !== 'none') visibleNodes++;
    });

    linkElements.each(function(d) {
      if (d3.select(this).attr('display') !== 'none') visibleEdges++;
    });

    const totalNodes = nodes.length;
    const totalEdges = links.length;

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

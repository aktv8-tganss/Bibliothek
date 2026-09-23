/* Bibliothek Graph Canvas - Directory + Assembly + Project Modes (D3 Force Simulation) */

(function() {
  'use strict';

  const STORAGE_KEY = 'bibliothek-graph-settings';

  const DEFAULT_SETTINGS = {
    mode: 'directory',
    centerForce: 0.1,
    repelForce: -150,
    linkForce: 0.5,
    linkDistance: 40,
    collideRadius: 12,
    velocityDecay: 0.4,
    sizeFalloff: 0.75,
    showOrphans: false,
    controlsCollapsed: false
  };

  let canvasWidth = 800;
  let canvasHeight = 600;

  let settings = { ...DEFAULT_SETTINGS };
  let simulation = null;
  let svg = null;
  let g = null;
  let allGraphData = null;
  let nodes = [];
  let links = [];
  let nodeElements = null;
  let linkElements = null;
  let labelElements = null;
  let centerDotElements = null;
  let zoom = null;
  let projectColors = {};
  let activeProjects = [];

  const CONFIG = {
    FOLDER_SIZE_ROOT: 24,
    FOLDER_SIZE_MIN: 6,
    FILE_SIZE: 4,
    ASSEMBLY_SIZE_MIN: 5,
    ASSEMBLY_SIZE_MAX: 28,
    ZOOM_MIN: 0.1,
    ZOOM_MAX: 4
  };

  const COLORS = {
    folder: '#d4a017',
    folderBorder: '#a67c00',
    file: '#e07020',
    fileBorder: '#b05010',
    assembly: '#3a7bd5',
    assemblyBorder: '#2a5aa0',
    part: '#27ae60',
    partBorder: '#1e8449',
    hybrid: '#17a2b8',
    hybridBorder: '#117a8b',
    orphan: '#555555',
    orphanBorder: '#444444'
  };

  const PROJECT_PALETTE = [
    '#e74c3c',
    '#3498db',
    '#2ecc71',
    '#9b59b6',
    '#f39c12',
    '#1abc9c',
    '#e91e63',
    '#00bcd4',
    '#ff5722',
    '#8bc34a',
    '#673ab7',
    '#ffc107',
    '#009688',
    '#ff9800',
    '#03a9f4',
    '#cddc39',
    '#795548',
    '#607d8b'
  ];

  function getProjectColor(project) {
    if (!project) return COLORS.orphan;
    if (project === '00-parts') return '#ffffff';
    
    if (projectColors[project]) {
      return projectColors[project];
    }
    
    let hash = 0;
    for (let i = 0; i < project.length; i++) {
      hash = ((hash << 5) - hash) + project.charCodeAt(i);
      hash = hash & hash;
    }
    const index = Math.abs(hash) % PROJECT_PALETTE.length;
    projectColors[project] = PROJECT_PALETTE[index];
    return projectColors[project];
  }

  function init() {
    loadSettings();
    applyControlsCollapseState();
    const loading = document.getElementById('graph-loading');
    
    const basePath = getBasePath();
    fetch(basePath + 'graph.json')
      .then(r => r.json())
      .then(data => {
        allGraphData = data;
        initSvg();
        loadMode(settings.mode);
        bindControls();
        bindSettingsControls();
        bindCollapseControls();
        bindModeDropdown();
        if (loading) loading.classList.add('hidden');
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

  function bindModeDropdown() {
    const modeSelect = document.getElementById('mode-select');
    if (!modeSelect) return;

    modeSelect.value = settings.mode;

    modeSelect.addEventListener('change', () => {
      settings.mode = modeSelect.value;
      saveSettings();
      loadMode(settings.mode);
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

  function initSvg() {
    const container = document.getElementById('cy');
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;

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
    
    svg.on('click', () => {
      hideNodePanel();
    });

    window.addEventListener('resize', handleResize);
  }

  function loadMode(mode) {
    if (simulation) {
      simulation.stop();
    }
    
    g.selectAll('*').remove();
    centerDotElements = null;
    
    let data;
    if (mode === 'project') {
      data = allGraphData['assembly'];
    } else {
      data = allGraphData[mode];
    }
    
    if (!data) {
      console.error('No data for mode:', mode);
      return;
    }

    if (mode === 'directory') {
      initDirectoryMode(data);
    } else if (mode === 'assembly') {
      initAssemblyMode(data);
    } else if (mode === 'project') {
      initProjectMode(data);
    }

    updateLegend(mode);
    updatePanelFields(mode);
    updateStats();

    svg.call(zoom.transform, d3.zoomIdentity);
  }

  function computeDirectoryRadius(node, falloff) {
    if (node.type === 'file') {
      return CONFIG.FILE_SIZE;
    }
    if (node.depth === 0) {
      return CONFIG.FOLDER_SIZE_ROOT;
    }
    const radius = CONFIG.FOLDER_SIZE_ROOT * Math.pow(falloff, node.depth || 0);
    return Math.max(radius, CONFIG.FOLDER_SIZE_MIN);
  }

  function getDirectoryColor(node) {
    return node.type === 'folder' ? COLORS.folder : COLORS.file;
  }

  function getDirectoryBorderColor(node) {
    return node.type === 'folder' ? COLORS.folderBorder : COLORS.fileBorder;
  }

  function classifyAssemblyNode(node) {
    const usesCount = node.uses_count || 0;
    const usedInCount = node.used_in_count || 0;

    if (usesCount === 0 && usedInCount === 0) {
      return 'orphan';
    }
    if (usesCount >= 1 && usedInCount === 0) {
      return 'assembly';
    }
    if (usesCount === 0 && usedInCount >= 1) {
      return 'part';
    }
    return 'hybrid';
  }

  function computeAssemblyRadius(node, falloff) {
    const usesCount = node.uses_count || 0;
    
    if (classifyAssemblyNode(node) === 'orphan') {
      return CONFIG.ASSEMBLY_SIZE_MIN;
    }
    
    if (usesCount === 0) {
      return CONFIG.ASSEMBLY_SIZE_MIN;
    }
    
    const maxUses = 50;
    const normalized = Math.min(usesCount, maxUses) / maxUses;
    const scaled = Math.pow(normalized, falloff);
    const radius = CONFIG.ASSEMBLY_SIZE_MIN + scaled * (CONFIG.ASSEMBLY_SIZE_MAX - CONFIG.ASSEMBLY_SIZE_MIN);
    return radius;
  }

  function getAssemblyColor(node) {
    const type = classifyAssemblyNode(node);
    return COLORS[type] || COLORS.orphan;
  }

  function getAssemblyBorderColor(node) {
    const type = classifyAssemblyNode(node);
    return COLORS[type + 'Border'] || COLORS.orphanBorder;
  }

  function initDirectoryMode(data) {
    nodes = data.nodes.map(n => ({
      ...n,
      radius: computeDirectoryRadius(n, settings.sizeFalloff),
      isFolder: n.type === 'folder',
      isFile: n.type === 'file',
      isRoot: n.depth === 0 && n.type === 'folder',
      x: canvasWidth / 2 + (Math.random() - 0.5) * 300,
      y: canvasHeight / 2 + (Math.random() - 0.5) * 300
    }));

    const nodeById = new Map(nodes.map(n => [n.id, n]));

    links = data.edges
      .filter(e => nodeById.has(e.source) && nodeById.has(e.target))
      .map(e => ({
        source: nodeById.get(e.source),
        target: nodeById.get(e.target),
        type: e.type
      }));

    createGraphElements(
      n => getDirectoryColor(n),
      n => getDirectoryBorderColor(n),
      n => n.isRoot ? 2 : 1,
      n => getDirectoryColor(n)
    );

    startSimulation();
  }

  function initAssemblyMode(data) {
    const showOrphans = settings.showOrphans;
    
    let filteredNodes = data.nodes;
    if (!showOrphans) {
      filteredNodes = data.nodes.filter(n => {
        return (n.uses_count || 0) > 0 || (n.used_in_count || 0) > 0;
      });
    }
    
    nodes = filteredNodes.map(n => {
      const nodeType = classifyAssemblyNode(n);
      return {
        ...n,
        nodeType: nodeType,
        radius: computeAssemblyRadius(n, settings.sizeFalloff),
        isAssembly: nodeType === 'assembly',
        isPart: nodeType === 'part',
        isHybrid: nodeType === 'hybrid',
        isOrphan: nodeType === 'orphan',
        x: canvasWidth / 2 + (Math.random() - 0.5) * 300,
        y: canvasHeight / 2 + (Math.random() - 0.5) * 300
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

    createGraphElements(
      n => getAssemblyColor(n),
      n => getAssemblyBorderColor(n),
      n => n.isAssembly ? 2 : 1,
      n => getAssemblyColor(n)
    );

    startSimulation();
  }

  function initProjectMode(data) {
    const showOrphans = settings.showOrphans;
    
    let filteredNodes = data.nodes;
    if (!showOrphans) {
      filteredNodes = data.nodes.filter(n => {
        return (n.uses_count || 0) > 0 || (n.used_in_count || 0) > 0;
      });
    }
    
    projectColors = {};
    const projectSet = new Set();
    
    nodes = filteredNodes.map(n => {
      const nodeType = classifyAssemblyNode(n);
      const project = n.project || '';
      if (project) projectSet.add(project);
      
      return {
        ...n,
        nodeType: nodeType,
        radius: computeAssemblyRadius(n, settings.sizeFalloff),
        isAssembly: nodeType === 'assembly',
        isPart: nodeType === 'part',
        isHybrid: nodeType === 'hybrid',
        isOrphan: nodeType === 'orphan',
        projectColor: getProjectColor(project),
        x: canvasWidth / 2 + (Math.random() - 0.5) * 300,
        y: canvasHeight / 2 + (Math.random() - 0.5) * 300
      };
    });

    activeProjects = Array.from(projectSet).sort();

    const nodeById = new Map(nodes.map(n => [n.id, n]));

    links = data.edges
      .filter(e => nodeById.has(e.source) && nodeById.has(e.target))
      .map(e => ({
        source: nodeById.get(e.source),
        target: nodeById.get(e.target),
        type: e.type
      }));

    createProjectGraphElements();

    startSimulation();
    
    updateProjectLegend();
  }

  function createGraphElements(colorFn, borderColorFn, strokeWidthFn, fillFn) {
    linkElements = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#2a4a6a')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.5);

    nodeElements = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => fillFn(d))
      .attr('stroke', d => borderColorFn(d))
      .attr('stroke-width', d => strokeWidthFn(d))
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
      .text(d => d.name || d.id)
      .attr('font-size', 9)
      .attr('font-family', 'JetBrains Mono, Consolas, monospace')
      .attr('fill', '#e0e0e0')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.radius + 10)
      .attr('pointer-events', 'none')
      .attr('opacity', 0);
  }

  function createProjectGraphElements() {
    linkElements = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#2a4a6a')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.5);

    nodeElements = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => {
        if (d.isOrphan) return COLORS.orphan;
        if (d.isAssembly) return 'rgba(10, 10, 10, 0.3)';
        if (d.isHybrid) return 'rgba(10, 10, 10, 0.3)';
        return d.projectColor;
      })
      .attr('stroke', d => {
        if (d.isOrphan) return COLORS.orphanBorder;
        return d.projectColor;
      })
      .attr('stroke-width', d => {
        if (d.isOrphan) return 1;
        if (d.isAssembly) return 3;
        if (d.isHybrid) return 3;
        return 0;
      })
      .attr('cursor', 'pointer')
      .on('mouseover', handleNodeMouseOver)
      .on('mouseout', handleNodeMouseOut)
      .on('click', handleNodeClick)
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

    centerDotElements = g.append('g')
      .attr('class', 'center-dots')
      .selectAll('circle')
      .data(nodes.filter(n => n.isHybrid))
      .join('circle')
      .attr('r', d => Math.max(d.radius * 0.35, 3))
      .attr('fill', d => d.projectColor)
      .attr('pointer-events', 'none');

    labelElements = g.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.name || d.id)
      .attr('font-size', 9)
      .attr('font-family', 'JetBrains Mono, Consolas, monospace')
      .attr('fill', '#e0e0e0')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.radius + 10)
      .attr('pointer-events', 'none')
      .attr('opacity', 0);
  }

  function startSimulation() {
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
    
    return force;
  }

  function updateNodeSizes() {
    const mode = settings.mode;
    nodes.forEach(n => {
      if (mode === 'directory') {
        n.radius = computeDirectoryRadius(n, settings.sizeFalloff);
      } else {
        n.radius = computeAssemblyRadius(n, settings.sizeFalloff);
      }
    });
    
    nodeElements.attr('r', d => d.radius);
    labelElements.attr('dy', d => d.radius + 10);
    
    if (centerDotElements) {
      centerDotElements.attr('r', d => Math.max(d.radius * 0.35, 3));
    }
    
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

    if (centerDotElements) {
      centerDotElements
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

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
    const isHighlight = d.isRoot || d.isAssembly;
    d3.select(event.target)
      .attr('filter', 'url(#glow)')
      .attr('stroke-width', function() {
        if (settings.mode === 'project') {
          if (d.isOrphan) return 2;
          if (d.isAssembly || d.isHybrid) return 4;
          return 1;
        }
        return isHighlight ? 3 : 2;
      });

    labelElements
      .filter(n => n.id === d.id)
      .attr('opacity', 1);

    linkElements
      .attr('stroke-opacity', l => 
        (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.1)
      .attr('stroke-width', l => 
        (l.source.id === d.id || l.target.id === d.id) ? 2 : 1);

    nodeElements
      .attr('opacity', n => {
        if (n.id === d.id) return 1;
        const connected = links.some(l => 
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id));
        return connected ? 1 : 0.25;
      });

    if (centerDotElements) {
      centerDotElements
        .attr('opacity', n => {
          if (n.id === d.id) return 1;
          const connected = links.some(l => 
            (l.source.id === d.id && l.target.id === n.id) ||
            (l.target.id === d.id && l.source.id === n.id));
          return connected ? 1 : 0.25;
        });
    }
  }

  function handleNodeMouseOut(event, d) {
    const isHighlight = d.isRoot || d.isAssembly;
    d3.select(event.target)
      .attr('filter', null)
      .attr('stroke-width', function() {
        if (settings.mode === 'project') {
          if (d.isOrphan) return 1;
          if (d.isAssembly || d.isHybrid) return 3;
          return 0;
        }
        return isHighlight ? 2 : 1;
      });

    labelElements
      .filter(n => n.id === d.id)
      .attr('opacity', 0);

    linkElements
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', 1);

    nodeElements
      .attr('opacity', 1);

    if (centerDotElements) {
      centerDotElements.attr('opacity', 1);
    }
  }

  function handleNodeClick(event, d) {
    event.stopPropagation();
    showNodePanel(d);
  }

  function handleResize() {
    const container = document.getElementById('cy');
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
    
    if (simulation) {
      simulation.force('centerX', d3.forceX(canvasWidth / 2).strength(settings.centerForce));
      simulation.force('centerY', d3.forceY(canvasHeight / 2).strength(settings.centerForce));
      simulation.force('boundary', forceBoundary(50, 0.3));
      simulation.alpha(0.3).restart();
    }
  }

  function bindControls() {
    const nodeSearch = document.getElementById('node-search');
    const hopCount = document.getElementById('hop-count');
    const btnReset = document.getElementById('btn-reset');
    const btnFit = document.getElementById('btn-fit');
    const panelClose = document.getElementById('panel-close');
    const showOrphans = document.getElementById('show-orphans');

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

    if (btnReset) {
      btnReset.addEventListener('click', resetView);
    }

    if (btnFit) {
      btnFit.addEventListener('click', fitView);
    }

    if (panelClose) {
      panelClose.addEventListener('click', hideNodePanel);
    }

    if (showOrphans) {
      showOrphans.checked = settings.showOrphans;
      showOrphans.addEventListener('change', () => {
        settings.showOrphans = showOrphans.checked;
        saveSettings();
        if (settings.mode === 'assembly' || settings.mode === 'project') {
          loadMode(settings.mode);
        }
      });
    }
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
    const preserveMode = settings.mode;
    const preserveCollapsed = settings.controlsCollapsed;
    settings = { ...DEFAULT_SETTINGS, mode: preserveMode, controlsCollapsed: preserveCollapsed };
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

  function applySearch() {
    const searchInput = document.getElementById('node-search');
    const hopInput = document.getElementById('hop-count');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const hops = hopInput ? parseInt(hopInput.value, 10) || 1 : 1;

    if (!searchTerm) {
      nodeElements.attr('opacity', 1);
      linkElements.attr('stroke-opacity', 0.5);
      if (centerDotElements) centerDotElements.attr('opacity', 1);
      return;
    }

    const matches = new Set();
    nodes.forEach(n => {
      const searchIn = (n.name || n.id).toLowerCase();
      if (searchIn.includes(searchTerm)) {
        matches.add(n.id);
      }
    });

    if (matches.size === 0) {
      nodeElements.attr('opacity', 1);
      linkElements.attr('stroke-opacity', 0.5);
      if (centerDotElements) centerDotElements.attr('opacity', 1);
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
      return 0.1;
    });

    if (centerDotElements) {
      centerDotElements.attr('opacity', d => {
        if (matches.has(d.id)) return 1;
        if (neighborhood.has(d.id)) return 0.8;
        return 0.1;
      });
    }

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
      minX = Math.min(minX, n.x - n.radius);
      maxX = Math.max(maxX, n.x + n.radius);
      minY = Math.min(minY, n.y - n.radius);
      maxY = Math.max(maxY, n.y + n.radius);
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

    if (searchInput) searchInput.value = '';
    if (hopInput) hopInput.value = '1';
    saveSettings();

    nodeElements.attr('opacity', 1);
    linkElements.attr('stroke-opacity', 0.5);
    if (centerDotElements) centerDotElements.attr('opacity', 1);
    fitView();
    hideNodePanel();
  }

  function updateLegend(mode) {
    const legendDir = document.getElementById('legend-directory');
    const legendAsm = document.getElementById('legend-assembly');
    const legendProj = document.getElementById('legend-project');
    
    if (legendDir) legendDir.style.display = mode === 'directory' ? 'flex' : 'none';
    if (legendAsm) legendAsm.style.display = mode === 'assembly' ? 'flex' : 'none';
    if (legendProj) legendProj.style.display = mode === 'project' ? 'block' : 'none';
  }

  function updateProjectLegend() {
    const container = document.getElementById('project-colors');
    if (!container) return;
    
    container.innerHTML = '';
    
    const sortedProjects = ['00-parts'].concat(
      activeProjects.filter(p => p !== '00-parts')
    ).filter(p => activeProjects.includes(p) || p === '00-parts');
    
    const displayProjects = sortedProjects.slice(0, 12);
    
    displayProjects.forEach(project => {
      if (!activeProjects.includes(project) && project !== '00-parts') return;
      
      const item = document.createElement('div');
      item.className = 'project-color-item';
      
      const dot = document.createElement('span');
      dot.className = 'project-color-dot';
      dot.style.backgroundColor = getProjectColor(project);
      
      const label = document.createElement('span');
      label.className = 'project-color-label';
      label.textContent = project;
      
      item.appendChild(dot);
      item.appendChild(label);
      container.appendChild(item);
    });
    
    if (sortedProjects.length > 12) {
      const more = document.createElement('div');
      more.className = 'project-color-item';
      more.innerHTML = '<span class="project-color-label">+' + (sortedProjects.length - 12) + ' more</span>';
      container.appendChild(more);
    }
  }

  function updatePanelFields(mode) {
    const dirFields = document.querySelectorAll('.panel-field-directory');
    const asmFields = document.querySelectorAll('.panel-field-assembly');
    const projFields = document.querySelectorAll('.panel-field-project');
    
    dirFields.forEach(el => el.style.display = mode === 'directory' ? 'flex' : 'none');
    asmFields.forEach(el => el.style.display = (mode === 'assembly' || mode === 'project') ? 'flex' : 'none');
    projFields.forEach(el => el.style.display = mode === 'project' ? 'flex' : 'none');

    const orphanRow = document.getElementById('orphan-toggle-row');
    if (orphanRow) {
      orphanRow.style.display = (mode === 'assembly' || mode === 'project') ? 'block' : 'none';
    }
  }

  function showNodePanel(d) {
    const panel = document.getElementById('node-panel');
    if (!panel) return;

    const nameEl = document.getElementById('panel-name');
    if (nameEl) nameEl.textContent = d.name || d.id;
    
    const pathEl = document.getElementById('panel-path');
    if (pathEl) pathEl.textContent = d.path || d.id || '—';
    
    const linkEl = document.getElementById('panel-shortlink');
    if (linkEl) {
      if (d.shortlink) {
        linkEl.innerHTML = '<a href="' + d.shortlink + '" target="_blank" rel="noopener">' + 
          d.shortlink + '</a>';
      } else {
        linkEl.textContent = '—';
      }
    }

    const typeEl = document.getElementById('panel-type');
    if (typeEl) {
      if (settings.mode === 'directory') {
        if (d.type === 'folder') {
          typeEl.textContent = 'Folder';
          typeEl.style.color = COLORS.folder;
        } else {
          typeEl.textContent = 'File';
          typeEl.style.color = COLORS.file;
        }
      } else {
        const nodeType = d.nodeType || classifyAssemblyNode(d);
        const color = settings.mode === 'project' ? d.projectColor : COLORS[nodeType];
        if (nodeType === 'assembly') {
          typeEl.textContent = 'Assembly';
          typeEl.style.color = color || COLORS.assembly;
        } else if (nodeType === 'part') {
          typeEl.textContent = 'Part';
          typeEl.style.color = color || COLORS.part;
        } else if (nodeType === 'hybrid') {
          typeEl.textContent = 'Hybrid';
          typeEl.style.color = color || COLORS.hybrid;
        } else {
          typeEl.textContent = 'Orphan';
          typeEl.style.color = COLORS.orphan;
        }
      }
    }

    const depthEl = document.getElementById('panel-depth');
    if (depthEl) {
      depthEl.textContent = d.depth !== undefined ? d.depth : '—';
    }
    
    const childrenEl = document.getElementById('panel-children');
    if (childrenEl) {
      childrenEl.textContent = d.children_count !== undefined ? d.children_count : '—';
    }

    const usesEl = document.getElementById('panel-uses');
    if (usesEl) {
      usesEl.textContent = d.uses_count !== undefined ? d.uses_count : '—';
    }
    
    const usedInEl = document.getElementById('panel-used-in');
    if (usedInEl) {
      usedInEl.textContent = d.used_in_count !== undefined ? d.used_in_count : '—';
    }

    const projectEl = document.getElementById('panel-project');
    if (projectEl) {
      projectEl.textContent = d.project || '—';
      projectEl.style.color = d.projectColor || COLORS.orphan;
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

    if (settings.mode === 'directory') {
      const folderCount = nodes.filter(n => n.type === 'folder').length;
      const fileCount = nodes.filter(n => n.type === 'file').length;
      const edgeCount = links.length;
      statsEl.textContent = folderCount + ' folders · ' + fileCount + ' files · ' + edgeCount + ' edges';
    } else {
      const assemblyCount = nodes.filter(n => n.nodeType === 'assembly').length;
      const partCount = nodes.filter(n => n.nodeType === 'part').length;
      const hybridCount = nodes.filter(n => n.nodeType === 'hybrid').length;
      const edgeCount = links.length;
      statsEl.textContent = assemblyCount + ' assemblies · ' + partCount + ' parts · ' + hybridCount + ' hybrids · ' + edgeCount + ' uses';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

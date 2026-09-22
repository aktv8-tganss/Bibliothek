---
hide:
  - navigation
  - toc
---

# BOM Graph

Navigable force-directed graph of assembly→part relationships from Fusion Design References. Nodes drift under continuous physics; drag to move, release to return to simulation.

<div id="graph-container" markdown>
  <div id="graph-loading">Loading graph data...</div>
  <div id="cy"></div>
  
  <div id="graph-controls">
    <label>
      <input type="checkbox" id="show-orphans">
      Show orphans (degree 0)
    </label>
    <div id="search-row">
      <input type="text" id="node-search" placeholder="Search node...">
      <input type="number" id="hop-count" value="1" min="1" max="5" title="Hops">
    </div>
    <select id="project-filter">
      <option value="">All projects</option>
    </select>
    <div id="btn-row">
      <button class="control-btn" id="btn-reset">Reset</button>
      <button class="control-btn" id="btn-fit">Fit</button>
    </div>
    <button id="settings-toggle">Forces ▾</button>
    <div id="settings-panel">
      <div class="slider-row">
        <span class="slider-label">Center</span>
        <input type="range" id="slider-center" class="slider-input" min="0" max="0.2" step="0.01" value="0.05">
        <span class="slider-value" id="slider-center-value">0.05</span>
      </div>
      <div class="slider-row">
        <span class="slider-label">Repel</span>
        <input type="range" id="slider-repel" class="slider-input" min="-800" max="-50" step="10" value="-300">
        <span class="slider-value" id="slider-repel-value">-300</span>
      </div>
      <div class="slider-row">
        <span class="slider-label">Link</span>
        <input type="range" id="slider-link" class="slider-input" min="0" max="1" step="0.05" value="0.3">
        <span class="slider-value" id="slider-link-value">0.3</span>
      </div>
      <div class="slider-row">
        <span class="slider-label">Distance</span>
        <input type="range" id="slider-distance" class="slider-input" min="20" max="200" step="5" value="60">
        <span class="slider-value" id="slider-distance-value">60</span>
      </div>
      <div class="slider-row">
        <span class="slider-label">Collide</span>
        <input type="range" id="slider-collide" class="slider-input" min="0" max="50" step="2" value="20">
        <span class="slider-value" id="slider-collide-value">20</span>
      </div>
      <div class="slider-row">
        <span class="slider-label">Damping</span>
        <input type="range" id="slider-decay" class="slider-input" min="0.1" max="0.8" step="0.05" value="0.4">
        <span class="slider-value" id="slider-decay-value">0.4</span>
      </div>
      <button class="control-btn" id="btn-reset-settings">Reset Forces</button>
    </div>
  </div>
  
  <div id="node-panel">
    <button id="panel-close">×</button>
    <h3 id="panel-name"></h3>
    <div class="panel-row">
      <span class="panel-label">Type</span>
      <span class="panel-value" id="panel-type"></span>
    </div>
    <div class="panel-row">
      <span class="panel-label">Project</span>
      <span class="panel-value" id="panel-project"></span>
    </div>
    <div class="panel-row">
      <span class="panel-label">Path</span>
      <span class="panel-value" id="panel-path"></span>
    </div>
    <div class="panel-row">
      <span class="panel-label">Shortlink</span>
      <span class="panel-value" id="panel-shortlink"></span>
    </div>
    <div class="panel-row">
      <span class="panel-label">Uses</span>
      <span class="panel-value" id="panel-uses"></span>
    </div>
    <div class="panel-row">
      <span class="panel-label">Used In</span>
      <span class="panel-value" id="panel-used-in"></span>
    </div>
  </div>
  
  <div id="graph-legend">
    <div class="legend-item">
      <span class="legend-dot assembly"></span>
      <span>Assembly</span>
    </div>
    <div class="legend-item">
      <span class="legend-dot part"></span>
      <span>Part</span>
    </div>
  </div>
  
  <div id="graph-stats"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<link rel="stylesheet" href="graph.css">
<script src="graph.js"></script>

---
hide:
  - navigation
  - toc
---

# BOM Graph

Navigable force-directed graph of assembly→part relationships from Fusion Design References.

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
  </div>
  
  <div id="node-panel">
    <button id="panel-close">×</button>
    <h3 id="panel-name"></h3>
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
  
  <div id="graph-stats"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.28.1/cytoscape.min.js"></script>
<link rel="stylesheet" href="graph.css">
<script src="graph.js"></script>

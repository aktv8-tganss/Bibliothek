---
hide:
  - navigation
  - toc
  - footer
---

<style>
.md-content { padding: 0 !important; max-width: none !important; }
.md-content__inner { margin: 0 !important; padding: 0 !important; }
.md-main__inner { margin: 0 !important; max-width: none !important; }
article.md-content__inner { padding: 0 !important; }
</style>

<div id="graph-container">
  <div id="graph-loading">Loading graph data...</div>
  <div id="cy"></div>
  
  <a id="home-link" href="../" title="Bibliothek home" aria-label="Bibliothek home">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 8a3 3 0 0 0 3-3 3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3m0 3.54C9.64 9.35 6.5 8 3 8v11c3.5 0 6.64 1.35 9 3.54 2.36-2.19 5.5-3.54 9-3.54V8c-3.5 0-6.64 1.35-9 3.54"/></svg>
  </a>
  
  <div id="hover-name"></div>
  
  <div id="graph-controls" class="expanded">
    <div id="controls-header">
      <span id="controls-title">Controls</span>
      <button id="controls-collapse" title="Collapse">−</button>
    </div>
    <div id="controls-body">
      <select id="mode-select">
        <option value="directory">Directory</option>
        <option value="assembly">Assembly</option>
        <option value="project">Project</option>
      </select>
      <div id="search-row">
        <input type="text" id="node-search" placeholder="Search...">
        <input type="number" id="hop-count" value="1" min="1" max="5" title="Hops">
      </div>
      <div id="orphan-toggle-row">
        <label>
          <input type="checkbox" id="show-orphans">
          Show orphans
        </label>
      </div>
      <div id="btn-row">
        <button class="control-btn" id="btn-reset">Reset</button>
        <button class="control-btn" id="btn-fit">Fit</button>
      </div>
      <button id="settings-toggle">Advanced ▾</button>
      <div id="settings-panel">
        <div class="slider-row">
          <span class="slider-label">Center</span>
          <input type="range" id="slider-center" class="slider-input" min="0.01" max="0.3" step="0.01" value="0.1">
          <span class="slider-value" id="slider-center-value">0.1</span>
        </div>
        <div class="slider-row">
          <span class="slider-label">Repel</span>
          <input type="range" id="slider-repel" class="slider-input" min="-500" max="-50" step="10" value="-150">
          <span class="slider-value" id="slider-repel-value">-150</span>
        </div>
        <div class="slider-row">
          <span class="slider-label">Link</span>
          <input type="range" id="slider-link" class="slider-input" min="0.1" max="1" step="0.05" value="0.5">
          <span class="slider-value" id="slider-link-value">0.5</span>
        </div>
        <div class="slider-row">
          <span class="slider-label">Distance</span>
          <input type="range" id="slider-distance" class="slider-input" min="20" max="150" step="5" value="40">
          <span class="slider-value" id="slider-distance-value">40</span>
        </div>
        <div class="slider-row">
          <span class="slider-label">Collide</span>
          <input type="range" id="slider-collide" class="slider-input" min="0" max="40" step="2" value="12">
          <span class="slider-value" id="slider-collide-value">12</span>
        </div>
        <div class="slider-row">
          <span class="slider-label">Damping</span>
          <input type="range" id="slider-decay" class="slider-input" min="0.2" max="0.7" step="0.05" value="0.4">
          <span class="slider-value" id="slider-decay-value">0.4</span>
        </div>
        <div class="slider-row">
          <span class="slider-label">Size falloff</span>
          <input type="range" id="slider-size-falloff" class="slider-input" min="0.3" max="0.9" step="0.05" value="0.75">
          <span class="slider-value" id="slider-size-falloff-value">0.75</span>
        </div>
        <button class="control-btn" id="btn-reset-settings">Reset Forces</button>
      </div>
    </div>
  </div>
  
  <div id="controls-chip">
    <button id="controls-expand" title="Expand controls">☰</button>
  </div>
  
  <div id="node-panel">
    <button id="panel-close">×</button>
    <h3 id="panel-name"></h3>
    <div class="panel-row">
      <span class="panel-label">Type</span>
      <span class="panel-value" id="panel-type"></span>
    </div>
    <div class="panel-row">
      <span class="panel-label">Path</span>
      <span class="panel-value" id="panel-path"></span>
    </div>
    <div class="panel-row panel-field-directory">
      <span class="panel-label">Depth</span>
      <span class="panel-value" id="panel-depth"></span>
    </div>
    <div class="panel-row panel-field-directory">
      <span class="panel-label">Children</span>
      <span class="panel-value" id="panel-children"></span>
    </div>
    <div class="panel-row panel-field-assembly">
      <span class="panel-label">Uses</span>
      <span class="panel-value" id="panel-uses"></span>
    </div>
    <div class="panel-row panel-field-assembly">
      <span class="panel-label">Used In</span>
      <span class="panel-value" id="panel-used-in"></span>
    </div>
    <div class="panel-row panel-field-project">
      <span class="panel-label">Folder</span>
      <span class="panel-value" id="panel-project"></span>
    </div>
    <div class="panel-row">
      <span class="panel-label">Shortlink</span>
      <span class="panel-value" id="panel-shortlink"></span>
    </div>
    <div id="panel-actions">
      <a id="panel-bibliothek-link" href="#" class="panel-action-btn">Open in Bibliothek</a>
      <a id="panel-autodesk-link" href="#" target="_blank" rel="noopener" class="panel-action-btn panel-action-external">Open in Autodesk ↗</a>
    </div>
  </div>
  
  <div id="graph-help" class="visible">
    <button id="help-close" title="Close">×</button>
    <h4>How to use this graph</h4>
    <div class="help-section">
      <strong>Directory</strong> — Browse the folder tree. Navigate project structure and file containment.
    </div>
    <div class="help-section">
      <strong>Assembly</strong> — Trace BOM relationships. Assemblies (blue ring) use parts (green solid); hybrids do both.
    </div>
    <div class="help-section">
      <strong>Project</strong> — Same BOM mesh, colored by project folder. Parts solid, assemblies ring stroke, hybrids ring+dot.
    </div>
    <div class="help-divider"></div>
    <div class="help-section">
      <strong>Search</strong> — Type a name or path. Hops expand the visible neighborhood.
    </div>
    <div class="help-section">
      <strong>Click a node</strong> — View details, open in Bibliothek, or jump to Autodesk.
    </div>
  </div>

  <div id="graph-legend">
    <div id="legend-directory" class="legend-group">
      <div class="legend-item">
        <span class="legend-dot folder"></span>
        <span>Folder</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot file"></span>
        <span>File</span>
      </div>
    </div>
    <div id="legend-assembly" class="legend-group">
      <div class="legend-item">
        <span class="legend-dot assembly"></span>
        <span>Assembly</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot part"></span>
        <span>Part</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot hybrid"></span>
        <span>Hybrid</span>
      </div>
    </div>
    <div id="legend-project">
      <div class="legend-shapes">
        <div class="legend-item">
          <span class="legend-shape part-shape"></span>
          <span>Part (solid)</span>
        </div>
        <div class="legend-item">
          <span class="legend-shape assembly-shape"></span>
          <span>Assembly (ring)</span>
        </div>
        <div class="legend-item">
          <span class="legend-shape hybrid-shape"></span>
          <span>Hybrid (ring+dot)</span>
        </div>
      </div>
      <div id="project-colors" class="project-colors"></div>
    </div>
  </div>
  
  <div id="graph-stats"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<link rel="stylesheet" href="graph.css">
<script src="graph.js"></script>

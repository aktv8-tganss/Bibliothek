(function() {
  "use strict";

  function projectChip() {
    var path = window.location.pathname || "";
    var match = path.match(/\/designs\/([^/]+)\//);
    if (!match) return null;
    var code = match[1].match(/^([a-z]-\d+)/i);
    return code ? code[1].toUpperCase() : null;
  }

  function applyChip() {
    var h1 = document.querySelector(".md-typeset h1");
    if (!h1) return;
    var existing = h1.querySelector(".ocean-chip");
    if (existing) existing.remove();
    var code = projectChip();
    if (!code) return;
    var chip = document.createElement("span");
    chip.className = "ocean-chip";
    chip.textContent = code;
    h1.appendChild(chip);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(applyChip);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyChip);
  } else {
    applyChip();
  }
})();

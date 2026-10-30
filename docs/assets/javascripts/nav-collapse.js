(function() {
  "use strict";

  var TREE = ".ocean-tree .md-nav__toggle";

  function setNavState(expand) {
    var toggles = document.querySelectorAll(TREE);
    toggles.forEach(function(toggle) {
      toggle.checked = expand;
      toggle.indeterminate = false;
      toggle.classList.remove("md-toggle--indeterminate");
    });
    if (!expand) {
      document.querySelectorAll(
        ".ocean-tree .md-nav__item--active > .md-nav__toggle"
      ).forEach(function(toggle) {
        toggle.checked = true;
      });
    }
  }

  function updateButtonState(btn, isExpanded) {
    if (isExpanded) {
      btn.textContent = "Collapse all";
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("title", "Collapse all navigation sections");
    } else {
      btn.textContent = "Expand all";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("title", "Expand all navigation sections");
    }
  }

  function checkCurrentState() {
    var toggles = document.querySelectorAll(TREE);
    if (toggles.length === 0) return false;
    var checkedCount = 0;
    toggles.forEach(function(t) {
      if (t.checked || t.indeterminate) checkedCount++;
    });
    return checkedCount > toggles.length / 2;
  }

  function initNavCollapse() {
    var glyph = document.querySelector(".ocean-glyph");
    var tree = document.querySelector(".ocean-tree");
    if (!tree) return;

    var existingBtn = document.querySelector(".nav-collapse-btn");
    if (existingBtn) existingBtn.remove();
    var existingWrap = document.querySelector(".nav-collapse-wrapper");
    if (existingWrap) existingWrap.remove();

    var btn = document.createElement("button");
    btn.className = "nav-collapse-btn md-button";
    btn.type = "button";

    var isExpanded = checkCurrentState();
    updateButtonState(btn, isExpanded);

    btn.addEventListener("click", function() {
      isExpanded = !isExpanded;
      setNavState(isExpanded);
      updateButtonState(btn, isExpanded);
    });

    var wrapper = document.createElement("div");
    wrapper.className = "nav-collapse-wrapper";
    wrapper.appendChild(btn);

    if (glyph && glyph.parentNode) {
      glyph.parentNode.insertBefore(wrapper, glyph.nextSibling);
    } else {
      tree.parentNode.insertBefore(wrapper, tree);
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function() {
      initNavCollapse();
    });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initNavCollapse);
    } else {
      initNavCollapse();
    }
  }
})();

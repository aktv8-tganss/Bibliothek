(function() {
  "use strict";

  function setNavState(expand) {
    var toggles = document.querySelectorAll(
      '.md-nav--primary .md-nav__toggle:not([id="__toc"]):not([id="__drawer"])'
    );
    toggles.forEach(function(toggle) {
      toggle.checked = expand;
      toggle.indeterminate = false;
      toggle.classList.remove("md-toggle--indeterminate");
    });
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
    var toggles = document.querySelectorAll(
      '.md-nav--primary .md-nav__toggle:not([id="__toc"]):not([id="__drawer"])'
    );
    if (toggles.length === 0) return true;
    var checkedCount = 0;
    toggles.forEach(function(t) {
      if (t.checked || t.indeterminate) checkedCount++;
    });
    return checkedCount > toggles.length / 2;
  }

  function initNavCollapse() {
    var nav = document.querySelector(".md-nav--primary > .md-nav__list");
    if (!nav) return;

    var existingBtn = document.querySelector(".nav-collapse-btn");
    if (existingBtn) existingBtn.remove();

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

    nav.parentNode.insertBefore(wrapper, nav);
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

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
          var nav = document.querySelector(".md-nav--primary > .md-nav__list");
          var btn = document.querySelector(".nav-collapse-btn");
          if (nav && !btn) {
            initNavCollapse();
          }
        }
      });
    });

    var sidebar = document.querySelector(".md-sidebar--primary");
    if (sidebar) {
      observer.observe(sidebar, { childList: true, subtree: true });
    }
  }
})();

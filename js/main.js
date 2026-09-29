/* Dulce Fernandes - Home page interactions */
(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  /* Sticky header state */
  function onScroll() {
    if (window.scrollY > 20) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  function closeMenu() {
    primaryNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
  navToggle.addEventListener("click", function () {
    var open = primaryNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  /* Dropdown (Offers) */
  var dropdown = document.getElementById("offersDropdown");
  var dropdownToggle = dropdown ? dropdown.querySelector(".nav-link-toggle") : null;
  var mq = window.matchMedia("(max-width: 720px)");

  function closeDropdown() {
    if (!dropdown) return;
    dropdown.classList.remove("is-open");
    if (dropdownToggle) dropdownToggle.setAttribute("aria-expanded", "false");
  }

  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function (e) {
      // On mobile the toggle expands the submenu instead of navigating.
      // On desktop hover handles it, but click still toggles for keyboard/touch.
      if (mq.matches) e.preventDefault();
      var open = dropdown.classList.toggle("is-open");
      dropdownToggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* Close menu / dropdown when a real link is clicked */
  Array.prototype.forEach.call(primaryNav.querySelectorAll(".nav-link:not(.nav-link-toggle), .dropdown-link"), function (link) {
    link.addEventListener("click", function () {
      closeMenu();
      closeDropdown();
    });
  });

  /* Close dropdown on outside click and Escape */
  document.addEventListener("click", function (e) {
    if (dropdown && !dropdown.contains(e.target)) closeDropdown();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDropdown(); closeMenu(); }
  });
})();

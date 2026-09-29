/* Dulce Fernandes - content lock (casual-copy deterrent).
   Note: client-side protection only. It stops casual copying, not a
   determined user with dev tools or JavaScript disabled. */
(function () {
  "use strict";

  // Mark the document as locked so CSS selection rules apply.
  document.documentElement.classList.add("locked");

  function inField(el) {
    if (!el) return false;
    var tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  }

  function block(e) {
    if (inField(e.target)) return; // keep form fields usable
    e.preventDefault();
  }

  // Right-click menu
  document.addEventListener("contextmenu", block);

  // Text selection, copy, cut, and drag
  document.addEventListener("selectstart", block);
  document.addEventListener("copy", block);
  document.addEventListener("cut", block);
  document.addEventListener("dragstart", block);

  // Image saving via long-press / drag
  Array.prototype.forEach.call(document.images, function (img) {
    img.setAttribute("draggable", "false");
  });

  // Keyboard shortcuts: view-source, save, print-to-copy, dev tools, select-all
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    var ctrl = e.ctrlKey || e.metaKey;

    // F12 dev tools
    if (k === "f12") { e.preventDefault(); return; }

    // Ctrl/Cmd + Shift + I / J / C  (dev tools, inspector, console)
    if (ctrl && e.shiftKey && (k === "i" || k === "j" || k === "c")) {
      e.preventDefault();
      return;
    }

    // Ctrl/Cmd + U (view source), S (save), P (print), A/C/X outside fields
    if (ctrl && (k === "u" || k === "s" || k === "p")) {
      e.preventDefault();
      return;
    }
    if (ctrl && (k === "a" || k === "c" || k === "x") && !inField(e.target)) {
      e.preventDefault();
    }
  });
})();

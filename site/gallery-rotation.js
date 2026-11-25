(() => {
  "use strict";

  // O trilho de fotos já oferece rolagem nativa por toque. No mouse e na
  // apresentação de páginas, um arrasto lateral avança um item por gesto.
  window.bindGalleryDrag = function (track, move, { mouseOnly = false } = {}) {
    let start = null;
    let suppressClick = false;
    track.addEventListener("dragstart", event => event.preventDefault());
    track.addEventListener("pointerdown", event => {
      suppressClick = false;
      if (!event.isPrimary || event.button !== 0 || (mouseOnly && event.pointerType !== "mouse")) return;
      start = { id:event.pointerId, x:event.clientX, y:event.clientY };
    });
    track.addEventListener("pointermove", event => {
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      if (Math.abs(dy) > 16 && Math.abs(dy) > Math.abs(dx)) start = null;
      else if (Math.abs(dx) > 10) track.setPointerCapture(event.pointerId);
    });
    window.addEventListener("pointerup", event => {
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      start = null;
      if (Math.abs(dx) < 32) return;
      suppressClick = true;
      move(dx < 0 ? 1 : -1);
    });
    track.addEventListener("pointercancel", () => { start = null; });
    track.addEventListener("click", event => {
      if (!suppressClick || event.detail === 0) return;
      suppressClick = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  };

  // A leitura ampliada, a escolha de movimento e o tempo fora da tela valem
  // igualmente para as páginas, as fotos e as conversas.
  window.attachGalleryRotation = function (region, toolbar, delay, advance) {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const control = document.createElement("button");
    control.type = "button";
    control.className = "rotation-control";
    const pauseIcon = '<path d="M8 5v14m8-14v14"/>';
    const playIcon = '<path d="m8 5 11 7-11 7z"/>';
    let inView = !("IntersectionObserver" in window);
    let paused = false;
    let holding = false;
    let timer;

    function schedule() {
      clearTimeout(timer);
      if (!inView || paused || holding || motion.matches || document.hidden) return;
      timer = setTimeout(() => {
        const focusedLink = region.querySelector("a:focus-visible");
        if (!focusedLink && !document.querySelector("dialog[open]")) advance();
        schedule();
      }, delay);
    }
    function updateControl() {
      const label = paused ? "Retomar apresentação" : "Pausar apresentação";
      control.title = label;
      control.setAttribute("aria-label", label);
      control.hidden = motion.matches;
      control.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + (paused ? playIcon : pauseIcon) + "</svg>";
      schedule();
    }
    control.addEventListener("click", () => {
      paused = !paused;
      updateControl();
    });
    toolbar.append(control);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting;
        schedule();
      });
      observer.observe(toolbar.closest("figure") || region);
    }
    region.addEventListener("pointerdown", () => { holding = true; schedule(); }, { passive: true });
    function release() {
      if (!holding) return;
      holding = false;
      schedule();
    }
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    region.addEventListener("close", schedule, true);
    region.addEventListener("focusout", schedule);
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", updateControl);
    updateControl();
  };
})();

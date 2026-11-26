(() => {
  "use strict";

  function initialize() {
    const gallery = document.getElementById("sample-gallery");
    const samples = (window.SITE_CONFIG?.samples || []).filter(page => page?.src && page?.full);
    if (!gallery || gallery.children.length || !samples.length) return;
    const labels = window.SITE_CONFIG.galleryLabels;

    // Lucide icons (ISC). Only the paths used by this component are included.
    const paths = {
      previous: '<path d="m15 18-6-6 6-6"/>',
      next: '<path d="m9 18 6-6-6-6"/>',
      expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/>',
      plus: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6m-3-3v6"/>',
      minus: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/>',
      close: '<path d="m18 6-12 12M6 6l12 12"/>'
    };
    const icon = name => '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + paths[name] + "</svg>";
    const element = (tag, className, label) => {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (label) node.textContent = label;
      return node;
    };
    const button = (name, label) => {
      const node = element("button", "sg-control");
      node.type = "button";
      node.setAttribute("aria-label", label);
      node.title = label;
      node.innerHTML = icon(name);
      return node;
    };

    gallery.classList.add("sg-gallery");
    const track = element("div", "sg-track");
    track.id = "sample-slides";
    track.setAttribute("role", "group");
    track.setAttribute("aria-label", labels.region);
    gallery.append(track);

    const slides = samples.map((page, index) => {
      const figure = element("figure", "sg-slide");
      const link = element("a", "sg-frame");
      link.href = page.full;
      link.setAttribute("aria-label", labels.open + " " + page.title);
      const image = element("img", "sg-page");
      image.alt = page.alt || page.title;
      image.width = page.width || 1072;
      image.height = page.height || 1516;
      image.loading = "lazy";
      image.src = page.src;
      image.decoding = "async";
      const expand = element("span", "sg-expand");
      expand.innerHTML = icon("plus");
      link.append(image, expand);
      const caption = element("figcaption", "sg-caption");
      const heading = element("strong", "sg-title", page.folio + " · " + page.title);
      caption.append(heading, element("span", "sg-description", page.description));
      figure.append(link, caption);
      track.append(figure);
      link.addEventListener("click", event => {
        if (event.ctrlKey || event.shiftKey || event.metaKey || event.altKey || !dialog.showModal) return;
        event.preventDefault();
        openReader(index, link);
      });
      return { figure, link, image };
    });

    const desktop = matchMedia("(min-width: 1024px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = element("div", "sg-viewport");
    track.before(viewport);
    viewport.append(track);
    const navigation = element("div", "sg-navigation");
    navigation.setAttribute("aria-label", labels.region);
    const dots = samples.map((page, i) => {
      const dot = element("button", "sg-dot");
      dot.type = "button";
      dot.setAttribute("aria-label", page.folio + " · " + page.title);
      dot.addEventListener("click", () => { select(i); schedule(2000); });
      navigation.append(dot);
      return dot;
    });
    gallery.append(navigation);

    // Cópias nas extremidades permitem atravessar 07 → 01 sem voltar pelo trilho.
    function edgeSlide(i) {
      const copy = slides[i].figure.cloneNode(true);
      copy.classList.add("sg-copy");
      copy.setAttribute("aria-hidden", "true");
      const link = copy.querySelector("a");
      link.tabIndex = -1;
      link.addEventListener("click", event => {
        event.preventDefault();
        select(i);
        openReader(i, slides[i].link);
      });
      return copy;
    }
    track.prepend(edgeSlide(slides.length - 1));
    track.append(edgeSlide(0));
    let active = 0;
    let timer, settleTimer, drag;
    let visible = false, hovered = false, suppressClick = false;
    function snap() {
      clearTimeout(settleTimer);
      track.classList.add("sg-instant");
      track.style.setProperty("--position", active + 1);
      track.getBoundingClientRect();
      track.classList.remove("sg-instant");
    }
    function select(index) {
      snap();
      active = (index + slides.length) % slides.length;
      track.style.setProperty("--position", index + 1);
      slides.forEach(({figure, link}, i) => {
        figure.classList.toggle("is-current", i === active);
        link.tabIndex = desktop.matches || i === active ? 0 : -1;
        dots[i].setAttribute("aria-current", String(i === active));
      });
      track.firstElementChild.classList.toggle("is-current", active === slides.length - 1);
      track.lastElementChild.classList.toggle("is-current", active === 0);
      if (index !== active) settleTimer = setTimeout(snap, reduced.matches ? 0 : 620);
    }
    function schedule(delay = 3500) {
      clearTimeout(timer);
      if (!visible || reduced.matches || hovered || drag || dialog.open || document.hidden) return;
      timer = setTimeout(() => { select(active + 1); schedule(); }, delay);
    }
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }).observe(viewport);
    new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) {
        gallery.closest("section#amostra").classList.add("sample-enter");
        observer.disconnect();
      }
    }).observe(document.getElementById("amostra"));
    gallery.addEventListener("pointerenter", e => {
      if (e.pointerType === "mouse") { hovered = true; clearTimeout(timer); }
    });
    gallery.addEventListener("pointerleave", e => {
      if (e.pointerType === "mouse") { hovered = false; schedule(2000); }
    });
    track.addEventListener("dragstart", e => e.preventDefault());
    track.addEventListener("pointerdown", e => {
      if (!e.isPrimary || e.button !== 0) return;
      clearTimeout(timer);
      snap();
      suppressClick = false;
      drag = {id:e.pointerId, x:e.clientX};
    });
    track.addEventListener("pointermove", e => {
      if (drag?.id !== e.pointerId) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) < 8 && !suppressClick) return;
      suppressClick = true;
      track.setPointerCapture(e.pointerId);
      track.classList.add("sg-instant");
      track.style.setProperty("--drag", Math.max(-track.clientWidth*.78, Math.min(track.clientWidth*.78, dx)) + "px");
    });
    function release(e) {
      if (drag?.id !== e.pointerId) return;
      const dx = e.clientX - drag.x;
      drag = null;
      track.classList.remove("sg-instant");
      track.style.removeProperty("--drag");
      if (e.type === "pointerup" && Math.abs(dx) > 30) select(active + (dx < 0 ? 1 : -1));
      schedule(2000);
    }
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    track.addEventListener("click", e => {
      if (suppressClick && e.detail) { e.preventDefault(); e.stopImmediatePropagation(); suppressClick = false; }
    }, true);
    desktop.addEventListener("change", () => select(active));
    reduced.addEventListener("change", () => schedule());
    document.addEventListener("visibilitychange", () => schedule());
    gallery.addEventListener("keydown", e => {
      if (dialog.open || !["ArrowLeft","ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      select(active + (e.key === "ArrowRight" ? 1 : -1));
      slides[active].link.focus({preventScroll:true});
      schedule(2000);
    });
    select(0);

    const dialog = element("dialog", "sg-reader");
    dialog.setAttribute("aria-labelledby", "sg-reader-title");
    const toolbar = element("div", "sg-toolbar");
    const title = element("h3", "sg-reader-title");
    title.id = "sg-reader-title";
    const zoom = button("plus", labels.zoom);
    const close = button("close", labels.close);
    close.autofocus = true;
    dialog.addEventListener("keydown", event => {
      if (event.key !== "Tab") return;
      event.preventDefault();
      (document.activeElement === zoom ? close : zoom).focus();
    });
    const pane = element("div", "sg-pane");
    const sheet = element("div", "sg-sheet");
    const fullImage = element("img", "sg-full");
    sheet.append(fullImage);
    pane.append(sheet);
    toolbar.append(title, zoom, close);
    dialog.append(toolbar, pane);
    gallery.append(dialog);

    let pageIndex = 0;
    let invokingLink;
    let zoomed = false;
    function sizeReader() {
      if (!dialog.open) return;
      const page = samples[pageIndex];
      const aspect = page.width / page.height || 1 / Math.sqrt(2);
      const fitWidth = Math.max(40, Math.min(pane.clientWidth - 24, (pane.clientHeight - 24) * aspect));
      const detailWidth = Math.max(fitWidth, Math.min(fullImage.naturalWidth || 1600, Math.max(1050, fitWidth * 2.3)));
      fullImage.style.width = Math.floor(zoomed ? detailWidth : fitWidth) + "px";
      zoom.innerHTML = icon(zoomed ? "minus" : "plus");
      const action = zoomed ? labels.fit : labels.zoom;
      zoom.setAttribute("aria-label", action);
      zoom.title = action;
      zoom.setAttribute("aria-pressed", String(zoomed));
      fullImage.classList.toggle("sg-enlarged", zoomed);
    }
    function openReader(index, link) {
      if (dialog.open) return;
      clearTimeout(timer);
      invokingLink = link;
      pageIndex = index;
      zoomed = false;
      const page = samples[index];
      title.textContent = page.title;
      fullImage.alt = page.alt || page.title;
      fullImage.width = page.width || 1072;
      fullImage.height = page.height || 1516;
      fullImage.src = page.src;
      dialog.showModal();
      document.documentElement.classList.add("sg-reading");
      sizeReader();
      pane.scrollTo(0, 0);
      const preload = new Image();
      preload.onload = () => {
        if (dialog.open && pageIndex === index) {
          fullImage.src = page.full;
          sizeReader();
        }
      };
      preload.src = page.full;
    }
    function toggleZoom(event) {
      const box = fullImage.getBoundingClientRect();
      const onPage = event.currentTarget === fullImage;
      const x = onPage ? (event.clientX - box.left) / box.width : 0.5;
      const y = onPage ? (event.clientY - box.top) / box.height : 0.5;
      zoomed = !zoomed;
      sizeReader();
      pane.scrollTo(
        12 + fullImage.clientWidth * x - pane.clientWidth / 2,
        12 + fullImage.clientHeight * y - pane.clientHeight / 2
      );
    }
    fullImage.addEventListener("load", sizeReader);
    fullImage.addEventListener("click", toggleZoom);
    zoom.addEventListener("click", toggleZoom);
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if ([dialog, pane, sheet].includes(event.target)) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("sg-reading");
      fullImage.removeAttribute("src");
      invokingLink?.focus({ preventScroll: true });
      schedule(2000);
    });
    if ("ResizeObserver" in window) new ResizeObserver(sizeReader).observe(pane);
    else window.addEventListener("resize", sizeReader);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();

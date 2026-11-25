(() => {
  "use strict";

  // Lucide, ISC. Somente os traços usados pelas galerias.
  const paths = {
    previous: '<path d="m15 18-6-6 6-6"/>',
    next: '<path d="m9 18 6-6-6-6"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6m-3-3v6"/>',
    fit: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>'
  };

  function node(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function icon(name) {
    return '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + paths[name] + '</svg>';
  }

  function control(name, label) {
    const button = node("button", "ms-control");
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.innerHTML = icon(name);
    return button;
  }

  function createReader(container) {
    const dialog = node("dialog", "ms-reader");
    const toolbar = node("div", "ms-toolbar");
    const title = node("h3", "ms-reader-title");
    const zoom = control("zoom", "Ampliar detalhes");
    const close = control("close", "Fechar imagem");
    const pane = node("div", "ms-pane");
    const image = node("img", "ms-full");
    let trigger;
    let isZoomed = false;
    title.id = container.id + "-titulo-leitura";
    dialog.setAttribute("aria-labelledby", title.id);
    close.autofocus = true;
    pane.tabIndex = 0;
    pane.setAttribute("role", "region");
    pane.setAttribute("aria-label", "Imagem ampliada");
    toolbar.append(title, zoom, close);
    pane.append(image);
    dialog.append(toolbar, pane);
    container.append(dialog);

    function setZoom(enabled, point) {
      const box = image.getBoundingClientRect();
      const x = point ? (point.clientX - box.left) / box.width : .5;
      const y = point ? (point.clientY - box.top) / box.height : .35;
      isZoomed = enabled;
      pane.classList.toggle("ms-zoomed", enabled);
      zoom.innerHTML = icon(enabled ? "fit" : "zoom");
      zoom.title = enabled ? "Ajustar imagem à tela" : "Ampliar detalhes";
      zoom.setAttribute("aria-label", zoom.title);
      zoom.setAttribute("aria-pressed", String(enabled));
      if (enabled) {
        pane.scrollTo(image.clientWidth * x - pane.clientWidth / 2, image.clientHeight * y - pane.clientHeight / 2);
      } else {
        pane.scrollTo(0, 0);
      }
    }
    zoom.addEventListener("click", () => setZoom(!isZoomed));
    image.addEventListener("click", event => setZoom(!isZoomed, event));
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("ms-reading");
      image.removeAttribute("src");
      trigger?.focus({ preventScroll: true });
    });
    return (entry, link, fallbackTitle) => {
      trigger = link;
      title.textContent = entry.caption || fallbackTitle;
      image.alt = entry.imageAlt || title.textContent;
      image.src = entry.full || entry.image;
      dialog.showModal();
      document.documentElement.classList.add("ms-reading");
      setZoom(false);
    };
  }

  function createStrip(container, entries, feedback) {
    const media = (entries || []).filter(entry => entry?.image);
    if (!container || !media.length || container.children.length) return;
    const title = feedback ? "Conversas sobre a biblioteca" : "Fotos da biblioteca em uso";
    const track = node("ul", "ms-track");
    const nav = node("div", "ms-navigation");
    const hint = node("p", "ms-hint", feedback ? "Toque na conversa para ler." : "Toque na foto para ampliar.");
    const controls = node("div", "ms-controls");
    const previous = control("previous", "Ver item anterior");
    const next = control("next", "Ver próximo item");
    const position = node("span", "ms-position");
    const status = node("span", "ms-sr");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    container.classList.add("media-strip", feedback ? "ms-feedback" : "ms-photos");
    container.setAttribute("role", "region");
    container.setAttribute("aria-label", title);
    container.setAttribute("aria-roledescription", "carrossel");
    track.id = container.id + "-imagens";
    track.tabIndex = 0;
    track.setAttribute("aria-label", title);
    previous.setAttribute("aria-controls", track.id);
    next.setAttribute("aria-controls", track.id);
    position.setAttribute("aria-hidden", "true");
    status.setAttribute("aria-live", "polite");
    status.setAttribute("aria-atomic", "true");
    previous.classList.add("motion-alternative");
    next.classList.add("motion-alternative");
    controls.append(previous, position, next);
    nav.append(hint, controls);
    container.append(track, nav, status);
    const openReader = createReader(container);
    const canShowDialog = typeof HTMLDialogElement !== "undefined" && "showModal" in HTMLDialogElement.prototype;

    // O recorte do trilho também limita o IntersectionObserver no eixo horizontal.
    function loadPreview(image) {
      const {src,width} = image.dataset;
      const small = src.replace(".webp","-compacta.webp");
      image.srcset = small + " " + Math.min(360, Number(width)) + "w, " + src + " " + width + "w";
      const mobileSource = image.parentElement.querySelector("source");
      mobileSource.srcset = small;
      image.sizes = "(max-width: 767px) 72vw, 300px";
      image.src = src;
    }
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(changes => {
      for (const change of changes) {
        if (!change.isIntersecting) continue;
        const image = change.target;
        loadPreview(image);
        observer.unobserve(image);
      }
    }, { rootMargin: "320px 0px" }) : null;
    const cards = media.map((entry, index) => {
      const card = node("li", "ms-card");
      const figure = node("figure", "ms-figure");
      const link = node("a", "ms-image-link");
      const image = node("img", "ms-preview");
      const itemLabel = (feedback ? "Conversa " : "Foto ") + (index + 1) + " de " + media.length;
      image.width = entry.width;
      image.height = entry.height;
      image.alt = entry.imageAlt || entry.caption || itemLabel;
      image.decoding = "async";
      image.loading = "lazy";
      link.href = entry.full || entry.image;
      link.setAttribute("aria-label", "Ampliar. " + itemLabel + ". " + image.alt);
      card.style.setProperty("--ms-ratio", String(entry.width / entry.height));
      const picture = node("picture");
      const mobileSource = node("source");
      mobileSource.media = "(max-width: 767px)";
      picture.append(mobileSource, image);
      link.append(picture);
      figure.append(link);
      if (entry.caption && !feedback) figure.append(node("figcaption", "ms-caption", entry.caption));
      if (feedback && entry.name) figure.append(node("figcaption", "ms-caption", [entry.name, entry.city].filter(Boolean).join(" · ")));
      card.append(figure);
      track.append(card);
      image.dataset.src = entry.image;
      image.dataset.width = entry.width;
      if (observer) {
        observer.observe(image);
      } else {
        loadPreview(image);
      }
      link.addEventListener("click", event => {
        if (!canShowDialog || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openReader(entry, link, itemLabel);
      });
      return card;
    });

    function visibleCard() {
      return Array.from(track.children).reduce((nearest, card) =>
        Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(nearest.offsetLeft - track.scrollLeft) ? card : nearest
      );
    }
    function update() {
      const first = cards.indexOf(visibleCard()) + 1;
      position.textContent = first + " / " + media.length;
      controls.hidden = media.length < 2;
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }
    function goTo(card, instant = reducedMotion.matches) {
      track.scrollTo({ left: card.offsetLeft, behavior: instant ? "instant" : "smooth" });
    }
    function advance() {
      const first = visibleCard();
      // O item atual e os seguintes já estão desenhados. Reorganizá-los no
      // mesmo quadro mantém a posição visual e permite repetir em sequência.
      while (track.firstElementChild !== first) track.append(track.firstElementChild);
      track.scrollTo({ left: 0, behavior: "instant" });
      requestAnimationFrame(() => goTo(track.children[1], false));
    }
    if (cards.length > 1) window.attachGalleryRotation(container, controls, feedback ? 9000 : 6500, advance);

    function manualMove(direction) {
      const ordered = Array.from(track.children);
      const index = ordered.indexOf(visibleCard());
      const card = ordered[Math.min(ordered.length - 1, Math.max(0, index + direction))];
      goTo(card);
      status.textContent = card.querySelector("a").getAttribute("aria-label");
    }
    previous.addEventListener("click", () => manualMove(-1));
    next.addEventListener("click", () => manualMove(1));
    window.bindGalleryDrag(track, manualMove, { mouseOnly: true });
    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches) {
        const stay = visibleCard();
        track.append(...cards);
        goTo(stay, true);
      }
      update();
    });
    track.addEventListener("keydown", event => {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(event.key) || event.ctrlKey || event.altKey || event.metaKey) return;
      event.preventDefault();
      const ordered = Array.from(track.children);
      const focused = event.target.closest(".ms-card");
      const index = ordered.indexOf(focused || visibleCard());
      const destinations = { Home: 0, End: ordered.length - 1, ArrowLeft: index - 1, ArrowRight: index + 1 };
      const destination = ordered[Math.max(0, Math.min(ordered.length - 1, destinations[event.key]))];
      if (focused) destination.querySelector("a").focus({ preventScroll: true });
      goTo(destination);
    });
    let frame = 0;
    function scheduleUpdate() {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; update(); });
    }
    track.addEventListener("scroll", scheduleUpdate, { passive: true });
    if ("ResizeObserver" in window) new ResizeObserver(scheduleUpdate).observe(track);
    else window.addEventListener("resize", scheduleUpdate);
    update();
  }

  function start() {
    const config = window.SITE_CONFIG;
    if (!config) return;
    createStrip(document.getElementById("usage-gallery"), config.usagePhotos, false);
    if (config.testimonials?.enabled) createStrip(document.getElementById("feedback-gallery"), config.testimonials.entries, true);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();

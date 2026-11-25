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
      image.decoding = "async";
      const expand = element("span", "sg-expand");
      expand.innerHTML = icon("expand");
      link.append(image, expand);
      const caption = element("figcaption", "sg-caption");
      if (page.folio) caption.append(element("span", "sg-folio", page.folio));
      caption.append(element("span", "sg-title", page.title));
      figure.append(link, caption);
      track.append(figure);
      link.addEventListener("click", event => {
        if (event.ctrlKey || event.shiftKey || event.metaKey || event.altKey || !dialog.showModal) return;
        event.preventDefault();
        openReader(index, link);
      });
      return { figure, link, image };
    });

    function loadThumbnail(index) {
      const image = slides[index].image;
      if (!image.hasAttribute("src")) {
        const src = samples[index].src;
        image.srcset = src.replace(".webp","-compacta.webp") + " 380w, " + src + " 558w";
        image.sizes = "(max-width: 767px) 85vw, 385px";
        image.src = src;
      }
    }
    let active = 0;
    function display(index) {
      active = (index + slides.length) % slides.length;
      gallery.style.setProperty("--page-index", active);
      slides.forEach(({ figure, link }, i) => {
        const current = i === active;
        figure.classList.toggle("is-current", current);
        figure.inert = !current;
        figure.setAttribute("aria-hidden", String(!current));
        link.tabIndex = current ? 0 : -1;
      });
    }
    // A folha é composta por texto pequeno. As versões ampliadas só são
    // solicitadas pelo leitor quando ele toca na página.
    function preparePages() {
      loadThumbnail(active);
      if (samples.length > 1) loadThumbnail((active + 1) % slides.length);
    }
    if ("IntersectionObserver" in window) {
      const preload = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        preparePages();
        preload.disconnect();
      }, { rootMargin: "200px 0px" });
      preload.observe(track);
    } else preparePages();

    function change(direction) {
      display(active + direction);
      preparePages();
    }
    display(0);
    window.bindGalleryDrag(track, direction => change(direction));
    const navigation = element("div", "sg-navigation");
    navigation.append(element("p", "sg-hint", labels.hint));
    if (slides.length > 1) {
      const previous = button("previous", labels.previous);
      const next = button("next", labels.next);
      for (const control of [previous, next]) {
        control.classList.add("motion-alternative");
        control.setAttribute("aria-controls", track.id);
      }
      previous.addEventListener("click", () => change(-1));
      next.addEventListener("click", () => change(1));
      navigation.append(previous, next);
      window.attachGalleryRotation(gallery, navigation, 6500, () => change(1));
    }
    gallery.append(navigation);
    track.addEventListener("keydown", event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      change(event.key === "ArrowLeft" ? -1 : 1);
      slides[active].link.focus({ preventScroll: true });
    });

    const dialog = element("dialog", "sg-reader");
    dialog.setAttribute("aria-labelledby", "sg-reader-title");
    const toolbar = element("div", "sg-toolbar");
    const title = element("h3", "sg-reader-title");
    title.id = "sg-reader-title";
    const zoom = button("plus", labels.zoom);
    const close = button("close", labels.close);
    close.autofocus = true;
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
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("sg-reading");
      fullImage.removeAttribute("src");
      invokingLink?.focus({ preventScroll: true });
    });
    if ("ResizeObserver" in window) new ResizeObserver(sizeReader).observe(pane);
    else window.addEventListener("resize", sizeReader);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();

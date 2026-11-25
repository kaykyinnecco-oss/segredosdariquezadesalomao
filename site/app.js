(() => {
  "use strict";
  const config = window.SITE_CONFIG;
  const copy = config.copy;
  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: config.currency });

  document.title = config.productName + " | " + copy.brand;
  document.querySelector('meta[name="description"]').content = config.productName + ". " + config.subtitle;
  document.querySelectorAll("[data-copy]").forEach(node => {
    if (Object.hasOwn(copy, node.dataset.copy)) node.textContent = copy[node.dataset.copy];
  });
  document.querySelectorAll("[data-image]").forEach(img => { img.src = config.images[img.dataset.image]; });
  document.querySelector('link[rel="icon"]').href = config.images.brand;
  document.querySelectorAll("[data-price]").forEach(node => {
    node.textContent = money.format(config.price);
  });

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  const coverObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.srcset = entry.target.dataset.srcset;
      entry.target.src = entry.target.dataset.src;
      coverObserver.unobserve(entry.target);
    }
  }, { rootMargin: "300px 0px" }) : null;
  for (const [index, book] of config.bonuses.entries()) {
    const article = element("article", "bonus");
    const cover = element("img");
    cover.width = 520;
    cover.height = 696;
    cover.loading = "lazy";
    cover.decoding = "async";
    const base = "assets/media/volume-" + (index + 1);
    cover.sizes = "(max-width: 767px) 145px, 190px";
    cover.dataset.srcset = base + "-280.webp 280w, " + base + "-480.webp 480w";
    cover.dataset.src = base + "-280.webp";
    cover.alt = "Capa de " + book.title;
    const details = element("div");
    details.append(element("p", "eyebrow", book.label), element("h3", "", book.title), element("p", "bonus-description", book.description));
    const sleeve = element("div", "bonus-art");
    sleeve.append(cover);
    article.append(sleeve, details);
    document.getElementById("bonus-list").append(article);
    if (coverObserver) coverObserver.observe(cover);
    else cover.src = cover.dataset.src;
  }
  const hasGuarantee = config.guaranteeEnabled && Boolean(config.images.seal);
  document.querySelector("#garantia").hidden = !hasGuarantee;
  document.querySelector("#leitura").hidden = !config.usagePhotos.some(photo => photo.image);
  document.querySelector("#feedback").hidden = !config.testimonials.enabled ||
    !config.testimonials.entries.some(entry => entry.image || entry.text?.trim());
  if (config.testimonials.enabled) {
    const quotes = element("div", "feedback-quotes");
    for (const entry of config.testimonials.entries.filter(entry => entry.text?.trim())) {
      const quote = element("figure", "feedback-quote");
      quote.append(element("blockquote", "", entry.text));
      if (entry.name?.trim()) quote.append(element("figcaption", "", entry.name));
      quotes.append(quote);
    }
    if (quotes.childElementCount) document.getElementById("feedback-gallery").after(quotes);
  }
  for (const item of config.faq) {
    if (item.guaranteeOnly && !hasGuarantee) continue;
    const details = element("details", "faq-item");
    details.open = document.getElementById("faq-list").children.length < 2;
    details.append(element("summary", "", item.question), element("p", "", item.answer));
    document.getElementById("faq-list").append(details);
  }
  const footer = document.getElementById("footer-links");
  function footerLink(label, value, protocols) {
    if (!value?.trim()) return;
    let url;
    try { url = new URL(value, document.baseURI); } catch { return; }
    if (!protocols.includes(url.protocol)) return;
    const link = element("a", "", label);
    link.href = url.href;
    footer.insertBefore(link, footer.lastElementChild);
  }
  footerLink(copy.supportLabel, config.links.support, ["https:", "http:", "mailto:"]);
  for (const link of footer.querySelectorAll("[data-local-info]")) {
    const configured = config.links[link.dataset.localInfo];
    if (configured && /^https?:\/\//i.test(configured)) link.href = configured;
    else link.addEventListener("click", event => {
      const dialog = document.querySelector(link.hash);
      if (!dialog?.showModal) return;
      event.preventDefault();
      dialog.showModal();
    });
  }


  // A capa tem prioridade. Rolar a página também carrega os componentes de leitura.
  let galleriesRequested = false;
  function loadGalleries() {
    if (galleriesRequested) return;
    galleriesRequested = true;
    for (const file of ["offer.js?v=2", "rotation.js"]) {
      const script = document.createElement("script");
      script.async = false;
      script.src = file;
      document.head.append(script);
    }
  }
  const heroImage = document.getElementById("hero-cover");
  if (heroImage.complete) loadGalleries();
  else {
    heroImage.addEventListener("load", loadGalleries, {once:true});
    heroImage.addEventListener("error", loadGalleries, {once:true});
    window.addEventListener("scroll", loadGalleries, {once:true, passive:true});
  }

  const dock = document.getElementById("purchase-dock");
  const hero = document.querySelector(".hero");
  const offer = document.getElementById("plano");
  const syncDock = () => {
    const visible = hero.getBoundingClientRect().bottom <= 0 &&
      offer.getBoundingClientRect().top > innerHeight + 16 &&
      !document.querySelector("dialog[open]");
    dock.hidden = !visible;
    dock.inert = !visible;
  };
  const dockObserver = new IntersectionObserver(syncDock, {rootMargin: "0px 0px 16px"});
  [hero,offer].forEach(node => dockObserver.observe(node));
  new MutationObserver(syncDock).observe(document.body, {attributes:true,subtree:true,attributeFilter:["open"]});
  window.addEventListener("pageshow", syncDock);
  window.addEventListener("resize", syncDock);
})();

(() => {
  "use strict";

  const config = window.SITE_CONFIG;
  if (!config || window.salomaoCommerceReady) return;
  window.salomaoCommerceReady = true;

  const preferenceKey = "colecao-salomao.marketing.v1";
  const banner = document.querySelector("#privacy-banner");
  const notice = document.querySelector("#checkout-notice");
  const settings = document.querySelector("[data-privacy-settings]");
  const pixelId = String(config.pixelId || "");
  let preference = null;
  let pixelInitialized = false;
  let leavingForCheckout = false;
  let noticeTimer;

  function readPreference() {
    try {
      return localStorage.getItem(preferenceKey);
    } catch {
      // O visitante ainda pode escolher uma preferência para esta página.
      return preference;
    }
  }

  function productData() {
    return {
      content_ids: [config.productId],
      content_name: config.productName,
      content_type: "product",
      value: config.price,
      currency: config.currency
    };
  }

  // Fila do código base da Meta. O primeiro pedido à Meta só ocorre após o aceite.
  function loadPixel() {
    if (window.fbq) {
      if (window.fbq.callMethod) startMeasurement();
      return;
    }
    function fbq() {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
      else fbq.queue.push(arguments);
    }
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = window._fbq || fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.addEventListener("load", startMeasurement, { once: true });
    document.head.append(script);
  }

  function startMeasurement() {
    if (preference !== "allow" || pixelInitialized) return;
    const fbq = window.fbq;
    fbq("consent", "grant");
    fbq("set", "autoConfig", false, pixelId);
    fbq("init", pixelId);
    pixelInitialized = true;
    fbq("trackSingle", pixelId, "PageView");
    fbq("trackSingle", pixelId, "ViewContent", productData());
  }

  function applyPreference(value) {
    if (value === preference) return;
    preference = value;
    if (pixelInitialized) {
      window.fbq("consent", value === "allow" ? "grant" : "revoke");
    } else if (value === "allow" && /^\d+$/.test(pixelId)) {
      loadPixel();
    }
  }

  let hideTimer;
  let returnFocus;
  let collapseTimer;
  let openingScroll;
  const chip = banner.querySelector(".privacy-chip");

  function collapse() {
    if (banner.hidden || banner.inert || !chip.hidden || banner.querySelector(":focus-visible")) return;
    clearTimeout(collapseTimer);
    banner.classList.add("is-collapsed");
    chip.hidden = false;
  }

  function scheduleCollapse() {
    clearTimeout(collapseTimer);
    collapseTimer = setTimeout(collapse, 6000);
  }

  window.addEventListener("scroll", () => {
    if (Math.abs(window.scrollY - openingScroll) > 300) collapse();
  }, {passive:true});
  banner.addEventListener("focusout", scheduleCollapse);
  chip.addEventListener("click", () => showBanner(true));

  const dock = document.getElementById("purchase-dock");
  new ResizeObserver(() => {
    if (dock.offsetHeight) document.documentElement.style.setProperty("--dock-height", dock.offsetHeight + "px");
  }).observe(dock);

  function showBanner(manual = false) {
    clearTimeout(hideTimer);
    banner.hidden = false;
    banner.inert = false;
    banner.classList.remove("is-closing");
    chip.hidden = true;
    banner.classList.remove("is-collapsed");
    openingScroll = window.scrollY;
    returnFocus = manual ? settings : null;
    scheduleCollapse();
    if (!manual && window.scrollY > 300) collapse();
    if (manual) banner.querySelector("[data-consent=deny]").focus({preventScroll:true});
  }

  function hideBanner() {
    if (banner.hidden || banner.inert) return;
    clearTimeout(collapseTimer);
    if (returnFocus && banner.contains(document.activeElement)) returnFocus.focus({preventScroll:true});
    banner.inert = true;
    banner.classList.add("is-closing");
    const delay = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200;
    hideTimer = setTimeout(() => { banner.hidden = true; }, delay);
  }

  function savePreference(value) {
    try {
      localStorage.setItem(preferenceKey, value);
    } catch {
      // O armazenamento pode estar bloqueado pela navegação privada.
    }
    applyPreference(value);
    hideBanner();
  }

  settings?.addEventListener("click", () => showBanner(true));
  banner.querySelector("[data-close-privacy]").addEventListener("click", () => savePreference("deny"));
  for (const button of banner.querySelectorAll("[data-consent]")) {
    button.addEventListener("click", () => savePreference(button.dataset.consent));
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== preferenceKey && event.key !== null) return;
    applyPreference(readPreference());
    if (preference !== null) hideBanner();
  });

  function checkoutDestination() {
    try {
      const url = new URL(config.CHECKOUT_URL);
      if (!["https:", "http:"].includes(url.protocol)) return null;
      // Uma âncora da própria oferta não é um destino de compra.
      if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search) return null;
      for (const [key,value] of new URLSearchParams(location.search)) {
        if ((/^utm_[a-z0-9_]+$/i.test(key) || key === "fbclid") && !url.searchParams.has(key))
          url.searchParams.set(key, value);
      }
      return url.href;
    } catch {
      return null;
    }
  }

  function showPreviewNotice() {
    if (!notice) return;
    clearTimeout(noticeTimer);
    notice.hidden = false;
    notice.textContent = config.copy.previewNotice;
    noticeTimer = setTimeout(() => {
      notice.hidden = true;
      notice.textContent = "";
    }, 6000);
  }

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || !event.target.closest("[data-buy]")) return;
    event.preventDefault();
    const destination = checkoutDestination();
    if (!destination) {
      showPreviewNotice();
      return;
    }
    if (leavingForCheckout) return;
    leavingForCheckout = true;
    try {
      if (preference === "allow" && pixelInitialized) {
        window.fbq("trackSingle", pixelId, "InitiateCheckout", { ...productData(), num_items: 1 });
      }
    } finally {
      location.assign(destination);
    }
  });

  window.addEventListener("pageshow", (event) => {
    leavingForCheckout = false;
    if (!event.persisted) return;
    applyPreference(readPreference());
    if (preference !== null) hideBanner();
  });

  const savedPreference = readPreference();
  applyPreference(savedPreference);
  function scheduleBanner() {
    setTimeout(() => {
      if (preference === null && banner.hidden) showBanner();
    }, 1200);
  }
  if (savedPreference === null && /^\d+$/.test(pixelId)) {
    if (document.readyState === "complete") scheduleBanner();
    else window.addEventListener("load", scheduleBanner, {once:true});
  }
})();

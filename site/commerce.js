(() => {
  "use strict";

  const config = window.SITE_CONFIG;
  if (!config || window.salomaoCommerceReady) return;
  window.salomaoCommerceReady = true;

  const preferenceKey = "colecao-salomao.marketing.v1";
  const dialog = document.querySelector("#privacy-dialog");
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
    if (window.fbq) return window.fbq;
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
    document.head.append(script);
    return fbq;
  }

  function applyPreference(value) {
    if (value === preference) return;
    preference = value;
    if (value !== "allow") {
      if (pixelInitialized) window.fbq("consent", "revoke");
      return;
    }
    if (!/^\d+$/.test(pixelId)) return;
    const fbq = loadPixel();
    if (pixelInitialized) {
      fbq("consent", "grant");
      return;
    }
    fbq("consent", "revoke");
    fbq("set", "autoConfig", false, pixelId);
    fbq("init", pixelId);
    pixelInitialized = true;
    fbq("consent", "grant");
    fbq("trackSingle", pixelId, "PageView");
    fbq("trackSingle", pixelId, "ViewContent", productData());
  }

  function updateStatus() {
    const status = dialog?.querySelector("[data-consent-status]");
    if (!status) return;
    status.textContent = preference === "allow"
      ? config.copy.consentAllowed
      : config.copy.consentDenied;
  }

  function savePreference(value) {
    try {
      localStorage.setItem(preferenceKey, value);
    } catch {
      // O armazenamento pode estar bloqueado pela navegação privada.
    }
    applyPreference(value);
    updateStatus();
    dialog?.close();
  }

  settings?.addEventListener("click", () => {
    updateStatus();
    dialog?.showModal();
  });
  dialog?.querySelector("[data-close-privacy]")?.addEventListener("click", () => dialog.close());
  dialog?.querySelector('[data-consent="allow"]')?.addEventListener("click", () => savePreference("allow"));
  dialog?.querySelector('[data-consent="deny"]')?.addEventListener("click", () => savePreference("deny"));

  window.addEventListener("storage", (event) => {
    if (event.key !== preferenceKey && event.key !== null) return;
    applyPreference(readPreference());
    updateStatus();
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
    updateStatus();
  });

  applyPreference(readPreference());
  updateStatus();
})();

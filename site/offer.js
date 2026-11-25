(() => {
  "use strict";
  const config = window.SITE_CONFIG;
  const section = document.getElementById("plano");
  if (!section || !config?.offer) return;
  const offer = config.offer;
  const imageObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.src = entry.target.dataset.src;
      imageObserver.unobserve(entry.target);
    }
  }, { rootMargin: "360px 0px" }) : null;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function picture(src, width, height, alt = "") {
    const image = document.createElement("img");
    image.width = width;
    image.height = height;
    image.alt = alt;
    image.loading = "lazy";
    image.decoding = "async";
    if (imageObserver) {
      image.dataset.src = src;
      imageObserver.observe(image);
    } else {
      image.src = src;
    }
    return image;
  }

  /* Filled glyphs from Phosphor Icons.
   * MIT License
   *
   * Copyright (c) 2023 Phosphor Icons
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  const filledPaths = {
    "credit-card": "M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM136,176H120a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm64,0H168a8,8,0,0,1,0-16h32a8,8,0,0,1,0,16ZM32,88V64H224V88Z",
    "envelope-open": "M228.44,89.34l-96-64a8,8,0,0,0-8.88,0l-96,64A8,8,0,0,0,24,96V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A8,8,0,0,0,228.44,89.34ZM96.72,152,40,192V111.53Zm16.37,8h29.82l56.63,40H56.46Zm46.19-8L216,111.53V192Z",
    "book-open-text": "M232,48H168a32,32,0,0,0-32,32v87.73a8.17,8.17,0,0,1-7.47,8.25,8,8,0,0,1-8.53-8V80A32,32,0,0,0,88,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,23.94,7.9,7.9,0,0,0,5.12,7.55A8,8,0,0,0,136,232a24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM208,168H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,168Zm0-32H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,136Zm0-32H168.27A8.17,8.17,0,0,1,160,96.53,8,8,0,0,1,168,88h39.73A8.17,8.17,0,0,1,216,95.47,8,8,0,0,1,208,104Z",
    "seal-check": "M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
  };

  function icon(symbol) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    if (Object.hasOwn(filledPaths, symbol)) {
      svg.setAttribute("viewBox", "0 0 256 256");
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", filledPaths[symbol]);
      svg.append(path);
      return svg;
    }
    const use = document.createElementNS(ns, "use");
    use.setAttribute("href", "#i-" + symbol);
    svg.append(use);
    return svg;
  }

  const card = element("article", "collection-card");
  card.id = "offer-card";
  const title = element("h2", "collection-title", offer.title);
  title.id = "offer-title";
  section.setAttribute("aria-labelledby", title.id);
  card.setAttribute("aria-labelledby", title.id);

  const art = element("div", "collection-covers");
  art.innerHTML = "<picture class=\"edition-kit\"><img loading=\"lazy\" src=\"assets/media/conjunto-salomao-580.webp\" srcset=\"assets/media/conjunto-salomao-580.webp 580w, assets/media/conjunto-salomao-1200.webp 1200w\" sizes=\"(min-width:768px) 180px, 42vw\" width=\"580\" height=\"336\" alt=\"Os Segredos da Riqueza de Salomão com as folhas 01, 04 e 07 em leque atrás do livro e a capa do e-book na tela do iPhone à direita.\"></picture>";
  const list = element("ul", "collection-includes");
  for (const text of [offer.mainItem, ...config.bonuses.map(book => book.title), ...offer.benefits, "2 bônus incluídos"].filter(Boolean)) {
    const line = element("li");
    line.append(icon(config.bonuses.some(bonus => bonus.title === text) ? "gift" : "seal-check"), element("span", "", text));
    list.append(line);
  }

  const bonusPrices = config.bonusPrices;
  if (bonusPrices.length === 2 && bonusPrices.every(p => Number.isFinite(p) && p > 0)) {
    const total = new Intl.NumberFormat("pt-BR",{style:"currency",currency:config.currency}).format(bonusPrices[0] + bonusPrices[1]);
    list.lastElementChild.lastElementChild.textContent = "Valor avulso dos dois bônus: " + total + " · incluídos no pacote";
  }
  const priceArea = element("div", "collection-price");
  const price = element("strong", "collection-value");
  price.dataset.price = "";
  // A primeira hidratação usa o mesmo valor mesmo se a ordem dos scripts mudar.
  price.textContent = new Intl.NumberFormat("pt-BR", { style: "currency", currency: config.currency }).format(config.price);
  const was = config.previousPrice;
  if (was?.label?.trim() && Number.isFinite(was.value) && was.value > config.price) {
    const previous = element("s", "collection-previous", was.label + " " +
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: config.currency }).format(was.value));
    priceArea.append(previous);
  }
  const current = element("div", "current-price");
  current.append(element("strong", "", "Por "), price);
  priceArea.append(current);
  if (offer.priceLabel) priceArea.append(element("span", "collection-price-label", offer.priceLabel));
  const action = element("button", "buy buy-pulse collection-cta");
  action.type = "button";
  action.dataset.buy = "";
  action.append(icon("shopping-bag"), element("span", "", offer.cta));

  const footer = element("div", "collection-trust");
  if (config.guaranteeEnabled && config.images.seal) {
    const guarantee = element("div", "collection-guarantee");
    guarantee.append(picture(config.images.seal, 192, 192), element("span", "", offer.guarantee));
    footer.append(guarantee);
  }
  if (offer.paymentMethods?.length) {
    const methods = element("ul", "collection-payments");
    methods.setAttribute("aria-label", "Formas de pagamento");
    for (const method of offer.paymentMethods) {
      const item = element("li");
      item.append(picture(method.image, 40, 26, method.name));
      methods.append(item);
    }
    footer.append(methods);
  }
  if (offer.badge) card.append(element("p", "collection-badge", offer.badge));
  card.append(art, title, list, priceArea, action, element("p","pay-note","Acesso imediato por e-mail · Pagamento seguro"));
  if (footer.childElementCount) card.append(footer);

  const delivery = element("div", "collection-delivery");
  const deliveryTitle = element("h2", "", offer.deliveryTitle);
  const steps = element("ol", "collection-steps");
  offer.steps.forEach((step, index) => {
    const item = element("li");
    const illustration = element("span", "collection-step-mark");
    const number = element("span", "collection-step-number", String(index + 1));
    number.setAttribute("aria-hidden", "true");
    illustration.append(icon(step.icon || "book-open-text"), number);
    const detail = element("div");
    detail.append(element("strong", "", step.title), element("p", "", step.text));
    item.append(illustration, detail);
    steps.append(item);
  });
  delivery.append(deliveryTitle, steps);
  section.replaceChildren(card);
  document.getElementById("delivery-content").append(delivery);
})();


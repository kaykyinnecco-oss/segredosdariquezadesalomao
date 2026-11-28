(() => {
  const config = window.SITE_CONFIG;

  function imageFor(entry) {
    const image = new Image(entry.width, entry.height);
    image.alt = entry.alt || entry.imageAlt;
    image.decoding = "async";
    image.loading = "lazy";
    image.src = entry.src || entry.image;
    return image;
  }

  function buildStrip(id, entries, secondsPerItem) {
    if (!entries.length) return;
    const region = document.getElementById(id);
    const track = document.createElement("div");
    const group = document.createElement("div");
    track.className = "gallery-track";
    group.className = "gallery-group";
    for (const entry of entries.filter(item => item.image)) {
      group.append(imageFor(entry));
    }
    track.append(group);
    const duplicate = group.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    track.append(duplicate);
    region.style.setProperty("--travel-time", entries.length * secondsPerItem + "s");
    region.append(track);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        region.classList.toggle("in-view", entry.isIntersecting);
      }).observe(region);
    } else {
      region.classList.add("in-view");
    }
  }

  buildStrip("usage-gallery", config.usagePhotos, 9);
  if (config.testimonials.enabled) {
    buildStrip("feedback-gallery", config.testimonials.entries, 24);
  }
})();

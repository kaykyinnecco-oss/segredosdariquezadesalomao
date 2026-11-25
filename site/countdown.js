(() => {
  const hours = document.querySelector('[data-unit="hours"]');
  const minutes = document.querySelector('[data-unit="minutes"]');
  const seconds = document.querySelector('[data-unit="seconds"]');
  let timeout;
  function tick() {
    clearTimeout(timeout);
    if (document.hidden) return;
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const left = Math.ceil((midnight - now) / 1000);
    const digits = [Math.floor(left / 3600), Math.floor(left / 60) % 60, left % 60]
      .map(value => String(value).padStart(2, "0"));
    [hours, minutes, seconds].forEach((node, i) => {
      if (node.textContent !== digits[i]) node.textContent = digits[i];
    });
    timeout = setTimeout(tick, 1000 - now.getMilliseconds());
  }
  document.addEventListener("visibilitychange", tick);
  window.addEventListener("pageshow", tick);
  tick();
})();

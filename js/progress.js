// Scroll progress -- fills a terminal-style bar + ASCII readout as the page scrolls.
(function () {
  const bar = document.getElementById("scroll-progress");
  const readout = document.getElementById("scroll-readout-text");
  if (!bar && !readout) return;

  const BAR_LENGTH = 10;
  let ticking = false;

  function render() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    if (bar) bar.style.width = pct + "%";

    if (readout) {
      const filled = Math.round((pct / 100) * BAR_LENGTH);
      const track = "#".repeat(filled) + "-".repeat(BAR_LENGTH - filled);
      readout.textContent = `[${track}] ${Math.round(pct)}%`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(render);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  render();
})();

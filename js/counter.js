// "Teams registered" counter -- demo only. Client-side base + count-up
// animation on scroll into view, plus a live increment on successful
// registration. Resets on reload (no backend, by design -- see spec).
(function () {
  const el = document.getElementById("team-counter");
  if (!el) return;

  let current = 0;
  let animated = false;

  function countUpTo(target) {
    const duration = 900;
    const start = performance.now();
    const from = current;

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.round(from + (target - from) * progress);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        countUpTo(SITE_CONFIG.COUNTER_BASE);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(el);

  window.incrementTeamCounter = function () {
    current += 1;
    el.textContent = current;
  };
})();

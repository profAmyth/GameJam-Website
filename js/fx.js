// Visual effects: matrix rain behind hero, scroll-in reveals, card spotlight, active nav link.
(function () {
  document.documentElement.classList.add("js");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll-in reveal, staggered by position among siblings.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const sibs = [...e.target.parentElement.children].filter((c) => c.hasAttribute("data-reveal"));
      e.target.style.transitionDelay = Math.min(sibs.indexOf(e.target), 5) * 70 + "ms";
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  // Cursor spotlight on cards
  document.addEventListener("pointermove", (e) => {
    const t = e.target.closest && e.target.closest(".spot");
    if (!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", e.clientX - r.left + "px");
    t.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });

  // Active nav link
  const links = [...document.querySelectorAll("#nav-menu a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((a) => {
    const sec = document.querySelector(a.getAttribute("href"));
    if (sec) spy.observe(sec);
  });

  // Matrix rain
  const cv = document.getElementById("hero-canvas");
  if (!cv || reduced) return;
  const ctx = cv.getContext("2d");
  const GLYPHS = "01<>{}[]/\\#$%&*+=".split("");
  const SIZE = 16;
  const COLORS = ["#8b5cf6", "#22d3ee", "#f472b6"];
  let cols, drops, visible = true;

  function resize() {
    cv.width = cv.offsetWidth;
    cv.height = cv.offsetHeight;
    cols = Math.ceil(cv.width / SIZE);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }
  resize();
  window.addEventListener("resize", resize);
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(cv);

  let last = 0;
  function draw(now) {
    requestAnimationFrame(draw);
    if (!visible || now - last < 60) return;
    last = now;
    ctx.fillStyle = "rgba(7, 6, 15, 0.12)";
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.font = SIZE + "px JetBrains Mono, monospace";
    for (let i = 0; i < cols; i++) {
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * SIZE, drops[i] * SIZE);
      if (drops[i] * SIZE > cv.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  requestAnimationFrame(draw);
})();

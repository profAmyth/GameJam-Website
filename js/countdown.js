// Countdown timer -- ticks every second, no layout thrash.
(function () {
  const target = new Date(SITE_CONFIG.EVENT_DATE_ISO).getTime();

  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };
  const liveBanner = document.getElementById("cd-live");
  const grid = document.getElementById("cd-grid");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      clearInterval(timer);
      if (grid) grid.classList.add("hidden");
      if (liveBanner) liveBanner.classList.remove("hidden");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (els.days) els.days.textContent = pad(days);
    if (els.hours) els.hours.textContent = pad(hours);
    if (els.mins) els.mins.textContent = pad(mins);
    if (els.secs) els.secs.textContent = pad(secs);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

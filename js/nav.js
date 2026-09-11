// Mobile nav toggle + closing the menu after an anchor click.
(function () {
  const btn = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

// Theme Reveal -- click-to-decrypt interaction. Triggers exactly once.
(function () {
  const trigger = document.getElementById("reveal-trigger");
  const scrambleEl = document.getElementById("reveal-scramble");
  const finalEl = document.getElementById("reveal-final");
  const lockedPanel = document.getElementById("reveal-locked");
  const unlockedPanel = document.getElementById("reveal-unlocked");

  if (!trigger) return;

  const CHARS = "!<>-_\\/[]{}—=+*^?#________01";
  const FINAL_TEXT = "REBUILD // OFFLINE-FIRST";
  let revealed = false;

  function scrambleFrame(progress, target) {
    let out = "";
    for (let i = 0; i < target.length; i++) {
      if (target[i] === " ") {
        out += " ";
        continue;
      }
      const revealPoint = (i / target.length) * 1;
      out += progress > revealPoint
        ? target[i]
        : CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return out;
  }

  function playDecryptAnimation() {
    const duration = 1100;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      scrambleEl.textContent = scrambleFrame(progress, FINAL_TEXT);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        scrambleEl.textContent = FINAL_TEXT;
        finalEl.classList.remove("hidden");
        scrambleEl.classList.add("hidden");
      }
    }
    requestAnimationFrame(frame);
  }

  trigger.addEventListener("click", () => {
    if (revealed) return;
    revealed = true;

    trigger.disabled = true;
    trigger.setAttribute("aria-disabled", "true");

    if (window.playUiSound) window.playUiSound("unlock");

    lockedPanel.classList.add("opacity-0", "pointer-events-none");
    unlockedPanel.classList.remove("hidden");

    setTimeout(() => {
      lockedPanel.classList.add("hidden");
    }, 400);

    playDecryptAnimation();
  });
})();

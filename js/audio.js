// Tiny UI sound effects, synthesized with WebAudio (no audio files needed).
// Muted by default; user must opt in via the toggle. Never autoplays with sound.
(function () {
  let muted = true;
  let ctx = null;

  const toggleBtn = document.getElementById("audio-toggle");

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function beep({ freq, duration, type = "sine", gain = 0.08 }) {
    if (muted) return;
    const audioCtx = getCtx();
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g).connect(audioCtx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
  }

  window.playUiSound = function (name) {
    if (name === "unlock") {
      beep({ freq: 660, duration: 0.12 });
      setTimeout(() => beep({ freq: 990, duration: 0.15 }), 100);
    } else if (name === "success") {
      beep({ freq: 520, duration: 0.1 });
      setTimeout(() => beep({ freq: 780, duration: 0.18 }), 90);
    } else if (name === "click") {
      beep({ freq: 300, duration: 0.05, type: "square", gain: 0.06 });
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      muted = !muted;
      toggleBtn.textContent = muted ? "🔇 SFX" : "🔊 SFX";
      toggleBtn.setAttribute("aria-pressed", String(!muted));
      if (!muted) beep({ freq: 440, duration: 0.08 });
    });
  }

  // Generic click blip for every button/link, skipping ones that already
  // play their own distinct sound (audio toggle, theme decrypt trigger).
  const NO_CLICK_SOUND = new Set(["audio-toggle", "reveal-trigger"]);
  document.addEventListener("click", (e) => {
    const el = e.target.closest("button, a");
    if (!el || NO_CLICK_SOUND.has(el.id)) return;
    window.playUiSound("click");
  });
})();

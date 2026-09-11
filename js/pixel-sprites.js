// Renders tiny retro pixel-art mascots from box-shadow grids.
// Usage: <div class="pixel-char" data-sprite="ghost" data-color="#b86bff" data-size="4"></div>
(function () {
  const SPRITES = {
    invader: [
      "00100100",
      "00011000",
      "01111110",
      "11011011",
      "11111111",
      "00100100",
      "01011010",
      "10100101",
    ],
    ghost: [
      "00111100",
      "01111110",
      "11011011",
      "11111111",
      "11111111",
      "11111111",
      "10111101",
      "10101010",
    ],
    disk: [
      "11111111",
      "10000001",
      "10111101",
      "10111101",
      "11111111",
      "11000011",
      "11000011",
      "11111111",
    ],
    rocket: [
      "00011000",
      "00111100",
      "00100100",
      "00111100",
      "01111110",
      "11011011",
      "00100100",
      "00100100",
    ],
    heart: [
      "01100110",
      "11111111",
      "11111111",
      "11111111",
      "01111110",
      "00111100",
      "00011000",
      "00000000",
    ],
    robot: [
      "01111110",
      "10111101",
      "11111111",
      "10100101",
      "11111111",
      "01011010",
      "00111100",
      "01100110",
    ],
  };

  function buildSprite(el) {
    const rows = SPRITES[el.dataset.sprite];
    if (!rows) return;
    const size = parseInt(el.dataset.size, 10) || 4;
    const color = el.dataset.color || "#ff2b3d";
    const shadows = [];

    rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "1") shadows.push(`${x * size}px ${y * size}px 0 ${color}`);
      }
    });

    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.background = "transparent";
    el.style.boxShadow = shadows.join(",");
  }

  document.querySelectorAll(".pixel-char").forEach(buildSprite);
})();

// part one
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const realMod = (num, mod) => {
    const fakeMod = num % mod;
    if (fakeMod < 0) {
      return mod + fakeMod;
    }
    return fakeMod;
  };

  let zeros = 0;
  let position = 50;
  for (const line of lines) {
    const ticks = parseInt(line.slice(1).trim());
    if (line[0] === "L") {
      position = realMod(position - ticks, 100);
    } else {
      position = (position + ticks) % 100;
    }
    if (position === 0) {
      zeros++;
    }
  }

  return zeros;
})();

// part two
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const realMod = (num, mod) => {
    const fakeMod = num % mod;
    if (fakeMod < 0) {
      return mod + fakeMod;
    }
    return fakeMod;
  };

  let zeros = 0;
  let position = 50;
  for (const line of lines) {
    const ticks = parseInt(line.slice(1).trim());

    if (line[0] === "L") {
      const newPosition = realMod(position - ticks, 100);

      if (newPosition === 0) {
        zeros++;
      }
      zeros +=
        Math.floor(ticks / 100) +
        (position === 0 && newPosition === 0 ? -1 : 0);
      if (position > 0 && newPosition > position) {
        zeros++;
      }

      position = newPosition;
    } else {
      const newPosition = (position + ticks) % 100;

      if (newPosition === 0) {
        zeros++;
      }
      zeros +=
        Math.floor(ticks / 100) +
        (position === 0 && newPosition === 0 ? -1 : 0);
      if (newPosition > 0 && position > newPosition) {
        zeros++;
      }

      position = newPosition;
    }
  }

  return zeros;
})();

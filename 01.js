/*
This puzzle was a good reminder that in Javascript `%` is a "remainder" operator,
not a modulo operator like it is in Python.

For part two, the solution I wrote was a bit complicated. Most of the solutions posted
on reddit seem to loop over the full number of ticks and count the number of
times zero is passed. This solution will count the following without looping:

- +1 if the new position is at 0
- +X for the number of full 100-rotations done
- +1 if 0 was passed even though a full rotation was not completed

That was a bit complicated because of some edge cases and special handling of L and R.
*/

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

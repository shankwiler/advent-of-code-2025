/*
Naive solution for part two -- I don't have a ton of time tonight.

I think a better solution would be something like:

1. Keep track of each cell's count of `@` neighbors.
2. Start with each cell that has < 4. Add them to the removable list.
3. Move to each of their neighbors. Decrement their counts.
4. For each of those that now have < 4, add them to the removable list.
5. Move to each of their neighbors. Decrement their counts.

And so on. Finally, return the size of the removable list.

This would be an O(8N) solution (where N is the total number of cells in
the grid), because each cell could only be visited a maximum of 8 times --
once for each neighbor which had been removed.
*/

// part one
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const grid = lines.map((line) => Array.from(line));

  let accessible = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] !== "@") {
        continue;
      }
      let nearby = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!(dr === 0 && dc === 0) && grid[row + dr]?.[col + dc] === "@") {
            nearby++;
          }
        }
      }

      if (nearby < 4) {
        accessible++;
      }
    }
  }
  return accessible;
})();

// part two
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const grid = lines.map((line) => Array.from(line));

  let removed = 0;
  let removedInLastRound;
  while (removedInLastRound !== 0) {
    removedInLastRound = 0;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] !== "@") {
          continue;
        }
        let nearby = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (!(dr === 0 && dc === 0) && grid[row + dr]?.[col + dc] === "@") {
              nearby++;
            }
          }
        }

        if (nearby < 4) {
          grid[row][col] = ".";
          removedInLastRound++;
        }
      }
    }

    removed += removedInLastRound;
  }

  return removed;
})();

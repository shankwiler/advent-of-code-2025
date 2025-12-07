// part one
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);
  const grid = lines.map((line) => Array.from(line.trim()));

  const startIndex = grid[0].indexOf("S");

  let splits = 0;
  let beams = [startIndex];

  for (let row = 1; row < grid.length - 1; row++) {
    const newBeams = new Set();
    for (const beam of beams) {
      if (grid[row + 1][beam] === "^") {
        splits++;
        if (beam - 1 > 0) {
          newBeams.add(beam - 1);
        }
        if (beam + 1 < grid[0].length) {
          newBeams.add(beam + 1);
        }
      } else {
        newBeams.add(beam);
      }
    }
    beams = Array.from(newBeams);
  }
  return splits;
})();

// part two
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const grid = lines.map((line) => Array.from(line.trim()));

  const startIndex = grid[0].indexOf("S");

  let beams = new Map([[startIndex, 1]]);

  console.log(beams);

  for (let row = 1; row < grid.length - 1; row++) {
    const newBeams = new Map();
    for (const [beam, count] of beams) {
      if (grid[row + 1][beam] === "^") {
        if (beam - 1 >= 0) {
          newBeams.set(beam - 1, (newBeams.get(beam - 1) ?? 0) + count);
        }
        if (beam + 1 < grid[0].length) {
          newBeams.set(beam + 1, (newBeams.get(beam + 1) ?? 0) + count);
        }
      } else {
        newBeams.set(beam, (newBeams.get(beam) ?? 0) + count);
      }
    }
    console.log(newBeams);
    beams = newBeams;
  }
  return Array.from(beams.values()).reduce((tot, curr) => tot + curr, 0);
})();

// debug for part two -- I had an off by one error... wrote `> 0` rather than `>= 0`
// I ran my solution above and compared the result with this one to find the error
(() => {
  const lines = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`.split("\n");
  const grid = lines.map((line) => Array.from(line.trim()));

  const startIndex = grid[0].indexOf("S");

  const getDebug = (path) => {
    const gridCopy = structuredClone(grid);
    for (const [row, col] of path) {
      gridCopy[row][col] = "|";
    }
    return gridCopy.map((row) => row.join("")).join("\n");
  };

  const output = [];

  const recurse = (row, col, path) => {
    if (row === grid.length) {
      output.push(getDebug(path));
      return;
    }
    if (grid[row][col] === "^") {
      recurse(row + 1, col - 1, [...path, [row, col - 1]]);
      recurse(row + 1, col + 1, [...path, [row, col + 1]]);
    } else {
      recurse(row + 1, col, [...path, [row, col]]);
    }
  };

  recurse(1, startIndex, []);

  const counts = {};

  for (const out of output) {
    console.log(out);
    console.log("\n\n");
    const indexOfBar = out.split("\n").at(-1).indexOf("|");
    counts[indexOfBar] = (counts[indexOfBar] ?? 0) + 1;
  }
  console.log(counts);
})();

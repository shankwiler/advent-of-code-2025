/*
Part one has an O(N^2), where the runtime is dominated by the O(N^2)** (edit below) distance construction.
Then there's an O(N) DFS.

I'm not sure if you could do better -- maybe there's a way you could sort the coords in 3d
space and pick off the first 1000, but I'm not sure about that.

Part two should be the same -- the union find data structure should give O(1) amoritized
lookups. But I wrote this with no path compression out of laziness -- so it's a bit slow.

Edit: Actually, after thinking about this a bit more and looking at solutions from others,
I believe it's actually O(N^2 log(N^2)) because we have to sort the N^2 distances.
*/

// part one
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const coords = lines.map((line) =>
    line.split(",").map((num) => parseInt(num))
  );

  const distances = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      if (i === j) {
        continue;
      }
      const distance = Math.pow(
        Math.pow(coords[j][0] - coords[i][0], 2) +
          Math.pow(coords[j][1] - coords[i][1], 2) +
          Math.pow(coords[j][2] - coords[i][2], 2),
        0.5
      );
      distances.push([distance, i, j]);
    }
  }

  const bestDistances = distances.sort(([a], [b]) => a - b).slice(0, 1000);

  const xns = new Map();

  for (const [, i, j] of bestDistances) {
    xns.set(i, xns.get(i) ?? []);
    xns.get(i).push(j);
    xns.set(j, xns.get(j) ?? []);
    xns.get(j).push(i);
  }

  const dfs = (i, visited) => {
    visited.add(i);
    for (const xn of xns.get(i) ?? []) {
      if (!visited.has(xn)) {
        dfs(xn, visited);
      }
    }
  };

  const sizes = [];

  const globalSeen = new Set();

  for (let i = 0; i < coords.length; i++) {
    if (globalSeen.has(i)) {
      continue;
    }
    const visited = new Set();
    dfs(i, visited);
    sizes.push(visited.size);
    for (const seen of visited) {
      globalSeen.add(seen);
    }
  }

  return sizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((tot, curr) => tot * curr, 1);
})();

// part two
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const coords = lines.map((line) =>
    line.split(",").map((num) => parseInt(num))
  );

  const distances = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      if (i === j) {
        continue;
      }
      const distance = Math.pow(
        Math.pow(coords[j][0] - coords[i][0], 2) +
          Math.pow(coords[j][1] - coords[i][1], 2) +
          Math.pow(coords[j][2] - coords[i][2], 2),
        0.5
      );
      distances.push([distance, i, j]);
    }
  }

  const sortedDistances = distances.sort(([a], [b]) => a - b);

  const unionFind = new Map();

  // not really right I don't think. no path compression. should work though.
  const getParent = (coord) => {
    if (!unionFind.has(coord)) {
      return undefined;
    }
    let curr = coord;
    while (unionFind.get(curr) !== curr) {
      curr = unionFind.get(curr);
    }
    return curr;
  };

  for (const [, i, j] of sortedDistances) {
    const parentA = getParent(i);
    const parentB = getParent(j);

    if (!parentA && !parentB) {
      unionFind.set(i, i);
      unionFind.set(j, i);
    } else if (!parentA) {
      unionFind.set(i, parentB);
    } else if (!parentB) {
      unionFind.set(j, parentA);
    } else if (parentA !== parentB) {
      unionFind.set(parentA, parentB);
    }

    const desiredParent = getParent(0);
    let good = true;
    for (let k = 1; k < coords.length; k++) {
      if (getParent(k) !== desiredParent) {
        good = false;
        break;
      }
    }
    if (good) {
      return coords[i][0] * coords[j][0];
    }
  }

  return null;
})();

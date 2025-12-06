/*
part one uses a naive solution, O(nums * ranges)

part two reminds me of a leetcode problem -- called something like "combine ranges"

the solution is O(Rlog(R)) -- sorting them, then we can iterate through one by one

I'm not sure there's a more efficient solution -- it definitely feels like the
type of problem that requires a heap / BST / sorting.
*/

// part one
(() => {
  const rawData = document.querySelector("pre").innerText;
  const [rawRanges, rawNums] = rawData
    .split("\n\n")
    .map((blob) => blob.split("\n").filter((e) => !!e));

  const ranges = rawRanges
    .map((rawRange) => rawRange.split("-").map((bound) => parseInt(bound)));
  const nums = rawNums.map((num) => parseInt(num));

  return nums.filter((num) =>
    ranges.some((range) => num >= range[0] && num <= range[1])
  ).length;
})();

// part two
(() => {
  const rawData = document.querySelector("pre").innerText;

  const [rawRanges] = rawData
    .split("\n\n")
    .map((blob) => blob.split("\n").filter((e) => !!e));

  const ranges = rawRanges
    .map((rawRange) => rawRange.split("-").map((bound) => parseInt(bound)))
    .sort((rangeA, rangeB) => rangeA[0] - rangeB[0]);

  let lastEnd = -1;
  let total = 0;
  for (const range of ranges) {
    // [--] [--]
    if (range[0] > lastEnd) {
      total += range[1] - range[0] + 1;
      lastEnd = range[1];
    } else {
      // [--]
      //   [--]
      if (range[1] > lastEnd) {
        total += range[1] - lastEnd;
        lastEnd = range[1];
      }
      // otherwise if range[0] <= lastEnd and range[1] <= lastEnd then
      //   [--]
      //    []
      // the group is a subset of the other and has been fully accounted for
    }
  }

  return total;
})();

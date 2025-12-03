/*
The solution for part two feels a little heavy handed -- I bet there's something
simpler.

But in reality the runtime isn't bad: O((size of row) * (number of allowed digits)).

We're answering this question for each position in the row: what's the best possible
number I could construct with myself and the digits before me in the row, given some
number of allowed digits from 1-12.

Edit: this solution is really nice:
https://github.com/sunderee/aoc-ts/blob/master/src/solutions/2025/day03.ts.

It uses a stack. I think it's an O(size of row) solution, because each digit in the
row could be pushed to the stack once, and popped from the stack once. You might have
to pop many in a row if you get bad luck with something like 123456789, but still, each
digit in the row could only be popped once.
*/

// part one
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const rows = lines.map((line) =>
    Array.from(line).map((digit) => parseInt(digit))
  );

  let total = 0;
  for (const row of rows) {
    let best = -1;
    let maxDigitBefore = row[0];
    for (let i = 1; i < row.length; i++) {
      best = Math.max(best, maxDigitBefore * 10 + row[i]);
      maxDigitBefore = Math.max(maxDigitBefore, row[i]);
    }
    total += best;
  }
  return total;
})();

// part two
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const solve = (row, index, digits, cache) => {
    if (index === -1 || digits === 0) {
      return 0;
    }
    const key = JSON.stringify({ index, digits });
    if (key in cache) {
      return cache[key];
    }
    const ifInclude =
      solve(row, index - 1, digits - 1, cache) * 10 + row[index];
    const ifNotInclude = solve(row, index - 1, digits, cache);
    cache[key] = Math.max(ifInclude, ifNotInclude);
    return cache[key];
  };

  const rows = lines.map((line) =>
    Array.from(line).map((digit) => parseInt(digit))
  );

  let total = 0;
  for (const row of rows) {
    total += solve(row, row.length - 1, 12, {});
  }
  return total;
})();

/*
definitely the challenge on this one was just dealing with the difficulty
of parsing the input

I left a comment about the approach for part two within the implementation below
*/

// part one
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  const rows = lines.map((line) => line.trim().split(/\s+/));

  let total = 0;
  for (let i = 0; i < rows[0].length; i++) {
    const op = rows.at(-1)[i];
    if (op === "+") {
      total += rows
        .slice(0, -1)
        .reduce((tot, row) => tot + parseInt(row[i]), 0);
    } else {
      total += rows
        .slice(0, -1)
        .reduce((tot, row) => tot * parseInt(row[i]), 1);
    }
  }
  return total;
})();

// part two
(() => {
  const lines = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((e) => !!e);

  let total = 0;
  let currNums = [];
  let currOp;

  // Iterate through column by column
  //
  // After going through a column, construct a num from the digits you've seen,
  // and add it to currNums.
  //
  // If you see an operator at the bottom, save it in currOp.
  //
  // If you've reached a totally empty column, that indicates the end of the current
  // math equation, at which point you should perform currOp on currNums and add the
  // result to the running total.
  //
  // Also make sure you do this after finishing the last column in the grid.
  for (let col = 0; col < lines[0].length; col++) {
    const digits = [];
    for (let row = 0; row < lines.length - 1; row++) {
      if (lines[row][col] !== " ") {
        digits.push(lines[row][col]);
      }
    }
    if (digits.length !== 0) {
      currNums.push(parseInt(digits.join("")));
    }

    const op = lines.at(-1)[col];

    if (op !== " ") {
      currOp = op;
    }

    if ((digits.length === 0 && op === " ") || col === lines[0].length - 1) {
      total +=
        currOp === "*"
          ? currNums.reduce((tot, num) => tot * num, 1)
          : currNums.reduce((tot, num) => tot + num, 0);
      currNums = [];
      currOp = undefined;
    }
  }
  return total;
})();

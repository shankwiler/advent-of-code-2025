/* brute force works fine for both parts -- the input provided small ranges */

// part one
(() => {
  const ranges = document
    .querySelector("pre")
    .innerText.split(",")
    .filter((e) => !!e);

  let total = 0;
  for (const range of ranges) {
    const [start, end] = range.split("-").map((num) => parseInt(num));
    for (let currNum = start; currNum <= end; currNum++) {
      const numString = currNum.toString();
      if (
        numString.length % 2 === 0 &&
        numString.slice(0, numString.length / 2) ===
          numString.slice(numString.length / 2)
      ) {
        total += currNum;
      }
    }
  }
  return total;
})();

// part two
(() => {
  const ranges = document
    .querySelector("pre")
    .innerText.split(",")
    .filter((e) => !!e);

  let total = 0;
  for (const range of ranges) {
    const [start, end] = range.split("-").map((num) => parseInt(num));
    for (let currNum = start; currNum <= end; currNum++) {
      const numString = currNum.toString();

      for (
        let subsetLength = 1;
        subsetLength <= numString.length / 2;
        subsetLength++
      ) {
        if (numString.length % subsetLength === 0) {
          let allSame = true;
          for (
            let start = subsetLength;
            start < numString.length;
            start += subsetLength
          ) {
            if (
              numString.slice(0, subsetLength) !==
              numString.slice(start, start + subsetLength)
            ) {
              allSame = false;
              break;
            }
          }
          if (allSame) {
            total += currNum;
            break;
          }
        }
      }
    }
  }
  return total;
})();

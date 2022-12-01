const { sum } = require('lodash');

const getCalorieCounts = (input) => {
  const lines = input
    .trim()
    .split('\n')
    .map((l) => l.trim());

  return lines
    .reduce(
      (acc, curr) => {
        if (curr === '') {
          acc.push(0);
        } else {
          acc[acc.length - 1] += parseInt(curr, 10);
        }

        return acc;
      },
      [0]
    )
    .sort((a, b) => b - a);
};

const doPart1 = (input) => getCalorieCounts(input)[0];

const doPart2 = (input) => sum(getCalorieCounts(input).slice(0, 3));

module.exports = {
  doPart1,
  doPart2,
};

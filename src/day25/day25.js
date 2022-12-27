const { sum } = require('lodash');
const getLines = require('../get-lines');

const snafuToDecimalMap = {
  2: 2,
  1: 1,
  0: 0,
  '-': -1,
  '=': -2,
};

const parseFuel = (input) => {
  return getLines(input);
};

const snafuToDecimal = (snafu) => {
  return sum(
    snafu
      .split('')
      .reverse()
      .map((s, exp) => snafuToDecimalMap[s] * 5 ** exp)
  );
};

const decimalToSnafu = (decimal) => {
  let rest = decimal;
  const snafu = [];
  let exp = 0;

  while (rest > 0) {
    const d = (rest % 5 ** (exp + 1)) / 5 ** exp;
    let s = d;

    if (d > 2) {
      if (d === 3) {
        s = '=';
      } else {
        s = '-';
      }

      rest += 5 ** (exp + 1);
    }

    snafu.unshift(s);
    rest -= d * 5 ** exp;
    exp += 1;
  }

  return snafu.join('');
};

const doPart1 = (input) => {
  const fuel = parseFuel(input);

  const totalFuel = sum(fuel.map(snafuToDecimal));

  return decimalToSnafu(totalFuel);
};

module.exports = {
  doPart1,
};

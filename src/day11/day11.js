const { chunk } = require('lodash');
const getLines = require('../get-lines');

/*
[<items>, <operation-fn>, <test-divisible-by>, <test-true-monkey>, <test-false-monkey>]
[
  [[79, 98],         (old) => old * 19,  23, 2, 3],
  [[54, 65, 75, 74], (old) => old + 6,   19, 2, 0],
  [[79, 60, 97],     (old) => old * old, 13, 1, 3],
  [[74],             (old) => old + 3,   17, 0, 1],
]
*/

const buildOperationFn = (operation, operand) => {
  if (operand === 'old') {
    return (old) => old * old;
  }

  const n = parseInt(operand, 10);
  return operation === '+' ? (old) => old + n : (old) => old * n;
};

const parseNotes = (input) => {
  return chunk(getLines(input), 7).map((m) => {
    const [, itemsLine, operationLine, testLine, testTrueLine, testFalseLine] = m;
    const items = itemsLine
      .substring(16)
      .split(', ')
      .map((i) => parseInt(i, 10));
    const [operation, operand] = operationLine.substring(21).split(' ');
    const testDivisibleBy = parseInt(testLine.substring(19), 10);
    const testTrueMonkey = parseInt(testTrueLine.at(-1), 10);
    const testFalseMonkey = parseInt(testFalseLine.at(-1), 10);
    return [
      items,
      buildOperationFn(operation, operand),
      testDivisibleBy,
      testTrueMonkey,
      testFalseMonkey,
    ];
  });
};

const product = (list) => list.reduce((acc, curr) => acc * curr, 1);

const test = (level, divisibleBy) => level % divisibleBy === 0;

const doMonkeyBusiness = (input, levelAdj, rounds) => {
  const monkeys = parseNotes(input);

  const maxLevel = product(monkeys.map(([, , testDivisibleBy]) => testDivisibleBy));

  const numInspectedItems = Array(monkeys.length).fill(0);

  for (let round = 0; round < rounds; ++round) {
    monkeys.forEach(
      ([items, op, testDivisibleBy, testTrueMonkey, testFalseMonkey], i) => {
        numInspectedItems[i] += items.length;

        while (items.length > 0) {
          const level = items.shift();
          const newLevel = Math.floor(op(level) / levelAdj) % maxLevel;
          const throwTo = test(newLevel, testDivisibleBy)
            ? testTrueMonkey
            : testFalseMonkey;
          monkeys[throwTo][0].push(newLevel);
        }
      }
    );
  }

  return product(numInspectedItems.sort((a, b) => b - a).slice(0, 2));
};

const doPart1 = (input) => {
  return doMonkeyBusiness(input, 3, 20);
};

const doPart2 = (input) => {
  return doMonkeyBusiness(input, 1, 10000);
};

module.exports = {
  doPart1,
  doPart2,
};

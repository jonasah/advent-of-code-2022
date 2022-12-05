const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day5');

const testInput = `
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
const testStartStacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];

const realInput = getInput(5);
const realStartStacks = [
  ['D', 'H', 'N', 'Q', 'T', 'W', 'V', 'B'],
  ['D', 'W', 'B'],
  ['T', 'S', 'Q', 'W', 'J', 'C'],
  ['F', 'J', 'R', 'N', 'Z', 'T', 'P'],
  ['G', 'P', 'V', 'J', 'M', 'S', 'T'],
  ['B', 'W', 'F', 'T', 'N'],
  ['B', 'L', 'D', 'Q', 'F', 'H', 'V', 'N'],
  ['H', 'P', 'F', 'R'],
  ['Z', 'S', 'M', 'B', 'L', 'N', 'P', 'H'],
];

describe('day5', () => {
  test('part 1', () => {
    expect(doPart1(testInput, testStartStacks)).toBe('CMZ');
    expect(doPart1(realInput, realStartStacks)).toBe('PSNRGBTFT');
  });

  test('part 2', () => {
    expect(doPart2(testInput, testStartStacks)).toBe('MCD');
    expect(doPart2(realInput, realStartStacks)).toBe(false);
  });
});

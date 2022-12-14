const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day14');

const testInput = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const realInput = getInput(14);

describe('day14', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(24);
    expect(doPart1(realInput)).toBe(592);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(93);
    expect(doPart2(realInput)).toBe(30367);
  });
});

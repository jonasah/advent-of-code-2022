const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day8');

const testInput = `30373
25512
65332
33549
35390`;

const realInput = getInput(8);

describe('day8', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(21);
    expect(doPart1(realInput)).toBe(1763);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(8);
    expect(doPart2(realInput)).toBe(671160);
  });
});

const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day6');

const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

const realInput = getInput(6);

describe('day6', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(7);
    expect(doPart1(realInput)).toBe(1093);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(19);
    expect(doPart2(realInput)).toBe(3534);
  });
});

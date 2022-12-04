const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day4');

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const realInput = getInput(4);

describe('day4', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(2);
    expect(doPart1(realInput)).toBe(657);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(4);
    expect(doPart2(realInput)).toBe(938);
  });
});

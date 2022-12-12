const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day12');

const testInput = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const realInput = getInput(12);

describe('day12', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(31);
    expect(doPart1(realInput)).toBe(380);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(29);
    expect(doPart2(realInput)).toBe(375);
  });
});

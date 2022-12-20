const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day17');

const testInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

const realInput = getInput(17);

describe('day17', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(3068);
    expect(doPart1(realInput)).toBe(3239);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(1514285714288);
    expect(doPart2(realInput)).toBe(1594842406882);
  });
});

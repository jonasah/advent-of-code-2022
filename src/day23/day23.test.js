const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day23');

const testInput = `
....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

const realInput = getInput(23);

describe('day23', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(110);
    expect(doPart1(realInput)).toBe(3931);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(20);
    expect(doPart2(realInput)).toBe(944);
  });
});

const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day22');

const testInput = `
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;

const realInput = getInput(22);

describe('day22', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(6032);
    expect(doPart1(realInput)).toBe(66292);
  });

  test('part 2', () => {
    expect(doPart2(testInput, 4)).toBe(5031);
    // expect(doPart2(realInput, 50)).toBe(false);
  });
});

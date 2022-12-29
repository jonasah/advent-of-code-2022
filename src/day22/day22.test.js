const getInput = require('../get-input');
const { doPart1, doPart2, RIGHT, DOWN, LEFT, UP } = require('./day22');

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
    expect(
      doPart1(testInput, [
        [
          1,
          [8, 0],
          [11, 3],
          {
            [RIGHT]: [1, LEFT],
            [DOWN]: [4, UP],
            [LEFT]: [1, RIGHT],
            [UP]: [5, DOWN],
          },
        ],
        [
          2,
          [0, 4],
          [3, 7],
          {
            [RIGHT]: [3, LEFT],
            [DOWN]: [2, UP],
            [LEFT]: [4, RIGHT],
            [UP]: [2, DOWN],
          },
        ],
        [
          3,
          [4, 4],
          [7, 7],
          {
            [RIGHT]: [4, LEFT],
            [DOWN]: [3, UP],
            [LEFT]: [2, RIGHT],
            [UP]: [3, DOWN],
          },
        ],
        [
          4,
          [8, 4],
          [11, 7],
          {
            [RIGHT]: [2, LEFT],
            [DOWN]: [5, UP],
            [LEFT]: [3, RIGHT],
            [UP]: [1, DOWN],
          },
        ],
      ])
    ).toBe(6032);
    expect(
      doPart1(realInput, [
        [
          1,
          [50, 0],
          [99, 49],
          {
            [RIGHT]: [2, LEFT],
            [DOWN]: [3, UP],
            [LEFT]: [2, RIGHT],
            [UP]: [5, DOWN],
          },
        ],
        [
          2,
          [100, 0],
          [149, 49],
          {
            [RIGHT]: [1, LEFT],
            [DOWN]: [2, UP],
            [LEFT]: [1, RIGHT],
            [UP]: [2, DOWN],
          },
        ],
        [
          3,
          [50, 50],
          [99, 99],
          {
            [RIGHT]: [3, LEFT],
            [DOWN]: [5, UP],
            [LEFT]: [3, RIGHT],
            [UP]: [1, DOWN],
          },
        ],
        [
          4,
          [0, 100],
          [49, 149],
          {
            [RIGHT]: [5, LEFT],
            [DOWN]: [6, UP],
            [LEFT]: [5, RIGHT],
            [UP]: [6, DOWN],
          },
        ],
        [
          5,
          [50, 100],
          [99, 149],
          {
            [RIGHT]: [4, LEFT],
            [DOWN]: [1, UP],
            [LEFT]: [4, RIGHT],
            [UP]: [3, DOWN],
          },
        ],
        [
          6,
          [0, 150],
          [49, 199],
          {
            [RIGHT]: [6, LEFT],
            [DOWN]: [4, UP],
            [LEFT]: [6, RIGHT],
            [UP]: [4, DOWN],
          },
        ],
      ])
    ).toBe(66292);
  });

  test('part 2', () => {
    // expect(doPart2(testInput, 4)).toBe(5031);
    // expect(doPart2(realInput, 50)).toBe(false);
  });
});
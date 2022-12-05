const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day5');

const testInput = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const realInput = getInput(5);

describe('day5', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe('CMZ');
    expect(doPart1(realInput)).toBe('PSNRGBTFT');
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe('MCD');
    expect(doPart2(realInput)).toBe('BNTZFPMMW');
  });
});

const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day9');

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const realInput = getInput(9);

describe('day9', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(13);
    expect(doPart1(realInput)).toBe(6357);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(1);
    expect(doPart2(testInput2)).toBe(36);
    expect(doPart2(realInput)).toBe(2627);
  });
});

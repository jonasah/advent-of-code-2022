const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day2');

const testInput = `A Y
B X
C Z`;

const realInput = getInput(2);

describe('day2', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(15);
    expect(doPart1(realInput)).toBe(11475);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(12);
    expect(doPart2(realInput)).toBe(false);
  });
});

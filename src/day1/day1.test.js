const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day1');

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

const realInput = getInput(1);

describe('day1', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(24000);
    expect(doPart1(realInput)).toBe(69795);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(45000);
    expect(doPart2(realInput)).toBe(208437);
  });
});

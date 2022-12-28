const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day18');

const testInput = `
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

const realInput = getInput(18);

describe('day18', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(64);
    expect(doPart1(realInput)).toBe(4536);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(58);
    expect(doPart2(realInput)).toBe(2606);
  });
});

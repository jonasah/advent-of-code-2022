const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day20');

const testInput = `
1
2
-3
3
-2
0
4`;

const realInput = getInput(20);

describe('day20', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(3);
    expect(doPart1(realInput)).toBe(4578);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(1623178306);
    expect(doPart2(realInput)).toBe(2159638736133);
  });
});

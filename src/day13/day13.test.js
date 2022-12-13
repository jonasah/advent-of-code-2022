const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day13');

const testInput = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const realInput = getInput(13);

describe('day13', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(13);
    expect(doPart1(realInput)).toBe(5196);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(140);
    expect(doPart2(realInput)).toBe(22134);
  });
});

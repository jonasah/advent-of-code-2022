const { doPart1, doPart2 } = require('./day1');

const input = `1000
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

describe('day1', () => {
  test('part 1', () => {
    expect(doPart1(input)).toBe(24000);
  });

  test('part 2', () => {
    expect(doPart2(input)).toBe(45000);
  });
});

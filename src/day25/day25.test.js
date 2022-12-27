const getInput = require('../get-input');
const { doPart1 } = require('./day25');

const testInput = `
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

const realInput = getInput(25);

describe('day25', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe('2=-1=0');
    expect(doPart1(realInput)).toBe('2=12-100--1012-0=012');
  });
});

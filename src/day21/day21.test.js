const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day21');

const testInput = `
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

const realInput = getInput(21);

describe('day20', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(152);
    expect(doPart1(realInput)).toBe(194501589693264);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(301);
    expect(doPart2(realInput)).toBe(3887609741189);
  });
});

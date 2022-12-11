const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day11');

const testInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

const realInput = getInput(11);

describe('day11', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(10605);
    expect(doPart1(realInput)).toBe(99840);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(2713310158);
    expect(doPart2(realInput)).toBe(20683044837);
  });
});

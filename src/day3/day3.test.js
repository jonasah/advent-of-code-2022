const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day3');

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const realInput = getInput(3);

describe('day3', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(157);
    expect(doPart1(realInput)).toBe(7811);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(70);
    expect(doPart2(realInput)).toBe(2639);
  });
});

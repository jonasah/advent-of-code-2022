const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day15');

const testInput = `
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const realInput = getInput(15);

describe('day15', () => {
  test('part 1', () => {
    expect(doPart1(testInput, 10)).toBe(26);
    expect(doPart1(realInput, 2000000)).toBe(5878678);
  });

  test('part 2', () => {
    expect(doPart2(testInput, 20)).toBe(56000011);
    expect(doPart2(realInput, 4000000)).toBe(11796491041245);
  });
});

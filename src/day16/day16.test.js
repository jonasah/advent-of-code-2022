const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day16');

const testInput = `
Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

const realInput = getInput(16);

describe('day16', () => {
  test('part 1', () => {
    // expect(doPart1(testInput)).toBe(1651);
    expect(doPart1(realInput)).toBe(2080);
  });

  test.skip('part 2', () => {
    expect(doPart2(testInput)).toBe(1707);
    expect(doPart2(realInput)).toBe(false);
  });
});

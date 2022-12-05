const getLines = require('../get-lines');

const rearrangementRegex = /^move (\d+) from (\d+) to (\d+)$/;

const parseStacks = (stacksLines, stacksLegend) => {
  const stacks = stacksLegend
    .split('')
    .filter((n) => n.trim() !== '')
    .map(() => []);

  stacksLines.forEach((l) => {
    for (let stack = 0; stack < stacks.length; ++stack) {
      const i = 1 + 4 * stack;

      if (l[i] && l[i] !== ' ') {
        stacks[stack].unshift(l[i]);
      }
    }
  });

  return stacks;
};

const parseRearrangement = (rearrangementLines) => {
  return rearrangementLines.map((l) => rearrangementRegex.exec(l).slice(1, 4));
};

const parseInput = (input) => {
  const lines = getLines(input, { trimStart: false });
  const emptyLineIndex = lines.findIndex((l) => l === '');
  const stacksLines = lines.slice(0, emptyLineIndex - 1);
  const stacksLegend = lines[emptyLineIndex - 1];
  const rearrangementLines = lines.slice(emptyLineIndex + 1);

  return [parseStacks(stacksLines, stacksLegend), parseRearrangement(rearrangementLines)];
};

const doPart1 = (input) => {
  const [stacks, rearrangements] = parseInput(input);

  rearrangements.forEach(([num, from, to]) => {
    for (let i = 0; i < num; ++i) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  });

  return stacks.map((s) => s[s.length - 1]).join('');
};

const doPart2 = (input) => {
  const [stacks, rearrangements] = parseInput(input);

  rearrangements.forEach(([num, from, to]) => {
    const cratesToMove = [];
    for (let i = 0; i < num; ++i) {
      cratesToMove.push(stacks[from - 1].pop());
    }
    stacks[to - 1].push(...cratesToMove.reverse());
  });

  return stacks.map((s) => s[s.length - 1]).join('');
};

module.exports = {
  doPart1,
  doPart2,
};

const getLines = require('../get-lines');

const regex = /^move (\d+) from (\d+) to (\d+)$/;

const parseInstructions = (input) => {
  const lines = getLines(input);
  const emptyLineIndex = lines.findIndex((l) => l === '');
  const instructionLines = lines.slice(emptyLineIndex + 1);

  return instructionLines.map((l) => {
    const matches = regex.exec(l);
    return matches.slice(1, 4);
  });
};

const doPart1 = (input, startStacks) => {
  const instructions = parseInstructions(input);

  const stacks = startStacks.map((s) => [...s]);

  instructions.forEach(([num, from, to]) => {
    for (let i = 0; i < num; ++i) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  });

  return stacks.map((s) => s[s.length - 1]).join('');
};

const doPart2 = (input, startStacks) => {
  const instructions = parseInstructions(input);

  const stacks = startStacks.map((s) => [...s]);

  instructions.forEach(([num, from, to]) => {
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

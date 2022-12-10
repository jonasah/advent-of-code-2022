const getLines = require('../get-lines');

const parseProgram = (input) => {
  return getLines(input).map((l) => l.split(' '));
};

const executeProgram = (input, fn) => {
  const program = parseProgram(input);

  let x = 1;
  let cycle = 0;
  let addingValue = null;

  while (program.length > 0 || (program.length === 0 && addingValue != null)) {
    cycle += 1;

    fn(cycle, x);

    if (addingValue != null) {
      x += addingValue;
      addingValue = null;
    } else {
      const instr = program.shift();

      if (instr[0] === 'addx') {
        addingValue = parseInt(instr[1], 10);
      }
    }
  }
};

const doPart1 = (input) => {
  const cyclesToCheck = [20, 60, 100, 140, 180, 220];
  let signalStrengths = 0;

  executeProgram(input, (cycle, x) => {
    if (cyclesToCheck.includes(cycle)) {
      signalStrengths += cycle * x;
    }
  });

  return signalStrengths;
};

const doPart2 = (input) => {
  const width = 40;
  const height = 6;
  const pixels = Array(height)
    .fill()
    .map(() => Array(width).fill());

  executeProgram(input, (cycle, x) => {
    const pos = cycle - 1;
    const row = Math.floor(pos / width);
    const col = pos - row * width;

    pixels[row][col] = Math.abs(x - col) <= 1 ? '#' : '.';
  });

  const image = pixels.map((row) => row.join('')).join('\n');
  console.log(image);
  return image;
};

module.exports = {
  doPart1,
  doPart2,
};

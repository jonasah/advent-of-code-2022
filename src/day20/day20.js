const { sum } = require('lodash');
const getLines = require('../get-lines');

const parseFile = (input) => {
  return getLines(input).map((l, i) => [parseInt(l, 10), i]);
};

const rotateLeft = (file, steps) => {
  file.splice(0, file.length, ...file.slice(steps), ...file.slice(0, steps));
};

const rotateRight = (file, steps) => {
  file.splice(
    0,
    file.length,
    ...file.slice(-steps),
    ...file.slice(0, file.length - steps)
  );
};

const mix = (file) => {
  for (let n = 0; n < file.length; ++n) {
    let srcIndex = file.findIndex(([, i]) => i === n);

    if (srcIndex === -1) {
      throw new Error(`Failed to find number to move: ${n}`);
    }

    const [steps] = file[srcIndex];
    let dstIndex = srcIndex + (steps % (file.length - 1));

    if (dstIndex > file.length - 1) {
      const adj = dstIndex - (file.length - 1);
      rotateLeft(file, adj);
      srcIndex -= adj;
      dstIndex -= adj;
    } else if (dstIndex < 0) {
      const adj = -dstIndex;
      rotateRight(file, adj);
      srcIndex += adj;
      dstIndex += adj;
    }

    if (dstIndex > srcIndex) {
      const newSequence = [...file.slice(srcIndex + 1, dstIndex + 1), file[srcIndex]];
      file.splice(srcIndex, newSequence.length, ...newSequence);
    } else if (dstIndex < srcIndex) {
      const newSequence = [file[srcIndex], ...file.slice(dstIndex, srcIndex)];
      file.splice(dstIndex, newSequence.length, ...newSequence);
    }
  }
};

const getGroveCoordinates = (file) => {
  const zeroIndex = file.findIndex(([v]) => v === 0);
  return [1000, 2000, 3000]
    .map((p) => (zeroIndex + p) % file.length)
    .map((i) => file[i][0]);
};

const doPart1 = (input) => {
  const file = parseFile(input);

  mix(file);

  const coord = getGroveCoordinates(file);
  return sum(coord);
};

const doPart2 = (input) => {
  const decryptionKey = 811589153;

  const file = parseFile(input).map(([n, i]) => [n * decryptionKey, i]);

  for (let i = 0; i < 10; ++i) {
    mix(file);
  }

  const coord = getGroveCoordinates(file);
  return sum(coord);
};

module.exports = {
  doPart1,
  doPart2,
};

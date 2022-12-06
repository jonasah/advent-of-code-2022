const findMarker = (buffer, sequenceLength) => {
  for (let i = sequenceLength; i < buffer.length; ++i) {
    const sequence = buffer.substring(i - sequenceLength, i);
    const uniqueChars = sequence
      .split('')
      .filter((value, index, self) => self.indexOf(value) === index);

    if (uniqueChars.length === sequenceLength) {
      return i;
    }
  }

  return -1;
};

const doPart1 = (input) => {
  return findMarker(input, 4);
};

const doPart2 = (input) => {
  return findMarker(input, 14);
};

module.exports = {
  doPart1,
  doPart2,
};

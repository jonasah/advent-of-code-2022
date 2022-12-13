const { chunk, sum, isArray, isNumber } = require('lodash');
const getLines = require('../get-lines');

const parsePackets = (input) => {
  return getLines(input)
    .filter((l) => l !== '')
    .map((l) => JSON.parse(l));
};

const parsePacketPairs = (input) => {
  return chunk(parsePackets(input), 2).map(([p1, p2], i) => [p1, p2, i + 1]);
};

const comparePackets = (firstPacket, secondPacket) => {
  const minLength = Math.min(firstPacket.length, secondPacket.length);

  for (let i = 0; i < minLength; ++i) {
    const leftValue = firstPacket[i];
    const rightValue = secondPacket[i];

    if (isNumber(leftValue) && isNumber(rightValue)) {
      if (leftValue !== rightValue) {
        return leftValue < rightValue ? -1 : 1;
      }
    } else {
      const leftArray = isArray(leftValue) ? leftValue : [leftValue];
      const rightArray = isArray(rightValue) ? rightValue : [rightValue];
      const order = comparePackets(leftArray, rightArray);

      if (order !== 0) {
        return order;
      }
    }
  }

  return firstPacket.length - secondPacket.length;
};

const doPart1 = (input) => {
  const packetPairs = parsePacketPairs(input);

  return sum(
    packetPairs.filter(([p1, p2]) => comparePackets(p1, p2) < 0).map(([, , i]) => i)
  );
};

const doPart2 = (input) => {
  const packets = parsePackets(input).map((p) => [p, false]);
  packets.push([[[2]], true], [[[6]], true]);

  packets.sort(comparePackets);

  const firstDecoderIndex = packets.findIndex(([, isDecoder]) => isDecoder) + 1;
  const lastDecoderIndex =
    packets.slice(firstDecoderIndex).findIndex(([, isDecoder]) => isDecoder) +
    firstDecoderIndex +
    1;

  return firstDecoderIndex * lastDecoderIndex;
};

module.exports = {
  doPart1,
  doPart2,
};

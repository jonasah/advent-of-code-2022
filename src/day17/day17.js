const chamberWidth = 7;

const shapeWidths = {
  '-': 4,
  '+': 3,
  L: 3,
  '|': 1,
  o: 2,
};

const shapeOffsets = {
  '-': [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  '+': [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  L: [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  '|': [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  o: [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
};

const parsePatterns = (input) => {
  return input.trim().split('');
};

const getShapePositions = (shape, pos) => {
  return shapeOffsets[shape].map((o) => [pos[0] + o[0], pos[1] + o[1]]);
};

const hasObstacle = (heights, pos) => {
  return pos[1] in heights[pos[0]];
};

const isFalling = (heights, shape, pos) => {
  return getShapePositions(shape, pos).every((p) => !hasObstacle(heights, p));
};

const canMoveLeft = (heights, shape, pos) => {
  return (
    pos[0] > 0 &&
    getShapePositions(shape, pos).every((p) => !hasObstacle(heights, [p[0] - 1, p[1]]))
  );
};

const canMoveRight = (heights, shape, pos) => {
  return (
    pos[0] < chamberWidth - shapeWidths[shape] &&
    getShapePositions(shape, pos).every((p) => !hasObstacle(heights, [p[0] + 1, p[1]]))
  );
};

const getMaxHeight = (heights) => {
  return Math.max(...heights.map((h) => h.length - 1));
};

const getMinHeight = (heights) => {
  return Math.min(...heights.map((h) => h.length - 1));
};

const simulateRock = (heights, shapeProvider, directionProvider) => {
  const shape = shapeProvider();
  const pos = [2, getMaxHeight(heights) + 3 + 1];

  while (isFalling(heights, shape, pos)) {
    const dir = directionProvider();

    if (dir === '<' && canMoveLeft(heights, shape, pos)) {
      pos[0] -= 1;
    } else if (dir === '>' && canMoveRight(heights, shape, pos)) {
      pos[0] += 1;
    }

    pos[1] -= 1;
  }

  // move up above obstacle
  pos[1] += 1;

  getShapePositions(shape, pos).forEach((p) => {
    heights[p[0]][p[1]] = '#';
  });
};

const simulateRocks = (input, numRocks) => {
  const patterns = parsePatterns(input);
  let patternIndex = 0;

  const getNextDirection = () => {
    const dir = patterns[patternIndex];
    patternIndex = (patternIndex + 1) % patterns.length;
    return dir;
  };

  const shapes = Object.keys(shapeOffsets);
  let shapeIndex = 0;

  const getNextShape = () => {
    const shape = shapes[shapeIndex];
    shapeIndex = (shapeIndex + 1) % shapes.length;
    return shape;
  };

  const heights = Array(chamberWidth)
    .fill()
    .map(() => ['#']);

  let removedRowsTotal = 0;
  const removalHistory = [];
  const windowSize = 5;
  let cycleLength = -1;
  let removedRowsPerCycle = 0;

  let rock = 1;

  for (; rock <= numRocks && cycleLength === -1; ++rock) {
    simulateRock(heights, getNextShape, getNextDirection);

    const minHeight = getMinHeight(heights);

    if (minHeight > 0) {
      // remove inaccessible rows
      heights.forEach((_, i) => {
        heights[i] = heights[i].slice(minHeight);
      });

      removedRowsTotal += minHeight;
      removalHistory.push([rock, minHeight, removedRowsTotal]);

      // detect cycle
      const reference = removalHistory.slice(-windowSize);

      for (let i = 0; i < removalHistory.length - windowSize * 2; ++i) {
        const window = removalHistory.slice(i, i + windowSize);
        const foundCycle = window.every(
          (value, index) => value[1] === reference[index][1]
        );

        if (foundCycle) {
          const cycle1Start = window.at(-1);
          const cycle2Start = reference.at(-1);
          cycleLength = cycle2Start[0] - cycle1Start[0];
          removedRowsPerCycle = cycle2Start[2] - cycle1Start[2];
        }
      }
    }
  }

  if (cycleLength === -1) {
    return removedRowsTotal + getMaxHeight(heights);
  }

  const rocksLeft = numRocks - rock;
  const completeCyclesLeft = Math.floor(rocksLeft / cycleLength);
  const removedRowsCycles = completeCyclesLeft * removedRowsPerCycle;
  rock += completeCyclesLeft * cycleLength;

  for (; rock <= numRocks; ++rock) {
    simulateRock(heights, getNextShape, getNextDirection);
  }

  return removedRowsCycles + removedRowsTotal + getMaxHeight(heights);
};

const doPart1 = (input) => {
  return simulateRocks(input, 2022);
};

const doPart2 = (input) => {
  return simulateRocks(input, 1000000000000);
};

module.exports = {
  doPart1,
  doPart2,
};

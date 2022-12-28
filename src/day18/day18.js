const { sum } = require('lodash');
const getLines = require('../get-lines');

const DROPLET = 'D';
const AIR = '.';

const adjacentOffsets = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
];

const parseDroplets = (input) => {
  const droplets = getLines(input).map((l) => l.split(',').map((v) => parseInt(v, 10)));

  const [xMin, xMax, yMin, yMax, zMin, zMax] = droplets.reduce(
    ([xmin, xmax, ymin, ymax, zmin, zmax], [x, y, z]) => [
      Math.min(xmin, x - 1),
      Math.max(xmax, x + 1),
      Math.min(ymin, y - 1),
      Math.max(ymax, y + 1),
      Math.min(zmin, z - 1),
      Math.max(zmax, z + 1),
    ],
    [Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity]
  );

  const map = Array(xMax - xMin + 1)
    .fill()
    .map(() =>
      Array(yMax - yMin + 1)
        .fill()
        .map(() => Array(zMax - zMin + 1).fill(AIR))
    );

  droplets.forEach(([x, y, z]) => {
    map[x - xMin][y - yMin][z - zMin] = DROPLET;
  });

  return map;
};

const add = ([x1, y1, z1], [x2, y2, z2]) => {
  return [x1 + x2, y1 + y2, z1 + z2];
};

const isDroplet = (map, [x, y, z]) => {
  return map[x][y][z] === DROPLET;
};

const isOnMap = (map, [x, y, z]) => {
  const xMax = map.length;
  const yMax = map[0].length;
  const zMax = map[0][0].length;
  return x >= 0 && x < xMax && y >= 0 && y < yMax && z >= 0 && z < zMax;
};

const getNumAdjacentDroplets = (map, pos) => {
  return sum(
    adjacentOffsets.map((offset) => {
      const adjPos = add(pos, offset);
      return isOnMap(map, adjPos) && isDroplet(map, adjPos) ? 1 : 0;
    })
  );
};

const getTotalSurfaceArea = (map, positionsToEvaluate) => {
  return sum(positionsToEvaluate.map((pos) => getNumAdjacentDroplets(map, pos)));
};

const doPart1 = (input) => {
  const map = parseDroplets(input);

  const nonDropletPositions = [];

  for (let x = 0; x < map.length; ++x) {
    for (let y = 0; y < map[x].length; ++y) {
      for (let z = 0; z < map[x][y].length; ++z) {
        if (!isDroplet(map, [x, y, z])) {
          nonDropletPositions.push([x, y, z]);
        }
      }
    }
  }

  return getTotalSurfaceArea(map, nonDropletPositions);
};

const doPart2 = (input) => {
  const map = parseDroplets(input);

  const QUEUED = 'Q';
  const VISITED = 'V';

  const queue = [];

  const enqueue = (newPos) => {
    const [x, y, z] = newPos;
    map[x][y][z] = QUEUED;
    queue.push(newPos);
  };
  const isQueued = ([x, y, z]) => map[x][y][z] === QUEUED;

  const visitNext = () => {
    const nextPos = queue.shift();
    const [x, y, z] = nextPos;
    map[x][y][z] = VISITED;
    return nextPos;
  };
  const isVisited = ([x, y, z]) => map[x][y][z] === VISITED;

  enqueue([0, 0, 0]);
  const outsidePositions = [];

  while (queue.length > 0) {
    const pos = visitNext();

    outsidePositions.push(pos);

    adjacentOffsets
      .map((offset) => add(pos, offset))
      .filter(
        (candidate) =>
          isOnMap(map, candidate) &&
          !isDroplet(map, candidate) &&
          !isQueued(candidate) &&
          !isVisited(candidate)
      )
      .forEach(enqueue);
  }

  return getTotalSurfaceArea(map, outsidePositions);
};

module.exports = {
  doPart1,
  doPart2,
};

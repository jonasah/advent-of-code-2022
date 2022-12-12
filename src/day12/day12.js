const getLines = require('../get-lines');

const parseHeightMap = (input) => {
  let startPos = [0, 0];
  let endPos = [0, 0];
  const map = getLines(input).map((l, row) =>
    l
      .split('')
      .map((s, col) => {
        if (s === 'S') {
          startPos = [row, col];
          return 'a';
        }
        if (s === 'E') {
          endPos = [row, col];
          return 'z';
        }
        return s;
      })
      .map((h, col) => [row, col, h.charCodeAt(0)])
  );
  return [map, startPos, endPos];
};

const getHeight = (heightMap, pos) => {
  return heightMap[pos[0]][pos[1]][2];
};

const canMove = (heightMap, from, to, isClimbing) => {
  const toHeight = getHeight(heightMap, to);
  const fromHeight = getHeight(heightMap, from);
  return isClimbing ? toHeight - fromHeight <= 1 : fromHeight - toHeight <= 1;
};

const getAccessibleSquaresFrom = (heightMap, from, climbing) => {
  const squaresToConsider = [];

  if (from[0] > 0) {
    // up
    squaresToConsider.push([from[0] - 1, from[1]]);
  }
  if (from[0] < heightMap.length - 1) {
    // down
    squaresToConsider.push([from[0] + 1, from[1]]);
  }
  if (from[1] > 0) {
    // left
    squaresToConsider.push([from[0], from[1] - 1]);
  }
  if (from[1] < heightMap[0].length - 1) {
    // right
    squaresToConsider.push([from[0], from[1] + 1]);
  }

  return squaresToConsider.filter((s) => canMove(heightMap, from, s, climbing));
};

const getShortestPath = (shortestPaths, pos) => {
  return shortestPaths[pos[0]][pos[1]];
};

const findShortestPaths = (heightMap, startPos, isClimbing) => {
  const shortestPaths = Array(heightMap.length)
    .fill()
    .map(() => Array(heightMap[0].length).fill(Infinity));
  shortestPaths[startPos[0]][startPos[1]] = 0;

  const squaresToVisit = heightMap.flatMap((heights) => heights);

  while (squaresToVisit.length > 0) {
    squaresToVisit.sort(
      (a, b) => getShortestPath(shortestPaths, a) - getShortestPath(shortestPaths, b)
    );

    const currentSquare = squaresToVisit.shift();
    const currentDistance = getShortestPath(shortestPaths, currentSquare);

    const neighboursToUpdate = getAccessibleSquaresFrom(
      heightMap,
      currentSquare,
      isClimbing
    );
    const newDistance = currentDistance + 1;

    neighboursToUpdate.forEach((n) => {
      shortestPaths[n[0]][n[1]] = Math.min(
        getShortestPath(shortestPaths, n),
        newDistance
      );
    });
  }

  return shortestPaths;
};

const doPart1 = (input) => {
  const [heightMap, startPos, endPos] = parseHeightMap(input);

  const shortestPaths = findShortestPaths(heightMap, startPos, true);

  return getShortestPath(shortestPaths, endPos);
};

const doPart2 = (input) => {
  const [heightMap, , endPos] = parseHeightMap(input);

  const shortestPaths = findShortestPaths(heightMap, endPos, false);

  const shortestPathCandidates = heightMap
    .flatMap((h) => h)
    .filter(([, , h]) => h === 'a'.charCodeAt(0))
    .map(([row, col]) => getShortestPath(shortestPaths, [row, col]));

  return Math.min(...shortestPathCandidates);
};

module.exports = {
  doPart1,
  doPart2,
};

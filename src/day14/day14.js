const getLines = require('../get-lines');

const startPoint = [500, 0];

const parsePaths = (input) => {
  return getLines(input).map((l) =>
    l.split(' -> ').map((p) => p.split(',').map((v) => parseInt(v, 10)))
  );
};

const buildGrid = (input, xMargin) => {
  const paths = parsePaths(input);

  const points = [...paths.flatMap((path) => path), startPoint];

  const xPositions = points.map(([x]) => x);
  const xMin = Math.min(...xPositions) - xMargin;
  const xMax = Math.max(...xPositions) + xMargin;
  const width = xMax - xMin + 1;

  const yPositions = points.map(([, y]) => y);
  const yMin = Math.min(...yPositions);
  const yMax = Math.max(...yPositions);
  const height = yMax - yMin + 1;

  const adjustedStartPoint = [startPoint[0] - xMin, startPoint[1] - yMin];

  const grid = Array(height)
    .fill()
    .map(() => Array(width).fill('.'));

  grid[adjustedStartPoint[1]][adjustedStartPoint[0]] = '+';

  paths.forEach((path) => {
    for (let i = 1; i < path.length; ++i) {
      const p0 = path[i - 1];
      const p1 = path[i];

      let x0 = p0[0] - xMin;
      let y0 = p0[1] - yMin;
      const x1 = p1[0] - xMin;
      const y1 = p1[1] - yMin;
      const xDir = Math.sign(x1 - x0);
      const yDir = Math.sign(y1 - y0);

      while (x0 !== x1 || y0 !== y1) {
        grid[y0][x0] = '#';

        x0 += xDir;
        y0 += yDir;
      }

      grid[y0][x0] = '#';
    }
  });

  return [grid, adjustedStartPoint];
};

const printGrid = (grid) => {
  console.log(grid.map((row) => row.join('')).join('\n'));
};

const isTileFree = (grid, pos) => {
  return grid[pos[1]][pos[0]] === '.';
};

const isTileSand = (grid, pos) => {
  return grid[pos[1]][pos[0]] === 'o';
};

const findObstacleBelow = (grid, pos) => {
  const obstacleIndex = grid
    .slice(pos[1] + 1)
    .map((row) => row[pos[0]])
    .findIndex((v) => v !== '.');

  return obstacleIndex === -1 ? -1 : [pos[0], pos[1] + obstacleIndex + 1];
};

const findLandingSpot = (grid, sandPos) => {
  const obstaclePos = findObstacleBelow(grid, sandPos);

  if (obstaclePos === -1) {
    return -1;
  }

  const newSandPos = [obstaclePos[0], obstaclePos[1] - 1];
  const leftDiagonal = [newSandPos[0] - 1, newSandPos[1] + 1];
  const rightDiagonal = [newSandPos[0] + 1, newSandPos[1] + 1];

  if (isTileFree(grid, leftDiagonal)) {
    return findLandingSpot(grid, leftDiagonal);
  }

  if (isTileFree(grid, rightDiagonal)) {
    return findLandingSpot(grid, rightDiagonal);
  }

  return newSandPos;
};

const doPart1 = (input) => {
  const [grid, adjustedStartPoint] = buildGrid(input, 1);

  let numSands = 0;

  while (true) {
    const landingSpot = findLandingSpot(grid, adjustedStartPoint);

    if (landingSpot === -1) {
      break;
    }

    grid[landingSpot[1]][landingSpot[0]] = 'o';

    numSands += 1;
  }

  // printGrid(grid);

  return numSands;
};

const doPart2 = (input) => {
  const [grid, adjustedStartPoint] = buildGrid(input, 200);

  grid.push(Array(grid[0].length).fill('.'));
  grid.push(Array(grid[0].length).fill('#'));

  let numSands = 0;

  while (!isTileSand(grid, adjustedStartPoint)) {
    const landingSpot = findLandingSpot(grid, adjustedStartPoint);

    grid[landingSpot[1]][landingSpot[0]] = 'o';

    numSands += 1;
  }

  // printGrid(grid);

  return numSands;
};

module.exports = {
  doPart1,
  doPart2,
};

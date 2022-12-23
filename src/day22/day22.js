const getLines = require('../get-lines');

const EMPTY = undefined;
// const OPEN = '.';
const WALL = '#';

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;

const parseMap = (mapLines) => {
  return mapLines
    .filter((l) => l !== '')
    .map((l) => l.split('').map((tile) => (tile === ' ' ? EMPTY : tile)));
};

const parsePath = (pathLine) => {
  const matches = [...pathLine.matchAll(/([RL])(\d+)/g)];

  return [
    parseInt(pathLine.substring(0, matches[0][2]), 10),
    ...matches.flatMap(([, dir, steps]) => [dir, parseInt(steps, 10)]),
  ];
};

const parseInput = (input) => {
  const lines = getLines(input, { trimStart: false });
  const mapLines = lines.slice(0, -1);
  const pathLine = lines.at(-1);

  return [parseMap(mapLines), parsePath(pathLine)];
};

const findLeftMostPosition = (rowOrColumn) => {
  return rowOrColumn.findIndex((tile) => tile !== EMPTY);
};

const moveInRowOrColumn = (rowOrColumn, current, steps) => {
  const wallPosition = rowOrColumn.indexOf(WALL, current);

  const newPosition = current + steps;

  if (wallPosition !== -1 && wallPosition <= newPosition) {
    // move to wall
    return wallPosition - 1;
  }

  // no wall

  let maxPosition = rowOrColumn.indexOf(EMPTY, current) - 1;

  if (maxPosition < 0) {
    maxPosition = rowOrColumn.length - 1;
  }

  if (newPosition <= maxPosition) {
    // move steps without wrapping around
    return newPosition;
  }

  // wrap around
  const leftMostPosition = findLeftMostPosition(rowOrColumn);

  if (rowOrColumn[leftMostPosition] === WALL) {
    // wraps around to wall, stay on the edge
    return maxPosition;
  }

  // wrap around to left edge
  const stepsLeft = newPosition - maxPosition - 1;
  return moveInRowOrColumn(rowOrColumn, leftMostPosition, stepsLeft);
};

const moveRight = (map, pos, steps) => {
  const row = map[pos[1]];
  return [moveInRowOrColumn(row, pos[0], steps), pos[1]];
};

const moveDown = (map, pos, steps) => {
  const column = map.map((row) => row[pos[0]]);
  return [pos[0], moveInRowOrColumn(column, pos[1], steps)];
};

const moveLeft = (map, pos, steps) => {
  const reversedRow = [...map[pos[1]]].reverse();
  const maxIndex = reversedRow.length - 1;
  return [maxIndex - moveInRowOrColumn(reversedRow, maxIndex - pos[0], steps), pos[1]];
};

const moveUp = (map, pos, steps) => {
  const reversedColumn = map.map((row) => row[pos[0]]).reverse();
  const maxIndex = reversedColumn.length - 1;
  return [pos[0], maxIndex - moveInRowOrColumn(reversedColumn, maxIndex - pos[1], steps)];
};

const rotateLeft = (dir) => (dir === RIGHT ? UP : dir - 1);
const rotateRight = (dir) => (dir === UP ? RIGHT : dir + 1);

const findPassword = (input) => {
  const [map, path] = parseInput(input);

  let pos = [findLeftMostPosition(map[0]), 0];
  let dir = RIGHT;

  path.forEach((action) => {
    if (action === 'L') {
      dir = rotateLeft(dir);
    } else if (action === 'R') {
      dir = rotateRight(dir);
    } else {
      const steps = action;

      if (dir === RIGHT) {
        pos = moveRight(map, pos, steps);
      } else if (dir === DOWN) {
        pos = moveDown(map, pos, steps);
      } else if (dir === LEFT) {
        pos = moveLeft(map, pos, steps);
      } else {
        pos = moveUp(map, pos, steps);
      }
    }
  });

  return 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dir;
};

const doPart1 = (input) => {
  return findPassword(input);
};

const doPart2 = (input, faceSize) => {
  return findPassword(input);
};

module.exports = {
  doPart1,
  doPart2,
  findNextPosition: moveInRowOrColumn,
};

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
  // find wall ahead
  const newPosition = current + steps;
  const wallPosition = rowOrColumn.indexOf(WALL, current);

  if (wallPosition !== -1 && wallPosition <= newPosition) {
    // move to wall
    return [wallPosition - 1, 0];
  }

  // no wall, find edge ahead
  let edgePosition = rowOrColumn.indexOf(EMPTY, current);

  if (edgePosition === -1) {
    edgePosition = rowOrColumn.length;
  }

  if (newPosition < edgePosition) {
    // no edge, move steps without wrapping around
    return [newPosition, 0];
  }

  const leftMostPosition = findLeftMostPosition(rowOrColumn);

  if (rowOrColumn[leftMostPosition] === WALL) {
    // wall on left edge, stop at right edge
    return [edgePosition - 1, 0];
  }

  // wrap around to left edge
  const stepsLeft = newPosition - edgePosition;
  return [leftMostPosition, stepsLeft];
};

const moveRight = (map, pos, steps) => {
  const row = map[pos[1]];
  const [newColumn, stepsLeft] = moveInRowOrColumn(row, pos[0], steps);
  const newPos = [newColumn, pos[1]];
  return [newPos, stepsLeft];
};

const moveDown = (map, pos, steps) => {
  const column = map.map((row) => row[pos[0]]);
  const [newRow, stepsLeft] = moveInRowOrColumn(column, pos[1], steps);
  const newPos = [pos[0], newRow];
  return [newPos, stepsLeft];
};

const moveLeft = (map, pos, steps) => {
  const reversedRow = [...map[pos[1]]].reverse();
  const maxIndex = reversedRow.length - 1;
  const [newColumn, stepsLeft] = moveInRowOrColumn(reversedRow, maxIndex - pos[0], steps);
  const newPos = [maxIndex - newColumn, pos[1]];
  return [newPos, stepsLeft];
};

const moveUp = (map, pos, steps) => {
  const reversedColumn = map.map((row) => row[pos[0]]).reverse();
  const maxIndex = reversedColumn.length - 1;
  const [newRow, stepsLeft] = moveInRowOrColumn(reversedColumn, maxIndex - pos[1], steps);
  const newPos = [pos[0], maxIndex - newRow];
  return [newPos, stepsLeft];
};

const rotateLeft = (dir) => (dir === RIGHT ? UP : dir - 1);
const rotateRight = (dir) => (dir === UP ? RIGHT : dir + 1);

const findPassword = (input) => {
  const [map, path] = parseInput(input);

  let pos = [findLeftMostPosition(map[0]), 0];
  let dir = RIGHT;

  while (path.length > 0) {
    const action = path.shift();

    if (action === 'L') {
      dir = rotateLeft(dir);
    } else if (action === 'R') {
      dir = rotateRight(dir);
    } else {
      const steps = action;
      let stepsLeft = 0;

      if (dir === RIGHT) {
        [pos, stepsLeft] = moveRight(map, pos, steps);
      } else if (dir === DOWN) {
        [pos, stepsLeft] = moveDown(map, pos, steps);
      } else if (dir === LEFT) {
        [pos, stepsLeft] = moveLeft(map, pos, steps);
      } else {
        [pos, stepsLeft] = moveUp(map, pos, steps);
      }

      if (stepsLeft > 0) {
        // continue moving in the same direction after wrapping around
        path.unshift(stepsLeft);
      }
    }
  }

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
};

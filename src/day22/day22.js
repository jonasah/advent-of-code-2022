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

const isWall = (map, pos) => {
  return map[pos[1]][pos[0]] === WALL;
};

const findLeftMostPosition = (rowOrColumn) => {
  return rowOrColumn.findIndex((tile) => tile !== EMPTY);
};

const moveInRowOrColumn = (rowOrColumn, current, steps, edgePosition) => {
  if (edgePosition == null) {
    throw new Error('no edge');
  }

  // find wall ahead
  const newPosition = current + steps;
  const wallPosition = rowOrColumn.indexOf(WALL, current);

  if (wallPosition !== -1 && wallPosition <= newPosition) {
    // move to wall
    return [wallPosition - 1, 0];
  }

  if (newPosition <= edgePosition) {
    // will not reach edge, move steps without wrapping around
    return [newPosition, 0];
  }

  // move to edge
  const stepsLeft = newPosition - edgePosition;
  return [edgePosition, stepsLeft];
};

const moveRight = (map, pos, steps, edgePosition) => {
  const row = map[pos[1]];
  const [newColumn, stepsLeft] = moveInRowOrColumn(row, pos[0], steps, edgePosition);
  const newPos = [newColumn, pos[1]];
  return [newPos, stepsLeft];
};

const moveDown = (map, pos, steps, edgePosition) => {
  const column = map.map((row) => row[pos[0]]);
  const [newRow, stepsLeft] = moveInRowOrColumn(column, pos[1], steps, edgePosition);
  const newPos = [pos[0], newRow];
  return [newPos, stepsLeft];
};

const moveLeft = (map, pos, steps, edgePosition) => {
  const reversedRow = [...map[pos[1]]].reverse();
  const maxIndex = reversedRow.length - 1;
  const [newColumn, stepsLeft] = moveInRowOrColumn(
    reversedRow,
    maxIndex - pos[0],
    steps,
    maxIndex - edgePosition
  );
  const newPos = [maxIndex - newColumn, pos[1]];
  return [newPos, stepsLeft];
};

const moveUp = (map, pos, steps, edgePosition) => {
  const reversedColumn = map.map((row) => row[pos[0]]).reverse();
  const maxIndex = reversedColumn.length - 1;
  const [newRow, stepsLeft] = moveInRowOrColumn(
    reversedColumn,
    maxIndex - pos[1],
    steps,
    maxIndex - edgePosition
  );
  const newPos = [pos[0], maxIndex - newRow];
  return [newPos, stepsLeft];
};

const rotateLeft = (dir) => (dir === RIGHT ? UP : dir - 1);
const rotateRight = (dir) => (dir === UP ? RIGHT : dir + 1);

const getFaceForPosition = (faces, pos) => {
  return faces.find(
    ([, ul, dr]) =>
      ul[0] <= pos[0] && pos[0] <= dr[0] && ul[1] <= pos[1] && pos[1] <= dr[1]
  );
};

const getFace = (faces, face) => {
  return faces.find(([n]) => n === face);
};

const findPassword = (input, faces) => {
  const [map, path] = parseInput(input);

  let pos = [findLeftMostPosition(map[0]), 0];
  let dir = RIGHT;

  let n = 0;
  const hist = [];

  while (path.length > 0) {
    n += 1;
    const action = path.shift();

    if (action === 'L') {
      dir = rotateLeft(dir);
    } else if (action === 'R') {
      dir = rotateRight(dir);
    } else {
      const steps = action;
      let stepsLeft = 0;

      const face = getFaceForPosition(faces, pos);
      if (!face) {
        console.log('no face', pos);
        throw new Error('no face :(');
      }
      const [, ul, dr] = face;

      if (dir === RIGHT) {
        [pos, stepsLeft] = moveRight(map, pos, steps, dr[0]);
      } else if (dir === DOWN) {
        [pos, stepsLeft] = moveDown(map, pos, steps, dr[1]);
      } else if (dir === LEFT) {
        [pos, stepsLeft] = moveLeft(map, pos, steps, ul[0]);
      } else {
        [pos, stepsLeft] = moveUp(map, pos, steps, ul[1]);
      }

      if (stepsLeft > 0) {
        const [, , , links] = face;
        const [nextFaceNo, nextFaceDir] = links[dir];
        const nextFace = getFace(faces, nextFaceNo);

        if (!nextFace) {
          throw new Error(`failed to find next ${nextFaceNo}`);
        }

        const wrappedPos = ((d, p) => {
          const [, nextUL, nextDR] = nextFace;

          if (d === RIGHT) {
            return [nextUL[0], p[1]];
          }
          if (d === DOWN) {
            return [p[0], nextUL[1]];
          }
          if (d === LEFT) {
            return [nextDR[0], p[1]];
          }

          return [p[0], nextDR[1]];
        })(dir, pos);

        if (!isWall(map, wrappedPos)) {
          pos = wrappedPos;
          path.unshift(stepsLeft - 1);
        }
      }

      hist.push(pos);
    }

    if (Number.isNaN(pos[0]) || Number.isNaN(pos[1])) {
      throw new Error(`nan ${hist.slice(-2, -1)} ${pos} ${action} ${dir}`);
    }

    if (n === 4) {
      // break;
    }
  }

  // console.log(hist);

  return 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dir;
};

const doPart1 = findPassword;

const doPart2 = findPassword;

module.exports = {
  doPart1,
  doPart2,
  RIGHT,
  DOWN,
  LEFT,
  UP,
};

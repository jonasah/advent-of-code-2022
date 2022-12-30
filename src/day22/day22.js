const assert = require('assert');
const { writeFileSync } = require('fs');
const getLines = require('../get-lines');

const EMPTY = undefined;
const OPEN = '.';
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

const moveInRowOrColumn = (rowOrColumn, current, steps, maxPosition) => {
  const newPosition = Math.min(current + steps, maxPosition);
  const wallPosition = rowOrColumn.indexOf(WALL, current);

  if (wallPosition !== -1 && wallPosition <= newPosition) {
    // move to wall
    return [wallPosition - 1, 0];
  }

  const stepsLeft = steps - (newPosition - current);
  return [newPosition, stepsLeft];
};

const moveRight = (map, pos, steps, maxPosition) => {
  const row = map[pos[1]];
  const [newColumn, stepsLeft] = moveInRowOrColumn(row, pos[0], steps, maxPosition);
  const newPos = [newColumn, pos[1]];
  return [newPos, stepsLeft];
};

const moveDown = (map, pos, steps, maxPosition) => {
  const column = map.map((row) => row[pos[0]]);
  const [newRow, stepsLeft] = moveInRowOrColumn(column, pos[1], steps, maxPosition);
  const newPos = [pos[0], newRow];
  return [newPos, stepsLeft];
};

const moveLeft = (map, pos, steps, maxPosition) => {
  const reversedRow = [...map[pos[1]]].reverse();
  const maxIndex = reversedRow.length - 1;
  const [newColumn, stepsLeft] = moveInRowOrColumn(
    reversedRow,
    maxIndex - pos[0],
    steps,
    maxIndex - maxPosition
  );
  const newPos = [maxIndex - newColumn, pos[1]];
  return [newPos, stepsLeft];
};

const moveUp = (map, pos, steps, maxPosition) => {
  const reversedColumn = map.map((row) => row[pos[0]]).reverse();
  const maxIndex = reversedColumn.length - 1;
  const [newRow, stepsLeft] = moveInRowOrColumn(
    reversedColumn,
    maxIndex - pos[1],
    steps,
    maxIndex - maxPosition
  );
  const newPos = [pos[0], maxIndex - newRow];
  return [newPos, stepsLeft];
};

const rotateLeft = (dir) => (dir === RIGHT ? UP : dir - 1);
const rotateRight = (dir) => (dir === UP ? RIGHT : dir + 1);

const getFace = (faces, face) => {
  return faces.find(([n]) => n === face);
};

const getFaceForPosition = (faces, pos) => {
  return faces.find(
    ([, upperLeft, lowerRight]) =>
      upperLeft[0] <= pos[0] &&
      pos[0] <= lowerRight[0] &&
      upperLeft[1] <= pos[1] &&
      pos[1] <= lowerRight[1]
  );
};

const wrap = (dir, pos, face, faces) => {
  const [faceNo, upperLeft, lowerRight, links] = face;
  const [nextFaceNo, connectingSide] = links[dir];
  const [, nextUpperLeft, nextLowerRight] = getFace(faces, nextFaceNo);
  const newDir = rotateLeft(rotateLeft(connectingSide));

  if (dir === RIGHT) {
    if (connectingSide === DOWN) {
      return [newDir, [nextUpperLeft[0] + pos[1] - upperLeft[1], nextLowerRight[1]]];
    }

    if (connectingSide === RIGHT) {
      return [newDir, [nextLowerRight[0], nextLowerRight[1] - (pos[1] - upperLeft[1])]];
    }

    if (connectingSide === UP) {
      return [newDir, [nextUpperLeft[0] + lowerRight[1] - pos[1], nextUpperLeft[1]]];
    }

    return [newDir, [nextUpperLeft[0], nextUpperLeft[1] + pos[1] - upperLeft[1]]];
  }

  if (dir === DOWN) {
    if (connectingSide === DOWN) {
      return [newDir, [nextUpperLeft[0] + lowerRight[0] - pos[0], nextLowerRight[1]]];
    }

    if (connectingSide === RIGHT) {
      return [newDir, [nextUpperLeft[0], nextLowerRight[1] - (pos[0] - upperLeft[0])]];
    }

    assert(
      connectingSide === UP,
      `2 translate pos ${faceNo} ${dir} -> ${nextFaceNo} ${connectingSide}`
    );
    return [newDir, [nextUpperLeft[0] + pos[0] - upperLeft[0], nextUpperLeft[1]]];
  }

  if (dir === LEFT) {
    if (connectingSide === LEFT) {
      return [newDir, [nextUpperLeft[0], nextLowerRight[1] + upperLeft[1] - pos[1]]];
    }

    if (connectingSide === UP) {
      return [newDir, [nextUpperLeft[0] + pos[1] - upperLeft[1], nextUpperLeft[1]]];
    }

    assert(
      connectingSide === RIGHT,
      `3 translate pos ${faceNo} ${dir} -> ${nextFaceNo} ${connectingSide}`
    );
    return [newDir, [nextLowerRight[0], nextUpperLeft[1] + pos[1] - upperLeft[1]]];
  }

  // dir === UP
  if (connectingSide === LEFT) {
    return [newDir, [nextUpperLeft[0], nextUpperLeft[1] + pos[0] - upperLeft[0]]];
  }

  assert(
    connectingSide === DOWN,
    `4 translate pos ${faceNo} ${dir} -> ${nextFaceNo} ${connectingSide}`
  );
  return [newDir, [nextUpperLeft[0] + pos[0] - upperLeft[0], nextLowerRight[1]]];
};

const printMap = (map) => {
  return map.map((row) => row.map((t) => (t === EMPTY ? ' ' : t)).join('')).join('\n');
};

const findPassword = (input, faces) => {
  const [map, path] = parseInput(input);

  let [, pos] = getFace(faces, 1);
  let dir = RIGHT;
  let prevPos = pos;

  const dirMap = {
    [RIGHT]: 'R',
    [DOWN]: 'D',
    [LEFT]: 'L',
    [UP]: 'U',
  };

  const arrows = {
    [RIGHT]: '>',
    [DOWN]: 'v',
    [LEFT]: '<',
    [UP]: '^',
  };

  let n = 0;
  const hist = [];
  hist.push([n, 0, dirMap[dir], ...pos, 0]);

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
      const [faceNo, upperLeft, lowerRight] = face;

      if (dir === RIGHT) {
        [pos, stepsLeft] = moveRight(map, pos, steps, lowerRight[0]);
      } else if (dir === DOWN) {
        [pos, stepsLeft] = moveDown(map, pos, steps, lowerRight[1]);
      } else if (dir === LEFT) {
        [pos, stepsLeft] = moveLeft(map, pos, steps, upperLeft[0]);
      } else {
        [pos, stepsLeft] = moveUp(map, pos, steps, upperLeft[1]);
      }

      for (
        let col = Math.min(prevPos[0], pos[0]);
        col <= Math.max(prevPos[0], pos[0]);
        ++col
      ) {
        for (
          let row = Math.min(prevPos[1], pos[1]);
          row <= Math.max(prevPos[1], pos[1]);
          ++row
        ) {
          map[row][col] = arrows[dir];
        }
      }

      if (stepsLeft > 0) {
        if (
          !(
            pos[0] === upperLeft[0] ||
            pos[0] === lowerRight[0] ||
            pos[1] === upperLeft[1] ||
            pos[1] === lowerRight[1]
          )
        ) {
          throw new Error(`not on edge ${pos} ${upperLeft} ${lowerRight}`);
        }

        const [newDir, newPos] = wrap(dir, pos, face, faces);

        if (!isWall(map, newPos)) {
          dir = newDir;
          pos = newPos;
          path.unshift(stepsLeft - 1);
        }
      }

      hist.push([n, steps, dirMap[dir], ...pos, faceNo]);

      prevPos = pos;
    }

    if (map[pos[1]][pos[0]] === EMPTY || map[pos[1]][pos[0]] === WALL) {
      throw new Error(`OOB ${n} ${hist.at(-2)} ${pos} ${action} ${dir}`);
    }

    if (n === 53) {
      // break;
    }
  }

  // console.log(hist);

  writeFileSync('history.log', hist.map((x) => x.join(',')).join('\n'));
  writeFileSync('map.log', printMap(map));

  console.log(pos);
  return 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dir;
};

module.exports = {
  doPart1: findPassword,
  doPart2: findPassword,
  wrap,
  RIGHT,
  DOWN,
  LEFT,
  UP,
  moveInRowOrColumn,
};

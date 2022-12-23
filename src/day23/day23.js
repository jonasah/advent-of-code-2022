const { maxBy, minBy, groupBy } = require('lodash');
const getLines = require('../get-lines');

const EMPTY = '.';
const ELF = '#';

const NORTH = 'N';
const SOUTH = 'S';
const WEST = 'W';
const EAST = 'E';

const offsets = {
  [NORTH]: [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
  ],
  [SOUTH]: [
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  [WEST]: [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
  ],
  [EAST]: [
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ],
};

const parseElves = (input) => {
  return getLines(input).flatMap((l, y) =>
    l
      .split('')
      .map((tile, x) => (tile === ELF ? { x: x + 1, y: y + 1 } : undefined))
      .filter((elf) => !!elf)
  );
};

const equals = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
};

const isAdjacent = (p1, p2) => {
  return !equals(p1, p2) && Math.abs(p2.x - p1.x) <= 1 && Math.abs(p2.y - p1.y) <= 1;
};

const add = (p1, p2) => {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
};

const getPositionsToCheck = (elf, dir) => {
  return offsets[dir].map((offset) => add(elf, offset));
};

const proposeMove = (elvesbyRow, elf, dirs) => {
  const adjacentElves = [
    ...(elvesbyRow[elf.y - 1] ?? []),
    ...(elvesbyRow[elf.y] ?? []),
    ...(elvesbyRow[elf.y + 1] ?? []),
  ].filter((e) => isAdjacent(e, elf));

  if (adjacentElves.length === 0) {
    return undefined;
  }

  const proposedDir = dirs.find((d) => {
    const positionsToCheck = getPositionsToCheck(elf, d);
    return adjacentElves.every((e) => positionsToCheck.every((p) => !equals(e, p)));
  });

  return proposedDir ? add(elf, offsets[proposedDir][1]) : undefined;
};

const canMakeMove = (proposedMoves, move) => {
  return proposedMoves.filter((pos) => pos && move && equals(pos, move)).length === 1;
};

const getNumEmptyTiles = (elves) => {
  const width = maxBy(elves, 'x').x - minBy(elves, 'x').x + 1;
  const height = maxBy(elves, 'y').y - minBy(elves, 'y').y + 1;
  return width * height - elves.length;
};

const printMap = (elves, round, dirs) => {
  const xMin = minBy(elves, 'x').x;
  const xMax = maxBy(elves, 'x').x;
  const yMin = minBy(elves, 'y').y;
  const yMax = maxBy(elves, 'y').y;

  let str = `R${round} [${dirs.join('')}]\n`;

  str += '   ';
  for (let x = xMin; x <= xMax; ++x) {
    str += x.toString().padStart(2);
  }
  str += '\n';

  for (let y = yMin; y <= yMax; ++y) {
    str += `${y.toString().padStart(2)} `;

    for (let x = xMin; x <= xMax; ++x) {
      const i = elves.findIndex((e) => equals(e, { x, y }));
      str += (i !== -1 ? ELF : EMPTY).padStart(2);
    }

    str += '\n';
  }

  return str;
};

const simulate = (input, maxRounds) => {
  const elves = parseElves(input);

  const dirs = [NORTH, SOUTH, WEST, EAST];

  let round = 1;

  while (round <= maxRounds) {
    const elvesByRow = groupBy(elves, 'y');
    const proposedMoves = elves.map((elf) => proposeMove(elvesByRow, elf, dirs));
    const canMakeMoves = proposedMoves.map((move) => canMakeMove(proposedMoves, move));

    if (canMakeMoves.every((m) => !m)) {
      break;
    }

    for (let e = 0; e < elves.length; ++e) {
      if (canMakeMoves[e]) {
        elves[e].x = proposedMoves[e].x;
        elves[e].y = proposedMoves[e].y;
      }
    }

    dirs.push(dirs.shift());

    round += 1;
  }

  return [round, getNumEmptyTiles(elves)];
};

const doPart1 = (input) => {
  return simulate(input, 10)[1];
};

const doPart2 = (input) => {
  return simulate(input, Infinity)[0];
};

module.exports = {
  doPart1,
  doPart2,
};

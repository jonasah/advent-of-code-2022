const { max } = require('lodash');
const getLines = require('../get-lines');

const parseMap = (input) => {
  return getLines(input).map((r) => r.split('').map((c) => parseInt(c, 10)));
};

const isTreeVisible = (map, row, col) => {
  const treeHeight = map[row][col];

  const allTreesLower = (trees) => trees.every((t) => t < treeHeight);

  const treesLeft = map[row].slice(0, col);
  const treesRight = map[row].slice(col + 1);
  const treesTop = map.slice(0, row).map((r) => r[col]);
  const treesBottom = map.slice(row + 1).map((r) => r[col]);

  return (
    allTreesLower(treesLeft) ||
    allTreesLower(treesRight) ||
    allTreesLower(treesTop) ||
    allTreesLower(treesBottom)
  );
};

const getScenicScore = (map, row, col) => {
  const treeHeight = map[row][col];

  const getViewingDistance = (trees) => {
    const i = trees.findIndex((t) => t >= treeHeight);

    if (i === -1) {
      return trees.length;
    }

    return i + 1;
  };

  const treesLeft = map[row].slice(0, col).reverse();
  const treesRight = map[row].slice(col + 1);
  const treesTop = map
    .slice(0, row)
    .map((r) => r[col])
    .reverse();
  const treesBottom = map.slice(row + 1).map((r) => r[col]);

  return (
    getViewingDistance(treesLeft) *
    getViewingDistance(treesRight) *
    getViewingDistance(treesTop) *
    getViewingDistance(treesBottom)
  );
};

const doPart1 = (input) => {
  const map = parseMap(input);

  return map
    .flatMap((_r, row) => _r.map((_c, col) => isTreeVisible(map, row, col)))
    .filter((visible) => visible).length;
};

const doPart2 = (input) => {
  const map = parseMap(input);

  return max(
    map.flatMap((_r, row) => _r.map((_c, col) => getScenicScore(map, row, col)))
  );
};

module.exports = {
  doPart1,
  doPart2,
};

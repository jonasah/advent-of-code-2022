const { chunk, sum } = require('lodash');
const getLines = require('../get-lines');

const getAllItems = (input) => {
  return getLines(input).map((l) => l.split(''));
};

const getItemsByCompartment = (input) => {
  return getAllItems(input).map((items) => {
    const compartmentSize = items.length / 2;
    return [items.slice(0, compartmentSize), items.slice(compartmentSize)];
  });
};

const getPriority = (item) => {
  return (
    item.charCodeAt(0) -
    (item >= 'a' && item <= 'z' ? 'a'.charCodeAt(0) - 1 : 'A'.charCodeAt(0) - 27)
  );
};

const doPart1 = (input) => {
  const sharedItems = getItemsByCompartment(input).map(([first, second]) =>
    first.find((i) => second.includes(i))
  );

  return sum(sharedItems.map((item) => getPriority(item)));
};

const doPart2 = (input) => {
  const items = getAllItems(input);

  const groups = chunk(items, 3);

  const commonItems = groups.map(([first, second, third]) =>
    first.find((i) => second.includes(i) && third.includes(i))
  );

  return sum(commonItems.map((item) => getPriority(item)));
};

module.exports = {
  doPart1,
  doPart2,
};

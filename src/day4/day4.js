const getLines = require('../get-lines');

const getSectionPairs = (input) => {
  return getLines(input).map((l) =>
    l.split(',').map((range) => range.split('-').map((id) => parseInt(id, 10)))
  );
};

const doPart1 = (input) => {
  const sectionPairs = getSectionPairs(input);

  const overlappingPairs = sectionPairs.filter(([first, second]) => {
    return (
      (first[0] >= second[0] && first[1] <= second[1]) ||
      (second[0] >= first[0] && second[1] <= first[1])
    );
  });

  return overlappingPairs.length;
};

const doPart2 = (input) => {
  const sectionPairs = getSectionPairs(input);

  const overlappingPairs = sectionPairs.filter(([first, second]) => {
    return (
      (first[0] <= second[0] && first[1] >= second[0]) ||
      (second[0] <= first[0] && second[1] >= first[0])
    );
  });

  return overlappingPairs.length;
};

module.exports = {
  doPart1,
  doPart2,
};

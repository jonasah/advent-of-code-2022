module.exports = (input) => {
  return input
    .trim()
    .split('\n')
    .map((l) => l.trim());
};

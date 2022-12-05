const trim = (string, trimStart) => {
  if (!trimStart) {
    return string.trimEnd();
  }

  return string.trim();
};

module.exports = (input, { trimStart } = { trimStart: true }) => {
  return trim(input, trimStart)
    .split('\n')
    .map((l) => trim(l, trimStart));
};

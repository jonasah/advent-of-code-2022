const getLines = require('../get-lines');

const shapeScoreMap = {
  R: 1,
  P: 2,
  S: 3,
};

const loseScore = 0;
const drawScore = 3;
const winScore = 6;

const calculateTotalScore = (guide) => {
  return guide.reduce((totalScore, [opp, me]) => {
    let resultScore;

    if (opp === me) {
      resultScore = drawScore;
    } else if (
      (me === 'R' && opp === 'S') ||
      (me === 'S' && opp === 'P') ||
      (me === 'P' && opp === 'R')
    ) {
      resultScore = winScore;
    } else {
      resultScore = loseScore;
    }

    return totalScore + shapeScoreMap[me] + resultScore;
  }, 0);
};

const doPart1 = (input) => {
  const shapeMap = {
    A: 'R',
    B: 'P',
    C: 'S',
    X: 'R',
    Y: 'P',
    Z: 'S',
  };

  const guide = getLines(input).map((l) => [shapeMap[l.at(0)], shapeMap[l.at(2)]]);

  return calculateTotalScore(guide);
};

const doPart2 = (input) => {
  const resultMap = {
    Z: 'W',
    X: 'L',
    Y: 'T',
  };

  const shapeMap = {
    A: 'R',
    B: 'P',
    C: 'S',
  };

  const winShapeMap = {
    R: 'P',
    P: 'S',
    S: 'R',
  };
  const loseShapeMap = {
    R: 'S',
    P: 'R',
    S: 'P',
  };

  const guide = getLines(input).map((l) => {
    const opp = shapeMap[l.at(0)];
    const result = resultMap[l.at(2)];
    let me;

    if (result === 'T') {
      me = opp;
    } else if (result === 'W') {
      me = winShapeMap[opp];
    } else {
      me = loseShapeMap[opp];
    }

    return [opp, me];
  });

  return calculateTotalScore(guide);
};

module.exports = {
  doPart1,
  doPart2,
};

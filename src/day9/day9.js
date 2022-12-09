const getLines = require('../get-lines');

const parseMotions = (input) => {
  return getLines(input).flatMap((l) => {
    const [dir, stepsStr] = l.split(' ');
    const steps = parseInt(stepsStr, 10);

    return Array(steps).fill(dir);
  });
};

const doIt = (input, numKnots) => {
  const motions = parseMotions(input);

  const knotPositions = Array(numKnots)
    .fill()
    .map(() => ({ x: 0, y: 0 }));

  const tailPositions = [{ ...knotPositions[knotPositions.length - 1] }];

  motions.forEach((dir) => {
    switch (dir) {
      case 'L':
        knotPositions[0].x -= 1;
        break;
      case 'R':
        knotPositions[0].x += 1;
        break;
      case 'U':
        knotPositions[0].y += 1;
        break;
      case 'D':
        knotPositions[0].y -= 1;
        break;
      default:
        break;
    }

    for (let knot = 1; knot < knotPositions.length; ++knot) {
      const currentKnot = knotPositions[knot];
      const prevKnot = knotPositions[knot - 1];

      const xDist = Math.abs(prevKnot.x - currentKnot.x);
      const yDist = Math.abs(prevKnot.y - currentKnot.y);

      if (xDist <= 1 && yDist <= 1) {
        return;
      }

      currentKnot.x += Math.sign(prevKnot.x - currentKnot.x);
      currentKnot.y += Math.sign(prevKnot.y - currentKnot.y);
    }

    const posExists = tailPositions.some(
      ({ x, y }) =>
        knotPositions[knotPositions.length - 1].x === x &&
        knotPositions[knotPositions.length - 1].y === y
    );

    if (!posExists) {
      tailPositions.push({ ...knotPositions[knotPositions.length - 1] });
    }
  });

  return tailPositions.length;
};

const doPart1 = (input) => {
  return doIt(input, 2);
};

const doPart2 = (input) => {
  return doIt(input, 10);
};

module.exports = {
  doPart1,
  doPart2,
};

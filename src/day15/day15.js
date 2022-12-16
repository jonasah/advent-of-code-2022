const { sum } = require('lodash');
const getLines = require('../get-lines');

const manhattanDistance = (p1, p2) => {
  return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1]);
};

const inputRegex = /^.+x=([\d-]+), y=([\d-]+).+x=([\d-]+), y=([\d-]+)$/;

const parseInput = (input) => {
  return getLines(input)
    .map((l) => {
      const [, xSensor, ySensor, xBeacon, yBeacon] = l.match(inputRegex);
      return [
        [xSensor, ySensor],
        [xBeacon, yBeacon],
      ].map(([x, y]) => [parseInt(x, 10), parseInt(y, 10)]);
    })
    .map(([sensorPos, beaconPos]) => [
      sensorPos,
      beaconPos,
      manhattanDistance(sensorPos, beaconPos),
    ]);
};

const calculateIntervals = (sensorsAndBeacons, xMin, xMax, row) => {
  // find intervals in each row within manhattan distance from all sensors
  const intervals = sensorsAndBeacons
    .map(([sensorPos, , d]) => {
      const yDist = Math.abs(sensorPos[1] - row);

      if (yDist <= d) {
        const coveredTiles = (d - yDist) * 2 + 1;
        const xLeft = sensorPos[0] - Math.floor(coveredTiles / 2);
        const xRight = sensorPos[0] + Math.floor(coveredTiles / 2);

        if (xLeft >= xMin || xRight <= xMax) {
          return [Math.max(xLeft, xMin), Math.min(xRight, xMax)];
        }
      }

      return [];
    })
    .filter((interval) => interval.length > 0);

  // sort by left asc, right desc
  intervals.sort(([l0, r0], [l1, r1]) => (l0 === l1 ? r1 - r0 : l0 - l1));

  // combine overlapping intervals
  return intervals.reduce((acc, curr) => {
    if (acc.length === 0) {
      return [curr];
    }

    const lastInterval = acc[acc.length - 1];

    if (curr[0] <= lastInterval[1]) {
      lastInterval[1] = Math.max(lastInterval[1], curr[1]);
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);
};

const getNumCoveredPositions = (intervals) => {
  return sum(intervals.map(([l, r]) => r - l + 1));
};

const doPart1 = (input, rowToCheck) => {
  const sensorsAndBeacons = parseInput(input);

  const intervals = calculateIntervals(
    sensorsAndBeacons,
    -Infinity,
    Infinity,
    rowToCheck
  );

  const beaconsOnRow = sensorsAndBeacons
    .map(([, beacon]) => beacon)
    .filter(([, y]) => y === rowToCheck)
    .filter(
      (beacon, index, self) =>
        self.findIndex((b) => beacon[0] === b[0] && beacon[1] === b[1]) === index
    );

  return getNumCoveredPositions(intervals, rowToCheck) - beaconsOnRow.length;
};

const doPart2 = (input, xyMax) => {
  const sensorsAndBeacons = parseInput(input);

  for (let row = 0; row <= xyMax; ++row) {
    const intervals = calculateIntervals(sensorsAndBeacons, 0, xyMax, row);

    if (getNumCoveredPositions(intervals, row) === xyMax) {
      const xBeacon = intervals[0][1] + 1;
      const yBeacon = row;

      return xBeacon * 4000000 + yBeacon;
    }
  }

  return 0;
};

module.exports = {
  doPart1,
  doPart2,
};

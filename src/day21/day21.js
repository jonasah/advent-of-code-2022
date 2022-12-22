const getLines = require('../get-lines');

const operations = {
  '+': (l, r) => l + r,
  '-': (l, r) => l - r,
  '*': (l, r) => l * r,
  '/': (l, r) => l / r,
};

const reverseOperationsLeft = {
  '+': (sum, r) => sum - r,
  '-': (diff, r) => diff + r,
  '*': (prod, r) => prod / r,
  '/': (ratio, r) => ratio * r,
};
const reverseOperationsRight = {
  '+': (sum, l) => sum - l,
  '-': (diff, l) => l - diff,
  '*': (prod, l) => prod / l,
  '/': (ratio, l) => l / ratio,
};

const parseJobs = (input) => {
  return Object.fromEntries(
    getLines(input).map((line) => {
      const colonIndex = line.indexOf(':');
      const monkey = line.substring(0, colonIndex);
      const rest = line.substring(colonIndex + 2);

      if (rest.length === 11) {
        const leftMonkey = rest.substring(0, 4);
        const rightMonkey = rest.slice(-4);
        const operation = rest[5];

        return [monkey, [leftMonkey, rightMonkey, operation]];
      }

      return [monkey, parseInt(rest, 10)];
    })
  );
};

const isLeaf = (job) => typeof job === 'number';

const getNumber = (jobs, monkey) => {
  const job = jobs[monkey];

  if (isLeaf(job)) {
    return job;
  }

  const [leftMonkey, rightMonkey, operation] = job;
  return operations[operation](getNumber(jobs, leftMonkey), getNumber(jobs, rightMonkey));
};

const dependsOn = (jobs, monkey, targetMonkey) => {
  if (targetMonkey === monkey) {
    return true;
  }

  const job = jobs[monkey];

  if (isLeaf(job)) {
    return false;
  }

  const [leftMonkey, rightMonkey] = job;
  return (
    dependsOn(jobs, leftMonkey, targetMonkey) ||
    dependsOn(jobs, rightMonkey, targetMonkey)
  );
};

const getNumberReverse = (jobs, monkey, number, targetMonkey) => {
  if (monkey === targetMonkey) {
    return number;
  }

  const [leftMonkey, rightMonkey, operation] = jobs[monkey];

  const leftDependsOnTarget = dependsOn(jobs, leftMonkey, targetMonkey);

  if (leftDependsOnTarget) {
    return getNumberReverse(
      jobs,
      leftMonkey,
      reverseOperationsLeft[operation](number, getNumber(jobs, rightMonkey)),
      targetMonkey
    );
  }

  return getNumberReverse(
    jobs,
    rightMonkey,
    reverseOperationsRight[operation](number, getNumber(jobs, leftMonkey)),
    targetMonkey
  );
};

const doPart1 = (input) => {
  const jobs = parseJobs(input);

  return getNumber(jobs, 'root');
};

const doPart2 = (input) => {
  const jobs = parseJobs(input);

  const [leftMonkey, rightMonkey] = jobs.root;
  const leftDependsOnTarget = dependsOn(jobs, leftMonkey, 'humn');
  const rootNumber = 2 * getNumber(jobs, leftDependsOnTarget ? rightMonkey : leftMonkey);

  return getNumberReverse(jobs, 'root', rootNumber, 'humn');
};

module.exports = {
  doPart1,
  doPart2,
};

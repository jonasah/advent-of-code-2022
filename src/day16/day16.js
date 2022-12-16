const Graph = require('graphology');
const { singleSourceLength } = require('graphology-shortest-path');
const getLines = require('../get-lines');

const inputRegex = /^Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)$/;

const buildGraph = (input) => {
  const valves = getLines(input).map((l) => {
    const [, valve, flowRate, leadsTo] = l.match(inputRegex);
    return [valve, parseInt(flowRate, 10), leadsTo.split(', ')];
  });

  const graph = new Graph({ multi: true, type: 'undirected' });

  valves.forEach(([valve, flowRate]) => {
    graph.addNode(valve, { flowRate });
  });

  valves.forEach(([srcValve, , leadsTo]) => {
    leadsTo.forEach((destValve) => {
      graph.addEdge(srcValve, destValve);
    });
  });

  return graph;
};

const findMaxFlow = (graph, maxTime, t, currentValve, openValves) => {
  const timeLeft = maxTime - t;
  const shortestPaths = singleSourceLength(graph, currentValve);
  const possibleDestinations = Object.entries(shortestPaths)
    .filter(([valve]) => !openValves.includes(valve))
    .map(([valve, d]) => {
      const flowRate = graph.getNodeAttribute(valve, 'flowRate');
      return [valve, (timeLeft - d) * flowRate, d];
    })
    .filter(([, f]) => f > 0)
    .sort(([, f1], [, f2]) => f2 - f1);

  if (possibleDestinations.length === 0) {
    return 0;
  }

  return Math.max(
    ...possibleDestinations.map(
      ([valve, flow, d]) =>
        flow + findMaxFlow(graph, maxTime, t + d + 1, valve, [...openValves, valve])
    )
  );
};

const doPart1 = (input) => {
  return findMaxFlow(buildGraph(input), 30, 1, 'AA', []);
};

const doPart2 = (input) => {};

module.exports = {
  doPart1,
  doPart2,
};

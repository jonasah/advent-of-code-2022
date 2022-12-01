const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');

const { argv } = yargs(hideBin(process.argv)).option('day', {
  type: 'number',
  demandOption: true,
});

const { day } = argv;
const { doPart1, doPart2 } = require(`./day${day}/day${day}.js`);
const input = fs.readFileSync(`src/day${day}/input.txt`, 'utf-8');

const result1 = doPart1(input);
const result2 = doPart2(input);

console.log(`Part 1: ${result1}`);
console.log(`Part 2: ${result2}`);

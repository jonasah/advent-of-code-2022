const fs = require('fs');

module.exports = (day) => fs.readFileSync(`src/day${day}/input.txt`, 'utf-8');

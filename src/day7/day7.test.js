const getInput = require('../get-input');
const { doPart1, doPart2 } = require('./day7');

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const realInput = getInput(7);

describe('day7', () => {
  test('part 1', () => {
    expect(doPart1(testInput)).toBe(95437);
    expect(doPart1(realInput)).toBe(1513699);
  });

  test('part 2', () => {
    expect(doPart2(testInput)).toBe(24933642);
    expect(doPart2(realInput)).toBe(7991939);
  });
});

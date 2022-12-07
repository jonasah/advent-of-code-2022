const { sum, min } = require('lodash');
const getLines = require('../get-lines');

/*
// <path>: [<parentPath>, [<subDirPaths...>], [<files...>]]
{
  /:    [,   [/a, /d], [[b.txt, 14...], [c.dat, 85...]]],
  /a:   [/,  [/a/e],   [[f, 29...], [g, 25..], [h.lst, 62...]]],
  /a/e: [/a, [],       [[i, 584]]],
  /d:   [/,  [],       [[j, 40...], [d.log, 80...], [d.ext, 56...], [k, 72...]]]
}
*/

const parentPathIndex = 0;
const subDirPathsIndex = 1;
const filesIndex = 2;

const getDirPath = (parentPath, dirName) => {
  return `${parentPath === '/' ? '' : parentPath}/${dirName === '/' ? '' : dirName}`;
};

const parseFileSystem = (input) => {
  const terminalOutputLines = getLines(input);

  const fileSystem = {};
  let currentPath = '';

  terminalOutputLines.forEach((l) => {
    const [first, ...rest] = l.split(' ');

    if (first === '$') {
      const [command, args] = rest;

      if (command === 'cd') {
        const nextDir = args;

        if (nextDir === '..') {
          currentPath = fileSystem[currentPath][parentPathIndex];
        } else {
          const nextPath = getDirPath(currentPath, nextDir);

          if (!(nextPath in fileSystem)) {
            fileSystem[nextPath] = [currentPath, [], []];
          }

          currentPath = nextPath;
        }
      }

      // ls is noop
    } else if (first === 'dir') {
      const dirName = rest[0];
      const dirPath = getDirPath(currentPath, dirName);
      fileSystem[currentPath][subDirPathsIndex].push(dirPath);
    } else {
      const fileName = rest[0];
      const fileSize = parseInt(first, 10);
      fileSystem[currentPath][filesIndex].push([fileName, fileSize]);
    }
  });

  return fileSystem;
};

const calculateDirectorySize = (fileSystem, path) => {
  const directory = fileSystem[path];
  const subDirs = directory[subDirPathsIndex];
  const files = directory[filesIndex];

  const totalDirectorySize = sum(
    subDirs.map((p) => calculateDirectorySize(fileSystem, p))
  );
  const totalFileSize = sum(files.map(([, size]) => size));

  return totalDirectorySize + totalFileSize;
};

const doPart1 = (input) => {
  const fileSystem = parseFileSystem(input);

  const dirSizes = Object.keys(fileSystem)
    .map((path) => calculateDirectorySize(fileSystem, path))
    .filter((s) => s <= 100000);

  return sum(dirSizes);
};

const doPart2 = (input) => {
  const totalDiskSpace = 70000000;
  const freeSpaceThreshold = 30000000;

  const fileSystem = parseFileSystem(input);

  const totalUsedSpace = calculateDirectorySize(fileSystem, '/');
  const currentFreeSpace = totalDiskSpace - totalUsedSpace;
  const minimumSpaceToCleanUp = freeSpaceThreshold - currentFreeSpace;

  const possibleDirSizesToCleanUp = Object.keys(fileSystem)
    .map((dir) => calculateDirectorySize(fileSystem, dir))
    .filter((s) => s >= minimumSpaceToCleanUp);

  return min(possibleDirSizesToCleanUp);
};

module.exports = {
  doPart1,
  doPart2,
};

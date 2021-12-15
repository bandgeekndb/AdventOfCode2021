const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(row => row.split('-'));

const testInput = fs
    .readFileSync(path.join(__dirname, './testInput.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(row => row.split('-'));


let answerPart1 = 0;
let answerPart2 = 0;

const connections = [];

const addConnection = (from, to) => {
  if (connections[from] == undefined)
    connections[from] = [to];
  else
    connections[from].push(to);
}

const isUpperCased = string => string.toUpperCase() == string;

const isValidPath = path => {
  let howManyDuplicates = 0;
  const sortedPath = path.filter(a => !isUpperCased(a) && a != 'start' && a != 'end').sort();
  if (sortedPath.length <= 2)
      return true;
  for (let i = 1; i < sortedPath.length; i++) {
      if (sortedPath[i - 1] == sortedPath[i])
          howManyDuplicates++;
  }
  return howManyDuplicates <= 1
};

// Part 1

input.forEach(line => {
  addConnection(line[0], line[1]);
  addConnection(line[1], line[0]);
});

const toExplore = [['start']];
const paths = [];

while (toExplore.length > 0) {
  const currPath = toExplore.pop();
  const currLastPlace = currPath[currPath.length - 1];

  if (currLastPlace == 'end') {
    paths.push(currPath);
    continue;
  }

  connections[currLastPlace].forEach(neighbor => {
    if (neighbor == 'start')
      return;
    if (!isUpperCased(neighbor) && currPath.includes(neighbor))
      return;
    
    toExplore.push([...currPath, neighbor]);
  });
}

answerPart1 = paths.length;

// Part 2

input.forEach(line => {
  addConnection(line[0], line[1]);
  addConnection(line[1], line[0]);
});

const toExplore = [['start']];
const paths = [];

while (toExplore.length > 0) {
  const currPath = toExplore.pop();
  const currLastPlace = currPath[currPath.length - 1];

  if (currLastPlace == 'end') {
    paths.push(currPath);
    continue;
  }

  connections[currLastPlace].forEach(neighbor => {
    if (neighbor == 'start')
      return;
    
    const possiblePath = [...currPath, neighbor];
    
    if (isValidPath(possiblePath))
      toExplore.push([...currPath, neighbor]);
  });
}

answerPart2 = paths.length;


console.log('Answer part 1:', answerPart1);
console.log('Answer part 2:', answerPart2);
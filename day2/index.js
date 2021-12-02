const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n');

const testInput = fs
    .readFileSync(path.join(__dirname, './testInput.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n');

// Part 1
let answerPart1 = 0;

let directions = input.map(direction => direction.split(' '));

let x = 0;
let y = 0;

directions.forEach(directionPair => {
  if (directionPair[0] == 'forward') {
    x += + directionPair[1];
  }

  if (directionPair[0] == 'down') {
    y += + directionPair[1];
  }

  if (directionPair[0] == 'up') {
    y -= + directionPair[1];
  }
});

answerPart1 = x*y;

console.log('Answer part 1:', answerPart1);


// Part 2
let answerPart2 = 0;

directions = input.map(direction => direction.split(' '));

x = 0;
y = 0;
aim = 0;

directions.forEach(directionPair => {
  if (directionPair[0] == 'forward') {
    x += + directionPair[1];
    y += aim * + directionPair[1];
  }

  if (directionPair[0] == 'down') {
    aim += + directionPair[1];
  }

  if (directionPair[0] == 'up') {
    aim -= + directionPair[1];
  }
});

answerPart2 = x*y;

console.log('Answer part 2:', answerPart2);
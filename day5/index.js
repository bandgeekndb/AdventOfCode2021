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

// Split pairs on the -> characters
let allLines = input
  .map(lineString => lineString.split(' -> '))
  .map(pairArray => {
    return pairArray.map(pointString => pointString.split(','))
  })
  .map(pairArray => {
    return pairArray.map(pointArray => [parseInt(pointArray[0]), parseInt(pointArray[1])])
  });


// Part 1
let answerPart1 = 0;

// Keep only horizontal or vertical lines (x1 = x2 OR y1 = y2)
let lines = allLines.filter(pairArray => {
  if (pairArray[0][0] == pairArray[1][0] || pairArray[0][1] == pairArray[1][1]) {
    return true;
  }
});

let points = new Set();
let overlaps = new Set();

for (let line of lines) {
  let x1 = line[0][0],
      y1 = line[0][1],
      x2 = line[1][0],
      y2 = line[1][1];

  //Horizontal lines
  if (y1 == y2) {
    let length = Math.abs(x1 - x2);
    let start = x1 < x2 ? x1 : x2;

    for (var i = 0; i <= length; i++) {
      let point = `${start+i},${y1}`;

      if (points.has(point)) {
        overlaps.add(point);
      } else {
        points.add(point);
      }
      
    }
  }

  //Vertical lines
  if (x1 == x2) {
    let length = Math.abs(y1 - y2);
    let start = y1 < y2 ? y1 : y2;

    for (var i = 0; i <= length; i++) {
      let point = `${x1},${start+i}`;

      if (points.has(point)) {
        overlaps.add(point);
      } else {
        points.add(point);
      }
      
    }
  }
}

answerPart1 = overlaps.size;

console.log('Answer part 1:', answerPart1);


// Part 2
let answerPart2 = 0;

points = new Set();
overlaps = new Set();

// Don't filter out diagonal lines, ensure you use allLines variable
for (let line of allLines) {
  let x1 = line[0][0],
      y1 = line[0][1],
      x2 = line[1][0],
      y2 = line[1][1];

  //Horizontal lines
  if (y1 == y2) {
    let length = Math.abs(x1 - x2);
    let start = x1 < x2 ? x1 : x2;

    for (var i = 0; i <= length; i++) {
      let point = `${start+i},${y1}`;

      if (points.has(point)) {
        overlaps.add(point);
      } else {
        points.add(point);
      }
      
    }
  }

  //Vertical lines
  if (x1 == x2) {
    let length = Math.abs(y1 - y2);
    let start = y1 < y2 ? y1 : y2;

    for (var i = 0; i <= length; i++) {
      let point = `${x1},${start+i}`;

      if (points.has(point)) {
        overlaps.add(point);
      } else {
        points.add(point);
      }
      
    }
  }

  //Diagonal lines
  if (Math.abs(x1 - x2) / Math.abs(y1 - y2) == 1) {

    let diffx = x2 - x1;
    let diffy = y2 - y1;

    let length = Math.abs(diffx);

    for (var i = 0; i <= length; i++) {
      let newX = diffx > 0 ? x1 + i : x1 - i;
      let newY = diffy > 0 ? y1 + i : y1 - i;
      let point = `${newX},${newY}`

      if (points.has(point)) {
        overlaps.add(point);
      } else {
        points.add(point);
      }
    }

  }
}

answerPart2 = overlaps.size;

console.log('Answer part 2:', answerPart2);

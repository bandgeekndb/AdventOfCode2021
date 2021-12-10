const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(row => row.split(''))
    .map(row => row.map(num => parseInt(num)));

const testInput = fs
    .readFileSync(path.join(__dirname, './testInput.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(row => row.split(''))
    .map(row => row.map(num => parseInt(num)));

//console.table(testInput);

// Check surroundings function
function checkSurroundings(x,y) {
  let upHigher = false,
      downHigher = false,
      leftHigher = false,
      rightHigher = false;
  
  // UP (y-1)
  if (y-1 >= 0) {
    if (points[y][x] < points[y-1][x]) {
      upHigher = true;
    }
  } else {
    upHigher = null;
  }

  // DOWN (y+1)
  if (y+1 < points.length) {
    if (points[y][x] < points[y+1][x]) {
      downHigher = true;
    }
  } else {
    downHigher = null;
  }

  // LEFT (x-1)
  if (x-1 >= 0) {
    if (points[y][x] < points[y][x-1]) {
      leftHigher = true;
    }
  } else {
    leftHigher = null;
  }

  // RIGHT (x+1)
  if (x+1 < points[y].length) {
    if (points[y][x] < points[y][x+1]) {
      rightHigher = true;
    }
  } else {
    rightHigher = null;
  }

  //console.log("Up: %s, Down: %s, Left: %s, Right: %s", upHigher, downHigher, leftHigher, rightHigher);

  if ((upHigher == null || upHigher) && (downHigher == null || downHigher) && (leftHigher == null || leftHigher) && (rightHigher == null || rightHigher)) {
    return true;
  } else {
    return false;
  }
}

function getBasinSize(array, coordinate, basinSet = new Set([coordinate])) {
  const [x, y] = coordinate.split('-').map(string => +string);
  const adjacentBasin = [];
  const top = x + '-' + (y - 1);
  const left = (x - 1) + '-' + y;
  const right = (x + 1) + '-' + y;
  const bottom = x + '-' + (y + 1);
  if (array[y - 1] !== undefined && array[y - 1][x] !== 9 && !basinSet.has(top)) {
    adjacentBasin.push(top);
    basinSet.add(top);
  }
  if (array[y][x - 1] !== undefined && array[y][x - 1] !== 9 && !basinSet.has(left)) {
    adjacentBasin.push(left);
    basinSet.add(left);
  }
  if (array[y][x + 1] !== undefined && array[y][x + 1] !== 9 && !basinSet.has(right)) {
    adjacentBasin.push(right);
    basinSet.add(right);
  }
  if (array[y + 1] !== undefined && array[y + 1][x] !== 9 && !basinSet.has(bottom)) {
    adjacentBasin.push(bottom);
    basinSet.add(bottom);
  }
  adjacentBasin.forEach(newCoordinate => getBasinSize(array, newCoordinate, basinSet));
  return basinSet.size;
}


let answerPart1 = 0;
let answerPart2 = 0;

let points = [...input];
let lowPoints = [];
let lowPointsRiskLevel = 0;

// Part 1
for (let y = 0; y < points.length; y++) {
  for (let x = 0; x < points[y].length; x++) {
    //console.log("Checking (%d,%d)", x, y);
    if (checkSurroundings(x,y)) {
      lowPoints.push(x + '-' + y);
      lowPointsRiskLevel += (points[y][x] + 1);
    }
  }
}

answerPart1 = lowPointsRiskLevel;

// Part 2

const basinsizesArray = lowPoints.map(coordinate => getBasinSize(points, coordinate));
basinsizesArray.sort((a, b) => b - a);
answerPart2 = basinsizesArray[0] * basinsizesArray[1] * basinsizesArray[2];

console.log('Answer part 1:', answerPart1);
console.log('Answer part 2:', answerPart2);

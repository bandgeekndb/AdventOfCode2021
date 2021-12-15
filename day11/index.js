const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(row => row.split(''))
    .map(rowArray => rowArray.map(num => parseInt(num)));

const testInput = fs
    .readFileSync(path.join(__dirname, './testInput.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(row => row.split(''))
    .map(rowArray => rowArray.map(num => parseInt(num)));

let answerPart1 = 0;
let answerPart2 = 0;

let octopuses = [...input];
let rows = octopuses.length
let columns = octopuses[0].length;

function increaseOctopusesEnergy(octopusesArr, octopusesFlashing) {
  for (let row in octopusesArr) {
    for (let column in octopusesArr[row]) {
      octopusesArr[row][column]++;

      if (octopusesArr[row][column] > 9) {
        octopusesFlashing.add(`${row}-${column}`);
      }
    }
  }
}

function flashOctopus(row, col, octopusesArr, octopusesFlashing) {
  for (let y = row-1; y <= row+1; y++) {
    for (let x = col-1; x<= col+1; x++) {
      if (y >= 0 && y < rows && x >= 0 && x < columns) {
        if (y == row && x == col) {
          //console.log("Skipping original point (%d,%d)", row, col);
        } else {
          //console.log("Increasing (%d,%d)", y, x);
          octopusesArr[y][x]++;
  
          if (octopuses[y][x] > 9) {
            //console.log("OVERFLOW: Adding (%d,%d) to flashing set", y, x);
            octopusesFlashing.add(`${y}-${x}`);
          }
        }
      }
    }
  }
}

// Part 1

/*let steps = 100;
let totalOctopusesFlashed = 0;

for (let i = 0; i < steps; i++) {
  let octopusesFlashing = new Set();

  // Increase all octopuses energy by 1
  increaseOctopusesEnergy(octopuses, octopusesFlashing);

  // If any are >9, they flash, having side effects and further flashes
  octopusesFlashing.forEach(coordinates => {
    coordinateArray = coordinates.split('-').map(num => parseInt(num));

    flashOctopus(coordinateArray[0], coordinateArray[1], octopuses, octopusesFlashing);
  });

  // All flashed octopuses go to 0
  octopusesFlashing.forEach(coordinates => {
    coordinateArray = coordinates.split('-');

    octopuses[coordinateArray[0]][coordinateArray[1]] = 0;
  });

  totalOctopusesFlashed += octopusesFlashing.size;
}

answerPart1 = totalOctopusesFlashed;*/


// Part 2
let step = 0;
let octopusesPart2 = [...input];
totalOctopusesFlashed = 0;

while (true) {
  step++;

  let octopusesFlashing = new Set();

  // Increase all octopuses energy by 1
  increaseOctopusesEnergy(octopusesPart2, octopusesFlashing);

  // If any are >9, they flash, having side effects and further flashes
  octopusesFlashing.forEach(coordinates => {
    coordinateArray = coordinates.split('-').map(num => parseInt(num));

    flashOctopus(coordinateArray[0], coordinateArray[1], octopusesPart2, octopusesFlashing);
  });

  // All flashed octopuses go to 0
  octopusesFlashing.forEach(coordinates => {
    coordinateArray = coordinates.split('-');

    octopusesPart2[coordinateArray[0]][coordinateArray[1]] = 0;
  });

  if(octopusesFlashing.size == (rows * columns)) {
    answerPart2 = step;
    break;
  }

  totalOctopusesFlashed += octopusesFlashing.size;
}

console.log('Answer part 1:', answerPart1);
console.log('Answer part 2:', answerPart2);
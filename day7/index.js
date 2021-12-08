const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .toString()
    .trim()
    .split(',')
    .map(num => parseInt(num));

const testInput = fs
    .readFileSync(path.join(__dirname, './testInput.txt'), 'utf8')
    .toString()
    .trim()
    .split(',')
    .map(num => parseInt(num));


let answerPart1 = 0;
let answerPart2 = 0;

let crabs = [...input];
let crabFuelCostPart1 = [];
let crabFuelCostPart2 = [];

// find max
let max = crabs.reduce((acc, curr) => acc > curr ? acc : curr);

// loop array from 0 to max
for (let i = 0; i <= max; i++) {
  crabFuelCostPart1[i] = 0;
  crabFuelCostPart2[i] = 0;

  for (let x = 0; x < crabs.length; x++) {
    let diff = Math.abs(crabs[x] - i);

    let fuelCost = (diff * (diff+1)) / 2;
    //n(n+1)/2.

    crabFuelCostPart1[i] += diff;
    crabFuelCostPart2[i] += fuelCost;
  }
}

answerPart1 = crabFuelCostPart1.reduce((acc, curr) => acc < curr ? acc : curr);
answerPart2 = crabFuelCostPart2.reduce((acc, curr) => acc < curr ? acc : curr);

console.log('Answer part 1:', answerPart1);
console.log('Answer part 2:', answerPart2);

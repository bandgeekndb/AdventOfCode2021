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

// Only works for part 1, damn array overflow...
function simulateFish(fishes, days) {
  for (let day = 1; day <= days; day++) {
    let newFish = [];
  
    for(let i = 0; i < fishes.length; i++) {
      if (fishes[i] == 0) {
        newFish.push(8);
        fishes[i] = 6;
      } else {
        fishes[i]--;
      }
    }
  
    fishes = fishes.concat(newFish);
  }

  return fishes.length;
}

// Part 1
let answerPart1 = 0;

answerPart1 = simulateFish([...input], 80);

console.log('Answer part 1:', answerPart1);


// Part 2
let answerPart2 = 0;

let fishAges = [];
let days = 256;

for(let i = 0; i < 9; i++) {
  fishAges[i] = 0;
}

input.forEach(fishAge => fishAges[fishAge]++);

for (let day = 1; day <= days; day++) {
  let tempZero = fishAges[0];

  for (let i = 0; i < 8; i++) {
    fishAges[i] = fishAges[i+1];
  }

  fishAges[8] = tempZero;
  fishAges[6] += tempZero;
}

answerPart2 = fishAges.reduce((accu, curr) => accu + curr);

console.log('Answer part 2:', answerPart2);

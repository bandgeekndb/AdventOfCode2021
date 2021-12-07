const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(Number);

let answerPart1 = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i+1] - input[i] > 0) {
    answerPart1++;
  }
}
console.log('Answer part 1:', answerPart1);

/* Part 2 */
let answerPart2 = 0;

for (let i = 0; i < input.length - 2; i++) {
  let slidingWindow1 = input[i] + input[i+1] + input[i+2];
  let slidingWindow2 = input[i+1] + input[i+2] + input[i+3];

  if (slidingWindow2 - slidingWindow1 > 0) { answerPart2++; }
}

console.log('Answer part 2:', answerPart2);
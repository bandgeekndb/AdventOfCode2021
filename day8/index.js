const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(row => row.split(' | '))
    .map(rowArray => {
      return {
        signalPatterns: rowArray[0].split(' '),
        outputValue: rowArray[1].split(' '),
      }
    });

const testInput = fs
    .readFileSync(path.join(__dirname, './testInput.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n')
    .map(row => row.split(' | '))
    .map(rowArray => {
      return {
        signalPatterns: rowArray[0].split(' '),
        outputValue: rowArray[1].split(' '),
      }
    });


function isSuperset (set, subset) {
  for (let elem of subset) {
      if (!set.has(elem)) {
          return false
      }
  }
  return true
}


let answerPart1 = 0;
let answerPart2 = 0;

let signals = [...input];

// Part 1
let easyDigits = 0;

signals.forEach(signal => {
  signal.outputValue.forEach(digit => {
    if (digit.length == 2 || digit.length == 3 || digit.length == 4 || digit.length == 7) {
      easyDigits++;
    }
  });
});

answerPart1 = easyDigits;

// Part 2
let outputValues = [];

signals.forEach(signal => {
  let solvedDigits = Array(10).fill(new Set());
  let _069 = [];
  let _235 = [];

  signal.signalPatterns.forEach(digit => {
    switch (digit.length) {
      case 2:
        solvedDigits[1] = new Set(digit.split(""));
        break;
      case 3:
        solvedDigits[7] = new Set(digit.split(""));
        break;
      case 4:
        solvedDigits[4] = new Set(digit.split(""));
        break;
      case 7:
        solvedDigits[8] = new Set(digit.split(""));
        break;
      case 5:
        _235.push(new Set(digit.split("")));
        break;
      case 6:
        _069.push(new Set(digit.split("")));
        break;
    }
  });

  // Solve for remaining numbers

  //6
  for (let i = 0; i < 3; i++) {
    if (!isSuperset(_069[i], solvedDigits[7])) {
      solvedDigits[6] = _069[i]
      _069.splice(i, 1)
      break;
    }
  }

  // 0
  for (let i = 0; i < 2; i++) {
    if (!isSuperset(_069[i], solvedDigits[4])) {
      solvedDigits[0] = _069[i]
      _069.splice(i, 1)
      break;
    }
  }
  solvedDigits[9] = _069[0]

  // 5
  for (let i = 0; i < 3; i++) {
    if (isSuperset(solvedDigits[6], _235[i])) {
      solvedDigits[5] = _235[i]
      _235.splice(i, 1)
      break;
    }
  }

  // 3
  for (let i = 0; i < 2; i++) {
    if (isSuperset(solvedDigits[9], _235[i])) {
      solvedDigits[3] = _235[i]
      _235.splice(i, 1)
      break;
    }
  }
  solvedDigits[2] = _235[0]

  calculatedOutputValue = [];

  // Solve the output values now

  for(let index in signal.outputValue) {
    for(let solvedDigitIndex in solvedDigits) {
      if (isSuperset(solvedDigits[solvedDigitIndex], new Set(signal.outputValue[index])) && isSuperset(new Set(signal.outputValue[index]), solvedDigits[solvedDigitIndex])) {
        calculatedOutputValue.push(solvedDigitIndex);
      }
    }
  }

  outputValues.push(parseInt(calculatedOutputValue.join('')));

})

answerPart2 = outputValues.reduce((acc, curr) => acc + curr);

console.log('Answer part 1:', answerPart1);
console.log('Answer part 2:', answerPart2);

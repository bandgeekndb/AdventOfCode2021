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

function scoreCompletionStrings(completionString) {
  let score = 0;

  for(let i = 0; i < completionString.length; i++) {
    score = score * 5;
    score += completionScoreTable[completionString[i]];
  }

  return score;
}


let answerPart1 = 0;
let answerPart2 = 0;

let navSubsystem = [...input];

let openCharRegex = /[\(\[\{\<]{1}/;

let errorScoreTable = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

let completionScoreTable = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

let incompleteRows = [];
let corruptRows = [];

// Part 1

let corruptChars = [];

navSubsystem.forEach(row => {
  let rowArray = row.split('');
  let rowStatus = '';
  let openChars = [];

  rowArray.forEach(char => {
    if (char.match(openCharRegex)) {
      openChars.push(char);
    } else {
      let lastOpenChar = openChars.pop();

      switch (char) {
        case ')':
          if (lastOpenChar != '(') {
            corruptChars.push(char);
            rowStatus = 'corrupt';
          }

          break;
        case ']':
          if (lastOpenChar != '[') {
            corruptChars.push(char);
            rowStatus = 'corrupt';
          }

          break;

        case '}':
          if (lastOpenChar != '{') {
            corruptChars.push(char);
            rowStatus = 'corrupt';
          }

          break;

        case '>':
          if (lastOpenChar != '<') {
            corruptChars.push(char);
            rowStatus = 'corrupt';
          }

          break;
      }
    }

    
  });

  if (rowStatus == 'corrupt') {
    corruptRows.push(row);
  } else {
    incompleteRows.push(row);
  }
});

answerPart1 = corruptChars.map(char => errorScoreTable[char]).reduce((acc, curr) => acc + curr);

// Part 2

let completionStrings = [];

incompleteRows.forEach(row => {
  let rowArray = row.split('');

  let openChars = [];

  rowArray.forEach(char => {
    if (char.match(openCharRegex)) {
      openChars.push(char);
    } else {
      openChars.pop();
    }
  });

  let completionString = '';

  for (let i = openChars.length -1; i >= 0; i--) {
    let lastOpenChar = openChars[i];

    switch (lastOpenChar) {
      case '(':
        completionString += ')';

        break;
      case '[':
        completionString += ']';

        break;

      case '{':
        completionString += '}';

        break;

      case '<':
        completionString += '>';

        break;
    }
  }

  completionStrings.push(completionString);
});

completionStringScores = completionStrings.map(string => scoreCompletionStrings(string));

answerPart2 = [...completionStringScores].sort((a,b) => a - b)[Math.round((completionStringScores.length -1) / 2)];

console.log('Answer part 1:', answerPart1);
console.log('Answer part 2:', answerPart2);
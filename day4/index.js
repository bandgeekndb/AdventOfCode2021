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

let numbersCalled = [];
let boardsRaw = [];
let boards = [];
let board = {
  winning: false,
  grid: [],
};

//numbersCalled = testInput[0].split(',').map(number => parseInt(number));
numbersCalled = input[0].split(',').map(number => parseInt(number));
//boardsRaw = testInput.slice(2).filter(rowString => rowString != '');
boardsRaw = input.slice(2).filter(rowString => rowString != '');

for (var i=0; i < boardsRaw.length; i++) {
  let row = i % 5;
  
  board.grid[row] = [
    parseInt(boardsRaw[i].slice(0,2)),
    parseInt(boardsRaw[i].slice(3,5)),
    parseInt(boardsRaw[i].slice(6,8)),
    parseInt(boardsRaw[i].slice(9,11)),
    parseInt(boardsRaw[i].slice(12,14)),
  ];

  if (row == 4) {
    boards.push(board);
    board = {
      winning: false,
      grid: [],
    };
  }
}

function markBoards(numberCalled) {
  boards.forEach(board => {
    board.grid.forEach(row => {
      for (var i = 0; i < 5; i++) {
        if (row[i] == numberCalled) {
          row[i] = '*';
        }
      }
    })
  });
}

function checkBoards() {
  boards.forEach(board => {
    // Check each row
    for (var x = 0; x < 5; x++) {
      if (board.grid[x][0] == board.grid[x][1] && board.grid[x][0] == board.grid[x][2] && board.grid[x][0] == board.grid[x][3] && board.grid[x][0] == board.grid[x][4]) {
        board.winning = true;
      }
    }

    // Check each column
    for (var y = 0; y < 5; y++) {
      if (board.grid[0][y] == board.grid[1][y] && board.grid[0][y] == board.grid[2][y] && board.grid[0][y] == board.grid[3][y] && board.grid[0][y] == board.grid[4][y]) {
        board.winning = true;
      }
    }
  });
}

function calculateBoardScore(board, winningNumber) {
  // Board score = sum of all unmarked numbers * current number called
  let unmarkedNumbers = [];

  unmarkedNumbers = board.grid[0].concat(board.grid[1], board.grid[2], board.grid[3], board.grid[4]).filter(val => val !== '*').reduce((previousValue, currentValue) => previousValue + currentValue);

  return unmarkedNumbers * winningNumber;
}


// Part 1
let answerPart1 = 0;

for (let number of numbersCalled) {
  markBoards(number);
  checkBoards();

  let winningBoards = boards.filter(board => board.winning == true);

  if (winningBoards.length == 1) {
    // First board!
    answerPart1 = calculateBoardScore(winningBoards[0], number);
    break;
  }
}

console.log('Answer part 1:', answerPart1);


// Part 2
let answerPart2 = 0;
let finalBoard = {};

for (let number of numbersCalled) {
  markBoards(number);
  checkBoards();

  let nonWinningBoards = boards.filter(board => board.winning == false);

  if (nonWinningBoards.length == 1) {
    // Last board!
    finalBoard = nonWinningBoards[0];
  }

  if (nonWinningBoards.length == 0) {
    answerPart2 = calculateBoardScore(finalBoard, number);
    break;
  }
}

console.log('Answer part 2:', answerPart2);
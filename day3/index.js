const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n');

// prod input is 12 digits long

const testInput = fs
    .readFileSync(path.join(__dirname, './testInput.txt'), 'utf8')
    .toString()
    .trim()
    .split('\r\n');

function modeArray(array) {
  if (array.length == 0) return null;
  var modeMap = {},
    maxCount = 1,
    modes = [];

  for (var i = 0; i < array.length; i++) {
    var el = array[i];

    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;

    if (modeMap[el] > maxCount) {
      modes = [el];
      maxCount = modeMap[el];
    } else if (modeMap[el] == maxCount) {
      modes.push(el);
      maxCount = modeMap[el];
    }
  }
  return modes;
}

// Part 1
let answerPart1 = 0;

let gammaRateBinary = [];
let gammaRate = 0;

let epsilonRateBinary = [];
let epsilonRate = 0;

for(let x = 0; x < input[0].length; x++) {
  let zeroCount = 0;
  let oneCount = 0;

  input.forEach(row => {
    if (row[x] == 0) { zeroCount++ }
    if (row[x] == 1) { oneCount++ }
  });

  if (zeroCount > oneCount) {
    gammaRateBinary[x] = 0;
    epsilonRateBinary[x] = 1;
  } else {
    gammaRateBinary[x] = 1;
    epsilonRateBinary[x] = 0;
  }
}

gammaRate = parseInt(gammaRateBinary.join(""), 2);
epsilonRate = parseInt(epsilonRateBinary.join(""), 2);

answerPart1 = gammaRate * epsilonRate;

console.log('Answer part 1:', answerPart1);


// Part 2
let answerPart2 = 0;

let oxygenGenRating = '';
let co2ScrubberRating = '';

let diagReport = input;

for(let x = 0; x < diagReport[0].length; x++) {
  let columnArray = [];
  let filteredDiagReport = [];

  if (diagReport.length == 1) {
    oxygenGenRating = diagReport[0];
    break;
  }
  
  diagReport.forEach(row => {
    columnArray.push(row[x]);
  });

  let mode = modeArray(columnArray);
  let mostFreq = 0;
  let leastFreq = 0;

  if(mode.length == 1) {
    mostFreq = mode[0];

    if (mostFreq == 0) { leastFreq = 1; } else { leastFreq = 0; }
  } else {
    mostFreq = 1;
    leastFreq = 0;
  }

  diagReport.forEach(row => {
    if (row[x] == mostFreq) { filteredDiagReport.push(row) }
  });

  if (filteredDiagReport.length == 1) {
    oxygenGenRating = filteredDiagReport[0];
    break;
  } else {
    diagReport = filteredDiagReport;
  }
}

diagReport = input;

for(let x = 0; x < diagReport[0].length; x++) {
  let columnArray = [];
  let filteredDiagReport = [];

  if (diagReport.length == 1) {
    oxygenGenRating = diagReport[0];
    break;
  }
  
  diagReport.forEach(row => {
    columnArray.push(row[x]);
  });

  let mode = modeArray(columnArray);
  let mostFreq = 0;
  let leastFreq = 0;

  if(mode.length == 1) {
    mostFreq = mode[0];

    if (mostFreq == 0) { leastFreq = 1; } else { leastFreq = 0; }
  } else {
    mostFreq = 1;
    leastFreq = 0;
  }

  diagReport.forEach(row => {
    if (row[x] == leastFreq) { filteredDiagReport.push(row) }
  });

  if (filteredDiagReport.length == 1) {
    co2ScrubberRating = filteredDiagReport[0];
    break;
  } else {
    diagReport = filteredDiagReport;
  }
}

answerPart2 = parseInt(oxygenGenRating,2) * parseInt(co2ScrubberRating,2);

console.log('Answer part 2:', answerPart2);
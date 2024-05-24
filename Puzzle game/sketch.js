//Omar Shams 
//Puzzle game
// 5/24/2024
//finally done

//defining variables
const NUM_ROWS = 4;
const NUM_COLS = 5;
const SQUARE_SIZE = 100;

//creates the grid ,and other variables
let grid = [];
let clickCount = 0;
let state = "cross";
let currentRow, currentCol;


function setup() {
  createCanvas(NUM_COLS * SQUARE_SIZE, NUM_ROWS * SQUARE_SIZE);
  //adds rows and columns to the array making the grid
  initializeGrid();
}

function draw() {
  background(220);
  Activesquare();
  drawGrid();
  winCondition();
  highlight(currentCol, currentRow);
}

function initializeGrid() {
  for (let y = 0; y < NUM_ROWS; y++) {
    let row = [];
    for (let x = 0; x < NUM_COLS; x++) {
      row.push(randomizer());
    }
    grid.push(row);
  }
}

//makes a value for black and white squares
function randomizer() {
  return Math.round(Math.random()) * 255;
}

//when the mouse is pressed if the spacebar has been pressed makes a square change otherwise flips a cross
function mousePressed() {
  if (keyIsPressed && keyCode === SHIFT) {
    flip(currentCol, currentRow);
  } else {
    if (state === "cross") {
      flipCross(currentCol, currentRow);
    } else {
      flipSquare(currentCol, currentRow);
    }
  }
  
}
//what the flip is
function flip(x, y) {
  if (x >= 0 && x < NUM_COLS && y >= 0 && y < NUM_ROWS) {
    grid[y][x] = grid[y][x] === 0 ? 255 : 0; // this type of code is used alot in the project it essentially checks a value and returns a
                                             // a value depending if it is true or not
  }
}
//if cross is the state flips in a cross shape
function flipCross(col, row) {
  flip(col, row);
  flip(col - 1, row);
  flip(col + 1, row);
  flip(col, row - 1);
  flip(col, row + 1);
}
//same but with square
function flipSquare(col, row) {
  flip(col, row);
  flip(col + 1, row);
  flip(col, row + 1);
  flip(col + 1, row + 1);
}
// Highlights the squares to switch
function highlight(col, row) {
  fill(144, 238, 144, 120);
  if (state === "cross") {
    HG(col, row);
    HG(col - 1, row);
    HG(col + 1, row);
    HG(col, row - 1);
    HG(col, row + 1);
  } else {
    HG(col, row);
    HG(col, row + 1);
    HG(col + 1, row);
    HG(col + 1, row + 1);
  }
}

//HG is what highlights the grid creating the translucent square or cross in green
function HG(col, row) {
  if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
    rect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
  }
}

function Activesquare() {
  currentCol = int(mouseX / SQUARE_SIZE);
  currentRow = int(mouseY / SQUARE_SIZE);
}
//creates the grid
function drawGrid() {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      fill(grid[y][x]);
      rect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
    }
  }
}

//checks if all the values in the array are the same and places text to signify end
function winCondition() {
  let firstValue = grid[0][0];
  let allValuesSame = true;
  
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (grid[y][x] !== firstValue) {
        allValuesSame = false;
        break;
      }
    }
    if (!allValuesSame) break;
  }

  if (allValuesSame) {
    textSize(32);
    fill(firstValue === 255 ? 0 : 255);
    textAlign(CENTER, CENTER);
    text("YOU WIN!", width / 2, height / 2);
  }
}

//when space is pressed change state
function keyPressed() {
  if (keyCode === 32) {
    state = (state === "cross") ? "square" : "cross";
  }
}


// Puzzle Game Starter
// Mr. Scott
// April 23, 2024

let grid =
[ [0,    255,    0,  255,   0],
  [0,      0,  255,    0,   0],
  [0,    255,  255,    0,  255],
  [255,  255,    0,  255,  255]
];

let squareSize = 50;
const NUM_ROWS = 4; const NUM_COLS = 5;

let row, col;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
}

function draw() {
  col = getCurrentX();
  row = getCurrentY();  print(col, row);
  background(220);
  drawGrid();
}

function mousePressed(){
  flip(col, row);
}

function flip(x,y){
  if(grid[y][x]===0) grid[y][x]=255;
  else grid[y][x] = 0;
}

function getCurrentY(){
  //determine current row of mouse, and return
  let constrainY = constrain(mouseY, 0, height-1);
  return int(constrainY/squareSize);
}

function getCurrentX(){
  //determine the current column of the mouse, and return
  let constrainX = constrain(mouseX, 0, width-1);
  return int(constrainX/squareSize);
}

function drawGrid(){
  // Read data from our 2D Array (grid), and use the 
  // numbers there to set the color for squares which are
  // arranged in a grid fashion.
  for(let y = 0; y<NUM_ROWS; y++){
    for(let x = 0; x<NUM_COLS; x++){
      let fillValue = grid[y][x];
      fill(fillValue);
      //             x:   0 ,   1,     2,    3,     4  
      //squareSize*x:     0     50    100    150    200
      square(x*squareSize, y*squareSize, squareSize);
    }  
  }
}
//puzzle game 
//Omar shams

let countCorrect = 20;
let grid =
[ [randoizer(), randoizer(), randoizer(),randoizer(), randoizer()],
  [randoizer(), randoizer(), randoizer(),randoizer(), randoizer()],
  [randoizer(), randoizer(), randoizer(),randoizer(), randoizer()],
  [randoizer(), randoizer(), randoizer(),randoizer(), randoizer()]
];

let squareSize = 100;
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
  winc();
  highlight(col,row);
}

function randoizer(){
  let ran = (Math.round(Math.random(1,0)));
  if (ran === 1){
    return 255;
  }
  else{
    return 0;
  }
}




function mousePressed(){
  if (keyIsPressed && keyCode == SHIFT){
    flip(col, row);
  } 
  else{
  flip(col, row);

  flip(col+1, row);
  flip(col-1, row);
  if (row < 3){
    flip(col, row+1);
  }
  if (row > 0){
    flip(col, row-1);
  }
}
}
function flip(x,y){
  if(grid[y][x]===0) grid[y][x]=255;
  else grid[y][x] = 0;
}

function highlight(){
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if(gird[x] === mouseX && grid[y] === mouseY){
      fill(0,255,0,100);
    rect(col,row,100);
      }     
  }
}
}

function winc(){
    let allValuesSame = true;
    let firstValue = grid[0][0];
    
    for (let y = 0; y < NUM_ROWS; y++) {
      for (let x = 0; x < NUM_COLS; x++) {
        let fillValue = grid[y][x];
        console.log(`grid[${y}][${x}] = ${fillValue}`);
        fill(fillValue);
        square(x * squareSize, y * squareSize, squareSize);
  
        // Check if the current value is different from the first value
        if (fillValue !== firstValue) {
          allValuesSame = false;
        }
      }
    }
    
    // If all values in the grid are the same, display "You win"
    if (allValuesSame) {
      textSize(32);
      let textColor = (firstValue === 255) ? 0 : 255; // Black text for white grid, white text for black grid
      fill(textColor); // Set the text color
      textAlign(CENTER, CENTER);
      text("You win", width / 2, height / 2);
    }
  }
  
 

function getCurrentY(){
  //determine current row of mouse, and return
  let constrainY = constrain(mouseY, 0, height);
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
// Project Title
// Your Name
// Date
//
// Extra for Experts:



let grid = 
[ [0, 50, 100, 150, 200], 
  [0, 0, 0, 0],
  [30, 40, 50, 60, 70],
  [255, 255, 255, 255, 255]
]
let squaresize = 50;
const NUM_ROWS = 4; const NUM_COLS = 5;


function setup() {
  createCanvas(NUM_COLS * squaresize, NUM_ROWS * squaresize);
  
}

function draw() {
  background(220);
  drawgrid();
}


function drawgrid(){
  for(let y = 0; y< NUM_ROWS; y++){
    for(let x = 0; x < NUM_COLS; x++){
      let fillvalue = grid[y][x];
      fill(fillvalue);
      square(x*squaresize,y*squaresize, squaresize);
    }
  }
}

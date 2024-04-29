// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tiles = [];
let level = [
  [0, 1, 0, 3, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0]


]

const COLUMNS = 5; const ROWS = 5; let TILE_SIZE = 100;
let playerx = 3; let playery = 4;


function prelaod(){

  for(let i = 0; i < 4; i++){
    tiles.push(loadImage("assets/" + i + ".png"));
  }

}


function setup() {
  createCanvas(COLUMNS * TILE_SIZE, ROWS * TILE_SIZE);
  level[playery][playerx] = 2;
}

function draw() {
  background(220);
  renderboard();
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    swap(playerx, playery, playerx, playery - 1);
    playery--;
  }
  if(keyCode === DOWN_ARROW){
    swap(playerx, playery, playerx, playery + 1);
    playery++;
  }
  if(keyCode === RIGHT_ARROW){
    swap(playerx, playery, playerx + 1, playery);
    playerx++;
  }
}


function swap(x1, y1, x2, y2){
  let temp = level[y1][x1];

  level[y1][x1] = level[y2][x2];
  level[y2][x2] = temp;

}

function renderboard(){
  for(let x = 0; x < COLUMNS; x++){
    for(let y = 0; y < ROWS; y++){
      let type = level[y][x];
      let currentimage = tiles[type];
      image(currentimage, x * TILE_SIZE, y * TILE_SIZE);
    }
  }
}
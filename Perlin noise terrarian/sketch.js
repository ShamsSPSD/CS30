// Project Title
// Your Name
// Date
//
// Extra for Experts:
// Terrain Generation Starter
// Mr. Scott
// March 11, 2024
// Procedurally Generated 2D Terrain

let rectWidth = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CORNER); 
  drawRectangles();
}

function drawRectangles(){
  let rectHeight;
  fill(0);
  for(let x = 0; x < width; x += rectWidth){
    rectHeight = random(0, height*-0.8);

    rect(x, height, rectWidth, rectHeight);

  }
}

function draw() {
}

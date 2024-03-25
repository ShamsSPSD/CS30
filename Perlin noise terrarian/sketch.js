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
  push();
  for(let x = 0; x < width; x += rectWidth){
    rectHeight = noise(height);
    rectHeight = map(rectHeight,0,1,height*-0.8,1)
    rect(x, height, rectWidth, rectHeight);
  }
  pop();
}

function draw() {

}

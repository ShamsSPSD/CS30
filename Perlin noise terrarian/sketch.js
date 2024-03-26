// Terrain Generation Starter
// Mr. Scott
// March 11, 2024
// Procedurally Generated 2D Terrain

let rectWidth = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  //rectMode(CENTER);  //CHANGE THIS!!!!
  drawRectangles();
}

function drawRectangles(){
  //using a single loop, generate a bunch of side-to-side
  //rectangles of varying height (pattern, random, noise)
  let rectHeight;
  fill(0);
  for(let x = 0; x < width; x += rectWidth){
    //option 1 - pattern
    // rectHeight = x;

    //option 2 - random()
    rectHeight = noise(0,height* 0.8);

    //perlin noise.. on your own.
    rect(x, height, rectWidth, -rectHeight);

  }
}

function draw() {
}
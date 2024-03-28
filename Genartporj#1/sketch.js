// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


var offset = 0;
var strum = 1;

function setup() { 
  createCanvas(windowWidth, windowHeight); 
  stroke(50);
  beginShape();
  vertex(0, 50);
  for(let x = 0; x < width; x++){
    let angle = offset + x * 0.01;
    let y = map(sin(angle), -strum, strum, 100, 360);
    vertex(x, y);
  }
  vertex(width, height);
  endShape();
  offset += 1;
} 

function draw() { 
}
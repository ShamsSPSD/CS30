// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let Width = 400
let Height = 300
let xPos, yPos;

function setup() {
  createCanvas(Width, Height);
}

function draw() {
  background(220);
  cornersandmouse()
}

function mousePressed(){
  xPos.push(mouseX)
  yPos.push(mouseY)
}

function cornersandmouse(){
  circle(Width * 0.05, Height * 0.05, 10)
  circle(Width * 0.95, Height * 0.95, 10)
  circle(Width * 0.05, Height * 0.95, 10)
  circle(Width * 0.95, Height * 0.05, 10)
  circle(mouseX,mouseY, 10)
  line(Width * 0.05, Height * 0.05, mouseX,mouseY)
  line(Width * 0.95, Height * 0.95, mouseX,mouseY)
  line(Width * 0.05, Height * 0.95, mouseX,mouseY)
  line(Width * 0.95, Height * 0.05, mouseX,mouseY)
}

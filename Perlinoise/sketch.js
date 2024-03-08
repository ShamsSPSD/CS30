// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let circletime = 100

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function circlechanger(){
  circletime = noise(circletime * 100)
}


function draw() {
  background(220);
  strokeWeight(10)
  circle(width/2,height/2,circletime)
  circlechanger()
}

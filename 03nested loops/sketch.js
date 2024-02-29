// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let rectheight = 1
let spacing = 20

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  gradientBackground()
  noStroke()
}

function gradientBackground(){
  let y = 0
  while(y < height){
    let c = color(mouseY,map(y,0,height,155,255),map(y,0,height,255,155));
    fill(c);
    rect(0,y,width,rectheight);
    y += rectheight
  }



}
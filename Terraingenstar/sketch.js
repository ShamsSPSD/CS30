// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectwidth = 100;
let x;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CORNERS);
  drawrects();
}

function draw() {
  background(220)
  drawrects();
}


function drawrects(){
  let rectwidth = x
  
  let rectheight;
  fill(0);
  for (let x = 0; x < width; x += rectwidth){
    rectheight = x;
    rect(x,height,rectwidth,rectheight)
  }
}


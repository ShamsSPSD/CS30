// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y, rwidth, rheight;
let rleft, rright, rtop, rbottom;



function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)

  x = width/2; y = height/2
  rwidth = 200; rheight = 100
}

function inrect(){
  if (mouseX < rright && mouseX > rleft){
    return true
  }
  return false
}
 
  

function updateEdgepos(){
  rleft = x - rwidth/2; rright = x + rwidth/2
  rtop = y - rheight/2; rleft = y +  rheight/2
}

function drawrect(){
  updateEdgepos()
  rect(x, y, rwidth, rheight);
}

function draw() {
  background(220);  
  drawrect()
  inrect()

}


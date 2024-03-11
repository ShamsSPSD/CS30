// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let y =
let Width = 500
let Height = 300
let xPos, yPos;

function setup() {
  createCanvas(Width, Height);
  xPos = [], yPos = []
  xPos = [width*0.05, width*0.95,width*0.05,width*0.95];
  yPos = [height*0.05, height*0.05,height*0.95,height*0.95];
}

function cornersAndMouseLoop(){
  // a hopefully slightly more elegant version
  let i = 0;
  while (i < xPos.length){
    let x = xPos[i];
    let y = yPos[i];
    circle(x,y,20);
    i++;
    line(x,y,mouseX,mouseY);
  }

}

function withloops(){
  for(let x = 10; x < width; x +=20);
    xPos,push(x)
    yPos,push(y)
}

function draw() {
  background(220);
  cornersAndMouseLoop()
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

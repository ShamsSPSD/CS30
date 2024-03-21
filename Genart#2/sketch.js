// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridspace = 40;



function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  background(220);
  angleMode(DEGREES);
  noFill();
  drawdistort();

}

function draw() {
}


function drawdistort(){
  for (let x = gridspace/2; x < width; x += gridspace){
    for (let y = gridspace/2; y < height; y += gridspace){
      push();

      translate(x,y);
      let ramount = map(y,0,height,1,45);
      rotate (random(-ramount,ramount));

      let offset = map(y,0,height,0,15)

      square(random(-offset,offset),random(-offset,offset),gridspace);
      pop();
    }

}
}
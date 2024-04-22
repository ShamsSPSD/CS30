// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {

  createCanvas(windowWidth, windowHeight);
  drawroad();
}

function draw() {
  //background(220);
}

class Kars{
  constructor(type,colour,x,y,xspeed,direct){

  }



  
}


function drawroad(){
  fill(0)
  rect(0,height/2,width,200);
  rect(0,height/2 - 200,width,200);
  let space = 30;
  for(let i = 0; i < width; i++){
    fill(255);
    rect(i * 70,height/2,30,10);
  }
}
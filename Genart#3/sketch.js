// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  angleMode(DEGREES)

}

function randomelement(currentlen){
  push();
  rotate(random(360));
  while(currentlen > 5){
    rotate(random(-30,30));
    line(0,0,0,currentlen);
    fill(50,50,0);
    translate(0,currentlen);
    currentlen *= 0.75;
  }



  pop();
}


function draw() {
  translate(width/2,height/2);
  for(let i = 0; i < 500 ;i++){
    randomelement(random(50,70));
  }
 
}


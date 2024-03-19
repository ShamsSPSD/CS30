function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawStaticClock();
  ClockHands();
}

function ClockHands(){

  push();
  stroke(200,0,0);
  strokeWeight(1);
  rotate(second()*6);
  line(0,0,0,130);
  pop();

}


function drawStaticClock(){
  stroke(0);
  translate(width/2, height/2);
  push(); 
  circle(0,0,300);


  let count = 0; let angle = 6;
  while(count < 60){
    if(count % 5 === 0){
      strokeWeight(3);
      line(110,0,140,0);
    }
    else{
      strokeWeight(1);
      line(125,0,140,0);
    }
   
    rotate(angle);
    count++;
  }
  pop();
}
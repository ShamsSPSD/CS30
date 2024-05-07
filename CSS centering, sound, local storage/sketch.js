// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let music, bouncesound;
let started;
let totbounces

function preload(){
  music = loadSound("Assets/background.mp3");
  bouncesound = loadSound("Assets/bounceSound.wav");
}



function setup() {
  createCanvas(400, 300);
  pos = createVector(width/2,height/2);
  vel = createVector(5,3);
  textSize(30);
  textAlign(CENTER);
}

function draw() {
  background(220);
  if(started == false){
    text("click to begin.",width/2,height/2);
    if(mouseIsPressed){
      started = true;
      music.setvolume(0.4);
      music.loop();
    }
    
  }
  else{
      updateBall();
      text(totbounces,width/2,height/2);
  }
}

function updateBall(){
  pos.add(vel);
  if(pos.x<0 || pos.x>width){
    totbounces++;
    bouncesound.play();
    vel.x *= -1;
  } 
  if(pos.y<0 || pos.x>height){
    totbounces++;
    bouncesound.play();
    vel.y *= -1;
  } 
  circle(pos.x,pos.y,20);
}
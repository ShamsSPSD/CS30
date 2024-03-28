// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let ballarray = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
}


function spawnball(initialx,initialy){
  let ball = {
    x: initialx,
    y: initialy,
    radius: 30,
    xspeed: random(-1,1),
    yspeed: random(-1,1),

  };

  ballarray.push(ball);
}


function mousePressed(){
  spawnball(mouseX,mouseY);
}



function draw() {
  background(220);
  for (let b of ballarray){
    fill(random(1,255),random(1,255),random(1,255));
    b.x += b.xspeed;
    b.y += b.yspeed;
    circle(b.x,b.y,b.radius);
  } 
}

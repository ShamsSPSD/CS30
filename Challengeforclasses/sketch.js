let walkers = [];
const NUM_WALKERS = 3;




function setup() {
  createCanvas(windowWidth, windowHeight);
  walkers.push(new Walker(height/2, 10));
  walkers.push(new Walker(height/2 + 60, 10));
  walkers.push(new Walker(height/2 - 60, 10));
}

function draw() {
  background(220);
  for (let w of walkers ){
    w.move();
    w.display();
  } 
  
}

class Walker {
  constructor(y, c){
    this.x = 0;   this.y = y;    this.c = c;
    this.speed = random(2,10);
    this.size = 50;
  

  }
  display(){
    rectMode(CENTER);
    fill(this.c);
    circle(this.x, this.y, this.size);
  }

  move(){
    
   this.x += this.speed; //LEFT
 
  }


}
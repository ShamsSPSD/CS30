// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let mywalker;


function setup() {
  createCanvas(windowWidth, windowHeight);
  mywalker = new walker(width/2,height/2,color("red"))
}

function draw() {
  background(220);
}

class walker {
  
  constructor(x,y,c){
    
    this.x = x; this.y = y; this.c = c;
    this.speed = random(2,10);
    this.size = 5;
  }


  display(){
    rectMode(CENTER);
    fill(this.c);
    square(this.x,this.y,this.size);
  }

  move(){
    let choice = Math.floor(random(4));
    if (choice ===0)this.x -= this.speed;
    else if (choice ===1)this.x += this.speed;
    else if (choice ===2)this.y -= this.speed;
    else if (choice ===3)this.y += this.speed;

  }

}

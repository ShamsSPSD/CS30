// Classes and Objects
// Mr. Scott
// April 8th, 2024
// A first look at making our own classes

//let myWalker, myWalker2;  //objects can't be created before setup()
let walkers = [];
const NUM_WALKERS = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //set up some walker objects
  for(let i = 0; i < NUM_WALKERS; i++){
    let c = color(random(255),random(255),random(255));
    walkers.push(new Walker(width/2,height/2,c));
  }
  noStroke();
  background(0);
}

function draw() {
  for(let w of walkers){
    w.move();
    w.display();
  }
}


class Walker {
  constructor(x, y, c){
    this.x = x;   this.y = y;    this.c = c;
    this.speed = random(10);
    this.size = 5;
  }

  // Class Methods
  display(){
    rectMode(CENTER);
    fill(this.c);
    square(this.x, this.y, this.size);
  }

  move(){
    //equally likely chance of ↑ ↓ → ←
    let choice = Math.floor(random(4)); //0, 1 ,2 ,3
    if(choice===0) this.x -= this.speed; //LEFT
    else if (choice === 1) this.x += this.speed; //RIGHT
    else if (choice === 2) this.y -= this.speed; //UP
    else if (choice === 3) this.y += this.speed; //DOWN
  }
}
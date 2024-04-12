// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let myplanet;
let mymoon;


function setup() {
  createCanvas(windowWidth, windowHeight);
  myplanet = new planet(width/2,height/2);
  angleMode(DEGREES);
  mymoon = new moon()
}

function draw() {
  background(30);
  myplanet.display();
  mymoon.display();
}


class planet{
  constructor(x,y){
    this.x = x;this.y = y;this.s = 50
    this.moons = [];
  }

  display(){
    circle(this.x,this.y,this.s);
  }
}


class moon{
  constructor(x,y){
    this.x = x; this.y = y; this.speed = 2;
    this.angle = 0; this.orbitradius = 80; this.s = 25;

  }

  update(){

  this.move();
  this.display();
  }


  move(){
    this.angle +=  this.speed;
    }

  display(){
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    circle(this.orbitradius,0,this.s);
    pop();



  }

}
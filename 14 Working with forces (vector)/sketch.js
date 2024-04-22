// Working with forces
// Omar
// april 22 2024
//
// Extra for Experts:

let particles = [];
let gravity;


function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0,0.1);
}

function draw() {
  background(220);
  for(let i = 0; i < particles.length; i++){
    let p = particles[i];
    p.move();
    p.display();
  }

}

function mousePressed(){
  particles.push(new particle(mouseX,mouseY));
}

class particle{
  constructor(x,y){
    this.position = createVector(x,y); this.s = 20;
    this.velocity = createVector(random(-3,3),random(-5,-3));
    this.c = color(0,100,random(150,225),100);

  }

  move(){
    this.velocity.add(gravity);

    this.position.add(this.velocity);
  }

  display(){
    fill(this.c); noStroke();

    push();
    translate(this.position.x,this.position.y);
    circle(0,0,100);
    pop();
  }
}

// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 10;i++){
    objects.push(new animatedobjects(random(width),random(height)));
    objects.push(new circleobj(random(width),random(height)));
    objects.push(new linobj());
  }
}
function draw() {
  background(220);
  for(let o of objects){
    o.move();
    o.display();
  }
}





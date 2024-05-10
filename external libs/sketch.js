
let scribble = new Scribble();

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  scribble.scribbleLine(width/2,height/2,mouseX,mouseY);
  let radius = dist(width/2,height/2,mouseX,mouseY);
  scribble.scribbleEllipse(width/2,height/2,radius *3,radius + 15);
}

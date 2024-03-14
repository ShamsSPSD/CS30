// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let lionl, lionr;
let pinimages = [];

function preload() {

  lionl = loadImage("assets/lion-left.png");
  lionr = loadImage("assets/lion-right.png");
  for (let i = 0; i < 9; i++){
    pinimages.push(loadImage("assets/pin-0"+ i + ".png"))
  }


}

function setup(){
  createCanvas(windowWidth, windowHeight);

}


function draw() {
  background(220);
  image(lionl,mouseX,mouseY)
}

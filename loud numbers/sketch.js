// Noisy numbers
// Omar shams
// March 7 2024
//

let segmentlength = 3;
let ballY = 200; let ballspeed;
let balltime = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function segmentline(){
  strokeWeight(15)
  let greytime = 0
  let x = 0
  while (x < width){
    let greyValue = random(0,255);

    greyValue = noise(greytime);
    greyValue = map(greyValue,0,1,0,255);
    greytime = .01;
    stroke(greyValue)
    line(x,height/2, x + segmentlength, height/2);
    x += segmentlength;
  }
}
function moveball(){
  strokeWeight(1);stroke(0);
  Yspeed = noise(balltime);
  ballY += Yspeed;
  circle(Yspeed * 0.7, ballY,30)
}
function draw() {
  background(220);
  segmentline();
  moveball();
}

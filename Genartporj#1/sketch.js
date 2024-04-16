// “Ninety Parallel Sinusoids With Linearly Increasing Period”
// Omar Shams
// April 16 2024
//
// “Ninety Parallel Sinusoids With Linearly Increasing Period”

function setup() {
  createCanvas(500  , 500);
  background(220);
  
  for (let i = 0; i < 200; i += 5){    
    push();
    translate(75,height/3 + i);
    theWave();
    pop();
  }
}

function theWave(){
  let x = 0;
  noFill();
  beginShape();
  for(let f = 0; f < width; f +=3){
    y = sin( 0.0002*(x += 2)**2) * 30;
    vertex(x,y);
  }
  endShape();
}
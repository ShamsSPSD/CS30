// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let windowWidth = 700;
let squareSize;
let y = 0
let Greenv;
let Redv; 
let Bluev;
let squareColor;


function setup() {
  createCanvas(windowWidth, windowWidth);
  squarmaker();
  document.addEventListener("contextmenu", event => event.preventDefault())
}

squareSize = (windowWidth/2)

function keyPressed(){
  squarmaker();
}



function mousePressed(){
  if ( mouseIsPressed && mouseButton === LEFT){
    if(squareSize < 400) {squareSize = squareSize * 2;}
  }

  if ( mouseIsPressed && mouseButton === RIGHT){
    if(squareSize > 10) {squareSize = squareSize / 2;}
  }
  squarmaker()
}

function squarmaker(){
    for(let x = 0; x < width; x += squareSize){
      for(let y = 0; y < height; y += squareSize){
        squareColor = color(Redv,Greenv,Bluev);
        fill(squareColor)
        noStroke()
        square(x,y,squareSize)

        Greenv = noise(255)
        Bluev = noise(255)
        Redv = noise(255)
      }
  
    }
  } 
  
function draw() {
}

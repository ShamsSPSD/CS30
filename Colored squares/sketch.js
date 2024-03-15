// Colouring squares
// Omar shams
// 3/15/2024

let colortime = 100; // global variables
let windowWidth = 700;
let squareSize;
let y = 0
let Greenv;
let Redv; 
let Bluev;
let squareColor;


function setup() {// set the right mouse click to not work and also and define the window
  createCanvas(windowWidth, windowWidth);
  squarmaker();
  document.addEventListener("contextmenu", event => event.preventDefault())
}

squareSize = (windowWidth/2)

function keyPressed(){
  squarmaker();
}



function mousePressed(){//when the mouse is clicked it either bigger or smaller
  if ( mouseIsPressed && mouseButton === LEFT){
    if(squareSize < 400) {squareSize = squareSize * 2;}
  }

  if ( mouseIsPressed && mouseButton === RIGHT){
    if(squareSize > 10) {squareSize = squareSize / 2;}
  }
  squarmaker()
}

function squarmaker(){//makes the grid colours it and makes it random or not depending on the use of perlin noise
    for(let x = 0; x < width; x += squareSize){
      for(let y = 0; y < height; y += squareSize){
        colortime += 1
        Greenv = noise(colortime);
        Greenv = map(Greenv,0,1,0,100);
        Bluev = noise(colortime);
        Bluev = map(Bluev,0,1,255,0);
        Redv = noise(colortime);
        Redv = map(Redv,0,1,0,255);
        
        squareColor = color(Redv,Greenv,Bluev);
        square(x,y,squareSize)
        fill(squareColor);
      }
  
    }
  } 
  
function draw() { //uneeded as everything was in setup
}

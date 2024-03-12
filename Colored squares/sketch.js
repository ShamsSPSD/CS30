// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let y = 0
let squaresize = 50

let Greenv;
let Redv; 
let Bluev;
let squareColor;

function setup() {
  createCanvas(400, 400);
  squarmaker();
}

function keyPressed(){
  squarmaker();
}

function mousePressed(){
  if 
}

function squarmaker(){
    for(let x = 0; x < width; x += squaresize){
      for(let y = 0; y < height; y += squaresize){
        squareColor = color(Redv,Greenv,Bluev);
        fill(squareColor)
        square(x,y,squaresize)
      
        Greenv = random(0,255)
        Bluev = random(0,255)
        Redv = random(0,255)
      }
  
    }
  } 
  

function draw() {

}

// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let y = 0
let squaresize = 20




function setup() {
  createCanvas(windowWidth, windowHeight);
}

function squarmaker(){
  for(let x = 0; x < width; x += squaresize){
    for(let y = 0; y < height; y += squaresize){
      square(x,y,squaresize)
    }

  }


}


function draw() {
  background(100);
  squarmaker();
}

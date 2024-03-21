// Project Title
// Your Name
// Date
//
// Extra for Experts:


let gridspace = 40;



function setup() {
  createCanvas(windowWidth, windowHeight);
    background(220);
    drawlines();

}

function draw() {

}

function diagonalasc(x,y,s){
  line(x - s/2,y + s/2, x + s/2, y - s/2)

}

function diagonaldec(x,y,s){
  line(x + s/2,y + s/2, x - s/2, y - s/2)
}

function drawlines(){
  for(let x = 0; x < width; x += gridspace){
     for(let y = 0; y < height; y += gridspace){
      let choice = int(random(2));
      if (choice === 0){
        diagonalasc(x,y,gridspace);
      }
      else{
        diagonaldec(x,y,gridspace)
      }
        
      }
     }

  }



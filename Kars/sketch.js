// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {

  createCanvas(windowWidth, windowHeight);
  drawroad();
}

function draw() {
  //background(220);
}

class Kars{
  constructor(type,colour,x,y,xspeed,direct){
    this.x = x;
    this.y = y;
    this.direct = round(random(0,2));
    this.colour = colour(random(255),random(255),random(255));
    this.type = int(random(2));
    this.xspeed = (random(20));


  }

  move(){
    if(this.direct === 0){
      this.x += this.xspeed();
      if(this.x > width + 40){
        this.x = width - 200;

      }
    }
    if(this.direct === 2){
      this.x -= this.xspeed();
      if(this.x > width + 40){
        this.x = width - 200;

  }
}
  }

  display(){
    if(this.type === 1){
     this.truck;
    }else{
      this.kar;
   
    }

  }
  truck(){
    
  
  }
}





function drawroad(){
  fill(0)
  rect(0,height/2,width,200);
  rect(0,height/2 - 200,width,200);
  let space = 30;
  for(let i = 0; i < width; i++){
    fill(255);
    rect(i * 70,height/2,30,10);
  }
}
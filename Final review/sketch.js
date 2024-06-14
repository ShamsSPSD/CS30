
let gorillaIdle = [];
let goriallaSwipe = [];
let spiralImages = [];
let spirals = [];

function preload(){ 

  for (let i = 0; i <= 15; i++){
    if(i < 10){
      spiralImages.push(loadImage("assets/Circle/Circle Animation0"+i+".png"));
    }
    else{
      spiralImages.push(loadImage("assets/Circle/Circle Animation"+i+".png"));
    }
  }


  for(let i = 1; i <= 6; i++){ 
    gorillaIdle.push(loadImage("assets/Gorilla/idle" + i + ".png"));
  }


  for(let i = 1; i <= 6; i++){ 
    goriallaSwipe.push(loadImage("assets/Gorilla/swipe" + i + ".png"));
  }
}

function setup() {
  fill(255);
  createCanvas(windowWidth, windowHeight);
  
}

let currentstate = 0;
let idleindex = 0; let swipeindex = 0;

function keyPressed(){
  if(currentstate === 0) currentstate = 1;
  else currentstate = 0
}

function draw() {
  
  if (currentstate === 0){
      
    image(gorillaIdle[idleindex],width/2,height/2);
    
    if(frameCount % 8 === 0){
      idleindex++;
      if(idleindex > 5) idleindex = 0;
    }
  }



 for(let i = 0; i < spirals.length;i++){
  let s = spirals[i];
  s.display();
  if(s.active === false){
    spirals.splice(1,3);
  }
 }
}

function mousePressed(){
  spirals.push(new Spiral(mouseX,mouseY));
}



class Spiral {
  constructor(x,y,){
    this.pos = createVector(x,y);
    this.currentframe = 0;
    this.active = true;

  }
  display(){
    if (this.currentframe > 15){
      this.active = false;

    }
    else{
      image(spiralImages[this.currentframe],this.pos.x,this.pos.y);
      if(frameCount % 3 === 0){
        this.currentframe++;
      }
    }
  }

}
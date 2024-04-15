// Terrain Generation Starter
// Mr. Scott
// March 11, 2024
// Procedurally Generated 2D Terrain

let rectWidth = 1;
let rectHeight = 0;
let rectTime = 1;
let currHP = 0;
let xHP = 0;
let avheight = 0;
let reccount = 0;

function draw(){
    background(255);
    rectTime += 0.03;
    drawRectangles();
    avgline();
    
    if (keyIsPressed && keyCode === LEFT_ARROW) {
    rectWidth -= .1 ;    
  } 
  if (keyIsPressed && keyCode === RIGHT_ARROW) {
    rectWidth += .1 ;
  }
  if (rectWidth >= 6){

    rectWidth = 6;
  }
  if (rectWidth <= 0.4){
    rectWidth = 0.4;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}




function drawRectangles(){

  let timeX = rectTime;

    reccount = 0;
    avheight = 0;
    currHP = 0;
    

  fill(255);
  for(let x = 0; x < width; x += rectWidth){
    timeX += 0.005;

    rectHeight = map(noise(timeX),0,1,0,height * 0.8)
    
    reccount++;
    avheight += rectHeight;

    rect(x, height, rectWidth, -rectHeight);
     if (currHP < rectHeight){
        currHP = rectHeight;
        xHP = x;
  }

    avheight = avheight/reccount;

    avgline(height - avheight);
    

  }
  drawflag(xHP,height-currHP - 10);
}


function drawflag(x,y){
  fill(120,0,60);
 line(x, y, x, y + 12.5);
  fill(200);
  triangle(x, y, x, y - 13, x + 15 , y - 6);
}


function avgline(avarage){
  fill(255,0,0);
  rect(0,avarage,width,10);
}
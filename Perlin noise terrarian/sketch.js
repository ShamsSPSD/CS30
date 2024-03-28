// Terrain Generation Starter
// Mr. Scott
// March 11, 2024
// Procedurally Generated 2D Terrain

let rectWidth = 1;
let rectHeight = 0;
let rectTime = 1;
let currHP = 0;
let xHP = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  //rectMode(CENTER);  //CHANGE THIS!!!!
  drawRectangles();
  print(currHP);
  print(xHP);
}

function drawRectangles(){
  //using a single loop, generate a bunch of side-to-side
  //rectangles of varying height (pattern, random, noise)
  let timeX = rectTime;

  fill(0);
  for(let x = 0; x < width; x += rectWidth){
    timeX += 0.005;

    rectHeight = map(noise(timeX),0,1,0,height * 0.8)
    
    rect(x, height, rectWidth, -rectHeight);
     if (currHP < rectHeight){
        currHP = rectHeight
        xHP = x
  }
    
  }
  drawflag(xHP,height-currHP);
}


function drawflag(x,y){
  fill(120,0,60);
 circle(x,y,30)
}



// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectwidth = 50;
let rectheight = 10;
let colors = ["#D1F2A5", "#EFFAB4","#FFC48C","#FF9F80","#F56991"]


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  drawhsb(width*0.4);
  drawrgb(width*0.1);
  drawcustom(width*0.7);
}

function drawcustom(x){
  colorMode(RGB)
  for(let y = 0;y < height; y += rectheight){
    fill(colors[0]);
    rect(x,y,rectwidth,rectheight);
  }
}

function drawhsb(x){
  colorMode(HSB)
  for(let y = 0;y < height; y += rectheight){
    let hue = map(y,0,height,0,360);
    fill(hue,360,360);
    rect(x,y,rectwidth,rectheight);
  }
}

function drawrgb(x){
  colorMode(RGB)
  for(let y = 0;y < height; y += rectheight){
    fill(random(255),random(255),random(255));
    rect(x,y,rectwidth,rectheight)
  }
}

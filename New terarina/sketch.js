// Terrain Generation Perlin noise
// Omar Shams
// April 16, 2024

//defining all variables
let rectWidth = 1;
let rectHeight = 0;
let rectTime = 1;
let currHP = 0;
let xHP = 0;
let avheight = 0;

function draw(){//beginning the draw function
    background(255);
    rectTime += .03;//keeps generating terrain and determines the speed
    drawRectangles();
    //controls the thickness of the rectangles and limits how big or small they can be
    if (keyIsPressed && keyCode === LEFT_ARROW) {
        rectWidth -= 0.1;    
    } 
    if (keyIsPressed && keyCode === RIGHT_ARROW) {
        rectWidth += 0.1;
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
    //more variable definitions
    let timeX = rectTime;
    reccount = 0;
    avheight = 0;
    currHP = 0;
    fill(255);
    //initial for loop that draws the rectangles and randomizes with perlin noise 
    for(let x = 0; x < width; x += rectWidth){
        timeX += 0.005;
        rectHeight = map(noise(timeX), 0, 1, 0, height * 0.8);
        reccount++;
        avheight += rectHeight;
        //determines the highest point and defines where the flag is
        rect(x, height, rectWidth, -rectHeight);
        if (currHP < rectHeight){
            currHP = rectHeight;
            xHP = x;
        }
    }
    
    avheight = avheight / reccount; // Calculate average height
    
    // Draw average line and dictates its location
    avgline(height - avheight);
    
    // Draw flag at the highest point
    drawflag(xHP, height - currHP - 10);
}
//the flag itself
function drawflag(x, y){
    fill(120, 0, 60);
    line(x, y, x, y + 12.5);
    fill(200);
    triangle(x, y, x, y - 13, x + 15, y - 6);
}
//the avarage line
function avgline(average){
    fill(255, 0, 0);
    rect(0, average, width, 2); // Draw a single red line representing the average height
}
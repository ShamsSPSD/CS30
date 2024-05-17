let speed;
let east = [];
let west = [];
let Marray = [];


//setting up the screen and pushing the cars onto the screen
//add traffic lights
function setup() {
  createCanvas(800, windowHeight);
  for (let i = 0; i < 15; i++) {
    west.push(new Vehicle(0, 0, 0));
  }
  for (let i = 0; i < 15; i++) {
    east.push(new Vehicle(0, 0, 1));
  }

  for (let i = 0; i < 1; i++) {
    Marray.push(new light());
  }
}

//initializes the road calls "action" but has the chances already defined 
function draw() {
  background(255);
  drawRoad();

  for (let w of west) {
    w.action();
  }

  for (let e of east) {
    e.action();
  }

  for (let q of Marray) {
    q.traffic();
  }
}
//when the mouse is pressed makes a new car and places it on the road lmb and rmb for east and west respectevly
function mousePressed() {
  if (mouseButton === LEFT && keyCode === SHIFT && keyIsPressed) {
    west.push(new Vehicle(0, 0, 0));
  }
  else if (mouseButton === LEFT) {
    east.push(new Vehicle(0, 0, 1));
  }
}
//creates the road
function drawRoad() {
fill(0)
  rect(width/2,height/2 - 110,width,230);
  rect(width/2,height/2 + 100,width,230);
  let space = 30;
  for(let i = 0; i < width; i++){
    fill(255,255,0);
    rect(i * 70,height/2,40,20);
  }
}

class Vehicle {
  constructor(xPosition, yPosition, direction) {
    //sets the type 1-0
    this.type = round(random(0, 1));
    //random color for the cars (changes while it runs)
    this.carColor = color(random(255), random(255), random(255));
    //xpos,ypos and the direction
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.direction = direction;
    //sets the speed at a 
    this.speed = round(random(1, 10));
    this.summon();
  }

  //summoning the car at a random position on either the top or bottom part
  summon() {
    this.yPosition = 0;
    if (this.direction === 0) { //coming from west
      this.yPosition = random(height / 6, height / 2.2);
      this.xPosition = random(0, width);
    }


    if (this.direction === 1) { //coming from east
      this.yPosition = random(height / 1.8, height - height / 6);
      this.xPosition = random(0, width);
    }
  }

  move() {

    //round racer ish code if they go off screen and return them and changes the direction by adding or subtracting
    if (Marray[0].pause <= 0) {
      if (this.direction === 0) { //coming from west
        this.xPosition += this.speed;
        if (this.xPosition > width + 50) {
          this.xPosition = 0 - 50;
        }
      }


      if (this.direction === 1) { //coming from east
        this.xPosition += -1 * this.speed;
        if (this.xPosition < 0 - 50) {
          this.xPosition = width + 50;
        }
      }
    }
  }

  //chance of speeding up
  speedUp() {
    if (round(random(0, 101)) === 1) {
      if (this.speed < 15) {
        this.speed += 1;

      }
    }
  }
  //chance of slowing down
  speedDown() {
    if (round(random(0, 101)) === 1) {
      if (this.speed > 1) {
        this.speed -= 1;
      }
    }
  }


  //chance of changing color
  changeColor() {
    if (round(random(0, 101)) === 1) {
      this.carColor = color(random(255), random(255), random(255));
    }
  }


  //all the past functions in one
  action() {
    this.display();
    this.move();
    this.speedUp();
    this.speedDown();
    this.changeColor();
  }


  //displaying the car depending on its type
  display() {
    //drawing the car
    if (this.type === 0) {
      fill(this.carColor);
      ellipse(this.xPosition, this.yPosition, 80,40)

    }

    if (this.type === 1) {
      fill(this.carColor);
      rect(this.xPosition, this.yPosition, 100, 60);
    }
  }
}


class light {
  constructor(trafficLights) {
    this.trafficLights = trafficLights;


    //light modes
    this.greenOn = color(0, 255, 0);
    this.greenOff = color(0, 50, 0);
    this.redOn = color(255, 0, 0);
    this.redOff = color(50, 0, 0);
    this.redColor = this.redOff;
    this.greenColor = this.greenOn;


    //for pauseing the cars
    this.pause = 0;
  }


  //class methods
  traffic() {


    //drawing the traffic light
    rectMode(CENTER);
    fill(this.redColor);
    circle(width / 2 + width / 16, height / 14, 70);


    fill(this.greenColor);
    circle(width / 2 - width / 16, height / 14, 70);


    //if space car is pressed, light turns red and the cars pause
    if (keyCode === 32 && keyIsPressed) {


      this.redColor = this.redOn;
      this.greenColor = this.greenOff;

      this.pause = 120;
    }
    this.pause--;


    //if the 120 frames are done, light turns green
    if (this.pause === 0) {
      this.redColor = this.redOff;
      this.greenColor = this.greenOn;
    }
  }
}

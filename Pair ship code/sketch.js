// OOP Pair Programming Starter Code
// Your Names
// The Date


// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let enterprise;
let shipImage, bulletImage;

function preload() {
  shipImage = loadImage("assets/enterprise.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width/2, height/2, shipImage);
}

function draw() {
  background("black");
  enterprise.update();
  enterprise.display();
  enterprise.handleKeyPress();
}



// ------------------------------------------------------------------------- //
// Start editing here!


function keyPressed(){

}

class Ship {
  constructor(x, y, theImage) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    this.shipImage = theImage;
    this.speed = 10;
  }

  update() {

    
    // if doing extra for experts, show bullet(s)
  }



  display() {
    // show the ship
    image(this.shipImage, this.x,this.y);
    
  }

  handleKeyPress() {
    if(keyIsPressed) {
      
      if (keyIsPressed && keyCode === LEFT_ARROW) {
        this.x -= 2 ;    
      } 
      if (keyIsPressed && keyCode === RIGHT_ARROW) {
        this.x += 2 ;
      }
      if (keyIsPressed && keyCode === UP_ARROW) {
        this.y -= 2
    }
      if (keyIsPressed && keyCode === DOWN_ARROW) {
        this.y += 2
    POINTS.push
    // if you are, you should make a bullet if the space key was pressed
  }
}
 }
}
// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

//class Bullet {
  //constructor(x, y, dx, dy, theImage) {
    // define the variables needed for the bullet here
  //}

  //update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
  //}

  //display() {
    // show the bullet
  //}

  //isOnScreen() {
    // check if the bullet is still on the screen
  //}
//}


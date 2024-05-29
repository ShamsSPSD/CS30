//Omar Shams
//sa

let player;
let zombies = [];

let framesTillCreate = 100;
let frame = 0;
let speed = 2;
let score = 0;

function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);
  player = new Player();
  zombies.push(new Zombie(1));
}





function draw() {
  background(255);
  let shiftX = width/2  - player.pos.x;
  let shiftY = height/2  - player.pos.y;
  player.pos.set(width / 2, height / 2);
  for (let zombie of zombies) {
    zombie.pos.add(shiftX/5, shiftY/5);
  }
  
  for (let x = 0; x < width; x += width/7 ) {
		for (let y = 0; y < height; y += height/7) {
        rect(x+shiftX/5,y+shiftX/5,200,200);
    }
  Centerplayer();
  frame++;
  player.display();
  player.update();
  
  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].display();
    zombies[i].update();
    if (player.shot(zombies[i])) {
      zombies.splice(i, 1);
    }
  }
  
  if (frame > framesTillCreate && zombies.length < 10) {
    zombies.push(new Zombie(random(speed)));
    frame = 0;
    if (framesTillCreate > 20) {
      framesTillCreate *= 0.95;
    }
  }
  
  if (frameCount % 100 == 0) {
    speed+=0.1;
  }
}
  
}

function Centerplayer() {
  

}




function mouseClicked() {
  player.shoot();
}

class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 1;
  }
  
  
  display() {
    push();
    fill(0);
    circle(this.x, this.y, 5);
    pop();
  }
  
  update() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
}

class Player {
  constructor() {
    this.pos = createVector(width/2, height/2);
    this.bullets = [];
    this.angle = 0;
  }

  display() {
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    rotate(this.angle);
    rect(0, 0, 10, 10);
    pop();
    
    
    for (let bullet of this.bullets) {
      bullet.display();
      bullet.update();
    }
    
    if (this.bullets.length > 20) {
      this.bullets.splice(0, 1);
    }
  }

  update() {
    
    let sidewaysSpeed = 0;
    let forwardSpeed = 0;
    if (keyIsDown(65)) {
      sidewaysSpeed = -20;
    }

    if (keyIsDown(68)) {
      sidewaysSpeed = 20;
    }

    if (keyIsDown(87)) {
      forwardSpeed = -20;
    }

    if (keyIsDown(83)) {
      forwardSpeed = 20;
    }
    
    this.pos.add(sidewaysSpeed, forwardSpeed);
  }
  
  shot(zombie) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      if (dist(this.bullets[i].x, this.bullets[i].y, zombie.pos.x, zombie.pos.y) < 10) {
        this.bullets.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  
  shoot() {
    this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
  }
}

class Zombie {
  
  constructor(speed) {
    this.x = random(width);
    this.y = random(height);
    
    if (random(1) > 0.5) {
      this.x += width;
    } else {
      this.x -= width;
    }
    
    if (random(1) > 0.5) {
      this.y += height;
    } else {
      this.y -= height;
    }
    this.pos = createVector(this.x, this.y);
    this.speed = speed;
    this.angle = 0;
  }
  
  
  display() {
    angleMode(degrees);
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
    rotate(this.angle);
    fill(100, 255, 100);
    rect( 0, 0, 20, 20);
    pop();
  }
  
  update() {
    let difference = p5.Vector.sub(player.pos, this.pos);
    difference.limit(this.speed);
    this.pos.add(difference);
  }
  
}
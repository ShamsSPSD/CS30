// Find my blog at https://codeheir.com/
// I do a lot of p5.js stuff that might interest you!

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
  zombies.push(new Zombie(random(speed)));
}

function draw() {

  rect(width/2,height/2,width,height)
  
  frame++;
  player.draw();
  player.update();
  
  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].draw();
    zombies[i].update();
    if (player.shot(zombies[i])) {
      zombies.splice(i, 1);
      score++;
    }
  }
  
  if (frame > framesTillCreate && zombies.length < 300) {
    zombies.push(new Zombie(random(speed)));
    frame = 0;
    if (framesTillCreate > 20) {
      framesTillCreate *= 0.95;
    }
  }
  
  if (frameCount % 1000 == 0) {
    speed+=0.1;
  }
  
  
}



function mouseClicked() {
  player.shoot();
}

class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 16;
  }
  
  
  draw() {
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

  draw() {
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    rotate(this.angle);
    rect(0, 0, 10, 10);
    pop();
    
    
    for (let bullet of this.bullets) {
      bullet.draw();
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
      sidewaysSpeed = -2;
    }

    if (keyIsDown(68)) {
      sidewaysSpeed = 2;
    }

    if (keyIsDown(87)) {
      forwardSpeed = -2;
    }

    if (keyIsDown(83)) {
      forwardSpeed = 2;
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
  
  
  draw() {
    angleMode(degrees);
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
    rotate(this.angle);
    fill(100, 255, 100);
    rect( 0, 0, 20, 20);
    //rect(0, 0, 20, 20);
    pop();
  }
  
  update() {
    let difference = p5.Vector.sub(player.pos, this.pos);
    difference.limit(this.speed);
    this.pos.add(difference);
  }
  
}
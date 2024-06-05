//Omar Shams
//5/30/2024

let player;
let zombies = [];
let framesTillCreate = 1000;
let frame = 0;
let speed = 1;
let score = 0;
let gridSize = 60; 
let mapSize = 1000;
let playerHealth = 100;
let Modeselect = 0;
let shootInterval = 15; 
let lastShotFrame = shootInterval;

function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);
  player = new Player();
  zombies.push(new Zombie(5));
}

function draw() {
  if (Modeselect = 0){
    
  }
  if (playerHealth <= 0) {
    noLoop();
  }
  background(255);
  translate(width / 2 - player.pos.x, height / 2 - player.pos.y);
  drawGrid();

  player.display();
  player.update();

  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].display();
    zombies[i].update();
    if (player.shot(zombies[i])) {
      zombies[i].health -= 10;
      if (zombies[i].health <= 0) {
        zombies.splice(i, 1);
        score++;
      }
    } else if (player.collidesWith(zombies[i])) {
      playerHealth -= 1;
      if (playerHealth <= 0){
        playerHealth = 0;
      }
      player.pushBack(zombies[i]);
      zombies[i].pushBack(player);
    }
  }

  if (frame > framesTillCreate && zombies.length < 1) {
    zombies.push(new Zombie(random(speed)));
    frame = 0;
    if (framesTillCreate > 20) {
      framesTillCreate *= 0.95;
    }
  }

  if (frameCount % 1000 == 0) {
    speed += 0.1;
  }

  drawHealthMeter();

  if (mouseIsPressed && (frame + lastShotFrame >= shootInterval)) {
    console.log(frame);
    player.shoot();
    lastShotFrame = frame;
    console.log(lastShotFrame);
  }
}

function drawGrid() {
  for (let x = 0; x <= mapSize; x += gridSize) {
    for (let y = 0; y <= mapSize; y += gridSize) {
      fill(225);
      rect(x+20, y+20, gridSize, gridSize);
    }
  }
}

function drawHealthMeter() {
  fill(255, 0, 0);
  rect(player.pos.x - width / 2 + 350, player.pos.y - height / 2 + 320, playerHealth / 2, 10);
}

class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 16;
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
    this.pos = createVector(mapSize / 2, mapSize / 2);
    this.bullets = [];
    this.angle = 0;
  }

  display() {
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(mouseY - height / 2, mouseX - width / 2); 
    rotate(this.angle);
    rect(0, 0, 10, 10);
    pop();

    for (let bullet of this.bullets) {
      bullet.display();
      bullet.update();
    }

  }

  update() {
    let sidewaysSpeed = 0;
    let forwardSpeed = 0;
    if (keyIsDown(65)) {
      sidewaysSpeed = -5;
    }

    if (keyIsDown(68)) {
      sidewaysSpeed = 5;
    }

    if (keyIsDown(87)) {
      forwardSpeed = -5;
    }

    if (keyIsDown(83)) {
      forwardSpeed = 5;
    }

    this.pos.add(sidewaysSpeed, forwardSpeed);
    this.pos.x = constrain(this.pos.x, 0, mapSize);
    this.pos.y = constrain(this.pos.y, 0, mapSize);
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

  collidesWith(zombie) {
    return dist(this.pos.x, this.pos.y, zombie.pos.x, zombie.pos.y) < 15;
  }

  pushBack(zombie) {
    let direction = p5.Vector.sub(this.pos, zombie.pos);
    direction.normalize();
    this.pos.add(direction.mult(7));
  }
}

class Zombie {
  constructor(speed) {
    this.speed = speed;
    this.angle = 0;
    this.health = 100;
    this.spawnOutsideCanvas();
  }

  spawnOutsideCanvas() {
    let edge = floor(random(4));
    switch (edge) {
      case 0: // top
        this.x = random(mapSize);
        this.y = 0;
        break;
      case 1:
        this.x = mapSize;
        this.y = random(mapSize);
        break;
      case 2: 
        this.x = random(mapSize);
        this.y = mapSize;
        break;
      case 3: 
        this.x = 0;
        this.y = random(mapSize);
        break;
    }
    this.pos = createVector(this.x, this.y);
  }

  display() {
    angleMode(DEGREES);
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
    rotate(degrees(this.angle));
    fill(100, 255, 100);
    rect(0, 0, 20, 20);
    pop();

    fill(255, 0, 0);
    rect(this.pos.x - 10, this.pos.y - 20, 20, 3);
    fill(0, 255, 0);
    rect(this.pos.x - 10, this.pos.y - 20, this.health / 5, 3);
  }

  update() {
    let difference = p5.Vector.sub(player.pos, this.pos);
    difference.limit(this.speed);
    this.pos.add(difference);
  }

  pushBack(player) {
    let direction = p5.Vector.sub(this.pos, player.pos);
    direction.normalize();
    this.pos.add(direction.mult(7));
  }
}
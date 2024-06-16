//Omar Shams
//5/30/2024
let weaponSelect = 10;
let player;
let zombies = [];
let framesTillCreate = 1000;
let frame = 0;
let speed = 1;
let score = 0;
let gridSize = 60;
let mapSize = 1000;
let playerHealth = 100;
let modeSelect = 0;
let shootInterval = 15;
const maxBullets = 10;
let reloadTime = 2000;

const WEAPONS = {
  pistol: { interval: 15, damage: 10 },
  rifle: { interval: 10, damage: 20 },
  shotgun: { interval: 30, damage: 50 },
};
let currentWeapon = 'pistol';

let menuOptions = ["Play Game", "Controls", "Exit"];
let selectedOption = 0;
let menuOptionBounds = [];

function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);
  player = new Player();
  zombies.push(new Zombie(3));
}

function draw() {
  background(255);

  switch (modeSelect) {
    case 0:
      drawStartScreen();
      break;
    case 1:
      drawGameScreen();
      break;
    case 2:
      drawGameOverScreen();
      break;
    case 3:
      drawControlsScreen();
      break;
  }
}

function mousePressed() {
  if (modeSelect === 0) { // Menu screen
    for (let i = 0; i < menuOptionBounds.length; i++) {
      let bounds = menuOptionBounds[i];
      if (mouseX >= bounds.x && mouseX <= bounds.x + bounds.w && mouseY >= bounds.y && mouseY <= bounds.y + bounds.h) {
        selectedOption = i;
        handleMenuSelection();
      }
    }
  }
}

function keyPressed() {
  if (modeSelect === 0) { // Menu screen
    if (keyCode === ENTER) {
      handleMenuSelection();
    } else if (keyCode === UP_ARROW) {
      selectedOption = (selectedOption - 1 + menuOptions.length) % menuOptions.length;
    } else if (keyCode === DOWN_ARROW) {
      selectedOption = (selectedOption + 1) % menuOptions.length;
    }
  } else if (modeSelect === 2 && keyCode === ENTER) { // Game Over screen
    restartGame();
  } else if (modeSelect === 3 && keyCode === ENTER) { // Controls screen
    modeSelect = 0;
  }
  if (keyCode === 82) { // R key for reload
    player.reload();
  }
  if (keyCode >= 49 && keyCode <= 51) { // Number keys 1, 2, 3 for weapon switch
    switchWeapon(keyCode - 49);
  }
}

function switchWeapon(index) {
  const weaponKeys = Object.keys(WEAPONS);
  currentWeapon = weaponKeys[index];
  shootInterval = WEAPONS[currentWeapon].interval;
}

function handleMenuSelection() {
  switch (selectedOption) {
    case 0:
      modeSelect = 1;
      restartGame(); // Start a new game when "Play Game" is selected
      break;
    case 1:
      modeSelect = 3;
      break;
    case 2:

  }
}

function drawStartScreen() {
  fill(0);
  textAlign(CENTER);
  textSize(32);
  text("Zombie Game", width / 2, height / 2 - 100);

  menuOptionBounds = [];
  for (let i = 0; i < menuOptions.length; i++) {
    fill(i === selectedOption ? color(0, 102, 153) : 0);
    textSize(24);
    text(menuOptions[i], width / 2, height / 2 - 40 + i * 40);

    // Store bounds for each menu option
    let bounds = {
      x: width / 2 - textWidth(menuOptions[i]) / 2,
      y: height / 2 - 40 + i * 40 - 24, // Adjust y to top of the text
      w: textWidth(menuOptions[i]),
      h: 24 // Text size
    };
    menuOptionBounds.push(bounds);
  }
}

function drawGameScreen() {
  if (playerHealth <= 0) {
    modeSelect = 2;
  }
  translate(width / 2 - player.pos.x, height / 2 - player.pos.y);
  drawGrid();
  player.display();
  player.update();
  if (modeSelect === 1 && mouseIsPressed && frameCount % shootInterval === 0) { // Game screen
    player.shoot();
  }
  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].display();
    zombies[i].update();
    if (player.shot(zombies[i])) {
      zombies[i].health -= WEAPONS[currentWeapon].damage;
      if (zombies[i].health <= 0) {
        zombies.splice(i, 1);
        score++;
      }
    } else if (player.collidesWith(zombies[i])) {
      playerHealth -= 1;
      player.pushBack(zombies[i]);
      zombies[i].pushBack(player);
    }
  }

  if (frame > framesTillCreate && zombies.length < 10) {
    zombies.push(new Zombie(random(speed)));
    frame = 0;
  }
  framesTillCreate = max(framesTillCreate * 0.95, 20);

  if (frameCount % 1000 === 0) {
    speed += 0.1;
  }

  drawHealthMeter();
  drawScore();
  frame++;
}

function drawGameOverScreen() {
  fill(0);
  textAlign(CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(24);
  text("Press Enter to Restart", width / 2, height / 2);
}

function drawControlsScreen() {
  fill(0);
  textAlign(CENTER);
  textSize(32);
  text("Controls", width / 2, height / 2 - 100);
  textSize(24);
  text("WASD to move", width / 2, height / 2 - 40);
  text("Mouse to aim and shoot", width / 2, height / 2);
  text("R to reload", width / 2, height / 2 + 40);
  text("1, 2, 3 to switch weapons", width / 2, height / 2 + 80);
  text("Press Enter to go back", width / 2, height / 2 + 120);
}

function drawGrid() {
  for (let x = 0; x <= mapSize; x += gridSize) {
    for (let y = 0; y <= mapSize; y += gridSize) {
      fill(225);
      stroke(0);
      rect(x + 15, y + 15, gridSize, gridSize);
    }
  }
}

function drawHealthMeter() {
  fill(255, 0, 0);
  rect(player.pos.x - width / 2 + 350, player.pos.y - height / 2 + 320, playerHealth / 2, 10);
}

function drawScore() {
  fill(0);
  textAlign(LEFT);
  textSize(16);
  text("Score: " + score, player.pos.x - width / 2 + 10, player.pos.y - height / 2 + 30);
}

function restartGame() {
  playerHealth = 100;
  score = 0;
  speed = 1;
  frame = 0;
  framesTillCreate = 1000;
  zombies = [];
  player.pos = createVector(mapSize / 2, mapSize / 2);
  modeSelect = 1;
}

class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 7;
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
    this.bulletCount = 0;
    this.reloadText = false;
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
    if (this.reloadText) {
      fill(0);
      textSize(20);
      text("reloading...", player.pos.x - width / 2 + 310, player.pos.y - height / 2 + 380);
    }
  }
  update() {
    let sidewaysSpeed = 0;
    let forwardSpeed = 0;
    if (keyIsDown(65)) { // A key
      sidewaysSpeed = -5;
    }
    if (keyIsDown(68)) { // D key
      sidewaysSpeed = 5;
    }
    if (keyIsDown(87)) { // W key
      forwardSpeed = -5;
    }
    if (keyIsDown(83)) { // S key
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
    if (this.bulletCount < maxBullets) {
      this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
      this.bulletCount++;
    }
  }
  reload() {
    this.reloadText = true;
    setTimeout(() => {
      this.bulletCount = 0;
      this.reloadText = false;
    }, reloadTime);
  }
  collidesWith(entity) {
    return dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y) < 15;
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
    this.health = random(50, 150);
    this.spawnAtSetLocation();
  }

  spawnAtSetLocation() {
    let spawnLocations = [
      createVector(0, 0),
      createVector(mapSize, 0),
      createVector(0, mapSize),
      createVector(mapSize, mapSize)
    ];
    let location = random(spawnLocations);
    this.pos = location.copy();
  }

  display() {
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
    rotate(this.angle);
    fill(random(1, 250), 255, random(1, 250));
    rect(0, 0, 20, 20);
    pop();
    fill(255, 0, 0);
    rect(this.pos.x - 10, this.pos.y - 20, 20, 3);
    fill(0, 255, 0);
    rect(this.pos.x - 10, this.pos.y - 20, map(this.health, 0, 150, 0, 20), 3);
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

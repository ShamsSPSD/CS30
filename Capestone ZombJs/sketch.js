//Omar Shams
//5/30/2024
//simple zombie survival game with guns and barrier techniques
//

//deifining variable
let backgroundImage;
let player;
let zombies = [];
let barricades = [];
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


//a list to help scroll through guns (can add however many you need)
const WEAPONS = {
  pistol: { interval: 15, damage: 100 },
  rifle: { interval: 10, damage: 20 },
  minigun: { interval: 1, damage: 5 },
  sniper: { interval: 60, damage: 1000 },

};
let currentWeapon = 'pistol';

//more variables
let menuOptions = ["Play Game", "Controls", "Exit"];
let selectedOption = 0;
let menuOptionBounds = [];

//background
function preload() {
  backgroundImage = loadImage('assets/c9445ae885e4cf44a256baf7f6a52f51.jpg');
}


//creates the player and zombies and defines where barriers are initialy placed
function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);
  player = new Player();
  zombies.push(new Zombie(3));
  frameRate(60); 
  placeInitialBarricades(); // Place barricades around zombie spawn locations
}

//different modes
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

//checks for when the mouse is pressed in a given mode and reacts accordingly this appears alot
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

//handles barriers reloading and different options for changing menus
function keyPressed() {
 if (modeSelect === 2 && keyCode === ENTER) { // Game Over screen
    drawStartScreen();
  } else if (modeSelect === 3 && keyCode === ENTER) { // Controls screen
    modeSelect = 0;
  }
  if (keyCode === 82) { // R key for reload
    player.reload();
  }
  if (keyCode >= 49 && keyCode <= 51) { // Number keys 1, 2, 3 for weapon switch
    switchWeapon(keyCode - 49);
  }
  if (key === 'b' || key === 'B') { 
    player.placeBarricade();
  }
}

//modular weapon switching
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
      modeSelect = 2;
      break;
  }
}

//base screen 
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

//actual game also defines everthing that can occur here
function drawGameScreen() {
  if (playerHealth <= 0) {
    modeSelect = 2;//end game when player dies
  }
  translate(width / 2 - player.pos.x, height / 2 - player.pos.y);
  image(backgroundImage, width / 2 - player.pos.x + 650, height / 2 - player.pos.y + 650, 2000, 2000);

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
        score++;
        score++;
        score++;
        score++;
        score++;
        score++;
        score++;
        score++;
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
    frame = 0;//makes new zombies
  }
  framesTillCreate = max(framesTillCreate * 0.95, 20);

  if (frameCount % 1000 === 0) {
    speed += 0.1;
  }

  for (let i = barricades.length - 1; i >= 0; i--) {
    barricades[i].display();
    for (let j = zombies.length - 1; j >= 0; j--) {
      if (barricades[i].collidesWith(zombies[j])) {
        barricades[i].health -= 5;
        zombies[j].pushBack(barricades[i]);
        if (barricades[i].health <= 0) {
          barricades.splice(i, 1);
          break;
        }//allows for barriar placement
      }
    }
  }

  drawHUD();
  frame++;
}
//when player dies
function drawGameOverScreen() {
  fill(0);
  textAlign(CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(24);
  text("Press Enter to Restart", width / 2, height / 2);
  if (keyPressed && keyCode === ENTER){
    modeSelect === 0
  }
}
//to help understand what to do
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
  text("Click B to place barricades", width / 2, height / 2 + 120);
  text("Press Enter to go back", width / 2, height / 2 + 160);
}

//all info the player might need
function drawHUD() {
  drawHealthMeter();
  drawScore();
  drawAmmoCount();
}
//health
function drawHealthMeter() {
  fill(255, 0, 0);
  rect(player.pos.x - width / 2 + 350, player.pos.y - height / 2 + 320, playerHealth / 2, 10);
}

//zombies killed
function drawScore() {
  fill(0);
  textAlign(LEFT);
  textSize(16);
  text("Score: " + score, player.pos.x - width / 2 + 10, player.pos.y - height / 2 + 30);
}

//ammo used 
function drawAmmoCount() {
  fill(0);
  textAlign(LEFT);
  textSize(16);
  text(`Ammo: ${player.bulletCount}/${maxBullets}`, player.pos.x - width / 2 + 10, player.pos.y - height / 2 + 50);
}

//when the player dies this runs
function restartGame() {
  playerHealth = 100;
  score = 0;
  speed = 1;
  frame = 0;
  framesTillCreate = 1000;
  zombies = [];
  barricades = [];
  player.pos = createVector(width / 2, height / 2);
  placeInitialBarricades();
}

function placeInitialBarricades() {
  let spawnLocations = [
    createVector(0, 0),
    createVector(mapSize - gridSize, 0),
    createVector(0, mapSize - gridSize),
    createVector(mapSize - gridSize, mapSize - gridSize)
  ];
  for (let location of spawnLocations) {
    barricades.push(new Barricade(location.x, location.y));
  }
}

//class for the bullet (or gun if you will)
class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 10;
    this.distance = 0;
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    circle(10, 0, 5);
    pop();
  }
  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.distance += this.speed;
    if (this.distance > 500) {
      player.bullets.splice(player.bullets.indexOf(this), 1);
    }
  }
}

//player class
class Player {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.angle = 0;
    this.bullets = [];
    this.bulletCount = 0;
    this.reloadText = false;
  }
  display() {
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(mouseY - height / 2, mouseX - width / 2);//the player follows the mouse
    rotate(this.angle);
    rect(0, 0, 10, 10);
    pop();
    for (let bullet of this.bullets) {
      bullet.display();
      bullet.update();
    }
    if (this.reloadText) {
      fill(0);
      textSize(20);//when reloading show that it is
      text("Reloading...", player.pos.x - width / 2 + 310, player.pos.y - height / 2 + 380);
    }
  }
  update() {//movement
    let movement = createVector(0, 0);
    if (keyIsDown(65)) movement.x = -5; // A key
    if (keyIsDown(68)) movement.x = 5;  // D key
    if (keyIsDown(87)) movement.y = -5; // W key
    if (keyIsDown(83)) movement.y = 5;  // S key
    if (movement.mag() > 0) {
      movement.normalize().mult(5);
      this.pos.add(movement);
    }
    this.pos.x = constrain(this.pos.x, 0, mapSize);
    this.pos.y = constrain(this.pos.y, 0, mapSize);
  }
  shoot() {
    if (this.bulletCount < maxBullets && !this.reloadText) {
      this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
      this.bulletCount++;
    }
  }
  reload() {
    if (!this.reloadText) {
      this.reloadText = true;
      setTimeout(() => {
        this.bulletCount = 0;
        this.reloadText = false;
      }, reloadTime);
    }
  }
  shot(zombie) {//when a zombies is shot
    for (let bullet of this.bullets) {
      if (dist(bullet.x, bullet.y, zombie.pos.x, zombie.pos.y) < 10) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
    }
    return false;
  }
  collidesWith(zombie) {//when a zombie hurts the player
    return dist(this.pos.x, this.pos.y, zombie.pos.x, zombie.pos.y) < 20;
  }
  pushBack(zombie) {//ensures the zombies cant just kill the player instantly
    let push = p5.Vector.sub(this.pos, zombie.pos);
    push.setMag(10);
    this.pos.add(push);
  }
  placeBarricade() {
    let x = this.pos.x + cos(this.angle) * 60; // Place barricade in front of the player
    let y = this.pos.y + sin(this.angle) * 60;
    let newBarricade = new Barricade(x, y);
    
    // Ensure new barricade does not overlap with existing ones
    for (let barricade of barricades) {
      if (dist(barricade.pos.x, barricade.pos.y, newBarricade.pos.x, newBarricade.pos.y) < newBarricade.size) {
        return; // Do not place the barricade if it overlaps
      }
    }
    
    if (barricades.length < 20) { // Limit the number of barricades
      barricades.push(newBarricade);
    }
  }
}

//zombie class
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
      createVector(mapSize - gridSize, 0),
      createVector(0, mapSize - gridSize),
      createVector(mapSize - gridSize, mapSize - gridSize)
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
    let push = p5.Vector.sub(this.pos, player.pos);
    push.setMag(10);
    this.pos.add(push);
  }
}

//barricade class
class Barricade {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 60; // Increase size to fully block zombies
    this.health = 100;
  }
  display() {
    fill(150, 75, 0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    fill(255, 0, 0);
    rect(this.pos.x - this.size / 2, this.pos.y - this.size - 10, this.size, 5);
    fill(0, 255, 0);
    rect(this.pos.x - this.size / 2, this.pos.y - this.size - 10, map(this.health, 0, 100, 0, this.size), 5);
  }
  collidesWith(zombie) {
    return dist(this.pos.x, this.pos.y, zombie.pos.x, zombie.pos.y) < this.size / 2;
  }
  pushBack(zombie) {
    let push = p5.Vector.sub(this.pos, zombie.pos);
    push.setMag(10);
    this.pos.add(push);
  }
}

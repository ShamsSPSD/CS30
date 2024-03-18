
let p;

function setup() {
  createCanvas(500, 500);
  p = [];
  for (let i = 0; i < 512; i++) {
    p[i] = floor(random(256));
  }
  for (let i = 0; i < 256; i++) {
    let idx = floor(random(256));
    let temp = p[i];
    p[i] = p[idx];
    p[idx] = temp;
  }
}

function draw() {
  background(220);
  let randomValue = perlinNoise(3.5, 7.2);
  fill(0);
  textSize(16);
  text("Random value generated using Perlin noise: " + randomValue, 20, 20);
}

function perlinNoise(x, y) {
  let X = floor(x) & 255;
  let Y = floor(y) & 255;
  x -= floor(x);
  y -= floor(y);
  let u = fade(x);
  let v = fade(y);
  let A = p[X] + Y, AA = p[A], AB = p[A + 1], B = p[X + 1] + Y, BA = p[B], BB = p[B + 1];
  
  return lerp(v, lerp(u, grad(p[AA], x, y),
                          grad(p[BA], x - 1, y)),
                  lerp(u, grad(p[AB], x, y - 1),
                          grad(p[BB], x - 1, y - 1)));
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t, a, b) {
  return a + t * (b - a);
}

function grad(hash, x, y) {
  let h = hash & 15;
  let u = h < 8 ? x : y;
  let v = h < 4 ? y : (h == 12 || h == 14) ? x : 0;
  return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
}
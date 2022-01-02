const planet = [];
const stars = [];
let load = false;
let easing = 0.009;
let data;
let ship;

function preload() {
  retroFont = loadFont("ARCADE.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
  getData();

  textFont(retroFont);
  ellipseMode(CENTER);
  ship = new Ship();
  init();
}

function init() {
  planet.length = 0;
  stars.lenght = 0;

  for (let i = 0; i < 100; i++) {
    stars.push(createVector(random(width), random(height / 1.2)));
  }
  let part = width / 6;
  // Planet(x, y, ty, size, status)
  planet.push(
    new Planet(part - part / 6, height + 150, height - 20, 180, "2xx")
  );
  planet.push(new Planet(part * 2, height + 150, height - 20, 0, "3xx"));
  planet.push(new Planet(part * 3, height + 150, height - 20, 0, "4xx"));
  planet.push(new Planet(part * 4, height + 150, height - 20, 0, "5xx"));
  planet.push(new Planet(part * 5, height + 150, height - 20, 0, "Request"));
}

function draw() {
  background(16, 19, 30, 225);

  if (frameCount % 60 === 0) getData();

  for (let x = 0; x < width; x += width / 8) {
    for (let y = 0; y < height; y += height / 10) {
      stroke(155, 158, 169, 5);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }

  for (let i = 0; i < 100; i++) {
    fill(255);
    noStroke();
    circle(stars[i].x, stars[i].y, random(0.5, 3));
  }

  noFill();
  strokeWeight(10);
  stroke(255);
  rect(0, 0, width, height);

  strokeWeight(2);
  textSize(55);
  textAlign(CENTER, TOP);
  text("Tino.sh Ingress", width / 2 - 20, 20);

  stroke(142, 142, 146);
  strokeWeight(2);
  line(30, height - 50, 30, height - 40);
  line(30, height - 50, width - 30, height - 50);
  line(width - 30, height - 50, width - 30, height - 40);

  for (let i = 0; i < planet.length; i++) {
    planet[i].update();
    planet[i].show();
  }

  if (keyIsDown(LEFT_ARROW)) {
    ship.dir(-0.09);
  } else if (keyIsDown(RIGHT_ARROW)) {
    ship.dir(0.09);
  } else if (keyIsDown(UP_ARROW)) {
    ship.boost();
  }

  ship.update();
  for (let i = 0; i < planet.length; i++) {
    ship.hit(planet[i]);
  }
  ship.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init();
}

function getData() {
  httpGet("http://localhost:8080/api", "json", false, function (response) {
    data = response;
    load = true;
  });
}

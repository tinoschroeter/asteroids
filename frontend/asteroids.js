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
  planet.push(new Planet(part - part / 6, height + 150, height - 20, 180, "2xx"));
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

function Planet(x, y, ty, size, status) {
  this.x = x;
  this.y = y;
  this.ty = ty;
  this.topMax = 20;
  this.size = size;
  this.status = status;

  this.update = function () {
    //readMessage
    if (load) {
      if (this.status === "2xx" && data.status_2xx) {
        this.targetY = floor(((data.status_2xx * 100) / data.requests) * 8);
        this.dy = this.targetY - this.y;
        this.y = constrain(this.y, this.topMax, height - this.size);
        this.y += this.dy * easing;

        this.targetSize = ((data.status_2xx * 100) / data.requests) * 2;
        this.dsize = this.targetSize - this.size;
        this.size += this.dsize * easing;
      } else if (this.status === "3xx" && data.status_3xx) {
        this.targetY = floor(((data.status_3xx * 100) / data.requests) * 8);
        this.dy = this.targetY - this.y;
        this.y = constrain(this.y, this.topMax, height - this.size);
        this.y += this.dy * easing;

        this.targetSize = ((data.status_3xx * 100) / data.requests) * 2;
        this.dsize = this.targetSize - this.size;
        this.size += this.dsize * easing;
      } else if (this.status === "4xx" && data.status_4xx) {
        this.targetY = floor(((data.status_4xx * 100) / data.requests) * 8);
        this.dy = this.targetY - this.y;
        this.y = constrain(this.y, this.topMax, height - this.size);
        this.y += this.dy * easing;

        this.targetSize = ((data.status_4xx * 100) / data.requests) * 2;
        this.dsize = this.targetSize - this.size;
        this.size += this.dsize * easing;
      } else if (this.status === "5xx") {
        this.targetY = floor(((data.status_5xx * 100) / data.requests) * 8);
        this.dy = this.targetY - this.y;
        this.y = constrain(this.y, this.topMax, height - this.size);
        this.y += this.dy * easing;

        this.targetSize = ((data.status_5xx * 100) / data.requests) * 2;
        this.dsize = this.targetSize - this.size;
        this.size += this.dsize * easing;
      } else if (this.status === "Request" && data.requests) {
        this.yMap = data.requests;
        this.sizeMap = data.requests;
        this.targetY = floor(map(this.yMap, 60, height - 60, 0, 600));
        this.dy = this.targetY - this.y;
        this.y = constrain(this.y, this.topMax, height - this.size);
        this.y += this.dy * easing;

        this.targetSize = floor(map(this.sizeMap, 0, 1000, 0, 200));
        this.dsize = this.targetSize - this.size;
        this.size += this.dsize * easing;
      }
    }
  };

  this.show = function () {
    stroke(207, 125, 69, 150);
    if (this.status == "5xx") {
      fill(178, 29, 65);
    } else {
      fill(239, 245, 103, 225);
    }

    strokeWeight(10);
    circle(this.x - this.size / PI, this.y + 20, this.size);
    strokeWeight(6);
    textSize(20);
    fill(239, 245, 103, 225);
    if (status == "Request") {
      text(
        this.sizeMap + " Req/s",
        this.x - this.size / 2,
        this.y + this.size / 2
      );
    } else {
      text(
        floor(this.size / 2) + "%",
        this.x - this.size / 2,
        this.y + this.size / 2
      );
    }
    noFill();
    stroke(142, 142, 146);
    strokeWeight(2);
    textSize(20);
    text(this.status, this.x - 30, this.ty - 10);
  };
}

function Ship() {
  this.init = function () {
    this.pos = createVector(width / 2, height / 3);
    this.triangleSize = 12;
    this.rotate = 0;
    this.heading = 10;
    this.r = 10;
    this.boosting = false;
    this.move = false;
  };

  this.init();

  this.dir = function (r) {
    this.rotate += r;
  };

  this.boost = function () {
    this.angle = this.rotate - PI / 2;
    this.force = p5.Vector.fromAngle(this.angle);
    this.force.mult(0.5);
    this.pos.add(this.force);
    this.boosting = true;
    this.move = true;
  };

  this.hit = function (planet) {
    this.col = dist(planet.x, planet.y, this.pos.x, this.pos.y);
    this.exitX = this.pos.x < 0 || this.pos.x > width;
    this.exitY = this.pos.y < 0 || this.pos.y > height;
    this.hitPlanet = this.col < planet.size;

    if (this.exitX || this.exitY || (this.hit.Planet && this.move)) {
      for (let i = 0; i < 10000; i++) {
        background(random(150, 205));
      }
      this.init();
      this.force = createVector(0, 0);
    }
  };

  this.update = function () {
    this.pos.add(this.force);
  };

  this.show = function () {
    push();
    strokeWeight(2);
    translate(this.pos.x, this.pos.y);
    rotate(this.rotate);
    stroke(255);
    noFill();
    beginShape();
    vertex(-this.r, this.r);
    vertex(0, -this.r * 2);
    vertex(this.r, this.r);
    endShape(CLOSE);

    if (this.boosting == true) {
      line(-this.r, 15, this.r, 15);
      this.boosting = false;
    }
    pop();
  };
}

function getData() {
  httpGet("https://asteroids.tino.sh/api", "json", false, function (response) {
    data = response;
    load = true;
  });
}

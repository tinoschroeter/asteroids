class Ship {
  constructor() {
    this.pos = createVector(width / 2, height / 3);
    this.triangleSize = 12;
    this.rotate = 0;
    this.heading = 10;
    this.r = 10;
    this.boosting = false;
    this.move = false;
  }

  dir(r) {
    this.rotate += r;
  }

  boost() {
    this.angle = this.rotate - PI / 2;
    this.force = p5.Vector.fromAngle(this.angle);
    this.force.mult(0.5);
    this.pos.add(this.force);
    this.boosting = true;
    this.move = true;
  }

  hit(planet) {
    this.col = dist(planet.x, planet.y, this.pos.x, this.pos.y);
    this.exitX = this.pos.x < 0 || this.pos.x > width;
    this.exitY = this.pos.y < 0 || this.pos.y > height;
    this.hitPlanet = this.col < planet.size;

    if (this.exitX || this.exitY || (this.hit.Planet && this.move)) {
      for (let i = 0; i < 10000; i++) {
        background(random(150, 205));
      }
      this.pos.x = width / 2;
      this.pos.y = height / 3;
      this.force = createVector(0, 0);
    }
  }

  update() {
    this.pos.add(this.force);
  }

  show() {
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
  }
}

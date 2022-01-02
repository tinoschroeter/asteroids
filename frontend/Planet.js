class Planet {
  constructor(x, y, ty, size, status) {
    this.x = x;
    this.y = y;
    this.ty = ty;
    this.topMax = 20;
    this.size = size;
    this.status = status;
  }

  update() {
    //readMessage
    if (load) {
      if (this.status === "2xx" && data.status_2xx) {
        this.targetY = floor(((data.status_2xx * 100) / data.requests) * 8);
        this.targetSize = ((data.status_2xx * 100) / data.requests) * 2;

        this.updatePlanet();
      } else if (this.status === "3xx" && data.status_3xx) {
        this.targetY = floor(((data.status_3xx * 100) / data.requests) * 8);
        this.targetSize = ((data.status_3xx * 100) / data.requests) * 2;

        this.updatePlanet();
      } else if (this.status === "4xx" && data.status_4xx) {
        this.targetY = floor(((data.status_4xx * 100) / data.requests) * 8);
        this.targetSize = ((data.status_4xx * 100) / data.requests) * 2;

        this.updatePlanet();
      } else if (this.status === "5xx") {
        this.targetY = floor(((data.status_5xx * 100) / data.requests) * 8);
        this.targetSize = ((data.status_5xx * 100) / data.requests) * 2;

        this.updatePlanet();
      } else if (this.status === "Request" && data.requests) {
        this.yMap = data.requests;
        this.sizeMap = data.requests;

        this.targetY = floor(map(this.yMap, 60, height - 60, 0, 600));
        this.targetSize = floor(map(this.sizeMap, 0, 1000, 0, 200));

        this.updatePlanet();
      }
    }
  }

  updatePlanet() {
    this.dy = this.targetY - this.y;
    this.y = constrain(this.y, this.topMax, height - this.size);
    this.y += this.dy * easing;

    this.dsize = this.targetSize - this.size;
    this.size += this.dsize * easing;
  }

  show() {
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
  }
}

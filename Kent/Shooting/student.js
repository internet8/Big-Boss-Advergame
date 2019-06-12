function Student (speed, x, y, rad, health, dir) {
  this.health = health;
  this.speed = speed;
  this.rad = rad;
  this.pos = createVector(x, y);
  // 0 is left and 1 is right
  this.dir = dir;
  this.isRunning = false;

  this.move = function () {
    if (this.dir == 0) {
      this.pos.x -= this.speed;
    } else {
      this.pos.x += this.speed;
    }
  }

  this.render = function () {
    //rect(this.pos.x, this.pos.y, this.rad, this.rad);
    if (this.dir == 0) {
      image(studentImg, this.pos.x, this.pos.y, this.rad, this.rad);
    } else {
      image(studentImg2, this.pos.x, this.pos.y, this.rad, this.rad);
    }
    // testimine, et näha õpilase positsiooni
    /* stroke(255);
    strokeWeight(50);
    point(this.pos.x + this.rad/2, this.pos.y); */
  }

  this.dirChange = function () {
    if (this.dir == 0) {
      this.dir = 1;
    } else {
      this.dir = 0;
    }
  }
}

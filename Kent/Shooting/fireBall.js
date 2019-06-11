function FireBall (speed, rad, x, y) {
  this.speed = speed;
  this.rad = rad;
  this.pos = createVector(x, y);

  this.render = function () {
    //ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    image(fireBallImg, this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
  }

  this.move = function () {
    this.pos.y += this.speed;
  }
}

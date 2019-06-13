function Explosion (rad, x, y) {
  this.frameCount = 0;
  this.rad = rad;
  this.pos = createVector(x, y);

  this.render = function () {
    //ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    if (explosionFrameCountDown % 3 == 0) {
      image(explosionAnimation[this.frameCount], this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
      this.frameCount ++;
      if (this.frameCount == 9) {
        this.frameCount = 8;
      }
    } else {
      image(explosionAnimation[this.frameCount], this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
    }
  }
}

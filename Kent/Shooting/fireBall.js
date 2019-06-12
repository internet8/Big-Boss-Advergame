function FireBall (speed, rad, x, y, dmgRad) {
  this.frameCount = 0;
  this.speed = speed;
  this.rad = rad;
  this.pos = createVector(x, y);
  this.startPos = this.pos;
  this.dmgRad = dmgRad;

  this.render = function () {
    //ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    image(fireBallAnimation[this.frameCount], this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
    this.frameCount ++;
    if (this.frameCount == 3) {
      this.frameCount = 0;
    }
    //image(fireBallImg, [sx=this.startPos.x-this.rad/2], [sy=this.startPos.y], [sWidth=500], [sHeight=500], [dx=this.pos.x-this.rad/2], [dy=this.pos.y], [this.rad], [this.rad]);
  }

  this.move = function () {
    this.pos.y += this.speed;
  }
}

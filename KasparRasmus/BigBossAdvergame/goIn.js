function GoIn (rad, x, y, isGirl) {
  let frameCount = 0;
  let anim = [];
  this.rad = rad;
  this.pos = createVector(x, y);

  this.render = function () {
    if (isGirl == 1) {
      anim = girlBackAnimation;
    } else {
      anim = boyBackAnimation;
    }
    if (goInFrameCountDown % 3 == 0) {
      image(anim[frameCount], this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
      frameCount ++;
      if (frameCount == 9) {
        frameCount = 8;
      }
    } else {
      image(anim[frameCount], this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
    }
  }
}

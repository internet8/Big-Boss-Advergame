function Student (speed, x, y, rad, health, dir, girl) {
  let frameCountDown = 0;
  let frameCount = 0;
  this.health = health;
  this.speed = speed;
  this.rad = rad;
  this.pos = createVector(x, y);
  // 0 is left and 1 is right
  this.dir = dir;
  this.isRunning = false;
  this.isGirl = girl; // 0 - ei, 1 - jah

  this.move = function () {
    if (this.dir == 0) {
      this.pos.x -= this.speed;
    } else {
      this.pos.x += this.speed;
    }
  }

  this.render = function () {
    //rect(this.pos.x, this.pos.y, this.rad, this.rad);
    let anim = studentAnimation;
    let anim2 = studentAnimation2;

    if (this.isGirl == 1) {
      anim = studentGirlAnimation;
      anim2 = studentGirlAnimation2;
    }

    if (this.dir == 0) {
      //image(studentImg, this.pos.x, this.pos.y, this.rad, this.rad);
      image(anim[frameCount], this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
      if (frameCountDown % 3 == 0) {
        frameCount ++;
      }
      if (frameCount == 12) {
        frameCount = 0;
      }
    } else {
      //image(studentImg2, this.pos.x, this.pos.y, this.rad, this.rad);
      image(anim2[frameCount], this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
      if (frameCountDown % 3 == 0) {
        frameCount ++;
      }
      if (frameCount == 12) {
        frameCount = 0;
      }
    }
    frameCountDown ++;
    if (frameCountDown == 36) {
      frameCount ++;
    }
  }

  this.dirChange = function () {
    if (this.dir == 0) {
      this.dir = 1;
    } else {
      this.dir = 0;
    }
  }
}

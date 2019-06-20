function GUI (w, h) {
  this.pos = createVector(0, 0);
  this.width = w;
  this.height = h;
  this.fillPercent = 0;
  let frameCount = 0;
  let maxFrames = 0;

  this.render = function () {
    push();
    //fill(0);
    //rect(this.pos.x-monster.rad/3.3, this.pos.y-monster.rad/10, this.width, this.height);
    //fill(255, 0, 0);
    //rect(this.pos.x-monster.rad/3.3, this.pos.y-monster.rad/10, this.width * this.fillPercent / 100, this.height);
    // m2ngib valmistumise animatsiooni
    if (!spaceUp) {
      image(shootingPrepAnimation[frameCount], monster.pos.x-monster.rad/6-(fireBallDmgRad/10), monster.pos.y+monster.rad/2-(fireBallDmgRad/10), (monster.rad/3)+(fireBallDmgRad/5), (monster.rad/3)+(fireBallDmgRad/5));
      if (maxFrames % 3 == 0) {
        frameCount ++;
      }
      maxFrames ++;
      if (frameCount == 6) {
        frameCount = 0;
        maxFrames = 0;
      }
    }
    pop();
  }
}

function GUI (x, y, w, h) {
  this.pos = createVector(x, y);
  this.width = w;
  this.height = h;
  this.fillPercent = 0;
  let frameCount = 0;
  let maxFrames = 0;

  this.render = function () {
    push();
    fill(0);
    rect(this.pos.x, this.pos.y, this.width, this.height);
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, this.width * this.fillPercent / 100, this.height);
    // m2ngib valmistumise animatsiooni
    if (!spaceUp) {
      image(shootingPrepAnimation[frameCount], monster.pos.x-monster.rad/6, monster.pos.y+monster.rad/2, monster.rad/3, monster.rad/3);
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

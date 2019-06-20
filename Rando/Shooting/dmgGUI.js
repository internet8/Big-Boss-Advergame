function GUI (x, y, w, h) {
  this.pos = createVector(x, y);
  this.width = w;
  this.height = h;
  this.fillPercent = 0;

  this.render = function () {
    push();
    fill(0);
    rect(this.pos.x, this.pos.y, this.width, this.height);
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, this.width * this.fillPercent / 100, this.height);
    pop();
  }
}

function Cloud (speed, rad, x, y, img) {
    this.speed = speed;
    this.rad = rad;
    this.pos = createVector(x, y);
    this.startPos = this.pos;

    this.render = function () {
      //ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
      image(img, this.pos.x-this.rad/2, this.pos.y, this.rad*6, this.rad*3);

    }

    this.move = function () {
      this.pos.x += this.speed;
      if(this.pos.x > openWindowWidth){
        this.pos.x = 0 - 8*this.rad;
      }
    }
  }

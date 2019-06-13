function Monster (speed,x,y,rad){
  let frameCount = 0;
  let maxFrames = 0;
  this.speed = speed;
  this.pos = createVector(x,y);
  this.rad = rad;

  //kera reageerib nupu vajutustele
  this.move = function(){
    if((leftUp == false) && (this.pos.x >= openWindowWidth/15)){
      this.pos.x -= this.speed;
    } else if ((!rightUp) && (this.pos.x <= openWindowWidth/1.12)) {
      this.pos.x += this.speed;
    }
  }

  this.render = function(){
    //ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    image(monsterImg, this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
    /*if (maxFrames % 5 == 0) {
      frameCount ++;
    }
    maxFrames ++;
    if (frameCount >= 4) {
      frameCount = 0;
      maxFrames = 0;
    }*/
  }
}

function Monster (speed,x,y,rad){
  let frameCount = 0;
  let maxFrames = 0;
  let img;
  this.speed = speed;
  this.pos = createVector(x,y);
  this.rad = rad;

  //kera reageerib nupu vajutustele
  this.move = function(){
    if((leftUp == false) && (this.pos.x >= openWindowWidth/12)){
      this.pos.x -= this.speed;
      if (!monsterMovingSound.isPlaying()) {
        monsterMovingSound.play();
      }
      img = monsterLeft;
    } else if ((!rightUp) && (this.pos.x <= openWindowWidth/1.10)) {
      if (!monsterMovingSound.isPlaying()) {
        monsterMovingSound.play();
      }
      this.pos.x += this.speed;
      img = monsterRight;
    } else {
      img = monsterImg;
      monsterMovingSound.pause();
    }
  }

  this.render = function(){
    //ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    image(img, this.pos.x-this.rad/2, this.pos.y, this.rad, this.rad);
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

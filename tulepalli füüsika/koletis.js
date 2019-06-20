function Kera(speed,x,y,rad){
  this.speed = speed;
  this.pos = createVector(x,y);
  this.rad = rad;

  //kera reageerib nupu vajutustele
  this.move = function(){
    if((leftUp == false) && (this.pos.x >= this.rad / 2)){
      this.pos.x -= this.speed;
    } else if ((!rightUp) && (this.pos.x <= windowWidth - this.rad / 2)) {
      this.pos.x += this.speed;
    }
  }

  this.render = function(){
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
  }
}

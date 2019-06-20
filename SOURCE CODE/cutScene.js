function CutScene () {
  let frameCount = 150;
  let rad = 0;

  this.render = function (textIn) {
    //ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    if (frameCount > 120) {
      //let opacity = parseFloat(frameCount / 200).toFixed(2);
      //background('rgba(255,255,255, ' + opacity + ')');
      rad += openWindowHeight/30;
    } else if (frameCount < 30 && frameCount >= 0) {
      rad -= openWindowHeight/30;
    }
    if (rad > 0) {
      frameCount --;
      push();
      fill('rgba(255, 255, 255)');
      stroke(0);
      strokeWeight(rad/300);
      //rect((openWindowWidth/2)-rad/2, (openWindowHeight/1.8)-rad/2, rad, rad);
      image(nextLevelImg, (openWindowWidth/2)-rad/2.1, (openWindowHeight/1.8)-rad/2, rad, rad);
      textSize(rad/15);
      if (textIn == "Game Over") {
        text(textIn, (openWindowWidth/2)-rad/5.5, (openWindowHeight/1.8)-rad/16);
      } else {
        text(textIn, (openWindowWidth/2)-rad/8.5, (openWindowHeight/1.8)-rad/16);
      }
      pop();
    } else {
      playCutScene = false;
    }
  }
}

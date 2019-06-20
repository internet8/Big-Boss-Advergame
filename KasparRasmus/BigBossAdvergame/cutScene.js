function CutScene () {
  let frameCount = 150;
  let rad = 0;

  this.render = function (textIn) {
    //ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    if (frameCount > 120) {
      //let opacity = parseFloat(frameCount / 200).toFixed(2);
      //background('rgba(255,255,255, ' + opacity + ')');
      rad+=20;
    } else if (frameCount < 30 && frameCount >= 0) {
      rad-=20;
    }
    if (rad > 0) {
      frameCount --;
      push();
      fill('rgba(255, 255, 255)');
      stroke(0);
      strokeWeight(5);
      rect((openWindowWidth/2)-rad/2, (openWindowHeight/2)-rad/2, rad, rad);
      textSize(rad/10);
      text(textIn, (openWindowWidth/2)-rad/6, (openWindowHeight/2));
      pop();
    } else {
      playCutScene = false;
    }
  }
}

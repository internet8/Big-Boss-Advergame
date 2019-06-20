let canvasWidth;
let canvasHeight;
let ideal = [1, 2, 4, 2, 1];
let you = [0, 1, 2, 3, 4];

function setup() {
  // Create the canvas
  canvasWidth = 600;
  canvasHeight = 600;
  createCanvas(canvasWidth, canvasHeight);
  background(255);

  // Set colors
  fill(155);
  stroke(0);
  for (let i = 11; i  >= 0; i--) {
    line(0, canvasHeight - i*(canvasHeight/11), canvasWidth, canvasHeight - i*(canvasHeight/11));
  }
  for (let i = 5; i  >= 0; i--) {
    line(0 + (canvasWidth - i*(canvasWidth/5)), 0, 0 + (canvasWidth - i*(canvasWidth/5)), canvasHeight);
  }
  for (let i = 5; i  >= 0; i--) {
    rect(canvasWidth/10 + (canvasWidth - i*(canvasWidth/5)), (canvasWidth - you[5-i]*(canvasWidth/5.5)/2), canvasWidth/15, canvasHeight);
  }
  strokeWeight(5);
  for (let i = 0; i  < ideal.length-1; i++) {
    line(canvasWidth/10 + (canvasWidth - (5-i)*(canvasWidth/5)), canvasHeight - ideal[i]*(canvasHeight/11), canvasWidth/10 + (canvasWidth - (5-(i+1))*(canvasWidth/5)), canvasHeight - ideal[i+1]*(canvasHeight/11));
  }
}

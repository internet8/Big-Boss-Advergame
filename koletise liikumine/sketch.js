//kus kohas asetseb object
var x;
var y = 200;
var kera;
let rightUp = true;
let leftUp = true;

function setup() {

  x = windowWidth;
  kera = new Kera(5, windowWidth / 2, 100,24)

  //tekitab canvase
  createCanvas(windowWidth, 200);
  noStroke(50);
  fill(100);


  //kera alustab keskelt
  x = width / 2;
  y = 100;

}

function draw() {

  background(200);

  //paneb kera brauseri äärtes seisma
  x = constrain(x, 10, windowWidth - 10);
  kera.move();
  kera.render();
}

function keyReleased () {
	if (keyCode == RIGHT_ARROW || keyCode == 68) {
		rightUp = true;
	} else if (keyCode == LEFT_ARROW || keyCode == 65) {
		leftUp = true;
	}
}

function keyPressed () {
	if (keyCode == RIGHT_ARROW || keyCode == 68) {
		rightUp = false;
	} else if (keyCode == LEFT_ARROW || keyCode == 65) {
		leftUp = false;
}
}
//muudab banneri suurust brauseri suurusele
//function windowResized(){
//  resizeCanvas(windowWidth);
//}

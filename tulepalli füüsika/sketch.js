//kus kohas asetseb object
var x;
var y = 200;
var kera;
let rightUp = true;
let leftUp = true;
var circles = [];  //array, et kõiki kerasi hoida

function setup() {

  x = windowWidth;
  kera = new Kera(15, windowWidth / 2, 100,24)

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

  //tulepalli füüsika
  for(var i=0; i<circles.length; i++){
    circles[i].update();
    circles[i].ellipse();

    console.log(circles.length);

    //kui kera on jõudnud enda eluea lõppu deleteb
    if(circles[i].lifespan <= 0){
      circles.splice(i, 1);
    }
  }
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
  } else if (keyCode == 32) {
    circles.push(new Circle(kera.pos.x, kera.pos.y,kera.rad));
  }
}

circles.pop();

//tulepalli füüsika

//class uue circle tegemiseks
function Circle(x, y, s){
  this.x = x; //x kordinaat
  this.y = y; //y koordinaat
  this.s = s; //circle size

  this.r = 100;
  this.g = 100;
  this.b = 100;

  this.lifespan = 90;

  this.ellipse = function(){
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.x, this.y, this.s);
  }

  this.update = function(){
    this.s = this.s + 2;
    this.lifespan--;
  }
}

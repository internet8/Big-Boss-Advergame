let openWindowWidth = 0;
let openWindowHeight = 0;
//kus kohas asetseb object
var x;
var y = 200;
var kera;
let rightUp = true;
let leftUp = true;
// tulekera
let fireBalls = [];
// opilased
let students = [];
let studentCounter = 0;
let date;
let timeToSpawn = 0;
let spawnRate = 2000;

function setup() {

  x = windowWidth;
  kera = new Kera(5, windowWidth / 2, 100,24)

  openWindowWidth = windowWidth/1.5;
  openWindowHeight = windowHeight/2;
  //tekitab canvase
  createCanvas(openWindowWidth, openWindowHeight);
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
  // tulepall
  for (let i = 0; i < fireBalls.length; i++) {
    fireBalls[i].render();
    fireBalls[i].move();
    if (fireBalls[i].pos.y > openWindowHeight/1.1) {
      fireBalls.splice(i, 1);
    }
  }
  // student
  date = Date.now();
  // adding students
  if (date > timeToSpawn && studentCounter < 5) {
    let dir = int(random(0, 2));
    let x;
    if (dir == 0) {
      x = openWindowWidth + 50;
    } else {
      x = 0;
    }
    students.push(new Student(3, x, 300, 50, 100, dir));
    timeToSpawn = date + spawnRate;
    studentCounter ++;
  }
  // calling functions for every student
  for (let i = 0; i < students.length; i++) {
    students[i].move();
    students[i].render();
    if (students[i].pos.x > (openWindowWidth/2)-students[i].rad && students[i].dir == 1) {
      students.splice(i, 1);
    } else if (students[i].pos.x < (openWindowWidth/2)-students[i].rad && students[i].dir == 0) {
      students.splice(i, 1);
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
  }
  if (keyCode == 32) {
		fireBalls.push(new FireBall(10, 30, kera.pos.x, kera.pos.y + kera.rad));
	}
}
//muudab banneri suurust brauseri suurusele
//function windowResized(){
//  resizeCanvas(windowWidth);
//}

let openWindowWidth = 0;
let openWindowHeight = 0;
// images
let bg;
let studentImg;
let studentImg2;
let monsterImg;
let fireBallImg;
let fireBallData;
let fireBallAnimation = [];
let fireFrames = [];
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
let AI = false;

function preload() {
  bg = loadImage('assets/hoone.png');
  monsterImg = loadImage('assets/monster.png');
  studentImg = loadImage('assets/student.png');
  studentImg2 = loadImage('assets/student2.png');
  fireBallImg = loadImage('assets/fireBallSpriteSheet.png');
  fireBallData = loadJSON('assets/fireBall.json');
}

function setup() {
  openWindowWidth = windowWidth/1.3;
  openWindowHeight = windowHeight/1.3;
  x = windowWidth;
  kera = new Kera(5, openWindowWidth / 2, openWindowHeight/6, (openWindowWidth + openWindowHeight)/20)
  //tekitab canvase
  createCanvas(openWindowWidth, openWindowHeight);
  noStroke(50);
  fill(100);

  //kera alustab keskelt
  x = width / 2;
  y = 100;
  // animations
  // fireball
  fireFrames = fireBallData.frames;
  for (let i = 0; i < fireFrames.length; i++) {
    let pos = fireFrames[i].position;
    let img = fireBallImg.get(pos.x, pos.y, pos.w, pos.h);
    fireBallAnimation.push(img);
  }
}

function draw() {
  background(bg);
  //paneb kera brauseri äärtes seisma
  x = constrain(x, 10, windowWidth - 10);
  kera.move();
  kera.render();
  // tulepall
  for (let i = 0; i < fireBalls.length; i++) {
    fireBalls[i].render();
    fireBalls[i].move();
    if (fireBalls[i].pos.y > openWindowHeight/1.3) {
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
      x = openWindowWidth + openWindowWidth/10;
    } else {
      x = -openWindowWidth/10;
    }
    students.push(new Student(3, x, openWindowHeight/1.3, openWindowWidth/10, 100, dir));
    timeToSpawn = date + spawnRate;
    studentCounter ++;
  }
  // calling functions for every student
  for (let i = 0; i < students.length; i++) {
    students[i].move();
    students[i].render();
    if (students[i].pos.x > (openWindowWidth/2)-students[i].rad/2 && students[i].dir == 1) {
      students.splice(i, 1);
    } else if (students[i].pos.x < (openWindowWidth/2)-students[i].rad/2 && students[i].dir == 0) {
      students.splice(i, 1);
    }
    // dir change
    if (AI && fireBalls.length > 0) {
      if (abs(fireBalls[0].pos.x - students[i].pos.x) < 50) {
        students[i].dirChange();
      }
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
		fireBalls.push(new FireBall(10, kera.rad, kera.pos.x, kera.pos.y + kera.rad/2));
	}
}
//muudab banneri suurust brauseri suurusele
//function windowResized(){
//  resizeCanvas(windowWidth);
//}

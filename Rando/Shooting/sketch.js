let openWindowWidth = 0;
let openWindowHeight = 0;
// piltide muutujad
let bg;
let studentImg;
let studentImg2;
let studentData;
let studentAnimation = [];
let studentFrames = [];
let studentData2;
let studentAnimation2 = [];
let studentFrames2 = [];
let monsterImg;
let fireBallImg;
let fireBallData;
let fireBallAnimation = [];
let fireFrames = [];
let explosionImg;
let explosionData;
let explosionAnimation = [];
let explosionFrames = [];
// monster on koletise objekt
let monster;
// kas parem/vasak/tyhik nool on üleval
let rightUp = true;
let leftUp = true;
let spaceUp = true;
// tulekera muutujad
let fireBalls = [];
let fireBallDmgRad = 50;
let fireBallMaxDmgRad = 300;
let delay = 500;
let timeToShoot = 0;
// opilase muutujad
let students = [];
let studentCounter = 0;
let date;
let timeToSpawn = 0;
let spawnRate = 750;
let levelStudentCount = 100;
// GUI
let dmgGUI;
// plahvatus
let explosion;
let explosionFrameCountDown = 0;

function preload() {
  bg = loadImage('assets/hoone.png');
  monsterImg = loadImage('assets/monster.png');
  studentImg = loadImage('assets/studentboy.png');
  studentData = loadJSON('assets/student.json');
  studentImg2 = loadImage('assets/studentboy2.png');
  fireBallImg = loadImage('assets/fireBallSpriteSheet.png');
  fireBallData = loadJSON('assets/fireBall.json');
  explosionImg = loadImage('assets/explosionSpriteSheet.png');
  explosionData = loadJSON('assets/explosion.json');
}

function setup() {
  // kui kasutaja avab akna, salvestatakse akna suurus siia
  openWindowWidth = windowWidth/1.3;
  openWindowHeight = windowHeight/1.3;
  // koletise objekti loomine
  monster = new Monster(5, openWindowWidth / 2, openWindowHeight/6, (openWindowWidth + openWindowHeight)/20)
  //tekitab canvase
  createCanvas(openWindowWidth, openWindowHeight);
  noStroke(50);
  fill(100);

  // animatioonid
  // tulekera kaadrite lisamine
  fireFrames = fireBallData.frames;
  for (let i = 0; i < fireFrames.length; i++) {
    let pos = fireFrames[i].position;
    let img = fireBallImg.get(pos.x, pos.y, pos.w, pos.h);
    fireBallAnimation.push(img);
  }
  // plahvatuse kaadrite lisamine
  explosionFrames = explosionData.frames;
  for (let i = 0; i < explosionFrames.length; i++) {
    let pos = explosionFrames[i].position;
    let img = explosionImg.get(pos.x, pos.y, pos.w, pos.h);
    explosionAnimation.push(img);
  }
  // opilase kaadrite lisamine
  studentFrames = studentData.frames;
  for (let i = 0; i < studentFrames.length; i++) {
    let pos = studentFrames[i].position;
    let img = studentImg.get(pos.x, pos.y, pos.w, pos.h);
    studentAnimation.push(img);
  }
  // opilase2 kaadrite lisamine
  studentFrames2 = studentData.frames;
  for (let i = 0; i < studentFrames2.length; i++) {
    let pos = studentFrames2[i].position;
    let img = studentImg2.get(pos.x, pos.y, pos.w, pos.h);
    studentAnimation2.push(img);
  }

  // GUI
  dmgGUI = new GUI(openWindowWidth / 1.3, openWindowHeight / 20, openWindowWidth / 5, openWindowHeight / 20);
}

function draw() {
  background(bg);
  // koletise funktsioonide v2lja kutsumine
  monster.move();
  monster.render();
  // opilasega seotud toimingud
  date = Date.now();
  // opilase lisamine vastavalt tekkimise sagedusele
  if (date > timeToSpawn && studentCounter < levelStudentCount) {
    let dir = int(random(0, 2));
    let x;
    if (dir == 0) {
      x = openWindowWidth + openWindowWidth/10;
    } else {
      x = -openWindowWidth/10;
    }
    students.push(new Student(3, x, openWindowHeight/1.3, openWindowWidth/8, 100, dir));
    timeToSpawn = date + spawnRate;
    studentCounter ++;
  }
  // iga opilase kohta kutsutakse funktsioonid
  for (let i = 0; i < students.length; i++) {
    students[i].move();
    students[i].render();
    /*stroke(255);
    strokeWeight(students[i].rad);
    point(students[i].pos.x + students[i].rad/2, students[i].pos.y);*/
    // siia if lausetesse panna leveli kontroll (suurendada mingit muutujat)
    if (students[i].pos.x > (openWindowWidth/2) && students[i].dir == 1 && !students[i].isRunning) {
      students.splice(i, 1);
      // studentsEncountered ++; (nt midagi sellist igasse if lausesse)
    } else if (students[i].pos.x < (openWindowWidth/2) && students[i].dir == 0 && !students[i].isRunning) {
      students.splice(i, 1);
    } else if (students[i].pos.x > openWindowWidth+students[i].rad && students[i].dir == 0 && students[i].isRunning) {
      students.splice(i, 1);
    } else if (students[i].pos.x < 0 && students[i].dir == 1 && students[i].isRunning) {
      students.splice(i, 1);
    }
  }
  // tulekeraga seotud toimingud
  for (let i = 0; i < fireBalls.length; i++) {
    fireBalls[i].render();
    fireBalls[i].move();
    if (fireBalls[i].pos.y > openWindowHeight/1.2) {
      for (let j = 0; j < students.length; j++) {
        if (abs(fireBalls[i].pos.x - (students[j].pos.x)) < fireBalls[i].dmgRad && !students[j].isRunning) {
          students[j].dirChange();
          students[j].speed = students[j].speed * 2;
          students[j].isRunning = true;
        }
      }
      explosion = new Explosion(fireBalls[i].dmgRad, fireBalls[i].pos.x, fireBalls[i].pos.y-fireBalls[i].dmgRad/2);
      explosionFrameCountDown = 27;
      fireBalls.splice(i, 1);
    }
  }

  // m2ngib animatsiooni
  if (explosionFrameCountDown > 0) {
      explosion.render();
      explosionFrameCountDown --;
  }

  // tulepalli füüsika (suurendab kahju ulatust)
  if (fireBallDmgRad < fireBallMaxDmgRad && !spaceUp) {
    fireBallDmgRad += 2;
  }

  // GUI funktsioonid
  dmgGUI.fillPercent = fireBallDmgRad / 3;
  dmgGUI.render();
  // siin võiks kontrollida, kas on aeg minna järgmisesse levelisse
  // if (studentsEncountered >= level.studentsCount) -> level = new Level(parameetrid);
}

function keyReleased () {
	if (keyCode == RIGHT_ARROW || keyCode == 68) {
		rightUp = true;
	} else if (keyCode == LEFT_ARROW || keyCode == 65) {
		leftUp = true;
	}
  if (keyCode == 32 && !spaceUp) {
    if (date > timeToShoot) {
      timeToShoot = date + delay;
      spaceUp = false;
      fireBalls.push(new FireBall(25, monster.rad, monster.pos.x, monster.pos.y + monster.rad/2, fireBallDmgRad));
      fireBallDmgRad = 50;
      spaceUp = true;
    } else {
      spaceUp = true;
    }
	}
}

function keyPressed () {
	if (keyCode == RIGHT_ARROW || keyCode == 68) {
		rightUp = false;
	} else if (keyCode == LEFT_ARROW || keyCode == 65) {
		leftUp = false;
  }
  if (keyCode == 32) {
    spaceUp = false;
	}
}
//muudab banneri suurust brauseri suurusele
//function windowResized(){
//  resizeCanvas(windowWidth);
//}

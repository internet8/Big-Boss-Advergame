let openWindowWidth = 0;
let openWindowHeight = 0;
// piltide muutujad
let bg;
let studentImg;
let studentImg2;
let monsterImg;
let fireBallImg;
let fireBallData;
let fireBallAnimation = [];
let fireFrames = [];
// monster on koletise objekt
let monster;
// kas parem/vasak/tyhik nool on üleval
let rightUp = true;
let leftUp = true;
let spaceUp = true;
// tulekera muutujad
let fireBalls = [];
let fireBallDmgRad = 10;
let fireBallMaxDmgRad = 300;
// opilase muutujad
let students = [];
let studentCounter = 0;
let date;
let timeToSpawn = 0;
let spawnRate = 2000;
// GUI
let dmgGUI;

function preload() {
  bg = loadImage('assets/hoone.png');
  monsterImg = loadImage('assets/monster.png');
  studentImg = loadImage('assets/student.png');
  studentImg2 = loadImage('assets/student2.png');
  fireBallImg = loadImage('assets/fireBallSpriteSheet.png');
  fireBallData = loadJSON('assets/fireBall.json');
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
  // tulemonster kaadrite lisamine
  fireFrames = fireBallData.frames;
  for (let i = 0; i < fireFrames.length; i++) {
    let pos = fireFrames[i].position;
    let img = fireBallImg.get(pos.x, pos.y, pos.w, pos.h);
    fireBallAnimation.push(img);
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
  // opile lisamine vastavalt tekkimise sagedusele
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
  // iga opilase kohta kutsutakse funktsioonid
  for (let i = 0; i < students.length; i++) {
    students[i].move();
    students[i].render();
    /*stroke(255);
    strokeWeight(students[i].rad);
    point(students[i].pos.x + students[i].rad/2, students[i].pos.y);*/
    // siia if lausetesse panna leveli kontroll (suurendada mingit muutujat)
    if (students[i].pos.x > (openWindowWidth/2)-students[i].rad/2 && students[i].dir == 1 && !students[i].isRunning) {
      students.splice(i, 1);
      // studentsEncountered ++; (nt midagi sellist igasse if lausesse)
    } else if (students[i].pos.x < (openWindowWidth/2)-students[i].rad/2 && students[i].dir == 0 && !students[i].isRunning) {
      students.splice(i, 1);
    } else if (students[i].pos.x > openWindowWidth+students[i].rad && students[i].dir == 0 && students[i].isRunning) {
      students.splice(i, 1);
    } else if (students[i].pos.x < 0 && students[i].dir == 1 && students[i].isRunning) {
      students.splice(i, 1);
    }
  }
  // tulemonsterga seotud toimingud
  for (let i = 0; i < fireBalls.length; i++) {
    fireBalls[i].render();
    fireBalls[i].move();
    if (fireBalls[i].pos.y > openWindowHeight/1.3) {
      for (let j = 0; j < students.length; j++) {
        if (abs(fireBalls[i].pos.x - (students[j].pos.x + students[j].rad/2)) < fireBalls[i].dmgRad && !students[j].isRunning) {
          students[j].dirChange();
          students[j].speed = students[j].speed * 2;
          students[j].isRunning = true;
        }
      }
      // play explosion animation here
      /*stroke(255);
      strokeWeight(fireBalls[i].dmgRad);
      point(fireBalls[i].pos.x, fireBalls[i].pos.y);*/
      fireBalls.splice(i, 1);
    }

    // siin võiks kontrollida, kas on aeg minna järgmisesse levelisse
    // if (stidentsEncountered >= leve.studentsCount) -> level = new Level(parameetrid);
  }

  // tulepalli füüsika (suurendab kahju ulatust)
  if (fireBallDmgRad < fireBallMaxDmgRad && !spaceUp) {
    fireBallDmgRad += 2;
  }

  // GUI funktsioonid
  dmgGUI.fillPercent = fireBallDmgRad / 3;
  dmgGUI.render();
}

function keyReleased () {
	if (keyCode == RIGHT_ARROW || keyCode == 68) {
		rightUp = true;
	} else if (keyCode == LEFT_ARROW || keyCode == 65) {
		leftUp = true;
	}
  if (keyCode == 32) {
		fireBalls.push(new FireBall(10, monster.rad, monster.pos.x, monster.pos.y + monster.rad/2, fireBallDmgRad));
    fireBallDmgRad = 10;
    spaceUp = true;
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

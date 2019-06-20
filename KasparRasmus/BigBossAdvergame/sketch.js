let openWindowWidth = 0;
let openWindowHeight = 0;
let gameIsRunning = false;
// piltide muutujad
let animationData;
let frames = [];
let bg, studentImg, studentImg2, studentGirlImg, studentGirlImg2, monsterImg, fireBallImg, explosionImg, shootingPrepImg, boyBackImg, girlBackImg, startImg, cloudImg1, cloudImg2, cloudImg3;
let studentAnimation = [];
let studentAnimation2 = [];
let studentGirlAnimation = [];
let studentGirlFrames = [];
let studentGirlAnimation2 = [];
let studentGirlFrames2 = [];
let fireBallAnimation = [];
let explosionAnimation = [];
let shootingPrepAnimation = [];
let monsterAnimation = [];
let boyBackAnimation = [];
let girlBackAnimation = [];
// monster on koletise objekt
let monster;
let monsterSpeed;
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
// GUI
let dmgGUI;
// plahvatus
let explosion;
let explosionFrameCountDown = 0;
// sisenemine
let goInAnim;
let goInFrameCountDown = 0;
// level
let studentsPassed = 0;
let studentsPassedTotal = 0;
let studentsEncountered = 0;
let levelStudentCount = 10;
let levelInfo = [];
let levelNumber = 1;
let nextLevelDelay = 3000;
let gameOver = false;
let levelSpeed;
let levelCutScene;
let playCutScene = false;

//Pilved
let clouds = [];

function preload() {
  bg = loadImage('assets/hoonepilvedeta.png');
  monsterImg = loadImage('assets/monster.png');
  studentImg = loadImage('assets/studentboy.png');
  studentGirlImg = loadImage('assets/studentgirl.png');
  studentImg2 = loadImage('assets/studentboy2.png');
  studentGirlImg2 = loadImage('assets/studentgirl2.png');
  fireBallImg = loadImage('assets/fireBallSpriteSheet.png');
  explosionImg = loadImage('assets/explosionSpriteSheet.png');
  shootingPrepImg = loadImage('assets/shootingPrep.png');
  monsterImg = loadImage('assets/monster.png');
  boyBackImg = loadImage('assets/boyBack.png');
  girlBackImg = loadImage('assets/girlBack.png');
  startImg = loadImage('assets/start.png');
  cloudImg1 = loadImage('assets/pilv1.png');
  cloudImg2 = loadImage('assets/pilv2.png');
  cloudImg3 = loadImage('assets/pilv3.png');
  animationData = loadJSON('animation.json');
}

function setup() {
  // kui kasutaja avab akna, salvestatakse akna suurus siia
  openWindowWidth = windowWidth/1;
  openWindowHeight = windowHeight/1;

  levelSpeed = openWindowWidth/500;
  monsterSpeed = openWindowWidth/200;
  // koletise objekti loomine
  monster = new Monster(monsterSpeed, openWindowWidth / 2, openWindowHeight/6, (openWindowHeight)/7)
  //tekitab canvase
  createCanvas(openWindowWidth, openWindowHeight);
  noStroke(50);
  fill(100);

  // animatioonid
  frames = animationData.frames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img;
    img = fireBallImg.get(pos.x, pos.y, pos.w, pos.h);
    fireBallAnimation.push(img);
    img = explosionImg.get(pos.x, pos.y, pos.w, pos.h);
    explosionAnimation.push(img);
    img = studentImg.get(pos.x, pos.y, pos.w, pos.h);
    studentAnimation.push(img);
    img = studentImg2.get(pos.x, pos.y, pos.w, pos.h);
    studentAnimation2.push(img);
    img = studentGirlImg.get(pos.x, pos.y, pos.w, pos.h);
    studentGirlAnimation.push(img);
    img = studentGirlImg2.get(pos.x, pos.y, pos.w, pos.h);
    studentGirlAnimation2.push(img);
    img = shootingPrepImg.get(pos.x, pos.y, pos.w, pos.h);
    shootingPrepAnimation.push(img);
    img = monsterImg.get(pos.x, pos.y, pos.w, pos.h);
    monsterAnimation.push(img);
    img = boyBackImg.get(pos.x, pos.y, pos.w, pos.h);
    boyBackAnimation.push(img);
    img = girlBackImg.get(pos.x, pos.y, pos.w, pos.h);
    girlBackAnimation.push(img);
  }

  // Pilvede animatsioon
  for (let i = 0; i < 3; i++){
    if(i == 1){
      clouds.push(new Cloud(1, 50, openWindowHeight / 1.5, openWindowHeight / 20, cloudImg1));
    } else if (i == 2){
      clouds.push(new Cloud(1.3, 50, openWindowHeight * 0.1, openWindowHeight / 60, cloudImg2));
    } else {
      clouds.push(new Cloud(1.5, 50, openWindowHeight / 0.75, openWindowHeight / 20, cloudImg3));
    }
  }

  // GUI
  dmgGUI = new GUI(openWindowWidth / 20, openWindowHeight / 167);
}

function draw() {
  background(bg);

  // opilasega seotud toimingud
  date = Date.now();

  // Pilvede funktsioonide väljakutsumine
    for(let i = 0; i < clouds.length; i++){
      clouds[i].render();
      clouds[i].move();
    }

    // koletise funktsioonide v2lja kutsumine
      monster.move();
      monster.render();

  // opilase lisamine vastavalt tekkimise sagedusele
  if (date > timeToSpawn && studentCounter < levelStudentCount && !gameOver && gameIsRunning) {
    let dir = int(random(0, 2));
    let isGirl = int(random(0, 2));
    let x;
    if (dir == 0) {
      x = openWindowWidth + openWindowWidth/10;
    } else {
      x = -openWindowWidth/10;
    }
    students.push(new Student(levelSpeed, x, openWindowHeight/1.3, openWindowHeight/5, 100, dir, isGirl));
    timeToSpawn = date + spawnRate;
    studentCounter ++;
  } else if (!gameIsRunning) {
    // alguse tekst
    image(startImg, openWindowWidth/3.45, openWindowHeight/1.3, openWindowWidth/2.4, openWindowHeight/5);
  }
  // iga opilase kohta kutsutakse funktsioonid
  for (let i = 0; i < students.length; i++) {
    if (students[i].pos.x > (openWindowWidth/2) && students[i].dir == 1 && !students[i].isRunning) {
      goInAnim = new GoIn(students[i].rad, openWindowWidth/2, openWindowHeight/1.5, students[i].isGirl);
      goInFrameCountDown = 27;
      students.splice(i, 1);
      studentsPassed ++;
      studentsPassedTotal ++;
      studentsEncountered ++;
    } else if (students[i].pos.x < (openWindowWidth/2) && students[i].dir == 0 && !students[i].isRunning) {
      goInAnim = new GoIn(students[i].rad, openWindowWidth/2, openWindowHeight/1.5, students[i].isGirl);
      goInFrameCountDown = 27;
      students.splice(i, 1);
      studentsPassed ++;
      studentsPassedTotal ++;
      studentsEncountered ++;
    } else if (students[i].pos.x > openWindowWidth+students[i].rad && students[i].dir == 1 && students[i].isRunning) {
      students.splice(i, 1);
      studentsEncountered ++;
    } else if (students[i].pos.x < 0 && students[i].dir == 0 && students[i].isRunning) {
      students.splice(i, 1);
      studentsEncountered ++;
    }
    if (i < students.length) {
      students[i].move();
      students[i].render();
    }
  }
  // tulekeraga seotud toimingud
  for (let i = 0; i < fireBalls.length; i++) {
    fireBalls[i].render();
    fireBalls[i].move();
    if (fireBalls[i].pos.y > openWindowHeight/1.2) {
      for (let j = 0; j < students.length; j++) {
        if (abs(fireBalls[i].pos.x - (students[j].pos.x)) < fireBalls[i].dmgRad && !students[j].isRunning && levelNumber != 5) {
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
  if (goInFrameCountDown > 0) {
    goInAnim.render();
    goInFrameCountDown --;
  }

  // tulepalli füüsika (suurendab kahju ulatust)
  if (fireBallDmgRad < fireBallMaxDmgRad && !spaceUp) {
    fireBallDmgRad += 2;
  }

  // AI
  /* if (students.length > 0) {
    let index = 0;
    if (students[index].isRunning && students.length > 1) {
      index++;
    }
    if (students[index].isRunning && students.length > 2) {
      index++;
    }
    if (students[index].isRunning && students.length > 3) {
      index++;
    }
    if (students[index].isRunning && students.length > 4) {
      index++;
    }
    if (students[index].isRunning && students.length > 5) {
      index++;
    }
    if (monster.pos.x > students[index].pos.x) {
      leftUp = false;
      rightUp = true;
    } else {
      leftUp = true;
      rightUp = false;
    }
  }
  if (date > timeToShoot && students.length > 0) {
    timeToShoot = date + delay;
    spaceUp = false;
    fireBalls.push(new FireBall(25, monster.rad, monster.pos.x, monster.pos.y + monster.rad/2, fireBallDmgRad));
    fireBallDmgRad = 50;
    spaceUp = true;
  } else {
    spaceUp = true;
    fireBallDmgRad = 50;
  }*/
  // GUI funktsioonid
  dmgGUI.fillPercent = fireBallDmgRad / 3;
  dmgGUI.pos.x = monster.pos.x;
  dmgGUI.pos.y = monster.pos.y;
  dmgGUI.render();

  // cutscene
  if (playCutScene) {
    levelCutScene.render("Level " + levelNumber.toString());
  }

  // Kuvatakse leveli numbrit ja sissepääsenud tegelaste arvu
  if (!gameOver) {
    textSize(openWindowWidth / 60);
    text('Level ' + levelNumber, 10, 30);
    text('Passed students ' + studentsPassedTotal + '/10', 10, 60);
    text('Tallinn University Narva mnt 29, Room A543', openWindowWidth / 1.6, 50);
    text('June 21, 10:00', openWindowWidth / 1.3, 80);
  }


  // kontrollitakse, kas minna järgmisesse levelisse
  if (studentsEncountered >= levelStudentCount && !gameOver){
    nextLevel();
  }
  if (levelNumber >= 6 || studentsEncountered == levelStudentCount) {
    gameOver = true;
  }
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
      fireBalls.push(new FireBall(windowHeight/50, (monster.rad/2)+(fireBallDmgRad/5), monster.pos.x, monster.pos.y + monster.rad/2, fireBallDmgRad));
      fireBallDmgRad = 50;
      spaceUp = true;
    } else {
      spaceUp = true;
      fireBallDmgRad = 50;
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

function mousePressed() {
  if (!gameIsRunning) {
    gameIsRunning = true;
  }
}

function nextLevel(){
  // siin vأµiks kontrollida, kas on aeg minna jأ¤rgmisesse levelisse
  levelStudentCount -= studentsPassed;
  studentCounter = 0;
  levelNumber ++;
  console.log("J2rgmine level", levelNumber);
  levelInfo.push(studentsPassed);
  studentsPassed = 0;
  studentsEncountered = 0;
  timeToSpawn = date + nextLevelDelay;
  levelSpeed = levelSpeed + levelSpeed * 1/2;
  levelCutScene = new CutScene();
  playCutScene = true;
}

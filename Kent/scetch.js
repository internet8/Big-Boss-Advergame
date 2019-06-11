let students = [];
let studentCounter = 0;
let date;
let timeToSpawn = 0;
let spawnRate = 2000;
let openWindowWidth = 0;
let openWindowHeight = 0;

function setup() {
  openWindowWidth = windowWidth/1.5;
  openWindowHeight = windowHeight/2;

  // Create the canvas
  createCanvas(openWindowWidth, openWindowHeight);

  // Set colors
  fill(0);
  stroke(255);

  // Create student objects
  //students.push(new Student(3, 0, 300, 50, 1));
}

function draw () {
  date = Date.now();
  background(200);
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

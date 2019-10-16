let moodColours = ['red', 'blue', 'orange', 'purple', 'yellow', 'green'];
let index = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(moodColours[index]);
}

function mousePressed() {
	index++;
  if (index == moodColours.length) {
    index = 0;
  }
}
let classifier;


let request;

// A variable to hold the canvas image we want to classify
let canvas, ctx;

// Two variable to hold the label and confidence of the result
let label;
let confidence;
let button
let width = 500;
let height = 500;

let pX = null;
let pY = null;
let x = null;
let y = null;

let mouseDown = false;

setup();
async function setup() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');

  classifier =  await ml5.imageClassifier('DoodleNet', onModelReady);
  // Create a canvas with 280 x 280 px

  canvas.addEventListener('mousemove', onMouseUpdate);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);

 
  button = document.querySelector("#clearBtn");

  button.addEventListener('click', clearCanvas);
  
  
  label = document.querySelector("#label");
  confidence = document.querySelector("#confidence");

  requestAnimationFrame(draw)
}

function onModelReady() {
  console.log('ready!')
}


function clearCanvas() {
  ctx.fillStyle = '#ebedef'
  ctx.fillRect(0, 0, width, height);
}


function draw() {
  request = requestAnimationFrame(draw)
    
  if (pX == null || pY == null) {
    ctx.beginPath();
    ctx.fillStyle = '#ebedef'
    ctx.fillRect(0, 0, width, height);

    pX = x
    pY = y
  }
  x = x
  y = y


 
  ctx.lineWidth = 10;



  ctx.strokeStyle = "#000000";



  if (mouseDown === true) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(x, y);
    ctx.lineTo(pX, pY);
    ctx.stroke();
  }

  pX = x;
  pY = y;
}

function onMouseDown(e) {
  mouseDown = true;
}

function onMouseUp(e) {
  mouseDown = false;
  classifyCanvas();
}

function onMouseUpdate(e) {
  var pos = getMousePos(canvas, e);
  x = pos.x;
  y = pos.y;

}

function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}



function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}


function gotResult(error, results) {

 
  if (error) {
    console.error(error);
  }
 

  console.log(results);


  label.textContent = 'Label: ' + results[0].label;
  confidence.textContent = 'Confidence: ' + results[0].confidence.toFixed(4)
}
var cols, rows;
var w = 20;
var grid = [];

//current cell
var current;

var stack = [];

function setup() {
  createCanvas(500, 500);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(5);

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = new Cell(j, i);
      grid.push(cell);
    }
  }

  //where cell is located
  current = grid[0];
}

function draw() {
  background(51);

  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  var next = current.checkNeighbors();

  // console.log("NEXT: " + next.i +", "+next.j);

  if (next) {
    next.visited = true;

    stack.push(current);
    
    removeWalls(current, next);
    //next cell
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  highlight() {
    var x = this.i * w;
    var y = this.j * w;
    // console.log("HIGHLIGHT    X: " + x + " Y: " + y);
    noStroke();
    fill(194, 159, 224);
    rect(x, y, w, w);
  };

  checkNeighbors() {

    console.log("X: " + this.i + " Y: " + this.j);

    var neighbors = [];

    var top = grid[index(this.i, this.j - 1)];
    var right = grid[index(this.i + 1, this.j)];
    var bottom = grid[index(this.i, this.j + 1)];

    // console.log("TOP: " + top + " RIGHT: " + right + " BOTTOM: " + bottom);

    if (this.i - 1 >= 0) {
      var left = grid[index(this.i - 1, this.j)];
    }

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };

  show() {
    var x = this.i * w;
    var y = this.j * w;

    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
    if (this.visited) {
      noStroke();
      fill(137, 214, 224);
      rect(x, y, w, w);
    }
  };
}

function removeWalls(a, b) {

  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
    // console.log(a);
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;

  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;

  }

}
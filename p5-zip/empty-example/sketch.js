var snake
var scl = 10
var food

function setup () {
  createCanvas(640, 480)
  snake = new Snake()
  frameRate(10)
  pickFoodLocation()
}

// Elipse from the tutorial
// function draw () {
//   if (mouseIsPressed) {
//     fill(0)
//   } else {
//     fill(255)
//   }
//   ellipse(mouseX, mouseY, 80, 80)
// }

// Snake

function draw () {
  background(51)
  snake.death()
  snake.update()
  snake.show()

  // food
  fill(255, 0, 100)
  rect(food.x, food.y, scl, scl)

  // sneak eat food
  if (snake.eat(food)) pickFoodLocation()
}

function pickFoodLocation () {
  var cols = floor(width / scl)
  var rows = floor(height / scl)
  food = createVector(floor(random(cols)), floor(random(rows)))
  food.mult(scl)
}

var value;
function mouseMoved() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}

function keyPressed () {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1)
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1)
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0)
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0)
  }
}


// SNAKE CONSTRUCTOR FUNCTION//
function Snake () {
  this.x = 0
  this.y = 0
  this.speedX = 1
  this.speedY = 0
  this.size = 0
  this.tail = []

  this.update = function () {
    if (this.size === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1]
      }
    }
    this.tail[this.size - 1] = createVector(this.x, this.y)

    this.x = this.x + this.speedX * scl
    this.y = this.y + this.speedY * scl

    this.x = constrain(this.x, 0, width - scl)
    this.y = constrain(this.y, 0, height - scl)
  }

  this.dir = function (x, y) {
    this.speedX = x
    this.speedY = y
  }
  this.show = function () {
    fill(255)
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl)
    }
    rect(this.x, this.y, scl, scl)
  }

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y)
    if (d < 1) {
      this.size++
      return true
    } else {
      return false
    }
  }

  this.death = function () {
    for (let i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i]
      var d = dist(this.x, this.y, pos.x, pos.y)
      if (d < 1) {
        this.total = 0
        this.tail = []
      }
    }
  }
}

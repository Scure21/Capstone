var scl = 20;
var snake;
var food;

function setup() {
  createCanvas(scl * 30, scl * 30);
  snake = new Snake();
  food  = new Food();
  frameRate(10);
}

function draw() {
  background(51);

  snake.eat(food);
  snake.move();
  snake.draw();
  food.draw();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  }
}

function cols() {
  return floor(width / scl);
}

function rows() {
  return floor(height / scl);
}

function randomVector() {
  return createVector(floor(random(cols())), floor(random(rows())));
}

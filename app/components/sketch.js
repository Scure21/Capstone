import Food from './food';
import Snake from './snake';

export default function sketch (p) {


  var scl = 20;
  var snake;
  var food;

  p.setup = function(){
    var canvas = p.createCanvas(scl * 30, scl * 30);
    console.log(p.width, p.height)
    snake = new Snake(p, scl);
    food  = new Food(p, scl);
    p.frameRate(10);
  }



  p.draw = function() {
    p.background(51);

    snake.eat(food);
    snake.move();
    snake.draw();
    food.draw();
  }

  p.keyPressed = function() {
    if (p.keyCode === p.UP_ARROW) {
      snake.dir(0, -1);
    } else if (p.keyCode === p.DOWN_ARROW) {
      snake.dir(0, 1);
    } else if (p.keyCode === p.RIGHT_ARROW) {
      snake.dir(1, 0);
    } else if (p.keyCode === p.LEFT_ARROW) {
      snake.dir(-1, 0);
    }
  }

  p.cols = function() {
    return p.floor(p.width / scl);
  }

  p.rows = function() {
    return p.floor(p.height / scl);
  }

  p.randomVector = function () {
    return p.createVector(p.floor(p.random(p.cols())), p.floor(p.random(p.rows())));
  }


}


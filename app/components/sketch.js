import Food from './food';
import Snake from './snake';
//import {size} from 'p5'

export default function sketch (p) {

  var scl = 10;
  var snake;
  var food;
  var canvas;

  p.setup = function(){
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    snake = new Snake(p, scl);
    food  = new Food(p, scl);
    p.frameRate(8);
    // bg = loadImage("");
    // window.addEventListener('resize', resizeCanvas, false);

  }

  // window.onresize = function() {
  //   canvas.size(window.innerWidth, window.innerHeight);
  // }

  p.draw = function() {
    // p.background(51);

    snake.eat(food);
    snake.move();
    snake.draw();
    food.draw();
    // ellipse(width/2,height/2,100,100);
  }

  window.onresize = function() {
    canvas.size(window.innerWidth, window.innerHeight);
  };


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


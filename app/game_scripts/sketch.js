import Food from './food'
import Snake from './snake'
import {scl} from './utils'
import store from '../store'
import { getSnakes } from '../reducers/snakes'


export default function sketch (p) {
  var snake
  var food
  var socket
  var snakes
  var canvas
  var foods
  var snakeImg
  var snakesArr = []

  p.setup = function () {
    canvas = p.createCanvas(600, 600)
  // in the future this would go in the actual server
    socket = io.connect('http://192.168.2.167:1337')

    snake = new Snake(null, null, p, snakeImg)
    food = new Food(p)
    const snakeData = {
      x: snake.x,
      y: snake.y,
      color: snake.color,
      points: snake.points,
      tail: snake.tail
    }
    const foodData = {
      x: food.vec.x,
      y: food.vec.y
    }
    // Handle server disconnection
    socket.on('disconnect', function () {
      socket.close()
    })
    // send the snake info to the server
    socket.emit('start', {snakeData, foodData})
    socket.on('serverUpdate', function (data) {
      snakes = data.snakes
      foods = data.foods
      let _snakes = [];
      for(var snake in snakes) {
        _snakes.push(snakes[snake])
      }
      store.dispatch(getSnakes(_snakes))
    })
    p.frameRate(10)
  }

  p.draw = function () {
    p.background(51)
    snake.eat(p, food)
    food.draw(p)

    // store.dispatch(getSnakes(snakes))

    // Draw the tail for each snake
    for (var id in snakes) {
      if (id.substring(2, id.length) !== socket.id) {
        p.fill(snakes[id].color)
        p.rect(snakes[id].x, snakes[id].y, scl, scl)
        var tail = snakes[id].tail
        for (var i = 0; i < tail.length; i++) {
          var element = tail[i]
          p.fill(snakes[id].color)
          p.rect(element.x, element.y, scl, scl)
        }
      }
    }
    // Draw the food for each snake
    for (var foodId in foods) {
      if (foodId !== socket.id) {
        p.fill(255, 0, 100)
        p.rect(foods[foodId].x, foods[foodId].y, scl, scl)
      }
    }

    snake.draw(p)
    snake.move(p)
    var snakeUpdatedData = {
      x: snake.x,
      y: snake.y,
      tail: snake.tail,
      points: snake.points,
      color: snake.color
    }
    var foodUpdatedData = {
      x: food.vec.x,
      y: food.vec.y
    }
    socket.emit('clientUpdate', {snakeUpdatedData, foodUpdatedData})
  }

  // window.onresize = function () {
  //   canvas.size(window.innerWidth, window.innerHeight)
  // }

  p.keyPressed = function () {
    if (p.keyCode === p.UP_ARROW) {
      snake.dir(0, -1)
    } else if (p.keyCode === p.DOWN_ARROW) {
      snake.dir(0, 1)
    } else if (p.keyCode === p.RIGHT_ARROW) {
      snake.dir(1, 0)
    } else if (p.keyCode === p.LEFT_ARROW) {
      snake.dir(-1, 0)
    }
  }
}

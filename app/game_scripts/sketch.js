import Food from './food'
import Snake from './snake'
import {scl} from './utils'

export default function sketch (p) {
  var snake
  var food
  var socket
  var snakes = []
  var canvas

  p.setup = function () {
    canvas = p.createCanvas(600, 600)
  // in the future this would go in the actual server
    socket = io.connect('http://192.168.0.8:1337')
    snake = new Snake(null, null, p)
    food = new Food(p)
    const data = {
    // snake: snake,
      x: snake.x,
      y: snake.y,
      color: snake.color,
      points: snake.points,
      tail: snake.tail,
      foodx: food.x,
      foody: food.y
    }
 // console.log('DATA', data)

  // send the snake info to the server
    socket.emit('start', data)
    socket.on('serverUpdate', function (data) {
    // console.log('inside heartbeat this is the data!!!', data)
      snakes = data
    })

    p.frameRate(10)
  }

  p.draw = function () {
    p.background(51)
    snake.eat(p, food)
    food.draw(p)
      for (var id in snakes) {
        console.log('snakes inside draw', snakes)
        if (id.substring(2, id.length) !== socket.id) {
          console.log("***********", snakes[id].color)
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

    snake.draw(p)
    snake.move(p)
    // var data = {
    //   x: snake.x,
    //   y: snake.y,
    //   tail: snake.tail,
    //   points: snake.points,
    //   color: snake.color
    // }

    socket.on('send_change', function(snake_position){
      console.log('hi i am here in sketch', snake_position)
      snake.dir(snake_position.x, snake_position.y)
    })
      var data = {
      x: snake.x + snake_position.x,
      y: snake.y + snake_position.y,
      tail: snake.tail,
      points: snake.points,
      color: snake.color
    }
    socket.emit('clientUpdate', data)
  }

      //old version
    //socket.emit('clientUpdate', data)

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

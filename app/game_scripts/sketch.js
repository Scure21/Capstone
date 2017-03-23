import Food from './food'
import Snake from './snake'
import p from 'p5'

export default function sketch () {
  var scl = 20
  var snake
  var food
  var socket
  var snakes = []
  var canvas
  console.log('THIS P IN SKETCH', p)
  p.setup = function () {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight)
  // in the future this would go in the actual server
    socket = io.connect('http://192.168.1.184:1337')
    console.log('SOCKET',socket)
    snake = new Snake()
    food = new Food()
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
    socket.on('update', function (data) {
    // console.log('inside heartbeat this is the data!!!', data)
      snakes = data
    })

    p.frameRate(10)
  }

  p.draw = function () {
    p.background(51)
    snake.eat(food)
    food.draw()
    for (var i = snakes.length - 1; i >= 0; i--) {
      var id = snakes[i].id
    // console.log('snakes inside draw', snakes)
      if (id.substring(2, id.length) !== socket.id) {
        p.fill(snakes[i].color)
        p.rect(snakes[i].x, snakes[i].y, scl, scl)
      }
    }
    snake.draw()
    snake.move()
    var data = {
      x: snake.x,
      y: snake.y,
    // tail: snake.tail,
      points: snake.points,
      color: snake.color
    }
  // console.log('Updated Snake', data)
    socket.emit('update', data)
  }

  window.onresize = function () {
    canvas.size(window.innerWidth, window.innerHeight)
  }

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

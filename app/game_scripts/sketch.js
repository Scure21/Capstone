import Food from './food'
import Snake from './snake'
import store from '../store'
import { getSnakes } from '../reducers/snakes'

export default function sketch (p) {
  var users
  var socket
  var snakes = {}
  var canvas
  var foods = []
  var countAlive
  var winnerSnake
  var greenSnake
  var yellowSnake
  var blueSnake
  var purpleSnake
  var img
  var apple
  var banana
  var carrot
  var coconut
  var grape
  var lemon
  var orange
  var watermelon
  var gameOver


  p.preload = function () {
    // Snakes body images
    greenSnake = p.loadImage('images/snakes_images/greenBodyStraight.png')
    blueSnake = p.loadImage('images/snakes_images/blueBodyStraight.png')
    yellowSnake = p.loadImage('images/snakes_images/yellowBodyStraight.png')
    purpleSnake = p.loadImage('images/snakes_images/purpleBodyStraight.png')

    // Fruits images
    apple = p.loadImage('images/fruits/Apple.png')
    banana = p.loadImage('images/fruits/Banana.png')
    carrot = p.loadImage('images/fruits/Carrot.png')
    coconut = p.loadImage('images/fruits/Coconut.png')
    grape = p.loadImage('images/fruits/Grape.png')
    lemon = p.loadImage('images/fruits/Lemon.png')
    orange = p.loadImage('images/fruits/Orange.png')
    watermelon = p.loadImage('images/fruits/Watermelon.png')

    // Game Over image
    gameOver = p.loadImage('images/sketch_images/game-over.png')
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    users = props.users
  }

  p.setup = function () {

    canvas = p.createCanvas(1440, 900)
    p.frameRate(10)
    // connect client to the server through sockets
    socket = io.connect(window.location.origin)

        users.forEach(user => {
          let color = user.color
          if (color === 'blue') {
            img = blueSnake
          } else if (color === 'yellow') {
            img = yellowSnake
          } else if (color === 'purple') {
            img = purpleSnake
          } else if (color === 'green') {
            img = greenSnake
          }
          snakes[user.id] = new Snake(p, user.id, user.name, color, img)
        })

        // we are going to have 5 foods on the canvas for all the players
        const fruits = [ apple, banana, carrot, coconut, grape, lemon, orange, watermelon ]

        for (let i = 0; i < 25; i++) {
          const food = new Food(p, fruits)
          foods.push(food)
        }
        // getting users information to display the scores
        store.dispatch(getSnakes(snakes))


   // we get the information from the server of each user movement and we update each user movement
    socket.on('server-dir-update', function ({data, userId}) {
     // get the specific user and update the direction of movement
     // This would need to change because we dont have a single snake anymore, we have an snakes OBJ
      snakes[userId].dir(data.x, data.y)
    })

   // Handle server disconnection, close the socket connection
    socket.on('disconnect', function () {
      socket.close()
    })
  }


// -----------------DRAW-------------------- //
  p.draw = function () {
    p.clear()
    p.background('rgba(10%,10%,10%,0.5)')

    // Draw each snake
    for (let id in snakes) {
      snakes[id].draw(p)
    }
    // Draw the food
    foods.forEach(food => food.draw(p))

    // Loop through all the snakes and run the .eat and .move function
    for (let id in snakes) {
      snakes[id].move(p)
      foods.forEach(food => snakes[id].eat(p, food))
    }

    // detect collisions
    for (let id1 in snakes) {
      var snake1 = snakes[id1]
      for (let id2 in snakes) {
        var snake2 = snakes[id2]
        if (id1 !== id2) {
          snake1.collide(snake2)
        }
      }
    }
    // count how many snakes are still alive (aka "visible")
    //assign 0 only when snakes object is not empty, otherwise there will a GAME OVER msg even before the game begins
    if (Object.keys(snakes).length !== 0){
      countAlive = 0
    }

    for (let id in snakes) {
      if (snakes[id].visible) {
        countAlive++
        winnerSnake = snakes[id]
      }
    }

    p.imageMode(p.CENTER)
    p.textAlign(p.CENTER)
    if (countAlive === 1) {
      // we have a winner!
      p.image(gameOver, p.width/2, (p.height/2))
      p.textSize(60)
      p.fill(winnerSnake.color)
      p.text('The winner is:', p.width / 2, (p.height / 2) + 150)
      p.text(winnerSnake.name, p.width / 2, (p.height / 2) + 210)
    } else if (countAlive === 0) {
      //the 2 remaining snakes colided head-to-head and both died
      p.image(gameOver, p.width/2, (p.height/2))
      p.textSize(60)
      p.fill('yellow')
      p.text('Everyone is dead...', p.width / 2, (p.height / 2) + 150)
    }
  }
}

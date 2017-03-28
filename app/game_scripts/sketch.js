import Food from './food'
import Snake from './snake'
import store from '../store'
import { getSnakes } from '../reducers/snakes'

export default function sketch (p) {
  var socket
  var snakes = {}
  var canvas
  var foods = []
  var colorKey = 0
  var fontRegular = p.loadFont('../../../public/font/Endless-Boss-Battle.tff')

  // p.preload = function () {
  //   fontRegular = p.loadFont('../../../public/font/Endless-Boss-Battle.cff')
  // }

  p.setup = function () {
    canvas = p.createCanvas(800, 600)
    p.frameRate(10)

   // connect client to the server through sockets
    socket = io.connect('http://192.168.1.184:1337')

   // receives device type from server and if it is a mobile, make a new snake
    socket.on('send-device-type', function ({deviceType, users}) {
      console.log('users received on send-device-type', users)
      if (deviceType === 'mobile') {
        // loop through the users array and assign each user a new snake with a color
        var colors = ['blue', 'yellow', 'aqua', 'green']

        users.forEach(user => {
          let color = colors[colorKey]
          // We are assuming that only 4 players will join a room, so we just need 4 colors
          snakes[user] = new Snake(p, user, color)
          if (colorKey === 3) {
            colorKey %= 2
          } else {
            colorKey += 1
          }
        })
        // we are going to have 5 foods on the canvas for all the players
        for (let i = 0; i < 6; i++) {
          const food = new Food(p)
          foods.push(food)
        }
        // getting users information to display the scores
        store.dispatch(getSnakes(snakes))
      }
    })

    // we get the information from the server of each user movement and we update each user movement
    socket.on('server-dir-update', function ({data, userId}) {
     // get the specific user and update the direction of movement
     // This would need to change because we dont have a single snake anymore, we have an snakes OBJ
      snakes[userId].dir(data.x, data.y)
    })
    // Handle user disconnection
    socket.on('user-disconnect', function (userId) {
      delete snakes[userId]
      console.log('on user-disconnect, snakes=', snakes)
      // using close is not working as expected right now. will investigate further when there is time
      // socket.close()
    })

    // Handle server disconnection, close the socket connection
    socket.on('disconnect', function () {
      socket.close()
    })
  }

// -----------------DRAW-------------------- //
  p.draw = function () {
    p.background(51)

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
    let countAlive = 0
    let winnerName
    for (let id in snakes) {
      if (snakes[id].visible) {
        countAlive++
        winnerName = snakes[id].name
      }
    }
    if (countAlive === 1) {
      // we have a winner!
      p.textAlign(p.CENTER)
      p.textSize(80)
      p.textFont(fontRegular)
      p.text('GAME OVER', p.width / 2, p.height / 2)
      console.log('and winner is..', winnerName, 'countAlive', countAlive)
    }
  }
}

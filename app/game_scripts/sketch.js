import Food from './food'
import Snake from './snake'
import {scl} from './utils'
import store from '../store'
import { getSnakes } from '../reducers/snakes'

export default function sketch (p) {
 var socket
 var snakes = {}
 var canvas
 var foods = []
 var device

 p.setup = function () {
   canvas = p.createCanvas(600, 600)
   p.frameRate(10)
   // connect client to the server through sockets
   socket = io.connect('http://192.168.1.184:1337')

   // // get the device type
   // device = window.navigator.userAgent
   // // on connection, emit to the server the device type
   // socket.emit('check-device-type', device)

   // receives device type from server and if it is a mobile, make a new snake
   socket.on('send-device-type', function ({deviceType, users}) {
     if (deviceType === 'mobile') {
       // loop through the users array and assign each user a new snake
       users.forEach(user => { snakes[user] = new Snake(null, null, p) })
       console.log('I AM A MOBILE IN SKETCH!!', snakes)
       // we are going to have 5 foods on the canvas for all the players
       for (let i = 0; i < 6; i++) {
         const food = new Food(p)
         foods.push(food)
       }
       // getting users information to display the scores
       let _snakes = []
       for (var id in snakes) {
         _snakes.push(snakes[id])
       }
       store.dispatch(getSnakes(_snakes))
     }
   })

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
 }
}

// In case we need it tomorrow otherwise we can just delete it
// p.keyPressed = function () {
//   if (p.keyCode === p.UP_ARROW) {
//     snake.dir(dir)
//   } else if (p.keyCode === p.DOWN_ARROW) {
//     snake.dir(0, 1)
//   } else if (p.keyCode === p.RIGHT_ARROW) {
//     snake.dir(1, 0)
//   } else if (p.keyCode === p.LEFT_ARROW) {
//     snake.dir(-1, 0)
//   }
// }

const chalk = require('chalk')

module.exports = function (io) {
  const foods = {}
  function Food (x, y) {
    this.x = x
    this.y = y
  }
  const snakes = {}
  function SnakeInfo (x, y, color, tail, points) {
    this.x = x
    this.y = y
    this.color = color
    this.tail = tail
    this.points = points
  }

  // use socket server as an event emitter in order to listen for new connctions
  io.sockets.on('connection', function (socket) {
    console.log(chalk.yellow('We have a new user: ' + socket.id))

    socket.on('start', function (data) {
      const snakeData = data.snakeData
      const foodData = data.foodData
      const snake = new SnakeInfo(snakeData.x, snakeData.y, snakeData.color, snakeData.tail, snakeData.points)
      const food = new Food(foodData.x, foodData.y)
      snakes[socket.id] = snake
      foods[socket.id] = food
      console.log('SERVER DATA', data)
    })

    // update the snake information for specific user everytime they change
    socket.on('clientUpdate', function (data) {
      var snake = snakes[socket.id]
      snake.x = data.snakeUpdatedData.x
      snake.y = data.snakeUpdatedData.y
      snake.tail = data.snakeUpdatedData.tail
      snake.points = data.snakeUpdatedData.points
      snake.color = data.snakeUpdatedData.color

      var food = foods[socket.id]
      food.x = data.foodUpdatedData.x
      food.y = data.foodUpdatedData.y
      io.sockets.emit('serverUpdate', {snakes, foods})
    })

    // handle mobile devices
    socket.on('mobile-device', function (device) {
      console.log('Device', device)
      var connected = true
      if (device) {
        connected = true
        io.sockets.emit('activate-device-controls', connected)
      } else {
        connected = false
        io.sockets.emit('activate-device-controls', connected)
      }
    })

    // receive mobile device information
    socket.on('snake_position_change', function (position) {
      // console.log('SNAKE POSITION', position)
    })

    // event that runs anytime a socket disconnects
    socket.on('disconnect', function () {
      snakes[socket.id] = {}
      console.log('socket id ' + socket.id + ' has disconnected. :(')
    })
  })
}

 /*
  ROOMS: this may work for the rooms of the game, so the players wait for all the people to join the room
  */

  // var drawHistory = {};

  // io.on('connection', function (socket) {

  //     // scope issues
  //     var room = null;

  //     // listens to 37 emit
  //     socket.on('wantToJoinRoomPlox', function (roomName) {
  //         room = roomName;
  //         socket.join(roomName);

  //         if (!drawHistory[roomName]) {
  //             drawHistory[roomName] = [];
  //         }

  //         // console.log('drawhistory: ', drawHistory)
  //         socket.emit('drawHistory', drawHistory[roomName]);
  //     });

  //     socket.on('newDraw', function (start, end, color) {
  //         // data
  //         console.log('new draw', start, end, color)
  //         drawHistory[room].push({ start: start, end: end, color: color });
  //         socket.broadcast.to(room).emit('someoneElseDrew', start, end, color);
  //     });

  // });

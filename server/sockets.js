const chalk = require('chalk')

module.exports = function (io) {
  const foods = []
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
      console.log(chalk.cyan('new snake: ' + socket.id + ' ' + data.x + ' ' + data.y, data.color, data.points))
      const snake = new SnakeInfo(data.x, data.y, data.color, data.tail, data.points)
      const food = new Food(data.foodx, data.foody)
      // data.snake.id = socket.id // In the future we will change the snakes DT to an object with keys being the socket id.
      snakes[socket.id] = snake
      foods.push(food)
      // console.log('inside start event, snakes arr =', snakes)
    })

    // update the x and y values everytime they change
    socket.on('clientUpdate', function (data) {
      var snake
      snake = snakes[socket.id]
      snake.x = data.x
      snake.y = data.y
      snake.tail = data.tail
      snake.points = data.points
      snake.color = data.color
      console.log('UPDATE SNAKES', snakes)
      io.sockets.emit('serverUpdate', snakes)
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
      delete snakes[socket.id]

      console.log('snakes after we deleted the user who\'s about to disconnect', snakes)
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

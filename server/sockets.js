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



    // CW
    // does code below mean the initial snake info is coming as an object from user?
    // shouldn't it be generated (randomly?) by the server side code?

    // OR is the 'start' event emitted by the projector-computer?  (but in that case, where
    // would the data object come from?)

    // you already have some great comments; one place to potentially add more is to describe
    // what these socket events are and where they will be originating (i.e. controller or projector)  Or, maybe a more descriptive name than "start"?  like "newSnake" or "startProjection" or something

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

    // CW --  will other values potentially change too?  If only x and y are changing, then you 
    // don't need to set all those other properties 

    // per our discussion yesterday -- you probably want to make a decision about * where * things are tracked -- the game board state, and the state of each snake.  

    // it seems like potentially instead of 'clientUpdate' you may want something like "playerMove" which could be up, down, right, or left, and you would then have to call a function to update the appropriate snake's x & y coordinates.  That way, the position information stays on the server side. 

    // similarly, on "playerMove", * before * moving the snake, you could check the state of the piece of the game board where the player wants to move.  i.e., if you get "playerMove" with the direction "up", you could run a function that first checks the gameboard at (x, y+1), to see what's there: nothing, food, or danger (another snake, etc).  In the case of nothing, you simply move the snake (update its coordinates and emit that info to projector-computer).  In the case of food, you move the snake AND add the appropriate points.  In the case of danger, the snake loses points (or potentially is faced with game over), and stays where it is (or dies).


    socket.on('clientUpdate', function (data) {    // maybe going to be replaced by code on 93?
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

    // CW what is the purpose of the if/else check?  it will be true as long as there is a device,
    // which it seems like would HAVE to be true for something to try to connect ... ? 
    // also, if you need the check, why do you need to emit anything in the case that it fails? 

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

    //CW -- is this event going to take the place of the clientUpdate event above? 
    socket.on('snake_position_change', function (position) {
      // console.log('SNAKE POSITION', position)
    })

    // event that runs anytime a socket disconnects
    socket.on('disconnect', function () {
      snakes[socket.id] = {}
      console.log('snakes after we deleted the user who\'s about to disconnect', snakes)
      console.log('socket id ' + socket.id + ' has disconnected. :(')
    })
  })
}

// CW -- something to think about -- code below seems to allow users to name their own rooms.  You
// could give users that option, or you could generate a room ID on the server side and pass it 
// to the first user who joins, who will then have to share the room id with the other players.
// It might be simpler to let users name their room -- that way the same view could load for each
// mobile user (simply to enter a room name), and they would probably come up with names that are
// easier to remember and type than random strings/numbers


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

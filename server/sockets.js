const chalk = require('chalk')

module.exports = function (io) {
  // users obj to keep track of all the connected users
    var users = []

  // use socket server as an event emitter in order to listen for new connections
    io.sockets.on('connection', function (socket) {
        console.log(chalk.yellow('We have a new connection: ' + socket.id))

    // Phone user emits to server to be transmitted to projector
        socket.on('user-connected', function(userName){
            console.log('username inside user-connected', userName)
            const userId = socket.id
            io.sockets.emit('server-user-connected', {userName, userId})
        })

    // send users to Int to render their name on the screen
        socket.on('ask-for-users', function(){
            socket.emit('get-current-users', users)
        })

    // update the snake position according the touch event on the mobile screen
        socket.on('user-movement-update', function (data) {
            const userId = socket.id
      // emit the snake information to the sketch and send the socketId so we know which snake to move
            io.sockets.emit('server-dir-update', {data, userId})
        })

    // event that runs anytime a socket disconnects
        socket.on('disconnect', function () {
            console.log(chalk.yellow('socket id ' + socket.id + ' has disconnected. :('))
      // If a user is disconnected, remove it from the users array by checking the socket that's getting disconnected
            users = users.filter(userId => userId !== socket.id)
      // io.sockets.emit('user-disconnect', socket.id)
        })
    })
}

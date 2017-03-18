'use strict'

const {resolve} = require('path')
const chalk = require('chalk')
const pkg = require('./package.json')
const debug = require('debug')(`${pkg.name}:boot`)
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer()
const io = socketio(server)
const nameError =
`*******************************************************************
 You need to give your app a proper name.

 The package name

    ${pkg.name}

isn't valid. If you don't change it, things won't work right.

Please change it in ${__dirname}/package.json
  ~ xoxo, bones
********************************************************************`

// use socket server as an event emitter in order to listen for new connctions
io.on('connection', function (socket) {
  // receives the newly connected socket
  // called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  // event that runs anytime a socket disconnects
  socket.on('disconnect', function () {
    console.log('socket id ' + socket.id + ' has disconnected. : (')
  })

  // server is receiving draw data from the client here
  // so we want to broadcast that data to all other connected clients
  socket.on('imDrawing', function (start, end, color) {
    console.log('catching the draw event here')

    // we need to emit an event all sockets except the socket that originally emitted the
    // the draw data to the server
    // broadcasting means sending a message to everyone else except for the
    // the socket that starts it
    socket.broadcast.emit('otherDraw', start, end, color)
  })
})

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


const reasonableName = /^[a-z0-9\-_]+$/
// RegExp.text docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
if (!reasonableName.test(pkg.name)) {
  console.error(chalk.red(nameError))
}

// This will load a secrets file from
//
//      ~/.your_app_name.env.js
//   or ~/.your_app_name.env.json
//
// and add it to the environment.
// Note that this needs to be in your home directory, not the project's root directory
const env = Object.create(process.env)
  , secretsFile = resolve(env.HOME, `.${pkg.name}.env`)
try {
  Object.assign(env, require(secretsFile))
} catch (error) {
  debug('%s: %s', secretsFile, error.message)
  debug('%s: env file not found or invalid, moving on', secretsFile)
}

const PORT = process.env.PORT || 1337

module.exports = {
  get name() { return pkg.name },
  get isTesting() { return !!global.it },
  get isProduction() {
    return process.env.NODE_ENV === 'production'
  },
  get baseUrl() {
    return env.BASE_URL || `http://localhost:${PORT}`
  },
  get port() {
    return env.PORT || 1337
  },
  package: pkg,
  env,
}

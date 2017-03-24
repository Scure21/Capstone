var socket = io.connect('http://192.168.1.184:1337') 
var device
// device =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

// CW -- so code in this file has been moved from game.html?  I think it's a good idea to 
// keep it in a separate file, but I've already commented on the code in game.html, so I'm not 
// going to copy those comments here

device = window.navigator.userAgent
socket.emit('mobile-device', device)
socket.on('activate-device-controls', function (connected) {
  if (connected) {
    console.log('YES YOU ARE CONNECTED WITH A MOBILE DEVICE')
    var snake_position = {
        x: 0,
        y: 0
      },
      emit_updates = function () {
        socket.emit('snake_position_change', snake_position)
      }
    touchstart = function (e) {
      console.log('THIS IS E', e)
      e.preventDefault()
      if (e) {
          snake_position.event = touchStarted()
        }
      emit_updates()
    },
        touchend = function (e) {
          e.preventDefault()
          snake_position.event = e
          emit_updates()
        },
        devicemotion = function (e) {
          snake_position.event = e
          emit_updates()
        }
    document.body.addEventListener('touchstart', touchstart, false) // iOS & Android
    document.body.addEventListener('MSPointerDown', touchstart, false) // Windows Phone
    document.body.addEventListener('touchend', touchend, false) // iOS & Android
    document.body.addEventListener('MSPointerUp', touchend, false) // Windows Phone
    window.addEventListener('devicemotion', devicemotion, false)
  } else {
        // Failed connection
    alert('Not connected!')
  }
})

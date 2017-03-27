import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'

const socket = io.connect('http://192.168.2.111:1337')
const device = window.navigator.userAgent

export default class Controller extends Component {
  constructor (props) {
    super(props)

    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
  }

  componentDidMount () {
      // when the component mounts on the mobile device, we add the user to the State with a new Snake instance

    socket.emit('check-device-type', device)

        // socket.on('activate-device-controls', function(isPhone) {
        //         console.log('YES YOU ARE CONNECTED WITH A MOBILE DEVICE')
        //         var snake_position = {
        //             x: 0,
        //             y: 0
        //         }

        // })

        var up = document.getElementById('up')
        var down = document.getElementById('down')
        var left = document.getElementById('left')
        var right = document.getElementById('right')

        up.addEventListener('touchstart', this.moveUp, false)
        down.addEventListener('touchstart', this.moveDown, false)
        left.addEventListener('touchstart', this.moveLeft, false)
        right.addEventListener('touchstart', this.moveRight, false)
  }

  moveUp () {
    var data = {
      x: 0,
      y: -1
    }
    socket.emit('user-movement-update', data)
  }

  moveDown () {
    var data = {
      x: 0,
      y: 1
    }
    socket.emit('user-movement-update', data)
  }

  moveLeft () {
    var data = {
      x: -1,
      y: 0
    }
    socket.emit('user-movement-update', data)
  }

  moveRight () {
    var data = {
      x: 1,
      y: 0
    }
    socket.emit('user-movement-update', data)
  }




  render () {
    return (
        <div ref="nv">
            <button id='up' className='ui-btn' className='controller'>
                <span className='glyphicon glyphicon-chevron-up'></span>
            </button>
            <button id='left' className='ui-btn' className="controller">
                    <span className='glyphicon glyphicon-chevron-left'></span>
            </button>
            <button id='right' className='ui-btn' className="controller">
                    <span className='glyphicon glyphicon-chevron-right'></span>
            </button>
            <button id='down' className='ui-btn' className="controller">
                    <span className='glyphicon glyphicon-chevron-down'></span>
            </button>
            <button id='speed' > power </button>
        </div>
    )
  }
}

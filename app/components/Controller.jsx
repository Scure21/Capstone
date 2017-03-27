import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'

const socket = io.connect('http://192.168.1.5:1337')
const device = window.navigator.userAgent

export default class Controller extends Component {
  constructor (props) {
    super(props)

    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.powerUp = this.powerUp.bind(this)
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

        // var up = document.getElementById('up')
        // var down = document.getElementById('down')
        // var left = document.getElementById('left')
        // var right = document.getElementById('right')
        // var power = document.getElementById('speed')

        // up.addEventListener('touchstart', this.moveUp, false)
        // down.addEventListener('touchstart', this.moveDown, false)
        // left.addEventListener('touchstart', this.moveLeft, false)
        // right.addEventListener('touchstart', this.moveRight, false)
        // power.addEventListener('touchstart', this.powerUp, false)
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
      y: 0
    }
    socket.emit('user-movement-update', data)
  }

  moveLeft () {
    var data = {
      x: 0,
      y: 0
    }
    socket.emit('user-movement-update', data)
  }

  moveRight () {
    var data = {
      x: 0,
      y: 0
    }
    socket.emit('user-movement-update', data)
  }

  powerUp () {
    var data = {
      x: 0,
      y: 0
    }
    socket.emit('user-movement-update', data)
  }

  render () {
    return (
        <div ref="nv">
            <button id='up' className='ui-btn' className='controller' onClick={this.moveUp}>
                <span className='glyphicon glyphicon-chevron-up'></span>
            </button>
            <button id='left' className='ui-btn' className="controller" onClick={this.moveLeft} >
                    <span className='glyphicon glyphicon-chevron-left'></span>
            </button>
            <button id='right' className='ui-btn' className="controller" onClick={this.moveRight}>
                    <span className='glyphicon glyphicon-chevron-right'></span>
            </button>
            <button id='down' className='ui-btn' className="controller" onClick={this.moveDown}>
                    <span className='glyphicon glyphicon-chevron-down'></span>
            </button>
            <button id='speed' > power </button>
        </div>
    )
  }
}

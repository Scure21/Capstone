<<<<<<< HEAD
import React, {Component} from 'react'
import io from 'socket.io-client'
var socket = io.connect('http://192.168.0.8:1337')
var device
    device = window.navigator.userAgent


export default class Controller extends Component{

    constructor(props){
        super(props)

        this.moveUp = this.moveUp.bind(this)
        this.moveDown = this.moveDown.bind(this)
        this.moveLeft = this.moveLeft.bind(this)
        this.moveRight = this.moveRight.bind(this)
        this.powerUp = this.powerUp.bind(this)
    }


    componentDidMount(){
        socket.emit('mobile-device', device)
=======
import React, { Component } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://192.168.2.111:1337')
const device = window.navigator.userAgent

export default class Controller extends Component {
  constructor (props) {
    super(props)

    this.state = {x: 0, y:0}
    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
  }

  componentDidMount () {
      // when the component mounts on the mobile device, we add the user to the State with a new Snake instance

    socket.emit('check-device-type', device)
>>>>>>> master

        // socket.on('activate-device-controls', function(isPhone) {
        //         console.log('YES YOU ARE CONNECTED WITH A MOBILE DEVICE')
        //         var snake_position = {
        //             x: 0,
        //             y: 0
        //         }

        // })

<<<<<<< HEAD
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


    moveUp = function(){
        var data = {
                x: 0,
                y: -1
        }
    socket.emit('clientMovementUpdate', data)
    }

    moveDown = function(){
        var snake_position = {
            x: 0,
            y: 0
        }
    socket.emit('clientUpdate', snake_position)
    }

    moveLeft = function(){
        var snake_position = {
            x: 0,
            y: 0
        }
    socket.emit('clientUpdate', snake_position)
    }

    moveRight = function(){
        var snake_position = {
            x: 0,
            y: 0
        }
    socket.emit('clientUpdate', snake_position)
    }

    powerUp = function(){
        var snake_position = {
            x: 0,
            y: 0
        }
    socket.emit('clientUpdate', snake_position)
    }


    render(){
        console.log('socket!!!', socket)
        return (
             <div ref="nv">
                <button className='ui-btn' id='up' className='controller' onClick={this.moveUp}>
                    <span className='glyphicon glyphicon-chevron-up'></span>
                </button>
                <button id='left' className="controller" >
                     <span className='glyphicon glyphicon-chevron-left'></span>
                </button>
                <button id='right' className="controller">
                     <span className='glyphicon glyphicon-chevron-right'></span>
                </button>
                <button id='down' className="controller" >
                     <span className='glyphicon glyphicon-chevron-down'></span>
                </button>
                <button id='speed' > power </button>
                </div>
            )
    }

}



=======
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
    this.setState({
      x: 0,
      y: -1
    })  
    socket.emit('user-movement-update', this.state)
  }

  moveDown () {
    this.setState({
      x: 0,
      y: 1
    })
    socket.emit('user-movement-update', this.state)
  }

  moveLeft () {
    this.setState({
      x: -1,
      y: 0
    })
    socket.emit('user-movement-update', this.state)
  }

  moveRight () {
    this.setState({
      x: 1,
      y: 0
    })
    socket.emit('user-movement-update', this.state)
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
        </div>
    )
  }
}
>>>>>>> master

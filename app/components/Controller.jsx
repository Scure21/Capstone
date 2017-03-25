import React, {Component} from 'react'
import {Link} from 'react-router'
import io from 'socket.io-client' 
var socket = io.connect('http://192.168.2.111:1337')
var device
    device = window.navigator.userAgent
    

export default class Controller extends Component{
    
    constructor(props){
        super(props)

//Setting up socket connection


socket.emit('mobile-device', device)


    socket.on('activate-device-controls', function(connected) {
            if (connected){
                console.log('YES YOU ARE CONNECTED WITH A MOBILE DEVICE')
                var snake_position = {
                    x: 0,
                    y: 0
                }
                document.body.addEventListener('touchstart', touchstart, false) // iOS & Android
                document.body.addEventListener('MSPointerDown', touchstart, false) //Windows Phone
                document.body.addEventListener('touchend', touchend, false) // iOS & Android
                document.body.addEventListener('MSPointerUp',touchend, false) //Windows Phone
            }
        })
        // this.state = {}
         this.moveUp = this.moveUp.bind(this)
         this.moveLeft = this.moveLeft.bind(this)
         this.moveDown = this.moveDown.bind(this)
         this.moveRight = this.moveRight.bind(this)
         this.powerMove = this.powerMove.bind(this)
    }

    
   moveUp = () => {     
        //e.preventDefault()
        console.log('up move')
        //var position
        //position.y = 
       // var position = y + 1;
        var snake_position = {
                    x: 0,
                    y: 0
                }
        socket.emit('snake_position_change', snake_position.x = 1)
        console.log('snake_position_change')
    }
     moveLeft(){
        socket.emit('snake_position_change', snake_position.x = 1)
        console.log('snake_position_change')
     }
       moveDown(){
        socket.emit('snake_position_change', snake_position.x = 1)
        console.log('snake_position_change')
     }
       moveRight(){
        socket.emit('snake_position_change', snake_position.x = 1)
        console.log('snake_position_change')
     }
     powerMove(){
        socket.emit('snake_position_change', snake_position.x = 1)
        console.log('snake_position_change')
     }
    
    render(){
        console.log('socket!!!', socket)
        return (
             <div>
                <button className='ui-btn' id='up' className='controller' onTouchStart={this.moveUp}>
                    <span className='glyphicon glyphicon-chevron-up'></span>
                </button>
                <button id='left' className="controller" onTouchStart={this.moveLeft}>
                     <span className='glyphicon glyphicon-chevron-left'></span>
                </button>
                <button id='right' className="controller" onTouchStart={this.moveRight}>
                     <span className='glyphicon glyphicon-chevron-right'></span>
                </button>
                <button id='down' className="controller" onTouchStart={this.moveDown} >
                     <span className='glyphicon glyphicon-chevron-down'></span>
                </button>
                <button id="speed" onTouchStart={this.powerMove}> power </button>
                </div>
            )
    }

}




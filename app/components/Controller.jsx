import React, { Component } from 'react'
const socket = io.connect(window.location.origin)

export default class Controller extends Component {
  constructor (props) {
    super(props)

    this.state = {x: 0, y: 0}
    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
  }

  componentDidMount () {
    // when the component mounts on the mobile device, we add the user to the State with a new Snake instance
    const up = document.getElementById('up')
    const down = document.getElementById('down')
    const left = document.getElementById('left')
    const right = document.getElementById('right')

    up.addEventListener('touchstart', this.moveUp, false)
    down.addEventListener('touchstart', this.moveDown, false)
    left.addEventListener('touchstart', this.moveLeft, false)
    right.addEventListener('touchstart', this.moveRight, false)
  }

  moveUp () {
    this.setState({x: 0, y: -1})
    socket.emit('user-movement-update', this.state)
  }

  moveDown () {
    this.setState({x: 0, y: 1})
    socket.emit('user-movement-update', this.state)
  }

  moveLeft () {
    this.setState({x: -1, y: 0})
    socket.emit('user-movement-update', this.state)
  }

  moveRight () {
    this.setState({x: 1, y: 0})
    socket.emit('user-movement-update', this.state)
  }

  render () {
    return (
      <div className='main-controller container'>
        <div className='row'>
          <button id='up' className='controller col-sm-offset-4 col-sm-2'>
              <span className='glyphicon glyphicon-chevron-up'></span>
          </button>
          <button id='right' className='controller col-sm-offset-4 col-sm-2'>
                  <span className='glyphicon glyphicon-chevron-right'></span>
          </button>
        </div>
        <div className="row">
          <button id='left' className='controller col-sm-offset-4 col-sm-2'>
                  <span className='glyphicon glyphicon-chevron-left'></span>
          </button>
          <button id='down' className='controller col-sm-offset-4 col-sm-2'>
                  <span className='glyphicon glyphicon-chevron-down'></span>
          </button>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { connect } from 'react-redux'
const socket = io.connect(window.location.origin)

export class Controller extends Component {
    constructor (props) {
        super(props)
        this.state = {x: 0, y: 0}
        this.moveUp = this.moveUp.bind(this)
        this.moveDown = this.moveDown.bind(this)
        this.moveLeft = this.moveLeft.bind(this)
        this.moveRight = this.moveRight.bind(this)
    }

    componentDidMount () {

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
      console.log('Class Props', this.props)
      const user = this.props.user || ''
        return (
      <div className='main-controller container'>
        <div className="welcome-msg">
          <h4 className='yellow'>Welcome, {user.name}</h4>
          <h5 className='yellow'>Your color is <span className={user.color}>{user.color}</span></h5>
        </div>
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

export default connect(state => ({user: state.users.user}))(Controller)

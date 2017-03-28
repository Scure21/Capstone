import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import io from 'socket.io-client'
var socket = io.connect('http://192.168.2.111:1337')

export default class Int extends Component {

  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    browserHistory.push('/game')
  }

  render () {
    return (
      <div>
        <h1>hello</h1>
        <button onClick={this.handleClick}> PLAY </button>
      </div>
    )
  }

componentDidMount(){
  
  socket.emit('ask-for-users')

  socket.on('get-current-users', users => {
    var colors = users.map(function(i){
      return i.colorName
    })
    this.setState({users: users, colors: colors})
  })
}
  
  render(){
   let len = this.state.users.length
   var users = this.state.users
   var color = this.state.colors
      return (
        <div id="waiting-room">
          <h1>WAITING ROOM</h1>
          <li> {this.state.colors && this.state.colors[this.state.colors.length - 1]}</li>
        </div>
      )
  }
}



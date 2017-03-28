import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import io from 'socket.io-client'
var socket = io.connect('http://192.168.2.111:1337')


export default class Int extends Component{
  constructor(props){
      super(props)
      this.state = {
        users: [],
        colors: []
      }
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
    
    //this.tick = this.tick.bind(this)
    //this.update = this.update.bind(this)


  //onSend to recieve update from store

  //update to change state 
  
  
  render(){

   console.log('STATE', this.state)
   let len = this.state.users.length
   console.log('LENGTH', len)
   console.log('HELLO', this.state.users)
   var users = this.state.users
   var color = this.state.colors
   console.log('COLOR', color)
      return (
        <div id="waiting-room">
          <h1>WAITING ROOM</h1>
          <li> {this.state.colors && this.state.colors[this.state.colors.length - 1]}</li>
        </div>
      )
  }


}



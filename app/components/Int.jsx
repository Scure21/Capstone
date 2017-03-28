import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import io from 'socket.io-client'
var socket = io.connect('http://192.168.2.111:1337')



export default class Int extends Component{
  constructor(props){
      super(props)
      this.state = {
        users: []
      }
  }

componentDidMount(){
  
  socket.emit('ask-for-users')

  socket.on('get-current-users', users => {
    console.log('USERS IN INT', users)
    this.setState({users: users})
  })
}
    
    //this.tick = this.tick.bind(this)
    //this.update = this.update.bind(this)


  //onSend to recieve update from store

  //update to change state 
  
  
  render(){

   //console.log('USERPROPS', this.props.users)
      return (
        <div id="waiting-room">
          <h1>WAITING ROOM</h1>
          <h2>{this.state.users.length}</h2>
        </div>
    )
  }


}



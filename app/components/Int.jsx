import React, { Component } from 'react'
import { browserHistory } from 'react-router'
//import io from 'socket.io-client'

// var currUsers;
// const socket = io.connect('http://192.168.0.6:1337')

export default class Int extends Component {

    //this.tick = this.tick.bind(this)
    //this.update = this.update.bind(this)
  
  
  
     
  //    socket.on('ready-to-play', function(users){
  //       console.log("USERS!!!", users)
  //       currUsers = users;
  //       return currUsers;
  //    })
  //    this.setState({users: currUsers});
  //    if (this.state.users.length >= 4){
  //      this.setState({ready: true})
  //    }
  // }


  // tick() {
  //   this.setState({counter: this.state.counter - 1})
  //   if (this.state.counter <= 0){
  //     clearInterval(this.interval)
  //      browserHistory.push('/game')
  //   }
  // }
  
  // if (currUsers && currUsers.length >= 4){
  //      this.interval = setInterval(this.tick, 1000)
  //      this.setState({ready: true})
  //    }
  

  // if (props && props.users.length < 4){
     render(){

   console.log('PROPS', this.props.users)
      return (
  <div id="waiting-room">
    <h1>WAITING ROOM</h1>
  </div>
    )
  }
}
  /*else if (props && props.users.length < 4){
    return (
  <div id="waiting-room">
    <h1>WAITING ROOM</h1>
    <h2>NEW VERSION</h2>
    {/*<p><b id="nums">{this.state.counter}</b></p>*/
//   </div>*/
//     )
//   }

// }



//each time a user logs in it will emit to an on socket in here 


//we want to check with sockets to see how many users have logged in


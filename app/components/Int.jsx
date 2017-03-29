import React, { Component } from 'react'
import { browserHistory } from 'react-router'
var socket = io.connect('http://192.168.2.167:1337')
export var allUsers = []

export default class Int extends Component {

 constructor(props){
     super(props)
     this.state = {
       users: [],
       colors: [],
       ready: false,
       counter: 5,
       next: false
     }
     this.tick = this.tick.bind(this)
     this.handleClick = this.handleClick.bind(this)
 }

 componentDidMount(){
   socket.emit('ask-for-users')
   socket.on('get-current-users', users => {
     var colors = users.map(function(i){
       return i.colorName
     })
     this.setState({users: users, colors: colors})
     if (this.state.users.length === 4){
       allUsers = this.state.users
       this.interval = setInterval(this.tick, 1000)
       this.setState({ready: true})
     }
   })
 }

 tick() {
   this.setState({counter: this.state.counter - 1})
   if (this.state.counter <= 0){
     clearInterval(this.interval)
      browserHistory.push('/game')
   }
 }

 handleClick(){
  this.setState({next: true})
 }

 render(){
       if (this.state.next === false){
         return (
           <div>
       <div id="welcome-page">
           <div id="logo">
             <img src="images/sketch_images/logo.png" className="img-responsive" id="logoName"/>
             <img src="images/sketch_images/banner.png" className="img-responsive" id="banner"/>
             <button id="play" onClick={this.handleClick}></button>
           </div>
         </div>
     </div>
         )
       } else {
         return (
           <div id="waiting-room">
             <h1>WAITING ROOM</h1>
           {this.state.colors.length ?
               <h2>A
             {' ' + this.state.colors[this.state.colors.length - 1]} snake has joined!</h2> : <h2>Waiting for snakes to join...</h2>}
             { this.state.ready ? <p><b id="nums">{this.state.counter}</b></p> : null}
           </div>)
       }
 }
}

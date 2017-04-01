import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

const socket = io.connect(window.location.origin)

class UserLogin extends Component {
 constructor (props) {
   super(props)

   this.state = {
     userName: ''
   }

   this.handleClick = this.handleClick.bind(this)
   this.handleInputChange = this.handleInputChange.bind(this)
 }

 handleClick(){
   socket.emit('user-connected', this.state.userName)
   //browserHistory.push('/controller')
 }

 handleInputChange(evt){
   this.setState({
     userName: evt.target.value
   })
 }

 render () {
   return (
     <div id="main-phone">
       <img src="images/sketch_images/logo.png" className="phone-view img-responsive"/>
       <div id="username">
         <input placeholder="snake name" onChange={this.handleInputChange}></input>
       </div>
       <button id="join" onClick={this.handleClick}> PLAY </button>
     </div>
   )
 }
}

export default UserLogin


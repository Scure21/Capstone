import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import io from 'socket.io-client'
var socket = io.connect('http://192.168.2.167:1337')
const device = window.navigator.userAgent


class UserLogin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount(){
    // when the component mounts on the mobile device, we add the user to the State with a new Snake instance
    socket.emit('check-device-type', device)
  }

  handleClick(){
    socket.emit('set-name', this.state.inputValue)
    browserHistory.push('/controller')
  }

  handleInputChange(evt){
    console.log(evt.target.value)
    this.setState({
      inputValue: evt.target.value
    })
  }

  handleSubmit(evt){
    event.preventDefault();
    this.props.setSnakeName(this.props.selected, this.state.inputValue);
  }

  render () {
    return (
      <div id="main-phone">
        <img src="images/sketch_images/logo.png" className="phone-view img-responsive"/>
        <div id="username">
          <input placeholder="snake name" onChange={this.handleInputChange}></input>
        </div>
        <button onClick={this.handleClick}> JOIN! </button>
      </div>
    )
  }
}

// maybe will use later for Redux
// const mapStateToProps = (state, ownProps) => {
//   return{
//     selected: state.snakes.selected
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return{
//     setSnakeName: function(snake, name){
//       let action = addName(snake, name)
//       return dispatch(action)
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)
export default UserLogin





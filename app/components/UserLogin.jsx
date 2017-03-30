import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
const socket = io.connect(window.location.origin)
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
    socket.emit('check-device-type', device)
  }

  handleClick(){
    socket.emit('set-name', this.state.inputValue)
    browserHistory.push('/controller')
  }

  handleInputChange(evt){
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




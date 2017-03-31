import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
const socket = io.connect(window.location.origin);
const device = window.navigator.userAgent;

// steph fix
const userName;

// make a module to hold the User constructor and import it here and use it

const getUserName = (e) => {userName = e.target.value}
const handleClick = () => {
		socket.emit("set-name", userName);
		browserHistory.push("/controller");
	}

const UserLogin = (users) => (
      <div id="main-phone">
        <img src="images/sketch_images/logo.png" className="phone-view img-responsive"/>
        <div id="username">
          <input placeholder="snake name" onChange={() => getUserName}></input>
        </div>
        <button id="join" onClick={() => handleClick}> PLAY </button>
      </div>
		);

//------------------------------------------------------------------------------------------//
class UserLogin extends Component {
	constructor (props) {
		super(props);
		this.state = {
			inputValue: ""
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount(){
		socket.emit("check-device-type", device);
	}

	handleClick(){
		socket.emit("set-name", this.state.inputValue);
		browserHistory.push("/controller");
	}

	handleInputChange(evt){
		this.setState({
			inputValue: evt.target.value
		});
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
        <button id="join" onClick={this.handleClick}> PLAY </button>
      </div>
		);
	}
}

export default connect(state => ({users: users})(UserLogin)
//export default UserLogin;


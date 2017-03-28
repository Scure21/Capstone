import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'


class Controller extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleClick(){
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
    console.log("******** CURR SNAKE", this.props.selected)
    return (
      <div id="main-phone">
        <img src="images/sketch_images/logo.png" className="phone-view img-responsive"/>
        <div id="username">
          <input placeholder="snake name" onChange={this.handleInputChange}></input>
        </div>
        <button onClick={this.handleClick}> PLAY! </button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return{
    selected: state.snakes.selected
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    setSnakeName: function(snake, name){
      let action = addName(snake, name)
      return dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controller)





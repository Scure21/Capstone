import React, { Component } from 'react'
import { browserHistory } from 'react-router'

// rendering waiting room

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
}

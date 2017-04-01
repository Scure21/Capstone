import React, { Component } from 'react'
import { browserHistory } from 'react-router'

var socket = io.connect(window.location.origin)

export default class WaitingRoom extends Component {

    constructor(props){
        super(props)
        this.state = {
            counter: 5
        }
        this.tick = this.tick.bind(this)
    }

    componentDidMount(){
        if (this.state.users.length === 4){
            this.interval = setInterval(this.tick, 1000)
        }
    }

    tick() {
        this.setState({counter: this.state.counter - 1})
        if (this.state.counter <= 0){
            clearInterval(this.interval)
            browserHistory.push('/game')
        }
    }

    render(){
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

import React, { Component } from 'react'
import { browserHistory } from 'react-router'

var socket = io.connect(window.location.origin)

export default class WaitingRoom extends Component {

    constructor(props){
        super(props)
        this.state = {
            counter: 5,
            ready: false
        }
        this.tick = this.tick.bind(this)
    }

    componentDidMount(){
        if (this.props.users.length === 4){
            this.interval = setInterval(this.tick, 1000)
            this.setState({ready: true})
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
        console.log('Waiting room props', this.props)
        const latestUser = this.props.users.length ? this.props.users: null
        const user = latestUser ? latestUser.slice(latestUser.length - 1, latestUser.length)[0] : ''
        console.log('waiting room user', user)
        return (
    <div id="waiting-room">
        <h1>WAITING ROOM</h1>
        {user ?
        <h2>A <span className={user.color}>{' ' + user.color}</span> snake has joined!</h2> : <h2>Waiting for snakes to join...</h2>}
        { this.state.ready ? <p><b id="nums">{this.state.counter}</b></p> : null}
      </div>)
    }
}

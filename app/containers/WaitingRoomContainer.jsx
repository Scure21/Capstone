import React, {Component} from 'react'
import {connect} from 'react-redux'
import WaitingRoom from '../components/WaitingRoom'

const WaitingRoomContainer = connect(state => ({
    users: state.users.list
}))(WaitingRoom)

export default WaitingRoomContainer

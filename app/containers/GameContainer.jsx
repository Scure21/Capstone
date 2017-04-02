import React, { Component } from 'react'
import Game from '../components/Game'
import { connect } from 'react-redux'

const GameContainer = connect(state => ({
    users: state.users.list
}))(Game)

export default GameContainer

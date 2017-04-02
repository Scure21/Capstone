import React, { Component } from 'react'
import Controller from '../components/Controller'
import { connect } from 'react-redux'


const ControllerContainer = connect(state => ({
    user: state.users.current
}))(Controller)

export default ControllerContainer

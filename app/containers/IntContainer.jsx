import React, {Component} from 'react'
import {connect} from 'react-redux'
import Int from '../components/Int'

const mapStateToProps = (state) => {
  return {
    users: state.users 
  }
}

export default connect(mapStateToProps)(Int)

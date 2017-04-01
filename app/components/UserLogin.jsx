import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { createNewUser } from '../reducers/users'

export const UserLogin = ({device, createNewUser}) => (
      <div id="main-phone">
        <img src="images/sketch_images/logo.png" className="phone-view img-responsive"/>
        <div id="username">
          <input placeholder="snake name" onChange={e => {createNewUser(e.target.value)}}></input>
        </div>
        <button id="join" onClick={() => browserHistory.push('/controller')}> PLAY </button>
      </div>
		)

export default connect(state => ({}),{createNewUser})(UserLogin)


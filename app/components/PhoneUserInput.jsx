import React from 'react'
import { Link } from 'react-router'

export default class PhoneUserInput extends React.Component {
  render () {
    return (
      <div>
        <Link to='/login'>
          <button id="login-btn" name="login"> Login! </button>
        </Link>
        <Link to='/signup'>
          <button id="signup-btn" name="signup"> Sign up! </button>
        </Link>
      </div>
    )
  }
}

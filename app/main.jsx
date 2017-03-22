'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Int from './components/Int'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import SignUpContainer from './components/SignUpContainer'
import Game from './components/Game'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class ExampleApp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      signupModalIsOpen: false,
      loginModalIsOpen: false
    }
    this.openSignupModal = this.openSignupModal.bind(this)
    this.openLoginModal = this.openLoginModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openSignupModal () {
    this.setState({signupModalIsOpen: true})
  }

  openLoginModal () {
    this.setState({modalIsOpen: true})
  }

  closeModal () {
    this.setState({modalIsOpen: false})
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={this.openLoginModal}> Login in! </button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
          <h2 ref="subtitle">Hello</h2>
          <SignUpContainer />
          </Modal>
        </div>
        <div>
          <button onClick={this.openSignupModal}> Sign up! </button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
          <h2 ref="subtitle">Hello</h2>
          <Login />
          </Modal>
        </div>
      </div>
    )
  }
}

export default class AppContainer extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
      <IndexRedirect to="/login"/>
        <Route path="/interstitial" component={Int}/>
        <Route path="/login" component={ExampleApp}/>
        <Route path="/game" component={Game}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

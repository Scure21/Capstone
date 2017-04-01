'use strict'
import React from 'react'
import { Router, Link, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppContainer from './containers/AppContainer'
import Int from './components/Int'
import Login from './components/Login'
import SignUpContainer from './containers/SignUpContainer'
import Game from './components/Game'
import PhoneUserInput from './components/PhoneUserInput'
import Controller from './components/Controller'
import UserLogin from './components/UserLogin'
import { getSnake } from './reducers/snakes'
import { checkDeviceType } from './reducers/device'

function onAppEnter() {
  function detectCurrentDevice () {
    const currentDevice = window.navigator.userAgent
    if (currentDevice.match(/Android/i) ||
      currentDevice.match(/webOS/i) ||
      currentDevice.match(/iPhone/i) ||
      currentDevice.match(/iPad/i) ||
      currentDevice.match(/iPod/i) ||
      currentDevice.match(/BlackBerry/i) ||
      currentDevice.match(/Windows Phone/i)){
        return 'mobile'
    } else {
        return 'projector'
    }
  }
  let device = detectCurrentDevice()
  store.dispatch(checkDeviceType(device))
}

function onIntEnter() {
  console.log('inside onIntEnter')
  const socket = io.connect(window.location.origin)
  socket.on('server-user-connected', function(userName) {
    console.log('server-user-connected', userName)
    store.dispatch(createNewUser(socket.id, userName))
  })
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppEnter}>
        <Route path='/user' component={PhoneUserInput} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUpContainer}/>
        <Route path="/interstitial" component={Int} onEnter={onIntEnter}/>
        <Route path="/userlogin" component={UserLogin} />
        <Route path="/controller" component={Controller}/>
        <Route path="/game" component={Game}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

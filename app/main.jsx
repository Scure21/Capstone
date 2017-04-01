'use strict'
import React from 'react'
import { Router, Link, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppContainer from './containers/AppContainer'
import Home from './components/Home'
import WaitingRoom from './components/WaitingRoom'
import Login from './components/Login'
import SignUpContainer from './containers/SignUpContainer'
import Game from './components/Game'
import PhoneUserInput from './components/PhoneUserInput'
import Controller from './components/Controller'
import UserLogin from './components/UserLogin'
import { getSnake } from './reducers/snakes'
import { checkDeviceType } from './reducers/device'
import { createNewUser, getUser } from './reducers/users'

const socket = io.connect(window.location.origin)

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

function onHomeEnter() {
    socket.on('server-user-connected', function({userName, userId}) {
        store.dispatch(createNewUser(userName, userId))
        const users = store.getState().users
        socket.emit('users-information', users.users)
    })

}

function onControllerEnter() {
    socket.on('user-information', function(user){
        store.dispatch(getUser(user))
    })
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppEnter}>
        <Route path='/user' component={PhoneUserInput} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUpContainer}/>
        <Route path="/home" component={Home} onEnter={onHomeEnter}/>
        <Route path="/waitingroom" component={WaitingRoom}/>
        <Route path="/userlogin" component={UserLogin} />
        <Route path="/controller" component={Controller} onEnter={onControllerEnter}/>
        <Route path="/game" component={Game}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

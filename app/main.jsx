'use strict'
import React from 'react'
import { Router, Link, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppContainer from './containers/AppContainer'
import ProjectorHome from './components/ProjectorHome'
import WaitingRoomContainer from './containers/WaitingRoomContainer'
import Game from './components/Game'
import ControllerContainer from './containers/ControllerContainer'
import UserHome from './components/UserHome'
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

function onHomeProjectorEnter() {
    socket.on('server-user-connected', function({userName, userId}) {
        store.dispatch(createNewUser(userName, userId))
        const users = store.getState().users
        console.log('STORE USERS', users)
        socket.emit('users-information', users.list)
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
        <Route path="/projectorHome" component={ProjectorHome} onEnter={onHomeProjectorEnter}/>
        <Route path="/waitingroom" component={WaitingRoomContainer}/>
        <Route path="/userHome" component={UserHome} />
        <Route path="/controller" component={ControllerContainer} onEnter={onControllerEnter}/>
        <Route path="/game" component={Game}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

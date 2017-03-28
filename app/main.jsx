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
import LandingPage from './components/LandingPage'
import UserLogin from './components/UserLogin'
import { getSnake } from './reducers/snakes'
// import io from 'socket.io-client'
// const socket = io.connect('http://192.168.0.8:1337')

// const onUserLoginEnter = () => {
//   var snake = socket.emit('get-snake')
//   console.log(snake.socket.id)
//   // store.dispatch(getSnake())
// }

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="/landingPage" component={LandingPage}/>
        <Route path='/user' component={PhoneUserInput} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUpContainer}/>
        <Route path="/interstitial" component={Int}/>
        <Route path="/userlogin" component={UserLogin} />
        <Route path="/controller" component={Controller}/>
        <Route path="/game" component={Game}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

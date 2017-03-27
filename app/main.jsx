'use strict'
import React from 'react'
import {dblContainer} from './components/AppContainer'
import {Router, Link, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Int from './components/Int'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import SignUpContainer from './components/SignUpContainer'
import Game from './components/Game'
import ExampleApp from './components/ExampleApp'
import Controller from './components/Controller'
import ScoresContainer from './containers/ScoresContainer'

// If this is not being used, let's just get rid of it
/* const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) => {
    return (
    <div id="parent-div">
      <div id="login children-div">
        <div>
          {user ? <WhoAmI/> : <Login/>}
        </div>
        {children}
      </div>
   </div>
    )
  }
) */

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={dblContainer}>
        <Route path='/exampleApp' component={ExampleApp} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUpContainer}/>
        <Route path="/interstitial" component={Int}/>
        <Route path="/controller" component={Controller}/>
        <Route path="/game" component={Game}/>
        <Route path="/scores" component={ScoresContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

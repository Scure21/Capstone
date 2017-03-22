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

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) => {
    console.log('hello!')
    return (
    <div>
    <div id="login">
      <div>
        {user ? <WhoAmI/> : <Login/>}
      </div>
      {children}
  </div>
  <div id="sign-up">
    <SignUpContainer/>
  </div>
  </div>

  )
  }
)

export default class AppContainer extends React.Component{
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}


/*connect() => function called connectFunc
connectFunc(({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>) */


render (
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

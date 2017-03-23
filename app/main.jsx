'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import MobileDetect from 'mobile-detect'
    var md = new MobileDetect(window.navigator.userAgent);

import store from './store'
import Int from './components/Int'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import SignUpContainer from './components/SignUpContainer'
import Game from './components/Game'
import ExampleApp from './components/ExampleApp'


const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) => {
    console.log('hello!')
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
)





export default class AppContainer extends React.Component{
  
  constructor(props){
    super(props)
      this.state = {
        deviceType: ''
      }
    // this.componentWillMount = this.onAppEnter.bind(this)
  }
  
componentWillMount = () => {
  var deviceType;
  if (!md.mobile()){
    this.setState({deviceType: 'computer'})
  }
  else{
    this.setState({deviceType: 'phone'})
  }
  //console.log()
}

  render(){
    console.log('STAAAATE', this.state)
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}





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

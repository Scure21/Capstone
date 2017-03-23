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
import Controller from './components/Controller'


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
    this.setState({deviceType: 'phone'})
    browserHistory.push('/exampleApp')
  }
  else{
    this.setState({deviceType: 'computer'})
    browserHistory.push('/interstitial')
  }
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

const mapStateToProps = (state, ownProps)=> {
  return{
    auth: state.auth
  }
}

const dblContainer = connect(mapStateToProps)(AppContainer)




render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={dblContainer}>
        <Route path='/exampleApp' component={ExampleApp} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUpContainer}/>
        <Route path="/interstitial" component={Int}/>
        <Route path="/game" component={Game}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

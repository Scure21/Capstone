import React from 'react'
import MobileDetect from 'mobile-detect'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import UserLogin from '../components/UserLogin'
import LandingPage from '../components/LandingPage'

const md = new MobileDetect(window.navigator.userAgent)

class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceType: ''
    }
  }

  componentWillMount () {
    if (!md.mobile()) {
      this.setState({deviceType: 'computer'})
      browserHistory.push('/LandingPage')
    } else {
      this.setState({deviceType: 'phone'})
      browserHistory.push('/userlogin')
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(AppContainer)

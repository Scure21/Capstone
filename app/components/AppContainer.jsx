import React from 'react'
import MobileDetect from 'mobile-detect'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'

const md = new MobileDetect(window.navigator.userAgent)

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceType: ''
    }
  }

  componentWillMount () {
    if (!md.mobile()) {
      this.setState({deviceType: 'computer'})
    } else {
      this.setState({deviceType: 'phone'})
      browserHistory.push('/controller')
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
        <Link to={'/game'}><button>click me!</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}
export const dblContainer = connect(mapStateToProps)(AppContainer)

import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { checkDeviceType } from '../reducers/device'

const device = window.navigator.userAgent

export class AppContainer extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        const deviceType = this.props.checkDeviceType(device)
        if (deviceType === 'mobile' ) {
            browserHistory.push('/userlogin')
        } else if (deviceType === 'projector') {
            browserHistory.push('/interstitial')
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

export default connect(state => ({}), {checkDeviceType})(AppContainer)

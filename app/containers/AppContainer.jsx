import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { checkDeviceType } from '../reducers/device'


export class AppContainer extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        const deviceType = this.props.device
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

export default connect(state => ({device: state.device}))(AppContainer)

import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export class AppContainer extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        const deviceType = this.props.device
        if (deviceType === 'mobile' ) {
            browserHistory.push('/userHome')
        } else if (deviceType === 'projector') {
            browserHistory.push('/projectorHome')
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

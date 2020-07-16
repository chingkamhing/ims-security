import React from 'react'
import { connect } from 'react-redux'
import LockReader from './LockReader'
import LockInitializer from './LockInitializer'
import AuthenTokenInitializer from './AuthenTokenInitializer'
import ManagementKeyInfo from './ManagementKeyInfo'
import { selectHardwareKeySelected } from '../../../../store/reducers'
import actions from '../../../../actions'
import { KEY_USAGE } from '../../../../constants'

const mapStateToProps = state => ({
    hardwareKeySelected: selectHardwareKeySelected(state),
})

const mapDispatchToProps = dispatch => ({
    onHardwareKeyTabSelect: (eventKey) => {
        dispatch(actions.changeHardwareKeyTabSelect(eventKey))
    },
})

class ManagementKey extends React.PureComponent {
    render() {
        const { hardwareKeySelected } = this.props
        const { usage } = hardwareKeySelected
        switch (usage) {
            case KEY_USAGE.LOCK_READER:
                return <LockReader />
            case KEY_USAGE.LOCK_INITIALIZER:
                return <LockInitializer />
            case KEY_USAGE.AUTHEN_TOKEN_INITIALIZER:
                return <AuthenTokenInitializer />
            default:
                break
        }
        return <ManagementKeyInfo />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagementKey)

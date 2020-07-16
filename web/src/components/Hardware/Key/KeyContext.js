import React from 'react'
import { connect } from 'react-redux'
import { selectHardwareKeySelected } from '../../../store/reducers'
import AccessKey from './AccessKey'
import ManagementKey from './ManagementKey'
import { KEY_TYPE } from '../../../constants'

const mapStateToProps = state => ({
    hardwareKeySelected: selectHardwareKeySelected(state),
})

class KeyContext extends React.PureComponent {
    render() {
        const { hardwareKeySelected } = this.props
        if (hardwareKeySelected) {
            const { type } = hardwareKeySelected
            if (type === KEY_TYPE.ACCESS) {
                return <AccessKey />
            } else if (type === KEY_TYPE.MANAGEMENT) {
                return <ManagementKey />
            }
        }
        return null
    }
}

export default connect(mapStateToProps, null)(KeyContext)

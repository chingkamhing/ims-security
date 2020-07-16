import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import * as moment from 'moment'
import DataTable from '../../../../DataTable'
import { selectHardwareKeySelected } from '../../../../../store/reducers'
import { CONF } from '../../../../../constants'

// table title
const TITLE = 'Initialized Lock Activity'

// rack list table column definitions
const COLUMNS = [
    {
        title: 'Device Name',
        field: 'lock',
    },
    {
        title: 'Date/Time',
        field: 'datetime',
        render: rowData => moment(new Date(rowData.datetime * 1000)).format(CONF.DATETIME_FORMAT),
        customFilterAndSearch: (term, rowData) => moment(new Date(rowData.datetime * 1000)).format(CONF.DATETIME_FORMAT).includes(term),
    },
]

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
})

const mapStateToProps = state => ({
    selectedKey: selectHardwareKeySelected(state),
})

class LockInitializerContextActivity extends React.PureComponent {
    render() {
        const { selectedKey } = this.props
        const { usageInfo } = selectedKey
        return (
            <DataTable
                title={TITLE}
                columns={COLUMNS}
                data={usageInfo.history}
                getRowId={data => data.serialNumber}
                options={{
                    search: true,
                    sorting: true,
                    filtering: true,
                    pageSize: CONF.UI_PAGE_SIZE,
                }}
            />
        )
    }
}

export default connect(mapStateToProps, null)(withStyles(styles)(LockInitializerContextActivity))

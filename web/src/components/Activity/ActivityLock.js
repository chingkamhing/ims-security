import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import * as moment from 'moment'
import DataTable from '../DataTable'
import { selectActivityLockList, selectLocationPath } from '../../store/reducers'
import { CONF } from '../../constants'

// table title
const TITLE = 'Lock Activity'

const useStyles = makeStyles({
    paper: {
        width: '100%',
    },
})

const defaultColumns = (locationPathObject) => ([
    {
        title: 'Date/Time',
        field: 'datetime',
        defaultSort: 'desc',
        render: rowData => moment(new Date(rowData.datetime * 1000)).format(CONF.DATETIME_FORMAT),
        customFilterAndSearch: (term, rowData) => moment(new Date(rowData.datetime * 1000)).format(CONF.DATETIME_FORMAT).includes(term),
    },
    {
        title: 'Lock Name',
        field: 'lockName',
    },
    {
        title: 'Lock Serial Number',
        field: 'lockSerialNumber',
    },
    {
        title: 'Lock Location',
        field: 'lockLocationId',
        render: rowData => locationPathObject[rowData.lockLocationId] || '',
        customFilterAndSearch: (term, rowData) => (locationPathObject[rowData.lockLocationId] || '').includes(term),
    },
    {
        title: 'Key Name',
        field: 'keyName',
    },
    {
        title: 'Key Serial Number',
        field: 'keySerialNumber',
    },
    {
        title: 'User Name',
        field: 'userName',
    },
    {
        title: 'Description',
        field: 'description',
        sorting: false,
    },
])

const ActivityLock = (props) => {
    const activityLogs = useSelector(selectActivityLockList)
    const locationPathObject = useSelector(selectLocationPath)
    const classes = useStyles()
    // must save columns array in state to avoid recreating every time passing to DataTable or the filter input will be cleared upon every data update
    const [columns, setColumns] = React.useState(defaultColumns(locationPathObject))
    React.useEffect(() => {
        setColumns(defaultColumns(locationPathObject))
    }, [locationPathObject])
    return (
        <Paper className={classes.paper}>
            <DataTable
                title={TITLE}
                columns={columns}
                data={activityLogs}
                getRowId={data => data.datetime}
                options={{
                    search: true,
                    sorting: true,
                    filtering: true,
                    pageSize: CONF.UI_PAGE_SIZE,
                    // export to CSV
                    exportButton: true,
                    exportAllData: true,
                }}
            />
        </Paper>
    )
}
        
export default ActivityLock

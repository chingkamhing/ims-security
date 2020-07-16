import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import * as moment from 'moment'
import DataTable from '../DataTable'
import { selectActivitySystemList } from '../../store/reducers'
import { CONF } from '../../constants'

// table title
const TITLE = 'System Activity'

const useStyles = makeStyles({
    paper: {
        width: '100%',
    },
})

const ActivitySystem = (props) => {
    const activityLogs = useSelector(selectActivitySystemList)
    const classes = useStyles()
    // must save columns array in state to avoid recreating every time passing to DataTable or the filter input will be cleared upon every data update
    const [columns] = React.useState([
        {
            title: 'Date/Time',
            field: 'datetime',
            defaultSort: 'desc',
            width: '15em',
            render: rowData => moment(new Date(rowData.datetime * 1000)).format(CONF.DATETIME_FORMAT),
            customFilterAndSearch: (term, rowData) => moment(new Date(rowData.datetime * 1000)).format(CONF.DATETIME_FORMAT).includes(term),
        },
        {
            title: 'Description',
            field: 'description',
            sorting: false,
        },
    ])
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
        
export default ActivitySystem

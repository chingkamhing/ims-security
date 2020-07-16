import React from 'react'
import { useSelector } from 'react-redux'
import * as moment from 'moment'
import DataTable from '../../DataTable'
import { selectHardwareKeySelectedRowActivity, selectLocationPath } from '../../../store/reducers'
import { CONF } from '../../../constants'

// table title
const TITLE = 'Key Activity'

const KeyActivity = () => {
    const selectedRowHistory = useSelector(selectHardwareKeySelectedRowActivity)
    const locationPathObject = useSelector(selectLocationPath)
    const columns = [
        {
            title: 'Time',
            field: 'datetime',
            render: rowData => moment(new Date(rowData.datetime * 1000)).format(CONF.DATETIME_FORMAT),
            customFilterAndSearch: (term, rowData) => moment(new Date(rowData.datetime * 1000)).format(CONF.DATETIME_FORMAT).includes(term),
        },
        {
            title: 'Key Name',
            field: 'keyName',
        },
        {
            title: 'Lock Name',
            field: 'lockName',
        },
        {
            title: 'Location',
            field: 'locationId',
            render: rowData => locationPathObject[rowData.locationId] || '',
            customFilterAndSearch: (term, rowData) => (locationPathObject[rowData.locationId] || '').includes(term),
        },
        {
            title: 'Description',
            field: 'description',
        },
    ]
    return (
        <DataTable
            title={TITLE}
            columns={columns}
            data={selectedRowHistory}
            getRowId={data => data.id}
            options={{
                search: true,
                sorting: true,
                filtering: true,
                pageSize: CONF.UI_PAGE_SIZE,
            }}
        />
    )
}

export default KeyActivity

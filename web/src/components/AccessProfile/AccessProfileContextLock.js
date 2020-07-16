import React from 'react'
import DataTable from '../DataTable'
import { CONF } from '../../constants'

// table title
const TITLE = 'Locks'

const AccessProfileContextLock = ({selectedRowLocks, locationPathObject, scopePathObject}) => {
    const columns = [
        {
            title: 'Name',
            field: 'name',
        },
        {
            title: 'Device Name',
            field: 'serialNumber',
        },
        {
            title: 'Location',
            field: 'locationId',
            render: rowData => locationPathObject[rowData.locationId] || '',
            customFilterAndSearch: (term, rowData) => (locationPathObject[rowData.locationId] || '').includes(term),
        },
        {
            //FIXME, remove scope first
            hidden: true,
            title: 'Scope',
            field: 'scopeId',
            render: rowData => scopePathObject[rowData.scopeId] || '',
            customFilterAndSearch: (term, rowData) => (scopePathObject[rowData.scopeId] || '').includes(term),
        },
    ]
    return (
        <DataTable
            title={TITLE}
            columns={columns}
            data={selectedRowLocks}
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

export default AccessProfileContextLock

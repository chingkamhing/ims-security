import React from 'react'
import { useSelector } from 'react-redux'
import DataTable from '../../../DataTable'
import { selectHardwareKeySelectedRowLocks, selectLocationPath, selectScopePath } from '../../../../store/reducers'
import { CONF } from '../../../../constants'

// table title
const TITLE = 'Locks'

const AccessKeyContextLock = () => {
    const selectedRowLocks = useSelector(selectHardwareKeySelectedRowLocks)
    const locationPathObject = useSelector(selectLocationPath)
    const scopePathObject = useSelector(selectScopePath)
    const columns = [
        {
            title: 'Name',
            field: 'name',
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
        {
            title: 'Device Name',
            field: 'serialNumber',
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

export default AccessKeyContextLock

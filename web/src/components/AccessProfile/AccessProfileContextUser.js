import React from 'react'
import DataTable from '../DataTable'
import { CONF } from '../../constants'

// table title
const TITLE = 'Users'

const AccessProfileContextUser = ({selectedRowUsers, locationPathObject, scopePathObject}) => {
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
            title: 'Company',
            field: 'company',
        },
    ]
    return (
        <DataTable
            title={TITLE}
            columns={columns}
            data={selectedRowUsers}
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

export default AccessProfileContextUser

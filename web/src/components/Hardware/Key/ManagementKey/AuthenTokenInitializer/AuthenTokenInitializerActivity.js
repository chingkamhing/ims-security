import React from 'react'
import { useSelector } from 'react-redux'
import DataTable from '../../../../DataTable'
import { selectHardwareKeySelectedRowUsers, selectLocationPath, selectScopePath } from '../../../../../store/reducers'
import { CONF } from '../../../../../constants'

//FIXME, don't know what is in the authen token yet

// table title
const TITLE = 'Authen Token Activity'

const AuthenTokenInitializerActivity = () => {
    const selectedRowUsers = useSelector(selectHardwareKeySelectedRowUsers)
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

export default AuthenTokenInitializerActivity

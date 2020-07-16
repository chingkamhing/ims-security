import React from 'react'
import { useSelector } from 'react-redux'
import DataTable from '../../../../DataTable'
import { selectHardwareKeySelected, selectUser, selectLocationPath, selectScopePath } from '../../../../../store/reducers'
import { CONF, KEY_USAGE } from '../../../../../constants'

// table title
const TITLE = 'Users'

const LockInitializerContextUser = () => {
    const managementKey = useSelector(selectHardwareKeySelected)
    const userObject = useSelector(selectUser)
    const locationPathObject = useSelector(selectLocationPath)
    const scopePathObject = useSelector(selectScopePath)
    const { usage, users, usageInfo } = managementKey || {}
    // management key of lock initialier: users context table column definitions
    const columns = [
        {
            title: 'Name',
            field: 'name',
        },
        {
            title: 'Location',
            field: 'locationPath',
        },
        {
            //FIXME, remove scope first
            hidden: true,
            title: 'Scope',
            field: 'scopePath',
        },
        {
            title: 'Company',
            field: 'company',
        },
    ]
    const data = users.reduce((users, user) => {
        const { name, locationId, scopeId, company } = userObject[user]
        return users.concat({
            name,
            locationPath: locationPathObject[locationId],
            scopePath: scopePathObject[scopeId],
            company,
        })
    }, [])
    return (usage === KEY_USAGE.LOCK_INITIALIZER) && usageInfo ? (
        <DataTable
            title={TITLE}
            columns={columns}
            data={data}
            getRowId={data => data.id}
            options={{
                search: true,
                sorting: true,
                filtering: true,
                pageSize: CONF.UI_PAGE_SIZE,
            }}
        />
    ) : (
        null
    )
}

export default LockInitializerContextUser

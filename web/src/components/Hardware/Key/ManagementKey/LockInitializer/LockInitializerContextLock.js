import React from 'react'
import { useSelector } from 'react-redux'
import DataTable from '../../../../DataTable'
import { selectHardwareKeySelected, selectLock, selectLocationPath, selectScopePath } from '../../../../../store/reducers'
import { CONF, KEY_USAGE } from '../../../../../constants'

// table title
const TITLE = 'Locks'

const LockInitializerContextLock = () => {
    const managementKey = useSelector(selectHardwareKeySelected)
    const lockObject = useSelector(selectLock)
    const locationPathObject = useSelector(selectLocationPath)
    const scopePathObject = useSelector(selectScopePath)
    const { usage, locks, usageInfo } = managementKey || {}
    // management key of lock initialier: locks context table column definitions
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
            field: 'locationPath',
        },
        {
            //FIXME, remove scope first
            hidden: true,
            title: 'Scope',
            field: 'scopePath',
        },
    ]
    const data = locks.reduce((locks, lock) => {
        const { name, serialNumber, locationId, scopeId } = lockObject[lock]
        return locks.concat({
            name,
            serialNumber,
            locationPath: locationPathObject[locationId],
            scopePath: scopePathObject[scopeId],
        })
    }, [])
    return (usage === KEY_USAGE.LOCK_INITIALIZER) && usageInfo ? (
        <DataTable
            title={TITLE}
            columns={columns}
            data={data}
            getRowId={data => data.serialNumber}
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

export default LockInitializerContextLock

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddToQueueIcon from '@material-ui/icons/AddToQueue'
import DataTable from '../../DataTable'
import ConfirmModal from '../../ConfirmModal'
import { selectMyselfPrivileges, selectHardwareKeyManagerSelected, selectKey } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'

// key manager port table
const KeyManagerContextPort = () => {
    const privileges = useSelector(selectMyselfPrivileges)
    const keyManagerSelected = useSelector(selectHardwareKeyManagerSelected)
    const keyObject = useSelector(selectKey)
    const dispatch = useDispatch()
    const columns = [
        {
            title: 'Port Number',
            field: 'portNumber',
        },
        {
            title: 'Key Serial No.',
            field: 'serialNumber',
            emptyValue: () => <i>&#60;Empty&#62;</i>,
        },
        {
            title: 'Registered',
            field: 'registered',
        },
    ]
    const { ports=[] } = keyManagerSelected
    const data = ports.reduce((dataPorts, port, index) => {
        return dataPorts.concat({
            portNumber: index + 1,
            serialNumber: port,
            registered: port ? (keyObject[port] ? 'Registered' : 'Not-registered') : '-',
        })
    }, [])
    const handleRegister = (_, rowData) => {
        // prepare the keys to register with the server
        const keys = [rowData.serialNumber]
        dispatch(actions.registerKey(keys))
    }
    const getActions = (confirm) => {
        const actions = []
        if (privilege.hasCreateResources(privileges)) {
            actions.push(
                (rowData) => ({
                    icon: () => <AddToQueueIcon />,
                    tooltip: 'Register Key',
                    onClick: confirm(
                        handleRegister,
                        'Confirm Register Key',
                        `Register key "${rowData.name}"?`,
                    ),
                    disabled: (!rowData.serialNumber || Boolean(keyObject[rowData.serialNumber])),
                }),
            )
        }
        return actions
    }
    return (ports.length > 0) ? (
        <ConfirmModal>
            {confirm => (
                <DataTable
                    columns={columns}
                    data={data}
                    getRowId={data => data.portNumber}
                    actions={getActions(confirm)}
                    options={{
                        showTitle: false,
                        search: false,
                        toolbar: false,
                        paging: false,
                        sorting: true,
                        filtering: true,
                        pageSize: ports.length,
                        // put action column to last column
                        actionsColumnIndex: -1,
                    }}
                />
            )}
        </ConfirmModal>
    ) : (
        null
    )
}

export default KeyManagerContextPort

import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
    CircularProgress,
    Paper,
} from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import {
    ICON_TITLE,
    Offline,
    Online,
    Registered,
    NotRegistered,
} from '../../Common'
import DataTable from '../../DataTable'
import ConfirmModal from '../../ConfirmModal'
import KeyManagerEdit, { DIALOG_OPERATION } from './KeyManagerEdit'
import KeyManagerContext from './KeyManagerContext'
import { selectMyselfPrivileges, selectKeyManagerList, selectHardwareKeyManagerSelectedRow, selectLocationPath, selectHardwareKeyManagerSelected, selectIsUpdatingKeyManager, selectIsDeregisteringKeyManager } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'
import { CONF } from '../../../constants'

// table title
const TITLE = 'Key Manager'

const styles = theme => ({
    paper: {
        width: '100%',
    },
    fabProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        zIndex: 1,
    },
})

const mapStateToProps = state => ({
    privileges: selectMyselfPrivileges(state),
    hardwareKeyManagers: selectKeyManagerList(state),
    hardwareKeyManagerSelectedRow: selectHardwareKeyManagerSelectedRow(state),
    locationPathObject: selectLocationPath(state),
    hardwareKeyManagerSelected: selectHardwareKeyManagerSelected(state),
    isUpdatingKeyManager: selectIsUpdatingKeyManager(state),
    isDeregisteringKeyManager: selectIsDeregisteringKeyManager(state),
})

const mapDispatchToProps = dispatch => ({
    onKeyManagerSelectedRow: (selectedRow) => {
        dispatch(actions.changeHardwareKeyManagerSelectedRow(selectedRow))
    },
    onKeyManagerRegister: (keyManager) => {
        // register key manager
        const serialNumbers = [{...keyManager}]
        dispatch(actions.registerKeyManager(serialNumbers))
    },
    onKeyManagerUpdate: (keyManager) => {
        // update key manager
        const serialNumbers = [{...keyManager}]
        dispatch(actions.updateKeyManager(serialNumbers))
    },
    onKeyManagerDeregister: (keyManager) => {
        // deregister key manager
        const serialNumbers = [keyManager.serialNumber]
        dispatch(actions.deregisterKeyManager(serialNumbers))
    },
})

// must save columns array in state to avoid recreating every time passing to DataTable or the filter input will be cleared upon every data update
const prepareColumns = (locationPathObject) => ([
    {
        title: 'Name',
        field: 'name',
    },
    {
        title: 'Serial No.',
        field: 'serialNumber',
    },
    {
        title: 'Location',
        field: 'locationId',
        render: rowData => locationPathObject[rowData.locationId] || '',
        customFilterAndSearch: (term, rowData) => (locationPathObject[rowData.locationId] || '').includes(term),
    },
    {
        title: 'Register Status',
        field: 'registered',
        width: CONF.UI_COLUMN_ICON_WIDTH,
        headerStyle: {
            textAlign: 'center',
        },
        cellStyle: {
            textAlign: 'center',
        },
        render: rowData => rowData.registered ? <Registered />: <NotRegistered />,
        lookup: { true: ICON_TITLE.REGISTERED, false: ICON_TITLE.NOT_REGISTERED },
    },
    {
        title: 'On-line Status',
        field: 'online',
        width: CONF.UI_COLUMN_ICON_WIDTH,
        headerStyle: {
            textAlign: 'center',
        },
        cellStyle: {
            textAlign: 'center',
        },
        render: rowData => rowData.online ? <Online /> : <Offline />,
        lookup: { true: ICON_TITLE.ON_LINE, false: ICON_TITLE.OFF_LINE },
    },
    {
        title: 'Description',
        field: 'description',
        sorting: false,
    },
])

class KeyManager extends React.PureComponent {
    constructor(props) {
        super(props)
        const { locationPathObject } = props
        this.state = {
            columns: prepareColumns(locationPathObject),
            editItem: null,
            deleteItem: null,
        }
        // data table callback
        this.handleRowSelect = this.handleRowSelect.bind(this)
        // row action callbacks
        this.handleRegisterItem = this.handleRegisterItem.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.handleDeregister = this.handleDeregister.bind(this)
        this.handleSaveItem = this.handleSaveItem.bind(this)
        this.handleCancelItem = this.handleCancelItem.bind(this)
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.isUpdatingKeyManager === true) && (this.props.isUpdatingKeyManager === false)) {
            this.handleCancelItem()
        }
        const { locationPathObject } = this.props
        if (locationPathObject !== prevProps.locationPathObject) {
            this.setState({
                columns: prepareColumns(locationPathObject),
            })
        }
    }

    handleRowSelect(_, selectedRow) {
        const { hardwareKeyManagerSelectedRow } = this.props
        if (selectedRow !== hardwareKeyManagerSelectedRow) {
            this.props.onKeyManagerSelectedRow(selectedRow)
        }
    }

    handleRegisterItem(event, rowData) {
        event.stopPropagation()
        // add key manager, populate the editItem with empty object
        this.setState({
            editItem: {
                _dialogOperation: DIALOG_OPERATION.REGISTER,
                serialNumber: rowData.serialNumber,
            },
        })
    }

    handleEditItem(event, rowData) {
        event.stopPropagation()
        // edit key manager, populate the editItem with currently selected item
        this.setState({
            editItem: {
                _dialogOperation: DIALOG_OPERATION.EDIT,
                ...rowData
            },
        })
    }

    handleDeregister(event, rowData) {
        event.stopPropagation()
        // deregister key manager
        this.setState({
            deleteItem: rowData,
        })
        this.props.onKeyManagerDeregister(rowData)
    }

    handleSaveItem({_dialogOperation, ...saveObject}) {
        // save key manager
        // Q: valid key manager?
        const { name, locationId } = saveObject
        if ((name) && (locationId)) {
            // valid key manager
            switch (_dialogOperation) {
                case DIALOG_OPERATION.REGISTER:
                    this.props.onKeyManagerRegister(saveObject)
                    break
                case DIALOG_OPERATION.EDIT:
                    this.props.onKeyManagerUpdate(saveObject)
                    break
                default:
                    // close the dialog
                    this.handleCancelItem()
                    break
            }
        }
    }

    handleCancelItem() {
        // cancel editing key manager, simply close the dialog
        this.setState({
            editItem: null,
        })
    }

    render() {
        const { privileges, hardwareKeyManagers, hardwareKeyManagerSelected, isUpdatingKeyManager, isDeregisteringKeyManager, classes } = this.props
        const { tableData } = hardwareKeyManagerSelected || {}
        const { columns, editItem, deleteItem } = this.state
        const getActions = (confirm) => {
            const actions = []
            if (privilege.hasCreateManagementResources(privileges)) {
                actions.push(
                    (rowData) => ({
                        icon: () => <AddIcon />,
                        tooltip: 'Register Key Manager',
                        onClick: this.handleRegisterItem,
                        disabled: rowData.registered,
                    }),
                    (rowData) => ({
                        icon: () => <EditIcon />,
                        tooltip: 'Edit Key Manager',
                        onClick: this.handleEditItem,
                        disabled: !rowData.registered,
                    }),
                    (rowData) => ({
                        icon: () => (
                            <>
                                <DeleteIcon />
                                {isDeregisteringKeyManager && (rowData === deleteItem) && <CircularProgress size={48} className={classes.fabProgress} />}
                            </>
                        ),
                        tooltip: 'Deregister Key Manager',
                        onClick: confirm(
                            this.handleDeregister,
                            'Confirm Deregister',
                            `Deregister key manager "${rowData.name}"?`,
                        ),
                        disabled: !rowData.registered,
                    }),
                )
            }
            return actions
        }
        return (
            <Paper className={classes.paper}>
                <ConfirmModal>
                    {confirm => (
                        <DataTable
                            title={TITLE}
                            columns={columns}
                            data={hardwareKeyManagers}
                            getRowId={data => data.serialNumber}
                            onRowClick={this.handleRowSelect}
                            actions={getActions(confirm)}
                            options={{
                                search: true,
                                sorting: true,
                                filtering: true,
                                pageSize: CONF.UI_PAGE_SIZE,
                                // export to CSV
                                exportButton: true,
                                exportAllData: true,
                                // put action column to last column
                                actionsColumnIndex: -1,
                                // highlight the selected row
                                rowStyle: rowData => ({
                                    backgroundColor: (tableData && tableData.id === rowData.tableData.id) ? CONF.BACKGROUND_COLOR_SELECTED_ROW : CONF.BACKGROUND_COLOR_NOT_SELECTED_ROW
                                }),
                            }}
                        />
                    )}
                </ConfirmModal>
                <KeyManagerContext />
                <KeyManagerEdit editItem={editItem} isProcessing={isUpdatingKeyManager} onSave={this.handleSaveItem} onCancel={this.handleCancelItem} />
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(KeyManager))

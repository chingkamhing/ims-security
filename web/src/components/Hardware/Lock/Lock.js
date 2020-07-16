import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
    Button,
    CircularProgress,
    Input,
    Paper,
    Popover,
} from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add"
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import * as Papa from 'papaparse'
import {
    ICON_TITLE,
    Initialized,
    NotInitialized,
} from '../../Common'
import DataTable from '../../DataTable'
import ConfirmModal from '../../ConfirmModal'
import LockInfo from './LockInfo'
import LockDialog, { DIALOG_OPERATION } from './LockDialog'
import { selectMyselfPrivileges, selectLock, selectLockList, selectLocationPath, selectHardwareLockSelectedRow, selectHardwareLockSelectedLocks, selectHardwareLockSelected, selectIsUpdatingLock, selectIsDeregisteringLock } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'
import { CONF } from '../../../constants'

// table title
const TITLE = 'Lock'

const validFields = [ 'Serial No.', 'Name', 'Location', 'Description' ]

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
    hardwareLockObject: selectLock(state),
    hardwareLocks: selectLockList(state),
    locationPathObject: selectLocationPath(state),
    hardwareLockSelectedRow: selectHardwareLockSelectedRow(state),
    hardwareLockSelectedLocks: selectHardwareLockSelectedLocks(state),
    hardwareLockSelected: selectHardwareLockSelected(state),
    isUpdatingLock: selectIsUpdatingLock(state),
    isDeregisteringLock: selectIsDeregisteringLock(state),
})

const mapDispatchToProps = dispatch => ({
    onHardwareLockSelectedRow: (selectedRow) => {
        dispatch(actions.changeHardwareLockSelectedRow(selectedRow))
    },
    onHardwareLockSelectedLocks: (selectedLocks) => {
        dispatch(actions.changeHardwareLockSelectedLocks(selectedLocks))
    },
    onUpdateSave: (items) => {
        dispatch(actions.updateLock(items))
    },
    onCreateSave: (items) => {
        dispatch(actions.registerLock(items))
    },
    onLockDelete: (items) => {
        // deregister lock
        const serialNumbers = items.map((item) => item.serialNumber)
        dispatch(actions.deregisterLock(serialNumbers))
    },
    onError: (message) => {
        dispatch(actions.errorShowMessage(message))
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
        //FIXME, as the server does not support "read initialized lock" yet, remove this feature
        hidden: true,
        title: 'Initi. Status',
        field: 'initialized',
        width: CONF.UI_COLUMN_ICON_WIDTH,
        headerStyle: {
            textAlign: 'center',
        },
        cellStyle: {
            textAlign: 'center',
        },
        render: rowData => rowData.initialized ? <Initialized /> : <NotInitialized />,
        lookup: { true: ICON_TITLE.INITIALIZED, false: ICON_TITLE.NOT_INITIALIZED },
    },
    {
        title: 'Description',
        field: 'description',
        sorting: false,
    },
])

class HardwareLock extends React.PureComponent {
    constructor(props) {
        super(props)
        const { locationPathObject } = props
        this.state = {
            // lock list table column definitions
            columns: prepareColumns(locationPathObject),
            anchorEl: null,
            editItem: null,
            editItems: null,
            saveText: 'Save',
        }
        this.handleRowSelect = this.handleRowSelect.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.handleImportLocksClick = this.handleImportLocksClick.bind(this)
        this.handleImportLocksChange = this.handleImportLocksChange.bind(this)
        this.handleImportLocksClose = this.handleImportLocksClose.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.handleEditAllLocation = this.handleEditAllLocation.bind(this)
        this.handleSaveItem = this.handleSaveItem.bind(this)
        this.handleCancelItem = this.handleCancelItem.bind(this)
        this.handleDeleteItems = this.handleDeleteItems.bind(this)
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.isUpdatingLock === true) && (this.props.isUpdatingLock === false) && (this.state.editItems)) {
            // any more item to edit?
            const otherEditItems = this.state.editItems
            if (otherEditItems.length > 0) {
                // more locks to edit
                const [editItem, ...editItems] = otherEditItems
                this.setState({
                    editItem,
                    editItems,
                    saveText: (editItems.length > 0) ? 'Next' : 'Save',
                })
            } else {
                // close the dialog
                this.handleCancelItem()
            }
        }
        const { locationPathObject } = this.props
        if (locationPathObject !== prevProps.locationPathObject) {
            this.setState({
                // lock list table column definitions
                columns: prepareColumns(locationPathObject),
            })
        }
    }

    handleRowSelect(_, selectedRow) {
        const { hardwareLockSelectedRow } = this.props
        if (selectedRow !== hardwareLockSelectedRow) {
            this.props.onHardwareLockSelectedRow(selectedRow)
        }
    }
    
    handleSelectionChange(selectedLocks) {
        // update selected items
        this.props.onHardwareLockSelectedLocks(selectedLocks)
    }

    handleImportLocksClick(event) {
        event.stopPropagation()
        // click on context menu
        this.setState({
            anchorEl: event.currentTarget,
        })
    }

    handleImportLocksChange(event) {
        event.stopPropagation()
        // import csv file to add locks
        const { hardwareLockObject } = this.props
        const file = event.target.files[0]
        // parse local CSV file
        Papa.parse(file, {
            complete: (results) => {
                const { errors, data } = results
                if (errors.length === 0) {
                    const getFieldIndex = (fields) => {
                        const indexes = validFields.map(f => fields.indexOf(f))
                        if (indexes.every(i => i >= 0)) {
                            return {
                                serialNumber: indexes[0],
                                name: indexes[1],
                                locationId: indexes[2],
                                description: indexes[3],
                            }
                        }
                        return undefined
                    }
                    const [fields, ...rows] = data
                    const fieldIndex = getFieldIndex(fields)
                    if (fieldIndex) {
                        const updateItems = []
                        const createItems = []
                        rows.forEach(row => {
                            const lock = {
                                serialNumber: row[fieldIndex.serialNumber],
                                name: row[fieldIndex.name],
                                locationId: row[fieldIndex.locationId],
                                description: row[fieldIndex.description],
                            }
                            if (hardwareLockObject[lock.serialNumber]) {
                                // already exist in database, update the lock
                                updateItems.push(lock)
                            } else {
                                // not exist in database, create new lock
                                createItems.push(lock)
                            }
                        })
                        this.props.onUpdateSave(updateItems)
                        this.props.onCreateSave(createItems)
                    } else {
                        this.props.onError(`Invalid csv column: "${fields.join('", "')}". Import CSV file should contains: "${validFields.join('", "')}"`)
                    }
                } else {
                    this.props.onError(`Parse csv error: "${errors}"`)
                }
            }
        })
        this.handleImportLocksClose()
    }

    handleImportLocksClose() {
        // close context menu
        this.setState({
            anchorEl: null,
        })
    }

    handleAddItem(event) {
        event.stopPropagation()
        // add lock, populate the editItem with empty object
        this.setState({
            _dialogOperation: DIALOG_OPERATION.EDIT_LOCK,
            editItem: {},
            editItems: [],
            saveText: 'Save',
        })
    }

    handleEditItem(event, rows) {
        event.stopPropagation()
        // edit access profiles, populate the editItems with selected items
        const [editItem, ...editItems] = rows
        this.setState({
            _dialogOperation: DIALOG_OPERATION.EDIT_LOCK,
            editItem,
            editItems,
            saveText: (editItems.length > 0) ? 'Next' : 'Save',
        })
    }

    handleEditAllLocation(event, rows) {
        event.stopPropagation()
        // find the common location
        const locationId = rows.reduce((id, lock) => (
            (id === lock.locationId) ? id : ''
        ), rows[0].locationId)
        // edit all items' location
        this.setState({
            _dialogOperation: DIALOG_OPERATION.EDIT_ALL_LOCATION,
            editItem: { locationId },
            editItems: rows,
            saveText: 'Save',
        })
    }

    handleSaveItem(item) {
        switch (item._dialogOperation) {
            case DIALOG_OPERATION.EDIT_LOCK:
                {
                    // save lock
                    // Q: valid lock?
                    const { serialNumber, name, locationId } = item
                    if ((serialNumber) && (name) && (locationId)) {
                        // valid lock inputs
                        const { hardwareLockObject } = this.props
                        if (hardwareLockObject[serialNumber]) {
                            // already exist in database, update the lock
                            this.props.onUpdateSave([{...item}])
                        } else {
                            // not exist in database, create new lock
                            this.props.onCreateSave([{...item}])
                        }
                    } else {
                        // any more item to edit?
                        const otherEditItems = this.state.editItems
                        if (otherEditItems.length > 0) {
                            // more locks to edit
                            const [editItem, ...editItems] = otherEditItems
                            this.setState({
                                editItem,
                                editItems,
                                saveText: (editItems.length > 0) ? 'Next' : 'Save',
                            })
                        } else {
                            // close the dialog
                            this.handleCancelItem()
                        }
                    }
                }
                break
            case DIALOG_OPERATION.EDIT_ALL_LOCATION:
                {
                    // save locks' location
                    // Q: valid lock?
                    const { editItems } = this.state
                    const { locationId } = item
                    if ((locationId)) {
                        // valid lock location, replace all editItems with the new locationId
                        editItems.forEach(lock => lock.locationId = locationId)
                        // already exist in database, update the lock
                        this.props.onUpdateSave(editItems)
                    } else {
                        // close the dialog
                        this.handleCancelItem()
                    }
                    this.setState({
                        editItems: [],
                    })
                }
                break
            default:
                break
        }
    }

    handleCancelItem() {
        // cancel editing lock, simply close the dialog
        this.setState({
            _dialogOperation: undefined,
            editItem: null,
        })
    }

    handleDeleteItems(event, rows) {
        event.stopPropagation()
        // deregister lock
        this.props.onLockDelete(rows)
    }

    render() {
        const { privileges, hardwareLocks, hardwareLockSelectedRow, hardwareLockSelectedLocks, hardwareLockSelected, isUpdatingLock, isDeregisteringLock, classes } = this.props
        const { anchorEl, columns, _dialogOperation, editItem, saveText } = this.state
        const isMenuOpen = Boolean(anchorEl)
        const getActions = (confirm) => {
            const actions = []
            if (privilege.hasCreateManagementResources(privileges)) {
                actions.push(
                    {
                        isFreeAction: true,
                        icon: () => <CloudUploadIcon />,
                        tooltip: 'Import Locks',
                        onClick: this.handleImportLocksClick,
                    },
                    {
                        isFreeAction: true,
                        icon: () => <AddIcon />,
                        tooltip: 'Add Lock',
                        onClick: this.handleAddItem,
                    },
                    {
                        icon: () => <EditIcon />,
                        tooltip: 'Edit Lock',
                        onClick: this.handleEditItem,
                    },
                    {
                        icon: () => <AccountTreeIcon />,
                        tooltip: 'Edit All Location',
                        onClick: this.handleEditAllLocation,
                    },
                    {
                        icon: () => (
                            <>
                                <DeleteIcon />
                                {isDeregisteringLock && <CircularProgress size={48} className={classes.fabProgress} />}
                            </>
                        ),
                        tooltip: 'Delete Lock',
                        onClick: confirm(
                            this.handleDeleteItems,
                            'Confirm Delete',
                            `Delete lock "${hardwareLockSelectedLocks.map((item) => item.name).join('", "')}"?`,
                        ),
                    },
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
                            data={hardwareLocks}
                            getRowId={data => data.serialNumber}
                            onRowClick={this.handleRowSelect}
                            onSelectionChange={this.handleSelectionChange}
                            actions={getActions(confirm)}
                            options={{
                                search: true,
                                sorting: true,
                                filtering: true,
                                selection: true,
                                pageSize: CONF.UI_PAGE_SIZE,
                                // export to CSV
                                exportButton: true,
                                exportAllData: true,
                                // put action column to last column
                                actionsColumnIndex: -1,
                                // highlight the selected row
                                rowStyle: rowData => ({
                                    backgroundColor: (hardwareLockSelectedRow && hardwareLockSelectedRow.tableData.id === rowData.tableData.id) ? CONF.BACKGROUND_COLOR_SELECTED_ROW : CONF.BACKGROUND_COLOR_NOT_SELECTED_ROW
                                }),
                            }}
                        />
                    )}
                </ConfirmModal>
                <LockInfo lock={hardwareLockSelected} />
                <LockDialog _dialogOperation={_dialogOperation} editItem={editItem} saveText={saveText} isProcessing={isUpdatingLock} onSave={this.handleSaveItem} onCancel={this.handleCancelItem} />
                <Popover
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={this.handleImportLocksClose}
                >
                    <Input
                        id="import-locks-file"
                        type="file"
                        inputProps={{ accept: '.csv, text/csv, .tsv, test/tsv', }}
                        style={{ display: 'none', }}
                        onChange={this.handleImportLocksChange}
                    />
                    <label htmlFor="import-locks-file">
                        <Button component="span"> 
                           Import Locks
                        </Button> 
                    </label>
                </Popover>
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HardwareLock))

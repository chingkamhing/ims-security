import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
    Menu,
    MenuItem,
    Paper,
 } from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import * as moment from 'moment'
import {
    ICON_TITLE,
    Offline,
    Online,
} from '../../Common'
import DataTable from '../../DataTable'
import KeyContext from './KeyContext'
import KeyDialog, { DIALOG_OPERATION } from './KeyDialog'
import { selectMyselfPrivileges, selectKeyList, selectOnlineKeys, selectUser, selectLocationPath, selectHardwareKeySelectedRow, selectIsUpdatingKey, selectIsDeregisteringKey, selectIsProgramming } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'
import { CONF, KEY_TYPE, PRIVILEGE, PROGRAM } from '../../../constants'

// table title
const TITLE = 'Key'

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
    hardwareKeys: selectKeyList(state),
    userObject: selectUser(state),
    onlineKeys: selectOnlineKeys(state),
    locationPathObject: selectLocationPath(state),
    hardwareKeySelectedRow: selectHardwareKeySelectedRow(state),
    isUpdatingKey: selectIsUpdatingKey(state),
    isDeregisteringKey: selectIsDeregisteringKey(state),
    isProgramming: selectIsProgramming(state),
})

const mapDispatchToProps = dispatch => ({
    onHardwareKeySelectedRow: (selectedRow) => {
        dispatch(actions.changeHardwareKeySelectedRow(selectedRow))
    },
    onKeyUpdate: (key) => {
        // update key
        const objects = [{...key}]
        dispatch(actions.updateKey(objects))
        if (Array.isArray(key.accessProfiles) && (key.accessProfiles.length > 0)) {
            // program access profile to an access key
            const programOperation = {
                operation: PROGRAM.DOWNLOAD_ACCESS_PROFILE,
                keySerialNumber: key.serialNumber,
                accessProfileIds: key.accessProfiles,
            }
            dispatch(actions.programKey(programOperation))
        }
    },
    onKeyDeregister: (key) => {
        // deregister key
        const serialNumbers = [key.serialNumber]
        dispatch(actions.deregisterKey(serialNumbers))
    },
    onKeyFactoryReset: (key) => {
        // factory reset key
        const programOperation = {
            operation: PROGRAM.FACTORY_RESET,
            keySerialNumber: key.serialNumber,
        }
        dispatch(actions.programKey(programOperation))
    },
    onProgramValidPeriod: (key, validPeriod) => {
        // program valid period to an access key
        const objects = [{
            serialNumber: key.serialNumber,
            validPeriod,
        }]
        dispatch(actions.updateKey(objects))
    },
    onProgramAccessProfile: (key, accessProfileIds) => {
        // program access profile to an access key
        const programOperation = {
            operation: PROGRAM.DOWNLOAD_ACCESS_PROFILE,
            keySerialNumber: key.serialNumber,
            accessProfileIds,
        }
        dispatch(actions.programKey(programOperation))
    },
    onBeLockReader: (key) => {
        // program a management key to be a lock reader
        const programOperation = {
            operation: PROGRAM.BE_LOCK_READER,
            keySerialNumber: key.serialNumber,
        }
        dispatch(actions.programKey(programOperation))
    },
    onReadAccessHistory: (key) => {
        // read lock access history from access or management key
        const programOperation = {
            operation: PROGRAM.READ_ACCESS_HISTORY,
            keySerialNumber: key.serialNumber,
        }
        dispatch(actions.programKey(programOperation))
    },
    onBeLockInitializer: (key, accessProfileIds) => {
        // program management key to be a lock initializer
        const programOperation = {
            operation: PROGRAM.BE_LOCK_INITIALIZER,
            keySerialNumber: key.serialNumber,
            accessProfileIds,
        }
        dispatch(actions.programKey(programOperation))
    },
    onReadInitializedLock: (key) => {
        // read initialized lock history from management key
        const programOperation = {
            operation: PROGRAM.READ_INITIALIZED_LOCK,
            keySerialNumber: key.serialNumber,
        }
        dispatch(actions.programKey(programOperation))
    },
    onBeAuthenTokenInitializer: (key) => {
        // program management key to be a authen token initializer
        const programOperation = {
            operation: PROGRAM.BE_AUTHEN_TOKEN_INITIALIZER,
            keySerialNumber: key.serialNumber,
            //FIXME, don't know what is needed to initialize authen token
        }
        dispatch(actions.programKey(programOperation))
    },
    onReadInitializedAuthenToken: (key) => {
        // read initialized authen token history from management key
        const programOperation = {
            operation: PROGRAM.READ_AUTHEN_TOKEN,
            keySerialNumber: key.serialNumber,
        }
        dispatch(actions.programKey(programOperation))
    },
})

// must save columns array in state to avoid recreating every time passing to DataTable or the filter input will be cleared upon every data update
const prepareColumns = (locationPathObject, userObject) => ([
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
        title: 'Valid (To)',
        field: 'validPeriodTo',
        render: rowData => moment(new Date(rowData.validPeriod.to * 1000)).format(CONF.DATE_FORMAT),
        customFilterAndSearch: (term, rowData) => moment(new Date(rowData.validPeriod.to * 1000)).format(CONF.DATE_FORMAT).includes(term),
    },
    {
        title: 'Sync Time',
        field: 'syncTime',
        render: rowData => rowData.syncTime && moment(new Date(rowData.syncTime * 1000)).format(CONF.DATETIME_FORMAT),
        customFilterAndSearch: (term, rowData) => moment(new Date(rowData.syncTime * 1000)).format(CONF.DATETIME_FORMAT).includes(term),
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
])

class Key extends React.PureComponent {
    constructor(props) {
        super(props)
        const { locationPathObject, userObject } = props
        this.state = {
            columns: prepareColumns(locationPathObject, userObject),
            dialogItem: null,
            deleteItem: null,
            anchorEl: null,
            contextRow: null,
            menus: [],
        }
        // data table callback
        this.handleRowSelect = this.handleRowSelect.bind(this)
        // context menu callbacks
        this.handleContextMenuClick = this.handleContextMenuClick.bind(this)
        this.handleContextMenuEnter = this.handleContextMenuEnter.bind(this)
        this.handleContextMenuItemClick = this.handleContextMenuItemClick.bind(this)
        this.handleContextMenuClose = this.handleContextMenuClose.bind(this)
        // row action callbacks
        this.handleDialogEditKey = this.handleDialogEditKey.bind(this)
        this.handleDialogDeregister = this.handleDialogDeregister.bind(this)
        this.handleDialogFactoryReset = this.handleDialogFactoryReset.bind(this)
        this.handleSetValidPeriod = this.handleSetValidPeriod.bind(this)
        this.handleDialogDownloadAccessProfile = this.handleDialogDownloadAccessProfile.bind(this)
        this.handleDialogBeLockReader = this.handleDialogBeLockReader.bind(this)
        this.handleDialogReadAccessHistory = this.handleDialogReadAccessHistory.bind(this)
        this.handleDialogBeLockInitializer = this.handleDialogBeLockInitializer.bind(this)
        this.handleDialogReadInitializedLock = this.handleDialogReadInitializedLock.bind(this)
        this.handleDialogBeAuthenTokenInitializer = this.handleDialogBeAuthenTokenInitializer.bind(this)
        this.handleDialogReadInitializedAuthenToken = this.handleDialogReadInitializedAuthenToken.bind(this)
        this.handleDialogSave = this.handleDialogSave.bind(this)
        this.handleDialogCancel = this.handleDialogCancel.bind(this)
        // context menu items and callbacks
        this.menu = {
            [KEY_TYPE.ACCESS]: [
                {
                    name: 'Extend valid period',
                    privilege: PRIVILEGE.PROGRAM_ACCESS_RESOURCES,
                    callback: this.handleSetValidPeriod,
                },
                {
                    name: 'Download access profile',
                    privilege: PRIVILEGE.PROGRAM_ACCESS_RESOURCES,
                    callback: this.handleDialogDownloadAccessProfile,
                },
                // lock access will automatically be uploaded to server upon inserted into a key manager, remove this menu item
                // {
                //     name: 'Read access history',
                //     privilege: PRIVILEGE.GET_ACCESS_RESOURCES,
                //     callback: this.handleDialogReadAccessHistory,
                // },
                {
                    name: 'Factory reset',
                    privilege: PRIVILEGE.CREATE_ACCESS_RESOURCES,
                    callback: this.handleDialogFactoryReset,
                },
            ],
            [KEY_TYPE.MANAGEMENT]: [
                {
                    name: 'Be a lock access reader',
                    privilege: PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES,
                    callback: this.handleDialogBeLockReader,
                },
                // lock access will automatically be uploaded to server upon inserted into a key manager, remove this menu item
                // {
                //     name: 'Read lock access history',
                //     privilege: PRIVILEGE.GET_MANAGEMENT_RESOURCES,
                //     callback: this.handleDialogReadAccessHistory,
                // },
                {
                    name: 'Be a lock initializer',
                    privilege: PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES,
                    callback: this.handleDialogBeLockInitializer,
                },
                //FIXME, as the server does not support "read initialized lock" yet, remove this feature
                // {
                //     name: 'Read lock initialize history',
                //     privilege: PRIVILEGE.GET_MANAGEMENT_RESOURCES,
                //     callback: this.handleDialogReadInitializedLock,
                // },
                //FIXME, remove authen token feature first
                // {
                //     name: 'Be an authen token initializer',
                //     privilege: PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES,
                //     callback: this.handleDialogBeAuthenTokenInitializer,
                // },
                // {
                //     name: 'Read authen token initialize history',
                //     privilege: PRIVILEGE.GET_MANAGEMENT_RESOURCES,
                //     callback: this.handleDialogReadInitializedAuthenToken,
                // },
                {
                    name: 'Factory reset',
                    privilege: PRIVILEGE.CREATE_MANAGEMENT_RESOURCES,
                    callback: this.handleDialogFactoryReset,
                },
            ],
        }
        this.contextMenus = []
    }

    componentDidUpdate(prevProps) {
        // Q: check if processing done, close dialog if it did
        if (((prevProps.isUpdatingKey === true) && (this.props.isUpdatingKey === false)) ||
            ((prevProps.isDeregisteringKey === true) && (this.props.isDeregisteringKey === false)) ||
            ((prevProps.isProgramming === true) && (this.props.isProgramming === false))) {
            this.handleDialogCancel()
        }
        const { locationPathObject, userObject } = this.props
        if ((locationPathObject !== prevProps.locationPathObject) || (userObject !== prevProps.userObject)) {
            this.setState({
                columns: prepareColumns(locationPathObject, userObject),
            })
        }
    }

    handleRowSelect(_, selectedRow) {
        // save the selected row in redux store
        const { hardwareKeySelectedRow } = this.props
        if (selectedRow !== hardwareKeySelectedRow) {
            this.props.onHardwareKeySelectedRow(selectedRow)
        }
    }

    handleContextMenuClick(event, item) {
        event.stopPropagation()
        // clicked on context menu icon button, pop up context menu
        this.setState({
            anchorEl: event.currentTarget,
            contextRow: item,
        })
    }

    handleContextMenuEnter() {
        // before showing context menu, show only those menu items that the user has corresponding privilege
        const { privileges } = this.props
        const { contextRow } = this.state
        this.contextMenus = this.menu[contextRow.type].filter(menu => privileges.includes(menu.privilege))
        this.setState({
            menus: this.contextMenus.map(menu => menu.name),
        })
    }

    handleContextMenuItemClick(event) {
        // click on context menu item
        const { contextRow } = this.state
        const callback = this.contextMenus[event.target.value].callback
        callback(event, contextRow)
        this.handleContextMenuClose(event)
    }

    handleContextMenuClose() {
        // close context menu
        this.setState({
            anchorEl: null,
        })
    }

    handleDialogEditKey(event, rowData) {
        event.stopPropagation()
        // edit key, populate the dialogItem with currently selected item
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.EDIT_KEY,
                ...rowData,
            },
        })
    }

    handleDialogDeregister(event, rowData) {
        event.stopPropagation()
        // deregister key, prompt to confirm deregister key
        this.setState({
            deleteItem: rowData,
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.DEREGISTER_KEY,
                _dialogTitle: 'Deregister Key',
                _dialogMessage: `Proceed to deregister key "${rowData.name}"?`,
            },
        })
    }

    handleDialogFactoryReset(_, rowData) {
        // prompt access profile, populate the dialogItem with currently selected item
        const { contextRow } = this.state
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.FACTORY_RESET,
                _dialogTitle: 'Factory Reset Key',
                _dialogMessage: `Proceed to factory reset key "${contextRow.name}"?`,
            },
        })
    }

    handleSetValidPeriod(_, rowData) {
        // set the valid period of the access key
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.EXTEND_VALID_PERIOD,
            },
        })
    }

    handleDialogDownloadAccessProfile(_, rowData) {
        // prompt access profile, populate the dialogItem with currently selected item
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.DOWNLOAD_ACCESS_PROFILE,
            },
        })
    }

    handleDialogBeLockReader(_, rowData) {
        // prompt access profile, populate the dialogItem with currently selected item
        const { contextRow } = this.state
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.BE_LOCK_READER,
                _dialogTitle: 'Change Management Key Usage',
                _dialogMessage: `Proceed to change the management key "${contextRow.name}" to be a lock reader?`,
            },
        })
    }

    handleDialogReadAccessHistory(_, rowData) {
        // read access history
        const { contextRow } = this.state
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.READ_ACCESS_HISTORY,
                _dialogTitle: 'Read Access Activity',
                _dialogMessage: `Proceed to read access activity from key "${contextRow.name}"?`,
            },
        })
    }

    handleDialogBeLockInitializer(_, rowData) {
        // program to be a lock initializer
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.BE_LOCK_INITIALIZER,
            },
        })
    }

    handleDialogReadInitializedLock(_, rowData) {
        // read initialized lock
        const { contextRow } = this.state
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.READ_INITIALIZED_LOCK,
                _dialogTitle: 'Read Initialized Lock Activity',
                _dialogMessage: `Proceed to read initialized lock activity from key "${contextRow.name}"?`,
            },
        })
    }    

    handleDialogBeAuthenTokenInitializer(_, rowData) {
        // program to be a authen token initializer
        //FIXME, don't know what is needed to initialize authen token
        const { contextRow } = this.state
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.BE_AUTHEN_TOKEN_INITIALIZER,
                _dialogTitle: 'Change Management Key Usage',
                _dialogMessage: `Proceed to change the management key "${contextRow.name}" to be a authen token initializer?`,
            },
        })
    }

    handleDialogReadInitializedAuthenToken(_, rowData) {
        // read initialized authen token
        const { contextRow } = this.state
        this.setState({
            dialogItem: {
                _dialogOperation: DIALOG_OPERATION.READ_INITIALIZED_AUTHEN_TOKEN,
                _dialogTitle: 'Read Initialized Authen Token Activity',
                _dialogMessage: `Proceed to read initialized authen token activity from key "${contextRow.name}"?`,
            },
        })
    }

    handleDialogSave({_dialogOperation, ...saveObject}) {
        switch (_dialogOperation) {
            case DIALOG_OPERATION.EDIT_KEY:
                // save key
                // Q: valid key?
                const { serialNumber, locationId } = saveObject
                if ((serialNumber) && (locationId)) {
                    // valid key
                    this.props.onKeyUpdate(saveObject)
                }
                break
            case DIALOG_OPERATION.DEREGISTER_KEY:
                // deregister key
                const { deleteItem } = this.state
                this.props.onKeyDeregister(deleteItem)
                break
            case DIALOG_OPERATION.FACTORY_RESET:
                {
                    // proceed to factory reset key
                    const { contextRow } = this.state
                    this.props.onKeyFactoryReset(contextRow)
                }
                break
            case DIALOG_OPERATION.EXTEND_VALID_PERIOD:
                {
                    // set valid period to an access key
                    const { validPeriod } = saveObject
                    const { contextRow } = this.state
                    this.props.onProgramValidPeriod(contextRow, validPeriod)
                }
                break
            case DIALOG_OPERATION.DOWNLOAD_ACCESS_PROFILE:
                {
                    // download access profile to an access key
                    const { accessProfileId } = saveObject
                    if (Boolean(accessProfileId)) {
                        const { contextRow } = this.state
                        this.props.onProgramAccessProfile(contextRow, accessProfileId)
                    }
                }
                break
            case DIALOG_OPERATION.BE_LOCK_READER:
                {
                    // proceed to change the usage of the management key
                    const { contextRow } = this.state
                    this.props.onBeLockReader(contextRow)
                }
                break
            case DIALOG_OPERATION.READ_ACCESS_HISTORY:
                {
                    // proceed to read access activity from key
                    const { contextRow } = this.state
                    this.props.onReadAccessHistory(contextRow)
                }
                break
            case DIALOG_OPERATION.BE_LOCK_INITIALIZER:
                {
                    // download access profile to a management key
                    const { accessProfileId } = saveObject
                    if (Boolean(accessProfileId)) {
                        const { contextRow } = this.state
                        this.props.onBeLockInitializer(contextRow, accessProfileId)
                    }
                }
                break
            case DIALOG_OPERATION.READ_INITIALIZED_LOCK:
                {
                    // proceed to read initialized lock activity from key
                    const { contextRow } = this.state
                    this.props.onReadInitializedLock(contextRow)
                }
                break
            case DIALOG_OPERATION.BE_AUTHEN_TOKEN_INITIALIZER:
                {
                    // download access profile to a management key
                    const { contextRow } = this.state
                    this.props.onBeAuthenTokenInitializer(contextRow)
                }
                break
            case DIALOG_OPERATION.READ_INITIALIZED_AUTHEN_TOKEN:
                {
                    // proceed to read initialized authen token activity from key
                    const { contextRow } = this.state
                    this.props.onReadInitializedAuthenToken(contextRow)
                }
                break
            default:
                break
        }
        // leave dialog open till done in order to show processing in the confirm button
        // this.handleDialogCancel()
    }

    handleDialogCancel() {
        // close the dialog
        this.setState({
            dialogItem: null,
        })
    }

    render() {
        const { privileges, hardwareKeys, onlineKeys, hardwareKeySelectedRow, classes } = this.props
        const { columns, dialogItem, anchorEl, menus } = this.state
        const isMenuOpen = Boolean(anchorEl)
        // rack list table column definitions
        const getActions = () => {
            const actions = []
            if (privilege.hasCreateResources(privileges)) {
                actions.push(
                    (rowData) => ({
                        icon: () => <EditIcon />,
                        tooltip: 'Edit Key',
                        onClick: this.handleDialogEditKey,
                        disabled: (rowData.type === KEY_TYPE.MANAGEMENT) && !privilege.hasCreateManagementResources(privileges),
                    }),
                    (rowData) => ({
                        icon: () => <DeleteIcon />,
                        tooltip: 'Deregister Key',
                        onClick: this.handleDialogDeregister,
                        disabled: (rowData.type === KEY_TYPE.MANAGEMENT) && !privilege.hasCreateManagementResources(privileges),
                    }),
                )
            }
            if (privilege.hasProgramResources(privileges)) {
                actions.push(
                    (rowData) => ({
                        icon: () => <MoreVertIcon />,
                        tooltip: 'Menu',
                        onClick: this.handleContextMenuClick,
                        disabled: !rowData.online || this.menu[rowData.type].filter(menu => privileges.includes(menu.privilege)).length === 0,
                    }),
                )
            }
            return actions
        }
        return (
            <Paper className={classes.paper}>
                <DataTable
                    title={TITLE}
                    columns={columns}
                    data={hardwareKeys}
                    getRowId={data => data.serialNumber}
                    onRowClick={this.handleRowSelect}
                    actions={getActions()}
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
                            backgroundColor: (hardwareKeySelectedRow && hardwareKeySelectedRow.tableData.id === rowData.tableData.id) ? CONF.BACKGROUND_COLOR_SELECTED_ROW : CONF.BACKGROUND_COLOR_NOT_SELECTED_ROW
                        }),
                    }}
                />
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={isMenuOpen}
                    onEnter={this.handleContextMenuEnter}
                    onClose={this.handleContextMenuClose}
                >
                    {menus.map((menu, index) => (
                        <MenuItem key={menu} value={index} onClick={this.handleContextMenuItemClick}>
                            {menu}
                        </MenuItem>
                    ))}
                </Menu>
                <KeyContext />
                <KeyDialog dialogItem={dialogItem} onlineKeys={onlineKeys} onSave={this.handleDialogSave} onCancel={this.handleDialogCancel} />
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Key))

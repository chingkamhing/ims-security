import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import * as moment from 'moment'
import {
    CircularProgress,
    Paper,
} from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add"
import AutorenewIcon from '@material-ui/icons/Autorenew'
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import DataTable from '../../DataTable'
import ConfirmModal from '../../ConfirmModal'
import UserInfo from './UserInfo'
import UserUserEdit from './UserUserEdit'
import { selectMyselfId, selectMyselfPrivileges, selectUserList, selectLocationPath, selectUserUserSelectedRow, selectUserUserSelected, selectPrivilegeProfile, selectIsUpdatingUser, selectIsDeletingUser, selectIsResettingPassword } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'
import { CONF } from '../../../constants'

// table title
const TITLE = 'User'

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
    myselfId: selectMyselfId(state),
    privileges: selectMyselfPrivileges(state),
    userUsers: selectUserList(state),
    locationPathObject: selectLocationPath(state),
    userUserSelectedRow: selectUserUserSelectedRow(state),
    userUserSelected: selectUserUserSelected(state),
    privilegeProfileObject: selectPrivilegeProfile(state),
    isUpdatingUser: selectIsUpdatingUser(state),
    isDeletingUser: selectIsDeletingUser(state),
    isResettingPassword: selectIsResettingPassword(state),
})

const mapDispatchToProps = dispatch => ({
    onUserUserSelectedRow: (selectedRow) => {
        dispatch(actions.changeUserUserSelectedRow(selectedRow))
    },
    onUserSave: (item) => {
        // save user
        const objects = [{...item}]
        // Q: database id exist?
        if (typeof item.id === 'undefined') {
            // not exist in database, create new user
            dispatch(actions.createUser(objects))
        } else {
            // already exist in database, update the user
            dispatch(actions.updateUser(objects))
        }
    },
    onUserDelete: (item) => {
        // delete user
        const ids = [item.id]
        dispatch(actions.deleteUser(ids))
    },
    onUserReset: (item) => {
        // delete user
        const resets = [item.id]
        dispatch(actions.userResetPassword(resets))
    },
})

// must save columns array in state to avoid recreating every time passing to DataTable or the filter input will be cleared upon every data update
const prepareColumns = (locationPathObject, privilegeProfileObject) => ([
    {
        title: 'Name',
        field: 'name',
    },
    {
        title: 'Location',
        field: 'locationIds',
        render: rowData => rowData.locationIds.map((id, index) => <div key={index}>{locationPathObject[id]}</div>),
        customFilterAndSearch: (term, rowData) => rowData.locationIds.some(id => locationPathObject[id].includes(term)),
    },
    {
        title: 'Company',
        field: 'company',
    },
    {
        title: 'Privilege Profile',
        field: 'privilegeProfileId',
        render: rowData => privilegeProfileObject[rowData.privilegeProfileId] && privilegeProfileObject[rowData.privilegeProfileId].name,
        customFilterAndSearch: (term, rowData) => (((privilegeProfileObject[rowData.privilegeProfileId]) ? privilegeProfileObject[rowData.privilegeProfileId].name : '').includes(term)),
    },
    {
        title: 'Valid (From)',
        field: 'validPeriodFrom',
        render: rowData => moment(new Date(rowData.validPeriod.from * 1000)).format(CONF.DATE_FORMAT),
        customFilterAndSearch: (term, rowData) => moment(new Date(rowData.validPeriod.from * 1000)).format(CONF.DATE_FORMAT).includes(term),
    },
    {
        title: 'Valid (To)',
        field: 'validPeriodTo',
        render: rowData => moment(new Date(rowData.validPeriod.to * 1000)).format(CONF.DATE_FORMAT),
        customFilterAndSearch: (term, rowData) => moment(new Date(rowData.validPeriod.to * 1000)).format(CONF.DATE_FORMAT).includes(term),
    },
    {
        title: 'Description',
        field: 'description',
        sorting: false,
    },
])

class UserUser extends React.PureComponent {
    constructor(props) {
        super(props)
        const { locationPathObject, privilegeProfileObject } = props
        this.state = {
            columns: prepareColumns(locationPathObject, privilegeProfileObject),
            editItem: null,
            deleteItem: null,
            resetItem: null,
        }
        this.handleRowSelect = this.handleRowSelect.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.handleSaveItem = this.handleSaveItem.bind(this)
        this.handleCancelItem = this.handleCancelItem.bind(this)
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.handleResetItem = this.handleResetItem.bind(this)
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.isUpdatingUser === true) && (this.props.isUpdatingUser === false)) {
            this.handleCancelItem()
        }
        const { locationPathObject, privilegeProfileObject } = this.props
        if ((locationPathObject !== prevProps.locationPathObject) || (privilegeProfileObject !== prevProps.privilegeProfileObject)) {
            this.setState({
                // lock list table column definitions
                columns: prepareColumns(locationPathObject, privilegeProfileObject),
            })
        }
    }

    handleRowSelect(_, selectedRow) {
        const { userUserSelectedRow } = this.props
        if (selectedRow !== userUserSelectedRow) {
            this.props.onUserUserSelectedRow(selectedRow)
        }
    }

    handleAddItem(event) {
        event.stopPropagation()
        // add user, populate the editItem with empty object
        this.setState({
            editItem: {},
        })
    }

    handleEditItem(event, rowData) {
        event.stopPropagation()
        // edit user, populate the editItem with currently selected item
        this.setState({
            editItem: {...rowData},
        })
    }

    handleSaveItem(item) {
        // save user
        // Q: valid user?
        const { username, locationIds, privilegeProfileId } = item
        if ((username) && (locationIds.length > 0) && (privilegeProfileId)) {
            // valid user
            this.props.onUserSave(item)
        }
    }

    handleCancelItem() {
        // cancel editing user, simply close the dialog
        this.setState({
            editItem: null,
        })
    }

    handleDeleteItem(event, item) {
        event.stopPropagation()
        // delete user
        this.setState({
            deleteItem: item,
        })
        this.props.onUserDelete(item)
    }

    handleResetItem(event, item) {
        event.stopPropagation()
        // reset the user's password
        this.setState({
            resetItem: item,
        })
        this.props.onUserReset(item)
    }

    render() {
        const { myselfId, privileges, userUsers, userUserSelectedRow, userUserSelected, isUpdatingUser, isDeletingUser, isResettingPassword, classes } = this.props
        const { columns, editItem, deleteItem, resetItem } = this.state
        const getActions = (confirm) => {
            const actions = []
            if (privilege.hasCreateUser(privileges)) {
                actions.push(
                    {
                        isFreeAction: true,
                        icon: () => <AddIcon />,
                        tooltip: 'Add User',
                        onClick: this.handleAddItem,
                    },
                    {
                        icon: () => <EditIcon />,
                        tooltip: 'Edit User',
                        onClick: this.handleEditItem,
                    },
                    (rowData) => ({
                        icon: () => (
                            <>
                                <DeleteIcon />
                                {isDeletingUser && (rowData === deleteItem) && <CircularProgress size={48} className={classes.fabProgress} />}
                            </>
                        ),
                        tooltip: 'Delete User',
                        onClick: confirm(
                            this.handleDeleteItem,
                            'Confirm Delete',
                            `Delete user "${rowData.name}"?`,
                        ),
                        disabled: (rowData.id === myselfId),
                    }),
                    (rowData) => ({
                        icon: () => (
                            <>
                                <AutorenewIcon />
                                {isResettingPassword && (rowData === resetItem) && <CircularProgress size={48} className={classes.fabProgress} />}
                            </>
                        ),
                        tooltip: 'Reset Password',
                        onClick: confirm(
                            this.handleResetItem,
                            'Confirm Reset Password',
                            `Reset user "${rowData.name}" password?`,
                        ),
                        disabled: (rowData.id === myselfId),
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
                            data={userUsers}
                            getRowId={data => data.id}
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
                                    backgroundColor: (userUserSelectedRow && userUserSelectedRow.tableData.id === rowData.tableData.id) ? CONF.BACKGROUND_COLOR_SELECTED_ROW : CONF.BACKGROUND_COLOR_NOT_SELECTED_ROW
                                }),
                            }}
                        />
                    )}
                </ConfirmModal>
                <UserInfo user={userUserSelected} />
                <UserUserEdit editItem={editItem} onSave={this.handleSaveItem} isProcessing={isUpdatingUser} onCancel={this.handleCancelItem} />
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserUser))

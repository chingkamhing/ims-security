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
import DataTable from '../../DataTable'
import ConfirmModal from '../../ConfirmModal'
import UserPrivilegeProfileInfo from './UserPrivilegeProfileInfo'
import UserPrivilegeProfileEdit from './UserPrivilegeProfileEdit'
import { selectMyselfPrivileges, selectPrivilegeList, selectUserPrivilegeProfileSelectedRow, selectUserPrivilegeProfileSelected, selectIsUpdatingPrivilegeProfile, selectIsDeletingPrivilegeProfile } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'
import { CONF } from '../../../constants'

// table title
const TITLE = 'Privilege Profile'

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
    userPrivilegeProfiles: selectPrivilegeList(state),
    userPrivilegeProfileSelectedRow: selectUserPrivilegeProfileSelectedRow(state),
    userPrivilegeProfileSelected: selectUserPrivilegeProfileSelected(state),
    isUpdatingPrivilegeProfile: selectIsUpdatingPrivilegeProfile(state),
    isDeletingPrivilegeProfile: selectIsDeletingPrivilegeProfile(state),
})

const mapDispatchToProps = dispatch => ({
    onUserPrivilegeProfileSelectedRow: (selectedRow) => {
        dispatch(actions.changeUserPrivilegeProfileSelectedRow(selectedRow))
    },
    onPrivilegeProfileSave: (item) => {
        // save privilege profile
        const objects = [{...item}]
        // Q: database id exist?
        if (typeof item.id === 'undefined') {
            // not exist in database, create new privilege profile
            dispatch(actions.createPrivilegeProfile(objects))
        } else {
            // already exist in database, update the privilege profile
            dispatch(actions.updatePrivilegeProfile(objects))
        }
    },
    onPrivilegeProfileDelete: (item) => {
        // delete privilege profile
        const ids = [item.id]
        dispatch(actions.deletePrivilegeProfile(ids))
    },
})

// must save columns array in state to avoid recreating every time passing to DataTable or the filter input will be cleared upon every data update
const prepareColumns = () => ([
    {
        title: 'Name',
        field: 'name',
        width: '15em',
    },
    {
        title: 'Privileges',
        field: 'privileges',
        render: rowData => rowData.privileges.join(', '),
    },
    {
        title: 'Description',
        field: 'description',
        sorting: false,
    },
])

class UserPrivilegeProfile extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: prepareColumns(),
            editItem: null,
            deleteItem: null,
        }
        this.handleRowSelect = this.handleRowSelect.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.handleSaveItem = this.handleSaveItem.bind(this)
        this.handleCancelItem = this.handleCancelItem.bind(this)
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.isUpdatingPrivilegeProfile === true) && (this.props.isUpdatingPrivilegeProfile === false)) {
            this.handleCancelItem()
        }
    }

    handleRowSelect(_, selectedRow) {
        const { userPrivilegeProfileSelectedRow } = this.props
        if (selectedRow !== userPrivilegeProfileSelectedRow) {
            this.props.onUserPrivilegeProfileSelectedRow(selectedRow)
        }
    }

    handleAddItem(event) {
        event.stopPropagation()
        // add privilege profile, populate the editItem with empty object
        this.setState({
            editItem: {},
        })
    }

    handleEditItem(event, rowData) {
        event.stopPropagation()
        // edit privilege profile, populate the editItem with currently selected item
        this.setState({
            editItem: {...rowData},
        })
    }

    handleSaveItem(item) {
        // save privilege profile
        // Q: valid privilege profile?
        const { name } = item
        if (name) {
            // valid privilege profile
            this.props.onPrivilegeProfileSave(item)
        }
    }

    handleCancelItem() {
        // cancel editing privilege profile, simply close the dialog
        this.setState({
            editItem: null,
        })
    }

    handleDeleteItem(event, item) {
        event.stopPropagation()
        // delete privilege profile
        this.setState({
            deleteItem: item,
        })
        this.props.onPrivilegeProfileDelete(item)
    }

    render() {
        const { privileges, userPrivilegeProfiles, userPrivilegeProfileSelectedRow, userPrivilegeProfileSelected, isUpdatingPrivilegeProfile, isDeletingPrivilegeProfile, classes } = this.props
        const { columns, editItem, deleteItem } = this.state
        const getActions = (confirm) => {
            const actions = []
            if (privilege.hasCreateUser(privileges)) {
                actions.push(
                    {
                        isFreeAction: true,
                        icon: () => <AddIcon />,
                        tooltip: 'Add Privilege Profile',
                        onClick: this.handleAddItem,
                    },
                    {
                        icon: () => <EditIcon />,
                        tooltip: 'Edit Privilege Profile',
                        onClick: this.handleEditItem,
                    },
                    (rowData) => ({
                        icon: () => (
                            <>
                                <DeleteIcon />
                                {isDeletingPrivilegeProfile && (rowData === deleteItem) && <CircularProgress size={48} className={classes.fabProgress} />}
                            </>
                        ),
                        tooltip: 'Delete Privilege Profile',
                        onClick: confirm(
                            this.handleDeleteItem,
                            'Confirm Delete',
                            `Delete privilege profile "${rowData.name}"?`,
                        ),
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
                            data={userPrivilegeProfiles}
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
                                    backgroundColor: (userPrivilegeProfileSelectedRow && userPrivilegeProfileSelectedRow.tableData.id === rowData.tableData.id) ? CONF.BACKGROUND_COLOR_SELECTED_ROW : CONF.BACKGROUND_COLOR_NOT_SELECTED_ROW
                                }),
                            }}
                        />
                    )}
                </ConfirmModal>
                <UserPrivilegeProfileInfo privilegeProfile={userPrivilegeProfileSelected} />
                <UserPrivilegeProfileEdit editItem={editItem} isProcessing={isUpdatingPrivilegeProfile} onSave={this.handleSaveItem} onCancel={this.handleCancelItem} />
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserPrivilegeProfile))

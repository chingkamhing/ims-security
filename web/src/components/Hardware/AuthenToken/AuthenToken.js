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
import AuthenTokenEdit from './AuthenTokenEdit'
import ConfirmModal from '../../ConfirmModal'
import { selectMyselfPrivileges, selectAuthenTokenList, selectUser, selectLocationPath, selectHardwareAuthenTokenSelectedRow, selectIsUpdatingAuthenToken, selectIsDeregisteringAuthenToken } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'
import { CONF } from '../../../constants'

// table title
const TITLE = 'Authen Token'

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
    authenTokens: selectAuthenTokenList(state),
    userObject: selectUser(state),
    locationPathObject: selectLocationPath(state),
    hardwareAuthenTokenSelectedRow: selectHardwareAuthenTokenSelectedRow(state),
    isUpdatingAuthenToken: selectIsUpdatingAuthenToken(state),
    isDeletingAuthenToken: selectIsDeregisteringAuthenToken(state),
})

const mapDispatchToProps = dispatch => ({
    onHardwareAuthenTokenSelectedRow: (selectedRow) => {
        dispatch(actions.changeHardwareAuthenTokenSelectedRow(selectedRow))
    },
    onAuthenTokenSave: (item) => {
        // save lock
        const objects = [{...item}]
        // Q: database serialNumber exist?
        if ((typeof item.serialNumber === 'string') && (item.serialNumber)) {
            // already exist in database, update the lock
            dispatch(actions.updateAuthenToken(objects))
        } else {
            // not exist in database, register new lock
            dispatch(actions.registerAuthenToken(objects))
        }
    },
    onAuthenTokenDelete: (item) => {
        // deregister authen token
        const serialNumbers = [item.serialNumber]
        dispatch(actions.deregisterAuthenToken(serialNumbers))
    },
})

class AuthenToken extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
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
        if ((prevProps.isUpdatingAuthenToken === true) && (this.props.isUpdatingAuthenToken === false)) {
            this.handleCancelItem()
        }
    }

    handleRowSelect(_, selectedRow) {
        const { hardwareAuthenTokenSelectedRow } = this.props
        if (selectedRow !== hardwareAuthenTokenSelectedRow) {
            this.props.onHardwareAuthenTokenSelectedRow(selectedRow)
        }
    }

    handleAddItem(event) {
        event.stopPropagation()
        // add authen token, populate the editItem with empty object
        this.setState({
            editItem: {},
        })
    }

    handleEditItem(event, rowData) {
        event.stopPropagation()
        // edit authen token, populate the editItem with currently selected item
        this.setState({
            editItem: {...rowData},
        })
    }

    handleSaveItem(item) {
        // save authen token
        // Q: valid authen token?
        const { name, locationId } = item
        if ((name) && (locationId)) {
            // valid authen token
            this.props.onAuthenTokenSave(item)
        }
    }

    handleCancelItem() {
        // cancel editing authen token, simply close the dialog
        this.setState({
            editItem: null,
        })
    }

    handleDeleteItem(event, item) {
        event.stopPropagation()
        // delete authen token
        this.setState({
            deleteItem: item,
        })
        this.props.onAuthenTokenDelete(item)
    }

    render() {
        const { privileges, authenTokens, userObject, locationPathObject, hardwareAuthenTokenSelectedRow, isUpdatingAuthenToken, isDeletingAuthenToken, classes } = this.props
        const { editItem, deleteItem } = this.state
        // table column definitions
        const columns = (userObject) => ([
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
                title: 'Serial No.',
                field: 'serialNumber',
            },
            {
                title: 'Holder',
                field: 'holder',
                render: rowData => rowData.holder && userObject[rowData.holder] && userObject[rowData.holder].name,
                customFilterAndSearch: (term, rowData) => (((rowData.holder && userObject[rowData.holder]) ? userObject[rowData.holder].name : '').includes(term)),
            },
            {
                title: 'Description',
                field: 'description',
                sorting: false,
            },
        ])
        const getActions = (confirm) => {
            const actions = []
            if (privilege.hasCreateManagementResources(privileges)) {
                actions.push(
                    {
                        isFreeAction: true,
                        icon: () => <AddIcon />,
                        tooltip: 'Add Authen Token',
                        onClick: this.handleAddItem,
                    },
                    {
                        icon: () => <EditIcon />,
                        tooltip: 'Edit Authen Token',
                        onClick: this.handleEditItem,
                    },
                    (rowData) => ({
                        icon: () => (
                            <>
                                <DeleteIcon />
                                {isDeletingAuthenToken && (rowData === deleteItem) && <CircularProgress size={48} className={classes.fabProgress} />}
                            </>
                        ),
                        tooltip: 'Delete Authen Token',
                        onClick: confirm(
                            this.handleDeleteItem,
                            'Confirm Delete',
                            `Delete authen token "${rowData.name}"?`,
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
                            columns={columns(userObject)}
                            data={authenTokens}
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
                                    backgroundColor: (hardwareAuthenTokenSelectedRow && hardwareAuthenTokenSelectedRow.tableData.id === rowData.tableData.id) ? CONF.BACKGROUND_COLOR_SELECTED_ROW : CONF.BACKGROUND_COLOR_NOT_SELECTED_ROW
                                }),
                            }}
                        />
                    )}
                </ConfirmModal>
                <AuthenTokenEdit editItem={editItem} userObject={userObject} isProcessing={isUpdatingAuthenToken} onSave={this.handleSaveItem} onCancel={this.handleCancelItem} />
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuthenToken))

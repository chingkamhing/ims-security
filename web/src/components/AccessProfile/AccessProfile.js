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
import DataTable from '../DataTable'
import ConfirmModal from '../ConfirmModal'
import AccessProfileContext from './AccessProfileContext'
import AccessProfileEdit from './AccessProfileEdit'
import { selectMyselfPrivileges, selectAccessProfileSelectedRow, selectAccessProfileList, selectLocationPath, selectIsUpdatingAccessProfile, selectIsDeletingAccessProfile } from '../../store/reducers'
import privilege from '../../lib/privilege'
import actions from '../../actions'
import { CONF } from '../../constants'

// table title
const TITLE = 'Access Profile'

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
    accessProfileSelectedRow: selectAccessProfileSelectedRow(state),
    accessProfile: selectAccessProfileList(state),
    locationPathObject: selectLocationPath(state),
    isUpdatingAccessProfile: selectIsUpdatingAccessProfile(state),
    isDeletingAccessProfile: selectIsDeletingAccessProfile(state),
})

const mapDispatchToProps = dispatch => ({
    onAccessProfileSelectedRow: (selectedRow) => {
        dispatch(actions.changeAccessProfileSelectedRow(selectedRow))
    },
    onAccessProfileSave: (item) => {
        // save access profile
        const objects = [{...item}]
        // Q: database id exist?
        if (typeof item.id === 'undefined') {
            // not exist in database, create new access profile
            dispatch(actions.createAccessProfile(objects))
        } else {
            // already exist in database, update the access profile
            dispatch(actions.updateAccessProfile(objects))
        }
    },
    onAccessProfileDelete: (item) => {
        // delete access profile
        const ids = [item.id]
        dispatch(actions.deleteAccessProfile(ids))
    },
})

// must save columns array in state to avoid recreating every time passing to DataTable or the filter input will be cleared upon every data update
const prepareColumns = (locationPathObject) => ([
    {
        title: 'Name',
        field: 'name',
        width: '15em',
    },
    {
        title: 'Location',
        field: 'locationId',
        width: '15em',
        render: rowData => locationPathObject[rowData.locationId] || '',
        customFilterAndSearch: (term, rowData) => (locationPathObject[rowData.locationId] || '').includes(term),
    },
    {
        title: 'Description',
        field: 'description',
        sorting: false,
    },
])

class AccessProfile extends React.PureComponent {
    constructor(props) {
        super(props)
        const { locationPathObject } = props
        this.state = {
            columns: prepareColumns(locationPathObject),
            editItem: null,
            deleteItem: null,
        }
        this.handleSelectRow = this.handleSelectRow.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.handleSaveItem = this.handleSaveItem.bind(this)
        this.handleCancelItem = this.handleCancelItem.bind(this)
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.isUpdatingAccessProfile === true) && (this.props.isUpdatingAccessProfile === false)) {
            this.handleCancelItem()
        }
        const { locationPathObject } = this.props
        if (locationPathObject !== prevProps.locationPathObject) {
            this.setState({
                columns: prepareColumns(locationPathObject),
            })
        }
    }

    handleSelectRow(_, selectedRow) {
        const { accessProfileSelectedRow } = this.props
        if (selectedRow !== accessProfileSelectedRow) {
            this.props.onAccessProfileSelectedRow(selectedRow)
        }
    }

    handleAddItem(event) {
        event.stopPropagation()
        // add access profile, populate the editItem with empty object
        this.setState({
            editItem: {},
        })
    }

    handleEditItem(event, rowData) {
        event.stopPropagation()
        // edit access profile, populate the editItem with currently selected item
        this.setState({
            editItem: {...rowData},
        })
    }

    handleSaveItem(item) {
        // save access profile
        // Q: valid access profile?
        const { name, locationId } = item
        if ((name) && (locationId)) {
            // valid access profile
            this.props.onAccessProfileSave(item)
        }
    }

    handleCancelItem() {
        // cancel editing access profile, simply close the dialog
        this.setState({
            editItem: null,
        })
    }

    handleDeleteItem(event, item) {
        event.stopPropagation()
        // delete access profile
        this.setState({
            deleteItem: item,
        })
        this.props.onAccessProfileDelete(item)
    }

    render() {
        const { privileges, accessProfileSelectedRow, accessProfile, isUpdatingAccessProfile, isDeletingAccessProfile, classes } = this.props
        const { columns, editItem, deleteItem } = this.state
        const getActions = (confirm) => {
            const actions = []
            if (privilege.hasCreateAccessResources(privileges)) {
                actions.push(
                    {
                        isFreeAction: true,
                        icon: () => <AddIcon />,
                        tooltip: 'Add Access Profile',
                        onClick: this.handleAddItem,
                    },
                    {
                        icon: () => <EditIcon />,
                        tooltip: 'Edit Access Profile',
                        onClick: this.handleEditItem,
                    },
                    (rowData) => ({
                        icon: () => (
                            <>
                                <DeleteIcon />
                                {isDeletingAccessProfile && (rowData === deleteItem) && <CircularProgress size={48} className={classes.fabProgress} />}
                            </>
                        ),
                        tooltip: 'Delete Access Profile',
                        onClick: confirm(
                            this.handleDeleteItem,
                            'Confirm Delete',
                            `Delete access profile "${rowData.name}"?`,
                        ),
                    })
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
                            data={accessProfile}
                            getRowId={data => data.id}
                            onRowClick={this.handleSelectRow}
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
                                    backgroundColor: (accessProfileSelectedRow && accessProfileSelectedRow.tableData.id === rowData.tableData.id) ? CONF.BACKGROUND_COLOR_SELECTED_ROW : CONF.BACKGROUND_COLOR_NOT_SELECTED_ROW
                                }),
                            }}
                        />
                    )}
                </ConfirmModal>
                <AccessProfileContext />
                <AccessProfileEdit editItem={editItem} isProcessing={isUpdatingAccessProfile} onSave={this.handleSaveItem} onCancel={this.handleCancelItem} />
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccessProfile))

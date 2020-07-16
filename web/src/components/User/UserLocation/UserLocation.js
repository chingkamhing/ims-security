import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
    Box,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Paper,
    Tooltip,
    Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import UserLocationEdit from './UserLocationEdit'
import UserLocationAdd from './UserLocationAdd'
import TreeView from '../../TreeView'
import ConfirmModal from '../../ConfirmModal'
import { selectMyselfPrivileges, selectLocation, selectUserLocationExpanded, selectUserLocationSelected, selectIsUpdatingLocation, selectIsDeletingLocation } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'
import { generateUniqueId } from '../../../lib/helper'
import { CONF, PREFIX } from '../../../constants'

const TITLE = 'Location'

const styles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    fabProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        zIndex: 1,
    },
    fixedHeight: {
        height: 320,
    },
    tree: {
        flexGrow: 1,
        width: '100%',
        height: CONF.UI_TREE_HEIGHT,
    },
})

const mapStateToProps = state => ({
    privileges: selectMyselfPrivileges(state),
    location: selectLocation(state),
    expanded: selectUserLocationExpanded(state),
    selected: selectUserLocationSelected(state),
    isUpdatingLocation: selectIsUpdatingLocation(state),
    isDeletingLocation: selectIsDeletingLocation(state),
})

const mapDispatchToProps = dispatch => ({
    onUserLocationSelected: (id) => {
        dispatch(actions.changeUserLocationSelected(id))
    },
    onUserLocationExpanded: (nodeIds) => {
        dispatch(actions.changeUserLocationExpanded(nodeIds))
    },
    updateLocation: (location) => {
        dispatch(actions.updateLocation([...location]))
    },
    deleteLocation: (location) => {
        dispatch(actions.deleteLocation([...location]))
    },
})

// - construct id-to-node to directly lookup each node structure
// - add parent field to each node to point to it's parent
const constructLocationObject = (nodes) => {
    return nodes.reduce((all, node) => {
        const saveNode = (parent, n1) => {
            all[n1.id] = n1
            n1.parent = parent
            if (Array.isArray(n1.children)) {
                n1.children.map(n2 => saveNode(n1.id, n2))
            }
        }
        saveNode(node.parent, node)
        return all
    }, {})
}

// user location
class UserLocation extends React.PureComponent {
    constructor(props) {
        super(props)
        const { location } = props
        this.state = {
            location,
            locationObject: constructLocationObject(location),
            isAddDialog: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleAddChild = this.handleAddChild.bind(this)
        this.handleAddChildCancel = this.handleAddChildCancel.bind(this)
        this.handleAddChildSave = this.handleAddChildSave.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    componentDidUpdate(prevProps) {
        const prevLocation = prevProps.location
        const prevIsUpdatingLocation = prevProps.isUpdatingLocation
        const { location, expanded, selected, isUpdatingLocation, onUserLocationExpanded } = this.props
        const { isAddDialog } = this.state
        if (location !== prevLocation) {
            this.setState({
                location,
                locationObject: constructLocationObject(location),
            })
        }
        if ((isAddDialog === true) && (prevIsUpdatingLocation === true) && (isUpdatingLocation === false)) {
            // done adding node
            this.setState({
                isAddDialog: false,
            })
            if (expanded.includes(selected) === false) {
                onUserLocationExpanded([selected, ...expanded])
            }
        }
    }
    handleClick(event, id) {
        this.props.onUserLocationSelected(id)
    }
    handleToggle(event, nodeIds) {
        this.props.onUserLocationExpanded(nodeIds)
    }
    handleAddChild(event) {
        event.stopPropagation()
        this.setState({
            isAddDialog: true,
        })
    }
    handleAddChildCancel(event) {
        this.setState({
            isAddDialog: false,
        })
    }
    handleAddChildSave(data) {
        // save new node to local state's location, and then updateLocation() to global state's location
        const { selected, updateLocation } = this.props
        const { location, locationObject } = this.state
        const newNode = {
            id: generateUniqueId(PREFIX.LOCATION),
            parent: selected,
            ...data,
        }
        const selectedNode = locationObject[selected]
        if (!Array.isArray(selectedNode.children)) {
            selectedNode.children = []
        }
        selectedNode.children = selectedNode.children.concat(newNode)
        updateLocation(location)
    }
    handleDelete(event) {
        event.stopPropagation()
        // deleted the selected node to local state's location, and then deleteLocation() to global state's location
        const { selected, onUserLocationSelected, deleteLocation } = this.props
        const { locationObject, location } = this.state
        const parent = locationObject[locationObject[selected].parent]
        parent.children = parent.children.filter(node => selected !== node.id)
        onUserLocationSelected('')
        deleteLocation(location)
    }
    handleSave({name, description}) {
        // save location
        const { selected, updateLocation } = this.props
        const { locationObject, location } = this.state
        locationObject[selected].name = name
        locationObject[selected].description = description
        updateLocation(location)
    }
    render() {
        const { privileges, expanded, selected, isUpdatingLocation, isDeletingLocation, classes } = this.props
        const { location, locationObject, isAddDialog } = this.state
        const { name, children, description } = locationObject[selected] || {}
        const selectedChildren = children || []
        const siblingNames = selectedChildren.map(child => child.name)
        const hasCreateUser = privilege.hasCreateUser(privileges)
        const isDisabledAdd = (!selected)
        const isDisabledDelete = (selected) ? !Boolean(locationObject[selected].parent) : true
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
        return (
            <Container maxWidth="lg" className={classes.container}>
                {/* title bar */}
                <ConfirmModal>
                    {confirm => (
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Typography variant="h6">
                                    {TITLE}
                                </Typography>
                            </Box>
                            { hasCreateUser &&
                                <>
                                    <Box>
                                        <Tooltip title="Add Child Node">
                                            <span>
                                                <IconButton
                                                    aria-label="add child node"
                                                    edge="end"
                                                    disabled={isDisabledAdd}
                                                    onClick={this.handleAddChild}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <Tooltip title="Delete Node" className={classes.wrapper}>
                                            <span>
                                                <IconButton
                                                    aria-label="delete node"
                                                    edge="end"
                                                    disabled={isDisabledDelete}
                                                    onClick={confirm(
                                                        this.handleDelete,
                                                        'Confirm Delete',
                                                        `Delete location node "${locationObject[selected] && locationObject[selected].name}"?`,
                                                    )}
                                                >
                                                    <DeleteIcon />
                                                    {isDeletingLocation && <CircularProgress size={48} className={classes.fabProgress} />}
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                </>
                            }
                        </Box>
                    )}
                </ConfirmModal>
                {/* content */}
                <Grid container spacing={3}>
                    {/* location */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <TreeView
                                nodes={location}
                                className={classes.tree}
                                expanded={expanded}
                                selected={selected}
                                onClick={this.handleClick}
                                onToggle={this.handleToggle}
                            />
                        </Paper>
                    </Grid>
                    {/* information */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <UserLocationEdit
                                selected={selected}
                                name={name}
                                description={description}
                                hasSave={hasCreateUser}
                                isProcessing={isUpdatingLocation}
                                onSave={this.handleSave}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <UserLocationAdd open={isAddDialog} isProcessing={isUpdatingLocation} siblingNames={siblingNames} onSave={this.handleAddChildSave} onCancel={this.handleAddChildCancel} />
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserLocation))

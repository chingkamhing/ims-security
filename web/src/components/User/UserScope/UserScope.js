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
import UserScopeEdit from './UserScopeEdit'
import UserScopeAdd from './UserScopeAdd'
import TreeView from '../../TreeView'
import ConfirmModal from '../../ConfirmModal'
import { selectMyselfPrivileges, selectScope, selectUserScopeExpanded, selectUserScopeSelected, selectIsUpdatingScope, selectIsDeletingScope } from '../../../store/reducers'
import privilege from '../../../lib/privilege'
import actions from '../../../actions'
import { generateUniqueId } from '../../../lib/helper'
import { CONF, PREFIX } from '../../../constants'

const TITLE = 'Scope'

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
    scope: selectScope(state),
    expanded: selectUserScopeExpanded(state),
    selected: selectUserScopeSelected(state),
    isUpdatingScope: selectIsUpdatingScope(state),
    isDeletingScope: selectIsDeletingScope(state),
})

const mapDispatchToProps = dispatch => ({
    onUserScopeSelected: (id) => {
        dispatch(actions.changeUserScopeSelected(id))
    },
    onUserScopeExpanded: (nodeIds) => {
        dispatch(actions.changeUserScopeExpanded(nodeIds))
    },
    updateScope: (scope) => {
        dispatch(actions.updateScope([...scope]))
    },
    deleteScope: (scope) => {
        dispatch(actions.deleteScope([...scope]))
    },
})

// - construct id-to-node to directly lookup each node structure
// - add parentId field to each node to point to it's parent
const constructScopeObject = (nodes) => {
    return nodes.reduce((all, node) => {
        const saveNode = (parentId, n1) => {
            all[n1.id] = n1
            n1.parentId = parentId
            if (Array.isArray(n1.children)) {
                n1.children.map(n2 => saveNode(n1.id, n2))
            }
        }
        saveNode('', node)
        return all
    }, {})
}

// user scope
class UserScope extends React.PureComponent {
    constructor(props) {
        super(props)
        const { scope } = props
        this.state = {
            scope,
            scopeObject: constructScopeObject(scope),
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
        const prevScope = prevProps.scope
        const prevIsUpdatingScope = prevProps.isUpdatingScope
        const { scope, expanded, selected, isUpdatingScope, onUserScopeExpanded } = this.props
        const { isAddDialog } = this.state
        if (scope !== prevScope) {
            this.setState({
                scope,
                scopeObject: constructScopeObject(scope),
            })
        }
        if ((isAddDialog === true) && (prevIsUpdatingScope === true) && (isUpdatingScope === false)) {
            // done adding node
            this.setState({
                isAddDialog: false,
            })
            if (expanded.includes(selected) === false) {
                onUserScopeExpanded([selected, ...expanded])
            }
        }
    }
    handleClick(_, id) {
        this.props.onUserScopeSelected(id)
    }
    handleToggle(_, nodeIds) {
        this.props.onUserScopeExpanded(nodeIds)
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
        // save new node to local state's scope, and then updateScope() to global state's scope
        const { selected, updateScope } = this.props
        const { scope, scopeObject } = this.state
        const newNode = {
            id: generateUniqueId(PREFIX.SCOPE),
            parent: selected,
            ...data,
        }
        const selectedNode = scopeObject[selected]
        if (!Array.isArray(selectedNode.children)) {
            selectedNode.children = []
        }
        selectedNode.children = selectedNode.children.concat(newNode)
        updateScope(scope)
    }
    handleDelete(event) {
        event.stopPropagation()
        // deleted the selected node to local state's scope, and then deleteScope() to global state's scope
        const { selected, onUserScopeSelected, deleteScope } = this.props
        const { scopeObject, scope } = this.state
        const parent = scopeObject[scopeObject[selected].parent]
        parent.children = parent.children.filter(node => selected !== node.id)
        onUserScopeSelected('')
        deleteScope(scope)
    }
    handleSave({name, description}) {
        // save scope
        const { selected, updateScope } = this.props
        const { scopeObject, scope } = this.state
        scopeObject[selected].name = name
        scopeObject[selected].description = description
        updateScope(scope)
    }
    render() {
        const { privileges, expanded, selected, isUpdatingScope, isDeletingScope, classes } = this.props
        const { scope, scopeObject, isAddDialog } = this.state
        const { name, children, description } = scopeObject[selected] || {}
        const selectedChildren = children || []
        const siblingNames = selectedChildren.map(child => child.name)
        const hasCreateUser = privilege.hasCreateUser(privileges)
        const isDisabledAdd = (!selected)
        const isDisabledDelete = (selected) ? !Boolean(scopeObject[selected].parent) : true
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
        return (
            <Container maxWidth="lg" className={classes.container}>
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
                                                        `Delete scope "${scopeObject[selected] && scopeObject[selected].name}"node?`,
                                                    )}
                                                >
                                                    <DeleteIcon />
                                                    {isDeletingScope && <CircularProgress size={48} className={classes.fabProgress} />}
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                </>
                            }
                        </Box>
                    )}
                </ConfirmModal>
                <Grid container spacing={3}>
                    {/* scope */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <TreeView
                                nodes={scope}
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
                            <UserScopeEdit
                                selected={selected}
                                name={name}
                                description={description}
                                hasSave={hasCreateUser}
                                isProcessing={isUpdatingScope}
                                onSave={this.handleSave}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <UserScopeAdd open={isAddDialog} isProcessing={isUpdatingScope} siblingNames={siblingNames} onSave={this.handleAddChildSave} onCancel={this.handleAddChildCancel} />
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserScope))

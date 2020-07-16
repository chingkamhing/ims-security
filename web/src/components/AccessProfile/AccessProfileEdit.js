import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core'
import TreeSelect from '../TreeSelect'
import TransferList from '../TransferList'
import { selectLock, selectUser, selectLocation, selectAccessProfileNames } from '../../store/reducers'
import { isTwoArrayEqual, isTwoArraySimilar } from '../../lib/helper'
import { CONF, MenuProps } from '../../constants'

const TITLE = 'Access Profile'

const styles = theme => ({
    halfWidth: {
        margin: theme.spacing(1),
        width: '47%',
    },
    fullWidth: {
        margin: theme.spacing(1),
        width: '96%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
})

const mapStateToProps = state => ({
    lockObject: selectLock(state),
    userObject: selectUser(state),
    location: selectLocation(state),
    accessProfileNames: selectAccessProfileNames(state),
})

const getStyles = (item, allItems, theme) => ({
    fontWeight:
        allItems.indexOf(item) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
})

// find array of sub-node id
const findSubNodeIds = (nodes, nodeId) => {
    const id = nodeId || nodes[0].id
    return nodes.reduce((all, node) => {
        const appendNode = (n1) => {
            all.push(n1.id)
            if (Array.isArray(n1.children)) {
                n1.children.map(n2 => appendNode(n2))
            }
        }
        const findNode = (n1, id) => {
            if (id === n1.id) {
                if (Array.isArray(n1.children)) {
                    n1.children.map(n2 => appendNode(n2))
                }
            } else {
                if (Array.isArray(n1.children)) {
                    n1.children.map(n2 => findNode(n2, id))
                }
            }
        }
        findNode(node, id)
        return all
    }, [id])
}

// get array of lock serial number where the location is within sub-location of the input locationId
const getFilteredLockObject = (lockObject, location, locationId) => {
    const subNodeIds = findSubNodeIds(location, locationId)
    const locks = Object.values(lockObject).reduce(
        (all, lock) => subNodeIds.includes(lock.locationId) ? all.concat(lock.serialNumber) : all,
        []
    )
    return locks
}

// get array of lock serial number where the location is within sub-location of the input locationId
const getFilteredLocks = (lockObject, locks, location, locationId) => {
    const subNodeIds = findSubNodeIds(location, locationId)
    const filteredLocks = locks.reduce(
        (all, lock) => subNodeIds.includes(lockObject[lock].locationId) ? all.concat(lock) : all,
        []
    )
    return filteredLocks
}

// get filtered user objects where the location is within sub-location of the input locationId
const getFilteredUserObjects = (userObject, location, locationId) => {
    const subNodeIds = findSubNodeIds(location, locationId)
    const filteredItems = Object.values(userObject).reduce(
        (all, user) => subNodeIds.includes(user.locationId) ? all.concat(user) : all,
        [])
    return filteredItems
}

// get filtered user IDs where the location is within sub-location of the input locationId
const getFilteredUserIds = (userObject, userIds, location, locationId) => {
    const subNodeIds = findSubNodeIds(location, locationId)
    const filteredIds = userIds.reduce(
        (all, user) => subNodeIds.includes(userObject[user].locationId) ? all.concat(user) : all,
        [])
    return filteredIds
}

class AccessProfileEdit extends React.PureComponent {
    static propTypes = {
        editItem: PropTypes.any,
        isProcessing: PropTypes.bool,
        onCancel: PropTypes.func,
        onSave: PropTypes.func,
    }
    static defaultProps = {
        onCancel: () => {},
        onSave: () => {},
    }
    constructor(props) {
        super(props)
        const { editItem, lockObject, userObject, location, theme } = this.props
        const { id, name='', locationId='', locks=[], users=[], description='' } = editItem || {}
        this.state = {
            id,
            name,
            locationId,
            locks,
            users,
            description,
            allLocks: getFilteredLockObject(lockObject, location, locationId),
            userMenuItems: getFilteredUserObjects(userObject, location, locationId).map(user => (
                <MenuItem key={user.username} value={user.id} style={getStyles(name, users, theme)}>
                    {user.name}
                </MenuItem>
            )),
        }
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeLocationId = this.handleChangeLocationId.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleLocksChange = this.handleLocksChange.bind(this)
        this.handleUsersChange = this.handleUsersChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.getLockName = this.getLockName.bind(this)
        this.renderUserValue = this.renderUserValue.bind(this)
    }
    componentDidUpdate(prevProps) {
        const prevEditItem = prevProps.editItem
        const { editItem, lockObject, userObject, location, theme } = this.props
        if ((editItem !== prevEditItem)) {
            const { id, name='', locationId='', locks=[], users=[], description='' } = editItem || {}
            this.setState({
                id,
                name,
                locationId,
                locks,
                users,
                description,
                allLocks: getFilteredLockObject(lockObject, location, locationId),
                userMenuItems: getFilteredUserObjects(userObject, location, locationId).map(user => (
                    <MenuItem key={user.username} value={user.id} style={getStyles(name, users, theme)}>
                        {user.name}
                    </MenuItem>
                )),
            })
        }
    }
    handleChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }
    handleChangeLocationId(_, locationId) {
        const { lockObject, userObject, location, theme } = this.props
        const { name, locks, users } = this.state
        const allLocks = getFilteredLockObject(lockObject, location, locationId)
        const filteredSelectedLocks = getFilteredLocks(lockObject, locks, location, locationId)
        const userMenuItems = getFilteredUserObjects(userObject, location, locationId).map(user => (
            <MenuItem key={user.username} value={user.id} style={getStyles(name, users, theme)}>
                {user.name}
            </MenuItem>
        ))
        const filteredSelectedUserIds = getFilteredUserIds(userObject, users, location, locationId)
        this.setState({
            locationId,
            allLocks,
            locks: filteredSelectedLocks,
            userMenuItems,
            users: filteredSelectedUserIds,
        })
    }
    handleChangeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }
    handleLocksChange(locks) {
        this.setState({
            locks,
        })
    }
    handleUsersChange(event) {
        this.setState({
            users: event.target.value
        })
    }
    handleSave() {
        const { onSave } = this.props
        const { id, name, locationId, description, locks, users } = this.state
        onSave({
            id,
            name,
            locationId,
            description,
            locks,
            users,
        })
    }
    // helper function to get lock name
    getLockName(lockId) {
        const { lockObject } = this.props
        return lockObject[lockId].name
    }
    // helper function to render selected users
    renderUserValue(selected) {
        const { userObject, classes } = this.props
        return (
            <div className={classes.chips}>
                {selected.map(value => (
                    <Chip key={value} label={userObject[value].name} className={classes.chip} />
                ))}
            </div>
        )
    }
    render() {
        const { location, accessProfileNames, editItem, isProcessing, onCancel, classes } = this.props
        const { name, locationId, locks, users, description, allLocks, userMenuItems } = this.state
        const isDisabledSave = () => (
            !Boolean(editItem) ||
            (!name) ||
            ((Object.keys(editItem).length === 0) && (accessProfileNames.includes(name))) || 
            (!locationId) ||
            (
                (name === editItem.name) && 
                (locationId === editItem.locationId) && 
                (description === editItem.description) && 
                (isTwoArrayEqual(locks, editItem.locks)) && 
                (isTwoArraySimilar(users, editItem.users))
            )
        )
        return (
            <form noValidate autoComplete="off">
                <Dialog open={Boolean(editItem)} onClose={onCancel} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{TITLE}</DialogTitle>
                    <DialogContent className={classes.content}>
                        <div>
                            <FormControl className={classes.fullWidth}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    value={name}
                                    type="text"
                                    required
                                    autoFocus
                                    inputProps={{
                                        maxLength: CONF.MAX_INPUT_CHARS,
                                    }}
                                    onChange={this.handleChangeName}
                                />
                            </FormControl>
                            <FormControl className={classes.fullWidth}>
                                <TreeSelect
                                    id="locationId"
                                    label="Location"
                                    value={locationId}
                                    nodes={location}
                                    required
                                    onChange={this.handleChangeLocationId}
                                />
                            </FormControl>
                            <FormControl className={classes.fullWidth}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    value={description}
                                    type="text"
                                    multiline
                                    inputProps={{
                                        maxLength: CONF.MAX_DESCRIPTION_CHARS,
                                    }}
                                    onChange={this.handleChangeDescription}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.fullWidth}>
                                <TransferList
                                    labelId="access-profile-ordered-locks-label"
                                    id="access-profile-ordered-locks"
                                    value={locks}
                                    items={allLocks}
                                    getName={this.getLockName}
                                    onChange={this.handleLocksChange}
                                />
                            </FormControl>
                            <FormControl className={classes.fullWidth}>
                                <InputLabel id="access-profile-users-label">Users</InputLabel>
                                <Select
                                    labelId="access-profile-users-label"
                                    id="access-profile-users"
                                    input={<Input id="select-access-profile-users" />}
                                    multiple
                                    value={users}
                                    MenuProps={MenuProps}
                                    renderValue={this.renderUserValue}
                                    onChange={this.handleUsersChange}
                                >
                                    {userMenuItems}
                                </Select>
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button color="primary" disabled={isDisabledSave()} onClick={this.handleSave}>
                            {isProcessing ? (
                                <>
                                    Saving...
                                        <CircularProgress size={'1em'} color="inherit" />
                                </>
                            ) : (
                                    'Save'
                            )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        )
    }
}

export default connect(mapStateToProps, null)(withStyles(styles, {withTheme: true})(AccessProfileEdit))

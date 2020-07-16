import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TreeSelect from '../../TreeSelect'
import { selectLocation } from '../../../store/reducers'
import { CONF } from '../../../constants'

const TITLE = 'Authen Token'

const useStyles = makeStyles(theme => ({
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
}))

const AuthenTokenEdit = (props) => {
    const { editItem, userObject, isProcessing, onSave, onCancel } = props
    const { serialNumber, name, locationId, holder, description } = editItem || {}
    const location = useSelector(selectLocation)
    const classes = useStyles()
    const [currentName, setName] = React.useState(name || '')
    const [currentLocationId, setLocationId] = React.useState(locationId || '')
    const [currentHolder, setHolder] = React.useState(holder || '')
    const [currentDescription, setDescription] = React.useState(description || '')
    React.useEffect(() => {
        setName(name || '')
        setLocationId(locationId || '')
        setHolder(holder || '')
        setDescription(description || '')
    }, [name, locationId, holder, description])
    const handleHolderChange = (event) => {
        setHolder(event.target.value)
    }
    const isDisabledSave = () => (
        (!currentName) || (!currentLocationId) ||
        (
            (name === currentName) && 
            (locationId === currentLocationId) && 
            (holder === currentHolder) && 
            (description === currentDescription)
        )
    )
    const handleSave = () => {
        onSave({
            serialNumber,
            name: currentName,
            locationId: currentLocationId,
            holder: currentHolder,
            description: currentDescription,
        })
    }
    return (
        <form noValidate autoComplete="off">
            <Dialog open={!!editItem} onClose={onCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{TITLE}</DialogTitle>
                <DialogContent className={classes.content}>
                    <div>
                        <FormControl className={classes.halfWidth}>
                            <TextField
                                id="serialNumber"
                                label="Serial No."
                                defaultValue={serialNumber}
                                type="text"
                                disabled
                            />
                        </FormControl>
                        <FormControl className={classes.halfWidth}>
                            <TextField
                                id="name"
                                label="Name"
                                value={currentName}
                                type="text"
                                autoFocus
                                inputProps={{
                                    maxLength: CONF.MAX_INPUT_CHARS,
                                }}
                                onChange={event => setName(event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.fullWidth}>
                            <TreeSelect
                                id="locationId"
                                label="Location"
                                value={currentLocationId}
                                nodes={location}
                                required
                                onChange={(_, path) => setLocationId(path)}
                            />
                        </FormControl>
                        <FormControl className={classes.fullWidth}>
                            <InputLabel id="download-access-profile-label">Holder</InputLabel>
                            <Select
                                labelId="download-access-profile-label"
                                id="download-access-profile"
                                value={currentHolder}
                                onChange={handleHolderChange}
                            >
                                <MenuItem key={0} value=''>
                                    <em>None</em>
                                </MenuItem>
                                {Object.values(userObject).map(user => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.fullWidth}>
                            <TextField
                                id="description"
                                label="Description"
                                value={currentDescription}
                                type="text"
                                multiline
                                inputProps={{
                                    maxLength: CONF.MAX_DESCRIPTION_CHARS,
                                }}
                                onChange={event => setDescription(event.target.value)}
                            />
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button color="primary" disabled={isDisabledSave()} onClick={handleSave}>
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

export default AuthenTokenEdit

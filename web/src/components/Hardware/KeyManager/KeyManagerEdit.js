import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    CircularProgress,
    FormControl,
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

const TITLE = 'Key Manager'

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

export const DIALOG_OPERATION = {
    EDIT: 'EDIT',
    REGISTER: 'REGISTER',
}

const KeyManagerEdit = (props) => {
    const { editItem, isProcessing, onSave, onCancel } = props
    const { _dialogOperation, serialNumber, name, locationId, description } = editItem || {}
    const location = useSelector(selectLocation)
    const classes = useStyles()
    const [currentName, setName] = React.useState(name || '')
    const [currentLocationId, setLocationId] = React.useState(locationId || '')
    const [currentDescription, setDescription] = React.useState(description || '')
    React.useEffect(() => {
        setName(name || '')
        setLocationId(locationId || '')
        setDescription(description || '')
    }, [name, locationId, description])
    const isDisabledSave = () => (
        (!currentName) || (!currentLocationId) ||
        (
            (name === currentName) && 
            (locationId === currentLocationId) && 
            (description === currentDescription)
        )
    )
    const handleSave = () => {
        onSave({
            _dialogOperation,
            serialNumber,
            name: currentName,
            locationId: currentLocationId,
            description: currentDescription,
        })
    }
    return (
        <form noValidate autoComplete="off">
            <Dialog open={!!editItem} onClose={onCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{TITLE}</DialogTitle>
                <DialogContent className={classes.content}>
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

export default KeyManagerEdit

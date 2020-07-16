import React from 'react'
import { useSelector } from 'react-redux'
import {
    CircularProgress,
    FormControl,
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import TreeSelect from '../../TreeSelect'
import { selectLocation } from '../../../store/reducers'
import { CONF } from '../../../constants'

const TITLE = 'Edit Lock'

const ContentEditLock = (props) => {
    const { _dialogOperation, editItem, saveText, isProcessing, onSave, onCancel, classes } = props
    const { serialNumber, name, locationId, scopeId='', initialized=false, description } = editItem || {}
    const location = useSelector(selectLocation)
    const [currentSerialNumber, setSerialNumber] = React.useState(serialNumber || '')
    const [currentName, setName] = React.useState(name || '')
    const [currentLocationId, setLocationId] = React.useState(locationId || '')
    const [currentDescription, setDescription] = React.useState(description || '')
    React.useEffect(() => {
        setSerialNumber(serialNumber || '')
        setName(name || '')
        setLocationId(locationId || '')
        setDescription(description || '')
    }, [serialNumber, name, locationId, description])
    const isDisabledSave = () => (
        ((!currentSerialNumber) && (!currentName) && (!currentLocationId) && (!currentDescription)) ? (
            // all inputs empty, disable Save
            true
        ) : (
            // any inputs not empty, must need both serial number and location path
            (!currentSerialNumber) || (!currentLocationId)
        )

    )
    const isChanged = () => (
        (serialNumber !== currentSerialNumber) ||
        (name !== currentName) ||
        (locationId !== currentLocationId) ||
        (description !== currentDescription)
    )
    const handleSave = () => {
        isChanged() ? (
            // changed, save the lock
            onSave({
                _dialogOperation,
                serialNumber: currentSerialNumber,
                name: currentName,
                locationId: currentLocationId,
                scopeId,
                initialized,
                description: currentDescription,
            })
        ) : (
            // no change, skip it by saving an empty lock
            onSave({_dialogOperation})
        )
    }
    return (
        <>
            <DialogTitle id="form-dialog-title">{TITLE}</DialogTitle>
            <DialogContent className={classes.content}>
                <div>
                    <FormControl className={classes.halfWidth}>
                        <TextField
                            id="serialNumber"
                            label="Serial No."
                            value={currentSerialNumber}
                            type="text"
                            required
                            disabled={Boolean(serialNumber)}
                            autoFocus={!(serialNumber)}
                            onChange={event => setSerialNumber(event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={classes.halfWidth}>
                        <TextField
                            id="name"
                            label="Name"
                            value={currentName}
                            type="text"
                            autoFocus={Boolean(serialNumber)}
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
                            onChange={(_, id) => setLocationId(id)}
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
                        saveText
                    )}
                </Button>
            </DialogActions>
        </>
    )
}

export default ContentEditLock

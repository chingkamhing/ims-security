import React from 'react'
import { useSelector } from 'react-redux'
import {
    CircularProgress,
    FormControl,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import TreeSelect from '../../TreeSelect'
import { selectLocation } from '../../../store/reducers'

const TITLE = 'Edit All Location'

const ContentEditAllLocation = (props) => {
    const { _dialogOperation, editItem, saveText, isProcessing, onSave, onCancel, classes } = props
    const { locationId } = editItem
    const location = useSelector(selectLocation)
    const [currentLocationId, setLocationId] = React.useState(locationId || '')
    React.useEffect(() => {
        setLocationId(locationId || '')
    }, [locationId])
    const isDisabledSave = () => (
        (!currentLocationId) ||
        (
            (locationId === currentLocationId)
        )
    )
    const handleSave = () => {
        // changed, save the lock
        onSave({
            _dialogOperation,
            locationId: currentLocationId,
        })
    }
    return (
        <>
            <DialogTitle id="form-dialog-title">{TITLE}</DialogTitle>
            <DialogContent className={classes.content}>
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

export default ContentEditAllLocation

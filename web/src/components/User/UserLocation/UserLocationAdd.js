import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
} from '@material-ui/core'
import { CONF } from '../../../constants'

const TITLE = 'New Location'

const useStyles = makeStyles(theme => ({
    fullWidth: {
        margin: theme.spacing(1),
        width: '96%',
    },
}))

const UserLocationAdd = (props) => {
    const { open, isProcessing, siblingNames, onSave, onCancel } = props
    const classes = useStyles()
    const [currentName, setName] = React.useState('')
    const [currentDescription, setDescription] = React.useState('')
    const isErrorName = () => (
        (!currentName) ? (
            // if Description entered while node name is empty, return error
            (currentDescription)
        ) : (
            // if node is entered and it is the same as any sibling name, return error
            !isProcessing && siblingNames.includes(currentName)    
        )
    )
    const isDisabledSave = () => (
        !currentName ||
        siblingNames.includes(currentName)
    )
    const handleSave = () => {
        onSave({
            name: currentName,
            description: currentDescription,
        })
    }
    return (
        <form noValidate autoComplete="off">
            <Dialog open={open} onClose={onCancel} aria-labelledby="new-location-title">
                <DialogTitle id="new-location-title">{TITLE}</DialogTitle>
                <DialogContent className={classes.content}>
                    <div>
                        <FormControl className={classes.fullWidth}>
                            <TextField
                                id="name"
                                label="Name"
                                value={currentName}
                                type="text"
                                required
                                autoFocus
                                error={isErrorName()}
                                inputProps={{
                                    maxLength: CONF.MAX_INPUT_CHARS,
                                }}
                                onChange={event => setName(event.target.value)}
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
                            'Save'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}

export default UserLocationAdd

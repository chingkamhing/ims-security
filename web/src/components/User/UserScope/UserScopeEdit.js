import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    FormControl,
    TextField,
} from '@material-ui/core'
import { CONF } from '../../../constants'

const useStyles = makeStyles(theme => ({
    fullWidth: {
        margin: theme.spacing(1),
        width: '96%',
    },
    leftAlignDialogActions: {
        justifyContent: 'flex-start'
    },
    rightAlignDialogActions: {
        justifyContent: 'flex-end'
    },
}))

// location edit inputs
const UserScopeEdit = ({selected, name, description, hasSave, isProcessing, onSave}) => {
    const classes = useStyles()
    const [currentName, setName] = React.useState(name || '')
    const [currentDescription, setDescription] = React.useState(description || '')
    React.useEffect(() => {
        setName(name || '')
        setDescription(description || '')
    }, [name, description])
    const handleSave = () => {
        onSave({
            name: currentName,
            description: currentDescription,
        })
    }
    return (
        <>
            <DialogContent className={classes.content}>
                <FormControl className={classes.fullWidth}>
                    <TextField
                        id="name"
                        label="Name"
                        value={currentName}
                        type="text"
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
                <FormControl className={classes.fullWidth}>
                    <TextField
                        id="scopeId"
                        label="Scope ID"
                        value={selected}
                        type="text"
                        readOnly
                    />
                </FormControl>
                { hasSave &&
                    <DialogActions classes={{ root: classes.leftAlignDialogActions }}>
                        <Button disabled={!(selected) || (name === currentName && description === currentDescription && !isProcessing)} onClick={handleSave} color="primary">
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
                }
            </DialogContent>
        </>
    )
}

export default UserScopeEdit

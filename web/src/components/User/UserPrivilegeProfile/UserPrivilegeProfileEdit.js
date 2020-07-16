import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
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
import { isTwoArraySimilar } from '../../../lib/helper'
import { CONF, PRIVILEGE, MenuProps } from '../../../constants'

const TITLE = 'Privilege Profile'

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

const UserPrivilegeProfileEdit = (props) => {
    const { editItem, isProcessing, onSave, onCancel } = props
    const { id, name, description, privileges } = editItem || {}
    const theme = useTheme()
    const classes = useStyles()
    const [currentName, setName] = React.useState(name || '')
    const [currentDescription, setDescription] = React.useState(description || '')
    const [currentPrivileges, setPrivileges] = React.useState(privileges || [])
    React.useEffect(() => {
        setName(name || '')
        setDescription(description || '')
        setPrivileges(privileges || [])
    }, [name, description, privileges])
    const handlePrivilegesChange = (event) => {
        setPrivileges(event.target.value)
    }
    const isDisabledSave = () => (
        (!currentName) ||
        (
            (name === currentName) && 
            (description === currentDescription) && 
            (isTwoArraySimilar(privileges, currentPrivileges))
        )
    )
    const handleSave = () => {
        onSave({
            id,
            name: currentName,
            description: currentDescription,
            privileges: currentPrivileges,
        })
    }
    const getStyles = (item, allItems, theme) => ({
        fontWeight:
            allItems.indexOf(item) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    })
    return (
        <form noValidate autoComplete="off">
            <Dialog open={!!editItem} onClose={onCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{TITLE}</DialogTitle>
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
                                inputProps={{
                                    maxLength: CONF.MAX_INPUT_CHARS,
                                }}
                                onChange={event => setName(event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.fullWidth}>
                            <InputLabel id="access-profile-locks">Privileges</InputLabel>
                            <Select
                                labelId="access-profile-locks-label"
                                id="access-profile-locks"
                                multiple
                                value={currentPrivileges}
                                onChange={handlePrivilegesChange}
                                input={<Input id="select-access-profile-locks" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {Object.values(PRIVILEGE).map(privilege => (
                                    <MenuItem key={privilege} value={privilege} style={getStyles(name, currentPrivileges, theme)}>
                                        {privilege}
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

export default UserPrivilegeProfileEdit

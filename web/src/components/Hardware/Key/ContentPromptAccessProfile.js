import React from 'react'
import { useSelector } from 'react-redux'
import {
    Chip,
    CircularProgress,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { selectAccessProfile, selectIsProgramming } from '../../../store/reducers'

const TITLE = 'Download Access Profile'

// Prompt dialog for an access profile to download to access key
const ContentPromptAccessProfile = (props) => {
    const { dialogItem, classes, MenuProps, onSave, onCancel } = props
    const { _dialogOperation } = dialogItem || {}
    const accessProfileObject = useSelector(selectAccessProfile)
    const isProgramming = useSelector(selectIsProgramming)
    const [currentAccessProfiles, setAccessProfiles] = React.useState([])
    const handleAccessProfileChange = (event) => {
        setAccessProfiles(event.target.value)
    }
    const isDisabledSave = () => (
        (currentAccessProfiles.length <= 0)
    )
    const handleSave = () => {
        onSave({
            _dialogOperation,
            accessProfileId: currentAccessProfiles,
        })
    }
    return (
        <>
            <DialogTitle id="form-dialog-title">{TITLE}</DialogTitle>
            <DialogContent className={classes.content}>
                <FormControl className={classes.fullWidth}>
                    <InputLabel id="download-access-profile-label" required>Access Profile</InputLabel>
                    <Select
                        labelId="download-access-profile-label"
                        id="download-access-profile"
                        multiple
                        value={currentAccessProfiles}
                        onChange={handleAccessProfileChange}
                        input={<Input id="download-access-profile-locks" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={accessProfileObject[value].name} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {Object.values(accessProfileObject).map(accessProfile => (
                            <MenuItem key={accessProfile.id} value={accessProfile.id}>
                                {accessProfile.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button color="primary" disabled={isDisabledSave()} onClick={handleSave}>
                    {isProgramming ? (
                        <>
                            Programing...
                            <CircularProgress size={'1em'} color="inherit" />
                        </>
                    ) : (
                        'Program'
                    )}
                </Button>
            </DialogActions>
        </>
    )
}

export default ContentPromptAccessProfile
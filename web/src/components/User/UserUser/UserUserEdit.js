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
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import * as moment from 'moment'
import TreeSelect from '../../TreeSelect'
import { selectPrivilegeProfile, selectLocation } from '../../../store/reducers'
import { isTwoArraySimilar } from '../../../lib/helper'
import { CONF } from '../../../constants'

const TITLE = 'User'

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

const UserUserEdit = (props) => {
    const { editItem, isProcessing, onSave, onCancel } = props
    const { id, username, name, company, email, phoneNumber, locationIds, privilegeProfileId, description, validPeriod } = editItem || {}
    const { from, to } = (({ from, to }) => {
        from = (from || 0) * 1000
        to = (to || 0) * 1000
        return {from, to}
    })(validPeriod || {})
    const privilegeProfileObject = useSelector(selectPrivilegeProfile)
    const location = useSelector(selectLocation)
    const classes = useStyles()
    const [currentUsername, setUsername] = React.useState(username || '')
    const [currentName, setName] = React.useState(name || '')
    const [currentCompany, setCompany] = React.useState(company || '')
    const [currentEmail, setEmail] = React.useState(email || '')
    const [currentPhoneNumber, setPhoneNumber] = React.useState(phoneNumber || '')
    const [currentLocationIds, setLocationIds] = React.useState(locationIds || [])
    const [currentPrivilegeProfileId, setPrivilegeProfile] = React.useState(privilegeProfileId || '')
    const [currentDescription, setDescription] = React.useState(description || '')
    const [currentValidFrom, setValidFrom] = React.useState(from || CONF.UI_DEFAULT_DATE_FROM)
    const [currentValidTo, setValidTo] = React.useState(to || CONF.UI_DEFAULT_DATE_TO)
    React.useEffect(() => {
        setUsername(username || '')
        setName(name || '')
        setCompany(company || '')
        setEmail(email || '')
        setPhoneNumber(phoneNumber || '')
        setLocationIds(locationIds || [])
        setPrivilegeProfile(privilegeProfileId || '')
        setDescription(description || '')
        setValidFrom(from || CONF.UI_DEFAULT_DATE_FROM)
        setValidTo(to || CONF.UI_DEFAULT_DATE_TO)
    }, [username, name, company, email, phoneNumber, locationIds, privilegeProfileId, description, from, to])
    const handlePrivilegeProfileChange = (event) => {
        setPrivilegeProfile(event.target.value)
    }
    const handleFromDateChange = (date) => {
        setValidFrom(moment(date).startOf('day').unix() * 1000)
    }
    const handleToDateChange = (date) => {
        setValidTo(moment(date).endOf('day').unix() * 1000)
    }
    const isDisabledSave = () => (
        (!currentUsername) || (currentLocationIds.length <= 0) || (!currentPrivilegeProfileId) ||
        (
            (username === currentUsername) && 
            (name === currentName) && 
            (company === currentCompany) && 
            (email === currentEmail) && 
            (phoneNumber === currentPhoneNumber) && 
            (isTwoArraySimilar(locationIds, currentLocationIds)) && 
            (privilegeProfileId === currentPrivilegeProfileId) && 
            (validPeriod.from === Math.floor(currentValidFrom / 1000)) && 
            (validPeriod.to === Math.floor(currentValidTo / 1000)) && 
            (description === currentDescription)
        )
    )
    const handleSave = () => {
        onSave({
            id,
            username: currentUsername,
            name: currentName,
            company: currentCompany,
            email: currentEmail,
            phoneNumber: currentPhoneNumber,
            locationIds: currentLocationIds,
            privilegeProfileId: currentPrivilegeProfileId,
            validPeriod: {
                from: currentValidFrom / 1000,
                to: currentValidTo / 1000,
            },
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
                                id="username"
                                label="Username"
                                value={currentUsername}
                                type="text"
                                required
                                autoFocus
                                inputProps={{
                                    maxLength: CONF.MAX_INPUT_CHARS,
                                }}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.halfWidth}>
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
                        <FormControl className={classes.halfWidth}>
                            <TextField
                                id="company"
                                label="Company"
                                value={currentCompany}
                                type="text"
                                inputProps={{
                                    maxLength: CONF.MAX_INPUT_CHARS,
                                }}
                                onChange={event => setCompany(event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.halfWidth}>
                            <TextField
                                id="email"
                                label="Email"
                                value={currentEmail}
                                type="text"
                                inputProps={{
                                    maxLength: CONF.MAX_INPUT_CHARS,
                                }}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.halfWidth}>
                            <TextField
                                id="phoneNumber"
                                label="Phone Number"
                                value={currentPhoneNumber}
                                type="text"
                                inputProps={{
                                    maxLength: CONF.MAX_PHONE_NUMBER_CHARS,
                                }}
                                onChange={event => setPhoneNumber(event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.fullWidth}>
                            <TreeSelect
                                id="locationIds"
                                label="Location"
                                value={currentLocationIds}
                                multiple
                                nodes={location}
                                required
                                onChange={(_, pathIds) => setLocationIds(pathIds)}
                            />
                        </FormControl>
                        <FormControl className={classes.fullWidth}>
                            <InputLabel id="download-privilege-profile-label" required>Privilege Profile</InputLabel>
                            <Select
                                labelId="download-privilege-profile-label"
                                id="download-privilege-profile"
                                value={currentPrivilegeProfileId}
                                onChange={handlePrivilegeProfileChange}
                            >
                                <MenuItem key={0} value=''>
                                    <em>None</em>
                                </MenuItem>
                                {Object.values(privilegeProfileObject).map(privilegeProfile => (
                                    <MenuItem key={privilegeProfile.id} value={privilegeProfile.id}>
                                        {privilegeProfile.name}
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
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <FormControl className={classes.halfWidth}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-from"
                                    label="Valid (From)"
                                    value={currentValidFrom}
                                    onChange={handleFromDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </FormControl>
                            <FormControl className={classes.halfWidth}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-to"
                                    label="Valid (To)"
                                    value={currentValidTo}
                                    onChange={handleToDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </FormControl>
                        </MuiPickersUtilsProvider>
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

export default UserUserEdit

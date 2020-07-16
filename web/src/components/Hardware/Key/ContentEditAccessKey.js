import React from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
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
import TextField from '@material-ui/core/TextField'
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
import { selectAccessProfile, selectUser, selectLocation, selectIsUpdatingKey } from '../../../store/reducers'
import { CONF } from '../../../constants'

const TITLE = 'Edit Access Key'

// Edit dialog for accesss key
const ContentEditAccessKey = (props) => {
    const { dialogItem, classes, MenuProps, onlineKeys, onSave, onCancel } = props
    const { _dialogOperation, serialNumber, type, name, locationId, holder, description, validPeriod } = dialogItem || {}
    const { from, to } = (({ from, to }) => {
        from = (from || 0) * 1000
        to = (to || 0) * 1000
        return {from, to}
    })(validPeriod || {})
    const isKeyOnline = onlineKeys.includes(serialNumber)
    const accessProfileObject = useSelector(selectAccessProfile)
    const userObject = useSelector(selectUser)
    const location = useSelector(selectLocation)
    const isProcessing = useSelector(selectIsUpdatingKey)
    const theme = useTheme()
    const [currentName, setName] = React.useState(name || '')
    const [currentLocationId, setLocationId] = React.useState(locationId || '')
    const [currentHolder, setHolder] = React.useState(holder || '')
    const [currentDescription, setDescription] = React.useState(description || '')
    const [currentValidFrom, setValidFrom] = React.useState(from || CONF.UI_DEFAULT_DATE_FROM)
    const [currentValidTo, setValidTo] = React.useState(to || CONF.UI_DEFAULT_DATE_TO)
    const [currentAccessProfiles, setAccessProfiles] = React.useState([])
    React.useEffect(() => {
        setName(name || '')
        setLocationId(locationId || '')
        setHolder(holder || '')
        setDescription(description || '')
        setValidFrom(from || CONF.UI_DEFAULT_DATE_FROM)
        setValidTo(to || CONF.UI_DEFAULT_DATE_TO)
        setAccessProfiles([])
    }, [name, locationId, holder, description, from, to])
    const handleHolderChange = (event) => {
        setHolder(event.target.value)
    }
    const handleFromDateChange = (date) => {
        setValidFrom(moment(date).startOf('day').unix() * 1000)
    }
    const handleToDateChange = (date) => {
        setValidTo(moment(date).endOf('day').unix() * 1000)
    }
    const handleAccessProfileChange = (event) => {
        setAccessProfiles(event.target.value)
    }
    const isDisabledSave = () => (
        (!serialNumber) || (!currentLocationId) ||
        (
            (name === currentName) && 
            (locationId === currentLocationId) && 
            (holder === currentHolder) && 
            (validPeriod.from === Math.floor(currentValidFrom / 1000)) && 
            (validPeriod.to === Math.floor(currentValidTo / 1000)) && 
            (description === currentDescription) && 
            (currentAccessProfiles.length <= 0)
        )
    )
    const handleSave = () => {
        onSave({
            _dialogOperation,
            serialNumber,
            type,
            name: currentName,
            locationId: currentLocationId,
            holder: currentHolder,
            validPeriod: {
                from: currentValidFrom / 1000,
                to: currentValidTo / 1000,
            },
            description: currentDescription,
            accessProfiles: currentAccessProfiles,
        })
    }
    const getStyles = (item, allItems, theme) => ({
        fontWeight:
            allItems.indexOf(item) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    })
    return (
        <>
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
                            id="type"
                            label="Key Type"
                            defaultValue={type}
                            type="text"
                            disabled
                        />
                    </FormControl>
                    <FormControl className={classes.halfWidth}>
                        <TextField
                            id="online"
                            label="Online Status"
                            defaultValue={isKeyOnline ? 'On-line' : 'Off-line'}
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
                        <InputLabel id="key-holder-label">holder</InputLabel>
                        <Select
                            labelId="key-holder-label"
                            id="key-holder"
                            value={currentHolder}
                            onChange={handleHolderChange}
                        >
                            {Object.values(userObject).map(user => (
                                <MenuItem key={user.username} value={user.id}>
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
                                disabled={!isKeyOnline}
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
                                disabled={!isKeyOnline}
                                value={currentValidTo}
                                onChange={handleToDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </FormControl>
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <FormControl className={classes.fullWidth}>
                        <InputLabel id="access-profile-locks">Access Profile</InputLabel>
                        <Select
                            labelId="access-profile-locks-label"
                            id="access-profile-locks"
                            multiple
                            disabled={!isKeyOnline}
                            value={currentAccessProfiles}
                            onChange={handleAccessProfileChange}
                            input={<Input id="select-access-profile-locks" />}
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
                                <MenuItem key={accessProfile.id} value={accessProfile.id} style={getStyles(name, currentAccessProfiles, theme)}>
                                    {accessProfile.name}
                                </MenuItem>
                            ))}
                        </Select>
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
        </>
    )
}

export default ContentEditAccessKey

import React from 'react'
import { useSelector } from 'react-redux'
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import * as moment from 'moment'
import TreeSelect from '../../TreeSelect'
import { selectUser, selectLocation, selectIsUpdatingKey } from '../../../store/reducers'
import { CONF } from '../../../constants'

const TITLE = 'Edit Management Key'

// Edit dialog for management key
const ContentEditManagementKey = (props) => {
    const { dialogItem, classes, onlineKeys, onSave, onCancel } = props
    const { _dialogOperation, serialNumber, type, name, locationId, holder, description, validPeriod } = dialogItem || {}
    const { from, to } = (({ from, to }) => {
        from = (from || 0) * 1000
        to = (to || 0) * 1000
        return {from, to}
    })(validPeriod || {})
    const isKeyOnline = onlineKeys.includes(serialNumber)
    const userObject = useSelector(selectUser)
    const location = useSelector(selectLocation)
    const isProcessing = useSelector(selectIsUpdatingKey)
    const [currentName, setName] = React.useState(name || '')
    const [currentLocationId, setLocationId] = React.useState(locationId || '')
    const [currentHolder, setHolder] = React.useState(holder || '')
    const [currentDescription, setDescription] = React.useState(description || '')
    const [currentValidFrom, setValidFrom] = React.useState(from || CONF.UI_DEFAULT_DATE_FROM)
    const [currentValidTo, setValidTo] = React.useState(to || CONF.UI_DEFAULT_DATE_TO)
    React.useEffect(() => {
        setName(name || '')
        setLocationId(locationId || '')
        setHolder(holder || '')
        setDescription(description || '')
        setValidFrom(from || '')
        setValidTo(to || '')
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
    const isDisabledSave = () => (
        (!serialNumber) || (!currentLocationId) ||
        (
            (name === currentName) && 
            (locationId === currentLocationId) && 
            (holder === currentHolder) && 
            (validPeriod.from === Math.floor(currentValidFrom / 1000)) && 
            (validPeriod.to === Math.floor(currentValidTo / 1000)) && 
            (description === currentDescription)
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
        })
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
                        <InputLabel id="key-holder-label">Holder</InputLabel>
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

export default ContentEditManagementKey

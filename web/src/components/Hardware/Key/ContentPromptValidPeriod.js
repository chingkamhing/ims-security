import React from 'react'
import { useSelector } from 'react-redux'
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import * as moment from 'moment'
import { selectIsUpdatingKey } from '../../../store/reducers'

const TITLE = 'Extend Valid Period'

// one day in seconds
const ONE_DAY_SECONDS = 86400

const periods = [
    {
        name: '1 day',
        days: 1,
    },
    {
        name: '2 days',
        days: 2,
    },
    {
        name: '3 days',
        days: 3,
    },
    {
        name: '1 week',
        days: 7,
    },
    {
        name: '2 weeks',
        days: 14,
    },
    {
        name: '4 weeks',
        days: 28,
    },
]

// Prompt dialog for to extend valid period to access key
const ContentPromptValidPeriod = (props) => {
    const { dialogItem, classes, onSave, onCancel } = props
    const { _dialogOperation } = dialogItem || {}
    const isProgramming = useSelector(selectIsUpdatingKey)
    const [currentDays, setExtendDays] = React.useState(periods[0].days)
    const handleValidPeriodChange = (event) => {
        setExtendDays(event.target.value)
    }
    const isDisabledSave = () => (
        // always enable Save button
        false
    )
    const handleSave = () => {
        const from = moment().startOf('day').unix()
        const to = from + currentDays * ONE_DAY_SECONDS - 1
        onSave({
            _dialogOperation,
            validPeriod: {
                from,
                to,
            },
        })
    }
    return (
        <>
            <DialogTitle id="form-dialog-title">{TITLE}</DialogTitle>
            <DialogContent className={classes.content}>
                <FormControl className={classes.fullWidth}>
                    <InputLabel id="extend-valid-period-label" required>Extend Period</InputLabel>
                    <Select
                        labelId="extend-valid-period-label"
                        id="extend-valid-period"
                        value={currentDays}
                        onChange={handleValidPeriodChange}
                    >
                        {Object.values(periods).map(extendPeriod => (
                            <MenuItem key={extendPeriod.days} value={extendPeriod.days}>
                                {extendPeriod.name}
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

export default ContentPromptValidPeriod
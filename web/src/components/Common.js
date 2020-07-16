import React from 'react'
import {
    Box,
    Tooltip,
    Typography,
} from '@material-ui/core'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import grey from '@material-ui/core/colors/grey'
import { green, red } from '@material-ui/core/colors'
import { CONF } from '../constants'

// company title
export const SystemTitle = (props) => (
    <Typography
        component="h2"
        variant="h5"
        align="center"
        noWrap
        className={props.className}
    >
        <Box component="span" color={grey[500]} fontSize={26} fontWeight="fontWeightBold" fontStyle="italic">
            {CONF.SYSTEM_BRAND + ' '}
        </Box>
        <Box component="span" color={grey[500]} fontSize={26} fontWeight="fontWeightBold">
            {CONF.SYSTEM_NAME}
        </Box>
    </Typography>
)

// icon title
export const ICON_TITLE = {
    ON_LINE: 'On-line',
    OFF_LINE: 'Off-line',
    INITIALIZED: 'Initialized',
    NOT_INITIALIZED: 'Not-initialized',
    REGISTERED: 'Registered',
    NOT_REGISTERED: 'Not-registered',
}

// on line icon
export const Online = () => (<Tooltip title={ICON_TITLE.ON_LINE}><TurnedInIcon style={{ color: green[500] }} /></Tooltip>)
// off line icon
export const Offline = () => (<Tooltip title={ICON_TITLE.OFF_LINE}><TurnedInNotIcon style={{ color: red[500] }} /></Tooltip>)

// lock initialized icon
export const Initialized = () => (<Tooltip title={ICON_TITLE.INITIALIZED}><AssignmentIcon style={{ color: green[500] }} /></Tooltip>)
// lock not initialized icon
export const NotInitialized = () => (<Tooltip title={ICON_TITLE.NOT_INITIALIZED}><AssignmentLateIcon style={{ color: red[500] }} /></Tooltip>)

// key manager registered icon
export const Registered = () => (<Tooltip title={ICON_TITLE.REGISTERED}><AssignmentIndIcon style={{ color: green[500] }} /></Tooltip>)
// lock not initialized icon
export const NotRegistered = () => (<Tooltip title={ICON_TITLE.NOT_REGISTERED}><AssignmentLateIcon style={{ color: red[500] }} /></Tooltip>)

import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
    Backdrop,
    CircularProgress,
    Typography,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

// spin loader overlay
const LoadingOverlay = (props) => {
    const { active, text, children } = props
    const classes = useStyles()
    return (
        <>
            {children}
            <Backdrop className={classes.backdrop} open={active}>
                <Typography variant="h5">
                    {text}
                </Typography>
                <CircularProgress color="inherit" size="2em" />
            </Backdrop>
        </>
    )
}

LoadingOverlay.propTypes = {
    active: PropTypes.bool.isRequired,
    text: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
}

export default LoadingOverlay

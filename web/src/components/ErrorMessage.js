import React from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'

const ErrorMessage = (props) => {
    const { show, title, onHide, children } = props
    return (
        <Dialog
            open={show}
            onClose={onHide}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" autoFocus onClick={onHide}>
                    close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ErrorMessage.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
}

export default ErrorMessage

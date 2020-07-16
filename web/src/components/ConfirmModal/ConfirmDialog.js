import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'

function ConfirmDialog(props) {
    const { open, title, children, value, okText='Yes', cancelText='No', onOk, onCancel, ...other } = props
    return (
        <Dialog
            aria-labelledby="confirmation-dialog-title"
            open={open}
            onClose={onCancel}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {Boolean(cancelText) && <Button color="primary" autoFocus onClick={onCancel}>
                    {cancelText}
                </Button>}
                <Button color="primary" onClick={onOk}>
                    {okText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}

export default ConfirmDialog

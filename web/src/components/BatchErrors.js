import React from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const BatchErrors = (props) => {
    const { show, onHide, batchErrors } = props
    return (
        <Dialog
            open={show}
            onClose={onHide}
            aria-labelledby="batch-errors-title"
            aria-describedby="batch-errors-description"
        >
            <DialogTitle id="batch-errors-title">
                Error
            </DialogTitle>
            <DialogContent>
                {batchErrors.map((batchError, i) => <BatchError key={i} batchError={batchError} />)}
            </DialogContent>
            <DialogActions>
                <Button color="primary" autoFocus onClick={onHide}>
                    close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const BatchError = (props) => {
    const { batchError } = props
    const { tag, message } = batchError
    return (
        <Alert severity="error">
            <Typography>
                <b>Request fail for {tag}:</b> {message}
            </Typography>
        </Alert>
    )
}

BatchErrors.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    batchErrors: PropTypes.arrayOf(PropTypes.object),
}

export default BatchErrors

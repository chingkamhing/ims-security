import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import ContentEditLock from './ContentEditLock'
import ContentEditAllLocation from './ContentEditAllLocation'

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

export const DIALOG_OPERATION = {
    EDIT_LOCK: 'EDIT_LOCK',
    EDIT_ALL_LOCATION: 'EDIT_ALL_LOCATION',
}

const LockDialog = (props) => {
    const { _dialogOperation, editItem, onCancel } = props
    const classes = useStyles()
    const content = (() => {
        switch (_dialogOperation) {
            case DIALOG_OPERATION.EDIT_LOCK:
                return <ContentEditLock classes={classes} {...props} />
            case DIALOG_OPERATION.EDIT_ALL_LOCATION:
                return <ContentEditAllLocation classes={classes} {...props} />
            default:
                break
        }
        return null
    })()
    return content && (
        <form noValidate autoComplete="off">
            <Dialog open={Boolean(editItem)} onClose={onCancel} aria-labelledby="form-dialog-title">
                {content}
            </Dialog>
        </form>
    )
}

export default LockDialog

import React from 'react'
import { useSelector } from 'react-redux'
import {
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { selectIsDeregisteringKey, selectIsProgramming } from '../../../store/reducers'

// Prompt dialog for yes or no before proceed
const ContentPromptYesNo = (props) => {
    const { dialogItem, onSave, onCancel } = props
    const { _dialogOperation, _dialogTitle, _dialogMessage } = dialogItem || {}
    const isDeregisteringKey = useSelector(selectIsDeregisteringKey)
    const isProgramming = useSelector(selectIsProgramming)
    const handleSave = () => {
        onSave({
            _dialogOperation,
        })
    }
    return (
        <>
            <DialogTitle id="form-dialog-title">{_dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {_dialogMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onCancel}>
                    No
                </Button>
                <Button color="primary" onClick={handleSave}>
                    {(isDeregisteringKey || isProgramming) ? (
                        <>
                            Yes
                            <CircularProgress size={'1em'} color="inherit" />
                        </>
                    ) : (
                        'Yes'
                    )}
                </Button>
            </DialogActions>
        </>
    )
}

export default ContentPromptYesNo
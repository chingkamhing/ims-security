import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import ContentEditAccessKey from './ContentEditAccessKey'
import ContentEditManagementKey from './ContentEditManagementKey'
import ContentPromptValidPeriod from './ContentPromptValidPeriod'
import ContentPromptAccessProfile from './ContentPromptAccessProfile'
import ContentPromptYesNo from './ContentPromptYesNo'
import { KEY_TYPE, MenuProps } from '../../../constants'

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
    EDIT_KEY: 'EDIT_KEY',
    DEREGISTER_KEY: 'DEREGISTER_KEY',
    FACTORY_RESET: 'FACTORY_RESET',
    EXTEND_VALID_PERIOD: 'EXTEND_VALID_PERIOD',
    DOWNLOAD_ACCESS_PROFILE: 'DOWNLOAD_ACCESS_PROFILE',
    BE_LOCK_READER: 'BE_LOCK_READER',
    READ_ACCESS_HISTORY: 'READ_ACCESS_HISTORY',
    BE_LOCK_INITIALIZER: 'BE_LOCK_INITIALIZER',
    READ_INITIALIZED_LOCK: 'READ_INITIALIZED_LOCK',
    BE_AUTHEN_TOKEN_INITIALIZER: 'BE_AUTHEN_TOKEN_INITIALIZER',
    READ_INITIALIZED_AUTHEN_TOKEN: 'READ_INITIALIZED_AUTHEN_TOKEN',
}

const KeyDialog = (props) => {
    const { dialogItem, onCancel } = props
    const { _dialogOperation, type } = dialogItem || {}
    const classes = useStyles()
    const content = (() => {
        switch (_dialogOperation) {
            case DIALOG_OPERATION.EDIT_KEY:
                if (type === KEY_TYPE.ACCESS) {
                    return <ContentEditAccessKey classes={classes} MenuProps={MenuProps} {...props} />
                } else if (type === KEY_TYPE.MANAGEMENT) {
                    return <ContentEditManagementKey classes={classes} {...props} />
                }
                break
            case DIALOG_OPERATION.EXTEND_VALID_PERIOD:
                return <ContentPromptValidPeriod classes={classes} {...props} />
            case DIALOG_OPERATION.DOWNLOAD_ACCESS_PROFILE:
            case DIALOG_OPERATION.BE_LOCK_INITIALIZER:
                return <ContentPromptAccessProfile classes={classes} {...props} />
            case DIALOG_OPERATION.DEREGISTER_KEY:
            case DIALOG_OPERATION.FACTORY_RESET:
            case DIALOG_OPERATION.BE_LOCK_READER:
            case DIALOG_OPERATION.READ_ACCESS_HISTORY:
            case DIALOG_OPERATION.READ_INITIALIZED_LOCK:
            case DIALOG_OPERATION.BE_AUTHEN_TOKEN_INITIALIZER:
            case DIALOG_OPERATION.READ_INITIALIZED_AUTHEN_TOKEN:
                return <ContentPromptYesNo classes={classes} {...props} />
            default:
                break
        }
        return null
    })()
    return content && (
        <form noValidate autoComplete="off">
            <Dialog open={!!dialogItem} onClose={onCancel} aria-labelledby="form-dialog-title">
                {content}
            </Dialog>
        </form>
    )
}

export default KeyDialog

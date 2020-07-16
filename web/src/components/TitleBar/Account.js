import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Popover,
    Typography,
} from '@material-ui/core'
import * as moment from 'moment'
import { selectMyselfName, selectMyselfCompany, selectMyselfEmail, selectMyselfPrivileges, selectLastActivityUpdateTime, selectLastVersionUpdateTime } from '../../store/reducers'
import actions from '../../actions'
import { CONF } from '../../constants'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 400,
    },
    leftAlignDialogActions: {
        justifyContent: 'flex-start',
        margin: theme.spacing(2),
    },
}))

const Account = (props) => {
    const { anchorEl, open, onClose } = props
    const name = useSelector(selectMyselfName)
    const company = useSelector(selectMyselfCompany)
    const email = useSelector(selectMyselfEmail)
    const privileges = useSelector(selectMyselfPrivileges)
    const lastActivityUpdateTime = useSelector(selectLastActivityUpdateTime)
    const lastVersionUpdateTime = useSelector(selectLastVersionUpdateTime)
    const classes = useStyles()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(actions.logout())
    }
    return (
        <Popover
            id="account-popover"
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            className={classes.root}
        >
            <DialogTitle>
                {name}
            </DialogTitle>
            <DialogContent>
                <Typography component="p"><b>Company:</b> {company}</Typography>
                <Typography component="p"><b>Email:</b> {email}</Typography>
                <Typography component="p"><b>Privileges:</b> {privileges.join(', ')}</Typography>
                <Typography component="p">
                    <b>Last activity update time:</b>
                    <div>{moment(lastActivityUpdateTime).format(CONF.DATETIME_FORMAT)}</div>
                </Typography>
                <Typography component="p">
                    <b>Last database update time:</b>
                    <div>{moment(lastVersionUpdateTime).format(CONF.DATETIME_FORMAT)}</div>
                </Typography>
            </DialogContent>
            <DialogActions classes={{ root: classes.leftAlignDialogActions }}>
                <Button key='Logout' color="primary" onClick={logout}>
                    Logout
                </Button>
            </DialogActions>
        </Popover>
    )
}

export default Account

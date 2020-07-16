import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    FormControl,
    TextField,
    Typography,
} from '@material-ui/core'
import { selectMyselfId, selectMyselfIsChangingPassword } from '../../store/reducers'
import { isPasswordSecure } from '../../lib/helper'
import { CONF } from '../../constants'
import actions from '../../actions'

const TITLE = 'Change Password'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        width: '50%',
        minWidth: 400,
    },
    title: {
        fontSize: 20,
    },
    input: {
        margin: theme.spacing(2),
        width: '96%',
    },
    action: {
        margin: theme.spacing(2),
    },
}))

const SettingChangePassword = () => {
    const id = useSelector(selectMyselfId)
    const isChangingPassword = useSelector(selectMyselfIsChangingPassword)
    const dispatch = useDispatch()
    const classes = useStyles()
    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    function usePrevious(value) {
        const ref = React.useRef()
        React.useEffect(() => {
            ref.current = value
        })
        return ref.current
    }
    const prev = usePrevious({isChangingPassword})
    React.useEffect(() => {
        if ((prev) && (prev.isChangingPassword === true) && (isChangingPassword === false)) {
            // successfully changed password, clear all the input fields
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        }
    }, [prev, isChangingPassword])
    const isErrorOldPassword = () => (
        ((newPassword) || (confirmPassword)) &&
        (!oldPassword)
    )
    const isErrorNewPassword = (password) => (
        (!newPassword) ? (
            (oldPassword) || (confirmPassword)
        ) : (
            !isPasswordSecure(password)
        )
    )
    const isErrorConfirmPassword = () => (
        (!confirmPassword) ? (
            (oldPassword) || (newPassword)
        ) : (
            (newPassword !== confirmPassword)
        )
    )
    const isSaveDisabled = (password) => (!Boolean(password) || isErrorNewPassword(password) || (newPassword !== confirmPassword))
    const handleSave = () => {
        dispatch(actions.userChangePassword(id, oldPassword, newPassword))
    }
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title}>
                        {TITLE}
                    </Typography>
                    <FormControl className={classes.input}>
                        <TextField
                            id="oldPassword"
                            label="Old Password"
                            value={oldPassword}
                            type="password"
                            required
                            error={isErrorOldPassword()}
                            helperText="Please enter old password."
                            inputProps={{
                                maxLength: CONF.MAX_INPUT_CHARS,
                            }}
                            onChange={event => setOldPassword(event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={classes.input}>
                        <TextField
                            id="newPassword"
                            label="New Password"
                            value={newPassword}
                            type="password"
                            required
                            error={isErrorNewPassword(newPassword)}
                            helperText={`Enter new password with at least ${CONF.PASSWORD_MIN_LENGTH} chars and upper and lower cases.`}
                            inputProps={{
                                maxLength: CONF.MAX_INPUT_CHARS,
                            }}
                            onChange={event => setNewPassword(event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={classes.input}>
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            value={confirmPassword}
                            type="password"
                            required
                            error={isErrorConfirmPassword()}
                            helperText={isErrorConfirmPassword() ? "New password and confirm password mismatch." : "Please enter confirm password."}
                            inputProps={{
                                maxLength: CONF.MAX_INPUT_CHARS,
                            }}
                            onChange={event => setConfirmPassword(event.target.value)}
                        />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <div className={classes.action}>
                        <Button size="small" color="primary" disabled={isSaveDisabled(newPassword)} onClick={handleSave}>
                            {isChangingPassword ? (
                                    <>
                                        Changing password...
                                        <CircularProgress size={'1em'} color="inherit" />
                                    </>
                                ) : (
                                    'Save'
                                )}
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default SettingChangePassword

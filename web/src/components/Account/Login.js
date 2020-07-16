import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Link,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core'
import { SystemTitle } from '../Common'
import logo from '../../assets/images/equinix-logo-black.png'
import { selectMyselfUsername, selectMyselfLoginStatus } from '../../store/reducers'
import actions from '../../actions'
import { LS } from '../../constants'

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(8),
            padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`,
        },
    },
    titleBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    img: {
        width: "40em",
        height: "8em",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        '& > div, > label': {
            width: '100%',
            marginTop: theme.spacing(3),
        },
        '& > button': {
            width: '100%',
            margin: theme.spacing(3, 0),
        },
    },
})

const mapStateToProps = state => ({
    username: selectMyselfUsername(state),
    isLoggingIn: (selectMyselfLoginStatus(state) === LS.LOGGING_IN),
})
  
const mapDispatchToProps = dispatch => ({
    onError: (message) => {
        dispatch(actions.errorShowMessage(message))
    },
    onUserLogin: (username, password, isRememberMe) => {
        dispatch(actions.userLogin(username, password, isRememberMe))
    },
})

class Login extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isRememberMe: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { name, type } = event.target
        const value = type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const { username, password, isRememberMe } = this.state
        // verify username and confirm password before proceed
        if ((typeof username !== 'string') || (!username)) {
            this.props.onError('Invalid username input!!!')
        } else if (!password) {
            this.props.onError('Plese enter password!!!')
        } else {
            this.props.onUserLogin(username, password, isRememberMe)
        }
    }

    render() {
        const { isLoggingIn, classes } = this.props
        const { isRememberMe } = this.state
        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={2}>
                    <Box className={classes.titleBox}>
                        <Link href="https://www.equinix.hk/" target="_blank">
                            <img src={logo} alt="Equinix" className={classes.img} />
                        </Link>
                        <SystemTitle className={classes.title} />
                        <Typography component="p">
                            Log in to your account
                        </Typography>
                    </Box>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            id="username"
                            name="username"
                            autoComplete="username"
                            label="Login Name"
                            type="text"
                            required
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            label="Password"
                            type="password"
                            required
                            onChange={this.handleChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox name="isRememberMe" value="isRememberMe" checked={isRememberMe} onChange={this.handleChange} />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <>
                                    Logging in...
                                    <CircularProgress size={'1em'} color="inherit" />
                                </>
                            ) : (
                                'Log in'
                            )}
                        </Button>
                    </form>
                </Paper>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { selectMyselfProfileLoaded, selectMyselfName } from '../../store/reducers'
import actions from '../../actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
})

const mapStateToProps = state => ({
    name: selectMyselfName(state),
    isProfileLoaded: selectMyselfProfileLoaded(state),
})
  
const mapDispatchToProps = dispatch => ({
    onLogout: () => {
        dispatch(actions.logout())
    }
})

class Header extends React.PureComponent {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout = () => {
        this.props.onLogout()
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <HeaderToolBar logout={this.logout} {...this.props} />
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const HeaderToolBar = (props) => {
    const { isProfileLoaded, logout, location, classes } = props
    const pathNames = location.pathname.split('/')
    const leaveName = pathNames.slice(-1)[0]
    const names = leaveName.split('-').map(name => (name.charAt(0).toUpperCase() + name.slice(1)))
    const pathname = names.join(' ')
    return isProfileLoaded ? (
        <>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                {pathname}
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
        </>
    ) : (
        <Typography variant="h6" className={classes.title}>
            {pathname}
        </Typography>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)))

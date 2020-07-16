import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    AppBar,
    CssBaseline,
    Drawer,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Tooltip,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Account from './Account'
import { SystemTitle } from '../Common'
import logo from '../../assets/images/equinix-logo-white.png'
import { selectMyselfPrivileges } from '../../store/reducers'
import privilege from '../../lib/privilege'
import { CONF, ROUTE } from '../../constants'

const menusInfo = {
    [ROUTE.ACTIVITY]: {
        name: 'Activity Log',
    },
    [ROUTE.ACCESS_PROFILE]: {
        name: 'Access Profile',
    },
    [ROUTE.HARDWARE]: {
        name: 'Hardware',
    },
    [ROUTE.USER]: {
        name: 'User',
    },
    [ROUTE.SYSTEM]: {
        name: 'System',
    },
    [ROUTE.SETTING]: {
        name: 'My Setting',
    },
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    imgBox: {
        display: 'flex',
        alignItems: 'center',
    },
    img: {
        display: 'flex',
        alignItems: 'center',
        width: '20em',
        height: '3em',
    },
    toolbarTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    drawer: {
        width: CONF.UI_DRAWER_WIDTH,
        flexShrink: 0,
    },
    drawerPaper: {
        width: CONF.UI_DRAWER_WIDTH,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
})

const mapStateToProps = state => ({
    privileges: selectMyselfPrivileges(state),
})

const getPrivilegedMenus = (privileges) => {
    const menus = []
    if (privilege.hasHardware(privileges)) {
        menus.push(ROUTE.HARDWARE)
    }
    if (privilege.hasAccessProfile(privileges)) {
        menus.push(ROUTE.ACCESS_PROFILE)
    }
    if (privilege.hasUser(privileges)) {
        menus.push(ROUTE.USER)
    }
    if (privilege.hasActivity(privileges)) {
        menus.push(ROUTE.ACTIVITY)
    }
    if (privilege.hasSystem(privileges)) {
        menus.push(ROUTE.SYSTEM)
    }
    menus.push(ROUTE.SETTING)
    return menus
}

class ClippedDrawer extends React.PureComponent {
    constructor(props) {
        super(props)
        const privileges = props.privileges || []
        const drawerMenus = getPrivilegedMenus(privileges)
        this.state = {
            drawerMenus,
            routeSelected: drawerMenus.reduce((routeObject, menu) => {
                routeObject[menu] = false
                return routeObject
            }, {}),
            anchorEl: null,
        }
        this.handleAccountClick = this.handleAccountClick.bind(this)
        this.handleAccountClose = this.handleAccountClose.bind(this)
    }

    componentDidUpdate(prevProps) {
        const { privileges } = this.props
        if (privileges !== prevProps.privileges) {
            // base on the user's privilege profile, populate cooresponding drawer menus
            const drawerMenus = getPrivilegedMenus(privileges)
            this.setState({
                drawerMenus,
                routeSelected: drawerMenus.reduce((routeObject, menu) => {
                    routeObject[menu] = false
                    return routeObject
                }, {}),
            })
        }
    }

    handleAccountClick(event) {
        event.stopPropagation()
        this.setState({
            anchorEl: event.currentTarget,
        })
    }

    handleAccountClose() {
        this.setState({
            anchorEl: null,
        })
    }

    render() {
        const { location, classes, children } = this.props
        const { drawerMenus, anchorEl, routeSelected } = this.state
        const open = Boolean(anchorEl)
        Object.keys(routeSelected).forEach((route) => routeSelected[route] = (route === location.pathname))
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={3} className={classes.imgBox}>
                                <Link href="https://www.equinix.hk/" target="_blank">
                                    <img src={logo} alt="Equinix" className={classes.img} />
                                </Link>
                            </Grid>
                            <Grid item xs={6} className={classes.toolbarTitle}>
                                <SystemTitle />
                            </Grid>
                            <Grid item xs={3} align="right">
                                <Tooltip title="Account">
                                    <IconButton
                                        aria-label="account"
                                        aria-controls="account-menu"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={this.handleAccountClick}
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                </Tooltip>
                                <Account
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={this.handleAccountClose}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        {drawerMenus.map((menu) => (
                            <ListItem button component={RouterLink} key={menu} to={menu} selected={routeSelected[menu]}>
                                <ListItemText primary={menusInfo[menu].name} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(ClippedDrawer)))

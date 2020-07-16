import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../TabPanel'
import UserUser from './UserUser'
import UserLocation from './UserLocation'
//FIXME, remove scope first
// import UserScope from './UserScope'
import UserPrivilegeProfile from './UserPrivilegeProfile'
import { selectUserTab } from '../../store/reducers'
import actions from '../../actions'
import { USER_TAB } from '../../constants'

const tabs = [
    {
        name: 'User',
        index: USER_TAB.USER,
        component: <UserUser />,
    },
    {
        name: 'Privilege Profile',
        index: USER_TAB.PRIVILEGE_PROFILE,
        component: <UserPrivilegeProfile />,
    },
    {
        name: 'Location',
        index: USER_TAB.LOCATION,
        component: <UserLocation />,
    },
    //FIXME, remove scope first
    // {
    //     name: 'Scope',
    //     index: USER_TAB.SCOPE,
    //     component: <UserScope />,
    // },
]

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
})

const mapStateToProps = state => ({
    activityTab: selectUserTab(state),
})
  
const mapDispatchToProps = dispatch => ({
    onUserTabSelect: (eventKey) => {
        dispatch(actions.changeUserTabSelect(eventKey))
    },
})

class User extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(_, newTab) {
        const { activityTab } = this.props
        if (newTab !== activityTab) {
            this.props.onUserTabSelect(newTab)
        }
    }

    render() {
        const { activityTab, classes } = this.props
        const a11yProps = (index) => ({
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        })
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={activityTab}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="activity scrollable tabs"
                    >
                        {tabs.map((tab) => (
                            <Tab key={tab.index} label={tab.name} {...a11yProps(tab.index)} />
                        ))}
                    </Tabs>
                </AppBar>
                {tabs.map((tab) => (
                    <TabPanel key={tab.index} index={tab.index} value={activityTab}>
                        {tab.component}
                    </TabPanel>
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(User))

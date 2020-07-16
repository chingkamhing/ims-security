import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../TabPanel'
import Key from './Key'
import KeyManager from './KeyManager'
import Lock from './Lock'
//FIXME, remove authen token feature first
// import AuthenToken from './AuthenToken'
import { selectMyselfPrivileges, selectHardwareTab } from '../../store/reducers'
import privilege from '../../lib/privilege'
import actions from '../../actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
})

const mapStateToProps = state => ({
    privileges: selectMyselfPrivileges(state),
    activityTab: selectHardwareTab(state),
})
  
const mapDispatchToProps = dispatch => ({
    onHardwareTabSelect: (eventKey) => {
        dispatch(actions.changeHardwareTabSelect(eventKey))
    },
})

const getPrivilegedTabs = (privileges) => {
    const tabs = []
    if (privilege.hasAccessResources(privileges)) {
        tabs.push(
            {
                name: 'Key',
                component: <Key />,
            }
        )
    }
    if (privilege.hasManagementResources(privileges)) {
        tabs.push(
            {
                name: 'Key Manager',
                component: <KeyManager />,
            },
            //FIXME, remove authen token feature first
            // {
            //     name: 'Authen Token',
            //     component: <AuthenToken />,
            // },
        )
    }
    if (privilege.hasManagementResources(privileges)) {
        tabs.push(
            {
                name: 'Lock',
                component: <Lock />,
            },
        )
    }
    tabs.forEach((tab, index) => tab.index = index)
    return tabs
}

class Hardware extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(_, newTab) {
        const { activityTab } = this.props
        if (newTab !== activityTab) {
            this.props.onHardwareTabSelect(newTab)
        }
    }

    render() {
        const { privileges, activityTab, classes } = this.props
        const tabs = getPrivilegedTabs(privileges)
        const currentTab = Math.min(activityTab, tabs.length - 1)
        const a11yProps = (index) => ({
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        })
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={currentTab}
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
                    <TabPanel key={tab.index} index={tab.index} value={currentTab}>
                        {tab.component}
                    </TabPanel>
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Hardware))

import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../TabPanel'
import AccessProfileContextLock from './AccessProfileContextLock'
import AccessProfileContextUser from './AccessProfileContextUser'
import AccessProfileContextInfo from './AccessProfileContextInfo'
import { selectAccessProfileSelected, selectAccessProfileTab, selectAccessProfileSelectedRowLocks, selectAccessProfileSelectedRowUsers, selectLocationPath, selectScopePath } from '../../store/reducers'
import { ACCESS_PROFILE_TAB } from '../../constants'
import actions from '../../actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
})

const mapStateToProps = state => ({
    accessProfileSelected: selectAccessProfileSelected(state),
    accessProfileTab: selectAccessProfileTab(state),
    selectedRowLocks: selectAccessProfileSelectedRowLocks(state),
    selectedRowUsers: selectAccessProfileSelectedRowUsers(state),
    locationPathObject: selectLocationPath(state),
    scopePathObject: selectScopePath(state),
})

const mapDispatchToProps = dispatch => ({
    onAccessProfileTabSelect: (eventKey) => {
        dispatch(actions.changeAccessProfileTabSelect(eventKey))
    },
})

class AccessProfileContext extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(_, selectTab) {
        const { accessProfileTab } = this.props
        if (selectTab !== accessProfileTab) {
            this.props.onAccessProfileTabSelect(selectTab)
        }
    }

    render() {
        const { accessProfileSelected, accessProfileTab, selectedRowLocks, selectedRowUsers, locationPathObject, scopePathObject, classes } = this.props
        const tabs = [
            {
                name: 'Lock',
                index: ACCESS_PROFILE_TAB.LOCK,
                component: <AccessProfileContextLock selectedRowLocks={selectedRowLocks} locationPathObject={locationPathObject} scopePathObject={scopePathObject} />,
            },
            {
                name: 'User',
                index: ACCESS_PROFILE_TAB.USER,
                component: <AccessProfileContextUser selectedRowUsers={selectedRowUsers} locationPathObject={locationPathObject} scopePathObject={scopePathObject} />,
            },
            {
                name: 'Info',
                index: ACCESS_PROFILE_TAB.INFO,
                component: <AccessProfileContextInfo locationPathObject={locationPathObject} scopePathObject={scopePathObject} />,
            },
        ]
        const a11yProps = (index) => ({
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        })
        return accessProfileSelected ? (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={accessProfileTab}
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
                    <TabPanel key={tab.index} index={tab.index} value={accessProfileTab}>
                        {tab.component}
                    </TabPanel>
                ))}
            </div>
        ) : (
            null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccessProfileContext))

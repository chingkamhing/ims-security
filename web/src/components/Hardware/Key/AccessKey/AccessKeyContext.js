import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../../../TabPanel'
import AccessKeyContextLock from './AccessKeyContextLock'
import AccessKeyContextUser from './AccessKeyContextUser'
import AccessKeyContextInfo from './AccessKeyContextInfo'
import KeyActivity from '../KeyActivity'
import { selectHardwareKeySelected, selectHardwareKeyTab } from '../../../../store/reducers'
import { HARDWARE_KEY_TAB } from '../../../../constants'
import actions from '../../../../actions'

const tabs = [
    {
        name: 'Lock',
        index: HARDWARE_KEY_TAB.LOCK,
        component: <AccessKeyContextLock />,
    },
    {
        name: 'User',
        index: HARDWARE_KEY_TAB.USER,
        component: <AccessKeyContextUser />,
    },
    {
        name: 'Activity',
        index: HARDWARE_KEY_TAB.HISTORY,
        component: <KeyActivity />,
    },
    {
        name: 'Info',
        index: HARDWARE_KEY_TAB.INFO,
        component: <AccessKeyContextInfo />,
    },
]

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
})

const mapStateToProps = state => ({
    hardwareKeySelected: selectHardwareKeySelected(state),
    hardwareKeyTab: selectHardwareKeyTab(state),
})

const mapDispatchToProps = dispatch => ({
    onHardwareKeyTabSelect: (eventKey) => {
        dispatch(actions.changeHardwareKeyTabSelect(eventKey))
    },
})

class AccessKeyContext extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(_, selectTab) {
        const { hardwareKeyTab } = this.props
        if (selectTab !== hardwareKeyTab) {
            this.props.onHardwareKeyTabSelect(selectTab)
        }
    }

    render() {
        const { hardwareKeySelected, hardwareKeyTab, classes } = this.props
        const a11yProps = (index) => ({
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        })
        return hardwareKeySelected ? (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={hardwareKeyTab}
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
                    <TabPanel key={tab.index} index={tab.index} value={hardwareKeyTab}>
                        {tab.component}
                    </TabPanel>
                ))}
            </div>
        ) : (
            null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccessKeyContext))

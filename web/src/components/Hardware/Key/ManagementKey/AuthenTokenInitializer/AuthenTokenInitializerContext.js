import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../../../../TabPanel'
import AuthenTokenInitializerActivity from './AuthenTokenInitializerActivity'
import AuthenTokenInitializerContextInfo from './AuthenTokenInitializerContextInfo'
import { selectHardwareKeySelected, selectHardwareKeyTab } from '../../../../../store/reducers'
import { HARDWARE_KEY_TAB } from '../../../../../constants'
import actions from '../../../../../actions'

const tabs = [
    {
        name: 'Activity',
        index: HARDWARE_KEY_TAB.LOCK,
        component: <AuthenTokenInitializerActivity />,
    },
    {
        name: 'Info',
        index: 1,
        component: <AuthenTokenInitializerContextInfo />,
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
    hardwareKeyTab: Math.min(selectHardwareKeyTab(state), tabs.length - 1),
})

const mapDispatchToProps = dispatch => ({
    onHardwareKeyTabSelect: (eventKey) => {
        dispatch(actions.changeHardwareKeyTabSelect(eventKey))
    },
})

class AuthenTokenInitializerContext extends React.PureComponent {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuthenTokenInitializerContext))

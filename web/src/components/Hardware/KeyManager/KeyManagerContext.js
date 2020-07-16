import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../../TabPanel'
import KeyManagerContextPort from './KeyManagerContextPort'
import KeyManagerContextInfo from './KeyManagerContextInfo'
import { selectHardwareKeyManagerSelected, selectHardwareKeyManagerTab } from '../../../store/reducers'
import { HARDWARE_KEY_MANAGER_TAB } from '../../../constants'
import actions from '../../../actions'

const tabs = [
    {
        name: 'Port',
        index: HARDWARE_KEY_MANAGER_TAB.PORT,
        component: <KeyManagerContextPort />,
    },
    {
        name: 'Info',
        index: HARDWARE_KEY_MANAGER_TAB.INFO,
        component: <KeyManagerContextInfo />,
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
    keyManagerSelected: selectHardwareKeyManagerSelected(state),
    keyManagerTab: selectHardwareKeyManagerTab(state),
})

const mapDispatchToProps = dispatch => ({
    onHardwareKeyManagerTabSelect: (eventKey) => {
        dispatch(actions.changeHardwareKeyManagerTabSelect(eventKey))
    },
})

class KeyManagerContext extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(_, selectTab) {
        const { keyManagerTab } = this.props
        if (selectTab !== keyManagerTab) {
            this.props.onHardwareKeyManagerTabSelect(selectTab)
        }
    }

    render() {
        const { keyManagerSelected, keyManagerTab, classes } = this.props
        const a11yProps = (index) => ({
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        })
        if (keyManagerSelected) {
            return (keyManagerSelected.registered && keyManagerSelected.online) ? (
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={keyManagerTab}
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
                        <TabPanel key={tab.index} index={tab.index} value={keyManagerTab}>
                            {tab.component}
                        </TabPanel>
                    ))}
                </div>
            ) : (
                <KeyManagerContextInfo />
            )
        }
        return null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(KeyManagerContext))

import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
    AppBar,
    Box,
    FormControl,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Tabs,
    Tab,
    Typography,
} from '@material-ui/core'
import TabPanel from '../TabPanel'
import ActivityLock from './ActivityLock'
import ActivityOperation from './ActivityOperation'
import ActivitySystem from './ActivitySystem'
import { selectMyselfPrivileges, selectActivityTab, selectActivityDuration, selectActivityProgress } from '../../store/reducers'
import privilege from '../../lib/privilege'
import actions from '../../actions'
import { CONF } from '../../constants'

// note: the following menu item MUST include CONF.LOAD_ACTIVITY_LATEST to be the default value
const durations = [
    {
        name: '1 Week',
        seconds: CONF.LOAD_ACTIVITY_LATEST,
    },
    {
        name: '1 Month',
        seconds: 2678400,
    },
    {
        name: '3 Month',
        seconds: 7948800,
    },
    {
        name: '6 Month',
        seconds: 15811200,
    },
    {
        name: '9 Month',
        seconds: 23760000,
    },
    {
        name: '12 Month',
        seconds: 31622400,
    },
]

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    activityBar: {
        margin: theme.spacing(1),
    },
    progressBox: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    progressContent: {
        width: '100%',
    },
    progressItem: {
        margin: theme.spacing(1),
        width: '99%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
})

const mapStateToProps = state => ({
    privileges: selectMyselfPrivileges(state),
    activityTab: selectActivityTab(state),
    duration: selectActivityDuration(state),
    progress: selectActivityProgress(state),
})
  
const mapDispatchToProps = dispatch => ({
    onActivityTabSelect: (eventKey) => {
        dispatch(actions.changeActivityTabSelect(eventKey))
    },
    onActivityChangeDuration: (duration) => {
        dispatch(actions.pollActivityStart(duration))
    },
})

const getPrivilegedTabs = (privileges) => {
    const tabs = []
    if (privilege.hasActivityLockAccess(privileges)) {
        tabs.push({
            name: 'Lock',
            component: <ActivityLock />,
        })
    }
    if (privilege.hasActivityLockOperation(privileges)) {
        tabs.push({
            name: 'Operation',
            component: <ActivityOperation />,
        })
    }
    if (privilege.hasActivitySystem(privileges)) {
        tabs.push({
            name: 'System',
            component: <ActivitySystem />,
        })
    }
    tabs.forEach((tab, index) => tab.index = index)
    return tabs
}

class Activity extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleActivityChange = this.handleActivityChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleActivityChange(event) {
        this.props.onActivityChangeDuration(event.target.value)
    }

    handleChange(_, selectTab) {
        const { activityTab } = this.props
        if (selectTab !== activityTab) {
            this.props.onActivityTabSelect(selectTab)
        }
    }

    render() {
        const { privileges, activityTab, duration, progress, classes } = this.props
        const tabs = getPrivilegedTabs(privileges)
        const currentTab = Math.min(activityTab, tabs.length - 1)
        const a11yProps = (index) => ({
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        })
        return (
            <div className={classes.root}>
                <Paper className={classes.activityBar}>
                    <Box display="flex" p={1}>
                        <Box>
                            {/* select menu to choose the activity duration */}
                            <FormControl className={classes.formControl}>
                                <InputLabel id="activity-duration-label">Activity Duration</InputLabel>
                                <Select
                                    labelId="activity-duration-label"
                                    id="activity-duration"
                                    name="activity-duration"
                                    value={duration}
                                    onChange={this.handleActivityChange}
                                >
                                    {durations.map(duration => (
                                        <MenuItem key={duration.seconds} value={duration.seconds}>{duration.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box flexGrow={1} className={classes.progressBox}>
                            {/* activity background download progress status */}
                            <Box className={classes.progressContent}>
                                <Typography className={classes.progressItem}> Activity Background Download Progress: {progress}%</Typography>
                                <LinearProgress variant="determinate" value={progress} className={classes.progressItem} />
                            </Box>
                        </Box>
                    </Box>
                </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Activity))

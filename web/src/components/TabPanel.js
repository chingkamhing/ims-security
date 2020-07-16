import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Typography,
} from '@material-ui/core'

// Generic tab panel for Tabs view

const TabPanel = (props) => {
    const {children, value, index, ...other } = props
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
      )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

export default TabPanel

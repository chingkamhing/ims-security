import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Link,
} from '@material-ui/core'
import logo from '../../assets/images/EnvironMAN-logo.png'

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    footer: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        },
    },
    img: {
        verticalAlign: 'bottom',
        width: '14em',
        height: '2em'
    }
})

const Footer = (props) => {
    const { classes } = props
    return (
        <div className={classes.root}>
            <div className={classes.footer}>
                <Link href="http://www.legend-engg.com/index.php/solution/date-center/" target="_blank">
                    <img src={logo} alt="EnvironMAN" className={classes.img} />
                </Link>
                {' Copyright® 2007-2020 '}
                <Link href="http://www.legend-engg.com/">CreAPPtive Ltd.</Link>
                {' All rights reserved.'}
            </div>
        </div>
    )
}

export default withStyles(styles)(Footer)

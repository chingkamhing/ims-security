import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: '1 1 100%',
    },
    table: {
        width: '100%',
    },
    narrowCell: {
        width: '20%',
    },
}))

// information table display rows of info with 2 columns of description and value
// - title: title of the information table
// - rows: array of objects { description, value }
const InfoTable = (props) => {
    const { title, rows={} } = props
    const classes = useStyles()
    return (
        <Paper>
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    {title}
                </Typography>
            </Toolbar>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className={classes.narrowCell} component="th" scope="row">
                                    {row.description}
                                </TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

InfoTable.propTypes = {
    title: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
}

export default InfoTable

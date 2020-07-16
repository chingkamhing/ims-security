import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    Checkbox,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
}from '@material-ui/core'
import FastForwardIcon from '@material-ui/icons/FastForward'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import FastRewindIcon from '@material-ui/icons/FastRewind'

const styles = theme => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
})

const not = (a, b) => {
    return a.filter(value => !b.includes(value))
}

const intersection = (a, b) => {
    return a.filter(value => b.includes(value))
}

//FIXME, the rendering of the TransferList is extremely slow
// - in development build, typing in any text input field is sluggish to show the typed characters
// - tried to improve the performance by eliminating all unnecessary rendering, still sluggish
// - tried to use browser's profiler to see where is the problem, seems it's deep in DOM
// - found some foruum complain the sluggish problem too
// - don't know where the problem is, just leave it now
// tree select component library
class TransferList extends React.PureComponent {
    static propTypes = {
        value: PropTypes.array.isRequired,
        items: PropTypes.array.isRequired,
        getName: PropTypes.func,
        onChange: PropTypes.func,
    }
    static defaultProps = {
        getName: key => key,
        onChange: () => {},
    }

    constructor(props) {
        super(props)
        const { value, items } = props
        this.state = {
            left: not(items, value),
            right: value,
            checked: [],
        }
        this.handleAllRight = this.handleAllRight.bind(this)
        this.handleCheckedRight = this.handleCheckedRight.bind(this)
        this.handleCheckedLeft = this.handleCheckedLeft.bind(this)
        this.handleAllLeft = this.handleAllLeft.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        const prevAllItems = prevProps.items
        const prevSelectedItems = prevProps.value
        const { value, items, onChange } = this.props
        if ((items !== prevAllItems) || (value !== prevSelectedItems)) {
            this.setState({
                left: not(items, value),
                right: value,
            })
        }
        const prevRight = prevState.right
        const { right } = this.state
        if (right !== prevRight) {
            onChange(right)
        }
    }

    handleAllRight() {
        this.setState((state) => {
            const { left, right } = state
            return ({
                left: [],
                right: right.concat(left),
            })
        })
    }

    handleCheckedRight() {
        this.setState((state) => {
            const { left, right, checked } = state
            const leftChecked = intersection(checked, left)
            return ({
                left: not(left, leftChecked),
                right: right.concat(leftChecked),
                checked: not(checked, leftChecked),
            })
        })
    }

    handleCheckedLeft() {
        this.setState((state) => {
            const { left, right, checked } = state
            const rightChecked = intersection(checked, right)
            return ({
                left: left.concat(rightChecked),
                right: not(right, rightChecked),
                checked: not(checked, rightChecked),
            })
        })
    }

    handleAllLeft() {
        this.setState((state) => {
            const { left, right } = state
            return ({
                left: left.concat(right),
                right: [],
            })
        })
    }

    handleToggle(_, item) {
        this.setState((state) => {
            const { checked } = state
            const currentIndex = checked.indexOf(item)
            const newChecked = [...checked]
            if (currentIndex === -1) {
                newChecked.push(item)
            } else {
                newChecked.splice(currentIndex, 1)
            }
            return ({
                checked: newChecked,
            })
        })
    }

    render() {
        const { getName, classes } = this.props
        const { left, right, checked } = this.state
        const leftChecked = intersection(checked, left)
        const rightChecked = intersection(checked, right)
        const customList = items => (
            <Paper className={classes.paper}>
                <List dense component="div" role="list">
                    {items.map(item => {
                        const labelId = `transfer-list-item-${item}-label`
                        return (
                            <ListItem key={item} role="listitem" button onClick={e => this.handleToggle(e, item)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.includes(item)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${getName(item)}`} />
                            </ListItem>
                        )
                    })}
                    <ListItem />
                </List>
            </Paper>
        )
        return (
            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item>{customList(left)}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <IconButton
                            aria-label="move all right"
                            disabled={left.length === 0}
                            onClick={this.handleAllRight}
                        >
                            <FastForwardIcon />
                        </IconButton>
                        <IconButton
                            aria-label="move selected right"
                            disabled={leftChecked.length === 0}
                            onClick={this.handleCheckedRight}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                        <IconButton
                            aria-label="move selected left"
                            disabled={rightChecked.length === 0}
                            onClick={this.handleCheckedLeft}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                            aria-label="move all left"
                            disabled={right.length === 0}
                            onClick={this.handleAllLeft}
                        >
                            <FastRewindIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item>{customList(right)}</Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(TransferList)

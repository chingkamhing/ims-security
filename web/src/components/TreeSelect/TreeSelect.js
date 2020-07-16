import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    Chip,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Popover,
} from '@material-ui/core'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import TreeView from '../TreeView'
import { selectLocationPath } from '../../store/reducers'

const styles = {
    input: {
        // set text input width to min in order to make room for more chips
        width: '0.01em',
    },
    positionStart: {
        // use flex box; set width to 100% in order to align Tree action button on right; change height to auto to allow growing
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: 'auto',
        maxHeight: 'none',
    },
    tree: {
        minWidth: 300,
        maxWidth: 500,
        minHeight: 200,
        maxHeight: 400,
    },
}

const mapStateToProps = state => ({
    locationPathObject: selectLocationPath(state),
})

// tree select component library
class TreeSelect extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        multiple: PropTypes.bool,
        helperText: PropTypes.string,
        required: PropTypes.bool,
        nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChange: PropTypes.func,
    }
    static defaultProps = {
        multiple: false,
        required: false,
        helperText: undefined,
    }
    constructor(props) {
        super(props)
        const { value, multiple, nodes } = props
        if (multiple) {
            // multiple is enabled, check if input value is array
            if (!Array.isArray(value)) {
                console.error('TreeSelect props "value" must be array when "multiple" is true!')
            }
        } else {
            // multiple is disabled, check if input value is string
            if (typeof value !== 'string') {
                console.error('TreeSelect props "value" must be string when "multiple" is false!')
            }
        }
        this.state = {
            anchorEl: null,
            expanded: nodes.map(n => n.id),
        }
        this.handleTreeButtonClick = this.handleTreeButtonClick.bind(this)
        this.handleDeleteLocation = this.handleDeleteLocation.bind(this)
        this.handleTreeToggle = this.handleTreeToggle.bind(this)
        this.handleTreeConfirm = this.handleTreeConfirm.bind(this)
        this.handlePopoverClose = this.handlePopoverClose.bind(this)
    }
    handleTreeButtonClick(event) {
        // Tree button is clicked, open popover
        this.setState({
            anchorEl: event.currentTarget
        })
    }
    handleTreeToggle(_, nodeIds) {
        // save expanded status
        this.setState({
            expanded: nodeIds
        })
    }
    handleDeleteLocation(event, deleteId) {
        // delete a location
        const { value, multiple, onChange } = this.props
        const confirmValue = (multiple) ? (
            value.filter(id => id !== deleteId)
        ) : (
            ''
        )
        onChange(event, confirmValue)
    }
    handleTreeConfirm(event, confirmId) {
        // tree input confirmed (i.e. Enter key press or mouse double click)
        const { value, multiple, onChange } = this.props
        const confirmValue = (multiple) ? (
            // multiple selection, check duplication
            value.some(id => id === confirmId) ? (
                value
            ) : (
                value.concat(confirmId)
            )
        ) : (
            // single selection, replace the current one
            confirmId
        )
        onChange(event, confirmValue)
        this.handlePopoverClose()
    }
    handlePopoverClose() {
        // close popover
        this.setState({
            anchorEl: null
        })
    }
    render() {
        const { id, label, helperText, required, value, multiple, nodes, locationPathObject, classes } = this.props
        const { anchorEl, expanded } = this.state
        const deleteChip = (id) => (event) => {
            this.handleDeleteLocation(event, id)
        }
        const chips = (multiple) ? (
            <>
                {value.map(id => (<Chip key={id} label={locationPathObject[id]} onDelete={deleteChip(id)} />))}
            </>
        ) : (
            value && <Chip label={locationPathObject[value]} onDelete={deleteChip(value)} />
        )
        const inputId = `text-select-label-${id}`
        const popoverId = `simple-popover-${id}`
        return (
            <>
                <FormControl>
                    <InputLabel
                        htmlFor={inputId}
                        required={required}
                    >
                        {label}
                    </InputLabel>
                    <Input
                        id={inputId}
                        type={'text'}
                        readOnly
                        defaultValue=''
                        classes={{
                            input: classes.input,
                        }}
                        startAdornment={
                            <InputAdornment
                                position="start"
                                classes={{
                                    positionStart: classes.positionStart,
                                }}
                            >
                                {chips}
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="tree selct popup"
                                    onClick={this.handleTreeButtonClick}
                                >
                                    <AccountTreeIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {helperText && <FormHelperText
                        id={`${inputId}-helper-text`}
                    >
                        {helperText}
                    </FormHelperText>}
                </FormControl>
                <Popover
                    id={popoverId}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={this.handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <TreeView
                        nodes={nodes}
                        className={classes.tree}
                        expanded={expanded}
                        onToggle={this.handleTreeToggle}
                        onConfirm={this.handleTreeConfirm}
                    />
                </Popover>
            </>
        )
    }
}

export default connect(mapStateToProps, null)(withStyles(styles)(TreeSelect))

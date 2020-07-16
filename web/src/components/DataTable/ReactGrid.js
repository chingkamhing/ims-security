import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import {
    Plugin,
    Template,
    TemplatePlaceholder,
} from '@devexpress/dx-react-core'
import {
    IntegratedFiltering,
    SearchState,
    SelectionState,
} from '@devexpress/dx-react-grid'
import {
    Grid,
    SearchPanel,
    Table,
    Toolbar,
    TableHeaderRow,
    TableSelection,
    VirtualTable,
} from '@devexpress/dx-react-grid-material-ui'

const styles = {
    tablePointer: {
        '& tbody tr': {
            cursor: 'pointer'
        },
    },
}

const ReactGrid = (props) => {
    const { columns, data, actions=[], options, getRowId, onRowClick } = props
    const gridColumns = columns.map((column) => ({
        name: column.field,
        title: column.title,
        getCellValue: column.render,
    }))
    // get toolbar free actions and table row simple actions
    const actionType = actions.reduce((actionType, action) => {
        (action.isFreeAction === true) ? actionType.free.push(action) : actionType.simple.push(action)
        return actionType
    }, {
        free: [],                       // global table free actions
        simple: [],                     // table row simple actions
    })
    // parse options:
    // search - boolean to include toolbar search input
    const { search } = options
    // Q: any toolbar action component?
    const isFreeAction = actionType.free.length > 0
    // Q: any toolbar component?
    const isToolbar = search || isFreeAction
    const pluginDependencies = [
        { name: 'Toolbar' }
    ]
    // declare a selection state to enforce only one selection instead of an array of selection
    const [selection, setSelection] = useState()
    const handleClick = (selectedRowIds) => {
        selectedRowIds = (selectedRowIds.length > 0) ? selectedRowIds.slice(-1) : selection
        setSelection(selectedRowIds)
        onRowClick(selectedRowIds, selectedRowIds[0])
    }
    return (
        <Grid
            rows={data}
            columns={gridColumns}
            getRowId={getRowId}
        >
            {search && <SearchState />}
            {search && <IntegratedFiltering />}
            {onRowClick && <SelectionState
                selection={selection}
                onSelectionChange={handleClick}
            />}
            {onRowClick ? (
                <VirtualTable 
                    tableComponent={TableComponent}
                />
            ) : (
                <VirtualTable />
            )}
            <TableHeaderRow />
            {onRowClick && <TableSelection
                selectByRowClick
                highlightRow
                showSelectionColumn={false}
            />}
            {/* the following components are mean for the toolbar */}
            {isToolbar && <Toolbar />}
            {search && <SearchPanel />}
            {isFreeAction && <Plugin
                name="ToolbarFilterState"
                dependencies={pluginDependencies}
            >
                <Template name="toolbarContent">
                    {/* left-aligned component below */}
                    {actionType.free.map((freeAction, index) => (<ToolbarButton key={index} selection={selection} {...freeAction} />))}
                    <TemplatePlaceholder />
                    {/* right-aligned component below */}
                </Template>
            </Plugin>}
        </Grid>
    )
}

// VirtualTable's table component

const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={classes.tablePointer}
    />
)

const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase)

// toolbar button
const ToolbarButton = ({icon, tooltip, selection, disabled, onClick}) => {
    const getIcon = (icon) => {
        switch (icon) {
            case 'delete':
                return <DeleteIcon />
            case 'edit':
                return <EditIcon />
            case 'add':
            default:
                return <AddIcon />
        }
    }
    const handleClick = (event) => {
        onClick(event, selection)
    }
    const iconComponent = getIcon(icon)
    return (
        <Tooltip title={tooltip}>
            <IconButton aria-label={tooltip} disabled={disabled && disabled()} onClick={handleClick}>
                {iconComponent}
            </IconButton>
        </Tooltip>
    )
}

export default ReactGrid

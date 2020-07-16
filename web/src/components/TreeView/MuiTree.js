import React from 'react'
import PropTypes from 'prop-types'
import TreeItem from '@material-ui/lab/TreeItem'
import TreeView from '@material-ui/lab/TreeView'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'

const dummyCallback = () => {}

// tree view component
const MuiTree = (props) => {
    const { nodes, className, expanded, selected, onClick=dummyCallback, onToggle=dummyCallback, onConfirm=dummyCallback } = props
    const renderTree = (node) => (
        <TreeItem
            key={node.id}
            nodeId={node.id}
            label={node.name}
            onClick={e => onClick(e, node.id)}
            onDoubleClick={e => {
                e.stopPropagation()
                onConfirm(e, node.id)
            }}
            onKeyPress={e => {
                e.stopPropagation()
                if (e.key === "Enter") {
                    // Enter key is pressed, treat it the same as click
                    onConfirm(e, node.id)
                }
            }}
        >
            {Array.isArray(node.children) ? node.children.map(n => renderTree(n)) : null}
        </TreeItem>
    )
    return (
        <TreeView
            className={className}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultCollapseIcon={<ExpandMoreIcon />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={onToggle}
        >
            {nodes.map(node => renderTree(node))}
        </TreeView>
    )
}

MuiTree.propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    expanded: PropTypes.array,
    selected: PropTypes.string,
    onClick: PropTypes.func,
    onToggle: PropTypes.func,
    onConfirm: PropTypes.func,
}

export default MuiTree

import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    CloudDownload,
    Search,
    ViewColumn,
} from "@material-ui/icons"

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <CloudDownload {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

// material table default number of rows
// const DEFAULT_ROWS = 5

// default page size selections
const defaultPageSizes =  [
    5,
    10,
    20,
    50,
    100,
]

const MaterialUiTable = (props) => {
    const { options, ...others } = props
    // note: tried to implement dynamic growing datatable to avoid empty rows when the content is less than pageSize; however, found it crash with "RangeError" when the datatable grow to be the same number of rows as pageSize; disable this feature to avoid the crash
    // const { pageSize=DEFAULT_ROWS } = options
    // const numRows = props.data.length
    // if ((numRows) && (numRows < pageSize)) {
    //     // if the number of rows is less than page size, disable paging feature
    //     options.paging = false
    //     options.pageSize = numRows
    // }
    if (!options.pageSizeOptions) {
        options.pageSizeOptions = defaultPageSizes
    }
    return (
        <MaterialTable
            icons={tableIcons}
            options={options}
            {...others}
        />
    )
}

MaterialUiTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.func,
    ]).isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    actions: PropTypes.array,
    getRowId: PropTypes.func,
    onRowClick: PropTypes.func,
    options: PropTypes.object,
}

export default MaterialUiTable

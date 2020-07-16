import React from 'react'
import { useSelector } from 'react-redux'
import { selectLocationPath } from '../../../store/reducers'
import InfoTable from '../../InfoTable'

// lock information table
const LockInfo = (props) => {
    const { lock={} } = props
    const locationPathObject = useSelector(selectLocationPath)
    // table title
    const title = 'Lock Information'
    // prepare information table
    const rows = Object.entries(lock).reduce((lines, [key, value]) => {
        switch (key) {
            case 'serialNumber':
                return lines.concat({ description: 'Serial No.', value})
            case 'name':
                return lines.concat({ description: 'Name', value})
            case 'locationId':
                return lines.concat({ description: 'Location Path', value: locationPathObject[value]})
            //FIXME, remove scope first
            // case 'scopeId':
            //     return lines.concat({ description: 'Scope Path', value: scopePathObject[value]})
            case 'initialized':
                return lines.concat({ description: 'Initialized', value: value ? 'Yes' : 'No'})
            case 'description':
                return lines.concat({ description: 'Description', value})
            case 'usage':
                return lines.concat({ description: 'Key Usage', value})
            default:
                return lines
        }
    }, [])
    return (rows.length > 0) && (
        <InfoTable title={title} rows={rows} />
    )
}

export default LockInfo

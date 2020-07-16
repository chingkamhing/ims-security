import React from 'react'
import { useSelector } from 'react-redux'
import InfoTable from '../../InfoTable'
import { selectHardwareKeyManagerSelected, selectLocationPath } from '../../../store/reducers'

// key manager information table
const KeyManagerContextInfo = () => {
    const keyManager = useSelector(selectHardwareKeyManagerSelected)
    const locationPathObject = useSelector(selectLocationPath)
    // table title
    const title = 'Key Manager Information'
    // prepare information table
    const rows = Object.entries(keyManager).reduce((lines, [key, value]) => {
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
            case 'description':
                return lines.concat({ description: 'Description', value})
            default:
                return lines
        }
    }, [])
    return (rows.length > 0) ? (
        <InfoTable title={title} rows={rows} />
    ) : (
        null
    )
}

export default KeyManagerContextInfo

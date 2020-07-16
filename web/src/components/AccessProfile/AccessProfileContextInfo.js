import React from 'react'
import { useSelector } from 'react-redux'
import InfoTable from '../InfoTable'
import { selectAccessProfileSelected } from '../../store/reducers'

// access profile information table
const AccessProfileContextInfo = ({locationPathObject, scopePathObject}) => {
    const accessProfile = useSelector(selectAccessProfileSelected)
    // table title
    const title = 'Access Profile Information'
    // prepare information table
    const rows = Object.entries(accessProfile).reduce((lines, [key, value]) => {
        switch (key) {
            case 'id':
                return lines.concat({ description: 'ID', value})
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

export default AccessProfileContextInfo

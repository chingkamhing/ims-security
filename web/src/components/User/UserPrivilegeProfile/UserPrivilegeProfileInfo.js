import React from 'react'
import InfoTable from '../../InfoTable'

// privilege profile information table
const UserPrivilegeProfileInfo = (props) => {
    const { privilegeProfile={} } = props
    // table title
    const title = 'Privilege Profile Information'
    // prepare information table
    const rows = Object.entries(privilegeProfile).reduce((lines, [key, value]) => {
        switch (key) {
            case 'id':
                return lines.concat({ description: 'ID', value: `${value}`})
            case 'name':
                return lines.concat({ description: 'Name', value})
            case 'privileges':
                return lines.concat({ description: 'Privileges', value: value.join(', ')})
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

export default UserPrivilegeProfileInfo

import React from 'react'
import { useSelector } from 'react-redux'
import * as moment from 'moment'
import InfoTable from '../../InfoTable'
import { selectPrivilegeProfile, selectLocationPath } from '../../../store/reducers'
import { CONF } from '../../../constants'

// user information table
const UserInfo = (props) => {
    const { user={} } = props
    const privilegeProfileObject = useSelector(selectPrivilegeProfile)
    const locationPathObject = useSelector(selectLocationPath)
    // table title
    const title = 'User Information'
    // prepare information table
    const rows = Object.entries(user).reduce((lines, [key, value]) => {
        switch (key) {
            case 'id':
                return lines.concat({ description: 'ID', value: `${value}`})
            case 'username':
                return lines.concat({ description: 'Username', value})
            case 'name':
                return lines.concat({ description: 'Name', value})
            case 'company':
                return lines.concat({ description: 'Company', value})
            case 'email':
                return lines.concat({ description: 'Email', value})
            case 'phoneNumber':
                return lines.concat({ description: 'Phone Number', value})
            case 'locationIds':
                return lines.concat({ description: 'Location Path', value: value.map(id => locationPathObject[id]).join('; ')})
            //FIXME, remove scope first
            // case 'scopeId':
            //     return lines.concat({ description: 'Scope Path', value: scopePathObject[value]})
            case 'privilegeProfileId':
                return lines.concat({ description: 'Privilege Profile', value: (privilegeProfileObject[value] && privilegeProfileObject[value].name)})
            case 'validPeriod':
                const from = moment(new Date(value.from * 1000)).format(CONF.DATE_FORMAT)
                const to = moment(new Date(value.to * 1000)).format(CONF.DATE_FORMAT)
                return lines.concat({ description: 'Valid Period', value: `${from} ~ ${to}`})
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

export default UserInfo

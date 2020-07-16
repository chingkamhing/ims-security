import React from 'react'
import { useSelector } from 'react-redux'
import * as moment from 'moment'
import InfoTable from '../../../InfoTable'
import { selectHardwareKeySelected, selectUser, selectLocationPath } from '../../../../store/reducers'
import { CONF } from '../../../../constants'

// management key information table
const ManagementKeyInfo = () => {
    const key = useSelector(selectHardwareKeySelected)
    const userObject = useSelector(selectUser)
    const locationPathObject = useSelector(selectLocationPath)
    // table title
    const title = 'Offline Management Key Information'
    // prepare information table
    const rows = Object.entries(key).reduce((lines, [key, value]) => {
        switch (key) {
            case 'serialNumber':
                return lines.concat({ description: 'Serial No.', value})
            case 'type':
                return lines.concat({ description: 'Key Type', value})
            case 'name':
                return lines.concat({ description: 'Name', value})
            case 'locationId':
                return lines.concat({ description: 'Location Path', value: locationPathObject[value]})
            //FIXME, remove scope first
            // case 'scopeId':
            //     return lines.concat({ description: 'Scope Path', value: scopePathObject[value]})
            case 'holder':
                return lines.concat({ description: 'Holder', value: userObject[value] && userObject[value].name})
            case 'validPeriod':
                const from = moment(new Date(value.from * 1000)).format(CONF.DATE_FORMAT)
                const to = moment(new Date(value.to * 1000)).format(CONF.DATE_FORMAT)
                return lines.concat({ description: 'Valid Period', value: `${from} ~ ${to}`})
            case 'description':
                return lines.concat({ description: 'Description', value})
            case 'usage':
                return lines.concat({ description: 'Key Usage', value: <i>&#60;None&#62;</i>})
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

export default ManagementKeyInfo

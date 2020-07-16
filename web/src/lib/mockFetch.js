import sim from './simulation'
import { HTTP, PROGRAM, URL } from '../constants'
import privilege from '../lib/privilege'

//
// mockFetch is used simulate fetch response data without accessing the server
//

const TIMEOUT = {
    SHORT: 100,
    MIDDLE: 500,
    LONG: 1200,
    VLONG: 1900,
}

// timeout threshold that consider fetch error if greater or equal than this
const thresholdError = 2000

// http response code to text table
const httpCodeText = {
    100: 'Continue',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    300: 'Multiple Choice',
    301: 'Moved Permanently',
    302: 'Found',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    406: 'Not Acceptable',
    408: 'Request Timeout',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
}

let initActivity = true

// note: for some unknown reason, the mock response might not be correctly received after fetch().then(response).then(data) with some unknown response data structure
const mockFetch = (payload) => {
    const { url, method, data } = payload
    const randomId = (start=1, end=2147483647) => {
        const range = end - start
        return Math.floor(Math.random() * range) + start
    }
    const mockResponse = (status, response) => {
        const statusText = httpCodeText[status] || 'error'
        return new window.Response(JSON.stringify(response), {
            ok: ((status >= 200) && (status < 300)),
            status,
            statusText,
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
    const mockFetchData = (timeout, status, data, errors=[]) => {
        window.fetch = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if ((timeout < thresholdError) && (data)) {
                        let response
                        if ((status >= 200) && (status < 300)) {
                            response = { status: 'success', data }
                            if (Array.isArray(errors) && (errors.length > 0)) {
                                response.error = errors
                            }
                        } else {
                            response = { status: 'fail', message: data }
                        }
                        resolve(mockResponse(status, response))
                    } else {
                        reject(new Error(`Fail to ${method} @ ${url}`))
                    }
                },
                timeout)
            })
        }
    }

    if ((method === HTTP.POST) && (url === URL.API_LOGIN)) {
        // simulate user login
        const { username, password } = data
        const timeout = sim.LOGIN.DELAY
        // simulate to check password
        if (password === sim.login.PASSWORD) {
            const userId = Object.values(sim.user).reduce((id, user) => {
                return id || ((user.username === username) ? user.id : undefined)
            }, undefined)
            if (userId) {
                initActivity = true
                sim.login.username = username
                sim.login.id = userId
                // replace privilegeProfile with privileges in order to determine what privilege he has before further fetching info
                const { privilegeProfileId, ...user} = sim.user[userId]
                mockFetchData(timeout, 200, {
                    ...user,
                    privilegeProfile: sim.privilegeProfile[privilegeProfileId],
                })
            } else {
                mockFetchData(timeout, 404, 'user not found')
            }
        } else {
            mockFetchData(timeout, 401, 'incorrect login password')
        }
    } else if ((method === HTTP.GET) && (url === URL.API_MY_INFO)) {
        // replace privilegeProfile with privileges in order to determine what privilege he has before further fetching info
        const timeout = sim.USER.DELAY || TIMEOUT.SHORT
        try {
            const { privilegeProfileId, ...user} = sim.user[sim.login.id]
            mockFetchData(timeout, 200, {
                ...user,
                privilegeProfile: sim.privilegeProfile[privilegeProfileId],
            })
        } catch (_) {
            mockFetchData(timeout, 404, 'user not found')
        }
    } else if ((method === HTTP.POST) && (url === URL.API_CHANGE_PASSWORD)) {
        // change password, response with array of id
        const timeout = sim.USER.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data.map(i => i.id)])
    } else if ((method === HTTP.POST) && (url === URL.API_RESET_PASSWORD)) {
        const timeout = sim.USER.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.GET) && (url === URL.API_USER_INFO)) {
        // simulate getting user info
        const { locationIds, scopeId } = data
        const timeout = sim.USER.DELAY
        if ((Array.isArray(locationIds)) && (typeof scopeId === 'string')) {
            //FIXME, should response with current user's info instead of hard-coded one
            const { user } = sim
            mockFetchData(timeout, 200, {...user})
        } else {
            mockFetchData(timeout, 400, 'invalid request parameter')
        }
    } else if ((method === HTTP.POST) && (url === URL.API_CREATE_USER)) {
        const timeout = sim.USER.DELAY || TIMEOUT.SHORT
        // grant a random ID number upon success
        data.forEach((user) => { user.id = randomId(100)})
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_USER)) {
        const timeout = sim.USER.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_DELETE_USER)) {
        const timeout = sim.USER.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.GET) && (url === URL.API_LOCATION_INFO)) {
        const timeout = sim.LOCATION.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...sim.location])
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_LOCATION)) {
        const timeout = sim.LOCATION.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, data.map((location) => {
            const saveNode = (n1) => {
                let result = {...n1}
                if (n1.id.indexOf('loc-') === 0) {
                    result.id = `${randomId()}`
                }
                if (Array.isArray(n1.children)) {
                    result.children = n1.children.map(n2 => saveNode(n2))
                }
                return result
            }
            return saveNode(location)
        }))
    } else if ((method === HTTP.GET) && (url === URL.API_SCOPE_INFO)) {
        const timeout = sim.SCOPE.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...sim.scope])
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_SCOPE)) {
        const timeout = sim.SCOPE.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, data.map((scope) => {
            const saveNode = (n1) => {
                let result = {...n1}
                if (n1.id.indexOf('scope-') === 0) {
                    result.id = `${randomId()}`
                }
                if (Array.isArray(n1.children)) {
                    result.children = n1.children.map(n2 => saveNode(n2))
                }
                return result
            }
            return saveNode(scope)
        }))
    } else if ((method === HTTP.GET) && (url === URL.API_PRIVILEGE_PROFILE_INFO)) {
        const timeout = sim.PRIVILEGE_PROFILE.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, {...sim.privilegeProfile})
    } else if ((method === HTTP.POST) && (url === URL.API_CREATE_PRIVILEGE_PROFILE)) {
        const timeout = sim.PRIVILEGE_PROFILE.DELAY || TIMEOUT.SHORT
        // grant a random ID number upon success
        data.forEach((privilegeProfile) => { privilegeProfile.id = randomId(100)})
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_PRIVILEGE_PROFILE)) {
        const timeout = sim.PRIVILEGE_PROFILE.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_DELETE_PRIVILEGE_PROFILE)) {
        const timeout = sim.PRIVILEGE_PROFILE.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.GET) && (url === URL.API_ACCESS_PROFILE_INFO)) {
        const timeout = sim.ACCESS_PROFILE.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, {...sim.accessProfile})
    } else if ((method === HTTP.POST) && (url === URL.API_CREATE_ACCESS_PROFILE)) {
        const timeout = sim.ACCESS_PROFILE.DELAY || TIMEOUT.SHORT
        // grant a random ID number upon success
        data.forEach((accessProfile) => { accessProfile.id = randomId(100)})
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_ACCESS_PROFILE)) {
        const timeout = sim.ACCESS_PROFILE.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_DELETE_ACCESS_PROFILE)) {
        const timeout = sim.ACCESS_PROFILE.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.GET) && (url === URL.API_KEY_INFO)) {
        const timeout = sim.KEY.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, {...sim.key})
    } else if ((method === HTTP.POST) && (url === URL.API_REGISTER_KEY)) {
        const timeout = sim.KEY.DELAY || TIMEOUT.SHORT
        const databaseKeyObject = {
            'KA-000011': {
                serialNumber: 'KA-000011',
                type: 'ACCESS',
                name: '',
                locationId: '5099803df3f4948bd2f98301',
                scopeId: '5099803df3f4948bd2f98311',
                holder: 2,
                validPeriod: {
                    from: 1577808000,
                    to: 1609430399,
                },
                description: '',
                locks: [],
                users: [],
            },
            'KA-000012': {
                serialNumber: 'KA-000012',
                type: 'MANAGEMENT',
                name: '',
                locationId: '5099803df3f4948bd2f98301',
                scopeId: '5099803df3f4948bd2f98311',
                holder: 5,
                validPeriod: {
                    from: 1577808000,
                    to: 1609430399,
                },
                description: '',
                usage: '',
            },
        }
        const responseKeys = data.map((keySerialNumber) => (databaseKeyObject[keySerialNumber]))
        if (responseKeys.length > 0) {
            mockFetchData(timeout, 200, responseKeys)
        } else {
            mockFetchData(timeout, 400, 'invalid register key')
        }
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_KEY)) {
        const timeout = sim.KEY.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_DEREGISTER_KEY)) {
        const timeout = sim.KEY.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_PROGRAM_KEY)) {
        const timeout = sim.KEY.DELAY || TIMEOUT.SHORT
        const { operation } = data
        switch (operation) {
            case PROGRAM.FACTORY_RESET:
                // factory reset access or management key, just return the key serial numbers
                break
            default:
                break
        }
        mockFetchData(timeout, 200, {...data})
    } else if ((method === HTTP.GET) && (url === URL.API_KEY_MANAGER_INFO)) {
        const timeout = sim.KEY_MANAGER.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, {...sim.keyManager})
    } else if ((method === HTTP.POST) && (url === URL.API_REGISTER_KEY_MANAGER)) {
        const timeout = sim.KEY_MANAGER.DELAY || TIMEOUT.SHORT
        const databaseKeyObject = {
            'KMA-000011': {
                ports: [
                    'KA-000006',
                    'KA-000005',
                    undefined,
                    undefined,
                ],
            },
            'KMA-000012': {
                ports: [
                    undefined,
                    'KA-000008',
                    undefined,
                    undefined,
                ],
            },
            'KMA-000013': {
                ports: [
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                ],
            },
        }
        const responseKeyManagers = data.map((keyManager) => ({
            ...keyManager,
            ports: databaseKeyObject[keyManager.serialNumber] && databaseKeyObject[keyManager.serialNumber].ports
        }))
        if (responseKeyManagers.length > 0) {
            mockFetchData(timeout, 200, responseKeyManagers)
        } else {
            mockFetchData(timeout, 400, 'invalid register key manager')
        }
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_KEY_MANAGER)) {
        const timeout = sim.KEY_MANAGER.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_DEREGISTER_KEY_MANAGER)) {
        const timeout = sim.KEY_MANAGER.DELAY || TIMEOUT.SHORT
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.GET) && (url === URL.API_LOCK_INFO)) {
        const timeout = sim.LOCK.DELAY || TIMEOUT.MIDDLE
        mockFetchData(timeout, 200, {...sim.lock})
    } else if ((method === HTTP.POST) && (url === URL.API_REGISTER_LOCK)) {
        const timeout = sim.LOCK.DELAY || TIMEOUT.MIDDLE
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_LOCK)) {
        const timeout = sim.LOCK.DELAY || TIMEOUT.MIDDLE
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_DEREGISTER_LOCK)) {
        const timeout = sim.LOCK.DELAY || TIMEOUT.MIDDLE
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.GET) && (url === URL.API_AUTHEN_TOKEN_INFO)) {
        const timeout = sim.AUTHEN_TOKEN.DELAY || TIMEOUT.MIDDLE
        mockFetchData(timeout, 200, {...sim.authenToken})
    } else if ((method === HTTP.POST) && (url === URL.API_REGISTER_AUTHEN_TOKEN)) {
        const timeout = sim.AUTHEN_TOKEN.DELAY || TIMEOUT.MIDDLE
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_UPDATE_AUTHEN_TOKEN)) {
        const timeout = sim.AUTHEN_TOKEN.DELAY || TIMEOUT.MIDDLE
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.POST) && (url === URL.API_DEREGISTER_AUTHEN_TOKEN)) {
        const timeout = sim.AUTHEN_TOKEN.DELAY || TIMEOUT.MIDDLE
        mockFetchData(timeout, 200, [...data])
    } else if ((method === HTTP.GET) && (url === URL.API_ACTIVITY)) {
        const timeout = sim.ACTIVITY.DELAY || TIMEOUT.LONG
        // simulate download rate to max at 7 days per request
        const maxDownloadSeconds = 604800
        const {from, to} = ((data) => (
            (data.descending) ? {
                from: Math.max(data.to - maxDownloadSeconds, data.from),
                to: data.to,
            } : {
                from: data.from,
                to: Math.min(data.from + maxDownloadSeconds, data.to),
            }
        ))(data)
        if (initActivity) {
            // initial fetchActivity(), response with bulk activity
            mockFetchData(timeout, 200, { ...sim.activity, from, to })
            initActivity = false
        } else {
            // subsequent getActivity(), response with run-time activity
            const lock = {
                datetime: from,
                userName: 'James Dean',
                description: 'Description: lock activity at ' + from,
                locationId: '5099803df3f4948bd2f98301',
                scopeId: '5099803df3f4948bd2f98311',
                keySerialNumber: 'KA-000001',
                keyName: 'Key KA-000001',
                lockSerialNumber: 'LA-000001',
                lockName: 'Lock LA-000001',
                lockLocationId: '5099803df3f4948bd2f98301',
                lockScopeId: '5099803df3f4948bd2f98311',
            }
            const operation = {
                datetime: from,
                userName: 'Whitney Houston',
                description: 'Description: operation activity at ' + from,
            }
            const system = {
                datetime: from,
                description: 'Description: system activity at ' + from,
            }
            mockFetchData(timeout, 200, { lock: {[from]: lock}, operation: {[from]: operation}, system: {[from]: system}, from, to })
        }
    } else if ((method === HTTP.GET) && (url === URL.API_VERSION)) {
        const timeout = sim.VERSION.DELAY || TIMEOUT.LONG
        const userId = sim.login.id
        if (userId) {
            // replace privilegeProfile with privileges in order to determine what privilege he has before further fetching info
            const { privilegeProfileId } = sim.user[userId]
            const { privileges } = sim.privilegeProfile[privilegeProfileId]
            const version = {}
            if (privilege.hasUser(privileges)) {
                version.user = 1
                version.privilegeProfile = 1
            }
            if (privilege.hasLocationScope(privileges)) {
                version.location = 1
                version.scope = 1
            }
            if (privilege.hasAccessProfile(privileges)) {
                version.accessProfile = 1
            }
            if (privilege.hasAccessResources(privileges)) {
                version.key = 1
            }
            if (privilege.hasManagementResources(privileges)) {
                version.keyManager = 1
                version.lock = 1
                version.authenToken = 1
            }
            mockFetchData(timeout, 200, {version})
        } else {
            mockFetchData(timeout, 404, 'user not found')
        }
    } else {
        // restore default fetch
        window.fetch = fetch
    }
}

export default mockFetch

import { AT, KEY_USAGE, PROGRAM } from '../../../constants'

// ----------------------------------------------------------------------------
// Reducer

const initState = {
    // username is used to tell if current user is logged in or not. If logged in, write this "username" with the user's username. If logged out, must clear with ''
    accessProfile: {},
    key: {},
    keyManager: {
        registered: {},
        notRegistered: {},
    },
    lock: {},
    authenToken: {},
    isAccessProfileLoaded: false,       // whether access profile is loaded
    isUpdatingAccessProfile: false,     // whether it is creating/updating access profile
    isDeletingAccessProfile: false,     // whether it is deleting access profile
    isKeyLoaded: false,                 // whether key is loaded
    isUpdatingKey: false,               // whether it is creating/updating key
    isDeregisteringKey: false,          // whether it is deregistering key
    isProgramming: false,               // whether it is programming key in progress
    isKeyManagerLoaded: false,          // whether key manager is loaded
    isUpdatingKeyManager: false,        // whether it is creating/updating key manager
    isDeregisteringKeyManager: false,   // whether it is deregistering key manager
    isLockLoaded: false,                // whether lock is loaded
    isUpdatingLock: false,              // whether it is creating/updating lock
    isDeregisteringLock: false,         // whether it is deregistering lock
    isAuthenTokenLoaded: false,         // whether authen token is loaded
    isUpdatingAuthenToken: false,       // whether it is creating/updating authen token
    isDeregisteringAuthenToken: false,  // whether it is deregistering authen token
}

const lockManagement = (state = initState, action={ type: null }) => {
    const { type } = action
    switch (type) {
        case AT.CREATE_ACCESS_PROFILE_REQUEST:
            return {
                ...state,
                isUpdatingAccessProfile: true,
            }
        case AT.CREATE_ACCESS_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdatingAccessProfile: false,
                accessProfile: updateAccessProfile(action.payload, state.accessProfile),
            }
        case AT.CREATE_ACCESS_PROFILE_FAIL:
            return {
                ...state,
                isUpdatingAccessProfile: false,
            }
        case AT.FETCH_ACCESS_PROFILE_SUCCESS:
            return {
                ...state,
                isAccessProfileLoaded: true,
                isUpdatingAccessProfile: false,
                accessProfile: action.payload,
            }
        case AT.UPDATE_ACCESS_PROFILE_REQUEST:
            return {
                ...state,
                isUpdatingAccessProfile: true,
            }
        case AT.UPDATE_ACCESS_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdatingAccessProfile: false,
                accessProfile: updateAccessProfile(action.payload, state.accessProfile),
            }
        case AT.UPDATE_ACCESS_PROFILE_FAIL:
            return {
                ...state,
                isUpdatingAccessProfile: false,
            }
        case AT.DELETE_ACCESS_PROFILE_REQUEST:
            return {
                ...state,
                isDeletingAccessProfile: true,
            }
        case AT.DELETE_ACCESS_PROFILE_SUCCESS:
            return {
                ...state,
                isDeletingAccessProfile: false,
                accessProfile: deleteAccessProfile(action.payload, state.accessProfile),
            }
        case AT.DELETE_ACCESS_PROFILE_FAIL:
            return {
                ...state,
                isDeletingAccessProfile: false,
            }
        case AT.REGISTER_KEY_REQUEST:
            return {
                ...state,
                isUpdatingKey: true,
            }
        case AT.REGISTER_KEY_SUCCESS:
            return {
                ...state,
                isUpdatingKey: false,
                key: registerKey(action.payload, state.key),
            }
        case AT.REGISTER_KEY_FAIL:
            return {
                ...state,
                isUpdatingKey: false,
            }
        case AT.FETCH_KEY_SUCCESS:
            return {
                ...state,
                isKeyLoaded: true,
                isUpdatingKey: false,
                key: action.payload,
            }
        case AT.UPDATE_KEY_REQUEST:
            return {
                ...state,
                isUpdatingKey: true,
            }
        case AT.UPDATE_KEY_SUCCESS:
            return {
                ...state,
                isUpdatingKey: false,
                key: updateKey(action.payload, state.key),
            }
        case AT.UPDATE_KEY_FAIL:
            return {
                ...state,
                isUpdatingKey: false,
            }
        case AT.DEREGISTER_KEY_REQUEST:
            return {
                ...state,
                isDeregisteringKey: true,
            }
        case AT.DEREGISTER_KEY_SUCCESS:
            return {
                ...state,
                isDeregisteringKey: false,
                key: deregisterKey(action.payload, state.key),
            }
        case AT.DEREGISTER_KEY_FAIL:
            return {
                ...state,
                isDeregisteringKey: false,
            }
        case AT.PROGRAM_KEY_REQUEST:
            return {
                ...state,
                isProgramming: true,
            }
        case AT.PROGRAM_KEY_SUCCESS:
            return {
                ...state,
                isProgramming: false,
                ...programSuccess(action.payload, state),
            }
        case AT.PROGRAM_KEY_FAIL:
            return {
                ...state,
                isProgramming: false,
            }
        case AT.REGISTER_KEY_MANAGER_REQUEST:
            return {
                ...state,
                isUpdatingKeyManager: true,
            }
        case AT.REGISTER_KEY_MANAGER_SUCCESS:
            return {
                ...state,
                isUpdatingKeyManager: false,
                keyManager: updateKeyManager(action.payload, state.keyManager),
            }
        case AT.REGISTER_KEY_MANAGER_FAIL:
            return {
                ...state,
                isUpdatingKeyManager: false,
            }
        case AT.FETCH_KEY_MANAGER_SUCCESS:
            return {
                ...state,
                isKeyManagerLoaded: true,
                isUpdatingKeyManager: false,
                keyManager: action.payload,
            }
        case AT.UPDATE_KEY_MANAGER_REQUEST:
            return {
                ...state,
                isUpdatingKeyManager: true,
            }
        case AT.UPDATE_KEY_MANAGER_SUCCESS:
            return {
                ...state,
                isUpdatingKeyManager: false,
                keyManager: updateKeyManager(action.payload, state.keyManager),
            }
        case AT.UPDATE_KEY_MANAGER_FAIL:
            return {
                ...state,
                isUpdatingKeyManager: false,
            }
        case AT.DEREGISTER_KEY_MANAGER_REQUEST:
            return {
                ...state,
                isDeregisteringKeyManager: true,
            }
        case AT.DEREGISTER_KEY_MANAGER_SUCCESS:
            return {
                ...state,
                isDeregisteringKeyManager: false,
                keyManager: deregisterKeyManager(action.payload, state.keyManager),
            }
        case AT.DEREGISTER_KEY_MANAGER_FAIL:
            return {
                ...state,
                isDeregisteringKeyManager: false,
            }
        case AT.REGISTER_LOCK_REQUEST:
            return {
                ...state,
                isUpdatingLock: true,
            }
        case AT.REGISTER_LOCK_SUCCESS:
            return {
                ...state,
                isUpdatingLock: false,
                lock: updateLock(action.payload, state.lock),
            }
        case AT.REGISTER_LOCK_FAIL:
            return {
                ...state,
                isUpdatingLock: false,
            }
        case AT.FETCH_LOCK_SUCCESS:
            return {
                ...state,
                isLockLoaded: true,
                isUpdatingLock: false,
                lock: action.payload,
            }
        case AT.UPDATE_LOCK_REQUEST:
            return {
                ...state,
                isUpdatingLock: true,
            }
        case AT.UPDATE_LOCK_SUCCESS:
            return {
                ...state,
                isUpdatingLock: false,
                lock: updateLock(action.payload, state.lock),
            }
        case AT.UPDATE_LOCK_FAIL:
            return {
                ...state,
                isUpdatingLock: false,
            }
        case AT.DEREGISTER_LOCK_REQUEST:
            return {
                ...state,
                isDeregisteringLock: true,
            }
        case AT.DEREGISTER_LOCK_SUCCESS:
            return {
                ...state,
                isDeregisteringLock: false,
                lock: deregisterLock(action.payload, state.lock),
                key: deregisterLockKey(action.payload, state.key),
                accessProfile: deregisterLockAccessProfile(action.payload, state.accessProfile),
            }
        case AT.DEREGISTER_LOCK_FAIL:
            return {
                ...state,
                isDeregisteringLock: false,
            }
        case AT.REGISTER_AUTHEN_TOKEN_REQUEST:
            return {
                ...state,
                isUpdatingAuthenToken: true,
            }
        case AT.REGISTER_AUTHEN_TOKEN_SUCCESS:
            return {
                ...state,
                isUpdatingAuthenToken: false,
                authenToken: updateAuthenToken(action.payload, state.authenToken),
            }
        case AT.REGISTER_AUTHEN_TOKEN_FAIL:
            return {
                ...state,
                isUpdatingAuthenToken: false,
            }
        case AT.FETCH_AUTHEN_TOKEN_SUCCESS:
            return {
                ...state,
                isAuthenTokenLoaded: true,
                isUpdatingAuthenToken: false,
                authenToken: action.payload,
            }
        case AT.UPDATE_AUTHEN_TOKEN_REQUEST:
            return {
                ...state,
                isUpdatingAuthenToken: true,
            }
        case AT.UPDATE_AUTHEN_TOKEN_SUCCESS:
            return {
                ...state,
                isUpdatingAuthenToken: false,
                authenToken: updateAuthenToken(action.payload, state.authenToken),
            }
        case AT.UPDATE_AUTHEN_TOKEN_FAIL:
            return {
                ...state,
                isUpdatingAuthenToken: false,
            }
        case AT.DEREGISTER_AUTHEN_TOKEN_REQUEST:
            return {
                ...state,
                isDeregisteringAuthenToken: true,
            }
        case AT.DEREGISTER_AUTHEN_TOKEN_SUCCESS:
            return {
                ...state,
                isDeregisteringAuthenToken: false,
                authenToken: deregisterAuthenToken(action.payload, state.authenToken),
            }
        case AT.DEREGISTER_AUTHEN_TOKEN_FAIL:
            return {
                ...state,
                isDeregisteringAuthenToken: false,
            }
        case AT.DELETE_USER_SUCCESS:
            return {
                ...state,
                key: deleteUserKey(action.payload, state.key),
            }
        case AT.LOGOUT_SUCCESS:
        case AT.LOGOUT_FAIL:
            return {
                ...initState,
            }
        default:
            break
    }
    return state
}

// note:
// - these reducer helper functions must be pure function (i.e. no side effect)
// - mush not modify the inputs (i.e. include both action and state; must return a new object)

// reducer helper function to update accessProfileObject with updated array of access profile
const updateAccessProfile = (accessProfiles, accessProfileObject) => {
    return accessProfiles.reduce((allObject, accessProfile) => {
        allObject[accessProfile.id] = accessProfile
        return allObject
    }, {...accessProfileObject})
}

// reducer helper function to delete accessProfileObject with array of access profile ids
const deleteAccessProfile = (accessProfileIds, accessProfileObject) => {
    let copyObject = {...accessProfileObject}
    accessProfileIds.forEach(id => delete copyObject[id])
    return copyObject
}

// reducer helper function to register keyObject with array of key serial number
const registerKey = (keys, keyObject) => {
    return keys.reduce((allObject, key) => {
        allObject[key.serialNumber] = key
        return allObject
    }, {...keyObject})
}

// reducer helper function to update keyObject with array of key
const updateKey = (keys, keyObject) => {
    return keys.reduce((allObject, key) => {
        allObject[key.serialNumber] = {
            ...allObject[key.serialNumber],
            ...key,
        }
        return allObject
    }, {...keyObject})
}

// reducer helper function to deregister keyObject with array of key serial number
const deregisterKey = (keySerialNumbers, keyObject) => {
    return keySerialNumbers.reduce((allObject, serialNumber) => {
        delete allObject[serialNumber]
        return allObject
    }, {...keyObject})
}

// reducer helper function after programming key success
const programSuccess = (programOperation, state) => {
    const { operation } = programOperation
    switch (operation) {
        case PROGRAM.FACTORY_RESET:
            // factory reset keys
            return resetKey(programOperation, state)
        case PROGRAM.DOWNLOAD_ACCESS_PROFILE:
            // successfully downloaded access profile to access key, update corresponding key's locks and users
            const { keySerialNumber, accessProfileIds } = programOperation
            const { key, accessProfile } = state
            const locks = accessProfileIds.reduce((all, accessProfileId) => {
                return all.concat(accessProfile[accessProfileId].locks)
            }, [])
            const users = accessProfileIds.reduce((all, accessProfileId) => {
                return all.concat(accessProfile[accessProfileId].users)
            }, [])
            return {
                key: {
                    ...key,
                    [keySerialNumber]: {
                        ...key[keySerialNumber],
                        locks,
                        users: [...new Set(users)],
                    }
                }
            }
        case PROGRAM.BE_LOCK_READER:
            // successfully programmed management key to be a lock reader
            return updateKeyUsage(programOperation, state)
        case PROGRAM.READ_ACCESS_HISTORY:
            // successfully read access history from access or management key
            //FIXME, update read access history? and update activity from server?
            return { key: state.key, lock: state.lock }
        case PROGRAM.BE_LOCK_INITIALIZER:
            // successfully programmed management key to be a lock initializer
            return updateKeyUsage(programOperation, state)
        case PROGRAM.READ_INITIALIZED_LOCK:
            // successfully read initialized lock history
            //FIXME, update initialized lock history?
            return { key: state.key, lock: state.lock }
        case PROGRAM.BE_AUTHEN_TOKEN_INITIALIZER:
            // successfully programmed management key to be a authen token initializer
            return updateKeyUsage(programOperation, state)
        case PROGRAM.READ_AUTHEN_TOKEN:
            // successfully read authen token history
            //FIXME, update authen token history?
            return { key: state.key, lock: state.lock }
        default:
            break
    }
    return { key: state.key, lock: state.lock }
}

// reducer helper function to factory reset keyObject with array of key serial numbers
const resetKey = (programOperation, state) => {
    const { keySerialNumber } = programOperation
    const key = [keySerialNumber].reduce((allObject, serialNumber) => {
        const { type } = allObject[serialNumber]
        allObject[serialNumber] = {
            serialNumber,
            type,
        }
        return allObject
    }, {...state.key})
    return { key, lock: state.lock }
}

// update management key usage and clear usageInfo
const updateKeyUsage = (programOperation, state) => {
    const { operation, keySerialNumber } = programOperation
    let key = state.key
    let lock = state.lock
    switch (operation) {
        case PROGRAM.BE_LOCK_READER:
            key = ({
                ...state.key,
                [keySerialNumber]: {
                    ...state.key[keySerialNumber],
                    usage: KEY_USAGE.LOCK_READER,
                    usageInfo: {},
                },
            })
            break
        case PROGRAM.BE_LOCK_INITIALIZER:
            const { accessProfileIds } = programOperation
            const { accessProfile } = state
            const locks = accessProfileIds.reduce((all, accessProfileId) => {
                return all.concat(accessProfile[accessProfileId].locks)
            }, [])
            const users = [...new Set(accessProfileIds.reduce((all, accessProfileId) => {
                return all.concat(accessProfile[accessProfileId].users)
            }, []))]
            key = ({
                ...state.key,
                [keySerialNumber]: {
                    ...state.key[keySerialNumber],
                    usage: KEY_USAGE.LOCK_INITIALIZER,
                    usageInfo: {
                        locks,
                        users,
                    },
                },
            })
            lock = locks.reduce((lockObject, lock) => {
                lockObject[lock].initialized = true
                return lockObject
            }, {...state.lock})
            break
        case PROGRAM.BE_AUTHEN_TOKEN_INITIALIZER:
            key = ({
                ...state.key,
                [keySerialNumber]: {
                    ...state.key[keySerialNumber],
                    usage: KEY_USAGE.AUTHEN_TOKEN_INITIALIZER,
                    usageInfo: {},
                },
            })
            break
        default:
            break
    }
    return { key, lock }
}

// reducer helper function to update keyObject with updated array of key manager
const updateKeyManager = (keyManagers, keyObject) => {
    return keyManagers.reduce((allObject, keyManager) => {
        allObject.registered = {
            ...allObject.registered,
            [keyManager.serialNumber]: keyManager,
        }
        const { [keyManager.serialNumber]: _, ...notRegistered } = allObject.notRegistered
        allObject.notRegistered = notRegistered
        return allObject
    }, {...keyObject})
}

// reducer helper function to deregister keyObject with array of key serial number
const deregisterKeyManager = (keySerialNumbers, keyObject) => {
    return keySerialNumbers.reduce((allObject, serialNumber) => {
        const isOnline = Boolean(allObject.registered[serialNumber] && allObject.registered[serialNumber].ports)
        const { [serialNumber]: _, ...registered } = allObject.registered
        allObject.registered = registered
        if (isOnline) {
            allObject.notRegistered = {
                ...allObject.notRegistered,
                [serialNumber]: { serialNumber },
            }
        }
        return allObject
    }, {...keyObject})
}

// reducer helper function to update keyObject with updated array of key manager
const updateLock = (locks, lockObject) => {
    return locks.reduce((allObject, lock) => {
        allObject[lock.serialNumber] = lock
        return allObject
    }, {...lockObject})
}

// reducer helper function to deregister lockObject with array of lock serial number
const deregisterLock = (lockSerialNumbers, lockObject) => {
    return lockSerialNumbers.reduce((allObject, serialNumber) => {
        delete allObject[serialNumber]
        return allObject
    }, {...lockObject})
}

// reducer helper function to update keyObject with array of deregister key serial number
//FIXME, not sure if it's fine to remove the key in client app or in the server to keep the data consistent
const deregisterLockKey = (lockSerialNumbers, keyObject) => {
    return lockSerialNumbers.reduce((allObject1, serialNumber) => {
        return Object.entries(allObject1).reduce((allObject2, [keyId, key]) => {
            allObject2[keyId] = {
                ...key,
                locks: key.locks.filter(lockSerialNumber => lockSerialNumber !== serialNumber)
            }
            return allObject2
        }, {})
    }, keyObject)
}

// reducer helper function to update keyObject with array of deregister key serial number
//FIXME, not sure if it's fine to remove the key in client app or in the server to keep the data consistent
const deleteUserKey = (userIds, keyObject) => {
    return userIds.reduce((allObject1, userId) => {
        return Object.entries(allObject1).reduce((allObject2, [keyId, key]) => {
            allObject2[keyId] = {
                ...key,
                users: key.users.filter(lockuserId => lockuserId !== userId)
            }
            return allObject2
        }, {})
    }, keyObject)
}

// reducer helper function to update keyObject with array of deregister key serial number
//FIXME, not sure if it's fine to remove the lock in client app or in the server to keep the data consistent
const deregisterLockAccessProfile = (lockSerialNumbers, accessProfileObject) => {
    return lockSerialNumbers.reduce((allObject1, serialNumber) => {
        return Object.entries(allObject1).reduce((allObject2, [accessProfileId, accessProfile]) => {
            allObject2[accessProfileId] = {
                ...accessProfile,
                locks: accessProfile.locks.filter(lockSerialNumber => lockSerialNumber !== serialNumber)
            }
            return allObject2
        }, {})
    }, accessProfileObject)
}

// reducer helper function to update keyObject with updated array of key manager
const updateAuthenToken = (authenTokens, authenTokenObject) => {
    return authenTokens.reduce((allObject, authenToken) => {
        allObject[authenToken.serialNumber] = authenToken
        return allObject
    }, {...authenTokenObject})
}

// reducer helper function to deregister authenTokenObject with array of authen token serial number
const deregisterAuthenToken = (authenTokenSerialNumbers, authenTokenObject) => {
    return authenTokenSerialNumbers.reduce((allObject, serialNumber) => {
        delete allObject[serialNumber]
        return allObject
    }, {...authenTokenObject})
}

// ----------------------------------------------------------------------------
// Private selectors

export const selectIsAccessProfileLoaded = (state) => state.isAccessProfileLoaded

export const selectIsKeyLoaded = (state) => state.isKeyLoaded

export const selectIsKeyManagerLoaded = (state) => state.isKeyManagerLoaded

export const selectIsLockLoaded = (state) => state.isLockLoaded

export const selectIsAuthenTokenLoaded = (state) => state.isAuthenTokenLoaded

export const selectAccessProfile = (state) => state.accessProfile

export const selectKey = (state) => state.key

export const selectRegisteredKeyManager = (state) => state.keyManager.registered

export const selectNotRegisteredKeyManager = (state) => state.keyManager.notRegistered

export const selectLock = (state) => state.lock

export const selectAuthenToken = (state) => state.authenToken

export const selectIsUpdatingAccessProfile = (state) => state.isUpdatingAccessProfile

export const selectIsDeletingAccessProfile = (state) => state.isDeletingAccessProfile

export const selectIsUpdatingKey = (state) => state.isUpdatingKey

export const selectIsDeregisteringKey = (state) => state.isDeregisteringKey

export const selectIsProgramming = (state) => state.isProgramming

export const selectIsUpdatingKeyManager = (state) => state.isUpdatingKeyManager

export const selectIsDeregisteringKeyManager = (state) => state.isDeregisteringKeyManager

export const selectIsUpdatingLock = (state) => state.isUpdatingLock

export const selectIsDeregisteringLock = (state) => state.isDeregisteringLock

export const selectIsUpdatingAuthenToken = (state) => state.isUpdatingAuthenToken

export const selectIsDeregisteringAuthenToken = (state) => state.isDeregisteringAuthenToken

export default lockManagement

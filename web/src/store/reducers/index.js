import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import ui, * as reducerUi from './ui'
import myself, * as reducerMyself from './myself'
import users, * as reducerUsers from './users'
import lockManagement, * as reducerLockManagement from './lockManagement'
import activity, * as reducerActivity from './activity'
import { CONF } from '../../constants'

const REDUCER = {
    UI: 'ui',
    MYSELF: 'myself',
    USERS: 'users',
    LOCK_MANAGEMENT: 'lockManagement',
    ACTIVITY: 'activity',
}

const reducers = combineReducers({
    [REDUCER.UI]: ui,
    [REDUCER.MYSELF]: myself,
    [REDUCER.USERS]: users,
    [REDUCER.LOCK_MANAGEMENT]: lockManagement,
    [REDUCER.ACTIVITY]: activity,
})

// ----------------------------------------------------------------------------
// Public selectors

// ui selectors

export const selectLoaderMessage = (state) => {
    return reducerUi.selectLoaderMessage(state[REDUCER.UI])
}

export const selectErrorMessage = (state) => {
    return reducerUi.selectErrorMessage(state[REDUCER.UI])
}

export const selectBatchErrors = (state) => {
    return reducerUi.selectBatchErrors(state[REDUCER.UI])
}

// Activity page's UI settings

export const selectActivityTab = (state) => {
    return reducerUi.selectActivityTab(state[REDUCER.UI])
}

export const selectActivityPeriod = (state) => {
    return reducerUi.selectActivityPeriod(state[REDUCER.UI])
}

export const selectActivityDuration = (state) => {
    return reducerUi.selectActivityDuration(state[REDUCER.UI])
}

export const selectActivityProgress = (state) => {
    return reducerUi.selectActivityProgress(state[REDUCER.UI])
}

// AccessProfile page's UI settings

export const selectAccessProfileSelectedRow = (state) => {
    return reducerUi.selectAccessProfileSelectedRow(state[REDUCER.UI])
}

export const selectAccessProfileTab = (state) => {
    return reducerUi.selectAccessProfileTab(state[REDUCER.UI])
}

// Hardware page's UI settings

export const selectHardwareTab = (state) => {
    return reducerUi.selectHardwareTab(state[REDUCER.UI])
}

export const selectHardwareLockSelectedRow = (state) => {
    return reducerUi.selectHardwareLockSelectedRow(state[REDUCER.UI])
}

export const selectHardwareLockSelectedLocks = (state) => {
    return reducerUi.selectHardwareLockSelectedLocks(state[REDUCER.UI])
}

export const selectHardwareKeySelectedRow = (state) => {
    return reducerUi.selectHardwareKeySelectedRow(state[REDUCER.UI])
}

export const selectHardwareKeyTab = (state) => {
    return reducerUi.selectHardwareKeyTab(state[REDUCER.UI])
}

export const selectHardwareKeyManagerSelectedRow = (state) => {
    return reducerUi.selectHardwareKeyManagerSelectedRow(state[REDUCER.UI])
}

export const selectHardwareKeyManagerTab = (state) => {
    return reducerUi.selectHardwareKeyManagerTab(state[REDUCER.UI])
}

export const selectHardwareAuthenTokenSelectedRow = (state) => {
    return reducerUi.selectHardwareAuthenTokenSelectedRow(state[REDUCER.UI])
}

// User page's UI settings

export const selectUserTab = (state) => {
    return reducerUi.selectUserTab(state[REDUCER.UI])
}

export const selectUserUserSelectedRow = (state) => {
    return reducerUi.selectUserUserSelectedRow(state[REDUCER.UI])
}

export const selectUserLocationExpanded = (state) => {
    return reducerUi.selectUserLocationExpanded(state[REDUCER.UI])
}

export const selectUserLocationSelected = (state) => {
    return reducerUi.selectUserLocationSelected(state[REDUCER.UI])
}

export const selectUserScopeExpanded = (state) => {
    return reducerUi.selectUserScopeExpanded(state[REDUCER.UI])
}

export const selectUserScopeSelected = (state) => {
    return reducerUi.selectUserScopeSelected(state[REDUCER.UI])
}

export const selectUserPrivilegeProfileSelectedRow = (state) => {
    return reducerUi.selectUserPrivilegeProfileSelectedRow(state[REDUCER.UI])
}

// System page's UI settings

export const selectSystemTab = (state) => {
    return reducerUi.selectSystemTab(state[REDUCER.UI])
}

// Setting page's UI settings

export const selectSettingTab = (state) => {
    return reducerUi.selectSettingTab(state[REDUCER.UI])
}

// myself selectors

export const selectMyselfProfileLoaded = (state) => {
    return reducerMyself.selectMyselfProfileLoaded(state[REDUCER.MYSELF])
}

export const selectMyselfId = (state) => {
    return reducerMyself.selectMyselfId(state[REDUCER.MYSELF])
}

export const selectMyselfUsername = (state) => {
    return reducerMyself.selectMyselfUsername(state[REDUCER.MYSELF])
}

export const selectMyselfName = (state) => {
    return reducerMyself.selectMyselfName(state[REDUCER.MYSELF])
}

export const selectMyselfCompany = (state) => {
    return reducerMyself.selectMyselfCompany(state[REDUCER.MYSELF])
}

export const selectMyselfEmail = (state) => {
    return reducerMyself.selectMyselfEmail(state[REDUCER.MYSELF])
}

export const selectMyselfPhoneNumber = (state) => {
    return reducerMyself.selectMyselfPhoneNumber(state[REDUCER.MYSELF])
}

export const selectMyselfDescription = (state) => {
    return reducerMyself.selectMyselfDescription(state[REDUCER.MYSELF])
}

export const selectMyselfLocationIds = (state) => {
    return reducerMyself.selectMyselfLocationIds(state[REDUCER.MYSELF])
}

export const selectMyselfScopeId = (state) => {
    return reducerMyself.selectMyselfScopeId(state[REDUCER.MYSELF])
}

export const selectMyselfPrivilegeProfile = (state) => {
    return reducerMyself.selectMyselfPrivilegeProfile(state[REDUCER.MYSELF])
}

export const selectMyselfPrivileges = (state) => {
    return reducerMyself.selectMyselfPrivileges(state[REDUCER.MYSELF])
}

export const selectMyselfValidPeriod = (state) => {
    return reducerMyself.selectMyselfValidPeriod(state[REDUCER.MYSELF])
}

export const selectMyselfLoginStatus = (state) => {
    return reducerMyself.selectMyselfLoginStatus(state[REDUCER.MYSELF])
}

export const selectRememberMe = (state) => {
    return reducerMyself.selectRememberMe(state[REDUCER.MYSELF])
}

export const selectMyselfIsChangingPassword = (state) => {
    return reducerMyself.selectMyselfIsChangingPassword(state[REDUCER.MYSELF])
}

export const selectMyselfIsUpdating = (state) => {
    return reducerMyself.selectMyselfIsUpdating(state[REDUCER.MYSELF])
}

export const selectMyselfIsUpdatingDatacenter = (state) => {
    return reducerMyself.selectMyselfIsUpdatingDatacenter(state[REDUCER.MYSELF])
}

export const selectMyselfIsUpdatingTenant = (state) => {
    return reducerMyself.selectMyselfIsUpdatingTenant(state[REDUCER.MYSELF])
}

// users selectors

export const selectIsUserLoaded = (state) => {
    return reducerUsers.selectIsUserLoaded(state[REDUCER.USERS])
}

export const selectIsLocationLoaded = (state) => {
    return reducerUsers.selectIsLocationLoaded(state[REDUCER.USERS])
}

export const selectIsScopeLoaded = (state) => {
    return reducerUsers.selectIsScopeLoaded(state[REDUCER.USERS])
}

export const selectIsPrivilegeProfileLoaded = (state) => {
    return reducerUsers.selectIsPrivilegeProfileLoaded(state[REDUCER.USERS])
}

export const selectIsUpdatingUser = (state) => {
    return reducerUsers.selectIsUpdatingUser(state[REDUCER.USERS])
}

export const selectIsDeletingUser = (state) => {
    return reducerUsers.selectIsDeletingUser(state[REDUCER.USERS])
}

export const selectIsResettingPassword = (state) => {
    return reducerUsers.selectIsResettingPassword(state[REDUCER.USERS])
}

export const selectIsUpdatingLocation = (state) => {
    return reducerUsers.selectIsUpdatingLocation(state[REDUCER.USERS])
}

export const selectIsDeletingLocation = (state) => {
    return reducerUsers.selectIsDeletingLocation(state[REDUCER.USERS])
}

export const selectIsUpdatingScope = (state) => {
    return reducerUsers.selectIsUpdatingScope(state[REDUCER.USERS])
}

export const selectIsDeletingScope = (state) => {
    return reducerUsers.selectIsDeletingScope(state[REDUCER.USERS])
}

export const selectIsUpdatingPrivilegeProfile = (state) => {
    return reducerUsers.selectIsUpdatingPrivilegeProfile(state[REDUCER.USERS])
}

export const selectIsDeletingPrivilegeProfile = (state) => {
    return reducerUsers.selectIsDeletingPrivilegeProfile(state[REDUCER.USERS])
}

export const selectUser = (state) => {
    return reducerUsers.selectUser(state[REDUCER.USERS])
}

export const selectLocation = (state) => {
    return reducerUsers.selectLocation(state[REDUCER.USERS])
}

export const selectScope = (state) => {
    return reducerUsers.selectScope(state[REDUCER.USERS])
}

export const selectPrivilegeProfile = (state) => {
    return reducerUsers.selectPrivilegeProfile(state[REDUCER.USERS])
}

// lock management selectors

export const selectIsAccessProfileLoaded = (state) => {
    return reducerLockManagement.selectIsAccessProfileLoaded(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsKeyLoaded = (state) => {
    return reducerLockManagement.selectIsKeyLoaded(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsKeyManagerLoaded = (state) => {
    return reducerLockManagement.selectIsKeyManagerLoaded(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsLockLoaded = (state) => {
    return reducerLockManagement.selectIsLockLoaded(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsAuthenTokenLoaded = (state) => {
    return reducerLockManagement.selectIsAuthenTokenLoaded(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectAccessProfile = (state) => {
    return reducerLockManagement.selectAccessProfile(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectKey = (state) => {
    return reducerLockManagement.selectKey(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectRegisteredKeyManager = (state) => {
    return reducerLockManagement.selectRegisteredKeyManager(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectNotRegisteredKeyManager = (state) => {
    return reducerLockManagement.selectNotRegisteredKeyManager(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectLock = (state) => {
    return reducerLockManagement.selectLock(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectAuthenToken = (state) => {
    return reducerLockManagement.selectAuthenToken(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsUpdatingAccessProfile = (state) => {
    return reducerLockManagement.selectIsUpdatingAccessProfile(state[REDUCER.LOCK_MANAGEMENT])
}    

export const selectIsDeletingAccessProfile = (state) => {
    return reducerLockManagement.selectIsDeletingAccessProfile(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsUpdatingKey = (state) => {
    return reducerLockManagement.selectIsUpdatingKey(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsDeregisteringKey = (state) => {
    return reducerLockManagement.selectIsDeregisteringKey(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsProgramming = (state) => {
    return reducerLockManagement.selectIsProgramming(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsUpdatingKeyManager = (state) => {
    return reducerLockManagement.selectIsUpdatingKeyManager(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsDeregisteringKeyManager = (state) => {
    return reducerLockManagement.selectIsDeregisteringKeyManager(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsUpdatingLock = (state) => {
    return reducerLockManagement.selectIsUpdatingLock(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsDeregisteringLock = (state) => {
    return reducerLockManagement.selectIsDeregisteringLock(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsUpdatingAuthenToken = (state) => {
    return reducerLockManagement.selectIsUpdatingAuthenToken(state[REDUCER.LOCK_MANAGEMENT])
}

export const selectIsDeregisteringAuthenToken = (state) => {
    return reducerLockManagement.selectIsDeregisteringAuthenToken(state[REDUCER.LOCK_MANAGEMENT])
}

// activity selectors

export const selectIsActivityLoaded = (state) => {
    return reducerActivity.selectIsActivityLoaded(state[REDUCER.ACTIVITY])
}

export const selectIsUpdatingActivity = (state) => {
    return reducerActivity.selectIsUpdatingActivity(state[REDUCER.ACTIVITY])
}

export const selectLastActivityUpdateTime = (state) => {
    return reducerActivity.selectLastActivityUpdateTime(state[REDUCER.ACTIVITY])
}

export const selectLastVersionUpdateTime = (state) => {
    return reducerActivity.selectLastVersionUpdateTime(state[REDUCER.ACTIVITY])
}

export const selectActivityLock = (state) => {
    return reducerActivity.selectActivityLock(state[REDUCER.ACTIVITY])
}

export const selectActivityOperation = (state) => {
    return reducerActivity.selectActivityOperation(state[REDUCER.ACTIVITY])
}

export const selectActivitySystem = (state) => {
    return reducerActivity.selectActivitySystem(state[REDUCER.ACTIVITY])
}

// cascading selectors

// select selected row's access profile in AccessProfile page
export const selectAccessProfileSelected = createSelector(
    selectAccessProfile,
    selectAccessProfileSelectedRow,
    (accessProfile, selectedRow) => {
        return selectedRow && accessProfile[selectedRow.id]
    }
)

// select selected row's array of lock
export const selectAccessProfileSelectedRowLocks = createSelector(
    selectAccessProfileSelected,
    selectLock,
    (accessProfile, lockObject) => {
        const { locks=[] } = accessProfile || {}
        return locks.map((lockId) => lockObject[lockId])
    }
)

// select selected row's array of user
export const selectAccessProfileSelectedRowUsers = createSelector(
    selectAccessProfileSelected,
    selectUser,
    (accessProfile, userObject) => {
        const { users=[] } = accessProfile || {}
        return users.map((userId) => userObject[userId])
    }
)

// select selected row's lock in Hardware page Lock tab
export const selectHardwareLockSelected = createSelector(
    selectLock,
    selectHardwareLockSelectedRow,
    (lockObject, selectedRow) => {
        return selectedRow && lockObject[selectedRow.serialNumber]
    }
)

// select selected row's key in Hardware page Key tab
export const selectHardwareKeySelected = createSelector(
    selectKey,
    selectHardwareKeySelectedRow,
    (keyObject, selectedRow) => {
        return selectedRow && keyObject[selectedRow.serialNumber]
    }
)

// select selected row's array of lock
export const selectHardwareKeySelectedRowLocks = createSelector(
    selectHardwareKeySelected,
    selectLock,
    (key, lockObject) => {
        const { locks=[] } = key
        return locks.map((lockId) => lockObject[lockId])
    }
)

// select selected row's array of user
export const selectHardwareKeySelectedRowUsers = createSelector(
    selectHardwareKeySelected,
    selectUser,
    (key, userObject) => {
        const { users=[] } = key
        return users.map((userId) => userObject[userId])
    }
)

// select selected row's history
export const selectHardwareKeySelectedRowActivity = createSelector(
    selectHardwareKeySelectedRow,
    selectActivityLock,
    (selectedRow, activity) => {
        const { serialNumber } = selectedRow
        return Object.values(activity).filter((log) => serialNumber === log.keySerialNumber)
    }
)

// select array of lock activity
export const selectActivityLockList = createSelector(
    selectActivityLock,
    (activityLock) => {
        return Object.values(activityLock).reduce((total, activity) => {
            return total.concat(activity)
        }, [])
    }
)

// select array of operation activity
export const selectActivityOperationList = createSelector(
    selectActivityOperation,
    (activityOperation) => {
        return Object.values(activityOperation).reduce((total, activity) => {
            return total.concat(activity)
        }, [])
    }
)

// select array of system activity
export const selectActivitySystemList = createSelector(
    selectActivitySystem,
    (activitySystem) => {
        return Object.values(activitySystem).reduce((total, activity) => {
            return total.concat(activity)
        }, [])
    }
)

// select array of access profile
export const selectAccessProfileList = createSelector(
    selectAccessProfile,
    (object) => {
        return Object.values(object).reduce((total, value) => {
            return total.concat(value)
        }, [])
    }
)

// select array of access profile name
export const selectAccessProfileNames = createSelector(
    selectAccessProfile,
    (object) => {
        return Object.values(object).reduce((total, value) => {
            return total.concat(value.name)
        }, [])
    }
)

// select array of online keys
export const selectOnlineKeys = createSelector(
    selectRegisteredKeyManager,
    (object) => {
        return Object.values(object).reduce((total, value) => {
            const keys = value.ports && value.ports.filter(key => !!key)
            return keys ? total.concat(keys) : total
        }, [])
    }
)

// select array of key
export const selectKeyList = createSelector(
    selectKey,
    selectOnlineKeys,
    (object, onlineKeys) => {
        return Object.entries(object).reduce((total, [keySerialNumber, value]) => {
            return total.concat({...value, online: onlineKeys.includes(keySerialNumber)})
        }, [])
    }
)

// select key manager
export const selectKeyManager = createSelector(
    selectRegisteredKeyManager,
    selectNotRegisteredKeyManager,
    (registeredObject, notRegisteredObject) => {
        const registered = Object.entries(registeredObject).reduce((total, [keySerialNumber, value]) => {
            total[keySerialNumber] = {...value, registered: true, online: Boolean(value.ports)}
            return total
        }, {})
        return Object.entries(notRegisteredObject).reduce((total, [keySerialNumber, value]) => {
            total[keySerialNumber] = {...value, registered: false, online: true}
            return total
        }, registered)
    }
)

// select array of key manager
export const selectKeyManagerList = createSelector(
    selectKeyManager,
    (object) => {
        return Object.values(object).map(value => value)
    }
)

// select the UI selected key manager
export const selectHardwareKeyManagerSelected = createSelector(
    selectKeyManager,
    selectHardwareKeyManagerSelectedRow,
    (object, selectedRow) => {
        return selectedRow && (object[selectedRow.serialNumber])
    }
)

// select array of lock
export const selectLockList = createSelector(
    selectLock,
    (object) => {
        return Object.values(object).reduce((total, value) => {
            return total.concat(value)
        }, [])
    }
)

// select array of lock
export const selectAuthenTokenList = createSelector(
    selectAuthenToken,
    (object) => {
        return Object.values(object).reduce((total, value) => {
            return total.concat(value)
        }, [])
    }
)

// select array of user
export const selectUserList = createSelector(
    selectUser,
    (object) => {
        return Object.values(object).reduce((total, value) => {
            return total.concat(value)
        }, [])
    }
)

// select selected row's user in User page User tab
export const selectUserUserSelected = createSelector(
    selectUser,
    selectUserUserSelectedRow,
    (user, selectedRow) => {
        return selectedRow && user[selectedRow.id]
    }
)

// select selected row's user in User page User tab
export const selectUserPrivilegeProfileSelected = createSelector(
    selectPrivilegeProfile,
    selectUserPrivilegeProfileSelectedRow,
    (privilegeProfileObject, selectedRow) => {
        return selectedRow && privilegeProfileObject[selectedRow.id]
    }
)

// select array of privilege profile
export const selectPrivilegeList = createSelector(
    selectPrivilegeProfile,
    (object) => {
        return Object.values(object).reduce((total, value) => {
            return total.concat(value)
        }, [])
    }
)

// select object of location path key-value of locationId and location full path name
export const selectLocationPath = createSelector(
    selectLocation,
    (nodes) => {
        return constructNodeNameObject(nodes, CONF.PATH_SEPARATOR)
    }
)

// select object of scope path key-value of scopeId and scope full path name
export const selectScopePath = createSelector(
    selectScope,
    (nodes) => {
        return constructNodeNameObject(nodes, CONF.PATH_SEPARATOR)
    }
)

const constructNodeNameObject = (nodes, separator) => {
    return nodes.reduce((all, node) => {
        const saveNode = (paths, n1) => {
            all[n1.id] = [...paths, n1.name].join(separator)
            if (Array.isArray(n1.children)) {
                n1.children.map(n2 => saveNode(paths.concat(n1.name), n2))
            }
        }
        saveNode([], node)
        return all
    }, {})
}

export default reducers

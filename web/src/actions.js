import { AT, CONF, HTTP, URL } from './constants'
import privilege from './lib/privilege'
import { selectMyselfPrivileges, selectMyselfLocationIds, selectMyselfScopeId, selectIsUserLoaded, selectIsLocationLoaded, selectIsScopeLoaded, selectIsPrivilegeProfileLoaded, selectIsAccessProfileLoaded, selectIsKeyLoaded, selectIsKeyManagerLoaded, selectIsLockLoaded, selectIsAuthenTokenLoaded, selectIsActivityLoaded } from './store/reducers'
import { sessionSaveUser, sessionClear } from './lib/session'

// api action default parameter function
const baseURL = process.env.REACT_APP_BASE_URL || ''
function apiAction({
    url = '',
    method = HTTP.GET,
    headers = {},
    data = null,
    skipApiError = false,
    onSuccess = () => {},
    onFailure = () => {},
    label = '',
}) {
    return {
        type: AT.API,
        payload: {
            url: baseURL + url,
            method,
            headers,
            data,
            onSuccess,
            onFailure,
            skipApiError,
            label,
        }
    }
}

//
// actions functions that return action object that will be dispatched by the caller
// FIXME, should make all action object to be Flux Standard Action (FSA) compliant
//

const actions = {
    // UI actions

    loaderShowMessage: (message) => ({
        type: AT.LOADER_MESSAGE,
        payload: {
            message
        },
    }),
    loaderClearMessage: () => ({
        type: AT.LOADER_MESSAGE,
        payload: {
            message: ''
        },
    }),
    errorShowMessage: (message) => ({
        type: AT.ERROR_MESSAGE,
        payload: {
            message
        },
    }),
    clearErrorMessage: () => ({
        type: AT.ERROR_MESSAGE,
        payload: {
            message: '',
        },
    }),
    changeActivityTabSelect: (eventKey) => ({
        type: AT.ACTIVITY_TAB_SELECT,
        payload: {
            eventKey,
        },
    }),
    changeAccessProfileSelectedRow: (selectedRow) => ({
        type: AT.ACCESS_PROFILE_ROW_SELECT,
        payload: {
            selectedRow,
        },
    }),
    changeAccessProfileTabSelect: (eventKey) => ({
        type: AT.ACCESS_PROFILE_TAB_SELECT,
        payload: {
            eventKey,
        },
    }),
    changeHardwareTabSelect: (eventKey) => ({
        type: AT.HARDWARE_TAB_SELECT,
        payload: {
            eventKey,
        },
    }),
    changeHardwareLockSelectedRow: (selectedRow) => ({
        type: AT.HARDWARE_LOCK_ROW_SELECT,
        payload: {
            selectedRow,
        },
    }),
    changeHardwareLockSelectedLocks: (selectedLocks) => ({
        type: AT.HARDWARE_LOCKS_SELECT,
        payload: {
            selectedLocks,
        },
    }),
    changeHardwareKeySelectedRow: (selectedRow) => ({
        type: AT.HARDWARE_KEY_ROW_SELECT,
        payload: {
            selectedRow,
        },
    }),
    changeHardwareKeyTabSelect: (eventKey) => ({
        type: AT.HARDWARE_KEY_TAB_SELECT,
        payload: {
            eventKey,
        },
    }),
    changeHardwareKeyManagerSelectedRow: (selectedRow) => ({
        type: AT.HARDWARE_KEY_MANAGER_ROW_SELECT,
        payload: {
            selectedRow,
        },
    }),
    changeHardwareKeyManagerTabSelect: (eventKey) => ({
        type: AT.HARDWARE_KEY_MANAGER_TAB_SELECT,
        payload: {
            eventKey,
        },
    }),
    changeHardwareAuthenTokenSelectedRow: (selectedRow) => ({
        type: AT.HARDWARE_AUTHEN_TOKEN_ROW_SELECT,
        payload: {
            selectedRow,
        },
    }),
    changeUserTabSelect: (eventKey) => ({
        type: AT.USER_TAB_SELECT,
        payload: {
            eventKey,
        },
    }),
    changeUserUserSelectedRow: (selectedRow) => ({
        type: AT.USER_USER_ROW_SELECT,
        payload: {
            selectedRow,
        },
    }),
    changeUserLocationExpanded: (nodeIds) => ({
        type: AT.USER_LOCATION_EXPANDED,
        payload: {
            nodeIds,
        },
    }),
    changeUserLocationSelected: (nodeId) => ({
        type: AT.USER_LOCATION_SELECTED,
        payload: {
            nodeId,
        },
    }),
    changeUserScopeExpanded: (nodeIds) => ({
        type: AT.USER_SCOPE_EXPANDED,
        payload: {
            nodeIds,
        },
    }),
    changeUserScopeSelected: (nodeId) => ({
        type: AT.USER_SCOPE_SELECTED,
        payload: {
            nodeId,
        },
    }),
    changeUserPrivilegeProfileSelectedRow: (selectedRow) => ({
        type: AT.USER_PRIVILEGE_PROFILE_ROW_SELECT,
        payload: {
            selectedRow,
        },
    }),
    changeSystemTabSelect: (eventKey) => ({
        type: AT.SYSTEM_TAB_SELECT,
        payload: {
            eventKey,
        },
    }),
    changeSettingTabSelect: (eventKey) => ({
        type: AT.SETTING_TAB_SELECT,
        payload: {
            eventKey,
        },
    }),

    // authentication actions

    // post user username and password to log in
    userLogin: (username, password, isRememberMe) => (dispatch) => {
        dispatch(actions.loggingIn())
        dispatch(actions.loaderShowMessage('Logging in...'))
        dispatch(apiAction({
            url: URL.API_LOGIN,
            method: HTTP.POST,
            data: {
                username,
                password,
            },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.loaderShowMessage('Loading data...'))
                const userInfo = response.data
                dispatch(actions.loginSuccess(userInfo))
                dispatch(actions.rememberMe(isRememberMe, userInfo))
                // after successful login, fetch all info
                dispatch(actions.fetchStoreInfo(userInfo))
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.loaderClearMessage())
                dispatch(actions.loginFail(error))
            },
        }))
    },
    // reload user by getting current user info which depends if the cookie is expired or not
    userReload: () => (dispatch) => {
        dispatch(actions.loggingIn())
        dispatch(actions.loaderShowMessage('Reloading...'))
        dispatch(apiAction({
            url: URL.API_MY_INFO,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.loaderShowMessage('Loading data...'))
                const userInfo = response.data
                dispatch(actions.loginSuccess(userInfo))
                dispatch(actions.rememberMe(false, userInfo))
                // after successful login, fetch all info
                dispatch(actions.fetchStoreInfo(userInfo))
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.loaderClearMessage())
                dispatch(actions.loginFail(error))
            },
        }))
    },
    loggingIn: () => ({
        type: AT.LOGIN_REQUEST,
    }),
    loginSuccess: (data) => ({
        type: AT.LOGIN_SUCCESS,
        payload: {
            ...data,
            timestamp: new Date().toString(),
        },
    }),
    loginFail: (error) => ({
        type: AT.LOGIN_FAIL,
        error: error.toString(),
    }),
    logout: () => (dispatch) => {
        // delete session upon logout
        sessionClear()
        // no need to contact the server for http connection, just clear session cookies
        // note: if Websocket is used, will need to disconnect with the server first
        dispatch(actions.loggingOut())
        dispatch(actions.pollServerChangesAbort())
        dispatch(actions.pollActivityAbort())
        dispatch(actions.logOutSuccess())
    },
    loggingOut: () => ({
        type: AT.LOGOUT_REQUEST,
    }),
    logOutSuccess: () => ({
        type: AT.LOGOUT_SUCCESS,
    }),
    rememberMe: (isRememberMe, userInfo) => {
        // save session base on isRememberMe
        sessionSaveUser(isRememberMe, userInfo)
        // return isRememberMe action type
        return ({
            type: AT.REMEMBER_ME,
            payload: isRememberMe,
        })
    },
    // post user id, old and new password to change user password
    userChangePassword: (id, oldPassword, newPassword) => (dispatch) => {
        dispatch(actions.userChangePasswordRequest())
        dispatch(apiAction({
            url: URL.API_CHANGE_PASSWORD,
            method: HTTP.POST,
            data: [{
                id,
                oldPassword,
                newPassword,
            }],
            onSuccess: (response) => actions.userChangePasswordSuccess(response),
            onFailure: (error) => actions.userChangePasswordFail(error),
        }))
    },
    userChangePasswordRequest: () => ({
        type: AT.CHANGE_PASSWORD_REQUEST,
    }),
    userChangePasswordSuccess: (response) => ({
        type: AT.CHANGE_PASSWORD_SUCCESS,
        error: false,
        payload: response.data,
    }),
    userChangePasswordFail: (error) => ({
        type: AT.CHANGE_PASSWORD_FAIL,
        error: true,
        payload: error,
    }),
    // post user id and password to reset user password
    userResetPassword: (resets) => (dispatch) => {
        if (Array.isArray(resets) && (resets.length > 0)) {
            dispatch(actions.userResetPasswordRequest())
            dispatch(apiAction({
                url: URL.API_RESET_PASSWORD,
                method: HTTP.POST,
                data: resets,
                onSuccess: (response) => actions.userResetPasswordSuccess(response),
                onFailure: (error) => actions.userResetPasswordFail(error),
            }))
        }
    },
    userResetPasswordRequest: () => ({
        type: AT.RESET_PASSWORD_REQUEST,
    }),
    userResetPasswordSuccess: (response) => ({
        type: AT.RESET_PASSWORD_SUCCESS,
        error: false,
        payload: response.data,
    }),
    userResetPasswordFail: (error) => ({
        type: AT.RESET_PASSWORD_FAIL,
        error: true,
        payload: error,
    }),

    // fetch all info to redux store upon login
    fetchStoreInfo: ({locationIds, scopeId, privilegeProfile}) => (dispatch) => {
        const { privileges } = privilegeProfile
        if (Array.isArray(privileges)) {
            // fetch access profile, key, key manager, lock and activity info
            if (privilege.hasUser(privileges)) {
                dispatch(actions.fetchUser({locationIds, scopeId}))
                dispatch(actions.fetchPrivilegeProfile({locationIds, scopeId}))
            }
            if (privilege.hasLocationScope(privileges)) {
                dispatch(actions.fetchLocation({locationIds, scopeId}))
                dispatch(actions.fetchScope({locationIds, scopeId}))
            }
            if (privilege.hasAccessProfile(privileges)) {
                dispatch(actions.fetchAccessProfile({locationIds, scopeId}))
            }
            if (privilege.hasAccessResources(privileges)) {
                dispatch(actions.fetchKey({locationIds, scopeId}))
            }
            if (privilege.hasManagementResources(privileges)) {
                dispatch(actions.fetchKeyManager({locationIds, scopeId}))
                dispatch(actions.fetchLock({locationIds, scopeId}))
                dispatch(actions.fetchAuthenToken({locationIds, scopeId}))
            }
            if (privilege.hasActivity(privileges)) {
                const to = Math.floor((new Date()).getTime() / 1000)
                const from = to - CONF.LOAD_ACTIVITY_LATEST
                dispatch(actions.fetchActivity({from, to}))
            }
            dispatch(actions.checkAllInfoLoaded())
        } else {
            dispatch(actions.loaderClearMessage())
            dispatch(actions.loginFail(new Error('Invalid user!')))
        }
    },
    // check if all info is loaded
    checkAllInfoLoaded: () => (dispatch, getState) => {
        const state = getState()
        const privileges = selectMyselfPrivileges(state)
        const locationIds = selectMyselfLocationIds(state)
        const scopeId = selectMyselfScopeId(state)
        const isLoadeds = []
        if (privilege.hasUser(privileges)) {
            isLoadeds.push(selectIsUserLoaded)
            isLoadeds.push(selectIsPrivilegeProfileLoaded)
        }
        if (privilege.hasLocationScope(privileges)) {
            isLoadeds.push(selectIsLocationLoaded)
            isLoadeds.push(selectIsScopeLoaded)
        }
        if (privilege.hasAccessProfile(privileges)) {
            isLoadeds.push(selectIsAccessProfileLoaded)
        }
        if (privilege.hasAccessResources(privileges)) {
            isLoadeds.push(selectIsKeyLoaded)
        }
        if (privilege.hasManagementResources(privileges)) {
            isLoadeds.push(selectIsKeyManagerLoaded)
            isLoadeds.push(selectIsLockLoaded)
            isLoadeds.push(selectIsAuthenTokenLoaded)
        }
        if (privilege.hasActivity(privileges)) {
            isLoadeds.push(selectIsActivityLoaded)
        }
        // Q: every info is loaded?
        if (isLoadeds.every(isLoaded => isLoaded(state))) {
            // done loading info, clear loader message and start background polling for changes
            dispatch(actions.loaderClearMessage())
            dispatch(actions.pollServerChangesStart({privileges, locationIds, scopeId}))
            dispatch(actions.pollActivityStart(CONF.LOAD_ACTIVITY_LATEST))
        }
    },

    // user info actions

    // create array of users
    // - array of user object
    createUser: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.createUserRequest())
            dispatch(apiAction({
                url: URL.API_CREATE_USER,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.createUserSuccess(response),
                onFailure: (error) => actions.createUserFail(error),
            }))
        }
    },
    createUserRequest: () => ({
        type: AT.CREATE_USER_REQUEST,
    }),
    createUserSuccess: (response) => ({
        type: AT.CREATE_USER_SUCCESS,
        error: false,
        payload: response.data,
    }),
    createUserFail: (error) => ({
        type: AT.CREATE_USER_FAIL,
        error: true,
        payload: error,
    }),
    // fetch users info
    fetchUser: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(actions.updateUserRequest())
        dispatch(apiAction({
            url: URL.API_USER_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchUserSuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updateUserFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest users info
    latestUser: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(apiAction({
            url: URL.API_USER_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchUserSuccess(response))
            },
        }))
    },
    fetchUserSuccess: (response) => ({
        type: AT.FETCH_USER_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update array of users
    // - array of user object
    updateUser: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updateUserRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_USER,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updateUserSuccess(response),
                onFailure: (error) => actions.updateUserFail(error),
            }))
        }
    },
    updateUserRequest: () => ({
        type: AT.UPDATE_USER_REQUEST,
    }),
    updateUserSuccess: (response) => ({
        type: AT.UPDATE_USER_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updateUserFail: (error) => ({
        type: AT.UPDATE_USER_FAIL,
        error: true,
        payload: error,
    }),
    // delete array of users
    // - array of user IDs
    deleteUser: (ids) => (dispatch) => {
        if (Array.isArray(ids) && (ids.length > 0)) {
            dispatch(actions.deleteUserRequest())
            dispatch(apiAction({
                url: URL.API_DELETE_USER,
                method: HTTP.POST,
                data: ids,
                onSuccess: (response) => actions.deleteUserSuccess(response),
                onFailure: (error) => actions.deleteUserFail(error),
            }))
        }
    },
    deleteUserRequest: () => ({
        type: AT.DELETE_USER_REQUEST,
    }),
    deleteUserSuccess: (response) => ({
        type: AT.DELETE_USER_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deleteUserFail: (error) => ({
        type: AT.DELETE_USER_FAIL,
        error: true,
        payload: error,
    }),
    // fetch current user location's info
    fetchLocation: ({locationIds, scopeId}) => (dispatch) => {
        // get location info
        dispatch(actions.updateLocationRequest())
        dispatch(apiAction({
            url: URL.API_LOCATION_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchLocationSuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updateLocationFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest current user location's info
    latestLocation: ({locationIds, scopeId}) => (dispatch) => {
        // get location info
        dispatch(apiAction({
            url: URL.API_LOCATION_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchLocationSuccess(response))
            },
        }))
    },
    fetchLocationSuccess: (response) => ({
        type: AT.FETCH_LOCATION_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update location objects
    // - array of location object
    updateLocation: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updateLocationRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_LOCATION,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updateLocationSuccess(response),
                onFailure: (error) => actions.updateLocationFail(error),
            }))
        }
    },
    updateLocationRequest: () => ({
        type: AT.UPDATE_LOCATION_REQUEST,
    }),
    updateLocationSuccess: (response) => ({
        type: AT.UPDATE_LOCATION_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updateLocationFail: (error) => ({
        type: AT.UPDATE_LOCATION_FAIL,
        error: true,
        payload: error,
    }),
    // delete location objects
    // - array of location object
    deleteLocation: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.deleteLocationRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_LOCATION,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.deleteLocationSuccess(response),
                onFailure: (error) => actions.deleteLocationFail(error),
            }))
        }
    },
    deleteLocationRequest: () => ({
        type: AT.DELETE_LOCATION_REQUEST,
    }),
    deleteLocationSuccess: (response) => ({
        type: AT.DELETE_LOCATION_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deleteLocationFail: (error) => ({
        type: AT.DELETE_LOCATION_FAIL,
        error: true,
        payload: error,
    }),
    // fetch current user scope's info
    fetchScope: ({locationIds, scopeId}) => (dispatch) => {
        // get scope info
        dispatch(actions.updateScopeRequest())
        dispatch(apiAction({
            url: URL.API_SCOPE_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchScopeSuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updateScopeFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest current user scope's info
    latestScope: ({locationIds, scopeId}) => (dispatch) => {
        // get scope info
        dispatch(apiAction({
            url: URL.API_SCOPE_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchScopeSuccess(response))
            },
        }))
    },
    fetchScopeSuccess: (response) => ({
        type: AT.FETCH_SCOPE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update scope objects
    // - array of scope object
    updateScope: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updateScopeRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_SCOPE,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updateScopeSuccess(response),
                onFailure: (error) => actions.updateScopeFail(error),
            }))
        }
    },
    updateScopeRequest: () => ({
        type: AT.UPDATE_SCOPE_REQUEST,
    }),
    updateScopeSuccess: (response) => ({
        type: AT.UPDATE_SCOPE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updateScopeFail: (error) => ({
        type: AT.UPDATE_SCOPE_FAIL,
        error: true,
        payload: error,
    }),
    // delete scope objects
    // - array of scope object
    deleteScope: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.deleteScopeRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_SCOPE,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.deleteScopeSuccess(response),
                onFailure: (error) => actions.deleteScopeFail(error),
            }))
        }
    },
    deleteScopeRequest: () => ({
        type: AT.DELETE_SCOPE_REQUEST,
    }),
    deleteScopeSuccess: (response) => ({
        type: AT.DELETE_SCOPE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deleteScopeFail: (error) => ({
        type: AT.DELETE_SCOPE_FAIL,
        error: true,
        payload: error,
    }),
    // create array of privilege profiles
    // - array of privilege profile object
    createPrivilegeProfile: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.createPrivilegeProfileRequest())
            dispatch(apiAction({
                url: URL.API_CREATE_PRIVILEGE_PROFILE,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.createPrivilegeProfileSuccess(response),
                onFailure: (error) => actions.createPrivilegeProfileFail(error),
            }))
        }
    },
    createPrivilegeProfileRequest: () => ({
        type: AT.CREATE_PRIVILEGE_PROFILE_REQUEST,
    }),
    createPrivilegeProfileSuccess: (response) => ({
        type: AT.CREATE_PRIVILEGE_PROFILE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    createPrivilegeProfileFail: (error) => ({
        type: AT.CREATE_PRIVILEGE_PROFILE_FAIL,
        error: true,
        payload: error,
    }),
    // fetch current user privilege profile's info
    fetchPrivilegeProfile: ({locationIds, scopeId}) => (dispatch) => {
        // get privilege profile info
        dispatch(actions.updatePrivilegeProfileRequest())
        dispatch(apiAction({
            url: URL.API_PRIVILEGE_PROFILE_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchPrivilegeProfileSuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updatePrivilegeProfileFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest users privilege profile's info
    latestPrivilegeProfile: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(apiAction({
            url: URL.API_PRIVILEGE_PROFILE_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchPrivilegeProfileSuccess(response))
            },
        }))
    },
    fetchPrivilegeProfileSuccess: (response) => ({
        type: AT.FETCH_PRIVILEGE_PROFILE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update array of privilege profiles
    // - array of privilege profile object
    updatePrivilegeProfile: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updatePrivilegeProfileRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_PRIVILEGE_PROFILE,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updatePrivilegeProfileSuccess(response),
                onFailure: (error) => actions.updatePrivilegeProfileFail(error),
            }))
        }
    },
    updatePrivilegeProfileRequest: () => ({
        type: AT.UPDATE_PRIVILEGE_PROFILE_REQUEST,
    }),
    updatePrivilegeProfileSuccess: (response) => ({
        type: AT.UPDATE_PRIVILEGE_PROFILE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updatePrivilegeProfileFail: (error) => ({
        type: AT.UPDATE_PRIVILEGE_PROFILE_FAIL,
        error: true,
        payload: error,
    }),
    // delete array of privilege profiles
    // - array of privilege profile IDs
    deletePrivilegeProfile: (ids) => (dispatch) => {
        if (Array.isArray(ids) && (ids.length > 0)) {
            dispatch(actions.deletePrivilegeProfileRequest())
            dispatch(apiAction({
                url: URL.API_DELETE_PRIVILEGE_PROFILE,
                method: HTTP.POST,
                data: ids,
                onSuccess: (response) => actions.deletePrivilegeProfileSuccess(response),
                onFailure: (error) => actions.deletePrivilegeProfileFail(error),
            }))
        }
    },
    deletePrivilegeProfileRequest: () => ({
        type: AT.DELETE_PRIVILEGE_PROFILE_REQUEST,
    }),
    deletePrivilegeProfileSuccess: (response) => ({
        type: AT.DELETE_PRIVILEGE_PROFILE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deletePrivilegeProfileFail: (error) => ({
        type: AT.DELETE_PRIVILEGE_PROFILE_FAIL,
        error: true,
        payload: error,
    }),

    // myself info actions

    fetchMyselfInfoSuccess: (response) => ({
        type: AT.FETCH_MYSELF_SUCCESS,
        error: false,
        payload: response.data,
    }),
    fetchMyselfInfoFail: (error) => ({
        type: AT.FETCH_MYSELF_FAIL,
        error: true,
        payload: error,
    }),

    // lock management actions

    // access profile actions

    // create array of access profiles
    // - array of access profile object
    createAccessProfile: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.createAccessProfileRequest())
            dispatch(apiAction({
                url: URL.API_CREATE_ACCESS_PROFILE,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.createAccessProfileSuccess(response),
                onFailure: (error) => actions.createAccessProfileFail(error),
            }))
        }
    },
    createAccessProfileRequest: () => ({
        type: AT.CREATE_ACCESS_PROFILE_REQUEST,
    }),
    createAccessProfileSuccess: (response) => ({
        type: AT.CREATE_ACCESS_PROFILE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    createAccessProfileFail: (error) => ({
        type: AT.CREATE_ACCESS_PROFILE_FAIL,
        error: true,
        payload: error,
    }),
    // fetch access profile info
    fetchAccessProfile: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(actions.updateAccessProfileRequest())
        dispatch(apiAction({
            url: URL.API_ACCESS_PROFILE_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchAccessProfileSuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updateAccessProfileFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest access profile info
    latestAccessProfile: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(apiAction({
            url: URL.API_ACCESS_PROFILE_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchAccessProfileSuccess(response))
            },
        }))
    },
    fetchAccessProfileSuccess: (response) => ({
        type: AT.FETCH_ACCESS_PROFILE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update array of access profiles
    // - array of access profile object
    updateAccessProfile: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updateAccessProfileRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_ACCESS_PROFILE,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updateAccessProfileSuccess(response),
                onFailure: (error) => actions.updateAccessProfileFail(error),
            }))
        }
    },
    updateAccessProfileRequest: () => ({
        type: AT.UPDATE_ACCESS_PROFILE_REQUEST,
    }),
    updateAccessProfileSuccess: (response) => ({
        type: AT.UPDATE_ACCESS_PROFILE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updateAccessProfileFail: (error) => ({
        type: AT.UPDATE_ACCESS_PROFILE_FAIL,
        error: true,
        payload: error,
    }),
    // delete array of access profiles
    // - array of access profile IDs
    deleteAccessProfile: (ids) => (dispatch) => {
        if (Array.isArray(ids) && (ids.length > 0)) {
            dispatch(actions.deleteAccessProfileRequest())
            dispatch(apiAction({
                url: URL.API_DELETE_ACCESS_PROFILE,
                method: HTTP.POST,
                data: ids,
                onSuccess: (response) => actions.deleteAccessProfileSuccess(response),
                onFailure: (error) => actions.deleteAccessProfileFail(error),
            }))
        }
    },
    deleteAccessProfileRequest: () => ({
        type: AT.DELETE_ACCESS_PROFILE_REQUEST,
    }),
    deleteAccessProfileSuccess: (response) => ({
        type: AT.DELETE_ACCESS_PROFILE_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deleteAccessProfileFail: (error) => ({
        type: AT.DELETE_ACCESS_PROFILE_FAIL,
        error: true,
        payload: error,
    }),

    // key actions

    // register array of keys
    // - array of key object
    registerKey: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.registerKeyRequest())
            dispatch(apiAction({
                url: URL.API_REGISTER_KEY,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.registerKeySuccess(response),
                onFailure: (error) => actions.registerKeyFail(error),
            }))
        }
    },
    registerKeyRequest: () => ({
        type: AT.REGISTER_KEY_REQUEST,
    }),
    registerKeySuccess: (response) => ({
        type: AT.REGISTER_KEY_SUCCESS,
        error: false,
        payload: response.data,
    }),
    registerKeyFail: (error) => ({
        type: AT.REGISTER_KEY_FAIL,
        error: true,
        payload: error,
    }),
    // fetch key info
    fetchKey: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(actions.updateKeyRequest())
        dispatch(apiAction({
            url: URL.API_KEY_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchKeySuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updateKeyFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest key info
    latestKey: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(apiAction({
            url: URL.API_KEY_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchKeySuccess(response))
            },
        }))
    },
    fetchKeySuccess: (response) => ({
        type: AT.FETCH_KEY_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update array of keys
    // - array of key object
    updateKey: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updateKeyRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_KEY,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updateKeySuccess(response),
                onFailure: (error) => actions.updateKeyFail(error),
            }))
        }
    },
    updateKeyRequest: () => ({
        type: AT.UPDATE_KEY_REQUEST,
    }),
    updateKeySuccess: (response) => ({
        type: AT.UPDATE_KEY_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updateKeyFail: (error) => ({
        type: AT.UPDATE_KEY_FAIL,
        error: true,
        payload: error,
    }),
    // deregister array of keys
    // - array of key serial numbers
    deregisterKey: (serialNumbers) => (dispatch) => {
        if (Array.isArray(serialNumbers) && (serialNumbers)) {
            dispatch(actions.deregisterKeyRequest())
            dispatch(apiAction({
                url: URL.API_DEREGISTER_KEY,
                method: HTTP.POST,
                data: serialNumbers,
                onSuccess: (response) => actions.deregisterKeySuccess(response),
                onFailure: (error) => actions.deregisterKeyFail(error),
            }))
        }
    },
    deregisterKeyRequest: () => ({
        type: AT.DEREGISTER_KEY_REQUEST,
    }),
    deregisterKeySuccess: (response) => ({
        type: AT.DEREGISTER_KEY_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deregisterKeyFail: (error) => ({
        type: AT.DEREGISTER_KEY_FAIL,
        error: true,
        payload: error,
    }),
    // program array of keys
    // - array of key serial numbers
    programKey: (programOperation) => (dispatch) => {
        dispatch(actions.programKeyRequest())
        dispatch(apiAction({
            url: URL.API_PROGRAM_KEY,
            method: HTTP.POST,
            data: programOperation,
            onSuccess: (response) => actions.programKeySuccess(response),
            onFailure: (error) => actions.programKeyFail(error),
        }))
    },
    programKeyRequest: () => ({
        type: AT.PROGRAM_KEY_REQUEST,
    }),
    programKeySuccess: (response) => ({
        type: AT.PROGRAM_KEY_SUCCESS,
        error: false,
        payload: response.data,
    }),
    programKeyFail: (error) => ({
        type: AT.PROGRAM_KEY_FAIL,
        error: true,
        payload: error,
    }),

    // key manager actions

    // register array of key managers
    // - array of key manager object
    registerKeyManager: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.registerKeyManagerRequest())
            dispatch(apiAction({
                url: URL.API_REGISTER_KEY_MANAGER,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.registerKeyManagerSuccess(response),
                onFailure: (error) => actions.registerKeyManagerFail(error),
            }))
        }
    },
    registerKeyManagerRequest: () => ({
        type: AT.REGISTER_KEY_MANAGER_REQUEST,
    }),
    registerKeyManagerSuccess: (response) => ({
        type: AT.REGISTER_KEY_MANAGER_SUCCESS,
        error: false,
        payload: response.data,
    }),
    registerKeyManagerFail: (error) => ({
        type: AT.REGISTER_KEY_MANAGER_FAIL,
        error: true,
        payload: error,
    }),
    // fetch key manager info
    fetchKeyManager: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(actions.updateKeyManagerRequest())
        dispatch(apiAction({
            url: URL.API_KEY_MANAGER_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchKeyManagerSuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updateKeyManagerFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest key manager info
    latestKeyManager: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(apiAction({
            url: URL.API_KEY_MANAGER_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchKeyManagerSuccess(response))
            },
        }))
    },
    fetchKeyManagerSuccess: (response) => ({
        type: AT.FETCH_KEY_MANAGER_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update array of key managers
    // - array of key manager object
    updateKeyManager: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updateKeyManagerRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_KEY_MANAGER,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updateKeyManagerSuccess(response),
                onFailure: (error) => actions.updateKeyManagerFail(error),
            }))
        }
    },
    updateKeyManagerRequest: () => ({
        type: AT.UPDATE_KEY_MANAGER_REQUEST,
    }),
    updateKeyManagerSuccess: (response) => ({
        type: AT.UPDATE_KEY_MANAGER_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updateKeyManagerFail: (error) => ({
        type: AT.UPDATE_KEY_MANAGER_FAIL,
        error: true,
        payload: error,
    }),
    // deregister array of key managers
    // - array of key manager serial numbers
    deregisterKeyManager: (serialNumbers) => (dispatch) => {
        if (Array.isArray(serialNumbers) && (serialNumbers)) {
            dispatch(actions.deregisterKeyManagerRequest())
            dispatch(apiAction({
                url: URL.API_DEREGISTER_KEY_MANAGER,
                method: HTTP.POST,
                data: serialNumbers,
                onSuccess: (response) => actions.deregisterKeyManagerSuccess(response),
                onFailure: (error) => actions.deregisterKeyManagerFail(error),
            }))
        }
    },
    deregisterKeyManagerRequest: () => ({
        type: AT.DEREGISTER_KEY_MANAGER_REQUEST,
    }),
    deregisterKeyManagerSuccess: (response) => ({
        type: AT.DEREGISTER_KEY_MANAGER_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deregisterKeyManagerFail: (error) => ({
        type: AT.DEREGISTER_KEY_MANAGER_FAIL,
        error: true,
        payload: error,
    }),

    // lock actions

    // register array of locks
    // - array of lock object
    registerLock: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.registerLockRequest())
            dispatch(apiAction({
                url: URL.API_REGISTER_LOCK,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.registerLockSuccess(response),
                onFailure: (error) => actions.registerLockFail(error),
            }))
        }
    },
    registerLockRequest: () => ({
        type: AT.REGISTER_LOCK_REQUEST,
    }),
    registerLockSuccess: (response) => ({
        type: AT.REGISTER_LOCK_SUCCESS,
        error: false,
        payload: response.data,
    }),
    registerLockFail: (error) => ({
        type: AT.REGISTER_LOCK_FAIL,
        error: true,
        payload: error,
    }),
    // fetch lock info
    fetchLock: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(actions.updateLockRequest())
        dispatch(apiAction({
            url: URL.API_LOCK_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchLockSuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updateLockFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest lock info
    latestLock: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(apiAction({
            url: URL.API_LOCK_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchLockSuccess(response))
            },
        }))
    },
    fetchLockSuccess: (response) => ({
        type: AT.FETCH_LOCK_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update array of locks
    // - array of lock object
    updateLock: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updateLockRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_LOCK,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updateLockSuccess(response),
                onFailure: (error) => actions.updateLockFail(error),
            }))
        }
    },
    updateLockRequest: () => ({
        type: AT.UPDATE_LOCK_REQUEST,
    }),
    updateLockSuccess: (response) => ({
        type: AT.UPDATE_LOCK_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updateLockFail: (error) => ({
        type: AT.UPDATE_LOCK_FAIL,
        error: true,
        payload: error,
    }),
    // deregister array of locks
    // - array of lock serial numbers
    deregisterLock: (serialNumbers) => (dispatch) => {
        if (Array.isArray(serialNumbers) && (serialNumbers)) {
            dispatch(actions.deregisterLockRequest())
            dispatch(apiAction({
                url: URL.API_DEREGISTER_LOCK,
                method: HTTP.POST,
                data: serialNumbers,
                onSuccess: (response) => actions.deregisterLockSuccess(response),
                onFailure: (error) => actions.deregisterLockFail(error),
            }))
        }
    },
    deregisterLockRequest: () => ({
        type: AT.DEREGISTER_LOCK_REQUEST,
    }),
    deregisterLockSuccess: (response) => ({
        type: AT.DEREGISTER_LOCK_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deregisterLockFail: (error) => ({
        type: AT.DEREGISTER_LOCK_FAIL,
        error: true,
        payload: error,
    }),

    // authen token actions

    // register array of authen tokens
    // - array of authen token object
    registerAuthenToken: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.registerAuthenTokenRequest())
            dispatch(apiAction({
                url: URL.API_REGISTER_AUTHEN_TOKEN,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.registerAuthenTokenSuccess(response),
                onFailure: (error) => actions.registerAuthenTokenFail(error),
            }))
        }
    },
    registerAuthenTokenRequest: () => ({
        type: AT.REGISTER_AUTHEN_TOKEN_REQUEST,
    }),
    registerAuthenTokenSuccess: (response) => ({
        type: AT.REGISTER_AUTHEN_TOKEN_SUCCESS,
        error: false,
        payload: response.data,
    }),
    registerAuthenTokenFail: (error) => ({
        type: AT.REGISTER_AUTHEN_TOKEN_FAIL,
        error: true,
        payload: error,
    }),
    // fetch authen token info
    fetchAuthenToken: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(actions.updateAuthenTokenRequest())
        dispatch(apiAction({
            url: URL.API_AUTHEN_TOKEN_INFO,
            data: { locationIds, scopeId },
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchAuthenTokenSuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.updateAuthenTokenFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    // latest authen token info
    latestAuthenToken: ({locationIds, scopeId}) => (dispatch) => {
        dispatch(apiAction({
            url: URL.API_AUTHEN_TOKEN_INFO,
            data: { locationIds, scopeId },
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchAuthenTokenSuccess(response))
            },
        }))
    },
    fetchAuthenTokenSuccess: (response) => ({
        type: AT.FETCH_AUTHEN_TOKEN_SUCCESS,
        error: false,
        payload: response.data,
    }),
    // update array of authen tokens
    // - array of authen token object
    updateAuthenToken: (objects) => (dispatch) => {
        if (Array.isArray(objects) && (objects.length > 0)) {
            dispatch(actions.updateAuthenTokenRequest())
            dispatch(apiAction({
                url: URL.API_UPDATE_AUTHEN_TOKEN,
                method: HTTP.POST,
                data: objects,
                onSuccess: (response) => actions.updateAuthenTokenSuccess(response),
                onFailure: (error) => actions.updateAuthenTokenFail(error),
            }))
        }
    },
    updateAuthenTokenRequest: () => ({
        type: AT.UPDATE_AUTHEN_TOKEN_REQUEST,
    }),
    updateAuthenTokenSuccess: (response) => ({
        type: AT.UPDATE_AUTHEN_TOKEN_SUCCESS,
        error: false,
        payload: response.data,
    }),
    updateAuthenTokenFail: (error) => ({
        type: AT.UPDATE_AUTHEN_TOKEN_FAIL,
        error: true,
        payload: error,
    }),
    // deregister array of authen tokens
    // - array of authen token serial numbers
    deregisterAuthenToken: (serialNumbers) => (dispatch) => {
        if (Array.isArray(serialNumbers) && (serialNumbers)) {
            dispatch(actions.deregisterAuthenTokenRequest())
            dispatch(apiAction({
                url: URL.API_DEREGISTER_AUTHEN_TOKEN,
                method: HTTP.POST,
                data: serialNumbers,
                onSuccess: (response) => actions.deregisterAuthenTokenSuccess(response),
                onFailure: (error) => actions.deregisterAuthenTokenFail(error),
            }))
        }
    },
    deregisterAuthenTokenRequest: () => ({
        type: AT.DEREGISTER_AUTHEN_TOKEN_REQUEST,
    }),
    deregisterAuthenTokenSuccess: (response) => ({
        type: AT.DEREGISTER_AUTHEN_TOKEN_SUCCESS,
        error: false,
        payload: response.data,
    }),
    deregisterAuthenTokenFail: (error) => ({
        type: AT.DEREGISTER_AUTHEN_TOKEN_FAIL,
        error: true,
        payload: error,
    }),

    // middleware actions

    // api middleware
    apiStart: (label) => ({
        type: AT.API_START,
        payload: label,
    }),
    apiEnd: (label) => ({
        type: AT.API_END,
        payload: label,
    }),
    apiError: (url, error) => ({
        type: AT.API_ERROR,
        payload: {
            url,
            error,
        },
    }),
    apiBatchErrors: (error) => ({
        type: AT.API_BATCH_ERROR,
        payload: error,
    }),
    clearBatchErrors: () => ({
        type: AT.API_BATCH_ERROR,
        payload: [],
    }),

    // update latest middleware and actions

    // start or pause polling for server changes (or version numbers) in the background
    // - param: object of privileges, locationIds, scopeId
    pollServerChangesStart: (param) => ({
        type: AT.POLL_VERSION_START,
        payload: param,
    }),
    // version status background update stop immediately
    pollServerChangesAbort: () => ({
        type: AT.POLL_VERSION_ABORT,
    }),
    // get version (or change) status, if the version number is different from before, update the corresponding info
    getVersion: () => apiAction({
        url: URL.API_VERSION,
        skipApiError: true,
        onSuccess: (response) => actions.getVersionSuccess(response),
        onFailure: (error) => actions.getVersionFail(error),
    }),
    getVersionSuccess: (response) => ({
        type: AT.GET_VERSION_SUCCESS,
        error: false,
        payload: response.data,
    }),
    getVersionFail: (error) => ({
        type: AT.GET_VERSION_FAIL,
        error: true,
        payload: error,
    }),

    // update activity middleware and actions

    // start or pause polling for polling activity in the background
    // - duration: history duration in seconds
    pollActivityStart: (duration) => (dispatch) => {
        const to = Math.floor((new Date()).getTime() / 1000)
        const from = to - duration
        dispatch({
            type: AT.POLL_ACTIVITY_START,
            payload: {from, to},
        })
    },
    // activity background update stop immediately
    pollActivityAbort: () => ({
        type: AT.POLL_ACTIVITY_ABORT,
    }),
    // activity background update progress in percentage
    pollActivityProgress: (percentage) => ({
        type: AT.POLL_ACTIVITY_PROGRESS,
        payload: percentage,
    }),
    // fetch activity
    // - from: from period in unix time
    // - to: to period in unix time
    // - descending: server response activity in "from-to" or "to-from" fashion up to it's max number of rows
    fetchActivity: (param) => (dispatch) => {
        dispatch(actions.getActivityRequest())
        dispatch(apiAction({
            url: URL.API_ACTIVITY,
            data: param,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.fetchActivitySuccess(response))
                dispatch(actions.checkAllInfoLoaded())
            },
            onFailure: (error) => (dispatch) => {
                dispatch(actions.getActivityFail(error))
                dispatch(actions.loaderClearMessage())
            },
        }))
    },
    getActivity: (param) => (dispatch) => {
        dispatch(apiAction({
            url: URL.API_ACTIVITY,
            data: param,
            skipApiError: true,
            onSuccess: (response) => (dispatch) => {
                dispatch(actions.getActivitySuccess(response))
            },
        }))
    },
    fetchActivitySuccess: (response) => ({
        type: AT.FETCH_ACTIVITY_SUCCESS,
        error: false,
        payload: response.data,
    }),
    getActivityRequest: () => ({
        type: AT.GET_ACTIVITY_REQUEST,
    }),
    getActivitySuccess: (response) => ({
        type: AT.GET_ACTIVITY_SUCCESS,
        error: false,
        payload: response.data,
    }),
    getActivityFail: (error) => ({
        type: AT.GET_ACTIVITY_FAIL,
        error: true,
        payload: error,
    }),
}

export default actions

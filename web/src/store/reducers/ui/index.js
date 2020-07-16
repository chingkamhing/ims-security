import { AT } from '../../../constants'

// ----------------------------------------------------------------------------
// Reducer

const initState = {
    // general UI states

    // spinner loader overlay
    loaderMessage: '',
    // errorMessage is used to popup Modal message to show error message. Just write the error message to this errorMessage and it will be shown in the Modal screen. Use actions.clearErrorMessage() to clear the Modal message.
    errorMessage: '',
    // batchErrors is the error response from server that report batch request's individual error message (i.e. array of BatchError)
    batchErrors: [],

    // application specific states that will be re-initialized after log out
    app: {
        // Activity page's UI settings
    
        // Activity page's current tab selection
        activityTab: 0,
        // activity update period
        activityPeriod: {
            from: 0,
            to: 0,
        },
        // activity download progress
        activityProgress: 0,
        
        // AccessProfile page's UI settings
        
        // AccessProfile page's current row selection
        accessProfileRow: undefined,
        // AccessProfile page's current tab selection
        accessProfileTab: 0,
        
        // Hardware page's UI settings
        
        // Hardware page's current tab selection
        hardwareTab: 0,
        // Hardware page's Lock tab's current row selection
        hardwareLockRow: undefined,
        // Hardware page's Lock selected locks
        hardwareSelectedLocks: [],
        // Hardware page's Key tab's current row selection
        hardwareKeyRow: undefined,
        // Hardware page's Key tab's current tab selection
        hardwareKeyTab: 0,
        // Hardware page's Key Manager tab's current row selection
        hardwareKeyManagerRow: undefined,
        // Hardware page's Key Manager tab's current tab selection
        hardwareKeyManagerTab: 0,
        // Hardware page's Authen Token tab's current row selection
        hardwareAuthenTokenRow: undefined,
        
        // User page's UI settings
        
        // User page's current tab selection
        userTab: 0,
        // User page's User tab's current row selection
        userUserRow: undefined,
        // User page's Location tab's location expanded node ids
        userLocationExpanded: [],
        // User page's Location tab's location selected node id
        userLocationSelected: '',
        // User page's Scope tab's scope expanded node ids
        userScopeExpanded: [],
        // User page's Scope tab's scope selected node id
        userScopeSelected: '',
        // User page's PrivilegeProfile tab's current row selection
        userPrivilegeProfileRow: undefined,
    
        // System page's UI settings
    
        // System page's current tab selection
        systemTab: 0,
    
        // Setting page's UI settings
    
        // Setting page's current tab selection
        settingTab: 0,
    }
}

const ui = (state = initState, action={ type: null }) => {
    const { type } = action
    switch(type) {
        case AT.LOADER_MESSAGE:
            return {
                ...state,
                loaderMessage: action.payload.message,
            }
        case AT.API_ERROR:
            return {
                ...state,
                errorMessage: `Encounter error at endpoint "${action.payload.url}": ${action.payload.error}`,
            }
        case AT.ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload.message,
            }
        case AT.API_BATCH_ERROR:
            return {
                ...state,
                batchErrors: action.payload,
            }
        case AT.LOGIN_FAIL:
            return {
                ...state,
                errorMessage: `Log in ${action.error}`,
            }
        case AT.LOGOUT_SUCCESS:
            return {
                ...state,
                app: initState.app,
            }
        case AT.LOGOUT_FAIL:
            return {
                ...state,
                app: initState.app,
                errorMessage: `Log out ${action.error}`,
            }
        case AT.ACTIVITY_TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    activityTab: action.payload.eventKey,
                }
            }
        case AT.POLL_ACTIVITY_START:
            return {
                ...state,
                app: {
                    ...state.app,
                    activityPeriod: action.payload,
                }
            }
        case AT.POLL_ACTIVITY_PROGRESS:
            return {
                ...state,
                app: {
                    ...state.app,
                    activityProgress: action.payload,
                }
            }
        case AT.ACCESS_PROFILE_ROW_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    accessProfileRow: action.payload.selectedRow,
                }
            }
        case AT.ACCESS_PROFILE_TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    accessProfileTab: action.payload.eventKey,
                }
            }
        case AT.HARDWARE_TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    hardwareTab: action.payload.eventKey,
                }
            }
        case AT.HARDWARE_LOCK_ROW_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    hardwareLockRow: action.payload.selectedRow,
                }
            }
        case AT.HARDWARE_LOCKS_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    hardwareSelectedLocks: action.payload.selectedLocks,
                }
            }
        case AT.HARDWARE_KEY_ROW_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    hardwareKeyRow: action.payload.selectedRow,
                }
            }
        case AT.HARDWARE_KEY_TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    hardwareKeyTab: action.payload.eventKey,
                }
            }
        case AT.HARDWARE_KEY_MANAGER_ROW_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    hardwareKeyManagerRow: action.payload.selectedRow,
                }
            }
        case AT.HARDWARE_KEY_MANAGER_TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    hardwareKeyManagerTab: action.payload.eventKey,
                }
            }
        case AT.HARDWARE_AUTHEN_TOKEN_ROW_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    hardwareAuthenTokenRow: action.payload.selectedRow,
                }
            }
        case AT.USER_TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    userTab: action.payload.eventKey,
                }
            }
        case AT.USER_USER_ROW_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    userUserRow: action.payload.selectedRow,
                }
            }
        case AT.USER_LOCATION_EXPANDED:
            return {
                ...state,
                app: {
                    ...state.app,
                    userLocationExpanded: action.payload.nodeIds,
                }
            }
        case AT.USER_LOCATION_SELECTED:
            return {
                ...state,
                app: {
                    ...state.app,
                    userLocationSelected: action.payload.nodeId,
                }
            }
        case AT.USER_SCOPE_EXPANDED:
            return {
                ...state,
                app: {
                    ...state.app,
                    userScopeExpanded: action.payload.nodeIds,
                }
            }
        case AT.USER_SCOPE_SELECTED:
            return {
                ...state,
                app: {
                    ...state.app,
                    userScopeSelected: action.payload.nodeId,
                }
            }
        case AT.USER_PRIVILEGE_PROFILE_ROW_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    userPrivilegeProfileRow: action.payload.selectedRow,
                }
            }
        case AT.SYSTEM_TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    systemTab: action.payload.eventKey,
                }
            }
        case AT.SETTING_TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    settingTab: action.payload.eventKey,
                }
            }
        default:
            break
    }
    return state
}

// ----------------------------------------------------------------------------
// Private selectors

// general UI states

export const selectLoaderMessage = (state) => state.loaderMessage

export const selectErrorMessage = (state) => state.errorMessage

export const selectBatchErrors = (state) => state.batchErrors

// Activity page's UI settings

export const selectActivityTab = (state) => state.app.activityTab

export const selectActivityPeriod = (state) => state.app.activityPeriod

export const selectActivityDuration = (state) => state.app.activityPeriod.to - state.app.activityPeriod.from

export const selectActivityProgress = (state) => state.app.activityProgress

// AccessProfile page's UI settings

export const selectAccessProfileSelectedRow = (state) => state.app.accessProfileRow

export const selectAccessProfileTab = (state) => state.app.accessProfileTab

// Hardware page's UI settings

export const selectHardwareTab = (state) => state.app.hardwareTab

export const selectHardwareLockSelectedRow = (state) => state.app.hardwareLockRow

export const selectHardwareLockSelectedLocks = (state) => state.app.hardwareSelectedLocks

export const selectHardwareKeySelectedRow = (state) => state.app.hardwareKeyRow

export const selectHardwareKeyTab = (state) => state.app.hardwareKeyTab

export const selectHardwareKeyManagerSelectedRow = (state) => state.app.hardwareKeyManagerRow

export const selectHardwareKeyManagerTab = (state) => state.app.hardwareKeyManagerTab

export const selectHardwareAuthenTokenSelectedRow = (state) => state.app.hardwareAuthenTokenRow

// User page's UI settings

export const selectUserTab = (state) => state.app.userTab

export const selectUserUserSelectedRow = (state) => state.app.userUserRow

export const selectUserLocationExpanded = (state) => state.app.userLocationExpanded

export const selectUserLocationSelected = (state) => state.app.userLocationSelected

export const selectUserScopeExpanded = (state) => state.app.userScopeExpanded

export const selectUserScopeSelected = (state) => state.app.userScopeSelected

export const selectUserPrivilegeProfileSelectedRow = (state) => state.app.userPrivilegeProfileRow

// System page's UI settings

export const selectSystemTab = (state) => state.app.systemTab

// Setting page's UI settings

export const selectSettingTab = (state) => state.app.settingTab

export default ui

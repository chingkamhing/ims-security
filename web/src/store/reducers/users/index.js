import { AT } from '../../../constants'

// ----------------------------------------------------------------------------
// Reducer

const initState = {
    user: {},
    location: [],
    scope: [],
    privilege: {},
    isUserLoaded: false,                // whether user info is loaded
    isUpdatingUser: false,              // whether it is creating/updating user
    isDeletingUser: false,              // whether it is deleting user
    isResettingPassword: false,         // whether it is resetting user password
    isLocationLoaded: false,            // whether location info is loaded
    isUpdatingLocation: false,          // whether it is updating location
    isDeletingLocation: false,          // whether it is deleting location
    isScopeLoaded: false,               // whether scope info is loaded
    isUpdatingScope: false,             // whether it is updating scope
    isDeletingScope: false,             // whether it is deleting scope
    isPrivilegeProfileLoaded: false,    // whether privilege profile info is loaded
    isUpdatingPrivilegeProfile: false,  // whether it is creating/updating privilege profile
    isDeletingPrivilegeProfile: false,  // whether it is deleting privilege profile
}

const users = (state = initState, action={ type: null }) => {
    const { type } = action
    switch(type) {
        case AT.CREATE_USER_REQUEST:
            return {
                ...state,
                isUpdatingUser: true,
            }
        case AT.CREATE_USER_SUCCESS:
            return {
                ...state,
                isUpdatingUser: false,
                user: updateUser(action.payload, state.user),
            }
        case AT.CREATE_USER_FAIL:
            return {
                ...state,
                isUpdatingUser: false,
            }
        case AT.FETCH_USER_SUCCESS:
            return {
                ...state,
                isUserLoaded: true,
                isUpdatingUser: false,
                user: action.payload,
            }
        case AT.UPDATE_USER_REQUEST:
            return {
                ...state,
                isUpdatingUser: true,
            }
        case AT.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isUpdatingUser: false,
                user: updateUser(action.payload, state.user),
            }
        case AT.UPDATE_USER_FAIL:
            return {
                ...state,
                isUpdatingUser: false,
            }
        case AT.DELETE_USER_REQUEST:
            return {
                ...state,
                isDeletingUser: true,
            }
        case AT.DELETE_USER_SUCCESS:
            return {
                ...state,
                isDeletingUser: false,
                user: deleteUser(action.payload, state.user),
            }
        case AT.DELETE_USER_FAIL:
            return {
                ...state,
                isDeletingUser: false,
            }
        case AT.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isResettingPassword: true,
            }
        case AT.RESET_PASSWORD_SUCCESS:
        case AT.RESET_PASSWORD_FAIL:
            return {
                ...state,
                isResettingPassword: false,
            }
        case AT.FETCH_LOCATION_SUCCESS:
            return {
                ...state,
                isLocationLoaded: true,
                isUpdatingLocation: false,
                location: action.payload,
            }
        case AT.UPDATE_LOCATION_REQUEST:
            return {
                ...state,
                isUpdatingLocation: true,
            }
        case AT.UPDATE_LOCATION_SUCCESS:
            return {
                ...state,
                isUpdatingLocation: false,
                location: action.payload,
            }
        case AT.UPDATE_LOCATION_FAIL:
            return {
                ...state,
                isUpdatingLocation: false,
            }
        case AT.DELETE_LOCATION_REQUEST:
            return {
                ...state,
                isDeletingLocation: true,
            }
        case AT.DELETE_LOCATION_SUCCESS:
            return {
                ...state,
                isDeletingLocation: false,
                location: action.payload,
            }
        case AT.DELETE_LOCATION_FAIL:
            return {
                ...state,
                isDeletingLocation: false,
            }
        case AT.FETCH_SCOPE_SUCCESS:
            return {
                ...state,
                isScopeLoaded: true,
                isUpdatingScope: false,
                scope: action.payload,
            }
        case AT.UPDATE_SCOPE_REQUEST:
            return {
                ...state,
                isUpdatingScope: true,
            }
        case AT.UPDATE_SCOPE_SUCCESS:
            return {
                ...state,
                isUpdatingScope: false,
                scope: action.payload,
            }
        case AT.UPDATE_SCOPE_FAIL:
            return {
                ...state,
                isUpdatingScope: false,
            }
        case AT.DELETE_SCOPE_REQUEST:
            return {
                ...state,
                isDeletingScope: true,
            }
        case AT.DELETE_SCOPE_SUCCESS:
            return {
                ...state,
                isDeletingScope: false,
                scope: action.payload,
            }
        case AT.DELETE_SCOPE_FAIL:
            return {
                ...state,
                isDeletingScope: false,
            }
        case AT.CREATE_PRIVILEGE_PROFILE_REQUEST:
            return {
                ...state,
                isUpdatingPrivilegeProfile: true,
            }
        case AT.CREATE_PRIVILEGE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdatingPrivilegeProfile: false,
                privilege: updatePrivilegeProfile(action.payload, state.privilege),
            }
        case AT.CREATE_PRIVILEGE_PROFILE_FAIL:
            return {
                ...state,
                isUpdatingPrivilegeProfile: false,
            }
        case AT.FETCH_PRIVILEGE_PROFILE_SUCCESS:
            return {
                ...state,
                isPrivilegeProfileLoaded: true,
                isUpdatingPrivilegeProfile: false,
                privilege: action.payload,
            }
        case AT.UPDATE_PRIVILEGE_PROFILE_REQUEST:
            return {
                ...state,
                isUpdatingPrivilegeProfile: true,
            }
        case AT.UPDATE_PRIVILEGE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdatingPrivilegeProfile: false,
                privilege: updatePrivilegeProfile(action.payload, state.privilege),
            }
        case AT.UPDATE_PRIVILEGE_PROFILE_FAIL:
            return {
                ...state,
                isUpdatingPrivilegeProfile: false,
            }
        case AT.DELETE_PRIVILEGE_PROFILE_REQUEST:
            return {
                ...state,
                isDeletingPrivilegeProfile: true,
            }
        case AT.DELETE_PRIVILEGE_PROFILE_SUCCESS:
            return {
                ...state,
                isDeletingPrivilegeProfile: false,
                privilege: deletePrivilegeProfile(action.payload, state.privilege),
            }
        case AT.DELETE_PRIVILEGE_PROFILE_FAIL:
            return {
                ...state,
                isDeletingPrivilegeProfile: false,
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

// reducer helper function to update keyObject with updated array of key manager
const updateUser = (users, userObject) => {
    return users.reduce((allObject, user) => {
        allObject[user.id] = user
        return allObject
    }, {...userObject})
}

// reducer helper function to delete userObject with array of authen token serial number
const deleteUser = (ids, userObject) => {
    return ids.reduce((allObject, id) => {
        delete allObject[id]
        return allObject
    }, {...userObject})
}

// reducer helper function to update keyObject with updated array of key manager
const updatePrivilegeProfile = (privilegeProfiles, userObject) => {
    return privilegeProfiles.reduce((allObject, privilegeProfile) => {
        allObject[privilegeProfile.id] = privilegeProfile
        return allObject
    }, {...userObject})
}

// reducer helper function to delete privilegeProfileObject with array of authen token serial number
const deletePrivilegeProfile = (ids, privilegeProfileObject) => {
    return ids.reduce((allObject, id) => {
        delete allObject[id]
        return allObject
    }, {...privilegeProfileObject})
}

// ----------------------------------------------------------------------------
// Private selectors

export const selectIsUserLoaded = (state) => state.isUserLoaded

export const selectIsLocationLoaded = (state) => state.isLocationLoaded

export const selectIsScopeLoaded = (state) => state.isScopeLoaded

export const selectIsPrivilegeProfileLoaded = (state) => state.isPrivilegeProfileLoaded

export const selectIsUpdatingUser = (state) => state.isUpdatingUser

export const selectIsDeletingUser = (state) => state.isDeletingUser

export const selectIsResettingPassword = (state) => state.isResettingPassword

export const selectIsUpdatingLocation = (state) => state.isUpdatingLocation

export const selectIsDeletingLocation = (state) => state.isDeletingLocation

export const selectIsUpdatingScope = (state) => state.isUpdatingScope

export const selectIsDeletingScope = (state) => state.isDeletingScope

export const selectIsUpdatingPrivilegeProfile = (state) => state.isUpdatingPrivilegeProfile

export const selectIsDeletingPrivilegeProfile = (state) => state.isDeletingPrivilegeProfile

export const selectUser = (state) => state.user

export const selectLocation = (state) => state.location

export const selectScope = (state) => state.scope

export const selectPrivilegeProfile = (state) => state.privilege

export default users

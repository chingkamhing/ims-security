import { AT, LS } from '../../../constants'

// ----------------------------------------------------------------------------
// Reducer

const initState = {
    // username is used to tell if current user is logged in or not. If logged in, write this "username" with the user's username. If logged out, must clear with ''
    id: 0,
    username: '',
    name: '',
    company: '',
    email: '',
    phoneNumber: '',
    description: '',
    locationIds: [],
    scopeId: '',
    privilegeProfile: {},
    validPeriod: {
        from: 0,
        to: 0,
    },
    loginStatus: LS.LOGGED_OUT,
    isChangingPassword: false,
    isUpdatingMyself: false,
    isUpdatingMyselfDatacenter: false,
    isUpdatingMyselfTenant: false,
    rememberMe: false,
}

const myself = (state = initState, action={ type: null }) => {
    const { type } = action
    switch(type) {
        case AT.LOGIN_REQUEST:
            return {
                ...state,
                loginStatus: LS.LOGGING_IN
            }
        case AT.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loginStatus: LS.LOGGED_IN
            }
        case AT.LOGIN_FAIL:
            return {
                ...state,
                loginStatus: LS.LOGGED_OUT
            }
        case AT.LOGOUT_REQUEST:
            return {
                ...state,
                loginStatus: LS.LOGGING_OUT
            }
        case AT.LOGOUT_SUCCESS:
        case AT.LOGOUT_FAIL:
            return {
                ...initState,
            }
        case AT.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                isChangingPassword: true,
            }
        case AT.CHANGE_PASSWORD_SUCCESS:
        case AT.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isChangingPassword: false,
            }
        case AT.FETCH_MYSELF_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case AT.REMEMBER_ME:
            return {
                ...state,
                rememberMe: action.payload,
            }
        default:
            break
        }
    return state
}

// ----------------------------------------------------------------------------
// Private selectors

export const selectMyselfProfileLoaded = (state) => Boolean(state.id)

export const selectMyselfId = (state) => state.id

export const selectMyselfUsername = (state) => state.username

export const selectMyselfName = (state) => state.name

export const selectMyselfCompany = (state) => state.company

export const selectMyselfEmail = (state) => state.email

export const selectMyselfPhoneNumber = (state) => state.phoneNumber

export const selectMyselfDescription = (state) => state.description

export const selectMyselfLocationIds = (state) => state.locationIds

export const selectMyselfScopeId = (state) => state.scopeId

export const selectMyselfPrivilegeProfile = (state) => state.privilegeProfile

export const selectMyselfPrivileges = (state) => state.privilegeProfile.privileges || []

export const selectMyselfValidPeriod = (state) => state.validPeriod

export const selectMyselfLoginStatus = (state) => state.loginStatus

export const selectRememberMe = (state) => state.rememberMe

export const selectMyselfIsChangingPassword = (state) => state.isChangingPassword

export const selectMyselfIsUpdating = (state) => state.isUpdatingMyself

export const selectMyselfIsUpdatingDatacenter = (state) => state.isUpdatingMyselfDatacenter

export const selectMyselfIsUpdatingTenant = (state) => state.isUpdatingMyselfTenant

export default myself

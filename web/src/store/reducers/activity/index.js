import { AT } from '../../../constants'

// ----------------------------------------------------------------------------
// Reducer

const initState = {
    // username is used to tell if current user is logged in or not. If logged in, write this "username" with the user's username. If logged out, must clear with ''
    activity: {
        lock: {},                       // store all lock activity here
        operation: {},                  // store all operation activity here
        system: {},                     // store all system activity here
        from: 0,                        // store the oldest from unix time
        to: 0,                          // store the latest from unix time
    },
    isActivityLoaded: false,            // whether activity is loaded
    isUpdatingActivity: false,          // whether it is updating activity
    lastActivityUpdateTime: new Date(0),// last activity update time
    lastVersionUpdateTime: new Date(0), // last version update time
}

const activity = (state = initState, action={ type: null }) => {
    const { type } = action
    switch (type) {
        case AT.GET_ACTIVITY_REQUEST:
            return {
                ...state,
                isUpdatingActivity: true,
            }
        case AT.FETCH_ACTIVITY_SUCCESS:
            const now = new Date()
            return {
                ...state,
                isActivityLoaded: true,
                isUpdatingActivity: false,
                lastActivityUpdateTime: now,
                lastVersionUpdateTime: now,
                activity: action.payload,
            }
        case AT.GET_ACTIVITY_SUCCESS:
            return {
                ...state,
                isUpdatingActivity: false,
                lastActivityUpdateTime: new Date(),
                activity: updateActivity(action.payload, state.activity),
            }
        case AT.GET_ACTIVITY_FAIL:
            return {
                ...state,
                isUpdatingActivity: false,
            }
        case AT.GET_VERSION_SUCCESS:
            return {
                ...state,
                lastVersionUpdateTime: new Date(),
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

// reducer helper function to update activityObject with updated activity
const updateActivity = (activity, activityObject) => {
    return Object.entries(activity).reduce((allObject, [key, value]) => {
        if (typeof value === 'object') {
            // append lock, operation, or system activity
            allObject[key] = {
                ...allObject[key],
                ...value,
            }
        } else if (key === 'from') {
            // save the oldest unix time
            allObject.from = Math.min(value, allObject.from)
        } else if (key === 'to') {
            // save the latest unix time
            allObject.to = Math.max(value, allObject.to)
        }
        return allObject
    }, activityObject)
}

// ----------------------------------------------------------------------------
// Private selectors

export const selectIsActivityLoaded = (state) => state.isActivityLoaded

export const selectIsUpdatingActivity = (state) => state.isUpdatingActivity

export const selectLastActivityUpdateTime = (state) => state.lastActivityUpdateTime

export const selectLastVersionUpdateTime = (state) => state.lastVersionUpdateTime

export const selectActivityLock = (state) => state.activity.lock

export const selectActivityOperation = (state) => state.activity.operation

export const selectActivitySystem = (state) => state.activity.system

export default activity

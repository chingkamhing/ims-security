import actions from '../../actions'
import { AT, CONF } from '../../constants'

//
// middleware to periodically poll for latest version (or changes) status
// - if corresponding info's version changed, update the corresponding info
//

// corresponding version info's getting latest action function
const versionAction = {
    user: actions.latestUser,
    privilegeProfile: actions.latestPrivilegeProfile,
    location: actions.latestLocation,
    scope: actions.latestScope,
    accessProfile: actions.latestAccessProfile,
    key: actions.latestKey,
    keyManager: actions.latestKeyManager,
    lock: actions.latestLock,
    authenToken: actions.latestAuthenToken,
}

export const updateLatest = (() => {
    // update latest version status variables
    let isUpdateLatestReady = false     // boolean if ready to request update latest data center status
    let timerUpdateLatest = undefined   // timer id of the periodic timer
    let currentVersion = {}             // current version
    let currentPath = {}                // current location and scope path

    return (
        ({ dispatch }) => next => action => {
            // update latest version status helper functions
            const tickUpdateLatest = () => {
                if (isUpdateLatestReady === true) {
                    // tickUpdateLatest is still running, do the timer tick
                    dispatch(actions.getVersion())
                }
            }
            const updateLatestReady = (isUpdate) => {
                isUpdateLatestReady = Boolean(isUpdate)
                // Q: ready to update latest and timer not start yet?
                if ((isUpdateLatestReady === true) && (timerUpdateLatest === undefined)) {
                    timerUpdateLatest = setTimeout(tickUpdateLatest, CONF.UPDATE_LATEST_INTEVAL)
                }
            }
            const abortUpdateLatest = () => {
                // abort update latest data center status and clear the timer
                isUpdateLatestReady = false
                timerUpdateLatest = clearTimeout(timerUpdateLatest)
            }

            // our middleware, check start/stop/abort action
            switch (action.type) {
                case AT.POLL_VERSION_START:
                    // Q: any privilege?
                    const { privileges, locationIds, scopeId } = action.payload
                    currentPath = { locationIds, scopeId }
                    updateLatestReady((Array.isArray(privileges)) && (privileges.length > 0))
                    break
                case AT.POLL_VERSION_ABORT:
                    // stop immediately to request for latest data center status
                    abortUpdateLatest()
                    break
                case AT.GET_VERSION_SUCCESS:
                    const { version } = action.payload
                    Object.entries(version).forEach(([key, value]) => {
                        if ((currentVersion[key]) && (value !== currentVersion[key])) {
                            dispatch(versionAction[key](currentPath))
                        }
                        currentVersion[key] = value
                    })
                    // note: delibrately fall through
                case AT.GET_VERSION_FAIL:
                    // either fetch success or fail, keep updating latest version status
                    timerUpdateLatest = setTimeout(tickUpdateLatest, CONF.UPDATE_LATEST_INTEVAL)
                    break
                default:
                    break
            }

            // run other middleware and then reducer
            return next(action)
        }
    )
})()

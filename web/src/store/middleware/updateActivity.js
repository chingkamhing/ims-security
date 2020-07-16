import actions from '../../actions'
import { AT, CONF } from '../../constants'

//
// middleware to periodically get history or latest update activity from server
// - get history activity every CONF.UPDATE_ACTIVITY_INTEVAL and expect the server response with activity from "to" to "from" unix time (i.e. download activity from latest to oldest)
// - get latest activity every CONF.UPDATE_LATEST_INTEVAL and expect the server response with activity from "from" to "to" unix time (i.e. download activity from oldest to latest)
// - server determine the maximum number of activity to response as it deem appropriate (i.e. limit number of rows due to loading) with "from" and "to" unix time
// 

export const updateActivity = (() => {
    const UPDATE_CYCLES = Math.floor(CONF.UPDATE_LATEST_INTEVAL / CONF.UPDATE_ACTIVITY_INTEVAL)
    // update latest version status variables
    let isUpdateLatestReady = false     // boolean if ready to request update latest data center status
    let timerUpdateLatest = undefined   // timer id of the periodic timer
    // input poll update period
    let pollPeriod = {
        from: 0,
        to: 0,
    }
    // successfully updated period
    let updatedPeriod = {
        from: 0,
        to: 0,
    }
    let currentCycle = 0
    const extendPeriod = (from, to) => {
        if (((updatedPeriod.from <= from) && (from <= updatedPeriod.to)) || ((updatedPeriod.from <= to) && (to <= updatedPeriod.to))) {
            // extend the period
            from = Math.min(from, updatedPeriod.from)
            to = Math.max(to, updatedPeriod.to)
        } else {
            // invalid period that is not consecutive to the updatedPeriod, use original updatedPeriod
            from = updatedPeriod.from
            to = updatedPeriod.to
        }
        return {from, to}
    }
    const getDownloadParam = () => {
        // workout to get either history or latest activity
        // increment update cycle
        currentCycle = (currentCycle + 1) % UPDATE_CYCLES
        return (currentCycle !== 0) ? (
            // update history activity
            // Q: updated all history?
            (pollPeriod.from < updatedPeriod.from) ? (
                // not finished updating history, return remain period and ask the server to response from "to" period toware "from" period (i.e. descending)
                {
                    from: pollPeriod.from,
                    to: updatedPeriod.from,
                    descending: true,
                }
            ) : (
                // finished updating history, do nothing, return null
                null
            )
        ) : (
            // update latest activity from last updated "to" period
            {
                from: updatedPeriod.to,
                to: Math.floor((new Date()).getTime() / 1000),
            }
        )
    }
    
    return (
        ({ dispatch }) => next => action => {
            // update latest version status helper functions
            const tickUpdateLatest = () => {
                if (isUpdateLatestReady === true) {
                    // tickUpdateLatest is still running, do the timer tick
                    const param = getDownloadParam()
                    if (param) {
                        dispatch(actions.getActivity(param))
                    } else {
                        timerUpdateLatest = setTimeout(tickUpdateLatest, CONF.UPDATE_ACTIVITY_INTEVAL)
                    }
                }
            }
            const updateLatestReady = (isUpdate) => {
                isUpdateLatestReady = Boolean(isUpdate)
                // Q: ready to update latest and timer not start yet?
                if ((isUpdateLatestReady === true) && (timerUpdateLatest === undefined)) {
                    timerUpdateLatest = setTimeout(tickUpdateLatest, CONF.UPDATE_ACTIVITY_INTEVAL)
                }
            }
            const abortUpdateLatest = () => {
                // abort update latest data center status and clear the timer
                isUpdateLatestReady = false
                timerUpdateLatest = clearTimeout(timerUpdateLatest)
            }
            const getProgress = () => (Math.floor((pollPeriod.to - Math.max(pollPeriod.from, updatedPeriod.from)) / (pollPeriod.to - pollPeriod.from) * 100))

            // our middleware, check start/stop/abort action
            switch (action.type) {
                case AT.POLL_ACTIVITY_START:
                    {
                        // input parameters:
                        // - from: from period in unix time
                        // - to: to period in unix time
                        const { from, to } = action.payload
                        if ((typeof from === 'number') && (typeof to === 'number')) {
                            pollPeriod = { from, to }
                            updateLatestReady((to - from) > 0)
                            dispatch(actions.pollActivityProgress(getProgress()))
                        }
                    }
                    break
                case AT.POLL_ACTIVITY_ABORT:
                    // stop immediately to request for latest data center status
                    abortUpdateLatest()
                    break
                case AT.FETCH_ACTIVITY_SUCCESS:
                    {
                        const { from, to } = action.payload
                        updatedPeriod = {from, to}
                    }
                    break
                case AT.GET_ACTIVITY_SUCCESS:
                    {
                        const { from, to } = action.payload
                        updatedPeriod = extendPeriod(from, to)
                        dispatch(actions.pollActivityProgress(getProgress()))
                    }
                    // note: delibrately fall through
                case AT.GET_ACTIVITY_FAIL:
                    // either fetch success or fail, keep updating latest version status
                    timerUpdateLatest = setTimeout(tickUpdateLatest, CONF.UPDATE_ACTIVITY_INTEVAL)
                    break
                default:
                    break
            }

            // run other middleware and then reducer
            return next(action)
        }
    )
})()

import mockFetch from '../../lib/mockFetch'
import { AT, HTTP } from '../../constants'
import actions from '../../actions'

//
// api middleware to fetch with specified url and parse the expected json response; upon success, will dispatch specified success action type with the json response
//
// action interface:
//
// action.type:
// AT.API       - signify the payload is for api communication
// 
// action.payload:
//  .url            - relative URL to fetch
//  .method         - http method of GET, POST, PUT, DELETE, etc.
//  .headers        - object of key-value that will be sent as http header
//  .data           - data that will be passed to fetch's body data
//  .onSuccess      - upon success, will invoke this callback function
//  .onFailure      - upon fail, will invoke this callback function
//  .skipApiError   - skip sending apiError() upon error, used for background api that avoid UI popup message
//  .label          - string label of this api request
// 
// if success, dispatch action.payload.success with json response
// if fail, dispatch apiError() with the returned error
//

export const apiMiddleware = ({ dispatch }) => next => action => {
    // Q: API action type?
    if (action.type === AT.API) {
        // yes, API middleware
        let { url, method, headers, data, onSuccess, onFailure, skipApiError, label } = action.payload
        const fetchData = {
            method,
            headers,
        }

        // mock fetch to simulate http request response data
        if (process.env.NODE_ENV === 'development') {
            mockFetch(action.payload)
        }

        // for http GET or DELETE, pass data as query parameters; for the rest of http method, pass data to message body in json format
        if ([ HTTP.GET, HTTP.DELETE ].includes(method)) {
            // convert the data object to query parameters
            const encodeGetParams = (p) => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&")
            if (data) {
                url = url + '?' + encodeGetParams(data)
            }
        } else {
            // assume sending the data in json format
            fetchData.headers = {...fetchData.headers, 'Content-type': 'application/json'}
            fetchData.body = JSON.stringify(data)
        }

        // start fetch
        if (label) {
            dispatch(actions.apiStart(label))
        }
        fetch(url, fetchData).then(response => {
            if (response.ok) {
                // response status 200-299
                return response.json()
            } else {
                // response status not ok, expect a jsend fail/error response
                return new Promise((_, reject) => {
                    response.json()
                        .then((jsend) => {
                            // response is a json, return the jsend error/fail message
                            reject(`${jsend.status}: ${jsend.message}`)
                        })
                        .catch(error => {
                            // response is not a json, return the response status text instead
                            reject(response.statusText)
                        })
                })
            }
        })
        .then(jsend => {
            dispatch(onSuccess(jsend))
            // Q: check if the response is a batch request response, if it is, check if there is any error (i.e. array of BatchError)?
            if ((jsend.error) && (jsend.error.length) && (jsend.error.length > 0)) {
                dispatch(actions.apiBatchErrors(jsend.error))
            }
        })
        .catch(error => {
            if (skipApiError === false) {
                dispatch(actions.apiError(url, error))
            }
            dispatch(onFailure(error))
        })
        .finally(() => {
            if (label) {
                dispatch(actions.apiEnd(label))
            }
        })
    }

    return next(action)
}

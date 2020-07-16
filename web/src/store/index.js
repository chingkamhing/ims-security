import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { apiMiddleware } from './middleware/api'
import { updateLatest } from './middleware/updateLatest'
import { updateActivity } from './middleware/updateActivity'

const baseMiddlewares = [thunk, apiMiddleware, updateLatest, updateActivity]
const debugMiddlewares = [createLogger()]
const getMiddleware = () => {
    const middleware = {
        development: [...baseMiddlewares, ...debugMiddlewares],
        production: [...baseMiddlewares],
        test: [...baseMiddlewares, ...debugMiddlewares]
    }
    const middlewares = middleware[process.env.NODE_ENV] || []
    return applyMiddleware(...middlewares)
}

//FIXME, consider to remove composeWithDevTools() for production release?
const store = createStore(
    reducers,
    composeWithDevTools(getMiddleware())
)

export default store
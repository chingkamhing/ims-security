import React from 'react'
import { connect } from 'react-redux'
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import {
    PageLogin,
    PageActivity,
    PageAccessProfile,
    PageHardware,
    PageUser,
    PageSystem,
    PageSetting,
    PageNotFound,
} from './pages'
import ErrorMessage from './components/ErrorMessage'
import BatchErrors from './components/BatchErrors'
import LoadingOverlay from './components/LoadingOverlay'
import actions from './actions'
import { selectLoaderMessage, selectErrorMessage, selectBatchErrors, selectMyselfLoginStatus, selectMyselfProfileLoaded } from './store/reducers'
import { sessionGetUser, sessionClear } from './lib/session'
import { ROUTE, LS } from './constants'

const mapStateToProps = state => ({
    loaderMessage: selectLoaderMessage(state),
    errorMessage: selectErrorMessage(state),
    batchErrors: selectBatchErrors(state),
    loginStatus: selectMyselfLoginStatus(state),
    isProfileLoaded: selectMyselfProfileLoaded(state),
})

const mapDispatchToProps = dispatch => ({
    onError: (message) => {
        dispatch(actions.errorShowMessage(message))
    },
    reloadUser: () => {
        dispatch(actions.userReload())
    },
    clearErrorMessage: () => {
        dispatch(actions.clearErrorMessage())
    },
    clearBatchErrors: () => {
        dispatch(actions.clearBatchErrors())
    },
})

export const redirectLogin = () =>
    <Redirect to={ROUTE.LOGIN} />

export const redirectDefault = () =>
    <Redirect to={ROUTE.ACTIVITY} />

const initState = {
    // checked is used to tell if session username (if any) is checked with the server
    checked: false,
}

class App extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { ...initState }
    }

    componentDidMount() {
        const { isProfileLoaded, reloadUser } = this.props
        const username = sessionGetUser()
        let checked
        if ((username) && (isProfileLoaded === false)) {
            // found session username, reload from server
            reloadUser()
            checked = false
        } else {
            // no session username, assert checked
            sessionClear()
            checked = true
        }
        this.setState({checked})
    }

    componentDidUpdate(prevProps) {
        const { loginStatus } = this.props
        if ((prevProps.loginStatus === LS.LOGGING_IN) && (loginStatus !== prevProps.loginStatus)) {
            if (loginStatus !== LS.LOGGED_IN) {
                // fail to login, clear session values
                sessionClear()
            }
            // finished verify username with the server, assert checked
            this.setState({checked: true})
        }
    }

    render() {
        const { checked } = this.state
        const { loaderMessage, errorMessage, batchErrors, clearErrorMessage, clearBatchErrors } = this.props
        return (
            <LoadingOverlay active={(loaderMessage !== '')} spinner text={loaderMessage}>
                <Routes checked={checked} {...this.props} />
                <ErrorMessage title='Error' show={(errorMessage !== '')} onHide={clearErrorMessage}>
                    {errorMessage}
                </ErrorMessage>
                <BatchErrors show={(batchErrors.length > 0)} onHide={clearBatchErrors} batchErrors={batchErrors} />
            </LoadingOverlay>
        )
    }
}

const Routes = (props) => {
    const { checked, isProfileLoaded } = props
    return (
        checked &&
        <Switch>
            <PrivateRoute exact path="/" component={redirectDefault} authenticated={isProfileLoaded} />
            <PrivateRoute path={ROUTE.ACTIVITY} component={PageActivity} authenticated={isProfileLoaded} />
            <PrivateRoute path={ROUTE.ACCESS_PROFILE} component={PageAccessProfile} authenticated={isProfileLoaded} />
            <PrivateRoute path={ROUTE.HARDWARE} component={PageHardware} authenticated={isProfileLoaded} />
            <PrivateRoute path={ROUTE.USER} component={PageUser} authenticated={isProfileLoaded} />
            <PrivateRoute path={ROUTE.SYSTEM} component={PageSystem} authenticated={isProfileLoaded} />
            <PrivateRoute path={ROUTE.SETTING} component={PageSetting} authenticated={isProfileLoaded} />
            <HomeRoute path={ROUTE.LOGIN} component={PageLogin} authenticated={isProfileLoaded} />
            <PrivateRoute component={PageNotFound} authenticated={isProfileLoaded} />
        </Switch>
    )
}

const PrivateRoute = ({ component, exact = false, path, authenticated }) => {
    return (
        <Route
            exact={exact}
            path={path}
            render={props => (
                authenticated ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect to={{
                        pathname: ROUTE.LOGIN,
                        state: { from: props.location }
                    }}/>
                )
            )}
        />
    )
}

const HomeRoute = ({ component, exact = false, path, authenticated, onError }) => {
    if ((authenticated) && (onError)) {
        //FIXME, after successfully confirmed new user, incorrect show this error message
        // onError('Please log out first before you can go to the link!')
    }
    return (
        <Route
            exact={exact}
            path={path}
            render={props => (
                authenticated ? (
                    <Redirect to={{
                        pathname: ROUTE.HOME,
                        state: { from: props.location }
                    }}/>
                ) : (
                    React.createElement(component, props)
                )
            )}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

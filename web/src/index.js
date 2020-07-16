import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import './assets/stylesheets/global.css'
import store from './store'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

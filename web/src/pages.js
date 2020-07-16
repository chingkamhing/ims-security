import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import TitleBar from './components/TitleBar'
import Login from './components/Account/Login'
import Activity from './components/Activity'
import AccessProfile from './components/AccessProfile'
import Hardware from './components/Hardware'
import User from './components/User'
import System from './components/System'
import Setting from './components/Setting'

export const PageLogin = () =>
    <>
        <Header />
        <Login />
        <Footer />
    </>

export const PageActivity = () =>
    <TitleBar>
        <Activity />
        <Footer />
    </TitleBar>

export const PageAccessProfile = () =>
    <TitleBar>
        <AccessProfile />
        <Footer />
    </TitleBar>

export const PageHardware = () =>
    <TitleBar>
        <Hardware />
        <Footer />
    </TitleBar>

export const PageUser = () =>
    <TitleBar>
        <User />
        <Footer />
    </TitleBar>

export const PageSystem = () =>
    <TitleBar>
        <System />
        <Footer />
    </TitleBar>

export const PageSetting = () =>
    <TitleBar>
        <Setting />
        <Footer />
    </TitleBar>

export const PageNotFound = ({ location }) =>
    <h1>
        Page Not Found!
    </h1>

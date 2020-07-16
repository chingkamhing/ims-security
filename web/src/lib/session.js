const sessionKey = "username"

// 
// - The session is saved in sessionStorage and/or localStorage.
// - The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.
// - The data in sessionStorage is cleared when the page session ends (i.e. close browser tab).
// 

// sessionSave save session key-value
// value: payload of login user info
export function sessionSaveUser(isRememberMe, value) {
    // save user info in sessionStorage to handle browser refresh (i.e. keyboard input F5 refresh)
    sessionStorage.setItem(sessionKey, value.username)
    // save user info in localStorage according to isRememberMe parameter
    if (isRememberMe) {
        localStorage.setItem(sessionKey, value.username)
    }
}

// sessionGet get session key's value
// return session values
export function sessionGetUser() {
    const session = sessionStorage.getItem(sessionKey) || localStorage.getItem(sessionKey)
    return session
}

// sessionClear clear all session values
export function sessionClear() {
    sessionStorage.clear()
    localStorage.clear()
}


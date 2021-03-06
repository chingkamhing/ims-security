// action type
export const AT = {
    // ui action types
    LOADER_MESSAGE: 'LOADER_MESSAGE',
    ERROR_MESSAGE: 'ERROR_MESSAGE',
    ACTIVITY_TAB_SELECT: 'ACTIVITY_TAB_SELECT',
    ACCESS_PROFILE_ROW_SELECT: 'ACCESS_PROFILE_ROW_SELECT',
    ACCESS_PROFILE_TAB_SELECT: 'ACCESS_PROFILE_TAB_SELECT',
    HARDWARE_TAB_SELECT: 'HARDWARE_TAB_SELECT',
    HARDWARE_LOCK_ROW_SELECT: 'HARDWARE_LOCK_ROW_SELECT',
    HARDWARE_LOCKS_SELECT: 'HARDWARE_LOCKS_SELECT',
    HARDWARE_KEY_ROW_SELECT: 'HARDWARE_KEY_ROW_SELECT',
    HARDWARE_KEY_TAB_SELECT: 'HARDWARE_KEY_TAB_SELECT',
    HARDWARE_KEY_MANAGER_ROW_SELECT: 'HARDWARE_KEY_MANAGER_ROW_SELECT',
    HARDWARE_KEY_MANAGER_TAB_SELECT: 'HARDWARE_KEY_MANAGER_TAB_SELECT',
    HARDWARE_AUTHEN_TOKEN_ROW_SELECT: 'HARDWARE_AUTHEN_TOKEN_ROW_SELECT',
    USER_TAB_SELECT: 'USER_TAB_SELECT',
    USER_USER_ROW_SELECT: 'USER_USER_ROW_SELECT',
    USER_LOCATION_EXPANDED: 'USER_LOCATION_EXPANDED',
    USER_LOCATION_SELECTED: 'USER_LOCATION_SELECTED',
    USER_SCOPE_EXPANDED: 'USER_SCOPE_EXPANDED',
    USER_SCOPE_SELECTED: 'USER_SCOPE_SELECTED',
    USER_PRIVILEGE_PROFILE_ROW_SELECT: 'USER_PRIVILEGE_PROFILE_ROW_SELECT',
    SYSTEM_TAB_SELECT: 'SYSTEM_TAB_SELECT',
    SETTING_TAB_SELECT: 'SETTING_TAB_SELECT',
    // login action types
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAIL: 'LOGOUT_FAIL',
    REMEMBER_ME: 'REMEMBER_ME',
    // get user info  action types
    FETCH_MYSELF_SUCCESS: 'FETCH_MYSELF_SUCCESS',
    FETCH_MYSELF_FAIL: 'FETCH_MYSELF_FAIL',
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',
    CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
    CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAIL: 'CHANGE_PASSWORD_FAIL',
    RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAIL: 'RESET_PASSWORD_FAIL',
    FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
    DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',
    CREATE_PRIVILEGE_PROFILE_REQUEST: 'CREATE_PRIVILEGE_PROFILE_REQUEST',
    CREATE_PRIVILEGE_PROFILE_SUCCESS: 'CREATE_PRIVILEGE_PROFILE_SUCCESS',
    CREATE_PRIVILEGE_PROFILE_FAIL: 'CREATE_PRIVILEGE_PROFILE_FAIL',
    FETCH_PRIVILEGE_PROFILE_SUCCESS: 'FETCH_PRIVILEGE_PROFILE_SUCCESS',
    UPDATE_PRIVILEGE_PROFILE_REQUEST: 'UPDATE_PRIVILEGE_PROFILE_REQUEST',
    UPDATE_PRIVILEGE_PROFILE_SUCCESS: 'UPDATE_PRIVILEGE_PROFILE_SUCCESS',
    UPDATE_PRIVILEGE_PROFILE_FAIL: 'UPDATE_PRIVILEGE_PROFILE_FAIL',
    DELETE_PRIVILEGE_PROFILE_REQUEST: 'DELETE_PRIVILEGE_PROFILE_REQUEST',
    DELETE_PRIVILEGE_PROFILE_SUCCESS: 'DELETE_PRIVILEGE_PROFILE_SUCCESS',
    DELETE_PRIVILEGE_PROFILE_FAIL: 'DELETE_PRIVILEGE_PROFILE_FAIL',
    FETCH_LOCATION_SUCCESS: 'FETCH_LOCATION_SUCCESS',
    UPDATE_LOCATION_REQUEST: 'UPDATE_LOCATION_REQUEST',
    UPDATE_LOCATION_SUCCESS: 'UPDATE_LOCATION_SUCCESS',
    UPDATE_LOCATION_FAIL: 'UPDATE_LOCATION_FAIL',
    DELETE_LOCATION_REQUEST: 'DELETE_LOCATION_REQUEST',
    DELETE_LOCATION_SUCCESS: 'DELETE_LOCATION_SUCCESS',
    DELETE_LOCATION_FAIL: 'DELETE_LOCATION_FAIL',
    FETCH_SCOPE_SUCCESS: 'FETCH_SCOPE_SUCCESS',
    UPDATE_SCOPE_REQUEST: 'UPDATE_SCOPE_REQUEST',
    UPDATE_SCOPE_SUCCESS: 'UPDATE_SCOPE_SUCCESS',
    UPDATE_SCOPE_FAIL: 'UPDATE_SCOPE_FAIL',
    DELETE_SCOPE_REQUEST: 'DELETE_SCOPE_REQUEST',
    DELETE_SCOPE_SUCCESS: 'DELETE_SCOPE_SUCCESS',
    DELETE_SCOPE_FAIL: 'DELETE_SCOPE_FAIL',
    RESET_USER_PASSWORD_REQUEST: 'RESET_USER_PASSWORD_REQUEST',
    RESET_USER_PASSWORD_SUCCESS: 'RESET_USER_PASSWORD_SUCCESS',
    RESET_USER_PASSWORD_FAIL: 'RESET_USER_PASSWORD_FAIL',
    CHANGE_USER_PASSWORD_REQUEST: 'CHANGE_USER_PASSWORD_REQUEST',
    CHANGE_USER_PASSWORD_SUCCESS: 'CHANGE_USER_PASSWORD_SUCCESS',
    CHANGE_USER_PASSWORD_FAIL: 'CHANGE_USER_PASSWORD_FAIL',
    // access profile operations action types
    CREATE_ACCESS_PROFILE_REQUEST: 'CREATE_ACCESS_PROFILE_REQUEST',
    CREATE_ACCESS_PROFILE_SUCCESS: 'CREATE_ACCESS_PROFILE_SUCCESS',
    CREATE_ACCESS_PROFILE_FAIL: 'CREATE_ACCESS_PROFILE_FAIL',
    FETCH_ACCESS_PROFILE_SUCCESS: 'FETCH_ACCESS_PROFILE_SUCCESS',
    UPDATE_ACCESS_PROFILE_REQUEST: 'UPDATE_ACCESS_PROFILE_REQUEST',
    UPDATE_ACCESS_PROFILE_SUCCESS: 'UPDATE_ACCESS_PROFILE_SUCCESS',
    UPDATE_ACCESS_PROFILE_FAIL: 'UPDATE_ACCESS_PROFILE_FAIL',
    DELETE_ACCESS_PROFILE_REQUEST: 'DELETE_ACCESS_PROFILE_REQUEST',
    DELETE_ACCESS_PROFILE_SUCCESS: 'DELETE_ACCESS_PROFILE_SUCCESS',
    DELETE_ACCESS_PROFILE_FAIL: 'DELETE_ACCESS_PROFILE_FAIL',
    // key operations action types
    REGISTER_KEY_REQUEST: 'REGISTER_KEY_REQUEST',
    REGISTER_KEY_SUCCESS: 'REGISTER_KEY_SUCCESS',
    REGISTER_KEY_FAIL: 'REGISTER_KEY_FAIL',
    UPDATE_KEY_REQUEST: 'UPDATE_KEY_REQUEST',
    FETCH_KEY_SUCCESS: 'FETCH_KEY_SUCCESS',
    UPDATE_KEY_SUCCESS: 'UPDATE_KEY_SUCCESS',
    UPDATE_KEY_FAIL: 'UPDATE_KEY_FAIL',
    DEREGISTER_KEY_REQUEST: 'DEREGISTER_KEY_REQUEST',
    DEREGISTER_KEY_SUCCESS: 'DEREGISTER_KEY_SUCCESS',
    DEREGISTER_KEY_FAIL: 'DEREGISTER_KEY_FAIL',
    PROGRAM_KEY_REQUEST: 'PROGRAM_KEY_REQUEST',
    PROGRAM_KEY_SUCCESS: 'PROGRAM_KEY_SUCCESS',
    PROGRAM_KEY_FAIL: 'PROGRAM_KEY_FAIL',
    // key manager operations action types
    REGISTER_KEY_MANAGER_REQUEST: 'REGISTER_KEY_MANAGER_REQUEST',
    REGISTER_KEY_MANAGER_SUCCESS: 'REGISTER_KEY_MANAGER_SUCCESS',
    REGISTER_KEY_MANAGER_FAIL: 'REGISTER_KEY_MANAGER_FAIL',
    UPDATE_KEY_MANAGER_REQUEST: 'UPDATE_KEY_MANAGER_REQUEST',
    FETCH_KEY_MANAGER_SUCCESS: 'FETCH_KEY_MANAGER_SUCCESS',
    UPDATE_KEY_MANAGER_SUCCESS: 'UPDATE_KEY_MANAGER_SUCCESS',
    UPDATE_KEY_MANAGER_FAIL: 'UPDATE_KEY_MANAGER_FAIL',
    DEREGISTER_KEY_MANAGER_REQUEST: 'DEREGISTER_KEY_MANAGER_REQUEST',
    DEREGISTER_KEY_MANAGER_SUCCESS: 'DEREGISTER_KEY_MANAGER_SUCCESS',
    DEREGISTER_KEY_MANAGER_FAIL: 'DEREGISTER_KEY_MANAGER_FAIL',
    // lock operations action types
    REGISTER_LOCK_REQUEST: 'REGISTER_LOCK_REQUEST',
    REGISTER_LOCK_SUCCESS: 'REGISTER_LOCK_SUCCESS',
    REGISTER_LOCK_FAIL: 'REGISTER_LOCK_FAIL',
    UPDATE_LOCK_REQUEST: 'UPDATE_LOCK_REQUEST',
    FETCH_LOCK_SUCCESS: 'FETCH_LOCK_SUCCESS',
    UPDATE_LOCK_SUCCESS: 'UPDATE_LOCK_SUCCESS',
    UPDATE_LOCK_FAIL: 'UPDATE_LOCK_FAIL',
    DEREGISTER_LOCK_REQUEST: 'DEREGISTER_LOCK_REQUEST',
    DEREGISTER_LOCK_SUCCESS: 'DEREGISTER_LOCK_SUCCESS',
    DEREGISTER_LOCK_FAIL: 'DEREGISTER_LOCK_FAIL',
    // authen token operations action types
    REGISTER_AUTHEN_TOKEN_REQUEST: 'REGISTER_AUTHEN_TOKEN_REQUEST',
    REGISTER_AUTHEN_TOKEN_SUCCESS: 'REGISTER_AUTHEN_TOKEN_SUCCESS',
    REGISTER_AUTHEN_TOKEN_FAIL: 'REGISTER_AUTHEN_TOKEN_FAIL',
    UPDATE_AUTHEN_TOKEN_REQUEST: 'UPDATE_AUTHEN_TOKEN_REQUEST',
    FETCH_AUTHEN_TOKEN_SUCCESS: 'FETCH_AUTHEN_TOKEN_SUCCESS',
    UPDATE_AUTHEN_TOKEN_SUCCESS: 'UPDATE_AUTHEN_TOKEN_SUCCESS',
    UPDATE_AUTHEN_TOKEN_FAIL: 'UPDATE_AUTHEN_TOKEN_FAIL',
    DEREGISTER_AUTHEN_TOKEN_REQUEST: 'DEREGISTER_AUTHEN_TOKEN_REQUEST',
    DEREGISTER_AUTHEN_TOKEN_SUCCESS: 'DEREGISTER_AUTHEN_TOKEN_SUCCESS',
    DEREGISTER_AUTHEN_TOKEN_FAIL: 'DEREGISTER_AUTHEN_TOKEN_FAIL',
    // api middleware action
    API: 'API',
    API_START: 'API_START',
    API_END: 'API_END',
    API_ERROR: 'API_ERROR',
    API_BATCH_ERROR: 'API_BATCH_ERROR',
    ACCESS_DENIED: 'ACCESS_DENIED',
    // periodically get info change middleware action types
    POLL_VERSION_START: 'POLL_VERSION_START',
    POLL_VERSION_ABORT: 'POLL_VERSION_ABORT',
    GET_VERSION_SUCCESS: 'GET_VERSION_SUCCESS',
    GET_VERSION_FAIL: 'GET_VERSION_FAIL',
    // periodically get activity middleware action types
    POLL_ACTIVITY_START: 'POLL_ACTIVITY_START',
    POLL_ACTIVITY_ABORT: 'POLL_ACTIVITY_ABORT',
    POLL_ACTIVITY_PROGRESS: 'POLL_ACTIVITY_PROGRESS',
    GET_ACTIVITY_REQUEST: 'GET_ACTIVITY_REQUEST',
    FETCH_ACTIVITY_SUCCESS: 'FETCH_ACTIVITY_SUCCESS',
    GET_ACTIVITY_SUCCESS: 'GET_ACTIVITY_SUCCESS',
    GET_ACTIVITY_FAIL: 'GET_ACTIVITY_FAIL',
}

// HTTP methods
export const HTTP = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

// browser route path
export const ROUTE = {
    LOGIN: '/login',
    HOME: '/hardware',
    ACTIVITY: '/activity',
    ACCESS_PROFILE: '/access-profile',
    HARDWARE: '/hardware',
    USER: '/user',
    SYSTEM: '/system',
    SETTING: '/setting',
}

// API endpoint extension
// - for PHP-on-Apache server, endpoint must be ended with ".php"; otherwise, should leave it as empty string
const API_EXTENSION = '.php'
// API relative URL
export const URL = {
    API_LOGIN: '/api/account/login' + API_EXTENSION,
    API_MY_INFO: '/api/my/info' + API_EXTENSION,
    API_USER_INFO: '/api/user/info' + API_EXTENSION,
    API_CREATE_USER: '/api/user/create' + API_EXTENSION,
    API_UPDATE_USER: '/api/user/update' + API_EXTENSION,
    API_DELETE_USER: '/api/user/delete' + API_EXTENSION,
    API_RESET_PASSWORD: '/api/user/reset' + API_EXTENSION,
    API_CHANGE_PASSWORD: '/api/user/password' + API_EXTENSION,
    API_LOCATION_INFO: '/api/location/info' + API_EXTENSION,
    API_UPDATE_LOCATION: '/api/location/update' + API_EXTENSION,
    API_SCOPE_INFO: '/api/scope/info' + API_EXTENSION,
    API_UPDATE_SCOPE: '/api/scope/update' + API_EXTENSION,
    API_PRIVILEGE_PROFILE_INFO: '/api/privilege-profile/info' + API_EXTENSION,
    API_CREATE_PRIVILEGE_PROFILE: '/api/privilege-profile/create' + API_EXTENSION,
    API_UPDATE_PRIVILEGE_PROFILE: '/api/privilege-profile/update' + API_EXTENSION,
    API_DELETE_PRIVILEGE_PROFILE: '/api/privilege-profile/delete' + API_EXTENSION,
    API_ACCESS_PROFILE_INFO: '/api/access-profile/info' + API_EXTENSION,
    API_CREATE_ACCESS_PROFILE: '/api/access-profile/create' + API_EXTENSION,
    API_UPDATE_ACCESS_PROFILE: '/api/access-profile/update' + API_EXTENSION,
    API_DELETE_ACCESS_PROFILE: '/api/access-profile/delete' + API_EXTENSION,
    API_KEY_INFO: '/api/key/info' + API_EXTENSION,
    API_REGISTER_KEY: '/api/key/register' + API_EXTENSION,
    API_UPDATE_KEY: '/api/key/update' + API_EXTENSION,
    API_DEREGISTER_KEY: '/api/key/deregister' + API_EXTENSION,
    API_PROGRAM_KEY: '/api/key/program' + API_EXTENSION,
    API_KEY_MANAGER_INFO: '/api/key-manager/info' + API_EXTENSION,
    API_REGISTER_KEY_MANAGER: '/api/key-manager/register' + API_EXTENSION,
    API_UPDATE_KEY_MANAGER: '/api/key-manager/update' + API_EXTENSION,
    API_DEREGISTER_KEY_MANAGER: '/api/key-manager/deregister' + API_EXTENSION,
    API_LOCK_INFO: '/api/lock/info' + API_EXTENSION,
    API_REGISTER_LOCK: '/api/lock/register' + API_EXTENSION,
    API_UPDATE_LOCK: '/api/lock/update' + API_EXTENSION,
    API_DEREGISTER_LOCK: '/api/lock/deregister' + API_EXTENSION,
    API_AUTHEN_TOKEN_INFO: '/api/authen-token/info' + API_EXTENSION,
    API_REGISTER_AUTHEN_TOKEN: '/api/authen-token/register' + API_EXTENSION,
    API_UPDATE_AUTHEN_TOKEN: '/api/authen-token/update' + API_EXTENSION,
    API_DEREGISTER_AUTHEN_TOKEN: '/api/authen-token/deregister' + API_EXTENSION,
    API_VERSION: '/api/version' + API_EXTENSION,
    API_ACTIVITY: '/api/activity' + API_EXTENSION,
}

// privilege operation
export const PRIVILEGE = {
    GET_USER: 'GET_USER',                                       // get users info
    CREATE_USER: 'CREATE_USER',                                 // create/update users info; change/reset password
    GET_ACCESS_RESOURCES: 'GET_ACCESS_RESOURCES',               // get access profiles, access keys, and authen tokens info
    CREATE_ACCESS_RESOURCES: 'CREATE_ACCESS_RESOURCES',         // create/update access profiles, access keys, and authen tokens info
    PROGRAM_ACCESS_RESOURCES: 'PROGRAM_ACCESS_RESOURCES',       // program access keys
    GET_MANAGEMENT_RESOURCES: 'GET_MANAGEMENT_RESOURCES',           // get management keys and key managers info
    CREATE_MANAGEMENT_RESOURCES: 'CREATE_MANAGEMENT_RESOURCES',     // create/update management keys and key managers info
    PROGRAM_MANAGEMENT_RESOURCES: 'PROGRAM_MANAGEMENT_RESOURCES',   // program management keys
    ACTIVITY_LOCK_ACCESS: 'ACTIVITY_LOCK_ACCESS',               // get lock access activity
    ACTIVITY_LOCK_OPERATION: 'ACTIVITY_LOCK_OPERATION',         // get lock operation activity
    ACTIVITY_SYSTEM: 'ACTIVITY_SYSTEM',                         // get system activity
    SYSTEM_CONFIG: 'SYSTEM_CONFIG',                             // configure system
}

// program operation
export const PROGRAM = {
    FACTORY_RESET: 'FACTORY_RESET',                             // factory reset access or management key
    DOWNLOAD_ACCESS_PROFILE: 'DOWNLOAD_ACCESS_PROFILE',         // download access profile to an access key
    BE_LOCK_READER: 'BE_LOCK_READER',                           // program management key to be an access lock reader to read locks' access history
    READ_ACCESS_HISTORY: 'READ_ACCESS_HISTORY',                 // read access lock history from access or management key
    BE_LOCK_INITIALIZER: 'BE_LOCK_INITIALIZER',                 // program management key to be a lock initializer
    READ_INITIALIZED_LOCK: 'READ_INITIALIZED_LOCK',             // read initialized locks
    BE_AUTHEN_TOKEN_INITIALIZER: 'BE_AUTHEN_TOKEN_INITIALIZER', // program management key to be an authen key initializer
    READ_AUTHEN_TOKEN: 'READ_AUTHEN_TOKEN',                     // read programmed authen key history
}

// key type
export const KEY_TYPE = {
    ACCESS: 'ACCESS',
    MANAGEMENT: 'MANAGEMENT',
}

// management key usage
export const KEY_USAGE = {
    LOCK_READER: 'LOCK_READER',
    LOCK_INITIALIZER: 'LOCK_INITIALIZER',
    AUTHEN_TOKEN_INITIALIZER: 'AUTHEN_TOKEN_INITIALIZER',
}

// location and scope temporary id prefix, the id will be replaced by the server
export const PREFIX = {
    LOCATION: 'loc-',
    SCOPE: 'scope-',
}

// login status
export const LS = {
    LOGGED_OUT: 0,
    LOGGING_IN: 1,
    LOGGED_IN: 2,
    LOGGING_OUT: 3,
}

// Access Profile tab values
export const ACCESS_PROFILE_TAB = {
    LOCK: 0,
    USER: 1,
    INFO: 2,
}

// Hardware Key tab values
export const HARDWARE_KEY_TAB = {
    LOCK: 0,
    USER: 1,
    HISTORY: 2,
    INFO: 3,
}

// Hardware Key Manager tab values
export const HARDWARE_KEY_MANAGER_TAB = {
    PORT: 0,
    INFO: 1,
}

// User tab values
export const USER_TAB = {
    USER: 0,
    PRIVILEGE_PROFILE: 1,
    LOCATION: 2,
    SCOPE: 3,
}

// System tab values
export const SYSTEM_TAB = {
    SERVER_MONITOR: 0,
    SERVER_CONFIG: 1,
}

// Setting tab values
export const SETTING_TAB = {
    CHANGE_PASSWORD: 0,
    RESET_PASSWORD: 1,
}

// password secure criteria
export const SECURE = {
    LONG: 'LONG',
    LOWER: 'LOWER',
    UPPER: 'UPPER',
    NUMBER: 'NUMBER',
    SYMBOL: 'SYMBOL',
}

// multi-select's MenuProps
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

// system configurations
export const CONF = {
    SYSTEM_BRAND: 'environMAN',
    SYSTEM_NAME: 'IMS Security Management System',
    UPDATE_LATEST_INTEVAL: 15000,               // (in ms) update latest data center status interval
    UPDATE_ACTIVITY_INTEVAL: 5000,              // (in ms) update activity interval
    LOAD_ACTIVITY_LATEST: 604800,               // (in seconds, i.e. 7 days) load latest period of activity upon login
    UI_DRAWER_WIDTH: 240,                       // material-ui drawer width
    UI_TREE_HEIGHT: 400,                        // location or scope tree component height
    UI_PAGE_SIZE: 10,                           // default data table page size
    UI_DEFAULT_DATE: 1577836800000,             // default date to be 2020-1-1 00:00:00
    UI_DEFAULT_DATE_FROM: 1577836800000,        // default valid from date to be 2020-1-1 00:00:00
    UI_DEFAULT_DATE_TO: 1609419599000,          // default valid to date to be 2020-1-1 00:00:00
    UI_COLUMN_ICON_WIDTH: '12em',               // datatable's icon column width
    PATH_SEPARATOR: ' > ',                      // location and scope path separator
    // max text input characters
    MAX_INPUT_CHARS: 250,                       // max input chars
    MAX_PHONE_NUMBER_CHARS: 50,                 // max phone-number input chars
    MAX_DESCRIPTION_CHARS: 1000,                // max description input chars
    // date-time format
    DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',     // date and time format
    DATE_FORMAT: 'YYYY-MM-DD',                  // date format
    TIME_FORMAT: 'HH:mm:ss',                    // time format
    // not-selected and selected row's background color
    //FIXME, the color is hard-coded for now, have to dynamically change the row's background
    BACKGROUND_COLOR_NOT_SELECTED_ROW: '#FFF',
    BACKGROUND_COLOR_SELECTED_ROW: '#EEE',
    // password settings
    PASSWORD_MIN_LENGTH: 8,                     // password minimum number of chars
    PASSWORD_SECURE: [                          // new and reset account password secure criteria
        SECURE.LONG,
        SECURE.LOWER,
        SECURE.UPPER,
        // SECURE.NUMBER,
        // SECURE.SYMBOL,
    ],
}

// application version
export const APPLICATION_VERSION = '0.1.0'

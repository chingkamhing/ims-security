# IMS Lock Management Client Application

===============================================================================
## How To Build and Run Lock Management Client

### Environment (Windows 10)

* Windows 10
* install WSL Ubuntu 18.10
* assume all following commands are invoked under WSL's bash

### Environment (Ubuntu 18.10)

* Ubuntu 18.10

### Build the client

* install npm
* install source-map-explorer in global
* install serve in global
* tools needed (as of 2020-3-13)
    + eslint@5.16.0
    + npm@6.14.2
    + parcel@1.12.4
    + serve@11.3.0
    + source-map-explorer@2.2.2
    + uglify-js@3.7.7
    + webpack@4.41.6
    + webpack-cli@3.3.10
* go to directory "web"
* invoke "make install" to download modules for the very first time (i.e. after first checkout)
* invoke "make build" to build the client in directory "build"

### How to run the client for development

#### Without server
* i.e. UI development with mock server responses on webpack development server
* note: all the data are pre-defined in "lib/simulation.js" without actual saving
* invoke "npm start" to start the development server
* the web client will be launched automatically in browser
* in the login page, input Login Name "demo.creapptive@gmail.com" and Password "1234"
* note: please refer to "lib/simulation.js" for all the simulation data

#### With static server
* i.e. production build with mock server responses on static server
* change api.js "(process.env.NODE_ENV === 'development')" to "(true)" (i.e. use mock server response)
* invoke "npm install -g serve" to install serve
* invoke "npm run build" to build the client in directory "build"
* invoke "serve -s build -l 5000" to serve static site on port 5000

#### With backend server
* i.e. UI development on real http server
* to have the webpack development server proxy API requests to the real API server, add the following line to client/package.json:
    +   "proxy": "http://localhost:80/",
* and disable mockFetch() by commenting out the following line of code in api.js
    +   mockFetch(action.payload)
* invoke "npm start" to start the development server
* the web client will be launched automatically in browser

#### Known problem

* React.useState() return stale value
    + e.g.
        - in Hardware page Lock tab, add a new lock in Lock dialog and save
        - add another new lock in Lock dialog, the Lock dialog prompt with last input values
    + found React.useState() keep returning stale values
* need to come up a better way to handle all other objects' foreign key that point to the deleted resource
    + ??? handle in both client and server side? how to make sure the data in-sync?
* users with different locations create a lots of problems
    + e.g. user X at "all" location create an access profile that is intented to be used by user Y at "all>HK-1" location
        - problem is that X might put locks in location "all" while Y's location is "all>HK-1"
        - as Y does not have access to any resources under location "all" which might crash the system
        - solution: selecting location filter out non-privileged resources
            + in Access Profile edit dialog, selecting location will immediately filter out those locks which location is above the selected location
            + however, the might hurt the user experience that he does not expect the selected locks might get filtered out
        - solution: access profile can only be created to be shared to upper location user
            + the UI should be designed to enforce higher location user can create direct resources (e.g. lock, user, key)
            + all encapsulate resources (e.g. access profile which contain locks and users) should be created by peer user
            + e.g. in Access Profile edit dialog, remove the "Location" input and always use the creator's location
            + however, this is inconvenient to the user who might just have one god admin who creates all access profiles to different location users
    + e.g. user X at "all" location is changed to "all>HK-1"
        - upon the user X login, it now fail to get all the resources "all" and crash
        - solution: only allow changing user location to higher level and prohibit changing to lower level
    + after meeting with Equinix, all the non-location resources should be hidden according to the user's location
        - list of foreign key that the server should filter out base on the user's locations
            + access profile ->
                - lock
                - user
            + key ->
                - holder
                - access profile (i.e. locks and users)
                - usage info (i.e. key and/or lock if the management key's usage is LOCK_READER or LOCK_INITIALIZER)
            + key manager ->
                - key
        - this way create code management problem that any future changes of the code might forget this filtering
    + OR make sure no non-location resource is included upon saving
        - web app need to exclude non-location resource upon creation or edit
        - server still need to censor key and/or lock in management key's usage info
        - server still need to censor read-only resource (e.g. activity)

#### Performance improvement

* 

===============================================================================
## How To Use

### Initialize the lock management system

* create a client admin user account
    + the system must have at least one user account
    + e.g. username: admin ; password: LegendCreapptive
    + the user account must has privilege to create user
    + login the user account and create a new client admin user account
        - with privilege to create user
        - with privilege to register lock, key, etc.
* initialize locks
    + register the key manager
        - plug a key manager into the network that is the same sub-net as the server
        - in Hardware -> Key Manager tab, find the "Not-registered" key manager and click "Register Key Manager" icon
        - fill in the key manager info and save to register the key manager to the server
    + register the management key
        - insert a management key to the key manager
        - in Hardware -> Key Manager tab, select the registered key manager
        - the management key should be shown in context tab
        - click "Register Key" icon to register the management key
    + add locks into the database
        - these locks should have "Initialize Status" of "Not-initialized"
        - how to get the lock's serial number? user manual input?
        - expect the user input the serial number, may use management key to read the serial number in the future
    + create initialize locks sequence
        - in Access Profile page, click on "Add Access Profile" icon
        - create an access profile (e.g. "Init locks #1") with initialize sequence that match with the locks sequence that is going to insert to
    + set the management key as usage of LOCK_INITIALIZER
        - in Hardware -> Key tab, click on Menu icon and click on "Be a lock initializer"
        - select the prepared access profile (e.g. "Init locks #1") and save
        - in context Lock tab, should show the locks with the same selection sequence
        - in context Activity tab, should show empty initialized activity
    + initialize the locks
        - insert the management key to the locks with the exact same sequence as in the access profile
    + read back the initialized lock activity
        - insert the management key back to key manager
        - in Hardware -> Key tab, in the corresponding management key, click on Menu icon and then click on "Read lock initialize history"
        - in context Activity tab, should show the inserted locks activity with exact order
        - in Hardware -> Lock tab, the initialized locks should show "Initialize Status" of "Initialized"
* security guard
    + update the access key valid period
        - ???
    + add/update/delete access key
        - ???
    + show access key activity
        - ???

===============================================================================
## Implementation run down

* 20200108 create web source project
    + invoke "npx create-react-app web" to create a boilerplate react application
    + invoke "npm install --save-dev react-scripts" to install react-scripts in devDependencies
    + invoke "npm install redux" to install redux
    + invoke "npm install react-redux" to install react redux
    + invoke "npm install redux-logger" to install redux logger
    + invoke "npm install redux-devtools-extension" to install redux development tools
    + invoke "npm install react-router-dom" to install react router
    + invoke "npm install react-thunk" to install react thunk
* create routes to different web pages
* create different web pages framework
    + Login page
    + Activity page
    + Access page
    + Hardware page
    + User page
    + System page
* create action types
* analysis the build size
    + tried to use webpack-bundle-analyzer, but "react-scripts build --stats" no longer support "--stats" to generate "build/bundle-stats.json"
    + fall back to use older source-map-explorer
    + invoke "npm install -g source-map-explorer" to install source-map-explorer
    + invoke "source-map-explorer 'build/static/js/*.js'" to generate the result html in directory /tmp
* install material-ui react framework
    + invoke "npm install @material-ui/core" to install material-ui
    + invoke "npm install @material-ui/icons" to install material icons
    + invoke "npm install @material-ui/styles" to install material styles
    + invoke "npm install typeface-roboto" to install Roboto font
* create middleware
    + create api.js, mockFetch.js and simulation.js to mock http fetch request and response
* create reducers - seperate reducer to different sub reducers
    + create ui reducer
    + create myself reducer
    + create users reducer
    + create lockManagement reducer
* create selectors to decouple the logic from reducers and components
* create a few helper UI components (e.g. popup message, loading spinner, etc.)
    + create LoadingOverlay.js to show spinner loading overlay
    + create ErrorMessage.js to show error popup message
* create custom theme
* implement Activity page
    + show Lock, Operation, and System tab
* implement AccessProfile page
    + show access profile list with context lock and user
    + add data table row (or simple) action icons: edit or delete
    + add data table global (or free) action icons: add
    + implement UI access profile add, edit and delete
    + implemented TransferList component to be able to preserve the selection order
* implement Hardware page
    + show Key, Key Manager, Lock and Authen Token tabs
    + add context action button in Key datatable
    + Key operations
        - key register, edit and deregister
        - key edit with differen context dialogs of: access, management and authen token
    + Key context tab
        - for access key: show tabs of locks, keys and lock access history
        - for management key, depends on management keys operation to show:
            * usage of LOCK_READER: 3 tabs to show locks, users and read lock access history
            * usage of LOCK_INITIALIZER: 1 tab to initialized lock history
            * usage of AUTHEN_TOKEN_INITIALIZER: FIXME, don't know what is needed to initialize authen token
        - for authen token: show authen token info
        - add Key context Info tab to show the selected key's detail information
    + Key Manager operations:
        - key manager register, edit and deregister
        - add "Register Key Manager" button to register key manager
    + Key Manager status:
        - show key manager slot context tab
        - show key manager info context tab
        - show key manager register and online status
        - show not-registered or offline key manager with info context tab only
    + Lock page
        - add lock add, edit and delete operation
        - add lock context tab to show lock detail information
    + Authen Token operations
        - remove authen token from key tab, create authen token under Hardware page
        - authen token add, edit and delete
* implement User page
    + show User and PrivilegeProfile tab
    + User operations
        - user register, edit and deregister
        - add privilege profile UI interface that add, edit and delete privilege profile
        - show location and scope tree structure
        - add TreeSelect to select location path
        - change and reset user password
        - add location UI interface that add, edit and delete location
        - add scope UI interface that add, edit and delete scope
    + Privilege Profile operations
        - privilege profile register, edit and deregister
* implement System page
    + FIXME, 
* implement data table
    + tried to use material-table
        - it is really great and has lots of features
        - easy to customize the data table
        - does not support virtual scrolling which makes it a show stopper
        - did have bug to disable action buttons and fail to set column width
        - the above 2 bugs were fixed as of 2020-3-4
    + tried to react-grid
        - it is great, has lots of features and smaller footprint than material-table
        - harder to customize the data table than material-table
        - support virtual scrolling
    + decided to use material-table mainly because of it's ease of use although there is no virtual scrolling
* implement background update logic
    + create updateLatest.js to update latest server changes periodically in the background after login
    + create updateActivity.js to update latest activity and get history and latest activity in the background after login
    + FIXME, handle any long period of key programming
* implement user privilege control
    + change API_LOGIN and API_MY_INFO to return myself info which MUST contain no foreign key (i.e. change privilegeProfileId to privilegeProfile)
    + upon login, dynamically fetch info base on the user's privilege rights
    + show navigation menus base on the user's privilege rights
    + show/hide various action icons base on the user's privilege rights
* improvements
    + add showing error in incorrect dialog inputs => marked input fields as "required" instead
    + add confirmation dialog on various operations (e.g. delete)
    + may need to improve the UI of tree edit view
    + add multiple item delete and edit Locks
    + improve all UI to show http transfer in process
        - show spinning Save button during saving
        - show in process during deleting or resetting
    + show different context menu or dialog base on online status
    + add a feature to import/export settings (e.g. locks initialization) to CSV file
    + add setting to change history period (i.e. default 7 days, user changeable of 1 ~ 12 months)
    + add a feature to change a key's valid period more conveniently
    + FIXME, add a feature to copy key A to key B
    + FIXME, support multi-language (i.e. english and simplified chinese)
* Bug:
    + tableData is added in datatable's row data after datatable navigation
        - after some datatable navigation (e.g. click different access profiles in "Access Profile" page)
        - found tableData.id is added into accessProfile and key
        - found this happened after switching from react-grid to material-table
        - google "material table tableData" found there is a bug in material-table
        - [Material Table is adding the tableData element to the Data ](https://github.com/mbrn/material-table/issues/414)
        - temporarily leave it now, just need to remove the tableData before sending any data to server
* integration with the server:
    + updated the document "IMS Lock Management System Design"
    + FIXME, not sure where the access key's programmed locks and users are saved, assumed save in access key; need to revise the UI if not (know for sure after getting Think-Lock's gateway)

===============================================================================
## Meeting minutes with XXX on 20200214:

* UI rename "Management Key" to "Offline Management Key"
* preliminarily comment all authen token features
    + remove User context tabs in different pages
* Hardware page tab change:
    + seperate Authen token to another tab
    + Lock, Key, Key Manager, Authen Token (i.e. Approve key)
* rename Approve key to Authen token
* in table, should show words with first letter captitle
* in all table, should show Name in first column instead of serial number
* change device number to serial number
* table title should use camel case
* add a user type "Key Holder" to be used in key's Owner
    + rename Owner to "Key Holder"
    + "Key Holder" has none privilege (i.e. cannot even login web page)
* be aware that it needs to be always change the key's valid period, should make it more convenient
* in access key edit dialog, should download access profile instead of users and locks
* better way to seperate the privilege-based UI:
    + e.g. security guard can only add/remove lock of a profile which in turn be downloaded to the key, change valid period
* need to add a feature to copy copy A key to B key
* in header, add client logo on left and company name in the middle
* in activity, add user setting to set the history period
    + in most case, user does not make use the history
    + default to 8 days to save traffic
* in UI, add support adding multiple profiles

* be ware that the user typically keep 2 keys, one to open and the other close
    + because the lock history cannot differentiate between open and close
    + to differentiate lock open and close, use 2 keys to do so
* provision to support multi-language
    + at least support english and simplified chinese

## Meeting minutes with XXX on 20200221:

* prepare a action items breakdown from project management point of view
* ask for a demo of how to use the ThinkLock
    + how to init a out-of-box system
    + how to init locks
    + what is the usual usage as a security guard
* implement register/update/deregister key manager
* update endpoint document for server implementation
* rename key manager "slot" to "port"
* add icon of Equinix
* add icon of environMAN (i.e. follow IMS customer portal)
* target to have internal UI demo on next Wed (i.e. 20200226)
* preliminary project name is "Security Management System"

## Meeting minutes with XXX on 20200226:
* make Description column wider
    + try change items' column width narrow/wider to make room for description
    + mouse over to show tooltips
    + click on the row to show description in context tab
* change valid period input
    + remove valid period from "Access Profile"
    + change "Access Profile" page to add description column
    + instead, set the valid period everytime programming access and management key
    + add individual context menu to just change valid period
    + ??? change multiple keys' valid period?
* change description input to multi-line input
* add "*" in every mandatory fields
* how to get the lock serial number
    + i.e. in this moment, should enable serial number input for both new and update lock info
    + [UPDATE]: after enabling editing the serial number, find a problem that the current implementation DOES NOT support changing primary key, keep disabling serial number edit for now
    + in the long run (i.e. phrase 2), should use management key to get serial number
    + e.g.
        - change management key to READ_SERIAL_NUMBER usage
        - use the management key to get 10 locks serial number by inserting the management key to the 10 locks
        - insert the management key to key manger and read back the serial numbers
        - change management key to LOCK_INITIALIZER usage
        - use the management key to initialize 10 locks serial by inserting the management key to the 10 locks in predefined sequence
        - insert the management key to key manger and read back the initialized history
* should add text input max length
    + set desciption max to 1000 chars
    + set others (e.g. name) max to 250 chars
* change "Activity" to "Activity Log"
* move the Setting page to a Setting icon beside Account icon
    + use popup page to do all the user settings
* UI demo to-do
    + add icon of Equinix
    + add icon of environMAN
    + change tree selection in all location and scope input fields
* suggestion:
    + add Report page
        + asset management
            - assets overview
            - e.g. number of "Security Management System" servers, key managers, access and management keys, locks
            - by location
            - show serial number
        + statistics
            - key and lock usage statistic
            - all users info individual info from user perspective e.g.
                - show all users in with columns of username, privilege, valid period
            - all users info individual info from privilege perspective e.g.
                - show all users in with columns of privilege, username
            - all users' log in/out statistic
            - all users online status
* later implementation
    + need confirmation on every delete
    + add multiple key, lock, etc. deletion

## Meeting minutes with Kenny Wong on 20200417:

* add changelog string field for all db-related operations (e.g. create/edit/delete user, access profile, lock, key, etc.) to ease server’s complexity
    + *comment: consider to blindly log the operation without checking content difference*
* revise: check all endpoints so that it should seperate different endpoints to database targeted, programming key and programming period
    + *comment: still believe it is best to share same "key info" between database and programming*
        - add "Extend valid period" key context menu to conveniently extend the key's valid period
* revise: after changing location and scope name will break all the existing path
    + *suggestion: change to refer to id key instead of name; e.g. change "all>HK-1>Zone 1" to "abcdef>uvwxyz>lmnopq"*
        - hard to revise the UI, need to change the UI a lot to achieve this
        - redundant parent path as each node already unique; i.e. node "lmnopq" already unique that there is no need to be "abcdef>uvwxyz>lmnopq"
        - consider further revise to refer to leave node's id key
        - need to refactor the code to rename locationPath and scopePath to locationId and scopeId
        - update: found csv export/import the location and scope in id string which is not user friendly, may need to improve to export/import in full path string
* revise: change endpoint /api/activity that one response from/to is not enough (??? add 3 from/to response for each lock, operation and system?)
    + *suggestion: may change database to group all activity in one table*
        - group all activity in one database table
        - it can limit the total rows with LIMIT while keeping 1 from-to period
        - the downside is waste of database space as all table need to share the same column schema
    * *suggestion: seperate from-to period for all different activities*
        - the logic will be more complex as application have to keep track all the downloaded period instead of one
    + *comment: the server now hard-coded to return 14 days of activity*
        - might either take a long time to download long period of activity (e.g. 1 year) or there are too many rows in the 14 days that stress the server too much
        - settle to this solution for now
* "Activity Log" -> "Operation" need to add "Location" column to show all activities with different sub-location
    + *comment: need to add locationPath and scopePath in all operation activity, and add "Location" column in datatable*
* found activity’s unixtime PK is not enough to look up all items, need to address to batch operations; in the server side will add id as PK, UI need to verify if it is fine
    + *comment: should be fine as currently the key (i.e. used to be unix-time, now object id string) of the activity is not used*
* avoid duplicate name in:
    + location and scope
    + access profile name
* hide UI features or pages of:
    + Authen Token
    + Scope
* remove the following as the server does not support "read initialized lock" yet, might be supported in the future
    + in "Hardware" -> "Lock", remove "Initi. Status" column
    + in "Hardware" -> "Key", remove context menu "Read lock initialize history"
* modify endpoint /api/user/reset to avoid sending plain password to server, the default password should be saved in the server
* verify batch lock operation that should be able to ignore, create or update base on current lock database (i.e. avoid adding another endpoint for this operation) 
    + *verified that in function handleImportLocksChange(), it does seperate to 2 endpoints to update and create locks*
* agreed on deleting any database item will remove all other database entries that foreign PK pointing to the delete item (e.g. delete "lock-001" will update all access profiles to remove "lock-001")
* add * wildcard for location and scope to lookup all items, need to add another privilege right for this
    + *comment: location and scope will be changed to be referenced by id indtead of name; which means changing location or scope name still be able to look up all the history activities; such no action will be taken*
* debug why fail to show error message from server
    + *comment: need to respons http status error code for all failed request, e.g. "Unauthorized", "Bad Request", "Forbidden", etc.*

## Meeting minutes with Kenny Wong on 20200424:

* remove locationPath and scopePath in all operation activity, and remove "Location" column in datatable
* remove access key context menu "Read access history" as the access history is read automatically upon the access key inserted in key manager
* remove management key context menu "Read lock access history" as the access history is read automatically upon the management key inserted in key manager
* bug: deregister key manager should just change to un-register status, instead of delete
    + *comment: currently, it depends on if the key is on-line or off-line; if on-line, just change to off-line status without removing the key from datatable; if off-line, change to off-line status and remove the key from datatable
    + i.e. no action is taken
* bug: datatable filter setting get cleared after a update
    + *comment: need some time to check with MaterialTable*
    + base on [Filtering states reset upon rerendering remote table #491](https://github.com/mbrn/material-table/issues/491#issuecomment-541011677)
    + columns object need to be the same without recreat each time passing to MaterialTable
    + as a result, it is better to use React hook component to save the columns in state and avoid init the columns twice in constructor() and componentDidUpdate()

## Meeting minutes with Equinix and Kenny Wong on 20200508:
* Equinix suggest: have real life activity for the demo (e.g. duplicate HK-5 data to this demo)
* FYI: in Equinix's real life data is about 2018 ~ present (2020), there are 228528 rows of activities; or roughly about 25k rows of log per month
    + i.e. system should target to handle 10k/week or 50k/month
    + web app: check with 10k activity, datatable works fine (note: tried to build with more activity, but run into "not enough heap memory" problem)
* Equinix suggest: download a period of activity as csv file (e.g. last 1/3/6/12 month); the Activity UI is relatively less important
    + change UI to download and save as file with a list of 1, 3, 6, 12 months?
    + or let the Activity background download do the job and export the csv file?
    + FIXME, will see how to implement in server (i.e. stream to client or save output as a file and let the client download the file)
* consider to show latest updated time in Activity page
    + done: added "Last activity update time" in Account info
* on the other hand, it is more important to add latest updated time in Hardware page to show the equipment latest status
    + done: added "Last database update time" in Account info
* Equinix suggest: move Hardware as the landing page; and re-arrange the tabs to be Key, Key Manager and then Lock
    + done
* Equinix asked: how to remove lock(s) from the access key
    + thought it is over-written with every programming
    + FIXME, to be clarified after knowing how the Think-Lock gateway work
* Equinix clearify: resources (e.g. users, locks, keys) with different location should not be accessed or hidden base on the current login user's location
    + server should filter out all the resources before sending to each user?
    + or the web app remove all non-privilege resources upon saving?
    + decided to hidden the non-location resource while permit to display foreign key's resources
        - e.g. an access profile has "all" location locks, a "HK-1" user can view and program "HK-1" location locks although the access profile has "all" location
        - server will provide all root user, lock and key resources regardless of the current's location and the UI need to show resources within sub-location
        - FIXME, web app need to remove the code that currently prevent non-location resources to be saved in access profile
        - FIXME, web app need to show sub-location resources (i.e. user, lock and key)
        - FIXME, web app need to change tree root node's field "parent" to null
        - FIXME, web app need to improve the UI by adding some lock filter in access profile edit dialog
* Equinix suggest: add valid end time in Hardeare -> Key tab's datatable, the datatable should be re-arrange to be: Name, Serial Number, Location, valid end period, sync time
    + done
* Equinix suggest: in Import Lock csv file, better filter files with extension of "*.csv"
    + note: already set to accept files of "*.csv" or "*.tsv"
* Equinix suggest: the datatable number of rows should have these selectable: 5, 10, 20, 50, and 100
    + done
* Equinix asked: how to relocate a batch of locks???
    + use export-then-import method
        - select a list of locks, export to a csv file
        - edit accordingly
        - import the edited csv file
    + or add another "Edit All Location" icon to edit a list of locks' location in one go
        - select a list of locks, click on a action icon
        - popup an edit dialog and show location input
        - click Save to save the location to the list of locks
    + done
* Equinix asked: is it able to have a user to be assigned with multiple locations?change tree root node's field "parent" to null
    + remove sending locationIds and scopeId on all queries in order to save traffic?
    + web app changed:
        - changed TreeSelect to support single or multiple selection
        - changed user's locationId to locationIds
* Equnix suggest: better have some filter in Access Profile lock selection
* action: email a list of privilege profiles and let Equinix comment
    + will do
* Equinix clearify: activity log should save all resources as corresponding name string instead of foreign key
    + noted
* action: append this meeting minutes to the Equinix's Excel file
* FIXME, need to handle changing user's privilege problem
    + e.g. user A change himself's location, privilege, etc.
    + e.g. user A valid period just expired
    + e.g. user A delete user B while user B is currently logged in
    + e.g. ...etc.
    + server need to support F5 refresh to reload current page
    + web app need to automatically refresh itself whenever the current user's privilege is changed

===============================================================================
## References

* [The web design process in 7 simple steps](https://webflow.com/blog/the-web-design-process-in-7-simple-steps)
* [A Beginner’s Guide to npm — the Node Package Manager](https://www.sitepoint.com/beginners-guide-node-package-manager/)
* Javascript
    + [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
    + [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#Requests)
    + [Eradicating Memory Leaks in Javascript](https://dzone.com/articles/eradicating-memory-leaks-in-javascript)
* React
    + [React - Getting Started](https://reactjs.org/docs/getting-started.html)
    + [Tutorial: How to set up React, webpack, and Babel 7 from scratch](https://www.valentinog.com/blog/babel/)
    + [Optimal file structure for React applications](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145)
    + [A Complete React Boilerplate Tutorial ](https://medium.freecodecamp.org/a-complete-react-boilerplate-tutorial-from-zero-to-hero-20023e086c4a)
    + [How To Properly Structure Your React Applications](https://expertise.jetruby.com/how-to-properly-structure-your-react-applications-5609ad3f2ee6)
    + [How I structure my React apps](https://blog.usejournal.com/how-i-structure-my-react-apps-86e897054593)
    + [How to pass a value to onClick event handler in React.js](https://ozmoroz.com/2018/07/pass-value-to-onclick-react/)
    + [Why using an index as Key in React is probably a bad idea?](https://medium.com/@vraa/why-using-an-index-as-key-in-react-is-probably-a-bad-idea-7543de68b17c)
    + [React Quickly: How to Work with Forms in React](https://www.sitepoint.com/work-with-forms-in-react/)
    + [Add confirmation dialog to React events](https://itnext.io/add-confirmation-dialog-to-react-events-f50a40d9a30d)
    + [React Conditional Rendering](https://www.robinwieruch.de/conditional-rendering-react)
    + [How To Master Advanced React Design Patterns](https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-1-dd495fa1823)
    + [Five Ways to Advanced React Patterns](https://medium.com/yazanaabed/advanced-react-patterns-7326f5a5ad1b)
    + [Advanced composition in React: cloneElement, HOCs and renderProps](https://medium.com/trabe/advanced-composition-in-react-cloneelement-hocs-and-renderprops-a20971aec50e)
    + [Learn the React Context API with a Practical Example You Can Bring to Your Apps](https://itnext.io/understanding-the-react-context-api-through-building-a-shared-snackbar-for-in-app-notifications-6c199446b80c)
    + [A guide to React refs: useRef and createRef](https://blog.logrocket.com/a-guide-to-react-refs/)
* React Route
    + [Getting started with React Router](https://codeburst.io/getting-started-with-react-router-5c978f70df91)
    + [React Router 4: A Practical Introduction](https://auth0.com/blog/react-router-4-practical-tutorial/)
    + [Protected routes and authentication with React Router v4](https://tylermcginnis.com/react-router-protected-routes-authentication/)
    + [Fixing the "cannot GET /URL" error on refresh with React Router](https://tylermcginnis.com/react-router-cannot-get-url-refresh/)
    + webpack-dev-server --hot -–history-api-fallback
* Redux
    + [Structure your React-Redux project for scalability and maintainability](https://levelup.gitconnected.com/structure-your-react-redux-project-for-scalability-and-maintainability-618ad82e32b7)
    + [Better Redux Store Structure](https://medium.com/@mitsuhideohi/better-redux-store-structure-5114bfe5bd50)
    + [How to structure the data in redux store](https://syndicode.com/2017/08/09/how-to-structure-the-data-in-redux-store/)
    + [Advanced Redux Entity Normalization](https://medium.com/@dcousineau/advanced-redux-entity-normalization-f5f1fe2aefc5)
    + [Understanding Javascript Selectors With and Without Reselect](https://medium.com/@pearlmcphee/selectors-react-redux-reselect-9ab984688dd4)
    + [What is the right way to do asynchronous operations in Redux?](https://decembersoft.com/posts/what-is-the-right-way-to-do-asynchronous-operations-in-redux/)
    + [Data fetching in Redux apps — a 100% correct approach](https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc/)
* UI
    + [Getting Started with React Material UI](https://www.devglan.com/react-js/reactjs-material-ui-example)
    + [Styling and theming with material-ui: React + Material Design](https://codex.happyfuncorp.com/styling-and-theming-with-material-ui-react-material-design-3ba2d2f0ef25)
    + [My journey to making styling with Material-UI right](https://codeburst.io/my-journey-to-make-styling-with-material-ui-right-6a44f7c68113)
    + [Get the best of your React app design by using Material-UI Theme](https://blog.bam.tech/developer-news/get-the-best-of-your-react-app-design-by-using-material-ui-theme)
    + [How to Customize Material-ui theme v3.2.0](https://medium.com/@siriwatknp/how-to-customize-material-ui-theme-v3-2-0-part-1-13e67acc8f80)
    + [Example of React JS with Material UI components](https://www.golangprograms.com/example-of-react-js-with-material-ui-components.html)
    + [React.js Examples - Tree](https://reactjsexample.com/tag/tree/)
* cookie
    + [Using Cookies with React, Redux and React Router 4](https://medium.com/@rossbulat/using-cookies-in-react-redux-and-react-router-4-f5f6079905dc)
* export to csv file
    + [Create and download data in CSV format using plain JavaScript](https://code-maven.com/create-and-download-csv-with-javascript)
    + [StreamSaver.js](https://freesoft.dev/program/60125647)
    + [Papa Parse](https://www.papaparse.com/)
* development
    + [How to get "create-react-app" to work with your API](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)
* deployment
    + [Update a Single Page App on Code Change Without Draining The Battery](https://marmelab.com/blog/2016/08/29/auto-reload-spa-on-mobile-setinterval.html)

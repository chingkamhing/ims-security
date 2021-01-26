# IMS Security Management Service

This project implement ims-security by pulling web and microservices together:
* web app is from project/web/ims-security
* server sources are made from various microservices from project/microservices
* use git subrepo to pull all the projects together
* this serve the project root for all microservices that will be implemented with golang; so, init'd with "go mod init creapptive.com/ims-security"
* populate go.mod with some versioned libraries by invoking "./install-libraries.sh"

-------------------------------------------------------------------------------
## How To Build and Run IMS Security Management Service

### Environment (Ubuntu 20.04)
* Ubuntu 20.04

### Build the binary
* 

### How to deploy customerportal
* bare machine/VM
* docker

-------------------------------------------------------------------------------
## Microservices Design

### API gateway (or Edge server)
Entry point to the microservices
* APIs
    + *apis*
        - route to or aggregate various internal services
    + *public path*
        - serve as static web server

### Authen
Authenticate server
* APIs
    + authenication
        - Login
        - ChangePassword
        - ResetPassword
* Events
    + authen.login_success
    + authen.login_fail
    + authen.password_changed
    + authen.password_reset

### User
User related service
* APIs
    + user
        - CreateUser
        - UpdateUser
        - DeleteUser
        - GetUsers
        - GetMyself
    + privilege profile
        - GetPrivilegeProfile
        - CreatePrivilegeProfile
        - UpdatePrivilegeProfile
        - DeletePrivilegeProfile
    + location
        - GetLocationTree
        - UpdateLocationTree
    + scope
        - GetScopeTree
        - UpdateScopeTree
    + change version
        - ChangeVersion
* Events
    + user.user_created
    + user.user_updated
    + user.user_deleted
    + privilege_profile.privilege_profile_created
    + privilege_profile.privilege_profile_updated
    + privilege_profile.privilege_profile_deleted
    + location.location_updated
    + scope.scope_updated

### Hardware
Hardware related service
* APIs
    + access profile
        - GetProfiles
        - CreateProfile
        - UpdateProfile
        - DeleteProfile
    + key
        - GetKeys
        - RegisterKey
        - UpdateKey
        - DeregisterKey
        - ProgramKey
    + key manager
        - GetKeyManagers
        - RegisterKeyManager
        - UpdateKeyManager
        - DeregisterKeyManager
    + lock
        - GetLocks
        - RegisterLock
        - UpdateLock
        - DeregisterLock
    + authen token
        - GetAuthenTokens
        - RegisterAuthenToken
        - UpdateAuthenToken
        - DeregisterAuthenToken
    + change version
        - ChangeVersion
* Events
    + access_profile.access_profile_created
    + access_profile.access_profile_updated
    + access_profile.access_profile_deleted
    + key.key_registered
    + key.key_updated
    + key.key_programmed
    + key.key_deregistered
    + key_manager.key_manager_registered
    + key_manager.key_manager_updated
    + key_manager.key_manager_deregistered
    + lock.lock_registered
    + lock.lock_updated
    + lock.lock_deregistered
    + authen_token.authen_token_registered
    + authen_token.authen_token_updated
    + authen_token.authen_token_deregistered

### Activity
Activity service that hold system wide activities e.g. user, hardware, system status, etc.
* APIs
    + GetActivities
    + SetNotification

### Notification
Notification service that send notification (e.g. email) to user
* APIs
    + SendNotification
+ Events
    + notification.emailed

### Push
Push message to the clients through websocket
* APIsapigateway
    + OnLine
    + OffLine
* Events
    + OnLine
    + OffLine

-------------------------------------------------------------------------------
## Implementation run down

### Manage sub-repo directories
* invoke "git-subrepo clone [git repo directory or url] [optional local directory name]" to clone sub-project (e.g. protobuf api, microservices, lib, etc.) to a subrepo directory
* note: in order to have git-subrepo work, the [git repo] MUST be a bare git repository
* e.g. git-subrepo clone ../microservices/ims-security-api/ api
* invoke "./git-subrepo-pull.sh -a" regularly to pull changes from remote master
* invoke "./git-subrepo-push.sh -a" regularly to push changes to remote master
* current directory config
    + directory "~/work/creapptive/repository/" hold all the bare git repository
    + directory "~/work/creapptive/project/" hold all the project as local working copy
    + create new microservice under directory "~/work/creapptive/project/microservices/"
    + go to "~/work/creapptive/project/microservices/"
    + invoke "git clone --bare [source repo dir] [destination repo dir]" to save the bare git repository
    + e.g. git clone --bare apigateway/ ~/work/creapptive/repository/microservices/apigateway
    + invoke "git -C [repo dir] remote add origin [bare git repo]" to config the working copy's remote
    + e.g. git -C apigateway/ remote add origin ~/work/creapptive/repository/microservices/apigateway
    + invoke "git -C [repo dir] branch --set-upstream-to=origin/master master" to config upstream master
    + e.g. git -C apigateway/ branch --set-upstream-to=origin/master master
    + create directory "~/work/creapptive/project/ims-security" as this project's root directory
    + go to project root directory
    + invoke "git-subrepo clone [source repo dir] [optional destination repo dir]" to pull all the needed sub projects
    + e.g. git-subrepo clone ~/work/creapptive/repository/microservices/apigateway/

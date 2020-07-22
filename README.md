This project implement ims-security by pulling web and microservices together:

* web app is from project/web/ims-security
* server sources are made from various microservices from project/microservices
* use git subrepo to pull all the projects together
* this serve the project root for all microservices that will be implemented with golang; so, init'd with "go mod init creapptive.com/ims-security"
* populate go.mod with some versioned libraries by invoking "./install-libraries.sh"

Manage sub-repo directories:
* invoke "git-subrepo clone <git repo directory or url> [optional local directory name]" to clone sub-project (e.g. protobuf api, microservices, lib, etc.) to a subrepo directory
* e.g. git-subrepo clone ../microservices/ims-security-api/ api
* invoke "./git-subrepo-pull.sh -a" regularly to pull changes from remote master
* invoke "./git-subrepo-push.sh -a" regularly to push changes to remote master

This project implement ims-security by pulling web and microservices together:

* web app is from project/web/ims-security
* server sources are made from various microservices from project/microservices
* use git subrepo to pull all the projects together
* this serve the project root for all microservices that will be implemented with golang; so, init'd with "go mod init creapptive.com/ims-security"
* populate go.mod with some versioned libraries by invoking "./install-libraries.sh"

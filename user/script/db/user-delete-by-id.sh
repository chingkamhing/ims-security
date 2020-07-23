#!/bin/bash
#
# Script file to use mongo client to delete a user by the specified ID.
#

URL="localhost:27017"
DB_NAME=${IMS_SECURITY_SERVICE_USER_DATABASE_DBNAME:="imsSecurityUserDB"}
NUM_ARGS=1

# Function
SCRIPT_NAME=${0##*/}
Usage () {
	echo
	echo "Description:"
	echo "Script file to use mongo client to delete a user by the specified ID."
	echo
	echo "Prerequisite:"
	echo "The following environment variables are set,"
	echo "IMS_SECURITY_SERVICE_AUTHEN_DATABASE_DBNAME: database name"
	echo "IMS_SECURITY_SERVICE_AUTHEN_DATABASE_USER: database user name"
	echo "IMS_SECURITY_SERVICE_AUTHEN_DATABASE_PASSWORD: database password"
	echo
	echo "Usage: $SCRIPT_NAME [id]"
	echo "Options:"
	echo " -u  [url]                    MongoDB server URL (default: $URL)"
	echo " -h                           This help message"
	echo
}

# Parse input argument(s)
while [ "${1:0:1}" == "-" ]; do
	OPT=${1:1:1}
	case "$OPT" in
	"u")
		URL=$2
		shift
		;;
	"h")
		Usage
		exit
		;;
	esac
	shift
done

if [ "$#" -ne "$NUM_ARGS" ]; then
    echo "Invalid parameter!"
	Usage
	exit 1
fi

# trim URL trailing "/"
URL="$(echo -e "${URL}" | sed -e 's/\/*$//')"

ID=$1

EVAL="db.users.deleteOne({ \"_id\" : ObjectId(\"$ID\") })"

# change user password
mongo ${URL}/${DB_NAME} -u ${IMS_SECURITY_SERVICE_USER_DATABASE_USER} -p ${IMS_SECURITY_SERVICE_USER_DATABASE_PASSWORD} --eval "${EVAL}"

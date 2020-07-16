#!/bin/bash
#
# Script file to use curl command to get all users info.
#

URL="http://localhost"
ENDPOINT="api/user/info"
NUM_ARGS=0
FILE_COOKIE=".cookie"
OPTS=""

# Function
SCRIPT_NAME=${0##*/}
Usage () {
	echo
	echo "Description:"
	echo "Script file to use curl command to get user info."
	echo
	echo "Usage: $SCRIPT_NAME"
	echo "Options:"
	echo " -k                           Allow https insecure connection"
	echo " -u  [url]                    IMS Customer Portal URL"
	echo " -h                           This help message"
	echo
}

# Parse input argument(s)
while [ "${1:0:1}" == "-" ]; do
	OPT=${1:1:1}
	case "$OPT" in
	"k")
		OPTS="$OPTS -k"
		;;
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

# show user info
curl $OPTS -v --cookie-jar $FILE_COOKIE --cookie $FILE_COOKIE -H 'Accept: application/json' ${URL}/${ENDPOINT}

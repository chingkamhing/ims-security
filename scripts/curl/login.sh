#!/bin/bash
#
# Script file to use curl command to login with input username and password.
#

URL="http://localhost"
ENDPOINT="api/account/login"
NUM_ARGS=1
FILE_COOKIE=".cookie"
OPTS=""

# Function
SCRIPT_NAME=${0##*/}
Usage () {
	echo
	echo "Description:"
	echo "Script file to use curl command to login with input username and password."
	echo
	echo "Usage: $SCRIPT_NAME [username]"
	echo "Options:"
	echo " -k                           Allow https insecure connection"
	echo " -p  [password]               Login password"
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
	"p")
		PASSWORD=$2
		shift
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

USERNAME=$1

if [ "$PASSWORD" == "" ]; then
	# prompt for the password
	echo -n "Plase enter the password: "
	read -s PASSWORD
	echo
fi

# list all users' info
curl $OPTS -vd "{\"username\":\"$USERNAME\", \"password\":\"$PASSWORD\"}" --cookie-jar $FILE_COOKIE --cookie $FILE_COOKIE -H 'Accept: application/json' ${URL}/${ENDPOINT}

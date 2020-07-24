#!/bin/bash
#
# Script file to create a new user.
#

URL="http://localhost"
ENDPOINT="api/user/create"
NUM_ARGS=6
FILE_COOKIE=".cookie"
OPTS=""

# Function
SCRIPT_NAME=${0##*/}
Usage () {
	echo
	echo "Description:"
	echo "Script file to create a new user."
	echo
	echo "Usage: $SCRIPT_NAME [username] [name] [email] [phone number] [privilege profile id] [description]"
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
NAME=$2
EMAIL=$3
PHONE_NUMBER=$4
PRIVILEGE_PROFILEl_ID=$5
DESCRIPTION=$6

if [ "$PASSWORD" == "" ]; then
	# prompt for the password
	echo -n "Plase enter the password: "
	read -s PASSWORD
	echo
fi

# list all users' info
curl $OPTS -vd "{ \
		\"user\":{ \
			\"username\":\"$USERNAME\", \
			\"password\":\"$PASSWORD\", \
			\"name\":\"$NAME\", \
			\"email\":\"$EMAIL\", \
			\"phoneNumber\":\"$PHONE_NUMBER\", \
			\"privilegeProfileID\":\"$PRIVILEGE_PROFILEl_ID\", \
			\"description\":\"$DESCRIPTION\" \
		} \
	}" --cookie-jar $FILE_COOKIE --cookie $FILE_COOKIE -H 'Accept: application/json' ${URL}/${ENDPOINT}

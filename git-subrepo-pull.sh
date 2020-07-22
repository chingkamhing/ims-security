#!/bin/bash

#
# Script to git-subrepo pull subrepo directories from their remote master.
#

# array of subrepo directory
IS_SYNC_ALL=false
# at lease 1 argument
NUM_ARGS=1

# Function
SCRIPT_NAME=${0##*/}
Usage () {
	echo
	echo "Description:"
	echo "Script to git-subrepo pull subrepo directories from their remote master."
	echo
	echo "Usage: $SCRIPT_NAME [subrepo_dir...]"
	echo "Options:"
	echo " -a                           All subrepo directories"
	echo " -h                           This help message"
	echo
}

# Parse input argument(s)
while [ "${1:0:1}" == "-" ]; do
	OPT=${1:1:1}
	case "$OPT" in
	"a")
		IS_SYNC_ALL=true
		;;
	"h")
		Usage
		exit
		;;
	esac
	shift
done

SUBREPO_DIRS=$*

if [ "$IS_SYNC_ALL" = false ] && [ "$#" -lt "$NUM_ARGS" ]; then
    echo "Invalid parameter!"
	Usage
	exit 1
fi

if [ "$IS_SYNC_ALL" = true ]; then
	echo "git-subrepo pull from all..."
    git-subrepo pull --all
else
	echo "git-subrepo pull from $SUBREPO_DIRS..."
	dirs=($SUBREPO_DIRS)
	for dir in "${dirs[@]}"; do
		subrepo_dir=$(basename $dir)
		git-subrepo pull $subrepo_dir
	done
fi

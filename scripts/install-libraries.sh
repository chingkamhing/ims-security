#!/bin/bash

#
# Script to install various go libraries. As micro project keep updating pretty frequently, it is very likely that the code is broken and vital to checkout a versioned snapshoot.
#

# the latest micro/go-micro is 3.5.0 as of 20210203
GOMICRO_VERSION=3.5.0
# the latest micro/micro is 3.0.4 as of 20210203
MICRO_VERSION=3.0.4
# either 0 argument
NUM_ARGS=0

# Function
SCRIPT_NAME=${0##*/}
Usage () {
	echo
	echo "Description:"
	echo "Script to install various go libraries. As micro project keep updating pretty frequently, it is very likely that the code is broken and vital to checkout a versioned snapshoot."
	echo
	echo "Usage: $SCRIPT_NAME"
	echo "Options:"
	echo " -h                           This help message"
	echo
}

# Parse input argument(s)
while [ "${1:0:1}" == "-" ]; do
	OPT=${1:1:1}
	case "$OPT" in
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

# get go-micro
go get -v github.com/micro/go-micro/v3@v${GOMICRO_VERSION}

# get micro
go get -v github.com/micro/micro/v3@v${MICRO_VERSION}

# get other protocol buffer libraries
go get -u -v github.com/golang/protobuf/proto
go get -u -v github.com/golang/protobuf/protoc-gen-go
go get -u -v github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway
go get -u -v github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger
go get -u -v github.com/micro/protobuf/protoc-gen-go
go get -u -v github.com/favadi/protoc-go-inject-tag

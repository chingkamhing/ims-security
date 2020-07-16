#!/bin/bash

#
# Script to install various go libraries. As micro project keep updating pretty frequently, it is very likely that the code is broken and vital to checkout a versioned snapshoot.
#

# the latest micro/go-micro is 2.9.1 as of 20200715
GOMICRO_VERSION=2.9.1
# the latest micro/micro is 2.9.3 as of 20200715
MICRO_VERSION=2.9.3
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
go get github.com/micro/go-micro/v2@v${GOMICRO_VERSION}

# get micro
go get github.com/micro/micro/v2@v${MICRO_VERSION}

# get other protocol buffer libraries
go get -u -v github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway
go get -u -v github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger
go get -u -v github.com/golang/protobuf
go get -u -v github.com/micro/protobuf/protoc-gen-go

#
# Note:
# * as of 20200709
# * try to implement go-micro grpc gateway on [GRPC Gateway](https://m3o.com/docs/grpc-gateway.html)
# 	  + compile the project with stock checkout code, success to compile
#     + try to compile *.proto and compile the project, fail to compile
# * keep having "undefined: grpc.SupportPackageIsVersion6" and other similar errors
# * base on [Getting error undefined: grpc.SupportPackageIsVersion6 and undefined: grpc.ClientConnInterface](https://github.com/grpc/grpc-go/issues/3347)
#     * google.golang.org/grpc v1.27.0 can fix the problem
#         - however, base on sample code generated from "micro new <project>", go.mod always replace google.golang.org/grpc to v1.26.0
#         - this suggest current go-micro must use google.golang.org/grpc v1.26.0 or lower version
#         - which means this solution is not feasible
#         - for detail, invoke "micro new example" to generate an "example" project and check example/go.mod
#     + another solution is use protoc-gen-go (from github.com/golang/protobuf) v1.3.2 to generate *.pb.go which can fix the problem
#         - base on git log, SupportPackageIsVersion6 was first introduced in github.com/golang/protobuf@v1.3.3
#         - decide to use a ubuntu docker to compile *.proto to better control the version of the go modules
#         - in Dockerfile, tried to force to use protoc-gen-go v1.3.2 by "go get -u -v github.com/golang/protobuf@v1.3.2"
#         - but still fail to compile with same "undefined: grpc.SupportPackageIsVersion6" errors
#         - check github.com/golang/protobuf, it's latest tag is v1.4.2 not v1.3.2
#         - somehow, "go get -u -v github.com/golang/protobuf@v1.3.2" fail to forcefully check out v1.3.2
#     + try to compile github.com/golang/protobuf v1.3.2 manually
#         - save the original "/home/kamching/workspace/go/bin/protoc-gen-go" as "/home/kamching/workspace/go/bin/protoc-gen-go.v1.4.2"
#         - in terminal, go to directory "github.com/golang/protobuf"
#         - invoke "git fetch --all --tags" to fetch all tags info
#         - invoke "git checkout v1.3.2" to switch to v1.3.2
#         - invoke "make" to go install github.com/golang/protobuf with v1.3.2
#         - after all these, success to generate micro/examples/gateway *.proto and build the project
#         - follow section [Running the example](https://m3o.com/docs/grpc-gateway.html#running-the-example) and success to run
#         - further try with various tags of v1.3.0, v1.2.0, v1.1.0, and v1.0.0, found v1.0.0 has the least difference between original *.pb.go and *.pb.gw.go
#
# manually build github.com/golang/protobuf@v1.0.0 and "make install" of the project
# * don't know how to check the version of protoc-gen-go, use file "protoc-gen-go.latest" as checker to determine if protoc-gen-go v1.0.0 is installed
#
PROTOC_GEN_GO=$(which protoc-gen-go)
PROTOC_GEN_GO_LATEST="${PROTOC_GEN_GO}.latest"
PROTOC_GEN_GO_VERSION="v1.0.0"
if [ "$PROTOC_GEN_GO" != "" ]; then
	# github.com/golang/protobuf properly installed
	if [ ! -f "$PROTOC_GEN_GO_LATEST" ]; then
		# believe the latest of protoc-gen-go is not backup yet, save it now
		echo "No $PROTOC_GEN_GO_LATEST. Install github.com/golang/protobuf v1.0.0 to fix gateway compile error."
		mv $PROTOC_GEN_GO $PROTOC_GEN_GO_LATEST
		# checkout specify version tag of github.com/golang/protobuf and install the project
		cd ${GOPATH}/src/github.com/golang/protobuf
		git fetch --all --tags
		git checkout $PROTOC_GEN_GO_VERSION
		make install
		cp $PROTOC_GEN_GO ${PROTOC_GEN_GO}.${PROTOC_GEN_GO_VERSION}
		git checkout master
		cd -
		echo "protoc-gen-go is changed to $PROTOC_GEN_GO_VERSION and the original one is saved to $PROTOC_GEN_GO_LATEST."
	else
		echo "Believe protoc-gen-go $PROTOC_GEN_GO_VERSION installed properly. protoc-gen-go is not changed."
	fi
else
	echo "Fail to locate \"protoc-gen-go\"!"
	echo "Please varify if github.com/golang/protobuf installed properly."
fi

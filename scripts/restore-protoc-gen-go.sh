#!/bin/bash
#
# In order to make the generated *.pb.go to be compilable, need to use protoc-gen-go v1.0.0. From time to time, the protoc-gen-go might somehow be updated by go get or update. This script restore the saved v1.0.0 to protoc-gen-go.
#
# Note:
# * with protoc-gen-go v1.0.0, it should compile *.proto file without any message nor warning (i.e. empty printf except just a newline)
# * please refer to [Getting error undefined: grpc.SupportPackageIsVersion6 and undefined: grpc.ClientConnInterface](https://github.com/grpc/grpc-go/issues/3347)
#

PROTOC_GEN_GO=$(which protoc-gen-go)
PROTOC_GEN_GO_VERSION="v1.0.0"
PROTOC_GEN_GO_OLD="${PROTOC_GEN_GO}.old"
PROTOC_GEN_GO_GOOD="${PROTOC_GEN_GO}.${PROTOC_GEN_GO_VERSION}"

# Q: check if protoc-gen-go is installed and if the good version of it exist?
if [ "$PROTOC_GEN_GO" != "" ] && [ -f "$PROTOC_GEN_GO_GOOD" ]; then
    CS_PROTOC_GEN_GO=($(md5sum $PROTOC_GEN_GO))
    CS_PROTOC_GEN_GO_GOOD=($(md5sum $PROTOC_GEN_GO_GOOD))
    # Q: check if the current protoc-gen-go and the good version is the same?
    if [ "$CS_PROTOC_GEN_GO" == "$CS_PROTOC_GEN_GO_GOOD" ]; then
        echo "Current protoc-gen-go is already $PROTOC_GEN_GO_VERSION, no need to restore."
    else
        mv $PROTOC_GEN_GO $PROTOC_GEN_GO_OLD
        cp $PROTOC_GEN_GO_GOOD $PROTOC_GEN_GO
        echo "Saved the original protoc-gen-go as $PROTOC_GEN_GO_OLD and restored with $PROTOC_GEN_GO_VERSION."
    fi
fi

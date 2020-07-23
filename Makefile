#
# Makefile to build binaries
#

GOPATH:=$(shell go env GOPATH)
MODIFY=Mproto/imports/api.proto=github.com/micro/go-micro/v2/api/proto
PROTO_DIR=api

# make specified directory
.PHONY: all
all: proto
	make -C apigateway
	make -C gateway
	make -C authen
	make -C user

# make proto for various directories
# note: as protoc-gen-go v1.0.0 does not support "paths=source_relative", need to manually move all the generated *.pb.go to directory "proto"; v1.1.0 or later support "paths=source_relative", but it generate extra XXXxxx fields for all messages which might be memory consuming, so dropped the idea to use v1.1.0
.PHONY: proto
proto:
	# model
	protoc -I=./api/pb --micro_out=${MODIFY},paths=source_relative:${PROTO_DIR}/model --go_out=${MODIFY}:${PROTO_DIR}/model model.proto && \
		mv -f ${PROTO_DIR}/model/creapptive.com/ims-security/api/model/* ${PROTO_DIR}/model/ && \
		rm -rf ${PROTO_DIR}/model/creapptive.com
	# message
	protoc -I=./api/pb --micro_out=${MODIFY},paths=source_relative:${PROTO_DIR}/message --go_out=${MODIFY}:${PROTO_DIR}/message message.proto && \
		mv -f ${PROTO_DIR}/message/creapptive.com/ims-security/api/message/* ${PROTO_DIR}/message/ && \
		rm -rf ${PROTO_DIR}/message/creapptive.com
	# apigateway
	protoc -I=./api/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway --swagger_out=logtostderr=true:${PROTO_DIR}/apigateway apigateway.proto && \
	protoc -I=./api/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway --grpc-gateway_out=logtostderr=true:${PROTO_DIR}/apigateway apigateway.proto && \
	protoc -I=./api/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway --go_out=plugins=grpc:${PROTO_DIR}/apigateway apigateway.proto && \
		mv -f ${PROTO_DIR}/apigateway/creapptive.com/ims-security/api/apigateway/* ${PROTO_DIR}/apigateway/ && \
		rm -rf ${PROTO_DIR}/apigateway/creapptive.com
	# gateway
	protoc -I=./api/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway --micro_out=${MODIFY},paths=source_relative:${PROTO_DIR}/gateway --go_out=${MODIFY}:${PROTO_DIR}/gateway apigateway.proto && \
		mv -f ${PROTO_DIR}/gateway/creapptive.com/ims-security/api/apigateway/* ${PROTO_DIR}/gateway/ && \
		rm -rf ${PROTO_DIR}/gateway/creapptive.com
	# authen
	protoc -I=./api/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --micro_out=${MODIFY},paths=source_relative:${PROTO_DIR}/authen --go_out=${MODIFY}:${PROTO_DIR}/authen authen.proto && \
		mv -f ${PROTO_DIR}/authen/creapptive.com/ims-security/api/authen/* ${PROTO_DIR}/authen/ && \
		rm -rf ${PROTO_DIR}/authen/creapptive.com
	# user
	protoc -I=./api/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --micro_out=${MODIFY},paths=source_relative:${PROTO_DIR}/user --go_out=${MODIFY}:${PROTO_DIR}/user user.proto && \
		mv -f ${PROTO_DIR}/user/creapptive.com/ims-security/api/user/* ${PROTO_DIR}/user/ && \
		rm -rf ${PROTO_DIR}/user/creapptive.com

.PHONY: docker
docker: proto
	docker build -f apigateway/Dockerfile -t ims_security/apigateway .
	docker build -f gateway/Dockerfile -t ims_security/gateway .
	docker build -f authen/Dockerfile -t ims_security/authen .
	docker build -f user/Dockerfile -t ims_security/user .

.PHONY: clean
clean:
	rm -f ${PROTO_DIR}/model/*.go
	rm -f ${PROTO_DIR}/message/*.go
	rm -f ${PROTO_DIR}/apigateway/*.go
	rm -f ${PROTO_DIR}/apigateway/apigateway.swagger.json
	rm -f ${PROTO_DIR}/gateway/*.go
	rm -f ${PROTO_DIR}/authen/*.go
	rm -f ${PROTO_DIR}/user/*.go
	make -C apigateway clean
	make -C gateway clean
	make -C authen clean
	make -C user clean

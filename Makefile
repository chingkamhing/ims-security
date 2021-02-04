#
# Makefile to build binaries
#

GOPATH:=$(shell go env GOPATH)
PROTO_DIR=api

# build gateway and services
.PHONY: build
build:
	make -C apigateway
	make -C gateway
	make -C authen
	make -C user

# make proto for various directories
.PHONY: proto
proto:
	# model
	protoc -I=${PROTO_DIR}/pb --micro_out=paths=source_relative:${PROTO_DIR}/model --go_out=paths=source_relative:${PROTO_DIR}/model model.proto && \
	protoc-go-inject-tag -input=${PROTO_DIR}/model/model.pb.go
	# message
	protoc -I=${PROTO_DIR}/pb --micro_out=paths=source_relative:${PROTO_DIR}/message --go_out=paths=source_relative:${PROTO_DIR}/message message.proto
	# apigateway
	protoc -I=${PROTO_DIR}/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway --swagger_out=logtostderr=true:${PROTO_DIR}/apigateway apigateway.proto && \
	protoc -I=${PROTO_DIR}/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway --grpc-gateway_out=logtostderr=true:${PROTO_DIR}/apigateway apigateway.proto && \
	protoc -I=${PROTO_DIR}/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway --go_out=plugins=grpc:${PROTO_DIR}/apigateway apigateway.proto && \
		mv -f ${PROTO_DIR}/apigateway/creapptive.com/ims-security/api/apigateway/* ${PROTO_DIR}/apigateway/ && \
		rm -rf ${PROTO_DIR}/apigateway/creapptive.com
	# gateway
	protoc -I=${PROTO_DIR}/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway --micro_out=paths=source_relative:${PROTO_DIR}/gateway --go_out=paths=source_relative:${PROTO_DIR}/gateway apigateway.proto
	# authen
	protoc -I=${PROTO_DIR}/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --micro_out=paths=source_relative:${PROTO_DIR}/authen --go_out=paths=source_relative:${PROTO_DIR}/authen authen.proto && \
	protoc-go-inject-tag -input=${PROTO_DIR}/authen/authen.pb.go
	# user
	protoc -I=${PROTO_DIR}/pb -I=${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --micro_out=paths=source_relative:${PROTO_DIR}/user --go_out=paths=source_relative:${PROTO_DIR}/user user.proto

.PHONY: docker
docker: proto
	docker build -f apigateway/Dockerfile -t ims_security/apigateway .
	docker build -f gateway/Dockerfile -t ims_security/gateway .
	docker build -f authen/Dockerfile -t ims_security/authen .
	docker build -f user/Dockerfile -t ims_security/user .

# generate proto files and build gateway and services
.PHONY: all
all: proto build

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

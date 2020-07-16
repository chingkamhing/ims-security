#
# Makefile to build the executive binary
#

OUTPUT=gateway-service

.PHONY: build
build:
	go build -o ${OUTPUT} *.go

.PHONY: test
test:
	go test -v ./... -cover

.PHONY: docker
docker:
	docker build . -t ims_security/${OUTPUT}:latest

.PHONY: clean
clean:
	rm -f ${OUTPUT}

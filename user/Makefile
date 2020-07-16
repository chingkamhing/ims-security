#
# Makefile to build the executive binary
#

OUTPUT=user-service

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

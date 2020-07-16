#
# Makefile to build the executive binary
#

GO=go
OUTPUT=simdata
GEN_FILE=activity.js

WHICH_GO := $(shell which go.exe)
ifneq ($(WHICH_GO),)
	GO:=$(GO).exe
	NATIVE_OUTPUT:=$(OUTPUT).exe
else
	NATIVE_OUTPUT:=$(OUTPUT)
endif

.PHONY: all build data clean

all: build data

build:
	$(GO) build -o $(NATIVE_OUTPUT) *.go

data:
	./$(NATIVE_OUTPUT) > $(GEN_FILE)

clean:
	rm -rf $(NATIVE_OUTPUT)


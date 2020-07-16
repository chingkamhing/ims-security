#!/bin/bash

#
# Run all services.
#

{ ./gateway/gateway --registry=mdns --server_address=localhost:9090 & } ; \
{ ./authen/authen --registry=mdns --server_address=localhost:9091 & } ; \
{ ./user/user --registry=mdns --server_address=localhost:9092 & } ; \
	./apigateway/apigateway
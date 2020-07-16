#
# Makefile to build the executive binary
#

.PHONY: build all install update list start docker clean

build:
	npm run build
	npm run stats

all: install build

install:
	# install dependency modules
	npm install

update:
	# update all global packages and local modules
	npm update -g
	npm update

list:
	# list global packages
	npm list -g --depth 0

start:
	# start web development server
	npm run start

docker:
	# note: from http://blog.code4hire.com/2018/06/define-named-volume-with-host-mount-in-the-docker-compose-file/
	# - MUST delete the volume before re-building the volume container and docker-compose up
	#-docker volume rm ims_customer_portal_web_data
	# docker build images and tag it
	#docker build -f Dockerfile -t creapptive/ims_customer_portal_react:latest .
	#docker build -f Dockerfile-server -t creapptive/ims_customer_portal_server:latest .
	#docker build -f Dockerfile-public -t creapptive/ims_customer_portal_public:latest .

clean:
	rm -rf node_modules
	rm -rf build

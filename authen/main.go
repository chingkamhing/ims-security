package main

import (
	"github.com/micro/go-micro/v2"
	log "github.com/micro/go-micro/v2/logger"

	authen "creapptive.com/ims-security/api/authen"
	"creapptive.com/ims-security/authen/handler"
	"creapptive.com/ims-security/authen/subscriber"
)

func main() {
	// New Service
	service := micro.NewService(
		micro.Name("creapptive.service.authen"),
		micro.Version("latest"),
	)

	// Initialise service
	service.Init()

	// Register Handler
	authen.RegisterAuthenHandler(service.Server(), new(handler.Authen))

	// Register Struct as Subscriber
	micro.RegisterSubscriber("creapptive.service.authen", service.Server(), new(subscriber.Authen))

	// Run service
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}

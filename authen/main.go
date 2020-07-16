package main

import (
	"github.com/micro/go-micro/v2"
	log "github.com/micro/go-micro/v2/logger"

	authen "creapptive/go-micro/api/authen"
	"creapptive/go-micro/authen-service/handler"
	"creapptive/go-micro/authen-service/subscriber"
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

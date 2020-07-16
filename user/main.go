package main

import (
	"github.com/micro/go-micro/v2"
	log "github.com/micro/go-micro/v2/logger"

	user "creapptive/go-micro/api/user"
	"creapptive/go-micro/user-service/handler"
	"creapptive/go-micro/user-service/subscriber"
)

func main() {
	// New Service
	service := micro.NewService(
		micro.Name("creapptive.service.user"),
		micro.Version("latest"),
	)

	// Initialise service
	service.Init()

	// Register Handler
	user.RegisterUserHandler(service.Server(), new(handler.User))

	// Register Struct as Subscriber
	micro.RegisterSubscriber("creapptive.service.user", service.Server(), new(subscriber.User))

	// Run service
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}

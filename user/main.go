package main

import (
	"github.com/micro/go-micro/v2"
	log "github.com/micro/go-micro/v2/logger"

	user "creapptive.com/ims-security/api/user"
	"creapptive.com/ims-security/user/handler"
	"creapptive.com/ims-security/user/subscriber"
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

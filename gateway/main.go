package main

import (
	"github.com/micro/go-micro/v2"
	log "github.com/micro/go-micro/v2/logger"

	gateway "creapptive.com/ims-security/api/gateway"
	"creapptive.com/ims-security/gateway/handler"
)

func main() {
	// New Service
	service := micro.NewService(
		micro.Name("creapptive.service.gateway"),
		micro.Version("latest"),
	)

	// Initialise service
	service.Init()

	// Register Handler
	gateway.RegisterApigatewayHandler(service.Server(), handler.New(service.Client()))

	// Run service
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}

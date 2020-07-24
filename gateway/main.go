package main

import (
	"github.com/micro/cli/v2"
	"github.com/micro/go-micro/v2"
	log "github.com/micro/go-micro/v2/logger"

	gateway "creapptive.com/ims-security/api/gateway"
	"creapptive.com/ims-security/gateway/cmd"
	"creapptive.com/ims-security/gateway/handler"
)

// this microservice name
const serviceName = "creapptive.service.gateway"

// other services' name
var serviceNameMap = map[string]string{
	"authen":   "creapptive.service.authen",
	"hardware": "creapptive.service.hardware",
	"user":     "creapptive.service.user",
}

// this microservice version
var serviceVersion = cmd.Version()

func main() {
	// New Service
	service := micro.NewService(
		micro.Name(serviceName),
		micro.Version(serviceVersion),
		micro.Action(func(c *cli.Context) error {
			// check if any command
			args := c.Args()
			if args.Present() {
				err := cmd.Execute(args, serviceName)
				if err != nil {
					return err
				}
			}
			return nil
		}),
	)

	// Initialise service
	service.Init()

	// Register Handler
	handler := handler.New(service.Client(), serviceNameMap)
	gateway.RegisterApigatewayHandler(service.Server(), handler)

	// Run service
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}

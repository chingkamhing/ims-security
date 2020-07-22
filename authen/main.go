package main

import (
	"github.com/micro/cli/v2"
	"github.com/micro/go-micro/v2"
	log "github.com/micro/go-micro/v2/logger"

	authen "creapptive.com/ims-security/api/authen"
	"creapptive.com/ims-security/authen/cmd"
	"creapptive.com/ims-security/authen/config"
	"creapptive.com/ims-security/authen/handler"
	"creapptive.com/ims-security/authen/subscriber"
)

// this microservice name
const serviceName = "creapptive.service.authen"

// this microservice version
const serviceVersion = "latest"

// this microservice subscriber topic name
const subscriberName = serviceName

// default config filename
const configFilename = "config.yaml"

func main() {
	service := micro.NewService(
		micro.Name(serviceName),
		micro.Version(serviceVersion),
		micro.Flags(
			&cli.StringFlag{
				Name:    "service.authen.database.host",
				Usage:   "Database host name",
				EnvVars: []string{"IMS_SECURITY_SERVICE_AUTHEN_DATABASE_HOST"},
			},
			&cli.IntFlag{
				Name:    "service.authen.database.port",
				Usage:   "Database port number",
				EnvVars: []string{"IMS_SECURITY_SERVICE_AUTHEN_DATABASE_PORT"},
			},
			&cli.StringFlag{
				Name:    "service.authen.database.user",
				Usage:   "Database user name",
				EnvVars: []string{"IMS_SECURITY_SERVICE_AUTHEN_DATABASE_USER"},
			},
			&cli.StringFlag{
				Name:    "service.authen.database.password",
				Usage:   "Database user password",
				Value:   "",
				EnvVars: []string{"IMS_SECURITY_SERVICE_AUTHEN_DATABASE_PASSWORD"},
			},
		),
		micro.Action(func(c *cli.Context) error {
			// load configuration
			err := config.LoadConfig(configFilename, c)
			if err != nil {
				return err
			}
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
	handler := handler.NewAuthen()
	err := handler.Open()
	if err != nil {
		log.Fatal(err)
	}
	defer handler.Close()
	authen.RegisterAuthenHandler(service.Server(), handler)

	// Register Struct as Subscriber
	micro.RegisterSubscriber(subscriberName, service.Server(), new(subscriber.Authen))

	// Run service
	err = service.Run()
	if err != nil {
		log.Fatal(err)
	}
}

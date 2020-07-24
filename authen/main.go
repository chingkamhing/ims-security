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
var serviceVersion = cmd.Version()

// this microservice subscriber topic name
const topicAll = "topic.all"

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
	handlerAuthen := handler.NewAuthen()
	err := handlerAuthen.Open()
	if err != nil {
		log.Fatal(err)
	}
	defer handlerAuthen.Close()
	authen.RegisterAuthenHandler(service.Server(), handlerAuthen)

	// Register Struct as Subscriber
	subscriberToAllEvent := subscriber.NewAllEvent()
	err = subscriberToAllEvent.Open()
	if err != nil {
		log.Fatal(err)
	}
	defer subscriberToAllEvent.Close()
	micro.RegisterSubscriber(topicAll, service.Server(), subscriberToAllEvent)

	// Run service
	err = service.Run()
	if err != nil {
		log.Fatal(err)
	}
}

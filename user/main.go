package main

import (
	"github.com/micro/cli/v2"
	"github.com/micro/go-micro/v2"
	log "github.com/micro/go-micro/v2/logger"

	user "creapptive.com/ims-security/api/user"
	"creapptive.com/ims-security/user/cmd"
	"creapptive.com/ims-security/user/config"
	"creapptive.com/ims-security/user/handler"
	"creapptive.com/ims-security/user/subscriber"
)

// this microservice name
const serviceName = "creapptive.service.user"

// this microservice version
var serviceVersion = cmd.Version()

// this microservice subscriber topic name
const topicAll = "topic.all"

// default config filename
const configFilename = "config.yaml"

func main() {
	// New Service
	service := micro.NewService(
		micro.Name(serviceName),
		micro.Version(serviceVersion),
		micro.Flags(
			&cli.StringFlag{
				Name:    "service.user.database.host",
				Usage:   "Database host name",
				EnvVars: []string{"IMS_SECURITY_SERVICE_USER_DATABASE_HOST"},
			},
			&cli.IntFlag{
				Name:    "service.user.database.port",
				Usage:   "Database port number",
				EnvVars: []string{"IMS_SECURITY_SERVICE_USER_DATABASE_PORT"},
			},
			&cli.StringFlag{
				Name:    "service.user.database.user",
				Usage:   "Database user name",
				EnvVars: []string{"IMS_SECURITY_SERVICE_USER_DATABASE_USER"},
			},
			&cli.StringFlag{
				Name:    "service.user.database.password",
				Usage:   "Database user password",
				Value:   "",
				EnvVars: []string{"IMS_SECURITY_SERVICE_USER_DATABASE_PASSWORD"},
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
	handler := handler.NewUser(service.Client(), topicAll)
	err := handler.Open()
	if err != nil {
		log.Fatal(err)
	}
	defer handler.Close()
	user.RegisterUserHandler(service.Server(), handler)

	// Register Struct as Subscriber
	err = micro.RegisterSubscriber(topicAll, service.Server(), new(subscriber.User))
	if err != nil {
		log.Fatal(err)
	}

	// Run service
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}

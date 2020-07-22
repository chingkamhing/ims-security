package cmd

import (
	"fmt"
	"os"

	"github.com/micro/cli/v2"
)

// this service's name
var serviceName string

var commands []*cli.Command

func Execute(a cli.Args, name string) error {
	serviceName = name
	app := &cli.App{
		Commands: commands,
		CommandNotFound: func(c *cli.Context, cmd string) {
			fmt.Printf("Invalid command: %q\n", cmd)
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		return err
	}
	// fake to have error in order to force go-micro to exit service.Run()
	return fmt.Errorf("")
}

func addCommand(cmd *cli.Command) {
	commands = append(commands, cmd)
}

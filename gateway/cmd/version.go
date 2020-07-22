package cmd

import (
	"fmt"

	"github.com/micro/cli/v2"
)

// this project's version string
const version string = "0.1.0"

func init() {
	addCommand(&cli.Command{
		Name:   "version",
		Usage:  "version",
		Action: runVersion,
	})
}

func runVersion(c *cli.Context) error {
	// read version file
	fmt.Printf("v%v\n", version)
	return nil
}

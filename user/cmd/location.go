package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/micro/cli/v2"

	"creapptive.com/ims-security/api/model"
	"creapptive.com/ims-security/user/repository"
)

func init() {
	addCommand(&cli.Command{
		Name:  "location",
		Usage: "location helper commands",
		Subcommands: []*cli.Command{
			{
				Name:   "all",
				Usage:  "List all locations in locations collection",
				Action: runLocationAll,
			},
			{
				Name:   "update",
				Usage:  "Update location in locations collection",
				Action: runLocationUpdate,
			},
			{
				Name:   "parse",
				Usage:  "Parse the input location string",
				Action: runLocationParse,
			},
		},
	})
}

// List all locations in locations collection
func runLocationAll(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// list all locations
	locations, err := repo.ReadLocation()
	if err != nil {
		return fmt.Errorf("Fail to read location: %w\n", err)
	}
	err = printLocation(locations)
	if err != nil {
		return fmt.Errorf("Fail to print location: %w\n", err)
	}
	return nil
}

// Update location in locations collection
func runLocationUpdate(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// parse location json-formated string
	locationString := c.Args().Get(0)
	location, err := parseLocation(locationString)
	if err != nil {
		return fmt.Errorf("Fail to parse location: %w\n", err)
	}

	// update the input location
	count, err := repo.UpdateLocation(location)
	if err != nil {
		return fmt.Errorf("Fail Errorfupdate location: %w\n", err)
	} else if count != 1 {
		return fmt.Errorf("Location was not updated (maybe the same?)\n")
	}
	fmt.Printf("Updated location successfully\n")
	return nil
}

// Parse the input location string
func runLocationParse(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// parse location json-formated string
	locationString := c.Args().Get(0)
	location, err := parseLocation(locationString)
	if err != nil {
		return fmt.Errorf("Fail to parse location: %w\n", err)
	}

	// print the input location
	printLocation(location)
	return nil
}

func printLocation(location []model.LocationNode) (err error) {
	// print the user detail
	locationBlob, err := json.Marshal(location)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", string(locationBlob))
	return nil
}

func parseLocation(locationString string) (location []model.LocationNode, err error) {
	// parse json-formated location string to location
	location = []model.LocationNode{}
	err = json.Unmarshal([]byte(locationString), &location)
	if err != nil {
		return nil, err
	}
	return location, nil
}

package cmd

import (
	"fmt"

	"github.com/micro/cli/v2"

	"creapptive.com/ims-security/authen/config"
	"creapptive.com/ims-security/authen/repository"
)

func init() {
	addCommand(&cli.Command{
		Name:  "db",
		Usage: "database helper functions",
		Subcommands: []*cli.Command{
			{
				Name:   "connect",
				Usage:  "Try connect to database server with the config database, user and password settings",
				Action: runDatabaseConnect,
			},
			{
				Name:   "migrate-up",
				Usage:  "Perform database migration up with source from user/deploy/migrations/*.up.json files",
				Action: runDatabaseMigrateUp,
			},
			{
				Name:   "migrate-down",
				Usage:  "Perform database migration down with source from user/deploy/migrations/*.down.json files",
				Action: runDatabaseMigrateDown,
			},
		},
	})
}

// connect to database
func runDatabaseConnect(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// print connection result
	url := repo.GetURL()
	databaseName := config.Config.Service.Authen.Database.Dbname
	userName := config.Config.Service.Authen.Database.User
	fmt.Printf("Successfully connected to database:\n")
	fmt.Printf("url: %v\n", url)
	fmt.Printf("database name: %v\n", databaseName)
	fmt.Printf("user name: %v\n", userName)
	return nil
}

// list all user
func runDatabaseMigrateUp(c *cli.Context) error {
	// default "new" command
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// prompt the user to confirm first
	var userInput string
	fmt.Printf("Perform database migration up.\n")
	fmt.Printf("Migration scheme files: %s/*.up.json\n", config.Config.Setting.Database.MigrationPath)
	fmt.Printf("Migration collection name: %s\n", config.Config.Setting.Database.MigrationTable)
	fmt.Println("Are you sure you want to migrate up the database [y/n]?")
	fmt.Scanln(&userInput)
	if userInput != "y" {
		return fmt.Errorf("Aborted")
	}

	// perform database migration up
	err = repo.MigrateUp()
	if err != nil {
		return fmt.Errorf("Fail to migrate up: %w\n", err)
	}
	fmt.Printf("Successfully migrated database up\n")
	return nil
}

// show user detail with specified id
func runDatabaseMigrateDown(c *cli.Context) error {
	// default "new" command
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// prompt the user to confirm first
	var userInput string
	fmt.Printf("Perform database migration down.\n")
	fmt.Printf("Migration scheme files: %s/*.down.json\n", config.Config.Setting.Database.MigrationPath)
	fmt.Printf("Migration collection name: %s\n", config.Config.Setting.Database.MigrationTable)
	fmt.Println("Are you sure you want to migrate down the database [y/n]?")
	fmt.Scanln(&userInput)
	if userInput != "y" {
		return fmt.Errorf("Aborted")
	}

	// perform database migration down
	err = repo.MigrateDown()
	if err != nil {
		return fmt.Errorf("Fail to migrate down: %w\n", err)
	}
	fmt.Printf("Successfully migrated database down\n")
	return nil
}

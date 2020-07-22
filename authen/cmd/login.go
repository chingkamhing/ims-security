package cmd

import (
	"context"
	"fmt"

	"github.com/micro/cli/v2"
	"github.com/micro/go-micro/v2"
	"github.com/micro/go-micro/v2/metadata"
	"go.mongodb.org/mongo-driver/bson/primitive"

	authen "creapptive.com/ims-security/api/authen"
	"creapptive.com/ims-security/api/message"
	"creapptive.com/ims-security/authen/repository"
	"creapptive.com/ims-security/lib"
)

func init() {
	addCommand(&cli.Command{
		Name:   "login",
		Usage:  "login [username] [password]",
		Action: runLogin,
		Subcommands: []*cli.Command{
			{
				Name:   "change",
				Usage:  "change [id] [old password] [new password]",
				Action: runLoginChange,
			},
			{
				Name:   "reset",
				Usage:  "reset [id]",
				Action: runLoginReset,
			},
			{
				Name:   "hash",
				Usage:  "hash [password]",
				Action: runLoginHash,
			},
			{
				Name:   "compare",
				Usage:  "compare [password] [hashed password]",
				Action: runLoginCompare,
			},
		},
	})
}

// Verify the input password and username's password in database if they match
func runLogin(c *cli.Context) error {
	repo := repository.New()
	if err := repo.Open(); err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// get input arguments
	login := &message.LoginRequest{
		Username: c.Args().Get(0),
		Password: c.Args().Get(1),
	}

	// perform client Authen.Login()
	fmt.Printf("Login to service %s\n", serviceName)
	service := micro.NewService(
		micro.Name(serviceName + ".client"),
	)
	api := authen.NewAuthenService(serviceName, service.Client())
	ctx := metadata.NewContext(context.Background(), map[string]string{})
	response, err := api.Login(ctx, login)
	if err != nil {
		return fmt.Errorf("Fail to login: %w\n", err)
	}
	fmt.Printf("Successfully login user %v:\n%+v\n", login.Username, response.Data)
	return nil
}

// Verify the old password with userId's password in database; if success, change the user with new password
func runLoginChange(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// get input arguments
	var changePassword *message.ChangePasswordRequest
	{
		idString := c.Args().Get(0)
		oldPassword := c.Args().Get(1)
		newPassword := c.Args().Get(2)
		id, err := primitive.ObjectIDFromHex(idString)
		if err != nil {
			return fmt.Errorf("Fail to convert ID string to ObjectID: %w\n", err)
		}
		changePassword = &message.ChangePasswordRequest{
			Id:          id.Hex(),
			OldPassword: oldPassword,
			NewPassword: newPassword,
		}
	}

	// perform client Authen.ChangePassword()
	service := micro.NewService(
		micro.Name(serviceName + ".client"),
	)
	api := authen.NewAuthenService(serviceName, service.Client())
	ctx := metadata.NewContext(context.Background(), map[string]string{})
	response, err := api.ChangePassword(ctx, changePassword)
	if err != nil {
		return fmt.Errorf("Fail to change password: %w\n", err)
	}
	fmt.Printf("Successfully change user %q password\n", response.Data)
	return nil
}

// Reset specified user's password to default
func runLoginReset(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// get input arguments
	var resetPassword message.ResetPasswordRequest
	{
		idString := c.Args().Get(0)
		id, err := primitive.ObjectIDFromHex(idString)
		if err != nil {
			return fmt.Errorf("Fail to convert ID string to ObjectID: %w\n", err)
		}
		resetPassword.Id = id.Hex()
	}

	// prompt the user to confirm first
	var userInput string
	fmt.Printf("Reset user %q password to default.\n", resetPassword)
	fmt.Println("Are you sure you want to reset the user's password [y/n]?")
	fmt.Scanln(&userInput)
	if userInput != "y" {
		return fmt.Errorf("Aborted")
	}

	// perform client Authen.ResetPassword()
	service := micro.NewService(
		micro.Name(serviceName + ".client"),
	)
	api := authen.NewAuthenService(serviceName, service.Client())
	ctx := metadata.NewContext(context.Background(), map[string]string{})
	response, err := api.ResetPassword(ctx, &resetPassword)
	if err != nil {
		return fmt.Errorf("Fail to reset password: %w\n", err)
	}
	fmt.Printf("Successfully reset user %q password\n", response.Data)
	return nil
}

// Hash a password and show the hash string
func runLoginHash(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// get input arguments
	password := c.Args().Get(0)

	// verify the user password
	hashed, err := lib.HashPassword(password, hashCost)
	if err != nil {
		return fmt.Errorf("Fail to hash password: %w\n", err)
	}
	fmt.Printf("Hash value %v:\n", string(hashed))
	return nil
}

// Compare a password with hashed value (note: quote the hashed password with \"'\" to avoid shell variable expansion)
func runLoginCompare(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// get input arguments
	password := c.Args().Get(0)
	hashedPassword := c.Args().Get(1)

	// verify the user password
	err = lib.ComparePassword(password, []byte(hashedPassword))
	if err != nil {
		return fmt.Errorf("Password incorrect: %w\n", err)
	}
	fmt.Println("Password correct.")
	return nil
}

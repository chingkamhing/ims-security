package cmd

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/micro/cli/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"creapptive.com/ims-security/api/model"
	"creapptive.com/ims-security/user/repository"
)

// hash password cost value
const hashCost = 0

func init() {
	addCommand(&cli.Command{
		Name:  "user",
		Usage: "user helper functions",
		Subcommands: []*cli.Command{
			{
				Name:   "create",
				Usage:  "user create [username] [name] [email] [phone number] [privilege profile name] [description]",
				Action: runUserCreate,
			},
			{
				Name:   "all",
				Usage:  "all",
				Action: runUserAll,
			},
			{
				Name:   "id",
				Usage:  "id [id]",
				Action: runUserID,
			},
			{
				Name:   "update",
				Usage:  "update [username] [name] [email] [phone number] [privilege profile name] [description]",
				Action: runUserUpdate,
			},
			{
				Name:   "update-by-id",
				Usage:  "update-by-id [id] [username] [name] [email] [phone number] [description]",
				Action: runUserUpdateByID,
			},
			{
				Name:   "delete",
				Usage:  "delete [id]",
				Action: runUserDeleteByID,
			},
			{
				Name:   "delete-all",
				Usage:  "delete-all",
				Action: runUserDeleteAll,
			},
			{
				Name:   "parse",
				Usage:  "Parse a json-formated string of []model.User, []model.Key or model.Key and print the result",
				Action: runUserParse,
			},
		},
	})
}

// create new user with specified id, username and password
// usage: user create [username] [name] [email] [phone number] [privilege profile name] [description]
func runUserCreate(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	var user *model.User
	{
		privilegeProfileName := c.Args().Get(4)
		privilegeProfile, err := repo.ReadPrivilegeProfileByName(privilegeProfileName)
		if err != nil {
			return fmt.Errorf("Fail to get privilege profile name %q: %w\n", privilegeProfileName, err)
		}
		user = &model.User{
			Username:           c.Args().Get(0),
			Name:               c.Args().Get(1),
			Email:              c.Args().Get(2),
			PhoneNumber:        c.Args().Get(3),
			PrivilegeProfileID: privilegeProfile.Id,
			Description:        c.Args().Get(5),
		}
	}

	// create the user
	id, err := repo.CreateUser(user)
	if err != nil {
		return fmt.Errorf("Fail to create user: %w\n", err)
	}
	fmt.Printf("Successfully created a new user %v:\n", id)
	printUser(user)
	return nil
}

// list all user
// usage: user all
func runUserAll(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// list all users
	users, err := repo.ReadAllUsers()
	if err != nil {
		return fmt.Errorf("Fail to read users: %w\n", err)
	}
	numUsers := len(users)
	if numUsers <= 1 {
		fmt.Printf("There is %d user:\n", numUsers)
	} else {
		fmt.Printf("There are %d users:\n", numUsers)
	}
	for i := range users {
		fmt.Printf("[%v]\n", i)
		printUser(users[i])
	}
	return nil
}

// show user detail with specified id
// usage: user id [id]
func runUserID(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// parse the user's hex ID
	idString := c.Args().Get(0)
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return fmt.Errorf("Fail to convert ID string to ObjectID: %w\n", err)
	}

	// list the user by it's ID
	user, err := repo.ReadUserByID(id.Hex())
	if err != nil {
		return fmt.Errorf("Fail to read user %q: %w\n", idString, err)
	}
	printUser(user)
	return nil
}

// update user with specified username and password
// usage: user update [username] [name] [email] [phone number] [privilege profile name] [description]
func runUserUpdate(c *cli.Context) error {
	// default "update" command
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	var user *model.User
	{
		privilegeProfileName := c.Args().Get(4)
		privilegeProfile, err := repo.ReadPrivilegeProfileByName(privilegeProfileName)
		if err != nil {
			return fmt.Errorf("Fail to get privilege profile name %q: %w\n", privilegeProfileName, err)
		}
		user = &model.User{
			Username:           c.Args().Get(0),
			Name:               c.Args().Get(1),
			Email:              c.Args().Get(2),
			PhoneNumber:        c.Args().Get(3),
			PrivilegeProfileID: privilegeProfile.Id,
			Description:        c.Args().Get(5),
		}
	}

	// update the user with input's username
	count, err := repo.UpdateUserByUsername(user)
	if err != nil {
		return fmt.Errorf("Fail to update user: %w\n", err)
	}
	if count == 1 {
		fmt.Printf("Updated user %v successfully\n", user.Username)
		printUser(user)
	} else {
		fmt.Printf("Did not update user %s: both might be the same\n", user.Username)
	}
	return nil
}

// update user with specified id, username and password
// usage: user update-by-id [id] [username] [name] [email] [phone number] [description]
func runUserUpdateByID(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// parse the user's hex ID
	idString := c.Args().Get(0)
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return fmt.Errorf("Fail to convert ID string to ObjectID: %w\n", err)
	}

	// get the update user info
	user := &model.User{
		Id:          id.Hex(),
		Username:    c.Args().Get(1),
		Name:        c.Args().Get(2),
		Email:       c.Args().Get(3),
		PhoneNumber: c.Args().Get(4),
		Description: c.Args().Get(5),
	}

	// update the user with input's username
	count, err := repo.UpdateUserByID(user)
	if err != nil {
		return fmt.Errorf("Fail to update user: %w\n", err)
	}
	if count == 1 {
		fmt.Printf("Updated user %v successfully\n", user.Id)
		printUser(user)
	} else {
		fmt.Printf("Did not update user %s: both might be the same\n", user.Username)
	}
	return nil
}

// delete user with specified id
// usage: user delete [id]
func runUserDeleteByID(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %s\n", err)
	}
	defer repo.Close()

	// parse the user's hex ID
	idString := c.Args().Get(0)
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return fmt.Errorf("Fail to convert ID string to ObjectID: %s\n", err)
	}

	// prompt the user to confirm first
	var userInput string
	user, err := repo.ReadUserByID(id.Hex())
	if err != nil {
		return fmt.Errorf("Fail to read user %q: %s\n", idString, err)
	}
	fmt.Printf("Delete user %q.\n", user.Username)
	fmt.Printf("Are you sure you want to delete %q [y/n]?\n", user.Username)
	fmt.Scanln(&userInput)
	if userInput != "y" {
		return fmt.Errorf("Aborted")
	}

	// delete the user with input's ID
	count, err := repo.DeleteUserByID(id.Hex())
	if err != nil {
		return fmt.Errorf("Fail to delete user: %s\n", err)
	}
	if count == 1 {
		fmt.Printf("Deleted user %s successfully\n", idString)
	} else {
		fmt.Printf("Did not delete user %s: user might not exist\n", idString)
	}
	return nil
}

// delete all users
// usage: user delete-all
func runUserDeleteAll(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// prompt the user to confirm first
	var userInput string
	fmt.Printf("Delete all users.\n")
	fmt.Println("Are you sure you want to delete all the users [y/n]?")
	fmt.Scanln(&userInput)
	if userInput != "y" {
		return fmt.Errorf("Aborted")
	}

	// delete all users
	count, err := repo.DeleteAllUsers()
	if err != nil {
		return fmt.Errorf("Fail to delete all user: %w\n", err)
	}
	fmt.Printf("Deleted number of users: %v\n", count)
	return nil
}

// parse a json-formated string of array of model.User
// e.g. "[{\"id\":\"5ee8812f9420a4b39f180c26\",\"username\":\"jamesdean\",\"password\":\"My-Supper+Secret*PASSword@2020\"}]"
// e.g. "[\"5ee8812f9420a4b39f180c26\",\"5ee6edbdf820616684364af5\"]"
// e.g. "\"5ee6edbdf820616684364af5\""
func runUserParse(c *cli.Context) error {
	// parse input's json-formated string
	inputString := c.Args().Get(0)
	users, err := parseUsers(inputString)
	if err == nil {
		fmt.Printf("Parsed %d users:\n", len(users))
		for i := range users {
			fmt.Printf("[%v]\n", i)
			printUser(&users[i])
		}
		return nil
	}
	fmt.Println(err)
	userIDs, err := parseUserIDs(inputString)
	if err == nil {
		fmt.Printf("Parsed %d userIDs:\n", len(userIDs))
		for i, id := range userIDs {
			fmt.Printf("[%v]: %v\n", i, id)
		}
		return nil
	}
	fmt.Println(err)
	userID, err := parseUserID(inputString)
	if err == nil {
		fmt.Printf("Parsed userID: %v\n", userID)
		return nil
	}
	fmt.Println(err)
	return fmt.Errorf("Fail to parse %q to []model.User, []string nor string\n", inputString)
}

func printUser(user *model.User) {
	// print the user detail
	fmt.Printf("ID: %s\n", user.Id)
	fmt.Printf("Location IDs: %s\n", strings.Join(user.LocationIDs, ", "))
	fmt.Printf("Scope ID: %s\n", user.ScopeID)
	fmt.Printf("Privilege Profile ID: %s\n", user.PrivilegeProfileID)
	fmt.Printf("Username: %s\n", user.Username)
	fmt.Printf("Name: %s\n", user.Name)
	fmt.Printf("Email: %s\n", user.Email)
	fmt.Printf("PhoneNumber: %s\n", user.PhoneNumber)
	fmt.Printf("Description: %s\n", user.Description)
}

func parseUsers(usersString string) (users []model.User, err error) {
	// parse json-formated users string to users
	users = []model.User{}
	err = json.Unmarshal([]byte(usersString), &users)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func parseUserIDs(userIDsString string) (userIDs []string, err error) {
	// parse json-formated user IDs string to user IDs
	userIDs = []string{}
	err = json.Unmarshal([]byte(userIDsString), &userIDs)
	if err != nil {
		return nil, err
	}
	return userIDs, nil
}

func parseUserID(userIDString string) (userID string, err error) {
	// parse json-formated user IDs string to user IDs
	err = json.Unmarshal([]byte(userIDString), &userID)
	if err != nil {
		return "", err
	}
	return userID, nil
}

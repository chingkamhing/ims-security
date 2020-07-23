package cmd

import (
	"fmt"
	"strings"

	"github.com/micro/cli/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"creapptive.com/ims-security/api/model"
	"creapptive.com/ims-security/user/repository"
)

// privilege list seperator char
const privilegesSeperator = ","

// valid privilege enum string
// note: these enum strings are copied from PRIVILEGE in web/src/constants.js
var validPrivilege = map[string]struct{}{
	"GET_USER":                     {},
	"CREATE_USER":                  {},
	"GET_ACCESS_RESOURCES":         {},
	"CREATE_ACCESS_RESOURCES":      {},
	"PROGRAM_ACCESS_RESOURCES":     {},
	"GET_MANAGEMENT_RESOURCES":     {},
	"CREATE_MANAGEMENT_RESOURCES":  {},
	"PROGRAM_MANAGEMENT_RESOURCES": {},
	"ACTIVITY_LOCK_ACCESS":         {},
	"ACTIVITY_LOCK_OPERATION":      {},
	"ACTIVITY_SYSTEM":              {},
	"SYSTEM_CONFIG":                {},
}

func init() {
	addCommand(&cli.Command{
		Name:  "privilege",
		Usage: "privilege helper commands",
		Subcommands: []*cli.Command{
			{
				Name:   "create [name] [description] [comma-seperated privileges]",
				Usage:  "Create a new privilege profile in privilegeProfiles collection",
				Action: runPrivilegeProfileNew,
			},
			{
				Name:   "all",
				Usage:  "List all privilege profile in privilegeProfiles collection",
				Action: runPrivilegeProfileAll,
			},
			{
				Name:   "id [id]",
				Usage:  "List privilege profile in privilegeProfiles collection by it's ID",
				Action: runPrivilegeProfileID,
			},
			{
				Name:   "update [name] [description] [comma-seperated privileges]",
				Usage:  "Update a privilege profile in privilegeProfiles collection",
				Action: runPrivilegeProfileUpdate,
			},
			{
				Name:   "delete-by-id [id]",
				Usage:  "Delete a privilege profile in privilegeProfiles collection by it's ID",
				Action: runPrivilegeProfileDeleteByID,
			},
			{
				Name:   "delete-all",
				Usage:  "Delete all privilege profiles in privilegeProfiles collection",
				Action: runPrivilegeProfileDeleteAll,
			},
		},
	})
}

// Verify the old password with userId's password in database; if success, change the user with new password
func runPrivilegeProfileNew(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// create a new privilege profile
	privilegeProfile := &model.PrivilegeProfile{
		Name:        c.Args().Get(0),
		Description: c.Args().Get(1),
		Privileges:  parsePrivileges(c.Args().Get(2)),
	}
	id, err := repo.CreatePrivilegeProfile(privilegeProfile)
	if err != nil {
		return fmt.Errorf("Fail to create privilege profile: %w\n", err)
	}
	fmt.Printf("Successfully created a new privilege profile %v: %+v\n", id, privilegeProfile)
	return nil
}

// Reset specified user's password to default
func runPrivilegeProfileAll(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// list all privilege profiles
	privilegeProfiles, err := repo.ReadAllPrivilegeProfiles()
	if err != nil {
		return fmt.Errorf("Fail to read privilege profile: %w\n", err)
	}
	numPrivilegeProfiles := len(privilegeProfiles)
	if numPrivilegeProfiles <= 1 {
		fmt.Printf("There is %d privilege profile:\n", numPrivilegeProfiles)
	} else {
		fmt.Printf("There are %d privilege profiles:\n", numPrivilegeProfiles)
	}
	for i := range privilegeProfiles {
		fmt.Printf("[%v]\n", i)
		printPrivilegeProfile(privilegeProfiles[i])
	}
	return nil
}

// Hash a password and show the hash string
func runPrivilegeProfileID(c *cli.Context) error {
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

	// list the privilege profile by it's ID
	privilegeProfile, err := repo.ReadPrivilegeProfileByID(id.Hex())
	if err != nil {
		return fmt.Errorf("Fail to read privilege profile %q: %w\n", id.Hex(), err)
	}
	printPrivilegeProfile(privilegeProfile)
	return nil
}

// Verify the old password with userId's password in database; if success, change the user with new password
func runPrivilegeProfileUpdate(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// get the update privilege profile info
	privilegeProfile := &model.PrivilegeProfile{
		Name:        c.Args().Get(0),
		Description: c.Args().Get(1),
		Privileges:  parsePrivileges(c.Args().Get(2)),
	}

	// update the privilege profile with input's name
	count, err := repo.UpdatePrivilegeProfileByName(privilegeProfile)
	if err != nil {
		return fmt.Errorf("Fail to update privilege profile: %w\n", err)
	}
	if count == 1 {
		fmt.Printf("Updated privilege profile %s successfully\n", privilegeProfile.Name)
	} else {
		fmt.Printf("Did not update privilege profile %s: both might be the same\n", privilegeProfile.Name)
	}
	return nil
}

// Reset specified user's password to default
func runPrivilegeProfileDeleteByID(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// parse the privilege profile's hex ID
	idString := c.Args().Get(0)
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return fmt.Errorf("Fail to convert ID string to ObjectID: %w\n", err)
	}

	// delete the privilege profile with input's ID
	count, err := repo.DeletePrivilegeProfileByID(id.Hex())
	if err != nil {
		return fmt.Errorf("Fail to delete privilege profile: %w\n", err)
	}
	if count == 1 {
		fmt.Printf("Deleted privilege profile %s successfully\n", id.Hex())
	} else {
		fmt.Printf("Did not delete privilege profile %s: privilege profile might not exist\n", id.Hex())
	}
	return nil
}

// Hash a password and show the hash string
func runPrivilegeProfileDeleteAll(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// delete all privilege profiles
	count, err := repo.DeleteAllPrivilegeProfiles()
	if err != nil {
		return fmt.Errorf("Fail to delete all privilege profile: %w\n", err)
	}
	fmt.Printf("Deleted number of privilege profiles: %v\n", count)
	return nil
}

func parsePrivileges(privilegesString string) (privileges []string) {
	s := strings.Split(privilegesString, privilegesSeperator)
	for i := range s {
		if _, ok := validPrivilege[s[i]]; ok {
			privileges = append(privileges, s[i])
		}
	}
	return privileges
}

func printPrivilegeProfile(privilegeProfile *model.PrivilegeProfile) {
	// print the privilege profile detail
	fmt.Printf("ID: %s\n", privilegeProfile.Id)
	fmt.Printf("Name: %s\n", privilegeProfile.Name)
	fmt.Printf("Description: %s\n", privilegeProfile.Description)
	fmt.Printf("Privileges: %s\n", strings.Join(privilegeProfile.Privileges, ", "))
}

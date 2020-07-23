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
		Name:  "scope",
		Usage: "scope helper commands",
		Subcommands: []*cli.Command{
			{
				Name:   "all",
				Usage:  "List all scopes in scopes collection",
				Action: runScopeAll,
			},
			{
				Name:   "update",
				Usage:  "Update scope in scopes collection",
				Action: runScopeUpdate,
			},
			{
				Name:   "parse",
				Usage:  "Parse the input scope string",
				Action: runScopeParse,
			},
		},
	})
}

// List all scopes in scopes collection
func runScopeAll(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// list all scopes
	scopes, err := repo.ReadScope()
	if err != nil {
		return fmt.Errorf("Fail to read scope: %w\n", err)
	}
	err = printScope(scopes)
	if err != nil {
		return fmt.Errorf("Fail to print scope: %w\n", err)
	}
	return nil
}

// Update scope in scopes collection
func runScopeUpdate(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// parse scope json-formated string
	scopeString := c.Args().Get(0)
	scope, err := parseScope(scopeString)
	if err != nil {
		return fmt.Errorf("Fail to parse scope: %w\n", err)
	}

	// update the input scope
	count, err := repo.UpdateScope(scope)
	if err != nil {
		return fmt.Errorf("Fail Errorfupdate scope: %w\n", err)
	} else if count != 1 {
		return fmt.Errorf("Scope was not updated (maybe the same?)\n")
	}
	fmt.Printf("Updated scope successfully\n")
	return nil
}

// Parse the input scope string
func runScopeParse(c *cli.Context) error {
	repo := repository.New()
	err := repo.Open()
	if err != nil {
		return fmt.Errorf("Fail to open repository: %w\n", err)
	}
	defer repo.Close()

	// parse scope json-formated string
	scopeString := c.Args().Get(0)
	scope, err := parseScope(scopeString)
	if err != nil {
		return fmt.Errorf("Fail to parse scope: %w\n", err)
	}

	// print the input scope
	printScope(scope)
	return nil
}

func printScope(scope []model.ScopeNode) (err error) {
	// print the user detail
	scopeBlob, err := json.Marshal(scope)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", string(scopeBlob))
	return nil
}

func parseScope(scopeString string) (scope []model.ScopeNode, err error) {
	// parse json-formated scope string to scope
	scope = []model.ScopeNode{}
	err = json.Unmarshal([]byte(scopeString), &scope)
	if err != nil {
		return nil, err
	}
	return scope, nil
}

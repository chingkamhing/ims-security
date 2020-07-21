package repository

import (
	authenModel "creapptive.com/ims-security/authen/model"
)

// Interfaces defines the repository interfaces
type Interface interface {
	// general database interfaces

	// Get database server url
	GetURL() string
	// Open open database connection
	Open() error
	// Ping verify if the database server is active
	Ping() error
	// Close close database connection
	Close() error
	// MigrateUp perform data migration up
	MigrateUp() (err error)
	// MigrateDown perform data migration down
	MigrateDown() (err error)

	// user interfaces

	// CreateUser create a new authenModel.User document in "users" collection
	CreateUser(user *authenModel.User) (id string, err error)

	// ReadAllUsers read all model.User document in "users" collection
	ReadAllUsers() (users []*authenModel.User, err error)

	// ReadUserByUsername read authenModel.User document in "users" collection with the specified username
	ReadUserByUsername(username string) (user *authenModel.User, err error)

	// ReadUserByID read authenModel.User document in "users" collection with the specified user ID
	ReadUserByID(id string) (user *authenModel.User, err error)

	// UpdateUserByUsername update authenModel.User from document in "users" collection with the specified user
	UpdateUserByUsername(user *authenModel.User) (count int64, err error)

	// UpdateUserByID update authenModel.User from document in "users" collection with the specified user ID
	UpdateUserByID(user *authenModel.User) (count int64, err error)

	// UpdatePasswordByID update authenModel.User password from document in "users" collection with the specified user ID
	UpdatePasswordByID(user *authenModel.User) (count int64, err error)

	// DeleteUserByID delete authenModel.User from document in "users" collection with the specified user ID
	DeleteUserByID(id string) (count int64, err error)

	// DeleteAllUsers delete all authenModel.User document in "users" collection
	DeleteAllUsers() (count int64, err error)
}

package repository

import (
	"creapptive.com/ims-security/api/model"
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

	// CreateUser create a new model.User document in "users" collection
	CreateUser(user *model.User) (id string, err error)

	// ReadAllUsers read all model.User document in "users" collection
	ReadAllUsers() (users []*model.User, err error)

	// ReadUserByID read model.User document in "users" collection with the specified user ID
	ReadUserByID(id string) (user *model.User, err error)

	// UpdateUserByUsername update model.User from document in "users" collection with the specified user
	UpdateUserByUsername(user *model.User) (count int64, err error)

	// UpdateUserByID update model.User from document in "users" collection with the specified user
	UpdateUserByID(user *model.User) (count int64, err error)

	// DeleteUserByID delete model.User from document in "users" collection with the specified user ID
	DeleteUserByID(id string) (count int64, err error)

	// DeleteAllUsers delete all model.User document in "users" collection
	DeleteAllUsers() (count int64, err error)

	// privilege profile interfaces

	// CreatePrivilegeProfile create a new model.PrivilegeProfile document in "privilegeProfiles" collection
	CreatePrivilegeProfile(privilegeProfile *model.PrivilegeProfile) (id string, err error)

	// ReadAllPrivilegeProfiles read all model.PrivilegeProfile document in "privilegeProfiles" collection
	ReadAllPrivilegeProfiles() (privilegeProfiles []*model.PrivilegeProfile, err error)

	// ReadPrivilegeProfileByName read model.PrivilegeProfile document in "privilegeProfiles" collection with the specified privilege profile name
	ReadPrivilegeProfileByName(name string) (privilegeProfile *model.PrivilegeProfile, err error)

	// ReadPrivilegeProfileByID read model.PrivilegeProfile document in "privilegeProfiles" collection with the specified privilege profile ID
	ReadPrivilegeProfileByID(id string) (privilegeProfile *model.PrivilegeProfile, err error)

	// UpdatePrivilegeProfileByName update model.PrivilegeProfile from document in "privilegeProfiles" collection with the specified privilege profile
	UpdatePrivilegeProfileByName(privilegeProfile *model.PrivilegeProfile) (count int64, err error)

	// UpdatePrivilegeProfileByID update model.PrivilegeProfile from document in "privilegeProfiles" collection with the specified privilege profile
	UpdatePrivilegeProfileByID(privilegeProfile *model.PrivilegeProfile) (count int64, err error)

	// DeletePrivilegeProfileByID delete model.PrivilegeProfile from document in "privilegeProfiles" collection with the specified privilegeProfile ID
	DeletePrivilegeProfileByID(id string) (count int64, err error)

	// DeleteAllPrivilegeProfiles delete all model.PrivilegeProfile document in "privilegeProfiles" collection
	DeleteAllPrivilegeProfiles() (count int64, err error)

	// location interfaces

	// ReadLocation read model.LocationNode document in "locations" collection
	ReadLocation() (location []model.LocationNode, err error)

	// UpdateLocation update model.LocationNode from document in "locations" collection with the specified location
	UpdateLocation(location []model.LocationNode) (count int64, err error)

	// scope interfaces

	// ReadScope read model.ScopeNode document in "locations" collection
	ReadScope() (scope []model.ScopeNode, err error)

	// UpdateScope update model.ScopeNode from document in "locations" collection with the specified scope
	UpdateScope(scope []model.ScopeNode) (count int64, err error)
}

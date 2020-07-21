package repository

import (
	"creapptive.com/ims-security/authen/config"
	"creapptive.com/ims-security/authen/repository/mongodb"
)

// defaultOptions get the default mongodb options
func defaultOptions() []mongodb.MongodbOption {
	return []mongodb.MongodbOption{
		mongodb.OptionSetHost(config.Config.Service.Authen.Database.Host),
		mongodb.OptionSetPort(config.Config.Service.Authen.Database.Port),
		mongodb.OptionSetDatabaseName(config.Config.Service.Authen.Database.Dbname),
		mongodb.OptionSetUser(config.Config.Service.Authen.Database.User),
		mongodb.OptionSetPassword(config.Config.Service.Authen.Database.Password),
		mongodb.OptionSetRetryCount(config.Config.Setting.Database.RetryCount),
		mongodb.OptionSetSetRetryInterval(config.Config.Setting.Database.RetryInterval),
		mongodb.OptionSetSetMigrationPath(config.Config.Setting.Database.MigrationPath),
		mongodb.OptionSetSetMigrationCollectionName(config.Config.Setting.Database.MigrationTable),
	}
}

// New return pointer of repository interface
func New() (repoInterface Interface) {
	return mongodb.New(defaultOptions()...)
}

// NewWithMigrateUp return pointer of repository interface
func NewWithMigrateUp() (repoInterface Interface) {
	options := append(defaultOptions(), mongodb.OptionSetMigrateUp())
	return mongodb.New(options...)
}

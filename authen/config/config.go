package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/asim/go-micro/v3/config"
	"github.com/asim/go-micro/v3/config/source/file"
	"github.com/micro/cli/v2"
)

// default settings
const defaultEnvPrefix string = "IMS_SECURITY" // default IMS Security Management System env prefix

// Configuration define the root config structure
type Configuration struct {
	Service ServiceConfig `json:"service"`
	Setting SettingConfig `json:"setting"`
	Log     LogConfig     `json:"log"`
}

// ServiceConfig define the web config structure
type ServiceConfig struct {
	Authen AuthenConfig `json:"authen"`
}

// AuthenConfig define the web config structure
type AuthenConfig struct {
	EndPoint        string                `json:"endpoint"`         // service base endpoint (note: must begin with '/')
	Database        ServiceDatabaseConfig `json:"database"`         // database settings
	DefaultPassword string                `json:"default_password"` // user's default initial password; used upon new user with empty password or user password reset
	MoreOrLessCost  int                   `json:"more_less_cost"`   // more (+ve number) or less (-ve number) encryption cost relative to the default value (min: 4, default: 10, max: 31) (e.g. set this to 2 will have cost value 12) (note: the higher the cost, the longer to hash and compare password; e.g. setting 0 takes 90~110ms, 1 takes 180~220ms)
}

// ServiceDatabaseConfig define the database config structure
type ServiceDatabaseConfig struct {
	Dbname   string `json:"dbname"`   // database name
	Host     string `json:"host"`     // database host address
	Port     int    `json:"port"`     // database port number
	User     string `json:"user"`     // database user name
	Password string `json:"password"` // database password
}

// SettingConfig define the web config structure
type SettingConfig struct {
	Database SettingDatabaseConfig `json:"database"`
}

// SettingDatabaseConfig define the database config structure
type SettingDatabaseConfig struct {
	RetryCount     int    `json:"retry_count"`     // database retry connecting database count
	RetryInterval  int    `json:"retry_interval"`  // database retry connecting database interval in second
	MigrationPath  string `json:"migration_path"`  // database migrations path
	MigrationTable string `json:"migration_table"` // database migration table name
}

// LogConfig define the log config structure
type LogConfig struct {
	Console bool   `json:"Console"` // log output to console
	File    string `json:"File"`    // log output file
	Level   string `json:"Level"`   // log levels: debug, info, error
}

// Config is a global variable that hold the configuration settings
var Config Configuration

// LoadConfig load config setting from file
func LoadConfig(configFilename string, c *cli.Context) error {
	// get execution path
	executionPath := filepath.Dir(os.Args[0])

	// load config file, no need to pass the encoder type as it can use the right encoder base on the file's extension name
	config.Load(file.NewSource(
		file.WithPath(joinRelativePath(executionPath, configFilename)),
	))
	err := config.Get().Scan(&Config)
	if err != nil {
		return fmt.Errorf("LoadConfig() error: %w", err)
	}
	// set default config settings in case there is no config file
	Config.Service.Authen.EndPoint = config.Get("service", "authen", "endpoint").String("/api")
	Config.Service.Authen.Database.Dbname = config.Get("service", "authen", "database", "dbname").String("imsSecurityAuthenDB")
	Config.Service.Authen.Database.Host = getFlagConfigString(c, "service.authen.database.host")
	Config.Service.Authen.Database.Port = getFlagConfigInt(c, "service.authen.database.port")
	Config.Service.Authen.Database.User = getFlagConfigString(c, "service.authen.database.user")
	Config.Service.Authen.Database.Password = getFlagConfigString(c, "service.authen.database.password")
	Config.Service.Authen.DefaultPassword = config.Get("service", "authen", "default_password").String("Initial9999Password")
	Config.Service.Authen.MoreOrLessCost = config.Get("service", "authen", "more_less_cost").Int(0)
	Config.Setting.Database.RetryCount = config.Get("setting", "database", "retry_count").Int(20)
	Config.Setting.Database.RetryInterval = config.Get("setting", "database", "retry_interval").Int(3)
	Config.Setting.Database.MigrationPath = joinRelativePath(executionPath, config.Get("setting", "database", "migration_path").String("deploy/migrations"))
	Config.Setting.Database.MigrationTable = config.Get("setting", "database", "migration_table").String("schema_migrations")
	Config.Log.Console = config.Get("log.console").Bool(true)
	return nil
}

// append target path with execution path
func joinRelativePath(executionPath string, targetPath string) (result string) {
	if strings.HasPrefix(targetPath, string(filepath.Separator)) {
		// if the target path is an absolute path, no need to join with execution path
		result = targetPath
	} else {
		// if the target path is not an absolute path, append the execution path
		result = filepath.Join(executionPath, targetPath)
	}
	return result
}

//
// helper functions to precedence of input from flag/environment and config
//

const flagSeperator = "."

// get value from flag/environment or config with specified name and return with result in string
func getFlagConfigString(c *cli.Context, name string) string {
	// get flag or environment value
	value := c.String(name)
	if len(value) <= 0 {
		// if empty, get it from config
		s := strings.Split(name, flagSeperator)
		value = config.Get(s...).String(value)
	}
	return value
}

// get value from flag/environment or config with specified name and return with result in integer
func getFlagConfigInt(c *cli.Context, name string) int {
	// get flag or environment value
	value := c.Int(name)
	if value == 0 {
		// if empty, get it from config
		s := strings.Split(name, flagSeperator)
		value = config.Get(s...).Int(value)
	}
	return value
}

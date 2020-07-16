package command

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"os"
	"time"

	"github.com/spf13/cobra"
)

//
// Version:
// 1.0		- initial release
//

// default settings
const version = "1.0"                          // version number
const defaultLockActivities = 9981             // default number of activity data will ge generated
const defaultOperationActivities = 983         // default number of activity data will ge generated
const defaultSystemActivities = 912            // default number of activity data will ge generated
const lockStartId = "5099803df3f4948bd21"      // object id with 5 more digits append
const operationStartId = "5099803df3f4948bd22" // object id with 5 more digits append
const systemStartId = "5099803df3f4948bd23"    // object id with 5 more digits append
const randomInterval = 300                     // random interval time in second

// selection of random user names
var userNames = []string{
	"Bryan Adam",
	"Elton John",
	"Mariah Carey",
	"Whitney Houston",
	"Billy Jones",
	"James Dean",
	"Richeal Carpenter",
}

// selection of random location IDs
var locationIds = []string{
	"5099803df3f4948bd2f98301",
	"5099803df3f4948bd2f98302",
	"5099803df3f4948bd2f98303",
	"5099803df3f4948bd2f98304",
	"5099803df3f4948bd2f98305",
	"5099803df3f4948bd2f98306",
	"5099803df3f4948bd2f98307",
	"5099803df3f4948bd2f98308",
	"5099803df3f4948bd2f98309",
}

// selection of random scope IDs
var scopeIds = []string{
	"5099803df3f4948bd2f98311",
	"5099803df3f4948bd2f98312",
	"5099803df3f4948bd2f98313",
	"5099803df3f4948bd2f98314",
	"5099803df3f4948bd2f98315",
	"5099803df3f4948bd2f98316",
	"5099803df3f4948bd2f98317",
}

// selection of random key serial numbers
var keySerialNumbers = []string{
	"KA-000001",
	"KA-000002",
	"KA-000003",
	"KA-000004",
	"KA-000005",
	"KA-000006",
	"KA-000007",
	"KA-000008",
	"KA-000009",
	"KA-000010",
	"KA-000011",
	"KA-000012",
	"KA-000013",
	"KA-000014",
	"KA-000015",
	"KA-000016",
	"KA-000017",
	"KA-000018",
	"KA-000019",
	"KA-000020",
	"KA-000021",
	"KA-000022",
	"KA-000023",
}

// selection of random lock serial numbers
var lockSerialNumbers = []string{
	"LA-000001",
	"LA-000002",
	"LA-000003",
	"LA-000004",
	"LA-000005",
	"LA-000006",
	"LA-000007",
	"LA-000008",
	"LA-000009",
	"LA-000010",
	"LA-000011",
	"LA-000012",
	"LA-000013",
	"LA-000014",
	"LA-000015",
	"LA-000016",
	"LA-000017",
	"LA-000018",
	"LA-000019",
	"LA-000020",
	"LA-000021",
	"LA-000022",
	"LA-000023",
	"LA-000024",
	"LA-000025",
	"LA-000026",
	"LA-000027",
	"LA-000028",
	"LA-000029",
	"LA-000030",
	"LA-000031",
	"LA-000032",
	"LA-000033",
	"LA-000034",
	"LA-000035",
	"LA-000036",
	"LA-000037",
	"LA-000038",
	"LA-000039",
	"LA-000040",
	"LA-000041",
	"LA-000042",
	"LA-000043",
	"LA-000044",
	"LA-000045",
	"LA-000046",
	"LA-000047",
	"LA-000048",
	"LA-000049",
	"LA-000050",
	"LA-000051",
	"LA-000052",
	"LA-000053",
	"LA-000054",
	"LA-000055",
	"LA-000056",
}

// mock data for different type of activities
type rootNode struct {
	Lock      map[string]LockActivity      `json:"lock"`
	Operation map[string]OperationActivity `json:"operation"`
	System    map[string]SystemActivity    `json:"system"`
}

type LockActivity struct {
	Datetime         int    `json:"datetime"`
	UserName         string `json:"userName"`
	Description      string `json:"description"`
	LocationId       string `json:"locationId"`
	ScopeId          string `json:"scopeId"`
	KeySerialNumber  string `json:"keySerialNumber"`
	KeyName          string `json:"keyName"`
	LockSerialNumber string `json:"lockSerialNumber"`
	LockName         string `json:"lockName"`
	LockLocationId   string `json:"lockLocationId"`
	LockScopeId      string `json:"lockScopeId"`
}

type OperationActivity struct {
	Datetime    int    `json:"datetime"`
	UserName    string `json:"userName"`
	Description string `json:"description"`
}

type SystemActivity struct {
	Datetime    int    `json:"datetime"`
	Description string `json:"description"`
}

var numLockActivities int      // number of activity data will ge generated
var numOperationActivities int // number of activity data will ge generated
var numSystemActivities int    // number of activity data will ge generated

var cmdRoot = &cobra.Command{
	Use:   "",
	Short: "IMS security management system activity simulation data generator",
	Long:  `IMS security management system activity simulation data generator`,
	Run:   runCommand,
}

func init() {
	cmdRoot.Version = string(version)
	cmdRoot.InitDefaultVersionFlag()
	cmdRoot.Flags().IntVar(&numLockActivities, "lock", defaultLockActivities, "number of lock activities")
	cmdRoot.Flags().IntVar(&numOperationActivities, "operation", defaultOperationActivities, "number of operation activities")
	cmdRoot.Flags().IntVar(&numSystemActivities, "system", defaultSystemActivities, "number of system activities")
}

// Execute init cli commands, flags and read configuration
func Execute() {
	// run root command
	if err := cmdRoot.Execute(); err != nil {
		log.Fatal(err)
	}
}

func runCommand(cmd *cobra.Command, args []string) {
	// generate root json node
	root := rootNode{
		Lock:      newLockActivity(numLockActivities),
		Operation: newOperationActivity(numOperationActivities),
		System:    newSystemActivity(numSystemActivities),
	}

	// convert data center struct to json
	jsonByte, err := json.MarshalIndent(root, "", "    ")
	if err != nil {
		fmt.Printf("json marshal error: %v", err)
		os.Exit(1)
	}

	// print the json on screen
	fmt.Println("export default")
	fmt.Println(string(jsonByte))
}

func newLockActivity(count int) map[string]LockActivity {
	activity := map[string]LockActivity{}
	unixTime := time.Now().Unix()
	for i := 0; i < count; i++ {
		id := fmt.Sprintf("%s%05d", lockStartId, i)
		keySerialNumber := getKeySerialNumber()
		lockSerialNumber := getLockSerialNumber()
		activity[id] = LockActivity{
			Datetime:         int(unixTime),
			UserName:         getUserName(),
			Description:      fmt.Sprintf("Description: lock activity at %s", time.Unix(unixTime, 0).Format("2006-01-02 15:04:05")),
			LocationId:       getLocationId(),
			ScopeId:          getScopeId(),
			KeySerialNumber:  keySerialNumber,
			KeyName:          fmt.Sprintf("Key %s", keySerialNumber),
			LockSerialNumber: lockSerialNumber,
			LockName:         fmt.Sprintf("Lock %s", lockSerialNumber),
			LockLocationId:   getLocationId(),
			LockScopeId:      getScopeId(),
		}
		interval := rand.Intn(randomInterval)
		unixTime = unixTime - int64(interval)
	}
	return activity
}

func newOperationActivity(count int) map[string]OperationActivity {
	activity := map[string]OperationActivity{}
	unixTime := time.Now().Unix()
	for i := 0; i < count; i++ {
		id := fmt.Sprintf("%s%05d", operationStartId, i)
		activity[id] = OperationActivity{
			Datetime:    int(unixTime),
			UserName:    getUserName(),
			Description: fmt.Sprintf("Description: operation activity at %s", time.Unix(unixTime, 0).Format("2006-01-02 15:04:05")),
		}
		interval := rand.Intn(randomInterval)
		unixTime = unixTime - int64(interval)
	}
	return activity
}

func newSystemActivity(count int) map[string]SystemActivity {
	activity := map[string]SystemActivity{}
	unixTime := time.Now().Unix()
	for i := 0; i < count; i++ {
		id := fmt.Sprintf("%s%05d", systemStartId, i)
		activity[id] = SystemActivity{
			Datetime:    int(unixTime),
			Description: fmt.Sprintf("Description: system activity at %s", time.Unix(unixTime, 0).Format("2006-01-02 15:04:05")),
		}
		interval := rand.Intn(randomInterval)
		unixTime = unixTime - int64(interval)
	}
	return activity
}

func getUserName() string {
	return userNames[rand.Intn(len(userNames))]
}

func getLocationId() string {
	return locationIds[rand.Intn(len(locationIds))]
}

func getScopeId() string {
	return scopeIds[rand.Intn(len(scopeIds))]
}

func getKeySerialNumber() string {
	return keySerialNumbers[rand.Intn(len(keySerialNumbers))]
}

func getLockSerialNumber() string {
	return lockSerialNumbers[rand.Intn(len(lockSerialNumbers))]
}

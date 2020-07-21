package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User model structure for authen service internal use
type User struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`              // login user id foreign key
	Username  string             `json:"username,omitempty" bson:"username,omitempty"`   // login user name
	Password  []byte             `json:"password,omitempty" bson:"password,omitempty"`   // login user password
	FailAt    string             `json:"failAt,omitempty" bson:"failAt,omitempty"`       // initial login fail datetime
	FailCount string             `json:"failCount,omitempty" bson:"failCount,omitempty"` // login fail count
}

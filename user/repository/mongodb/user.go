package mongodb

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"creapptive.com/ims-security/api/model"
)

// mongodb user collection name
const userCollectionName = "users"

//
// implement repository user Interface interface
//

// CreateUser create a new model.User document in "user" collection
func (storer *StorerMongodb) CreateUser(user *model.User) (id string, err error) {
	id, err = storer.createOne(userCollectionName, user)
	if err != nil {
		return primitive.NilObjectID.Hex(), fmt.Errorf("fail to CreateUser(%v): %w", user.Username, err)
	}
	return id, nil
}

// ReadAllUsers read all model.User document in "user" collection
func (storer *StorerMongodb) ReadAllUsers() (users []*model.User, err error) {
	var cursor *driverCursor
	cursor, err = storer.findMany(userCollectionName, filterAll())
	if err != nil {
		return nil, fmt.Errorf("fail to ReadAllUsers.findMany(): %w", err)
	}
	for cursor.next() {
		var user model.User
		err = cursor.decode(&user)
		if err != nil {
			return nil, fmt.Errorf("fail to ReadAllUsers.decode(): %w", err)
		}
		users = append(users, &user)
	}
	return users, nil
}

// ReadUserByID read model.User document in "users" collection with the specified user ID
func (storer *StorerMongodb) ReadUserByID(idString string) (user *model.User, err error) {
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return nil, err
	}
	user = &model.User{}
	if primitive.ObjectID(id).IsZero() {
		return user, nil
	}
	result := storer.findOne(userCollectionName, filterID(primitive.ObjectID(id)))
	err = result.Decode(user)
	if err != nil {
		return nil, fmt.Errorf("fail to ReadUserByID.Decode(): %w", err)
	}
	return user, nil
}

// UpdateUserByUsername update model.User from document in "user" collection with the specified user
func (storer *StorerMongodb) UpdateUserByUsername(user *model.User) (count int64, err error) {
	filter := filterUsername(user.Username)
	update := updateSetDocument(user)
	return storer.updateOne(userCollectionName, filter, update)
}

// UpdateUserByID update model.User from document in "user" collection with the specified user
func (storer *StorerMongodb) UpdateUserByID(user *model.User) (count int64, err error) {
	id, err := primitive.ObjectIDFromHex(user.Id)
	if err != nil {
		return 0, err
	}
	filter := filterID(id)
	update := updateSetDocument(user)
	count, err = storer.updateOne(userCollectionName, filter, update)
	return count, err
}

// DeleteUserByID delete model.User from document in "user" collection with the specified user ID
func (storer *StorerMongodb) DeleteUserByID(idString string) (count int64, err error) {
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return 0, err
	}
	filter := filterID(id)
	return storer.deleteOne(userCollectionName, filter)
}

// DeleteAllUsers delete model.User document in "user" collection with specified search bson pattern
func (storer *StorerMongodb) DeleteAllUsers() (count int64, err error) {
	return storer.deleteMany(userCollectionName, filterAll())
}

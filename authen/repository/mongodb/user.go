package mongodb

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"

	authenModel "creapptive.com/ims-security/authen/model"
)

// mongodb user collection name
const userCollectionName = "users"

// user interfaces

// CreateUser create a new authenModel.User document in "users" collection
func (storer *StorerMongodb) CreateUser(user *authenModel.User) (id string, err error) {
	id, err = storer.createOne(userCollectionName, user)
	if err != nil {
		return primitive.NilObjectID.String(), fmt.Errorf("fail to CreateUser(%v): %w", user.Username, err)
	}
	return id, nil
}

// ReadAllUsers read all authenModel.User document in "users" collection
func (storer *StorerMongodb) ReadAllUsers() (users []*authenModel.User, err error) {
	var cursor *driverCursor
	cursor, err = storer.findMany(userCollectionName, filterAll())
	if err != nil {
		return nil, fmt.Errorf("fail to ReadAllUsers.findMany(): %w", err)
	}
	for cursor.next() {
		var user authenModel.User
		err = cursor.decode(&user)
		if err != nil {
			return nil, fmt.Errorf("fail to ReadAllUsers.decode(): %w", err)
		}
		users = append(users, &user)
	}
	return users, nil
}

// ReadUserByUsername read authenModel.User document in "users" collection with the specified username
func (storer *StorerMongodb) ReadUserByUsername(username string) (user *authenModel.User, err error) {
	user = &authenModel.User{}
	filter := filterUsername(username)
	result := storer.findOne(userCollectionName, filter)
	err = result.Decode(user)
	if err != nil {
		return nil, fmt.Errorf("fail to ReadUserByUsername.Decode(): %w", err)
	}
	return user, nil
}

// ReadUserByID read authenModel.User document in "users" collection with the specified user ID
func (storer *StorerMongodb) ReadUserByID(idString string) (user *authenModel.User, err error) {
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return nil, err
	}
	user = &authenModel.User{}
	if primitive.ObjectID(id).IsZero() {
		return user, nil
	}
	filter := filterID(primitive.ObjectID(id))
	result := storer.findOne(userCollectionName, filter)
	err = result.Decode(user)
	if err != nil {
		return nil, fmt.Errorf("fail to ReadUserByID.Decode(): %w", err)
	}
	return user, nil
}

// UpdateUserByUsername update authenModel.User from document in "users" collection with the specified user
func (storer *StorerMongodb) UpdateUserByUsername(user *authenModel.User) (count int64, err error) {
	filter := filterUsername(user.Username)
	update := updateSetDocument(user)
	return storer.updateOne(userCollectionName, filter, update)
}

// UpdateUserByID update authenModel.User from document in "users" collection with the specified user ID
func (storer *StorerMongodb) UpdateUserByID(user *authenModel.User) (count int64, err error) {
	filter := filterID(user.ID)
	update := updateSetDocument(user)
	count, err = storer.updateOne(userCollectionName, filter, update)
	return count, err
}

// UpdatePasswordByID update authenModel.User password from document in "users" collection with the specified user ID
func (storer *StorerMongodb) UpdatePasswordByID(user *authenModel.User) (count int64, err error) {
	filter := filterID(user.ID)
	update := updateSetPassword(user.Password)
	count, err = storer.updateOne(userCollectionName, filter, update)
	return count, err
}

// DeleteUserByID delete authenModel.User from document in "users" collection with the specified user ID
func (storer *StorerMongodb) DeleteUserByID(idString string) (count int64, err error) {
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return 0, err
	}
	filter := filterID(primitive.ObjectID(id))
	return storer.deleteOne(userCollectionName, filter)
}

// DeleteAllUsers delete all authenModel.User document in "users" collection
func (storer *StorerMongodb) DeleteAllUsers() (count int64, err error) {
	return storer.deleteMany(userCollectionName, filterAll())
}

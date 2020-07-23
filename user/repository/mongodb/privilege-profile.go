package mongodb

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"creapptive.com/ims-security/api/model"
)

// mongodb privilege profile collection name
const privilegeProfileCollectionName = "privilegeProfiles"

//
// implement repository privilege profile Interface interface
//

// CreatePrivilegeProfile create a new model.PrivilegeProfile document in "privilegeProfiles" collection
func (storer *StorerMongodb) CreatePrivilegeProfile(privilegeProfile *model.PrivilegeProfile) (id string, err error) {
	id, err = storer.createOne(privilegeProfileCollectionName, privilegeProfile)
	if err != nil {
		return "", fmt.Errorf("fail to CreatePrivilegeProfile(%+v): %w", privilegeProfile, err)
	}
	return id, nil
}

// ReadAllPrivilegeProfiles read all model.PrivilegeProfile document in "privilegeProfiles" collection
func (storer *StorerMongodb) ReadAllPrivilegeProfiles() (privilegeProfiles []*model.PrivilegeProfile, err error) {
	var cursor *driverCursor
	cursor, err = storer.findMany(privilegeProfileCollectionName, filterAll())
	if err != nil {
		return nil, fmt.Errorf("fail to ReadAllPrivilegeProfiles.findMany(): %w", err)
	}
	for cursor.next() {
		var privilegeProfile model.PrivilegeProfile
		err = cursor.decode(&privilegeProfile)
		if err != nil {
			return nil, fmt.Errorf("fail to ReadAllPrivilegeProfiles.decode(): %w", err)
		}
		privilegeProfiles = append(privilegeProfiles, &privilegeProfile)
	}
	return privilegeProfiles, nil
}

// ReadPrivilegeProfileByName read model.PrivilegeProfile document in "privilegeProfiles" collection with the specified privilege profile name
func (storer *StorerMongodb) ReadPrivilegeProfileByName(name string) (privilegeProfile *model.PrivilegeProfile, err error) {
	privilegeProfile = &model.PrivilegeProfile{}
	result := storer.findOne(privilegeProfileCollectionName, filterName(name))
	err = result.Decode(privilegeProfile)
	if err != nil {
		return nil, fmt.Errorf("fail to ReadPrivilegeProfileByName.Decode(): %w", err)
	}
	return privilegeProfile, nil
}

// ReadPrivilegeProfileByID read model.PrivilegeProfile document in "privilegeProfiles" collection with the specified privilege profile ID
func (storer *StorerMongodb) ReadPrivilegeProfileByID(idString string) (privilegeProfile *model.PrivilegeProfile, err error) {
	privilegeProfile = &model.PrivilegeProfile{}
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return nil, err
	}
	if primitive.ObjectID(id).IsZero() {
		return privilegeProfile, nil
	}
	result := storer.findOne(privilegeProfileCollectionName, filterID(primitive.ObjectID(id)))
	err = result.Decode(privilegeProfile)
	if err != nil {
		return nil, fmt.Errorf("fail to ReadPrivilegeProfileByID.Decode(): %w", err)
	}
	return privilegeProfile, nil
}

// UpdatePrivilegeProfileByName update model.PrivilegeProfile from document in "privilegeProfiles" collection with the specified privilege profile
func (storer *StorerMongodb) UpdatePrivilegeProfileByName(privilegeProfile *model.PrivilegeProfile) (count int64, err error) {
	filter := filterName(privilegeProfile.Name)
	update := updateSetDocument(privilegeProfile)
	return storer.updateOne(privilegeProfileCollectionName, filter, update)
}

// UpdatePrivilegeProfileByID update model.PrivilegeProfile from document in "privilegeProfiles" collection with the specified privilege profile
func (storer *StorerMongodb) UpdatePrivilegeProfileByID(privilegeProfile *model.PrivilegeProfile) (count int64, err error) {
	id, err := primitive.ObjectIDFromHex(privilegeProfile.Id)
	if err != nil {
		return 0, err
	}
	filter := filterID(id)
	update := updateSetDocument(privilegeProfile)
	return storer.updateOne(privilegeProfileCollectionName, filter, update)
}

// DeletePrivilegeProfileByID delete model.PrivilegeProfile from document in "privilegeProfiles" collection with the specified user ID
func (storer *StorerMongodb) DeletePrivilegeProfileByID(idString string) (count int64, err error) {
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return 0, err
	}
	filter := filterID(primitive.ObjectID(id))
	return storer.deleteOne(privilegeProfileCollectionName, filter)
}

// DeleteAllPrivilegeProfiles delete model.PrivilegeProfile document in "privilegeProfiles" collection with specified search bson pattern
func (storer *StorerMongodb) DeleteAllPrivilegeProfiles() (count int64, err error) {
	return storer.deleteMany(privilegeProfileCollectionName, filterAll())
}

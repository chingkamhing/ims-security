package mongodb

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"creapptive.com/ims-security/api/model"
)

// mongodb location collection name
const locationCollectionName = "locations"

//
// implement repository location Interface interface
// FIXME, UpdateLocation() need to support merging to the main location tree with the input location tree and insert node
// FIXME, UpdateLocation() need to check there is no duplicate location.Name within same tree level
//

// ReadLocation read all model.LocationNode document in "location.Locations" collection
func (storer *StorerMongodb) ReadLocation() (location []model.LocationNode, err error) {
	cursor, err := storer.findMany(locationCollectionName, filterAll())
	if err != nil {
		return nil, fmt.Errorf("fail to ReadLocation.findMany(): %w", err)
	}
	location = []model.LocationNode{}
	for cursor.next() {
		var locationNode model.LocationNode
		err = cursor.decode(&locationNode)
		if err != nil {
			return nil, fmt.Errorf("fail to ReadLocation.decode(): %w", err)
		}
		location = append(location, locationNode)
	}
	return location, nil
}

// UpdateLocation update model.LocationNode from document in "locations" collection with the specified location
func (storer *StorerMongodb) UpdateLocation(location []model.LocationNode) (count int64, err error) {
	var countOne int64
	for i := range location {
		id, err := primitive.ObjectIDFromHex(location[i].Id)
		if err != nil {
			return count, err
		}
		filter := filterID(id)
		update := updateSetDocument(location[i])
		countOne, err = storer.upsertOne(locationCollectionName, filter, update)
		if err != nil {
			return count, err
		}
		count += countOne
	}
	return count, nil
}

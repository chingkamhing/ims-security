package mongodb

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"creapptive.com/ims-security/api/model"
)

// mongodb scope collection name
const scopeCollectionName = "scopes"

//
// implement repository scope Interface interface
// FIXME, UpdateScope() need to support merging to the main scope tree with the input scope tree and insert node
// FIXME, UpdateScope() need to check there is no duplicate scope.Name within same tree level
//

// ReadScope read model.ScopeNode document in "scopes" collection
func (storer *StorerMongodb) ReadScope() (scope []model.ScopeNode, err error) {
	cursor, err := storer.findMany(scopeCollectionName, filterAll())
	if err != nil {
		return nil, fmt.Errorf("fail to ReadScope.findMany(): %w", err)
	}
	scope = []model.ScopeNode{}
	for cursor.next() {
		var scopeNode model.ScopeNode
		err = cursor.decode(&scopeNode)
		if err != nil {
			return nil, fmt.Errorf("fail to ReadScope.decode(): %w", err)
		}
		scope = append(scope, scopeNode)
	}
	return scope, nil
}

// UpdateScope update model.ScopeNode from document in "scopes" collection with the specified scope
func (storer *StorerMongodb) UpdateScope(scope []model.ScopeNode) (count int64, err error) {
	var countOne int64
	for i := range scope {
		id, err := primitive.ObjectIDFromHex(scope[i].Id)
		if err != nil {
			return count, err
		}
		filter := filterID(id)
		update := updateSetDocument(scope[i])
		countOne, err = storer.upsertOne(scopeCollectionName, filter, update)
		if err != nil {
			return count, err
		}
		count += countOne
	}
	return count, nil
}

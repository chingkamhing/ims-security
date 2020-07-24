package handler

import (
	"context"
	"encoding/json"

	"github.com/micro/go-micro/v2"
	"github.com/micro/go-micro/v2/client"
	log "github.com/micro/go-micro/v2/logger"

	message "creapptive.com/ims-security/api/message"
	"creapptive.com/ims-security/user/repository"
)

type User struct {
	repo       repository.Interface
	publishAll micro.Publisher
}

// NewUser create authen handler context
func NewUser(client client.Client, topic string) *User {
	return &User{
		repo:       repository.NewWithMigrateUp(),
		publishAll: micro.NewPublisher(topic, client),
	}
}

// Open open repository
func (u *User) Open() error {
	err := u.repo.Open()
	return err
}

// Close close repository
func (u *User) Close() error {
	err := u.repo.Close()
	return err
}

// CreateUser is a single request handler called via client.Call or the generated client code
func (u *User) CreateUser(ctx context.Context, req *message.CreateUserRequest, rsp *message.CreateUserReply) (err error) {
	log.Infof("CreateUser: %+v", req.User)
	id, err := u.repo.CreateUser(req.User)
	if err != nil {
		return err
	}
	// success, response data with the user info plus the created id
	rsp.Data = req.User
	rsp.Data.Id = id
	// send event message to all
	msgBlob, err := json.Marshal(rsp.Data)
	if err != nil {
		return err
	}
	err = u.publishAll.Publish(context.TODO(), &message.TopicAllMessage{
		Event: "CreateUser",
		Data:  string(msgBlob),
	})
	if err != nil {
		return err
	}
	log.Infof("Received User.CreateUser: created user %v", id)
	return nil
}

// GetUsers is a single request handler called via client.Call or the generated client code
func (u *User) GetUsers(ctx context.Context, req *message.GetUsersRequest, rsp *message.GetUsersReply) error {
	log.Info("Received User.GetUsers request")
	return nil
}

// GetUserByID is a single request handler called via client.Call or the generated client code
func (u *User) GetUserByID(ctx context.Context, req *message.GetUserByIDRequest, rsp *message.GetUserByIDReply) error {
	log.Info("Received User.GetUserByID request")
	return nil
}

// UpdateUser is a single request handler called via client.Call or the generated client code
func (u *User) UpdateUser(ctx context.Context, req *message.UpdateUserRequest, rsp *message.UpdateUserReply) error {
	log.Info("Received User.UpdateUser request")
	return nil
}

// DeleteUser is a single request handler called via client.Call or the generated client code
func (u *User) DeleteUser(ctx context.Context, req *message.DeleteUserRequest, rsp *message.DeleteUserReply) error {
	log.Info("Received User.DeleteUser request")
	return nil
}

// GetMyself is a single request handler called via client.Call or the generated client code
func (u *User) GetMyself(ctx context.Context, req *message.GetMyselfRequest, rsp *message.GetMyselfReply) error {
	log.Info("Received User.GetMyself request")
	return nil
}

// CreatePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (u *User) CreatePrivilegeProfile(ctx context.Context, req *message.CreatePrivilegeProfileRequest, rsp *message.CreatePrivilegeProfileReply) error {
	log.Info("Received User.CreatePrivilegeProfile request")
	return nil
}

// GetPrivilegeProfiles is a single request handler called via client.Call or the generated client code
func (u *User) GetPrivilegeProfiles(ctx context.Context, req *message.GetPrivilegeProfilesRequest, rsp *message.GetPrivilegeProfilesReply) error {
	log.Info("Received User.GetPrivilegeProfiles request")
	return nil
}

// GetPrivilegeProfileByID is a single request handler called via client.Call or the generated client code
func (u *User) GetPrivilegeProfileByID(ctx context.Context, req *message.GetPrivilegeProfileByIDRequest, rsp *message.GetPrivilegeProfileByIDReply) error {
	log.Info("Received User.GetPrivilegeProfileByID request")
	return nil
}

// UpdatePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (u *User) UpdatePrivilegeProfile(ctx context.Context, req *message.UpdatePrivilegeProfileRequest, rsp *message.UpdatePrivilegeProfileReply) error {
	log.Info("Received User.UpdatePrivilegeProfile request")
	return nil
}

// DeletePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (u *User) DeletePrivilegeProfile(ctx context.Context, req *message.DeletePrivilegeProfileRequest, rsp *message.DeletePrivilegeProfileReply) error {
	log.Info("Received User.DeletePrivilegeProfile request")
	return nil
}

// GetLocationTree is a single request handler called via client.Call or the generated client code
func (u *User) GetLocationTree(ctx context.Context, req *message.GetLocationTreeRequest, rsp *message.GetLocationTreeReply) error {
	log.Info("Received User.GetLocationTree request")
	return nil
}

// UpdateLocationTree is a single request handler called via client.Call or the generated client code
func (u *User) UpdateLocationTree(ctx context.Context, req *message.UpdateLocationTreeRequest, rsp *message.UpdateLocationTreeReply) error {
	log.Info("Received User.UpdateLocationTree request")
	return nil
}

// GetScopeTree is a single request handler called via client.Call or the generated client code
func (u *User) GetScopeTree(ctx context.Context, req *message.GetScopeTreeRequest, rsp *message.GetScopeTreeReply) error {
	log.Info("Received User.GetScopeTree request")
	return nil
}

// UpdateScopeTree is a single request handler called via client.Call or the generated client code
func (u *User) UpdateScopeTree(ctx context.Context, req *message.UpdateScopeTreeRequest, rsp *message.UpdateScopeTreeReply) error {
	log.Info("Received User.UpdateScopeTree request")
	return nil
}

// ChangeVersion is a single request handler called via client.Call or the generated client code
func (u *User) ChangeVersion(ctx context.Context, req *message.ChangeVersionRequest, rsp *message.ChangeVersionReply) error {
	log.Info("Received User.ChangeVersion request")
	return nil
}

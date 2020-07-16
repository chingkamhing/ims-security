package handler

import (
	"context"

	log "github.com/micro/go-micro/v2/logger"

	message "creapptive/go-micro/api/message"
)

type User struct{}

// CreateUser is a single request handler called via client.Call or the generated client code
func (e *User) CreateUser(ctx context.Context, req *message.CreateUserRequest, rsp *message.CreateUserReply) error {
	log.Info("Received User.CreateUser request")
	return nil
}

// GetUsers is a single request handler called via client.Call or the generated client code
func (e *User) GetUsers(ctx context.Context, req *message.GetUsersRequest, rsp *message.GetUsersReply) error {
	log.Info("Received User.GetUsers request")
	return nil
}

// GetUserByID is a single request handler called via client.Call or the generated client code
func (e *User) GetUserByID(ctx context.Context, req *message.GetUserByIDRequest, rsp *message.GetUserByIDReply) error {
	log.Info("Received User.GetUserByID request")
	return nil
}

// UpdateUser is a single request handler called via client.Call or the generated client code
func (e *User) UpdateUser(ctx context.Context, req *message.UpdateUserRequest, rsp *message.UpdateUserReply) error {
	log.Info("Received User.UpdateUser request")
	return nil
}

// DeleteUser is a single request handler called via client.Call or the generated client code
func (e *User) DeleteUser(ctx context.Context, req *message.DeleteUserRequest, rsp *message.DeleteUserReply) error {
	log.Info("Received User.DeleteUser request")
	return nil
}

// GetMyself is a single request handler called via client.Call or the generated client code
func (e *User) GetMyself(ctx context.Context, req *message.GetMyselfRequest, rsp *message.GetMyselfReply) error {
	log.Info("Received User.GetMyself request")
	return nil
}

// CreatePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (e *User) CreatePrivilegeProfile(ctx context.Context, req *message.CreatePrivilegeProfileRequest, rsp *message.CreatePrivilegeProfileReply) error {
	log.Info("Received User.CreatePrivilegeProfile request")
	return nil
}

// GetPrivilegeProfiles is a single request handler called via client.Call or the generated client code
func (e *User) GetPrivilegeProfiles(ctx context.Context, req *message.GetPrivilegeProfilesRequest, rsp *message.GetPrivilegeProfilesReply) error {
	log.Info("Received User.GetPrivilegeProfiles request")
	return nil
}

// GetPrivilegeProfileByID is a single request handler called via client.Call or the generated client code
func (e *User) GetPrivilegeProfileByID(ctx context.Context, req *message.GetPrivilegeProfileByIDRequest, rsp *message.GetPrivilegeProfileByIDReply) error {
	log.Info("Received User.GetPrivilegeProfileByID request")
	return nil
}

// UpdatePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (e *User) UpdatePrivilegeProfile(ctx context.Context, req *message.UpdatePrivilegeProfileRequest, rsp *message.UpdatePrivilegeProfileReply) error {
	log.Info("Received User.UpdatePrivilegeProfile request")
	return nil
}

// DeletePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (e *User) DeletePrivilegeProfile(ctx context.Context, req *message.DeletePrivilegeProfileRequest, rsp *message.DeletePrivilegeProfileReply) error {
	log.Info("Received User.DeletePrivilegeProfile request")
	return nil
}

// GetLocationTree is a single request handler called via client.Call or the generated client code
func (e *User) GetLocationTree(ctx context.Context, req *message.GetLocationTreeRequest, rsp *message.GetLocationTreeReply) error {
	log.Info("Received User.GetLocationTree request")
	return nil
}

// UpdateLocationTree is a single request handler called via client.Call or the generated client code
func (e *User) UpdateLocationTree(ctx context.Context, req *message.UpdateLocationTreeRequest, rsp *message.UpdateLocationTreeReply) error {
	log.Info("Received User.UpdateLocationTree request")
	return nil
}

// GetScopeTree is a single request handler called via client.Call or the generated client code
func (e *User) GetScopeTree(ctx context.Context, req *message.GetScopeTreeRequest, rsp *message.GetScopeTreeReply) error {
	log.Info("Received User.GetScopeTree request")
	return nil
}

// UpdateScopeTree is a single request handler called via client.Call or the generated client code
func (e *User) UpdateScopeTree(ctx context.Context, req *message.UpdateScopeTreeRequest, rsp *message.UpdateScopeTreeReply) error {
	log.Info("Received User.UpdateScopeTree request")
	return nil
}

// ChangeVersion is a single request handler called via client.Call or the generated client code
func (e *User) ChangeVersion(ctx context.Context, req *message.ChangeVersionRequest, rsp *message.ChangeVersionReply) error {
	log.Info("Received User.ChangeVersion request")
	return nil
}

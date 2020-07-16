package handler

import (
	"context"

	"github.com/micro/go-micro/v2/client"
	log "github.com/micro/go-micro/v2/logger"

	authen "creapptive.com/ims-security/api/authen"
	gateway "creapptive.com/ims-security/api/gateway"
	message "creapptive.com/ims-security/api/message"
	user "creapptive.com/ims-security/api/user"
)

const authenServiceName = "creapptive.service.authen"
const userServiceName = "creapptive.service.user"

type Gateway struct {
	authenClient authen.AuthenService
	userClient   user.UserService
}

func New(c client.Client) gateway.ApigatewayHandler {
	return &Gateway{
		authenClient: authen.NewAuthenService(authenServiceName, c),
		userClient:   user.NewUserService(userServiceName, c),
	}
}

// Login is a single request handler called via client.Call or the generated client code
func (e *Gateway) Login(ctx context.Context, req *message.LoginRequest, rsp *message.LoginReply) error {
	e.authenClient.Login(ctx, req)
	log.Info("Received Gateway.Login request")
	return nil
}

// CreateUser is a single request handler called via client.Call or the generated client code
func (e *Gateway) CreateUser(ctx context.Context, req *message.CreateUserRequest, rsp *message.CreateUserReply) error {
	log.Info("Received Gateway.CreateUser request")
	return nil
}

// GetUsers is a single request handler called via client.Call or the generated client code
func (e *Gateway) GetUsers(ctx context.Context, req *message.GetUsersRequest, rsp *message.GetUsersReply) error {
	e.userClient.GetUsers(ctx, req)
	log.Info("Received Gateway.GetUsers request")
	return nil
}

// GetUserByID is a single request handler called via client.Call or the generated client code
func (e *Gateway) GetUserByID(ctx context.Context, req *message.GetUserByIDRequest, rsp *message.GetUserByIDReply) error {
	log.Info("Received Gateway.GetUserByID request")
	return nil
}

// UpdateUser is a single request handler called via client.Call or the generated client code
func (e *Gateway) UpdateUser(ctx context.Context, req *message.UpdateUserRequest, rsp *message.UpdateUserReply) error {
	log.Info("Received Gateway.UpdateUser request")
	return nil
}

// DeleteUser is a single request handler called via client.Call or the generated client code
func (e *Gateway) DeleteUser(ctx context.Context, req *message.DeleteUserRequest, rsp *message.DeleteUserReply) error {
	log.Info("Received Gateway.DeleteUser request")
	return nil
}

// ChangePassword is a single request handler called via client.Call or the generated client code
func (e *Gateway) ChangePassword(ctx context.Context, req *message.ChangePasswordRequest, rsp *message.ChangePasswordReply) error {
	log.Info("Received Gateway.ChangePassword request")
	return nil
}

// ResetPassword is a single request handler called via client.Call or the generated client code
func (e *Gateway) ResetPassword(ctx context.Context, req *message.ResetPasswordRequest, rsp *message.ResetPasswordReply) error {
	log.Info("Received Gateway.ResetPassword request")
	return nil
}

// GetMyself is a single request handler called via client.Call or the generated client code
func (e *Gateway) GetMyself(ctx context.Context, req *message.GetMyselfRequest, rsp *message.GetMyselfReply) error {
	log.Info("Received Gateway.GetMyself request")
	return nil
}

// CreatePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (e *Gateway) CreatePrivilegeProfile(ctx context.Context, req *message.CreatePrivilegeProfileRequest, rsp *message.CreatePrivilegeProfileReply) error {
	log.Info("Received Gateway.CreatePrivilegeProfile request")
	return nil
}

// GetPrivilegeProfiles is a single request handler called via client.Call or the generated client code
func (e *Gateway) GetPrivilegeProfiles(ctx context.Context, req *message.GetPrivilegeProfilesRequest, rsp *message.GetPrivilegeProfilesReply) error {
	log.Info("Received Gateway.GetPrivilegeProfiles request")
	return nil
}

// GetPrivilegeProfileByID is a single request handler called via client.Call or the generated client code
func (e *Gateway) GetPrivilegeProfileByID(ctx context.Context, req *message.GetPrivilegeProfileByIDRequest, rsp *message.GetPrivilegeProfileByIDReply) error {
	log.Info("Received Gateway.GetPrivilegeProfileByID request")
	return nil
}

// UpdatePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (e *Gateway) UpdatePrivilegeProfile(ctx context.Context, req *message.UpdatePrivilegeProfileRequest, rsp *message.UpdatePrivilegeProfileReply) error {
	log.Info("Received Gateway.UpdatePrivilegeProfile request")
	return nil
}

// DeletePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (e *Gateway) DeletePrivilegeProfile(ctx context.Context, req *message.DeletePrivilegeProfileRequest, rsp *message.DeletePrivilegeProfileReply) error {
	log.Info("Received Gateway.DeletePrivilegeProfile request")
	return nil
}

// GetLocationTree is a single request handler called via client.Call or the generated client code
func (e *Gateway) GetLocationTree(ctx context.Context, req *message.GetLocationTreeRequest, rsp *message.GetLocationTreeReply) error {
	log.Info("Received Gateway.GetLocationTree request")
	return nil
}

// UpdateLocationTree is a single request handler called via client.Call or the generated client code
func (e *Gateway) UpdateLocationTree(ctx context.Context, req *message.UpdateLocationTreeRequest, rsp *message.UpdateLocationTreeReply) error {
	log.Info("Received Gateway.UpdateLocationTree request")
	return nil
}

// GetScopeTree is a single request handler called via client.Call or the generated client code
func (e *Gateway) GetScopeTree(ctx context.Context, req *message.GetScopeTreeRequest, rsp *message.GetScopeTreeReply) error {
	log.Info("Received Gateway.GetScopeTree request")
	return nil
}

// UpdateScopeTree is a single request handler called via client.Call or the generated client code
func (e *Gateway) UpdateScopeTree(ctx context.Context, req *message.UpdateScopeTreeRequest, rsp *message.UpdateScopeTreeReply) error {
	log.Info("Received Gateway.UpdateScopeTree request")
	return nil
}

// ChangeVersion is a single request handler called via client.Call or the generated client code
func (e *Gateway) ChangeVersion(ctx context.Context, req *message.ChangeVersionRequest, rsp *message.ChangeVersionReply) error {
	log.Info("Received Gateway.ChangeVersion request")
	return nil
}

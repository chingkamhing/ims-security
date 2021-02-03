package handler

import (
	"context"

	"github.com/asim/go-micro/v3/client"
	log "github.com/asim/go-micro/v3/logger"

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

func New(c client.Client, serviceNameMap map[string]string) gateway.ApigatewayHandler {
	return &Gateway{
		authenClient: authen.NewAuthenService(serviceNameMap["authen"], c),
		userClient:   user.NewUserService(serviceNameMap["user"], c),
	}
}

// Login is a single request handler called via client.Call or the generated client code
func (g *Gateway) Login(ctx context.Context, req *message.LoginRequest, rsp *message.LoginReply) error {
	g.authenClient.Login(ctx, req)
	log.Info("Received Gateway.Login request")
	return nil
}

// CreateUser is a single request handler called via client.Call or the generated client code
func (g *Gateway) CreateUser(ctx context.Context, req *message.CreateUserRequest, rsp *message.CreateUserReply) error {
	log.Infof("CreateUser: %+v", req.User)
	response, err := g.userClient.CreateUser(ctx, req)
	if err != nil {
		return err
	}
	*rsp = *response
	log.Info("Received Gateway.CreateUser request")
	return nil
}

// GetUsers is a single request handler called via client.Call or the generated client code
func (g *Gateway) GetUsers(ctx context.Context, req *message.GetUsersRequest, rsp *message.GetUsersReply) error {
	g.userClient.GetUsers(ctx, req)
	log.Info("Received Gateway.GetUsers request")
	return nil
}

// GetUserByID is a single request handler called via client.Call or the generated client code
func (g *Gateway) GetUserByID(ctx context.Context, req *message.GetUserByIDRequest, rsp *message.GetUserByIDReply) error {
	log.Info("Received Gateway.GetUserByID request")
	return nil
}

// UpdateUser is a single request handler called via client.Call or the generated client code
func (g *Gateway) UpdateUser(ctx context.Context, req *message.UpdateUserRequest, rsp *message.UpdateUserReply) error {
	log.Info("Received Gateway.UpdateUser request")
	return nil
}

// DeleteUser is a single request handler called via client.Call or the generated client code
func (g *Gateway) DeleteUser(ctx context.Context, req *message.DeleteUserRequest, rsp *message.DeleteUserReply) error {
	log.Info("Received Gateway.DeleteUser request")
	return nil
}

// ChangePassword is a single request handler called via client.Call or the generated client code
func (g *Gateway) ChangePassword(ctx context.Context, req *message.ChangePasswordRequest, rsp *message.ChangePasswordReply) error {
	log.Info("Received Gateway.ChangePassword request")
	return nil
}

// ResetPassword is a single request handler called via client.Call or the generated client code
func (g *Gateway) ResetPassword(ctx context.Context, req *message.ResetPasswordRequest, rsp *message.ResetPasswordReply) error {
	log.Info("Received Gateway.ResetPassword request")
	return nil
}

// GetMyself is a single request handler called via client.Call or the generated client code
func (g *Gateway) GetMyself(ctx context.Context, req *message.GetMyselfRequest, rsp *message.GetMyselfReply) error {
	log.Info("Received Gateway.GetMyself request")
	return nil
}

// CreatePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (g *Gateway) CreatePrivilegeProfile(ctx context.Context, req *message.CreatePrivilegeProfileRequest, rsp *message.CreatePrivilegeProfileReply) error {
	log.Info("Received Gateway.CreatePrivilegeProfile request")
	return nil
}

// GetPrivilegeProfiles is a single request handler called via client.Call or the generated client code
func (g *Gateway) GetPrivilegeProfiles(ctx context.Context, req *message.GetPrivilegeProfilesRequest, rsp *message.GetPrivilegeProfilesReply) error {
	log.Info("Received Gateway.GetPrivilegeProfiles request")
	return nil
}

// GetPrivilegeProfileByID is a single request handler called via client.Call or the generated client code
func (g *Gateway) GetPrivilegeProfileByID(ctx context.Context, req *message.GetPrivilegeProfileByIDRequest, rsp *message.GetPrivilegeProfileByIDReply) error {
	log.Info("Received Gateway.GetPrivilegeProfileByID request")
	return nil
}

// UpdatePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (g *Gateway) UpdatePrivilegeProfile(ctx context.Context, req *message.UpdatePrivilegeProfileRequest, rsp *message.UpdatePrivilegeProfileReply) error {
	log.Info("Received Gateway.UpdatePrivilegeProfile request")
	return nil
}

// DeletePrivilegeProfile is a single request handler called via client.Call or the generated client code
func (g *Gateway) DeletePrivilegeProfile(ctx context.Context, req *message.DeletePrivilegeProfileRequest, rsp *message.DeletePrivilegeProfileReply) error {
	log.Info("Received Gateway.DeletePrivilegeProfile request")
	return nil
}

// GetLocationTree is a single request handler called via client.Call or the generated client code
func (g *Gateway) GetLocationTree(ctx context.Context, req *message.GetLocationTreeRequest, rsp *message.GetLocationTreeReply) error {
	log.Info("Received Gateway.GetLocationTree request")
	return nil
}

// UpdateLocationTree is a single request handler called via client.Call or the generated client code
func (g *Gateway) UpdateLocationTree(ctx context.Context, req *message.UpdateLocationTreeRequest, rsp *message.UpdateLocationTreeReply) error {
	log.Info("Received Gateway.UpdateLocationTree request")
	return nil
}

// GetScopeTree is a single request handler called via client.Call or the generated client code
func (g *Gateway) GetScopeTree(ctx context.Context, req *message.GetScopeTreeRequest, rsp *message.GetScopeTreeReply) error {
	log.Info("Received Gateway.GetScopeTree request")
	return nil
}

// UpdateScopeTree is a single request handler called via client.Call or the generated client code
func (g *Gateway) UpdateScopeTree(ctx context.Context, req *message.UpdateScopeTreeRequest, rsp *message.UpdateScopeTreeReply) error {
	log.Info("Received Gateway.UpdateScopeTree request")
	return nil
}

// ChangeVersion is a single request handler called via client.Call or the generated client code
func (g *Gateway) ChangeVersion(ctx context.Context, req *message.ChangeVersionRequest, rsp *message.ChangeVersionReply) error {
	log.Info("Received Gateway.ChangeVersion request")
	return nil
}

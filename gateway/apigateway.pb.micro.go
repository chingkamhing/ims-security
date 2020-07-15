// Code generated by protoc-gen-micro. DO NOT EDIT.
// source: apigateway.proto

package creapptive_api

import (
	message "creapptive/go-micro/api/message"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	_ "github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger/options"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	math "math"
)

import (
	context "context"
	api "github.com/micro/go-micro/v2/api"
	client "github.com/micro/go-micro/v2/client"
	server "github.com/micro/go-micro/v2/server"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

// Reference imports to suppress errors if they are not otherwise used.
var _ api.Endpoint
var _ context.Context
var _ client.Option
var _ server.Option

// Api Endpoints for Apigateway service

func NewApigatewayEndpoints() []*api.Endpoint {
	return []*api.Endpoint{
		&api.Endpoint{
			Name:    "Apigateway.Login",
			Path:    []string{"/api/account/login"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.CreateUser",
			Path:    []string{"/api/user/create"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.GetUsers",
			Path:    []string{"/api/user/info"},
			Method:  []string{"GET"},
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.GetUserByID",
			Path:    []string{"/api/user/info"},
			Method:  []string{"POST"},
			Body:    "",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.UpdateUser",
			Path:    []string{"/api/user/update"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.DeleteUser",
			Path:    []string{"/api/user/delete"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.ChangePassword",
			Path:    []string{"/api/user/password"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.ResetPassword",
			Path:    []string{"/api/user/reset"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.GetMyself",
			Path:    []string{"/api/user/myself"},
			Method:  []string{"GET"},
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.CreatePrivilegeProfile",
			Path:    []string{"/api/privilege-profile/create"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.GetPrivilegeProfiles",
			Path:    []string{"/api/privilege-profile/info"},
			Method:  []string{"GET"},
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.GetPrivilegeProfileByID",
			Path:    []string{"/api/privilege-profile/info"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.UpdatePrivilegeProfile",
			Path:    []string{"/api/privilege-profile/update"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.DeletePrivilegeProfile",
			Path:    []string{"/api/privilege-profile/delete"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.GetLocationTree",
			Path:    []string{"/api/location/info"},
			Method:  []string{"GET"},
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.UpdateLocationTree",
			Path:    []string{"/api/location/update"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.GetScopeTree",
			Path:    []string{"/api/scope/info"},
			Method:  []string{"GET"},
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.UpdateScopeTree",
			Path:    []string{"/api/scope/update"},
			Method:  []string{"POST"},
			Body:    "*",
			Handler: "rpc",
		},
		&api.Endpoint{
			Name:    "Apigateway.ChangeVersion",
			Path:    []string{"/api/version"},
			Method:  []string{"POST"},
			Body:    "",
			Handler: "rpc",
		},
	}
}

// Client API for Apigateway service

type ApigatewayService interface {
	Login(ctx context.Context, in *message.LoginRequest, opts ...client.CallOption) (*message.LoginReply, error)
	CreateUser(ctx context.Context, in *message.CreateUserRequest, opts ...client.CallOption) (*message.CreateUserReply, error)
	GetUsers(ctx context.Context, in *message.GetUsersRequest, opts ...client.CallOption) (*message.GetUsersReply, error)
	GetUserByID(ctx context.Context, in *message.GetUserByIDRequest, opts ...client.CallOption) (*message.GetUserByIDReply, error)
	UpdateUser(ctx context.Context, in *message.UpdateUserRequest, opts ...client.CallOption) (*message.UpdateUserReply, error)
	DeleteUser(ctx context.Context, in *message.DeleteUserRequest, opts ...client.CallOption) (*message.DeleteUserReply, error)
	ChangePassword(ctx context.Context, in *message.ChangePasswordRequest, opts ...client.CallOption) (*message.ChangePasswordReply, error)
	ResetPassword(ctx context.Context, in *message.ResetPasswordRequest, opts ...client.CallOption) (*message.ResetPasswordReply, error)
	GetMyself(ctx context.Context, in *message.GetMyselfRequest, opts ...client.CallOption) (*message.GetMyselfReply, error)
	CreatePrivilegeProfile(ctx context.Context, in *message.CreatePrivilegeProfileRequest, opts ...client.CallOption) (*message.CreatePrivilegeProfileReply, error)
	GetPrivilegeProfiles(ctx context.Context, in *message.GetPrivilegeProfilesRequest, opts ...client.CallOption) (*message.GetPrivilegeProfilesReply, error)
	GetPrivilegeProfileByID(ctx context.Context, in *message.GetPrivilegeProfileByIDRequest, opts ...client.CallOption) (*message.GetPrivilegeProfileByIDReply, error)
	UpdatePrivilegeProfile(ctx context.Context, in *message.UpdatePrivilegeProfileRequest, opts ...client.CallOption) (*message.UpdatePrivilegeProfileReply, error)
	DeletePrivilegeProfile(ctx context.Context, in *message.DeletePrivilegeProfileRequest, opts ...client.CallOption) (*message.DeletePrivilegeProfileReply, error)
	GetLocationTree(ctx context.Context, in *message.GetLocationTreeRequest, opts ...client.CallOption) (*message.GetLocationTreeReply, error)
	UpdateLocationTree(ctx context.Context, in *message.UpdateLocationTreeRequest, opts ...client.CallOption) (*message.UpdateLocationTreeReply, error)
	GetScopeTree(ctx context.Context, in *message.GetScopeTreeRequest, opts ...client.CallOption) (*message.GetScopeTreeReply, error)
	UpdateScopeTree(ctx context.Context, in *message.UpdateScopeTreeRequest, opts ...client.CallOption) (*message.UpdateScopeTreeReply, error)
	ChangeVersion(ctx context.Context, in *message.ChangeVersionRequest, opts ...client.CallOption) (*message.ChangeVersionReply, error)
}

type apigatewayService struct {
	c    client.Client
	name string
}

func NewApigatewayService(name string, c client.Client) ApigatewayService {
	return &apigatewayService{
		c:    c,
		name: name,
	}
}

func (c *apigatewayService) Login(ctx context.Context, in *message.LoginRequest, opts ...client.CallOption) (*message.LoginReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.Login", in)
	out := new(message.LoginReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) CreateUser(ctx context.Context, in *message.CreateUserRequest, opts ...client.CallOption) (*message.CreateUserReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.CreateUser", in)
	out := new(message.CreateUserReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) GetUsers(ctx context.Context, in *message.GetUsersRequest, opts ...client.CallOption) (*message.GetUsersReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.GetUsers", in)
	out := new(message.GetUsersReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) GetUserByID(ctx context.Context, in *message.GetUserByIDRequest, opts ...client.CallOption) (*message.GetUserByIDReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.GetUserByID", in)
	out := new(message.GetUserByIDReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) UpdateUser(ctx context.Context, in *message.UpdateUserRequest, opts ...client.CallOption) (*message.UpdateUserReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.UpdateUser", in)
	out := new(message.UpdateUserReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) DeleteUser(ctx context.Context, in *message.DeleteUserRequest, opts ...client.CallOption) (*message.DeleteUserReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.DeleteUser", in)
	out := new(message.DeleteUserReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) ChangePassword(ctx context.Context, in *message.ChangePasswordRequest, opts ...client.CallOption) (*message.ChangePasswordReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.ChangePassword", in)
	out := new(message.ChangePasswordReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) ResetPassword(ctx context.Context, in *message.ResetPasswordRequest, opts ...client.CallOption) (*message.ResetPasswordReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.ResetPassword", in)
	out := new(message.ResetPasswordReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) GetMyself(ctx context.Context, in *message.GetMyselfRequest, opts ...client.CallOption) (*message.GetMyselfReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.GetMyself", in)
	out := new(message.GetMyselfReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) CreatePrivilegeProfile(ctx context.Context, in *message.CreatePrivilegeProfileRequest, opts ...client.CallOption) (*message.CreatePrivilegeProfileReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.CreatePrivilegeProfile", in)
	out := new(message.CreatePrivilegeProfileReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) GetPrivilegeProfiles(ctx context.Context, in *message.GetPrivilegeProfilesRequest, opts ...client.CallOption) (*message.GetPrivilegeProfilesReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.GetPrivilegeProfiles", in)
	out := new(message.GetPrivilegeProfilesReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) GetPrivilegeProfileByID(ctx context.Context, in *message.GetPrivilegeProfileByIDRequest, opts ...client.CallOption) (*message.GetPrivilegeProfileByIDReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.GetPrivilegeProfileByID", in)
	out := new(message.GetPrivilegeProfileByIDReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) UpdatePrivilegeProfile(ctx context.Context, in *message.UpdatePrivilegeProfileRequest, opts ...client.CallOption) (*message.UpdatePrivilegeProfileReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.UpdatePrivilegeProfile", in)
	out := new(message.UpdatePrivilegeProfileReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) DeletePrivilegeProfile(ctx context.Context, in *message.DeletePrivilegeProfileRequest, opts ...client.CallOption) (*message.DeletePrivilegeProfileReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.DeletePrivilegeProfile", in)
	out := new(message.DeletePrivilegeProfileReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) GetLocationTree(ctx context.Context, in *message.GetLocationTreeRequest, opts ...client.CallOption) (*message.GetLocationTreeReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.GetLocationTree", in)
	out := new(message.GetLocationTreeReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) UpdateLocationTree(ctx context.Context, in *message.UpdateLocationTreeRequest, opts ...client.CallOption) (*message.UpdateLocationTreeReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.UpdateLocationTree", in)
	out := new(message.UpdateLocationTreeReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) GetScopeTree(ctx context.Context, in *message.GetScopeTreeRequest, opts ...client.CallOption) (*message.GetScopeTreeReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.GetScopeTree", in)
	out := new(message.GetScopeTreeReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) UpdateScopeTree(ctx context.Context, in *message.UpdateScopeTreeRequest, opts ...client.CallOption) (*message.UpdateScopeTreeReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.UpdateScopeTree", in)
	out := new(message.UpdateScopeTreeReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apigatewayService) ChangeVersion(ctx context.Context, in *message.ChangeVersionRequest, opts ...client.CallOption) (*message.ChangeVersionReply, error) {
	req := c.c.NewRequest(c.name, "Apigateway.ChangeVersion", in)
	out := new(message.ChangeVersionReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for Apigateway service

type ApigatewayHandler interface {
	Login(context.Context, *message.LoginRequest, *message.LoginReply) error
	CreateUser(context.Context, *message.CreateUserRequest, *message.CreateUserReply) error
	GetUsers(context.Context, *message.GetUsersRequest, *message.GetUsersReply) error
	GetUserByID(context.Context, *message.GetUserByIDRequest, *message.GetUserByIDReply) error
	UpdateUser(context.Context, *message.UpdateUserRequest, *message.UpdateUserReply) error
	DeleteUser(context.Context, *message.DeleteUserRequest, *message.DeleteUserReply) error
	ChangePassword(context.Context, *message.ChangePasswordRequest, *message.ChangePasswordReply) error
	ResetPassword(context.Context, *message.ResetPasswordRequest, *message.ResetPasswordReply) error
	GetMyself(context.Context, *message.GetMyselfRequest, *message.GetMyselfReply) error
	CreatePrivilegeProfile(context.Context, *message.CreatePrivilegeProfileRequest, *message.CreatePrivilegeProfileReply) error
	GetPrivilegeProfiles(context.Context, *message.GetPrivilegeProfilesRequest, *message.GetPrivilegeProfilesReply) error
	GetPrivilegeProfileByID(context.Context, *message.GetPrivilegeProfileByIDRequest, *message.GetPrivilegeProfileByIDReply) error
	UpdatePrivilegeProfile(context.Context, *message.UpdatePrivilegeProfileRequest, *message.UpdatePrivilegeProfileReply) error
	DeletePrivilegeProfile(context.Context, *message.DeletePrivilegeProfileRequest, *message.DeletePrivilegeProfileReply) error
	GetLocationTree(context.Context, *message.GetLocationTreeRequest, *message.GetLocationTreeReply) error
	UpdateLocationTree(context.Context, *message.UpdateLocationTreeRequest, *message.UpdateLocationTreeReply) error
	GetScopeTree(context.Context, *message.GetScopeTreeRequest, *message.GetScopeTreeReply) error
	UpdateScopeTree(context.Context, *message.UpdateScopeTreeRequest, *message.UpdateScopeTreeReply) error
	ChangeVersion(context.Context, *message.ChangeVersionRequest, *message.ChangeVersionReply) error
}

func RegisterApigatewayHandler(s server.Server, hdlr ApigatewayHandler, opts ...server.HandlerOption) error {
	type apigateway interface {
		Login(ctx context.Context, in *message.LoginRequest, out *message.LoginReply) error
		CreateUser(ctx context.Context, in *message.CreateUserRequest, out *message.CreateUserReply) error
		GetUsers(ctx context.Context, in *message.GetUsersRequest, out *message.GetUsersReply) error
		GetUserByID(ctx context.Context, in *message.GetUserByIDRequest, out *message.GetUserByIDReply) error
		UpdateUser(ctx context.Context, in *message.UpdateUserRequest, out *message.UpdateUserReply) error
		DeleteUser(ctx context.Context, in *message.DeleteUserRequest, out *message.DeleteUserReply) error
		ChangePassword(ctx context.Context, in *message.ChangePasswordRequest, out *message.ChangePasswordReply) error
		ResetPassword(ctx context.Context, in *message.ResetPasswordRequest, out *message.ResetPasswordReply) error
		GetMyself(ctx context.Context, in *message.GetMyselfRequest, out *message.GetMyselfReply) error
		CreatePrivilegeProfile(ctx context.Context, in *message.CreatePrivilegeProfileRequest, out *message.CreatePrivilegeProfileReply) error
		GetPrivilegeProfiles(ctx context.Context, in *message.GetPrivilegeProfilesRequest, out *message.GetPrivilegeProfilesReply) error
		GetPrivilegeProfileByID(ctx context.Context, in *message.GetPrivilegeProfileByIDRequest, out *message.GetPrivilegeProfileByIDReply) error
		UpdatePrivilegeProfile(ctx context.Context, in *message.UpdatePrivilegeProfileRequest, out *message.UpdatePrivilegeProfileReply) error
		DeletePrivilegeProfile(ctx context.Context, in *message.DeletePrivilegeProfileRequest, out *message.DeletePrivilegeProfileReply) error
		GetLocationTree(ctx context.Context, in *message.GetLocationTreeRequest, out *message.GetLocationTreeReply) error
		UpdateLocationTree(ctx context.Context, in *message.UpdateLocationTreeRequest, out *message.UpdateLocationTreeReply) error
		GetScopeTree(ctx context.Context, in *message.GetScopeTreeRequest, out *message.GetScopeTreeReply) error
		UpdateScopeTree(ctx context.Context, in *message.UpdateScopeTreeRequest, out *message.UpdateScopeTreeReply) error
		ChangeVersion(ctx context.Context, in *message.ChangeVersionRequest, out *message.ChangeVersionReply) error
	}
	type Apigateway struct {
		apigateway
	}
	h := &apigatewayHandler{hdlr}
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.Login",
		Path:    []string{"/api/account/login"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.CreateUser",
		Path:    []string{"/api/user/create"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.GetUsers",
		Path:    []string{"/api/user/info"},
		Method:  []string{"GET"},
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.GetUserByID",
		Path:    []string{"/api/user/info"},
		Method:  []string{"POST"},
		Body:    "",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.UpdateUser",
		Path:    []string{"/api/user/update"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.DeleteUser",
		Path:    []string{"/api/user/delete"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.ChangePassword",
		Path:    []string{"/api/user/password"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.ResetPassword",
		Path:    []string{"/api/user/reset"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.GetMyself",
		Path:    []string{"/api/user/myself"},
		Method:  []string{"GET"},
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.CreatePrivilegeProfile",
		Path:    []string{"/api/privilege-profile/create"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.GetPrivilegeProfiles",
		Path:    []string{"/api/privilege-profile/info"},
		Method:  []string{"GET"},
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.GetPrivilegeProfileByID",
		Path:    []string{"/api/privilege-profile/info"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.UpdatePrivilegeProfile",
		Path:    []string{"/api/privilege-profile/update"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.DeletePrivilegeProfile",
		Path:    []string{"/api/privilege-profile/delete"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.GetLocationTree",
		Path:    []string{"/api/location/info"},
		Method:  []string{"GET"},
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.UpdateLocationTree",
		Path:    []string{"/api/location/update"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.GetScopeTree",
		Path:    []string{"/api/scope/info"},
		Method:  []string{"GET"},
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.UpdateScopeTree",
		Path:    []string{"/api/scope/update"},
		Method:  []string{"POST"},
		Body:    "*",
		Handler: "rpc",
	}))
	opts = append(opts, api.WithEndpoint(&api.Endpoint{
		Name:    "Apigateway.ChangeVersion",
		Path:    []string{"/api/version"},
		Method:  []string{"POST"},
		Body:    "",
		Handler: "rpc",
	}))
	return s.Handle(s.NewHandler(&Apigateway{h}, opts...))
}

type apigatewayHandler struct {
	ApigatewayHandler
}

func (h *apigatewayHandler) Login(ctx context.Context, in *message.LoginRequest, out *message.LoginReply) error {
	return h.ApigatewayHandler.Login(ctx, in, out)
}

func (h *apigatewayHandler) CreateUser(ctx context.Context, in *message.CreateUserRequest, out *message.CreateUserReply) error {
	return h.ApigatewayHandler.CreateUser(ctx, in, out)
}

func (h *apigatewayHandler) GetUsers(ctx context.Context, in *message.GetUsersRequest, out *message.GetUsersReply) error {
	return h.ApigatewayHandler.GetUsers(ctx, in, out)
}

func (h *apigatewayHandler) GetUserByID(ctx context.Context, in *message.GetUserByIDRequest, out *message.GetUserByIDReply) error {
	return h.ApigatewayHandler.GetUserByID(ctx, in, out)
}

func (h *apigatewayHandler) UpdateUser(ctx context.Context, in *message.UpdateUserRequest, out *message.UpdateUserReply) error {
	return h.ApigatewayHandler.UpdateUser(ctx, in, out)
}

func (h *apigatewayHandler) DeleteUser(ctx context.Context, in *message.DeleteUserRequest, out *message.DeleteUserReply) error {
	return h.ApigatewayHandler.DeleteUser(ctx, in, out)
}

func (h *apigatewayHandler) ChangePassword(ctx context.Context, in *message.ChangePasswordRequest, out *message.ChangePasswordReply) error {
	return h.ApigatewayHandler.ChangePassword(ctx, in, out)
}

func (h *apigatewayHandler) ResetPassword(ctx context.Context, in *message.ResetPasswordRequest, out *message.ResetPasswordReply) error {
	return h.ApigatewayHandler.ResetPassword(ctx, in, out)
}

func (h *apigatewayHandler) GetMyself(ctx context.Context, in *message.GetMyselfRequest, out *message.GetMyselfReply) error {
	return h.ApigatewayHandler.GetMyself(ctx, in, out)
}

func (h *apigatewayHandler) CreatePrivilegeProfile(ctx context.Context, in *message.CreatePrivilegeProfileRequest, out *message.CreatePrivilegeProfileReply) error {
	return h.ApigatewayHandler.CreatePrivilegeProfile(ctx, in, out)
}

func (h *apigatewayHandler) GetPrivilegeProfiles(ctx context.Context, in *message.GetPrivilegeProfilesRequest, out *message.GetPrivilegeProfilesReply) error {
	return h.ApigatewayHandler.GetPrivilegeProfiles(ctx, in, out)
}

func (h *apigatewayHandler) GetPrivilegeProfileByID(ctx context.Context, in *message.GetPrivilegeProfileByIDRequest, out *message.GetPrivilegeProfileByIDReply) error {
	return h.ApigatewayHandler.GetPrivilegeProfileByID(ctx, in, out)
}

func (h *apigatewayHandler) UpdatePrivilegeProfile(ctx context.Context, in *message.UpdatePrivilegeProfileRequest, out *message.UpdatePrivilegeProfileReply) error {
	return h.ApigatewayHandler.UpdatePrivilegeProfile(ctx, in, out)
}

func (h *apigatewayHandler) DeletePrivilegeProfile(ctx context.Context, in *message.DeletePrivilegeProfileRequest, out *message.DeletePrivilegeProfileReply) error {
	return h.ApigatewayHandler.DeletePrivilegeProfile(ctx, in, out)
}

func (h *apigatewayHandler) GetLocationTree(ctx context.Context, in *message.GetLocationTreeRequest, out *message.GetLocationTreeReply) error {
	return h.ApigatewayHandler.GetLocationTree(ctx, in, out)
}

func (h *apigatewayHandler) UpdateLocationTree(ctx context.Context, in *message.UpdateLocationTreeRequest, out *message.UpdateLocationTreeReply) error {
	return h.ApigatewayHandler.UpdateLocationTree(ctx, in, out)
}

func (h *apigatewayHandler) GetScopeTree(ctx context.Context, in *message.GetScopeTreeRequest, out *message.GetScopeTreeReply) error {
	return h.ApigatewayHandler.GetScopeTree(ctx, in, out)
}

func (h *apigatewayHandler) UpdateScopeTree(ctx context.Context, in *message.UpdateScopeTreeRequest, out *message.UpdateScopeTreeReply) error {
	return h.ApigatewayHandler.UpdateScopeTree(ctx, in, out)
}

func (h *apigatewayHandler) ChangeVersion(ctx context.Context, in *message.ChangeVersionRequest, out *message.ChangeVersionReply) error {
	return h.ApigatewayHandler.ChangeVersion(ctx, in, out)
}

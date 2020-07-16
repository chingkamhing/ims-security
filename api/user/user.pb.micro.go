// Code generated by protoc-gen-micro. DO NOT EDIT.
// source: user.proto

package creapptive_api

import (
	message "creapptive.com/ims-security/api/message"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
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

// Api Endpoints for User service

func NewUserEndpoints() []*api.Endpoint {
	return []*api.Endpoint{}
}

// Client API for User service

type UserService interface {
	CreateUser(ctx context.Context, in *message.CreateUserRequest, opts ...client.CallOption) (*message.CreateUserReply, error)
	GetUsers(ctx context.Context, in *message.GetUsersRequest, opts ...client.CallOption) (*message.GetUsersReply, error)
	GetUserByID(ctx context.Context, in *message.GetUserByIDRequest, opts ...client.CallOption) (*message.GetUserByIDReply, error)
	UpdateUser(ctx context.Context, in *message.UpdateUserRequest, opts ...client.CallOption) (*message.UpdateUserReply, error)
	DeleteUser(ctx context.Context, in *message.DeleteUserRequest, opts ...client.CallOption) (*message.DeleteUserReply, error)
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

type userService struct {
	c    client.Client
	name string
}

func NewUserService(name string, c client.Client) UserService {
	return &userService{
		c:    c,
		name: name,
	}
}

func (c *userService) CreateUser(ctx context.Context, in *message.CreateUserRequest, opts ...client.CallOption) (*message.CreateUserReply, error) {
	req := c.c.NewRequest(c.name, "User.CreateUser", in)
	out := new(message.CreateUserReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) GetUsers(ctx context.Context, in *message.GetUsersRequest, opts ...client.CallOption) (*message.GetUsersReply, error) {
	req := c.c.NewRequest(c.name, "User.GetUsers", in)
	out := new(message.GetUsersReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) GetUserByID(ctx context.Context, in *message.GetUserByIDRequest, opts ...client.CallOption) (*message.GetUserByIDReply, error) {
	req := c.c.NewRequest(c.name, "User.GetUserByID", in)
	out := new(message.GetUserByIDReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) UpdateUser(ctx context.Context, in *message.UpdateUserRequest, opts ...client.CallOption) (*message.UpdateUserReply, error) {
	req := c.c.NewRequest(c.name, "User.UpdateUser", in)
	out := new(message.UpdateUserReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) DeleteUser(ctx context.Context, in *message.DeleteUserRequest, opts ...client.CallOption) (*message.DeleteUserReply, error) {
	req := c.c.NewRequest(c.name, "User.DeleteUser", in)
	out := new(message.DeleteUserReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) GetMyself(ctx context.Context, in *message.GetMyselfRequest, opts ...client.CallOption) (*message.GetMyselfReply, error) {
	req := c.c.NewRequest(c.name, "User.GetMyself", in)
	out := new(message.GetMyselfReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) CreatePrivilegeProfile(ctx context.Context, in *message.CreatePrivilegeProfileRequest, opts ...client.CallOption) (*message.CreatePrivilegeProfileReply, error) {
	req := c.c.NewRequest(c.name, "User.CreatePrivilegeProfile", in)
	out := new(message.CreatePrivilegeProfileReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) GetPrivilegeProfiles(ctx context.Context, in *message.GetPrivilegeProfilesRequest, opts ...client.CallOption) (*message.GetPrivilegeProfilesReply, error) {
	req := c.c.NewRequest(c.name, "User.GetPrivilegeProfiles", in)
	out := new(message.GetPrivilegeProfilesReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) GetPrivilegeProfileByID(ctx context.Context, in *message.GetPrivilegeProfileByIDRequest, opts ...client.CallOption) (*message.GetPrivilegeProfileByIDReply, error) {
	req := c.c.NewRequest(c.name, "User.GetPrivilegeProfileByID", in)
	out := new(message.GetPrivilegeProfileByIDReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) UpdatePrivilegeProfile(ctx context.Context, in *message.UpdatePrivilegeProfileRequest, opts ...client.CallOption) (*message.UpdatePrivilegeProfileReply, error) {
	req := c.c.NewRequest(c.name, "User.UpdatePrivilegeProfile", in)
	out := new(message.UpdatePrivilegeProfileReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) DeletePrivilegeProfile(ctx context.Context, in *message.DeletePrivilegeProfileRequest, opts ...client.CallOption) (*message.DeletePrivilegeProfileReply, error) {
	req := c.c.NewRequest(c.name, "User.DeletePrivilegeProfile", in)
	out := new(message.DeletePrivilegeProfileReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) GetLocationTree(ctx context.Context, in *message.GetLocationTreeRequest, opts ...client.CallOption) (*message.GetLocationTreeReply, error) {
	req := c.c.NewRequest(c.name, "User.GetLocationTree", in)
	out := new(message.GetLocationTreeReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) UpdateLocationTree(ctx context.Context, in *message.UpdateLocationTreeRequest, opts ...client.CallOption) (*message.UpdateLocationTreeReply, error) {
	req := c.c.NewRequest(c.name, "User.UpdateLocationTree", in)
	out := new(message.UpdateLocationTreeReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) GetScopeTree(ctx context.Context, in *message.GetScopeTreeRequest, opts ...client.CallOption) (*message.GetScopeTreeReply, error) {
	req := c.c.NewRequest(c.name, "User.GetScopeTree", in)
	out := new(message.GetScopeTreeReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) UpdateScopeTree(ctx context.Context, in *message.UpdateScopeTreeRequest, opts ...client.CallOption) (*message.UpdateScopeTreeReply, error) {
	req := c.c.NewRequest(c.name, "User.UpdateScopeTree", in)
	out := new(message.UpdateScopeTreeReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *userService) ChangeVersion(ctx context.Context, in *message.ChangeVersionRequest, opts ...client.CallOption) (*message.ChangeVersionReply, error) {
	req := c.c.NewRequest(c.name, "User.ChangeVersion", in)
	out := new(message.ChangeVersionReply)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for User service

type UserHandler interface {
	CreateUser(context.Context, *message.CreateUserRequest, *message.CreateUserReply) error
	GetUsers(context.Context, *message.GetUsersRequest, *message.GetUsersReply) error
	GetUserByID(context.Context, *message.GetUserByIDRequest, *message.GetUserByIDReply) error
	UpdateUser(context.Context, *message.UpdateUserRequest, *message.UpdateUserReply) error
	DeleteUser(context.Context, *message.DeleteUserRequest, *message.DeleteUserReply) error
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

func RegisterUserHandler(s server.Server, hdlr UserHandler, opts ...server.HandlerOption) error {
	type user interface {
		CreateUser(ctx context.Context, in *message.CreateUserRequest, out *message.CreateUserReply) error
		GetUsers(ctx context.Context, in *message.GetUsersRequest, out *message.GetUsersReply) error
		GetUserByID(ctx context.Context, in *message.GetUserByIDRequest, out *message.GetUserByIDReply) error
		UpdateUser(ctx context.Context, in *message.UpdateUserRequest, out *message.UpdateUserReply) error
		DeleteUser(ctx context.Context, in *message.DeleteUserRequest, out *message.DeleteUserReply) error
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
	type User struct {
		user
	}
	h := &userHandler{hdlr}
	return s.Handle(s.NewHandler(&User{h}, opts...))
}

type userHandler struct {
	UserHandler
}

func (h *userHandler) CreateUser(ctx context.Context, in *message.CreateUserRequest, out *message.CreateUserReply) error {
	return h.UserHandler.CreateUser(ctx, in, out)
}

func (h *userHandler) GetUsers(ctx context.Context, in *message.GetUsersRequest, out *message.GetUsersReply) error {
	return h.UserHandler.GetUsers(ctx, in, out)
}

func (h *userHandler) GetUserByID(ctx context.Context, in *message.GetUserByIDRequest, out *message.GetUserByIDReply) error {
	return h.UserHandler.GetUserByID(ctx, in, out)
}

func (h *userHandler) UpdateUser(ctx context.Context, in *message.UpdateUserRequest, out *message.UpdateUserReply) error {
	return h.UserHandler.UpdateUser(ctx, in, out)
}

func (h *userHandler) DeleteUser(ctx context.Context, in *message.DeleteUserRequest, out *message.DeleteUserReply) error {
	return h.UserHandler.DeleteUser(ctx, in, out)
}

func (h *userHandler) GetMyself(ctx context.Context, in *message.GetMyselfRequest, out *message.GetMyselfReply) error {
	return h.UserHandler.GetMyself(ctx, in, out)
}

func (h *userHandler) CreatePrivilegeProfile(ctx context.Context, in *message.CreatePrivilegeProfileRequest, out *message.CreatePrivilegeProfileReply) error {
	return h.UserHandler.CreatePrivilegeProfile(ctx, in, out)
}

func (h *userHandler) GetPrivilegeProfiles(ctx context.Context, in *message.GetPrivilegeProfilesRequest, out *message.GetPrivilegeProfilesReply) error {
	return h.UserHandler.GetPrivilegeProfiles(ctx, in, out)
}

func (h *userHandler) GetPrivilegeProfileByID(ctx context.Context, in *message.GetPrivilegeProfileByIDRequest, out *message.GetPrivilegeProfileByIDReply) error {
	return h.UserHandler.GetPrivilegeProfileByID(ctx, in, out)
}

func (h *userHandler) UpdatePrivilegeProfile(ctx context.Context, in *message.UpdatePrivilegeProfileRequest, out *message.UpdatePrivilegeProfileReply) error {
	return h.UserHandler.UpdatePrivilegeProfile(ctx, in, out)
}

func (h *userHandler) DeletePrivilegeProfile(ctx context.Context, in *message.DeletePrivilegeProfileRequest, out *message.DeletePrivilegeProfileReply) error {
	return h.UserHandler.DeletePrivilegeProfile(ctx, in, out)
}

func (h *userHandler) GetLocationTree(ctx context.Context, in *message.GetLocationTreeRequest, out *message.GetLocationTreeReply) error {
	return h.UserHandler.GetLocationTree(ctx, in, out)
}

func (h *userHandler) UpdateLocationTree(ctx context.Context, in *message.UpdateLocationTreeRequest, out *message.UpdateLocationTreeReply) error {
	return h.UserHandler.UpdateLocationTree(ctx, in, out)
}

func (h *userHandler) GetScopeTree(ctx context.Context, in *message.GetScopeTreeRequest, out *message.GetScopeTreeReply) error {
	return h.UserHandler.GetScopeTree(ctx, in, out)
}

func (h *userHandler) UpdateScopeTree(ctx context.Context, in *message.UpdateScopeTreeRequest, out *message.UpdateScopeTreeReply) error {
	return h.UserHandler.UpdateScopeTree(ctx, in, out)
}

func (h *userHandler) ChangeVersion(ctx context.Context, in *message.ChangeVersionRequest, out *message.ChangeVersionReply) error {
	return h.UserHandler.ChangeVersion(ctx, in, out)
}

package handler

import (
	"context"
	"fmt"

	authen "creapptive.com/ims-security/api/authen"
	message "creapptive.com/ims-security/api/message"
	"creapptive.com/ims-security/authen/config"
	authenModel "creapptive.com/ims-security/authen/model"
	"creapptive.com/ims-security/authen/repository"
	"creapptive.com/ims-security/lib"
)

type Authen struct {
	repo repository.Interface
}

// NewAuthen create authen handler context
func NewAuthen() *Authen {
	return &Authen{
		repo: repository.NewWithMigrateUp(),
	}
}

// Open open repository
func (a *Authen) Open() error {
	err := a.repo.Open()
	return err
}

// Close close repository
func (a *Authen) Close() error {
	err := a.repo.Close()
	return err
}

// Login is a single request handler called via client.Call or the generated client code
func (a *Authen) Login(ctx context.Context, req *message.LoginRequest, rsp *authen.AuthenLoginReply) (err error) {
	// read the user's id, username and password
	var user *authenModel.User
	{
		user, err = a.repo.ReadUserByUsername(req.Username)
		if err != nil {
			return fmt.Errorf("fail Authen.Login(%s): %w", req.Username, err)
		}
	}
	// verify the user password
	err = lib.ComparePassword(req.Password, user.Password)
	if err != nil {
		return fmt.Errorf("fail Authen.Login(%s): %w", req.Username, err)
	}
	rsp.Data = &authen.AuthUser{
		Id:        user.ID.Hex(),
		Username:  user.Username,
		FailAt:    user.FailAt,
		FailCount: user.FailCount,
	}
	return nil
}

// ChangePassword is a single request handler called via client.Call or the generated client code
func (a *Authen) ChangePassword(ctx context.Context, req *message.ChangePasswordRequest, rsp *message.ChangePasswordReply) (err error) {
	// read the user's id, username and password
	var user *authenModel.User
	{
		user, err = a.repo.ReadUserByID(req.Id)
		if err != nil {
			return fmt.Errorf("fail Authen.ChangePassword(%s): %w", req.Id, err)
		}
	}
	// verify the user password
	err = lib.ComparePassword(req.OldPassword, user.Password)
	if err != nil {
		return fmt.Errorf("fail Authen.ChangePassword(%s): %w", req.Id, err)
	}
	// old password verified successfully, proceed to change password
	password, err := lib.HashPassword(req.NewPassword, config.Config.Service.Authen.MoreOrLessCost)
	if err != nil {
		return fmt.Errorf("fail Authen.ChangePassword(%s): %w", req.Id, err)
	}
	user.Password = password
	// update the user's password
	_, err = a.repo.UpdatePasswordByID(user)
	if err != nil {
		return fmt.Errorf("fail Authen.ChangePassword(%s): %w", req.Id, err)
	}
	rsp.Data = req.Id
	return nil
}

// ResetPassword is a single request handler called via client.Call or the generated client code
func (a *Authen) ResetPassword(ctx context.Context, req *message.ResetPasswordRequest, rsp *message.ResetPasswordReply) (err error) {
	// read the user's id, username and password
	var user *authenModel.User
	{
		user, err = a.repo.ReadUserByID(req.Id)
		if err != nil {
			return fmt.Errorf("fail Authen.ResetPassword(%s): %w", req.Id, err)
		}
	}
	// over-write the password with the default
	password, err := lib.HashPassword(config.Config.Service.Authen.DefaultPassword, config.Config.Service.Authen.MoreOrLessCost)
	if err != nil {
		return fmt.Errorf("fail Authen.ResetPassword(%s): %w", req.Id, err)
	}
	user.Password = password
	// update the user's password
	_, err = a.repo.UpdatePasswordByID(user)
	if err != nil {
		return fmt.Errorf("fail Authen.ResetPassword(%s): %w", req.Id, err)
	}
	rsp.Data = req.Id
	return nil
}

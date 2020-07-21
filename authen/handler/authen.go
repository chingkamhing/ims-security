package handler

import (
	"context"

	log "github.com/micro/go-micro/v2/logger"

	"creapptive.com/ims-security/api/message"
	"creapptive.com/ims-security/authen/repository"
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
func (a *Authen) Login(ctx context.Context, req *message.LoginRequest, rsp *message.LoginReply) error {
	log.Info("Received Authen.Login request")
	return nil
}

// ChangePassword is a single request handler called via client.Call or the generated client code
func (a *Authen) ChangePassword(ctx context.Context, req *message.ChangePasswordRequest, rsp *message.ChangePasswordReply) error {
	log.Info("Received Authen.ChangePassword request")
	return nil
}

// ResetPassword is a single request handler called via client.Call or the generated client code
func (a *Authen) ResetPassword(ctx context.Context, req *message.ResetPasswordRequest, rsp *message.ResetPasswordReply) error {
	log.Info("Received Authen.ResetPassword request")
	return nil
}

package handler

import (
	"context"

	log "github.com/micro/go-micro/v2/logger"

	message "creapptive.com/ims-security/api/message"
)

type Authen struct{}

// Login is a single request handler called via client.Call or the generated client code
func (e *Authen) Login(ctx context.Context, req *message.LoginRequest, rsp *message.LoginReply) error {
	log.Info("Received Authen.Login request")
	return nil
}

// ChangePassword is a single request handler called via client.Call or the generated client code
func (e *Authen) ChangePassword(ctx context.Context, req *message.ChangePasswordRequest, rsp *message.ChangePasswordReply) error {
	log.Info("Received Authen.ChangePassword request")
	return nil
}

// ResetPassword is a single request handler called via client.Call or the generated client code
func (e *Authen) ResetPassword(ctx context.Context, req *message.ResetPasswordRequest, rsp *message.ResetPasswordReply) error {
	log.Info("Received Authen.ResetPassword request")
	return nil
}

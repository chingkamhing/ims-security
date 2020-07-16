package subscriber

import (
	"context"

	log "github.com/micro/go-micro/v2/logger"

	user "creapptive.com/ims-security/api/user"
)

type User struct{}

func (e *User) Handle(ctx context.Context, msg *user.UserMessage) error {
	log.Info("Handler Received message: ", msg.Say)
	return nil
}

func Handler(ctx context.Context, msg *user.UserMessage) error {
	log.Info("Function Received message: ", msg.Say)
	return nil
}

package subscriber

import (
	"context"

	log "github.com/micro/go-micro/v2/logger"

	authen "creapptive.com/ims-security/api/authen"
)

type Authen struct{}

func (e *Authen) Handle(ctx context.Context, msg *authen.AuthenMessage) error {
	log.Info("Handler Received message: ", msg.Say)
	return nil
}

func Handler(ctx context.Context, msg *authen.AuthenMessage) error {
	log.Info("Function Received message: ", msg.Say)
	return nil
}

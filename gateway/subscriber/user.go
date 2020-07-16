package subscriber

import (
	"context"

	log "github.com/micro/go-micro/v2/logger"

	apigateway "creapptive.com/ims-security/api/apigateway"
)

type User struct{}

func (e *User) Handle(ctx context.Context, msg *apigateway.ApigatewayMessage) error {
	log.Info("Handler Received message: ", msg.Say)
	return nil
}

func Handler(ctx context.Context, msg *apigateway.ApigatewayMessage) error {
	log.Info("Function Received message: ", msg.Say)
	return nil
}

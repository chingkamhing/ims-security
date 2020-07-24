package subscriber

import (
	"context"
	"encoding/json"

	log "github.com/micro/go-micro/v2/logger"
	"go.mongodb.org/mongo-driver/bson/primitive"

	message "creapptive.com/ims-security/api/message"
	model "creapptive.com/ims-security/api/model"
	"creapptive.com/ims-security/authen/config"
	authenModel "creapptive.com/ims-security/authen/model"
	"creapptive.com/ims-security/authen/repository"
	"creapptive.com/ims-security/lib"
)

type AllEvent struct {
	repo repository.Interface
}

func NewAllEvent() *AllEvent {
	return &AllEvent{
		repo: repository.NewWithMigrateUp(),
	}
}

// Open open repository
func (allEvent *AllEvent) Open() error {
	err := allEvent.repo.Open()
	return err
}

// Close close repository
func (allEvent *AllEvent) Close() error {
	err := allEvent.repo.Close()
	return err
}

func (allEvent *AllEvent) Handle(ctx context.Context, msg *message.TopicAllMessage) error {
	//FIXME, what if there is any error here? user service already created a new user while authen service fail, how to handle this???
	log.Info("Received all event: %v", msg.Event)
	if msg.Event == "CreateUser" {
		user := model.User{}
		err := json.Unmarshal([]byte(msg.Data), &user)
		if err != nil {
			return err
		}
		userId, err := primitive.ObjectIDFromHex(user.Id)
		if err != nil {
			return err
		}
		password, err := lib.HashPassword(user.Password, config.Config.Service.Authen.MoreOrLessCost)
		if err != nil {
			return err
		}
		authenUser := &authenModel.User{
			ID:       userId,
			Username: user.Username,
			Password: password,
		}
		authenId, err := allEvent.repo.CreateUser(authenUser)
		if err != nil {
			return err
		}
		log.Infof("CreateUser: %v", authenId)
	}
	return nil
}

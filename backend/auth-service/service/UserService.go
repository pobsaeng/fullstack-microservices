package service

import (
	"authentication/database"
	"authentication/model"
	"errors"
)

func GetUserByEmail(user model.User) (model.User, error) {
	database.Instance.Where("username=? AND password=?",
		user.Username, user.Password).Find(&user)

	var err error
	if user.ID == 0 {
		err = errors.New("Username or Password incorrect.")
	}
	return user, err
}





























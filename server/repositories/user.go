package repositories

import (
	"wayshub/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	// CreateUser(user models.User) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
	DeleteUser(user models.User, ID int) (models.User, error)

	PlusSubscriber(user models.User) (models.User, error)
	MinusSubscriber(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Preload("Video").Preload("Comment").Find(&users).Error // add this code

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("Comment").Preload("Video").First(&user, ID).Error // add this code

	return user, err
}

// func (r *repository) CreateUser(user models.User) (models.User, error) {
// 	err := r.db.Create(&user).Error

// 	return user, err
// }

func (r *repository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error

	return user, err
}

func (r *repository) PlusSubscriber(user models.User) (models.User, error) {
	err := r.db.Preload("User").Save(&user).Error

	return user, err
}

func (r *repository) MinusSubscriber(user models.User) (models.User, error) {
	err := r.db.Preload("User").Save(&user).Error

	return user, err
}

func (r *repository) DeleteUser(user models.User, ID int) (models.User, error) {
	err := r.db.Delete(&user, ID).Scan(&user).Error

	return user, err
}

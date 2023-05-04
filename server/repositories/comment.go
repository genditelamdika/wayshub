package repositories

import (
	"wayshub/models"

	"gorm.io/gorm"
)

type CommentRepository interface {
	FindComment() ([]models.Comment, error)
	GetComment(ID int) (models.Comment, error)
	CreateComment(comment models.Comment) (models.Comment, error)
	UpdateComment(comment models.Comment) (models.Comment, error)
	DeleteComment(comment models.Comment) (models.Comment, error)
}

func RepositoryComment(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindComment() ([]models.Comment, error) {
	var comments []models.Comment
	err := r.db.Find(&comments).Error

	return comments, err
}

func (r *repository) GetComment(ID int) (models.Comment, error) {
	var comment models.Comment
	err := r.db.Preload("User").First(&comment, ID).Error

	return comment, err
}

func (r *repository) CreateComment(comment models.Comment) (models.Comment, error) {
	err := r.db.Preload("User").Create(&comment).Error

	return comment, err
}

func (r *repository) UpdateComment(comment models.Comment) (models.Comment, error) {
	err := r.db.Save(&comment).Error

	return comment, err
}

func (r *repository) DeleteComment(comment models.Comment) (models.Comment, error) {
	err := r.db.Delete(&comment).Error

	return comment, err
}

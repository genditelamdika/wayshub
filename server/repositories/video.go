package repositories

import (
	"fmt"
	"wayshub/models"

	"gorm.io/gorm"
)

type VideoRepository interface {
	FindVideo() ([]models.Video, error)
	FindVideoByUser(ID int) ([]models.Video, error)
	GetVideo(ID int) (models.Video, error)
	CreateVideo(video models.Video) (models.Video, error)
	UpdateVideo(video models.Video) (models.Video, error)
	DeleteVideo(video models.Video) (models.Video, error)

	UpdateViews(video models.Video) (models.Video, error)
}

func RepositoryVideo(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindVideo() ([]models.Video, error) {
	var videos []models.Video
	err := r.db.Preload("Comment").Preload("User").Find(&videos).Error

	return videos, err
}
func (r *repository) FindVideoByUser(ID int) ([]models.Video, error) {
	var videos []models.Video
	err := r.db.Preload("Comment").Preload("User").Find(&videos, "user_id = ?", ID).Error
	fmt.Println(ID)
	return videos, err
}

func (r *repository) GetVideo(ID int) (models.Video, error) {
	var video models.Video
	err := r.db.Preload("Comment").Preload("User").First(&video, ID).Error

	return video, err
}

func (r *repository) CreateVideo(video models.Video) (models.Video, error) {
	err := r.db.Create(&video).Error

	return video, err
}

func (r *repository) UpdateVideo(video models.Video) (models.Video, error) {
	err := r.db.Save(&video).Error

	return video, err
}

func (r *repository) DeleteVideo(video models.Video) (models.Video, error) {
	err := r.db.Delete(&video).Error

	return video, err
}

func (r *repository) UpdateViews(video models.Video) (models.Video, error) {
	err := r.db.Preload("User").Save(&video).Error

	return video, err
}

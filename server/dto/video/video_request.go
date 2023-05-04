package videosdto

import "wayshub/models"

type CreateVideoRequest struct {
	Title       string      `json:"title" form:"title" validate:"required"`
	Thumbnail   string      ` json:"thumbnail" form:"thumbnail" validate:"required"`
	Description string      ` json:"description" form:"description" validate:"required"`
	Video       string      ` json:"video" form:"video" validate:"required"`
	UserID      int         `json:"user_id"`
	User        models.User `json:"user"`
	// CreatedAt   time.Time `json:"created_at"`
	ViewCount int `json:"viewcount"  gorm:"type: int" `
}

type UpdateVideoRequest struct {
	Title       string `json:"title" gorm:"type: varchar(255)"`
	Thumbnail   string `gorm:"type: varchar(255)" json:"thumbnail"`
	Description string `gorm:"type: varchar(255)" json:"description"`
	Video       string `gorm:"type: varchar(255)" json:"video"`
	// CreatedAt   time.Time `json:"created_at"`
	ViewCount int `json:"viewcount" form:"viewcount" gorm:"type: int"`
}

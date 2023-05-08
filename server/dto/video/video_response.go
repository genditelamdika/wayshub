package videosdto

import "wayshub/models"

type VideoResponse struct {
	ID          int              `json:"id" `
	Title       string           `json:"title" gorm:"type: varchar(255)"`
	Thumbnail   string           `gorm:"type: varchar(255)" json:"thumbnail"`
	Description string           `gorm:"type: varchar(255)" json:"description"`
	Video       string           `gorm:"type: varchar(255)" json:"video"`
	UserID      int              `json:"user_id"`
	Comment     []models.Comment `json:"comment"`
	User        models.User      `json:"user"` // the associated Channel struct
	// CreatedAt time.Time `json:"created_at"`
	ViewCount int `json:"viewcount" form:"viewcount" gorm:"type: int"`
}

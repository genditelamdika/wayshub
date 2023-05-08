package commentsdto

import "wayshub/models"

type CommentResponse struct {
	ID      int          `json:"id"`
	Comment string       `gorm:"type: varchar(255)" json:"comment"`
	UserID  int          `json:"user_id"`
	User    models.User  `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	VideoID int          `json:"video_id"`
	Video   models.Video `json:"video"`
}

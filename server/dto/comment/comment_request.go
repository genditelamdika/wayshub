package commentsdto

type CreateCommentRequest struct {
	Comment string `gorm:"type: varchar(255)" json:"comment" form:"comment"`
	UserID  int    `json:"user_id" form:"user_id"`
	// User      UsersProfileResponse      `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	VideoID int `json:"video_id" form:"video_id"`
}

type UpdateCommentRequest struct {
	Comment string `gorm:"type: varchar(255)" json:"comment"`
}

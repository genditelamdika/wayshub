package commentsdto

type CreateCommentRequest struct {
	Comment string `gorm:"type: varchar(255)" json:"comment"`
	UserID  int    `json:"user_id"`
	// User      UsersProfileResponse      `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	VideoID int `json:"video_id"`
}

type UpdateCommentRequest struct {
	Comment string `gorm:"type: varchar(255)" json:"comment"`
}

package commentsdto

type CommentResponse struct {
	ID      int    `json:"id"`
	Comment string `gorm:"type: varchar(255)" json:"comment"`
}

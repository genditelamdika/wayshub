package models

import "time"

type Comment struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	Comment   string    `gorm:"type: varchar(255)" json:"comment"`
	CreatedAt time.Time `json:"created_at"`
	UserID    int       `json:"user_id"`
	User      User      `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	VideoID   int       `json:"video_id"`
	Video     Video     `json:"video"`
	// Comment     []Comment `json:"comment" `
	// Video     string    `json:"video" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

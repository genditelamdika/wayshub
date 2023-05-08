package models

type Subscribe struct {
	ID         int    `json:"id" gorm:"primary_key:auto_increment"`
	OtherID    int    `json:"other_id"`
	OtherName  string `json:"otherName" gorm:"type: varchar(255)"`
	OtherPhoto string `json:"otherPhoto" gorm:"type: varchar(255)"`
	UserID     int    `json:"user_id"`
	User       User   `json:"user"`
}

type SubscribeResponse struct {
	ID     int  `json:"id"`
	UserID int  `json:"user_id"`
	User   User `json:"-"`
}

type SubscribeChannelResponse struct {
	ID     int  `json:"id"`
	UserID int  `json:"user_id"`
	User   User `json:"-"`
}

func (SubscribeResponse) TableName() string {
	return "subscribers"
}

func (SubscribeChannelResponse) TableName() string {
	return "subscribers"
}

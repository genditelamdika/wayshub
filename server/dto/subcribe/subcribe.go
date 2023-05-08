package subscribedto

type SubscribeRequest struct {
	UserID  int `json:"user_id"`
	OtherID int `json:"other_id"`
}

type CreateSubscribeRequest struct {
	UserID  int `json:"user_id"`
	OtherID int `json:"other_id"`
}

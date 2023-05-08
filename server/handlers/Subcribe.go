package handlers

import (
	"net/http"
	"os"
	"strconv"
	dto "wayshub/dto/result"
	subscribedto "wayshub/dto/subcribe"
	"wayshub/models"
	"wayshub/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerSubscribe struct {
	SubscribeRepository repositories.SubscribeRepository
}

func HandlerSubscribe(SubscribeRepository repositories.SubscribeRepository) *handlerSubscribe {
	return &handlerSubscribe{SubscribeRepository}
}

func (h *handlerSubscribe) FindSubscribes(c echo.Context) error {
	channelInfo := c.Request().Context().Value("channelInfo").(jwt.MapClaims)
	userId := int(channelInfo["id"].(float64))

	subscribes, err := h.SubscribeRepository.FindSubscribes(userId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range subscribes {
		subscribes[i].OtherPhoto = os.Getenv("PATH_FILE") + p.OtherPhoto
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: subscribes})
}

func (h *handlerSubscribe) GetSubscribe(c echo.Context) error {
	c.Response().Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(c.Param("id"))

	var subscribe models.Subscribe
	subscribe, err := h.SubscribeRepository.GetSubscribe(id)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: subscribe})
}

func (h *handlerSubscribe) GetSubscribeByOther(c echo.Context) error {
	c.Response().Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(c.Param("id"))

	var subscribe models.Subscribe
	subscribe, err := h.SubscribeRepository.GetSubscribeByOther(id)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: subscribe})
}

func (h *handlerSubscribe) CreateSubscribe(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	request := new(subscribedto.CreateSubscribeRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	other, err := h.SubscribeRepository.GetOther(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	subscribe := models.Subscribe{
		UserID:     int(userId),
		OtherID:    id,
		OtherName:  other.Chanelname,
		OtherPhoto: other.Fhoto,
		// OtherVideo: other.Video,
	}

	subscribe, err = h.SubscribeRepository.CreateSubscribe(subscribe)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: subscribe})
}

func (h *handlerSubscribe) DeleteSubscribe(c echo.Context) error {
	channelInfo := c.Get("channelInfo").(jwt.MapClaims)
	userId := int(channelInfo["id"].(float64))

	subscribe, err := h.SubscribeRepository.GetSubscribe(userId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.SubscribeRepository.DeleteSubscribe(subscribe)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
func (h *handlerSubscribe) GetSubscription(c echo.Context) error {
	channelInfo := c.Get("channelInfo").(jwt.MapClaims)
	userId := int(channelInfo["id"].(float64))

	subscribe, err := h.SubscribeRepository.GetSubscription(userId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: subscribe})
}

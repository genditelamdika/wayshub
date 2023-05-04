package handlers

import (

	// "github.com/go-playground/validator/v10"
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	dto "wayshub/dto/result"
	usersdto "wayshub/dto/user"
	"wayshub/models"
	"wayshub/pkg/bcrypt"
	"wayshub/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/labstack/echo/v4"
)

// var path_file = "http://localhost:5000/uploads/"

type handler struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) FindUsers(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// for i, p := range users {
	// 	users[i].Fhoto = path_file + p.Fhoto
	// }
	// for i, p := range users {
	// 	users[i].Thumbnail = path_file + p.Thumbnail
	// }

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: users})
}

func (h *handler) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// user.Fhoto = path_file + user.Fhoto
	// user.Thumbnail = path_file + user.Thumbnail

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}
func (h *handler) UpdateUser(c echo.Context) error {
	// request := new(usersdto.UpdateUserRequest)
	// if err := c.Bind(&request); err != nil {
	// 	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	// }
	// get the datafile here
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	dataFhoto := c.Get("dataFhoto").(string)
	fmt.Println("this is data file", dataFhoto)
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp1, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "uploads"})
	resp2, err := cld.Upload.Upload(ctx, dataFhoto, uploader.UploadParams{Folder: "uploads"})

	if err != nil {
		fmt.Println(err.Error())
	}

	request := usersdto.CreateUserRequest{
		Chanelname:  c.FormValue("chanelname"),
		Email:       c.FormValue("email"),
		Password:    c.FormValue("password"),
		Fhoto:       resp1.SecureURL,
		Thumbnail:   resp2.SecureURL,
		Description: c.FormValue("description"),
	}

	id, _ := strconv.Atoi(c.Param("id"))

	film, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Email != "" {
		film.Email = request.Email
	}
	if request.Password != "" {
		film.Password, _ = bcrypt.HashingPassword(request.Password)
	}
	if request.Chanelname != "" {
		film.Chanelname = request.Chanelname
	}
	if request.Fhoto != "" {
		film.Fhoto = request.Fhoto
	}
	if request.Thumbnail != "" {
		film.Thumbnail = request.Thumbnail
	}

	if request.Description != "" {
		film.Description = request.Description
	}

	data, err := h.UserRepository.UpdateUser(film)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)})
}

func (h *handler) DeleteUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.UserRepository.DeleteUser(user, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)})
}

func convertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:          u.ID,
		Chanelname:  u.Chanelname,
		Email:       u.Email,
		Password:    u.Password,
		Fhoto:       u.Fhoto,
		Thumbnail:   u.Thumbnail,
		Description: u.Description,
		// Address:    u.Address,
	}
}

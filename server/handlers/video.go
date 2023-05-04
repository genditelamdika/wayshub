package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	dto "wayshub/dto/result"
	videosdto "wayshub/dto/video"
	"wayshub/models"
	"wayshub/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

// var path_file = "http://localhost:5000/uploads/"

type handlervideo struct {
	VideoRepository repositories.VideoRepository
}

func HandlerVideo(VideoRepository repositories.VideoRepository) *handlervideo {
	return &handlervideo{VideoRepository}
}

func (h *handlervideo) FindVideo(c echo.Context) error {
	videos, err := h.VideoRepository.FindVideo()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// for i, p := range videos {
	// 	videos[i].Thumbnail = path_file + p.Thumbnail
	// }

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: videos})
}

func (h *handlervideo) GetVideo(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	video, err := h.VideoRepository.GetVideo(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// video.Thumbnail = path_file + video.Thumbnail

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponsevideo(video)})
}
func (h *handlervideo) CreateVideo(c echo.Context) error {
	// get the datafile here
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	dataVideo := c.Get("dataVideo").(string)
	fmt.Println("this is data file", dataVideo)

	viewcount, _ := strconv.Atoi(c.FormValue("viewcount"))
	userid, _ := strconv.Atoi(c.FormValue("user_id"))

	request := videosdto.CreateVideoRequest{
		Title:       c.FormValue("title"),
		Thumbnail:   dataFile,
		Description: c.FormValue("description"),
		Video:       dataVideo,
		ViewCount:   viewcount,
		UserID:      userid,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp1, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "uploads"})
	resp2, err := cld.Upload.Upload(ctx, dataVideo, uploader.UploadParams{Folder: "uploads"})

	if err != nil {
		fmt.Println(err.Error())
	}

	video := models.Video{
		Title:       request.Title,
		Thumbnail:   resp1.SecureURL,
		Description: request.Description,
		Video:       resp2.SecureURL,
		ViewCount:   request.ViewCount,
		UserID:      request.UserID,
	}

	video, err = h.VideoRepository.CreateVideo(video)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	video, _ = h.VideoRepository.GetVideo(video.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: video})
}

func (h *handlervideo) UpdateVideo(c echo.Context) error {
	// request := new(videosdto.UpdateVideoRequest)
	// if err := c.Bind(&request); err != nil {
	// 	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	// }
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	ViewCount, _ := strconv.Atoi(c.FormValue("viewcount"))

	request := videosdto.VideoResponse{
		Title: c.FormValue("title"),

		Thumbnail:   dataFile,
		Description: c.FormValue("description"),
		ViewCount:   ViewCount,
	}

	id, _ := strconv.Atoi(c.Param("id"))

	video, err := h.VideoRepository.GetVideo(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Title != "" {
		video.Title = request.Title
	}

	if request.Thumbnail != "" {
		video.Thumbnail = request.Thumbnail
	}
	if request.ViewCount != 0 {
		video.ViewCount = request.ViewCount
	}

	if request.Description != "" {
		video.Description = request.Description
	}

	data, err := h.VideoRepository.UpdateVideo(video)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponsevideo(data)})
}

func (h *handlervideo) DeleteVideo(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	video, err := h.VideoRepository.GetVideo(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.VideoRepository.DeleteVideo(video)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponsevideo(data)})
}

func convertResponsevideo(u models.Video) models.Video {
	return models.Video{
		ID:          u.ID,
		Title:       u.Title,
		Thumbnail:   u.Thumbnail,
		Description: u.Description,
		Video:       u.Video,
		ViewCount:   u.ViewCount,
	}
}

package handlers

import (
	"net/http"
	"strconv"
	commentsdto "wayshub/dto/comment"
	dto "wayshub/dto/result"
	"wayshub/models"
	"wayshub/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

// var path_file = "http://localhost:5000/uploads/"

type handlercomment struct {
	CommentRepository repositories.CommentRepository
}

func HandlerComment(CommentRepository repositories.CommentRepository) *handlercomment {
	return &handlercomment{CommentRepository}
}

func (h *handlercomment) FindComment(c echo.Context) error {
	comments, err := h.CommentRepository.FindComment()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// for i, p := range comments {
	// 	comments[i].Thumbnail = path_file + p.Thumbnail
	// }

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: comments})
}

func (h *handlercomment) GetComment(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	comment, err := h.CommentRepository.GetComment(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// comment.Thumbnail = path_file + comment.Thumbnail

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponsecomment(comment)})
}
func (h *handlercomment) CreateComment(c echo.Context) error {
	request := new(commentsdto.CreateCommentRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// UserID, _ := strconv.Atoi(c.FormValue("UserID"))

	comment := models.Comment{
		Comment: request.Comment,
		UserID:  request.UserID,
		// User:    request.User,
		VideoID: request.VideoID,
	}

	data, err := h.CommentRepository.CreateComment(comment)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponsecomment(data)})
}

func (h *handlercomment) UpdateComment(c echo.Context) error {
	request := new(commentsdto.UpdateCommentRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	comment, err := h.CommentRepository.GetComment(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Comment != "" {
		comment.Comment = request.Comment
	}

	data, err := h.CommentRepository.UpdateComment(comment)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponsecomment(data)})
}

func (h *handlercomment) DeleteComment(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	comment, err := h.CommentRepository.GetComment(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.CommentRepository.DeleteComment(comment)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponsecomment(data)})
}

func convertResponsecomment(u models.Comment) models.Comment {
	return models.Comment{
		ID:      u.ID,
		Comment: u.Comment,
		UserID:  u.UserID,
		VideoID: u.VideoID,
	}
}

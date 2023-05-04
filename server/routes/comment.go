package routes

import (
	"wayshub/handlers"
	"wayshub/pkg/mysql"
	"wayshub/repositories"

	"github.com/labstack/echo/v4"
)

func CommentRoutes(e *echo.Group) {
	commentRepository := repositories.RepositoryComment(mysql.DB)
	h := handlers.HandlerComment(commentRepository)

	e.GET("/comments", h.FindComment)
	e.GET("/comment/:id", h.GetComment)
	e.POST("/comment", h.CreateComment)
	e.PATCH("/comment/:id", h.UpdateComment)
	e.DELETE("/comment/:id", h.DeleteComment)
}

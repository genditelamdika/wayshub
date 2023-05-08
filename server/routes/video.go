package routes

import (
	"wayshub/handlers"
	"wayshub/pkg/middleware"
	"wayshub/pkg/mysql"
	"wayshub/repositories"

	"github.com/labstack/echo/v4"
)

func VideoRoutes(e *echo.Group) {
	videoRepository := repositories.RepositoryVideo(mysql.DB)
	h := handlers.HandlerVideo(videoRepository)

	e.GET("/videos", h.FindVideo)
	e.GET("/user/:id/video", h.FindVideoByUser)
	e.GET("/video/:id", h.GetVideo)
	e.POST("/video", middleware.UploadFile(middleware.UploadVideo(h.CreateVideo)))
	e.PATCH("/video/:id", middleware.UploadFile(middleware.UploadVideo(h.UpdateVideo)))
	e.PATCH("/UpdateViews/:id", middleware.Auth(h.UpdateViews))
	e.DELETE("/video/:id", h.DeleteVideo)
}

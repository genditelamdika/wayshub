package middleware

import (
	"io"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func UploadVideo(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		file, err := c.FormFile("video")
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		src, err := file.Open()
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}
		defer src.Close()

		tempFile, err := ioutil.TempFile("uploads/videos", "video-*.mp4")
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}
		defer tempFile.Close()

		if _, err = io.Copy(tempFile, src); err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		data := tempFile.Name()
		// filename := data[8:] // split uploads/

		c.Set("dataVideo", data)
		return next(c)
	}
}

// package middleware

// import (
// 	"context"
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"net/http"
// )

// func UploadVideo(next http.HandlerFunc) http.HandlerFunc {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		// Upload file
// 		// FormFile returns the first file for the given key `myFile`
// 		// it also returns the FileHeader so we can get the Filename,
// 		// the Header and the size of the file
// 		file, _, err := r.FormFile("video")

// 		if err != nil {
// 			fmt.Println(err)
// 			json.NewEncoder(w).Encode("Error Retrieving the File")
// 			return
// 		}
// 		defer file.Close()
// 		// fmt.Printf("Uploaded File: %+v\n", handler.Filename)
// 		// fmt.Printf("File Size: %+v\n", handler.Size)
// 		// fmt.Printf("MIME Header: %+v\n", handler.Header)
// 		const MAX_UPLOAD_SIZE = 10 << 20 // 10MB
// 		// Parse our multipart form, 10 << 20 specifies a maximum
// 		// upload of 10 MB files.
// 		r.ParseMultipartForm(MAX_UPLOAD_SIZE)
// 		if r.ContentLength > MAX_UPLOAD_SIZE {
// 			w.WriteHeader(http.StatusBadRequest)
// 			response := Result{Code: http.StatusBadRequest, Message: "Max size in 1mb"}
// 			json.NewEncoder(w).Encode(response)
// 			return
// 		}

// 		// Create a temporary file within our temp-images directory that follows
// 		// a particular naming pattern
// 		tempFile, err := ioutil.TempFile("uploads", "video-*.mp4")
// 		if err != nil {
// 			fmt.Println(err)
// 			fmt.Println("path upload error")
// 			json.NewEncoder(w).Encode(err)
// 			return
// 		}
// 		defer tempFile.Close()

// 		// read all of the contents of our uploaded file into a
// 		// byte array
// 		fileBytes, err := ioutil.ReadAll(file)
// 		if err != nil {
// 			fmt.Println(err)
// 		}

// 		// write this byte array to our temporary file
// 		tempFile.Write(fileBytes)

// 		filevideo := tempFile.Name()

// 		// add filename to ctx
// 		ctx := context.WithValue(r.Context(), "dataVideo", filevideo)
// 		next.ServeHTTP(w, r.WithContext(ctx))
// 	})
// }

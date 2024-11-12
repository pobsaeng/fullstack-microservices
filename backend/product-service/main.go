package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"pobsaeng.com/product-api/config"
	"pobsaeng.com/product-api/controller"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

const CustomHeaderValue = "Phob@#12$"

func init() {
	// loadEnvGlobalByLevel(8)
	loadEnvService()
 }

 func getEnvByLevelPath(fullPath string, levels int) (string, error) {
	segments := strings.Split(filepath.Clean(fullPath), string(filepath.Separator))

	if levels > len(segments) {
		return "", fmt.Errorf("specified level exceeds the directory depth")
	}

	basePath := strings.Join(segments[:levels], string(filepath.Separator))
	return string(filepath.Separator) + basePath, nil
}

func loadEnvGlobalByLevel(levels int) error {
	currentDir, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %w", err)
	}
	// Get the environment path up to the specified levels
	globalEnvPath, err := getEnvByLevelPath(currentDir, levels)
	if err != nil {
		return fmt.Errorf("error getting environment path: %w", err)
	}

	envPath := filepath.Join(globalEnvPath, ".env.global")
	if err := godotenv.Load(envPath); err != nil {
		return fmt.Errorf("error loading .env file from path %s: %w", envPath, err)
	}
	return nil
}

func loadEnvService() {
	godotenv.Load()

	envFile := ".env.local"
	if strings.TrimSpace(os.Getenv("IS_RUNNING_IN_DOCKER")) == "true" {
		envFile = ".env.docker"
	}

	if err := godotenv.Load(envFile); err != nil {
		log.Fatalf("Error loading [%s] file: %v\n", envFile, err)
	} else {
		fmt.Printf("Successfully loaded [%s] file\n", envFile)
	}
}

func main() {
	config.InitDB()

	r := gin.New()
	r.Use(corsMiddleware())

	v1 := r.Group("/api/v1")
	v1.GET("/products", controller.GetProducts)
	v1.GET("/products/:id", controller.GetProductByID)
	v1.GET("/products/code/:code", controller.GetProductByCode)
	v1.PUT("/products/code/:code/stock", controller.UpdateStock)
	v1.POST("/products/search", controller.SearchProducts)
	v1.POST("/products", controller.CreateProduct)
	v1.PUT("/products/:id", controller.UpdateProduct)
	v1.DELETE("/products/:id", controller.DeleteProduct)

	r.Run(":" + os.Getenv("APP_PORT"))
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		if origin == "http://localhost:3000" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		}
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-ID")
		c.Writer.Header().Set("Access-Control-Max-Age", "43200")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	}
}

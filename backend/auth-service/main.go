package main

import (
	"authentication/database"
	"authentication/handler"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func init() {
	// loadEnvGlobalByLevel(8)
	loadEnvService()
 }

//  func getEnvByLevelPath(fullPath string, levels int) (string, error) {
// 	segments := strings.Split(filepath.Clean(fullPath), string(filepath.Separator))

// 	if levels > len(segments) {
// 		return "", fmt.Errorf("specified level exceeds the directory depth")
// 	}

// 	basePath := strings.Join(segments[:levels], string(filepath.Separator))
// 	return string(filepath.Separator) + basePath, nil
// }
// 
// func loadEnvGlobalByLevel(levels int) error {
// 	// Get the current directory
// 	currentDir, err := os.Getwd()
// 	if err != nil {
// 		return fmt.Errorf("error getting current directory: %w", err)
// 	}
// 	// Get the environment path up to the specified levels
// 	globalEnvPath, err := getEnvByLevelPath(currentDir, levels)
// 	if err != nil {
// 		return fmt.Errorf("error getting environment path: %w", err)
// 	}

// 	envPath := filepath.Join(globalEnvPath, ".env.global")
// 	if err := godotenv.Load(envPath); err != nil {
// 		return fmt.Errorf("error loading .env file from path %s: %w", envPath, err)
// 	}
// 	fmt.Println("envPath: " + envPath)
// 	return nil
// }

func loadEnvService() {
	godotenv.Load() //Defualt .env loading

	//Custom .env loading
	envFile := ".env.local"
	if strings.TrimSpace(os.Getenv("IS_RUNNING_IN_DOCKER")) == "true" {
		envFile = ".env.docker"
	}
	fmt.Println("env file: " + envFile)
	if err := godotenv.Load(envFile); err != nil {
		log.Fatalf("Error loading [%s] file: %v\n", envFile, err)
	} else {
		fmt.Printf("Successfully loaded [%s] file\n", envFile)
	}
}

func main() {
	database.Connect()
	database.Migrate()

	router := mux.NewRouter()
	apiRouter := router.PathPrefix("/api/v1").Subrouter()
	// apiRouter.Use(corsMiddleware)
	// apiRouter.HandleFunc("/authen/generate-token", handler.GenerateJWTToken).Methods("POST")

	apiRouter.HandleFunc("/authen/generate-token", handler.GenerateJWTToken).Methods("POST")
	// apiRouter.HandleFunc("/authen/generate-token", func(w http.ResponseWriter, r *http.Request) {
	// w.WriteHeader(http.StatusOK)
	// }).Methods("OPTIONS")
	apiRouter.HandleFunc("/authen/validate-token", handler.ValidateJWTToken).Methods("POST")

	fmt.Println("- Authentication system was started with port : " + os.Getenv("APP_PORT"))
	log.Fatal(http.ListenAndServe(":" + os.Getenv("APP_PORT"), router))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers for all responses
		w.Header().Set("Access-Control-Allow-Origin", "*")  // Allow all origins (can be restricted to specific origins)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")  // Allowed methods
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")  // Allowed headers
		w.Header().Set("Access-Control-Allow-Credentials", "true")  // Optional: Allow credentials (cookies)

		// Handle OPTIONS request (pre-flight request)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)  // Return 200 OK for OPTIONS request
			return
		}

		// Continue processing the actual request
		next.ServeHTTP(w, r)
	})
}

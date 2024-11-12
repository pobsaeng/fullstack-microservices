package handler

import (
	"authentication/model"
	"authentication/service"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/context"
	"github.com/mitchellh/mapstructure"
)

const (
	JWTSecret      = "JWTSecret"
	ContextDecoded = "JWTDecoded"
)

func GenerateJWTToken(w http.ResponseWriter, req *http.Request) {
	log.Println("[Authentication Service] Generate token by JWT success")
	var user model.User
	_ = json.NewDecoder(req.Body).Decode(&user)

	user, err := service.GetUserByEmail(user)
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	expiresAt := time.Now().Add(30 * time.Minute).Unix()

	token := jwt.New(jwt.SigningMethodHS256) //create new token
	token.Claims = &model.AuthTokenClaim{    //set claims
		StandardClaims: &jwt.StandardClaims{
			ExpiresAt: expiresAt, //set expire date
		},
		User: model.User{ID: user.ID, Username: user.Username, Password: user.Password},
	}

	tokenString, error := token.SignedString([]byte(JWTSecret))
	if error != nil {
		fmt.Println(error)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(model.AuthToken{
		StatusCode: http.StatusOK,
		Token:      tokenString,
		TokenType:  "Bearer",
		ExpiresIn:  expiresAt,
	})
}

func ValidateJWTToken(w http.ResponseWriter, req *http.Request) {
	fmt.Println("[Authenication Service - ValidateJWTToken] Validate token!")
	//validate header authorization key
	authorizationHeader := req.Header.Get("authorization")
	if authorizationHeader == "" {
		RespondWithError(w, http.StatusBadRequest, "The authorization header is required")
		return
	}
	//validate string token
	bearerToken := strings.Split(authorizationHeader, " ")
	if len(bearerToken) != 2 {
		RespondWithError(w, http.StatusBadRequest, "Invalid authorization token")
		return
	}
	//convert string token from request to jwt token
	token, error := RetrieveToken(bearerToken[1])
	if error != nil {
		RespondWithError(w, http.StatusBadRequest, error.Error())
		return
	}
	//general token validation
	VerifyToken(w, req, token)
}

func RetrieveToken(bearerToken string) (*jwt.Token, error) {
	token, error := jwt.Parse(bearerToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf(fmt.Sprintf("There was an error"))
		}
		return []byte(JWTSecret), nil
	})
	return token, error
}

func VerifyToken(w http.ResponseWriter, req *http.Request, token *jwt.Token) {
	if token.Valid {
		var user model.User
		mapstructure.Decode(token.Claims, &user)

		var userId map[string]interface{}
		json.NewDecoder(req.Body).Decode(&userId)

		if userId["user_id"] != user.Username {
			RespondWithError(w, http.StatusBadRequest, "Invalid authorization token - Does not match UserID")
			return
		}

		context.Set(req, ContextDecoded, token.Claims) //store claims to context
		SendRespondWithJSON(w, req)

	} else {
		RespondWithError(w, http.StatusBadRequest, "Invalid authorization token")
	}
}

func SendRespondWithJSON(w http.ResponseWriter, req *http.Request) {
	decoded := context.Get(req, ContextDecoded) //get claims from context
	var user model.User
	mapstructure.Decode(decoded.(jwt.MapClaims), &user) //decode claims to user

	output := map[string]interface{}{
		"status_code": http.StatusOK,
		"data":        user,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}

func RespondWithError(w http.ResponseWriter, statusCode int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(model.ErrorRespond{StatusCode: statusCode, ErrorMsg: msg})
}

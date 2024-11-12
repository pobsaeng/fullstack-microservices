package model

import "github.com/dgrijalva/jwt-go"

type AuthToken struct {
	StatusCode int    `json:"status_code"`
	TokenType  string `json:"token_type"`
	Token      string `json:"access_token"`
	ExpiresIn  int64  `json:"expires_in"`
}

type AuthTokenClaim struct {
	*jwt.StandardClaims
	User
}

package model

type ErrorRespond struct {
	StatusCode int    `json:"status_code"`
	ErrorMsg   string `json:"error"`
}

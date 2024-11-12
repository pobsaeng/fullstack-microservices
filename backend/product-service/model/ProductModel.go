package model

import (
	"math/big"
	"time"
)

type Product struct {
	ID          uint64      `json:"id" gorm:"primaryKey;autoIncrement"`
	Code        string      `json:"code" binding:"required"`
	Name        string      `json:"name" binding:"required"`
	Description string      `json:"description"`
	Active      bool        `json:"active"`
	Price       big.Float   `json:"price" binding:"required,gt=0"`
	Stock       int         `json:"stock" binding:"required,gt=0"`
	Weight      big.Float   `json:"weight"`
	Brand       string      `json:"brand"`
	Color       string      `json:"color"`
	Size        string      `json:"size"`
	Length      big.Float   `json:"length"`
	Width       big.Float   `json:"width"`
	Height      big.Float   `json:"height"`
	Image       string      `json:"image"`
	CategoryID  uint64      `json:"category_id"`
	SupplierID  uint64      `json:"supplier_id"`
	CreatedBy   string      `json:"created_by"`
	UpdatedBy   string      `json:"updated_by"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

// type Product struct {
// 	ID          uint64         `json:"id" gorm:"primaryKey;autoIncrement"`
// 	Code        string         `json:"code" binding:"required" gorm:"not null"`
// 	Name        string         `json:"name" binding:"required" gorm:"not null"`
// 	Description string         `json:"description"`
// 	Active      bool           `json:"active" gorm:"not null"`
// 	Price       float64        `json:"price" binding:"required,gt=0" gorm:"type:decimal(20,6);not null"`
// 	Stock       int            `json:"stock" binding:"required,gt=0" gorm:"not null"`
// 	Weight      float64        `json:"weight" gorm:"type:decimal(20,6)"`
// 	Brand       string         `json:"brand"`
// 	Color       string         `json:"color" gorm:"size:50"`
// 	Size        string         `json:"size" gorm:"size:50"`
// 	Length      float64        `json:"length" gorm:"type:decimal(20,6)"`
// 	Width       float64        `json:"width" gorm:"type:decimal(20,6)"`
// 	Height      float64        `json:"height" gorm:"type:decimal(20,6)"`
// 	Image       string         `json:"image"`
// 	CategoryID  uint64         `json:"category_id"`
// 	SupplierID  uint64         `json:"supplier_id"`
// 	CreatedBy   string         `json:"created_by"`
// 	UpdatedBy   string         `json:"updated_by"`
// 	CreatedAt   time.Time      `json:"created_at" gorm:"type:timestamp;default:CURRENT_TIMESTAMP"`
// 	UpdatedAt   time.Time      `json:"updated_at" gorm:"type:timestamp;default:CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP"`
// }


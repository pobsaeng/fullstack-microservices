package controller

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"pobsaeng.com/product-api/model"
	"pobsaeng.com/product-api/repository"
)

func GetProducts(c *gin.Context) {
	fmt.Println("[Product Service - Controller] GetProducts!");
	products, err := repository.GetAllProducts()
	if err != nil {
		log.Println("Error:", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal Server Error"})
		return
	}
	c.Header("Content-Type", "application/json")
	fmt.Printf("Found products (%d)\n", len(products))
	c.JSON(http.StatusOK, products)
}

func GetProductByID(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		log.Fatalf("Error converting string to uint64: %v", err)
	}
	
	product, err := repository.GetProduct("id", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal Server Error"})
		return
	}

	if product == nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
		return
	}
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, product)
}

func UpdateStock(c *gin.Context) {
	
	code := c.Param("code")
	var request struct {
		Amount int `json:"amount" binding:"required"`
	}
	fmt.Println("[UpdateStock] code : ", code, ", request : ", request);

	// Bind the JSON body to the request struct
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update the product stock
	if err := repository.UpdateProductStock(code, request.Amount); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update stock"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Stock updated successfully"})
}

func GetProductByCode(c *gin.Context) {
	code := c.Param("code")
	log.Printf("GetProductByCode() - code: %v", code)
	
	product, err := repository.GetProduct("code", code)
	if err != nil {
		log.Printf("Error fetching product by code: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal Server Error"})
		return
	}

	if product == nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Product not found with code : " + code})
		return
	}
	
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, product)
}

func CreateProduct(c *gin.Context) {
	var product model.Product
	if err := c.BindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request payload"})
		return
	}

	if err := repository.CreateProduct(product); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal Server Error"})
		return
	}
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{"message": "Product created successfully"})
}

func UpdateProduct(c *gin.Context) {
	idStr := c.Param("id")
	fmt.Printf("Update product with id : %s", idStr)

	var updatedProduct model.Product
	if err := c.BindJSON(&updatedProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request payload"})
		return
	}

	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		log.Fatalf("Error converting string to uint64: %v", err)
	}

	if err := repository.UpdateProduct(id, updatedProduct); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal Server Error"})
		return
	}
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{"message": "Product updated successfully"})
}

func DeleteProduct(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		log.Fatalf("Error converting string to uint64: %v", err)
	}

	if err := repository.DeleteProduct(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal Server Error"})
		return
	}
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}

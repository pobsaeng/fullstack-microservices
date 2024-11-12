package database

import (
	"authentication/model"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Instance *gorm.DB
var errConn error
 
func Connect() {
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")
	
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
	    user, password, host, port, name)
	
	Instance, errConn = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if errConn != nil {
		panic("Cannot connect to DB")
	}
	sqlDB, errDB := Instance.DB()
	if errDB != nil {
		fmt.Printf("Error DB instance cofiguration, error detail : %s", errDB.Error())
		log.Fatal(errDB.Error())
	}
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	log.Println("Connected to Database...")
}

func Migrate() {
	Instance.AutoMigrate(&model.User{})
	log.Println("Database Migration Completed...")
}

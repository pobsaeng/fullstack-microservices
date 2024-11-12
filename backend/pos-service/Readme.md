##  Get Product by Code
curl -X GET http://localhost:6000/api/products/ELEC002

## Get All Products
curl -X GET http://localhost:6000/api/products

## Delete a Product
curl -X DELETE http://localhost:6000/api/products/7

## Record a Sale
curl -X POST http://localhost:6000/api/products/sale \
-H "Content-Type: application/json" \
-d '{
    "itemCode": "ELEC002",
    "amount": 2,
    "discount": 5.00
}'

## Update a Product
curl -X PUT http://localhost:6000/api/products/7 \
-H "Content-Type: application/json" \
-d '{
    "code": "P007",
    "name": "Updated Product 07",
    "price": 50.99,
    "amount": 5,
    "categoryId": 1
}'

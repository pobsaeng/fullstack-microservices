const { getProductDetails, updateProductStock } = require("../service/productService");
const createPool = require("../config/db");

async function insertSaleRecord(client, totalAmount, totalItems) {
     const result = await client.query(
         "INSERT INTO sales (total_amount, total_items) VALUES ($1, $2) RETURNING sale_id",
         [totalAmount, totalItems]
     );
     return result.rows[0].sale_id;
 }

async function insertSaleItem(client, saleId, code, amount, unitPrice, discount, totalPrice) {
     await client.query(
         "INSERT INTO sale_items (sale_id, code, quantity, unit_price, discount, total_price) VALUES ($1, $2, $3, $4, $5, $6)",
         [saleId, code, amount, unitPrice, discount, totalPrice]
     );
 }

module.exports = {
     insertSaleRecord,
     insertSaleItem,
};

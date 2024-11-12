const createPool = require('../config/db');
const { getProductDetails, updateProductStock } = require("../service/productService");
const { insertSaleItem, insertSaleRecord } = require("../service/saleService");

async function validateProductStock(product, amount) {
    if (!product || !product.price || !product.stock) {
        throw new Error(`Product not found or invalid data for code: ${product.code}`);
    }

    if (product.stock < amount) {
        throw new Error(`Insufficient stock for product with code "${product.code}"`);
    }
}

function calculateItemTotalPrice(unitPrice, amount, discount) {
    return unitPrice * amount * ((100 - discount) / 100);
}

async function saleItemsHandler(req, res, serviceURL) {
    console.log("[POS] Sale API is calling...");

    if (!serviceURL) {
        return res.status(500).json({ error: 'serviceURL is missing' });
    }

    const { items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: "No items provided" });
    }

    const pool = createPool();
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        let totalAmount = 0;
        let totalItems = 0;

        // Validate each item and calculate totals
        for (const item of items) {
            const { code, amount, discount = 0 } = item;

            const product = await getProductDetails(code, serviceURL);
            await validateProductStock(product, amount); // Validate product stock

            const unitPrice = product.price;
            const totalPrice = calculateItemTotalPrice(unitPrice, amount, discount);

            totalAmount += totalPrice;
            totalItems += amount;
        }

        // Insert sale record and get sale ID
        const saleId = await insertSaleRecord(client, totalAmount, totalItems);

        // Insert sale items and update stock
        for (const item of items) {
            const { code, amount, discount = 0 } = item;

            const product = await getProductDetails(code, serviceURL);
            const unitPrice = product.price;
            const totalPrice = calculateItemTotalPrice(unitPrice, amount, discount);

            // Insert sale item record
            await insertSaleItem(client, saleId, code, amount, unitPrice, discount, totalPrice);

            // Update stock
            await updateProductStock(code, -amount, serviceURL);
        }

        await client.query("COMMIT"); // Commit transaction
        res.status(201).json({ message: "Sale created successfully", saleId });

    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error("Error during sale processing:", error.message);
        res.status(500).json({ error: error.message });
    } finally {
        // Release the client back to the pool
        client.release();
    }
}

module.exports = saleItemsHandler;

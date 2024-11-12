const createPool = require('../config/db'); // Import the createPool function

// Function to retrieve sale items from the database
async function getSaleItems() {
    const pool = createPool(); // Get the pool from db.js

    try {
        const result = await pool.query('SELECT * FROM sale_items');
        return result.rows; // Return the result
    } catch (error) {
        console.error('Error retrieving sale items:', error.stack);
        throw new Error('Failed to retrieve sale items'); // Throw error to handle in the controller
    } finally {
        pool.end(); // Close the database pool
    }
}

module.exports = getSaleItems; // Export the function to use in other files

const { Pool } = require('pg');

function createPool() {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
    const pool = new Pool({
        user: DB_USER,
        host: DB_HOST,
        database: DB_NAME,
        password: DB_PASS,
        port: parseInt(DB_PORT, 10),
    });

    return pool;
}

module.exports = createPool;
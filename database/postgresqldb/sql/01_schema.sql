-- Sales table
CREATE TABLE IF NOT EXISTS sales (
    sale_id SERIAL PRIMARY KEY,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    total_items INT NOT NULL
);

-- Sale items table
CREATE TABLE IF NOT EXISTS sale_items (
    sale_item_id SERIAL PRIMARY KEY,
    sale_id INT NOT NULL,       -- Sale ID (unrestricted, managed by application)
    code VARCHAR(10) NOT NULL,  -- Product code (unrestricted, managed by application)
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    total_price DECIMAL(10, 2) NOT NULL
);
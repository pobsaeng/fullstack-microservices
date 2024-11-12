INSERT INTO sales (sale_date, total_amount, total_items)
VALUES 
    ('2024-11-01 10:30:00', 95.00, 2);

INSERT INTO sale_items (sale_id, code, quantity, unit_price, discount, total_price)
VALUES 
    (1, 'P001', 1, 50.00, 0, 50.00),
    (1, 'P002', 1, 45.00, 0, 45.00);

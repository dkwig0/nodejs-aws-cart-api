INSERT INTO users (id, name,  created_at) VALUES
    ('63c8630f-b487-4adb-b9d7-dfe82099946d', 'Bob',  '2024-07-23'),
    ('f4e3f780-4d53-45c3-b4aa-81b044b4d505', 'Carl', '2024-07-23');

INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
    ('626cf5c5-aee8-4c55-8f66-5ba077b6cd21', '63c8630f-b487-4adb-b9d7-dfe82099946d', '2024-07-01', '2024-07-01', 'OPEN'),
    ('ff3675f2-51d8-4852-ab65-77cccbf40326', 'f4e3f780-4d53-45c3-b4aa-81b044b4d505', '2024-06-01', '2024-06-01', 'ORDERED'),
    ('d61dabc3-56a1-4b38-b1b7-7d2ddcaf730c', 'f4e3f780-4d53-45c3-b4aa-81b044b4d505', '2024-07-19', '2024-07-20', 'OPEN');

INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total) VALUES
    ('065667fe-438b-4904-b717-2e781bebbbac', '63c8630f-b487-4adb-b9d7-dfe82099946d', '626cf5c5-aee8-4c55-8f66-5ba077b6cd21', '{"method": "invoice", "amount": 10000.00}', '{"address": "Avenue V"}', 'No comments', 'in_progress', 10000.00),
    ('9277135b-c675-4a3a-bcf5-43900921b3e3', 'f4e3f780-4d53-45c3-b4aa-81b044b4d505', 'ff3675f2-51d8-4852-ab65-77cccbf40326', '{"method": "cash", "amount": 160.00}', '{"address": "Gogol street, 5"}', 'Some tip for you', 'completed', 150.00);

INSERT INTO cart_items (cart_id, product_id, count) VALUES
    ('626cf5c5-aee8-4c55-8f66-5ba077b6cd21', '2990619a-f40c-4ba5-9c83-f8c3a3021f0b', 100),
    ('626cf5c5-aee8-4c55-8f66-5ba077b6cd21', 'f5b244b2-25c3-400c-a4db-66da819b9212', 13),

    ('ff3675f2-51d8-4852-ab65-77cccbf40326', '467aa5d5-9fbc-4602-b98f-323141925696', 1),
    ('ff3675f2-51d8-4852-ab65-77cccbf40326', '59b2dbbc-e35d-4ac0-8d58-79d6bf42e535', 4);
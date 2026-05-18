CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100),
    entity_name VARCHAR(100),
    entity_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS snacks;

CREATE TABLE snacks (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    food VARCHAR NOT NULL,
    type VARCHAR NOT NULL
);
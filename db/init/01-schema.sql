CREATE TABLE vehicles (
    id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type          TEXT NOT NULL CHECK (type IN ('bike', 'car')),
    name          TEXT NOT NULL,
    price_per_day INTEGER NOT NULL CHECK (price_per_day > 0),
    available     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE vehicles (
    id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type          TEXT NOT NULL CHECK (type IN ('bike', 'car')),
    brand         TEXT NOT NULL,
    model         TEXT NOT NULL,
    category      TEXT NOT NULL,
    year          INTEGER NOT NULL,
    description   TEXT NOT NULL DEFAULT '',
    price_per_day INTEGER NOT NULL CHECK (price_per_day > 0),
    available     BOOLEAN NOT NULL DEFAULT TRUE,
    image_url     TEXT,
    specs         JSONB NOT NULL DEFAULT '[]',
    ratings       JSONB NOT NULL DEFAULT '[]',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE vehicle_colors (
    id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicles (id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    hex        TEXT NOT NULL CHECK (hex ~ '^#[0-9a-f]{6}$'),
    image_url  TEXT,
    geometry   JSONB,
    position   INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX vehicle_colors_vehicle_id_idx ON vehicle_colors (vehicle_id);

CREATE TABLE inquiries (
    id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles (id) ON DELETE SET NULL,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    phone      TEXT,
    date_from  DATE,
    date_to    DATE,
    message    TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (date_from IS NULL OR date_to IS NULL OR date_to >= date_from)
);

CREATE TABLE IF NOT EXISTS error404labs.payments (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES error404labs.members(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL CHECK (amount > 0),
    paid_at DATE NOT NULL DEFAULT CURRENT_DATE,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    note TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_month_year ON error404labs.payments (month, year);
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON error404labs.payments (member_id);

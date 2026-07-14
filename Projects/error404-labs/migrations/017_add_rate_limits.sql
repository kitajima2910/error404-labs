-- Migration 017: Rate limits table for serverless-compatible rate limiting
-- Thay thế in-memory Map (vô hiệu trên Vercel serverless) bằng DB table

CREATE TABLE IF NOT EXISTS error404labs.rate_limits (
    id BIGSERIAL PRIMARY KEY,
    ip TEXT NOT NULL,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '1 minute'
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_time ON error404labs.rate_limits(ip, attempted_at);

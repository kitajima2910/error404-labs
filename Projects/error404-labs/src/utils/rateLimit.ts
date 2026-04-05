// Simple in-memory rate limiter
// Giới hạn số request theo IP trong khoảng thời gian

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Dọn dẹp entries hết hạn mỗi 60s
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
        if (now > entry.resetAt) store.delete(key);
    }
}, 60_000);

/**
 * Kiểm tra rate limit
 * @returns { allowed: boolean, remaining: number, retryAfterSec: number }
 */
export function checkRateLimit(
    ip: string,
    maxAttempts: number = 5,
    windowMs: number = 60_000
) {
    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || now > entry.resetAt) {
        store.set(ip, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: maxAttempts - 1, retryAfterSec: 0 };
    }

    entry.count++;

    if (entry.count > maxAttempts) {
        const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
        return { allowed: false, remaining: 0, retryAfterSec };
    }

    return { allowed: true, remaining: maxAttempts - entry.count, retryAfterSec: 0 };
}

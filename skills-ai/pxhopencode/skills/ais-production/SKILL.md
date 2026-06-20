---
name: ais-production
description: Production AI — caching, rate limit, fallback model, monitoring, graceful degradation. Không crash khi API down.
---

# ais-production — Production AI

## Response Cache (TTL, LRU)

```python
from functools import lru_cache
import json, time, hashlib

class AIResponseCache:
    def __init__(self, ttl_seconds: int = 300, max_size: int = 1000):
        self.ttl = ttl_seconds
        self.cache: dict[str, tuple[float, str]] = {}
        self.max_size = max_size

    def _key(self, messages: list[dict], model: str) -> str:
        raw = json.dumps({"m": messages, "md": model}, sort_keys=True)
        return hashlib.md5(raw.encode()).hexdigest()

    def get(self, messages: list[dict], model: str) -> str | None:
        key = self._key(messages, model)
        entry = self.cache.get(key)
        if entry and (time.time() - entry[0]) < self.ttl:
            return entry[1]
        if entry:
            del self.cache[key]
        return None

    def set(self, messages: list[dict], model: str, response: str):
        key = self._key(messages, model)
        if len(self.cache) >= self.max_size:
            oldest = min(self.cache.keys(), key=lambda k: self.cache[k][0])
            del self.cache[oldest]
        self.cache[key] = (time.time(), response)

ai_cache = AIReponseCache()

async def cached_chat(messages: list[dict], **kwargs) -> str:
    cached = ai_cache.get(messages, kwargs.get("model", "gpt-4o"))
    if cached:
        return cached
    response = await chat(messages, **kwargs)
    ai_cache.set(messages, kwargs.get("model", "gpt-4o"), response.content)
    return response.content
```

## Giới hạn tốc độ (Sliding Window)

```python
import asyncio, time
from collections import deque

class RateLimiter:
    def __init__(self, rpm: int = 60, rpd: int = 10000):
        self.rpm = rpm
        self.rpd = rpd
        self.minute_window: deque[float] = deque()
        self.day_count = 0
        self.day_reset = time.time() + 86400

    async def acquire(self):
        now = time.time()
        # Reset daily
        if now > self.day_reset:
            self.day_count = 0
            self.day_reset = now + 86400

        # Clean minute window
        while self.minute_window and now - self.minute_window[0] > 60:
            self.minute_window.popleft()

        if len(self.minute_window) >= self.rpm:
            wait = 60 - (now - self.minute_window[0])
            await asyncio.sleep(wait)

        if self.day_count >= self.rpd:
            raise Exception("Daily rate limit exceeded")

        self.minute_window.append(time.time())
        self.day_count += 1

rate_limiter = RateLimiter(rpm=30, rpd=5000)
```

## Fallback Model (graceful degradation)

```python
FALLBACK_CHAIN = [
    {"model": "gpt-4o", "max_tokens": 4096},
    {"model": "gpt-4o-mini", "max_tokens": 8192},
    {"model": "claude-3-haiku", "max_tokens": 8192},
]

async def chat_with_fallback(messages: list[dict]) -> str:
    last_error = None
    for config in FALLBACK_CHAIN:
        try:
            response = await chat(messages, **config)
            return response.content
        except Exception as e:
            last_error = e
            print(f"Fallback: {config['model']} failed: {e}")
            continue
    return f"⚠️ All models unavailable. Last error: {last_error}"
```

## Giám sát (Prometheus metrics)

```python
# metrics.py
from prometheus_client import Counter, Histogram, Gauge

llm_calls = Counter("llm_calls_total", "Total LLM calls", ["model", "status"])
llm_latency = Histogram("llm_latency_seconds", "LLM latency", ["model"], buckets=[0.1, 0.5, 1, 2, 5, 10])
llm_tokens = Counter("llm_tokens_total", "Total tokens", ["model", "type"])  # type=input/output
llm_cost = Counter("llm_cost_total", "Total cost USD", ["model"])
active_requests = Gauge("llm_active_requests", "Current active LLM requests")

async def monitored_chat(messages, **kwargs):
    model = kwargs.get("model", "gpt-4o")
    active_requests.inc()
    start = time.monotonic()
    try:
        response = await chat(messages, **kwargs)
        llm_calls.labels(model=model, status="success").inc()
        llm_latency.labels(model=model).observe(time.monotonic() - start)
        llm_tokens.labels(model=model, type="input").inc(response.input_tokens)
        llm_tokens.labels(model=model, type="output").inc(response.output_tokens)
        llm_cost.labels(model=model).inc(estimate_cost(model, response.input_tokens, response.output_tokens))
        return response.content
    except Exception as e:
        llm_calls.labels(model=model, status="error").inc()
        raise
    finally:
        active_requests.dec()
```

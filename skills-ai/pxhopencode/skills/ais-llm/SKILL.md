---
name: ais-llm
description: Tích hợp LLM production — chat, streaming SSE, function calling, cost tracking, retry, fallback. Không memory leak, tự động reconnect.
---

# ais-llm — LLM Integration

## Chat Completion (tái sử dụng connection)

```python
import asyncio
import time
from openai import AsyncOpenAI, APIError, RateLimitError
from dataclasses import dataclass

client = AsyncOpenAI()

@dataclass
class LLMResponse:
    content: str
    model: str
    input_tokens: int
    output_tokens: int
    latency_ms: int

async def chat(
    messages: list[dict],
    model: str = "gpt-4o",
    temperature: float = 0.7,
    max_tokens: int = 4096,
    retry: int = 2,
) -> LLMResponse:
    last_error = None
    for attempt in range(retry + 1):
        try:
            start = time.monotonic()
            response = await client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            latency = int((time.monotonic() - start) * 1000)
            choice = response.choices[0]
            return LLMResponse(
                content=choice.message.content or "",
                model=response.model,
                input_tokens=response.usage.prompt_tokens,
                output_tokens=response.usage.completion_tokens,
                latency_ms=latency,
            )
        except RateLimitError:
            wait = 2 ** attempt
            await asyncio.sleep(wait)
        except APIError as e:
            last_error = e
            if attempt < retry:
                await asyncio.sleep(1)
    raise last_error or Exception("LLM call failed")
```

## Streaming SSE (cho UX không giật)

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import json

app = FastAPI()

async def stream_chat(messages: list[dict]):
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        stream=True,
    )
    async for chunk in response:
        delta = chunk.choices[0].delta
        if delta.content:
            yield f"data: {json.dumps({'text': delta.content})}\n\n"
    yield "data: [DONE]\n\n"

@app.post("/chat")
async def chat_endpoint(body: dict):
    return StreamingResponse(
        stream_chat(body["messages"]),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )
```

## Function Calling (tool use, parse không fail)

```python
from pydantic import BaseModel, ValidationError

class WeatherTool(BaseModel):
    location: str
    unit: str = "c"

TOOL_DEF = {
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get weather for location",
        "parameters": WeatherTool.model_json_schema(),
    }
}

async def parse_tool_call(msg) -> dict | None:
    if not msg.tool_calls:
        return None
    tc = msg.tool_calls[0]
    try:
        args = json.loads(tc.function.arguments)
        WeatherTool(**args)  # validation
        return {"name": tc.function.name, "args": args, "id": tc.id}
    except (json.JSONDecodeError, ValidationError):
        return {"name": tc.function.name, "args": {}, "id": tc.id, "error": "invalid_args"}
```

## Theo dõi Chi phí (tránh bill sốc)

```python
@dataclass
class CostEntry:
    model: str
    input_tokens: int
    output_tokens: int
    cost: float
    timestamp: float

RATES = {
    "gpt-4o":        {"input": 2.50/1e6, "output": 10.00/1e6},
    "gpt-4o-mini":   {"input": 0.15/1e6, "output": 0.60/1e6},
    "claude-3-5-sonnet": {"input": 3.00/1e6, "output": 15.00/1e6},
}

class CostTracker:
    def __init__(self, daily_budget: float = 5.0):
        self.entries: list[CostEntry] = []
        self.daily_budget = daily_budget

    def track(self, model: str, input_t: int, output_t: int):
        rate = RATES.get(model, RATES["gpt-4o-mini"])
        cost = input_t * rate["input"] + output_t * rate["output"]
        self.entries.append(CostEntry(model, input_t, output_t, cost, time.time()))

    def today_cost(self) -> float:
        today = time.time() - 86400
        return sum(e.cost for e in self.entries if e.timestamp > today)

    def can_call(self) -> bool:
        return self.today_cost() < self.daily_budget
```

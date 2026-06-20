---
name: ais-agents
description: AI Agent framework — tool registry, multi-step reasoning, memory, rate control. Không infinite loop, tự động timeout.
---

# ais-agents — AI Agents

## Tool Registry (type-safe)

```python
from typing import Any, Callable, Awaitable
from pydantic import BaseModel

class Tool(BaseModel):
    name: str
    description: str
    parameters: dict
    handler: Callable[..., Awaitable[str]]

    def to_openai(self) -> dict:
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": self.parameters,
            }
        }

class ToolRegistry:
    def __init__(self):
        self._tools: dict[str, Tool] = {}

    def register(self, tool: Tool):
        self._tools[tool.name] = tool

    def get(self, name: str) -> Tool | None:
        return self._tools.get(name)

    def all_openai(self) -> list[dict]:
        return [t.to_openai() for t in self._tools.values()]

    def call(self, name: str, args: dict) -> Awaitable[str]:
        tool = self.get(name)
        if not tool:
            return f"Error: tool '{name}' not found"
        return tool.handler(**args)
```

## Agent với timeout & max steps

```python
import asyncio

class Agent:
    def __init__(self, tools: ToolRegistry, system_prompt: str = ""):
        self.tools = tools
        self.messages = [{"role": "system", "content": system_prompt}] if system_prompt else []
        self.max_steps = 15
        self.timeout = 30.0

    async def run(self, task: str) -> str:
        self.messages.append({"role": "user", "content": task})

        for step in range(self.max_steps):
            try:
                response = await asyncio.wait_for(
                    client.chat.completions.create(
                        model="gpt-4o",
                        messages=self.messages,
                        tools=self.tools.all_openai(),
                        tool_choice="auto",
                    ),
                    timeout=self.timeout
                )
            except asyncio.TimeoutError:
                return "⏱ Agent timeout — vui lòng thử lại với câu hỏi đơn giản hơn."

            msg = response.choices[0].message

            if not msg.tool_calls:
                self.messages.append({"role": "assistant", "content": msg.content})
                return msg.content

            self.messages.append(msg)
            for tc in msg.tool_calls:
                result = await self.tools.call(tc.function.name, json.loads(tc.function.arguments))
                self.messages.append({
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "content": result[:2000],  # truncate để tránh token explosion
                })

        return "⚠️ Agent reached max steps — kết quả có thể chưa hoàn chỉnh."
```

## Memory (ngắn hạn + dài hạn)

```python
from collections import deque

class AgentMemory:
    def __init__(self, max_short_term: int = 20):
        self.short_term: deque[dict] = deque(maxlen=max_short_term)
        self.long_term: dict[str, str] = {}

    def add(self, role: str, content: str):
        self.short_term.append({"role": role, "content": content})

    def recall(self, key: str) -> str | None:
        return self.long_term.get(key)

    def remember(self, key: str, value: str):
        self.long_term[key] = value

    def summarize(self) -> str:
        """Tạo summary ngắn cho context window"""
        recent = list(self.short_term)[-6:]
        return "\n".join(f"[{m['role']}] {m['content'][:100]}" for m in recent)

    def get_context(self) -> list[dict]:
        return list(self.short_term)
```

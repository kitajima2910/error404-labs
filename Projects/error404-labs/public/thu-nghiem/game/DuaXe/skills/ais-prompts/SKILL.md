---
name: ais-prompts
description: Prompt engineering production — template system, versioning, A/B test, injection defense, cost-aware prompting.
---

# ais-prompts — Prompt Engineering

## Template System (versioned)

```python
from pydantic import BaseModel
from datetime import datetime
import hashlib

class PromptVersion(BaseModel):
    id: str
    name: str
    version: int
    system: str
    template: str
    model: str
    created_at: str

class PromptRegistry:
    def __init__(self):
        self._versions: dict[str, list[PromptVersion]] = {}

    def register(self, name: str, system: str, template: str, model: str = "gpt-4o"):
        versions = self._versions.get(name, [])
        v = len(versions) + 1
        pid = hashlib.md5(f"{name}:{v}".encode()).hexdigest()[:8]
        entry = PromptVersion(
            id=pid, name=name, version=v,
            system=system, template=template,
            model=model, created_at=datetime.utcnow().isoformat(),
        )
        versions.append(entry)
        self._versions[name] = versions
        return entry

    def get(self, name: str, version: int | None = None) -> PromptVersion | None:
        versions = self._versions.get(name, [])
        if not versions:
            return None
        if version is None:
            return versions[-1]  # latest
        return next((v for v in versions if v.version == version), None)

    def format(self, name: str, **kwargs) -> list[dict]:
        prompt = self.get(name)
        if not prompt:
            return []
        return [
            {"role": "system", "content": prompt.system},
            {"role": "user", "content": prompt.template.format(**kwargs)},
        ]
```

## Phòng chống Injection

```python
import re

INJECTION_PATTERNS = [
    r"(?i)ignore\s+(all\s+)?(previous|above)\s+instructions",
    r"(?i)forget\s+(everything|all)\s+you",
    r"(?i)you\s+are\s+(now|not)\s+(an?\s+)?\w+",
    r"(?i)system\s+prompt",
    r"(?i)reset\s+(conversation|chat|session)",
    r"<\s*(system|user|assistant)\s*>",
]

def detect_injection(text: str) -> bool:
    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, text):
            return True
    return False

def sanitize_user_input(text: str, max_length: int = 4000) -> str:
    if len(text) > max_length:
        text = text[:max_length] + "..."
    if detect_injection(text):
        text = f"[Content filtered: potential prompt injection detected]\n\n{text[:500]}"
    return text
```

## A/B Test Prompts

```python
import random

async def ab_test_prompt(
    messages: list[dict],
    variants: list[dict],
    track_name: str,
    tracker: CostTracker,
) -> str:
    variant = random.choice(variants)
    test_messages = [
        {"role": "system", "content": variant["system"]},
        *messages,
    ]
    response = await chat(test_messages, model=variant.get("model", "gpt-4o"))
    tracker.track(response.model, response.input_tokens, response.output_tokens)
    return response.content

# Log kết quả để phân tích sau
prompt_log = []

def log_result(name: str, variant_id: str, success: bool, latency_ms: int):
    prompt_log.append({
        "name": name,
        "variant": variant_id,
        "success": success,
        "latency_ms": latency_ms,
        "timestamp": time.time(),
    })
```

## Cost-Aware Prompting

```python
# Ước lượng token trước khi gửi
def estimate_tokens(text: str) -> int:
    return len(text) // 4  # rough: ~4 chars/token

def optimize_prompt(messages: list[dict], max_tokens: int = 4000) -> list[dict]:
    total = sum(estimate_tokens(m["content"]) for m in messages)
    if total <= max_tokens:
        return messages

    # System prompt giữ nguyên, user prompt cắt bớt
    system = [m for m in messages if m["role"] == "system"]
    user = [m for m in messages if m["role"] == "user"]
    remaining = max_tokens - sum(estimate_tokens(m["content"]) for m in system)

    for msg in user:
        if estimate_tokens(msg["content"]) > remaining:
            msg["content"] = msg["content"][:remaining * 4] + "...[truncated]"
            remaining = 0
        else:
            remaining -= estimate_tokens(msg["content"])

    return system + user
```

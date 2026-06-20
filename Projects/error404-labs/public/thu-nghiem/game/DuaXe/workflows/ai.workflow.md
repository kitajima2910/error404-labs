# 🤖 Workflow AI — Phát triển ứng dụng AI

Dùng workflow này khi bạn làm: chatbot, RAG system, LLM integration, AI agent, ML inference API, NLP processing, computer vision, automation AI.

> **🌏 LUẬT NGÔN NGỮ**: UI text trong AI app (chat message, label, thông báo, hướng dẫn) phải là **tiếng Việt**.

## 🚀 Quy trình vibe code AI

### Bước 1: Chọn stack

#### Backend (Python - mặc định)
| Stack | Khi nào dùng |
|-------|-------------|
| FastAPI + LangChain | **Mặc định** — RAG, chatbot, agent |
| FastAPI + LlamaIndex | Document-heavy RAG, data pipeline |
| FastAPI + direct OpenAI/Claude API | Đơn giản, gọi LLM trực tiếp |
| Django + Celery | Production, task queue, heavy processing |

#### LLM Provider
| Provider | Khi nào dùng |
|----------|-------------|
| OpenAI GPT-4o | **Mặc định** — mạnh, dễ dùng |
| Claude 3.5 Sonnet | Code generation, reasoning |
| Gemini | Free tier, multimodal |
| Local (Ollama) | Offline, privacy, không internet |

#### Database & Vector Store
| Tool | Khi nào dùng |
|------|-------------|
| PostgreSQL + pgvector | **Mặc định** — lưu cả data + vector |
| ChromaDB | Prototype, local dev |
| Pinecone / Weaviate | Production-scale vector search |
| Redis | Cache, session, rate limiting |

### Bước 2: Setup

```bash
# Python + FastAPI (mặc định)
mkdir app
cd app
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\Activate.ps1
pip install fastapi uvicorn langchain openai pydantic

# PostgreSQL + pgvector
pip install psycopg2-binary sqlalchemy pgvector
```

### Bước 2.1: Setup `.gitignore`

Sau khi setup, đảm bảo `.gitignore` đúng chuẩn Python/AI:
- Luôn có `.opencode`, `.playwright-mcp`, `.gitignore`, `__pycache__/`, `*.pyc`, `.venv/`, `.env`, `*.egg-info/`, `dist/`
- Nếu đã có `.gitignore` → chỉ cần ensure `.opencode`, `.playwright-mcp`, `.gitignore` được thêm vào

### Bước 3: Cấu trúc thư mục AI chuẩn

```
app/
├── api/              # FastAPI routes
│   ├── chat.py
│   ├── upload.py
│   └── health.py
├── core/             # Config, settings, dependencies
│   ├── config.py
│   └── deps.py
├── models/           # Pydantic models / SQLAlchemy models
│   ├── chat.py
│   └── user.py
├── services/         # Business logic
│   ├── llm.py        # LLM calls, prompt management
│   ├── rag.py        # Retrieval-Augmented Generation
│   ├── embedding.py  # Vector embedding & search
│   └── agent.py      # AI agent logic (tool use, multi-step)
├── vector_store/     # Vector DB connection & operations
│   └── pgvector.py
├── prompts/          # Prompt templates
│   ├── system/
│   └── examples/
└── utils/            # Helpers (token counter, text splitter)
```

### Bước 4: Flow code AI

```
Setup LLM → API → RAG Pipeline → Agent/Tools → Frontend Chat → Deploy
```

Chi tiết:
1. **LLM Setup**: Kết nối provider, system prompt, temperature, max tokens
2. **API Routes**: Chat endpoint (streaming), upload file, query history
3. **RAG Pipeline**: Load → Chunk → Embed → Store → Retrieve → Generate
4. **Agent/Tools**: Function calling, tool definitions, multi-step reasoning
5. **Frontend Chat**: UI chat box (Streamlit / React), markdown rendering
6. **Deploy**: Docker + Cloud Run / Railway / tự host

### Bước 5: Các mẫu AI phổ biến

| Pattern | Cài đặt |
|---------|---------|
| Chat đơn giản | `openai.ChatCompletion` → stream response |
| RAG với PDF | Load PDF → chunk → embed → pgvector → retrieve → LLM |
| AI Agent | Tool definitions → LLM chọn tool → execute → loop |
| Multi-modal | Upload image → LLM vision → phân tích |
| Streaming | SSE / WebSocket → response từng token |
| Function Calling | LLM trả về JSON action → execute → return result |

### Bước 6: Security

- ✅ Rate limiting trên chat endpoint
- ✅ Input sanitization (prompt injection defense)
- ✅ User authentication (nếu multi-user)
- ✅ Token limits & cost monitoring
- ✅ Logging tất cả LLM calls (audit)

### Chất lượng & Phát hành — Tầng 2 (Điều phối) route Task contracts

Sau khi code xong, Orchestration tạo Task contracts và route đến Workers:

| Phase | Task contract | Route đến | Result mong đợi |
|-------|--------------|-----------|-----------------|
| test | `Task{target: AI code, type: response quality + edge cases}` | `@pxh-qa` | `Result{pass/fail, issues[]}` |
| fix | `Task{target: LLM issues từ QA, type: fix}` | `@pxh-fix-bugs` | `Result{fixed[], status}` |
| review | `Task{target: AI code, type: review, focus: security/perf}` | `@pxh-review-code` | `Result{issues[], score}` |
| build | `Task{target: AI project, type: build}` | `@pxh-devops` | `Result{build_size, status}` |
| persist | `Event{type: decision, phase: done, data: prompts + decisions}` | `@pxh-save-history` | `Confirmed{status: saved}` |

### Luồng Runtime (Các tầng)
```
Tầng 1 (Interface): User prompt → Request
Tầng 2 (Orchestration): pxh-pm phân tích, chọn workflow
Tầng 3 (Worker / Executor): pxh-expert code AI app theo skills/ais-
Tầng 3 (Worker / Validator): pxh-qa test AI response quality
Tầng 3 (Worker / Fixer): pxh-fix-bugs fix LLM issues
Tầng 3 (Worker / Reviewer): pxh-review-code security & perf
Tầng 3 (Worker / Builder): pxh-devops build
Tầng 4 (Infrastructure): pxh-save-history persist prompts & decisions
```

### Liên kết
- Workflow cha: `@vibe`
- Runtime: `runtime/README.md`, `runtime/layers/03-worker.md`
- Skills: `skills/ais-*` (LLM, RAG, Agent, Prompt, Production)
- Contracts: `runtime/contracts/README.md`
- Agents: `@pxh-pm` (Tầng 2), `@pxh-expert` (Tầng 3 Executor), `@pxh-architect` (Tầng 3 Planner)

# 🤖 AI Workflow — Phát triển ứng dụng AI

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
- Luôn có `.opencode`, `.playwright-mcp`, `__pycache__/`, `*.pyc`, `.venv/`, `.env`, `*.egg-info/`, `dist/`
- Nếu đã có `.gitignore` → chỉ cần ensure `.opencode` và `.playwright-mcp` được thêm vào

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

### Bước 5: Các pattern AI phổ biến

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

### Quality & Release

Sau khi code xong:
1. `@pxh-qa` — Test AI response quality, edge cases
2. `@pxh-fix-bugs` — Fix LLM response issues
3. `@pxh-review-code` — Review security & performance
4. `@release.workflow` — Build + Deploy
5. `@pxh-save-history` — Lưu prompt & quyết định + cập nhật STATUS.md

### Liên kết
- Workflow cha: `@company.workflow`
- Skills: `ais/*` (LLM, RAG, Agent, Prompt, Production)
- Agents: `@pxh-pm`, `@pxh-expert`, `@pxh-architect`

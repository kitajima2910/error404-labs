---
name: ais-rag
description: RAG pipeline production — ingestion, chunking chiến lược, embedding, hybrid search, rerank. Không index trùng, search dưới 200ms.
---

# ais-rag — RAG Pipeline

## Chunking Strategy (theo loại content)

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter, MarkdownTextSplitter, PythonCodeTextSplitter

def get_splitter(doc_type: str, chunk_size: int = 1000, overlap: int = 200):
    splitters = {
        "markdown": MarkdownTextSplitter(chunk_size, overlap),
        "code": PythonCodeTextSplitter(chunk_size, overlap),
        "text": RecursiveCharacterTextSplitter(
            chunk_size, overlap,
            separators=["\n\n", "\n", ".", "!", "?", " ", ""]
        ),
    }
    return splitters.get(doc_type, splitters["text"])

def chunk_document(text: str, doc_type: str = "text") -> list[dict]:
    splitter = get_splitter(doc_type)
    chunks = splitter.split_text(text)
    return [
        {"content": c, "index": i, "char_count": len(c)}
        for i, c in enumerate(chunks)
    ]
```

## Embedding (batch + cache)

```python
import hashlib, json, sqlite3
from openai import AsyncOpenAI

embed_client = AsyncOpenAI()

class EmbedCache:
    def __init__(self, db_path: str = "embed_cache.db"):
        self.conn = sqlite3.connect(db_path)
        self.conn.execute("CREATE TABLE IF NOT EXISTS cache (hash TEXT PRIMARY KEY, vector TEXT)")

    def _hash(self, text: str) -> str:
        return hashlib.sha256(text.encode()).hexdigest()

    def get(self, text: str) -> list[float] | None:
        row = self.conn.execute("SELECT vector FROM cache WHERE hash=?", (self._hash(text),)).fetchone()
        return json.loads(row[0]) if row else None

    def set(self, text: str, vector: list[float]):
        self.conn.execute("INSERT OR REPLACE INTO cache VALUES (?, ?)", (self._hash(text), json.dumps(vector)))
        self.conn.commit()

cache = EmbedCache()

async def embed_batch(texts: list[str], model: str = "text-embedding-3-small") -> list[list[float]]:
    uncached = [(i, t) for i, t in enumerate(texts) if cache.get(t) is None]
    results = [None] * len(texts)

    # Fill cached
    for i, t in enumerate(texts):
        if v := cache.get(t):
            results[i] = v

    # Embed uncached
    if uncached:
        indices, texts_to_embed = zip(*uncached)
        response = await embed_client.embeddings.create(model=model, input=list(texts_to_embed))
        for idx, data in zip(indices, response.data):
            vector = data.embedding
            cache.set(texts[idx], vector)
            results[idx] = vector

    return results
```

## Hybrid Search (vector + keyword, < 200ms)

```sql
-- PostgreSQL + pgvector setup
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding VECTOR(1536),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_embedding ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_documents_gin ON documents USING GIN (to_tsvector('english', content));
```

```python
async def hybrid_search(query: str, k: int = 10, alpha: float = 0.7):
    query_emb = (await embed_batch([query]))[0]

    rows = await conn.fetch("""
        WITH vector_scores AS (
            SELECT id, content, metadata,
                   1 - (embedding <=> $1::vector) as vs_score
            FROM documents
            ORDER BY embedding <=> $1::vector
            LIMIT $3
        ),
        keyword_scores AS (
            SELECT id, ts_rank(to_tsvector('english', content), plainto_tsquery('english', $2)) as kw_score
            FROM documents
            WHERE to_tsvector('english', content) @@ plainto_tsquery('english', $2)
        )
        SELECT v.id, v.content, v.metadata,
               $4 * v.vs_score + (1 - $4) * COALESCE(k.kw_score, 0) as combined
        FROM vector_scores v
        LEFT JOIN keyword_scores k ON v.id = k.id
        ORDER BY combined DESC
        LIMIT $5
    """, query_emb, query, 50, alpha, k)

    return rows
```

## Rerank (tăng accuracy)

```python
RERANK_PROMPT = """Given the query and passages, rank by relevance.
Output only numbers 1-{n} in order, one per line.

Query: {query}

Passages:
{passages}

Ranking:"""

async def rerank(query: str, passages: list[str], top_k: int = 3) -> list[int]:
    ranked = await chat([{"role": "user", "content": RERANK_PROMPT.format(
        query=query,
        passages="\n".join(f"[{i}] {p[:200]}" for i, p in enumerate(passages)),
        n=len(passages)
    )}])
    lines = [l.strip() for l in ranked.content.split("\n") if l.strip().isdigit()]
    indices = [int(l) for l in lines if 0 <= int(l) < len(passages)]
    return indices[:top_k]
```

---
name: webs-backend
description: Backend web production — Next.js App Router, Express, FastAPI, middleware, error handling, validation, rate limit.
---

# webs-backend — Backend

## Next.js API Routes (App Router)

```typescript
// app/api/todos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CreateTodoSchema = z.object({
  title: z.string().min(1).max(200),
  completed: z.boolean().optional().default(false),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));

  const [todos, total] = await Promise.all([
    prisma.todo.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.todo.count(),
  ]);

  return NextResponse.json({
    data: todos,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON không hợp lệ" }, { status: 400 });
  }

  const result = CreateTodoSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ", details: result.error.flatten() }, { status: 400 });
  }

  const todo = await prisma.todo.create({ data: result.data });
  return NextResponse.json(todo, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Thiếu id" }, { status: 400 });

  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

## Xử lý lỗi Middleware

```typescript
export class AppError extends Error {
  constructor(public statusCode: number, message: string, public details?: unknown) {
    super(message);
    this.name = "AppError";
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, details: error.details },
      { status: error.statusCode }
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Dữ liệu không hợp lệ", details: error.flatten() },
      { status: 400 }
    );
  }

  console.error("[Unhandled]", error);
  return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
}
```

## Giới hạn tốc độ (in-memory, không cần Redis)

```typescript
class SlidingWindowRateLimit {
  private windows = new Map<string, number[]>();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  check(key: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    let timestamps = this.windows.get(key) || [];
    timestamps = timestamps.filter(t => now - t < this.windowMs);

    const resetIn = timestamps.length > 0 ? this.windowMs - (now - timestamps[0]) : 0;
    const allowed = timestamps.length < this.maxRequests;

    if (allowed) {
      timestamps.push(now);
      this.windows.set(key, timestamps);
    }

    this.cleanup();
    return { allowed, remaining: Math.max(0, this.maxRequests - timestamps.length - 1), resetIn };
  }

  private cleanup() {
    if (this.windows.size > 10000) {
      const now = Date.now();
      for (const [key, timestamps] of this.windows) {
        const valid = timestamps.filter(t => now - t < this.windowMs);
        if (valid.length === 0) this.windows.delete(key);
        else this.windows.set(key, valid);
      }
    }
  }
}

export const rateLimiter = new SlidingWindowRateLimit();
```

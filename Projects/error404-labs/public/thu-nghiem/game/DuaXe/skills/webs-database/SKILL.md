---
name: webs-database
description: Database production — Prisma, PostgreSQL, indexing, query optimization, migration zero-downtime. Không N+1, query < 50ms.
---

# webs-database — Database

## Lược đồ Prisma (production)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  todos     Todo[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId, completed])
  @@index([createdAt])
}
```

## Tối ưu Truy vấn (chống N+1)

```typescript
// ❌ Bad: N+1 query
const users = await prisma.user.findMany();
for (const user of users) {
  const todos = await prisma.todo.findMany({ where: { userId: user.id } });
}

// ✅ Good: include
const users = await prisma.user.findMany({
  include: { todos: true },
});

// ✅ Good: batch (nếu chỉ cần count)
const usersWithCount = await prisma.user.findMany({
  include: { _count: { select: { todos: true } } },
});

// ✅ Good: raw query cho complex case
const results = await prisma.$queryRaw`
  SELECT u.*, COUNT(t.id) as todo_count
  FROM "User" u
  LEFT JOIN "Todo" t ON t."userId" = u.id
  GROUP BY u.id
  HAVING COUNT(t.id) > $1
`, 5;
```

## Phân trang (cursor-based)

```typescript
async function paginateTodos(cursor?: string, limit = 10) {
  const todos = await prisma.todo.findMany({
    take: limit + 1,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, completed: true, createdAt: true },
  });

  const hasMore = todos.length > limit;
  if (hasMore) todos.pop();

  return {
    data: todos,
    nextCursor: hasMore ? todos[todos.length - 1].id : null,
  };
}
```

## Migration không gián đoạn

```sql
-- Step 1: Add nullable column (không lock)
ALTER TABLE "Todo" ADD COLUMN "priority" INTEGER;

-- Step 2: Backfill data (từng batch)
UPDATE "Todo" SET "priority" = 0 WHERE "priority" IS NULL;

-- Step 3: Add NOT NULL + default (fast)
ALTER TABLE "Todo" ALTER COLUMN "priority" SET NOT NULL;
ALTER TABLE "Todo" ALTER COLUMN "priority" SET DEFAULT 0;

-- Step 4: Add index CONCURRENTLY (không lock)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_todo_priority ON "Todo" ("priority");
```

## Giao dịch

```typescript
async function createUserWithTodos(email: string, todoTitles: string[]) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { email, name: email.split("@")[0], password: "hashed" },
    });

    const todos = await Promise.all(
      todoTitles.map(title =>
        tx.todo.create({ data: { title, userId: user.id } })
      )
    );

    return { user, todos };
  });
}
```

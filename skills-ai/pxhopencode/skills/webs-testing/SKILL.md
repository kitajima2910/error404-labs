---
name: webs-testing
description: Testing web — Vitest unit test, integration test, Playwright E2E, MSW mock. Coverage > 80%, chạy song song, không flaky.
---

# webs-testing — Testing

## Cài đặt Vitest

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    pool: "forks",
    testTimeout: 10000,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.*", "src/test/**"],
      thresholds: { branches: 80, functions: 80, lines: 80, statements: 80 },
    },
  },
});
```

## Unit Test

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Bấm vào tôi</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Bấm vào tôi");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Bấm</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    render(<Button loading>Đang tải</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Button variant="primary">Chính</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-blue-600");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-gray-700");
  });
});
```

## Hook Test

```typescript
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => localStorage.clear());

  it("returns initial value when no stored", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("stores and retrieves value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    act(() => result.current[1]("new value"));
    expect(result.current[0]).toBe("new value");
    expect(localStorage.getItem("key")).toBe('"new value"');
  });

  it("recovers from invalid JSON", () => {
    localStorage.setItem("key", "invalid json");
    const { result } = renderHook(() => useLocalStorage("key", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });
});
```

## MSW Mock (API)

```typescript
// src/test/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/todos", () => {
    return HttpResponse.json({
      data: [
        { id: "1", title: "Việc cần làm", completed: false },
      ],
      total: 1,
    });
  }),

  http.post("/api/todos", async ({ request }) => {
    const body = await request.json() as { title: string };
    return HttpResponse.json(
      { id: "2", title: body.title, completed: false },
      { status: 201 }
    );
  }),
];
```

## Integration Test

```typescript
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("TodoPage", () => {
  it("loads and displays todos", async () => {
    render(<TodoPage />);
    await waitFor(() => {
      expect(screen.getByText("Việc cần làm")).toBeInTheDocument();
    });
  });

  it("creates a new todo", async () => {
    render(<TodoPage />);
    await userEvent.type(screen.getByPlaceholderText("Thêm việc..."), "Việc mới{enter}");
    await waitFor(() => {
      expect(screen.getByText("Việc mới")).toBeInTheDocument();
    });
  });
});
```

## E2E với Playwright

```typescript
// e2e/todo.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Todo App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows empty state", async ({ page }) => {
    await expect(page.getByText("Chưa có việc nào")).toBeVisible();
  });

  test("adds and completes a todo", async ({ page }) => {
    await page.getByPlaceholder("Thêm việc...").fill("Mua sữa");
    await page.getByRole("button", { name: "Thêm" }).click();
    await expect(page.getByText("Mua sữa")).toBeVisible();

    await page.getByRole("checkbox").check();
    await expect(page.getByText("Mua sữa")).toHaveClass(/completed/);
  });

  test("persists after reload", async ({ page }) => {
    await page.getByPlaceholder("Thêm việc...").fill("Việc cố định");
    await page.getByRole("button", { name: "Thêm" }).click();
    await page.reload();
    await expect(page.getByText("Việc cố định")).toBeVisible();
  });
});
```

---
name: tools-automation
description: Automation script — file watcher, batch processor, pipeline, retry, logging. Chạy ổn định 24/7, không memory leak.
---

# tools-automation — Automation Scripts

## File Watcher (debounced, không double-fire)

```typescript
import chokidar from "chokidar";
import { debounce } from "lodash-es";

class FileWatcher {
  private watcher: chokidar.FSWatcher;
  private onChange: debounce<() => Promise<void>>;

  constructor(
    private patterns: string[],
    private handler: () => Promise<void>,
    private options: { debounceMs?: number; ignoreInitial?: boolean } = {}
  ) {
    this.onChange = debounce(() => this.safeHandle(), options.debounceMs ?? 300);
    this.watcher = chokidar.watch(patterns, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: options.ignoreInitial ?? true,
    });
    this.watcher.on("change", () => this.onChange());
    this.watcher.on("add", () => this.onChange());
    this.watcher.on("unlink", () => this.onChange());
  }

  private async safeHandle() {
    try {
      await this.handler();
    } catch (err) {
      console.error(`[Watcher] Error:`, err);
    }
  }

  close() {
    this.watcher.close();
  }
}
```

## Batch Processor (concurrency control)

```typescript
class BatchProcessor<T, R> {
  private queue: T[] = [];
  private running = 0;
  private results: R[] = [];
  private errors: Error[] = [];

  constructor(
    private handler: (item: T) => Promise<R>,
    private concurrency: number = 5,
    private onProgress?: (done: number, total: number) => void
  ) {}

  async process(items: T[]): Promise<{ results: R[]; errors: Error[] }> {
    this.queue = [...items];
    this.results = [];
    this.errors = [];
    this.running = 0;

    const workers = Array.from({ length: Math.min(this.concurrency, items.length) }, () => this.worker());
    await Promise.all(workers);

    return { results: this.results, errors: this.errors };
  }

  private async worker() {
    while (this.queue.length > 0) {
      const item = this.queue.shift()!;
      this.running++;
      try {
        const result = await this.handler(item);
        this.results.push(result);
      } catch (err) {
        this.errors.push(err as Error);
      }
      this.running--;
      this.onProgress?.(this.results.length + this.errors.length, this.results.length + this.errors.length + this.queue.length);
    }
  }
}
```

## Retry với Backoff

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  options: { retries?: number; baseDelay?: number; maxDelay?: number } = {}
): Promise<T> {
  const { retries = 3, baseDelay = 1000, maxDelay = 10000 } = options;
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (attempt === retries) break;

      const delay = Math.min(baseDelay * Math.pow(2, attempt) + Math.random() * 1000, maxDelay);
      console.warn(`[Retry] Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
    }
  }

  throw lastError!;
}
```

## Logger (không blocking I/O)

```typescript
import fs from "node:fs";

class AsyncLogger {
  private buffer: string[] = [];
  private flushing = false;
  private stream: fs.WriteStream;

  constructor(logPath: string) {
    this.stream = fs.createWriteStream(logPath, { flags: "a" });
    setInterval(() => this.flush(), 5000);
    process.on("exit", () => this.flush());
    process.on("uncaughtException", (err) => {
      this.error("Uncaught", err);
      this.flush();
    });
  }

  info(module: string, message: string, data?: any) {
    this.write("INFO", module, message, data);
  }

  warn(module: string, message: string, data?: any) {
    this.write("WARN", module, message, data);
  }

  error(module: string, error: Error, data?: any) {
    this.write("ERROR", module, error.message, { ...data, stack: error.stack });
  }

  private write(level: string, module: string, message: string, data?: any) {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      module,
      message,
      data,
    });
    this.buffer.push(entry);
    if (this.buffer.length >= 50) this.flush();
  }

  private flush() {
    if (this.buffer.length === 0 || this.flushing) return;
    this.flushing = true;
    const lines = this.buffer.splice(0).join("\n") + "\n";
    this.stream.write(lines, () => {
      this.flushing = false;
    });
  }
}
```

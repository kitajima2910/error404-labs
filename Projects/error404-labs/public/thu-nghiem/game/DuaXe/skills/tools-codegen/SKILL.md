---
name: tools-codegen
description: Code generator — scaffold project, component generator, template engine, Plop.js patterns. Tạo code chuẩn, không lỗi cú pháp.
---

# tools-codegen — Code Generation

## Scaffold Generator

```typescript
import fs from "node:fs/promises";
import path from "node:path";

interface ScaffoldOptions {
  name: string;
  type: "react" | "next" | "express" | "cli";
  language: "ts" | "js";
  features: string[];
}

const TEMPLATES: Record<string, (name: string) => string> = {
  "react/component": (name) =>
`interface ${name}Props {
  children?: React.ReactNode;
}

export function ${name}({ children }: ${name}Props) {
  return <div className="${name.toLowerCase()}">{children}</div>;
}
`,
  "react/hook": (name) =>
`import { useState, useCallback } from "react";

export function ${name}<T>(initial: T) {
  const [value, setValue] = useState<T>(initial);
  const reset = useCallback(() => setValue(initial), [initial]);
  return { value, setValue, reset };
}
`,
  "express/route": (name) =>
`import { Router, Request, Response } from "express";

const router = Router();

router.get("/${name}", (req: Request, res: Response) => {
  res.json({ message: "${name} endpoint" });
});

export default router;
`,
};

export async function scaffold(targetDir: string, files: Record<string, string>) {
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(targetDir, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content.trimStart() + "\n");
  }
}
```

## Plop.js Generator

```typescript
// plopfile.ts
import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("component", {
    description: "Create a React component",
    prompts: [
      { type: "input", name: "name", message: "Component name:" },
      { type: "confirm", name: "withStory", message: "Include Storybook story?" },
    ],
    actions: (data) => {
      const actions = [{
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component.tsx.hbs",
      }];
      if (data?.withStory) {
        actions.push({
          type: "add",
          path: "src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
          templateFile: "templates/story.tsx.hbs",
        });
      }
      return actions;
    },
  });
}
```

## Template Engine (EJS-like)

```typescript
function renderTemplate(template: string, data: Record<string, any>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (key in data) return String(data[key]);
    throw new Error(`Missing template variable: ${key}`);
  });
}

// PascalCase helper
function pascalCase(str: string): string {
  return str.replace(/(^\w|[-_]\w)/g, g => g.replace(/[-_]/, "").toUpperCase());
}

// camelCase helper
function camelCase(str: string): string {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
}
```

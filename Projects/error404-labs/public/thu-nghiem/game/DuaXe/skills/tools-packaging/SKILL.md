---
name: tools-packaging
description: Build & distribute — npm, Cargo, PyPI, Docker, Homebrew. Cross-platform, CI/CD, auto-update.
---

# tools-packaging — Build & Distribute

## npm Package

```json
{
  "name": "@scope/my-tool",
  "version": "1.0.0",
  "type": "module",
  "bin": { "my-tool": "dist/cli.js" },
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build && npm test",
    "version": "git add -A src",
    "postversion": "git push && git push --tags"
  },
  "publishConfig": { "access": "public" }
}
```

```bash
npm publish              # public package
npm publish --tag beta   # beta channel
npm deprecate @scope/my-tool@"<1.0" "Please upgrade to v1"
```

## Rust Cargo

```toml
[package]
name = "my-tool"
version = "1.0.0"
edition = "2021"
description = "CLI tool"
license = "MIT"

[[bin]]
name = "my-tool"
path = "src/main.rs"

[dependencies]
clap = { version = "4", features = ["derive"] }
anyhow = "1"
```

```bash
cargo publish
cargo install my-tool     # User install
```

## Python PyPI

```toml
# pyproject.toml
[build-system]
requires = ["setuptools", "wheel"]
build-backend = "setuptools.backends._legacy:_Backend"

[project]
name = "my-tool"
version = "1.0.0"
description = "CLI tool"
requires-python = ">=3.10"

[project.scripts]
my-tool = "my_tool.cli:cli"
```

```bash
python -m build
twine upload dist/*
pip install my-tool
```

## Docker

```dockerfile
# Dockerfile — multi-stage build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
ENTRYPOINT ["node", "dist/cli.js"]
```

```bash
docker build -t my-tool .
docker run my-tool --help
```

## GitHub Actions CI

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags: ["v*"]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, registry-url: "https://registry.npmjs.org" }
      - run: npm ci
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

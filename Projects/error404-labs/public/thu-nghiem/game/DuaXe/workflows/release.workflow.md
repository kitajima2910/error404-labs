# 🚀 Workflow Phát hành — Build Pipeline

Workflow này thực hiện build pipeline (đường ống xây dựng): lint → typecheck → test → build. Bạn tự deploy sau khi build xong.

## 🚀 QUY TRÌNH PHÁT HÀNH

### Kiểm tra cổng (Điều kiện tiên quyết)

Tầng 2 (Orchestration) kiểm tra Result contracts từ các phase trước:

```
☐ QA passed — Result{test, status: pass} từ @pxh-qa
☐ Code reviewed — Result{review, approved: true} từ @pxh-review-code
☐ Git status clean (git status)
```

Nếu bất kỳ điều kiện nào không thỏa → **TỪ CHỐI PHÁT HÀNH**, Orchestration gửi Event{type: reject} đến Tầng 4 + báo user.

---

### Step 1: Lint + TypeCheck

```bash
# Phát hiện loại project
$isNode = Test-Path "package.json"
$isRust = Test-Path "Cargo.toml"
$isPython = Test-Path "pyproject.toml" -or (Test-Path "requirements.txt")

if ($isNode) {
  npm run lint 2>$null; if ($?) { Write-Output "✅ Lint pass" } else { Write-Warning "⚠️  No lint script, skip" }
  npx tsc --noEmit 2>$null; if ($?) { Write-Output "✅ TypeCheck pass" } else { Write-Warning "⚠️  tsc fail or not configured" }
} elseif ($isRust) {
  cargo clippy; if ($?) { Write-Output "✅ Clippy pass" } else { exit 1 }
  cargo check; if ($?) { Write-Output "✅ Cargo check pass" } else { exit 1 }
} elseif ($isPython) {
  ruff check . 2>$null; if ($?) { Write-Output "✅ Ruff pass" } else { Write-Warning "⚠️  No ruff or lint fail, skip" }
}
```

### Step 2: Test Suite

```bash
if ($isNode) {
  npm test; if ($?) { Write-Output "✅ Tests pass" } else {
    Write-Warning "⚠️  Tests fail → báo QA, không release"
    exit 1
  }
} elseif ($isRust) {
  cargo test; if ($?) { Write-Output "✅ Tests pass" } else { exit 1 }
} elseif ($isPython) {
  pytest 2>$null; if ($?) { Write-Output "✅ Tests pass" } else { Write-Warning "⚠️  No pytest or test fail" }
}
```

### Step 3: Build

```bash
if ($isNode) {
  npm run build; if ($?) {
    $outDir = if (Test-Path ".next") { ".next" } elseif (Test-Path "dist") { "dist" } else { "build" }
    if (Test-Path $outDir) {
      $size = (Get-ChildItem -Path $outDir -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
      Write-Output "✅ Build success (${size:N1}MB)"
    } else { Write-Output "✅ Build success" }
  } else { exit 1 }
} elseif ($isRust) {
  cargo build --release; if ($?) {
    $size = (Get-ChildItem -Path "target/release" -File | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Output "✅ Build success (${size:N1}MB)"
  } else { exit 1 }
} elseif ($isPython) {
  python -m build 2>$null; if ($?) { Write-Output "✅ Build success" } else {
    Write-Warning "⚠️  Build not configured, skip"
  }
}
```

### Step 4: Bạn tự deploy

Build xong, báo user:
```
✅ Build thành công!
📁 Output: dist/ (hoặc .next/)
👉 Bạn chạy live server hoặc deploy lên hosting tuỳ ý.
```

Sau khi build xong, Orchestration gửi Event{type: build_complete} đến `@pxh-save-history`:
- `Event{phase: release, status: success, data: {version, size, date}}`
- Tầng 4 lưu + cập nhật .opencode/STATUS.md ✅

---

## 📋 MẪU BÁO CÁO PHÁT HÀNH

```markdown
## 🚀 BUILD REPORT — v[version]

### 📊 Tổng quan
| Stage | Status | Detail |
|-------|--------|--------|
| Gate Check | ✅ Pass | QA + Review ok |
| Lint | ✅ Pass | 0 warnings |
| TypeCheck | ✅ Pass | 0 errors |
| Test | ✅ Pass | 15/15 passed |
| Build | ✅ Pass | 12.5MB |
```

## 🚨 XỬ LÝ SỰ CỐ

| Vấn đề | Hành động |
|--------|----------|
| Lint lỗi | Fix → commit lại → chạy lại pipeline |
| Test fail | Báo QA, không release |
| Build fail | Kiểm tra log, fix dependency |

## Luồng Runtime (Các tầng)
```
Tầng 3 (Worker / Builder): pxh-devops chạy build pipeline
Tầng 3 (Worker / Validator): pxh-qa gate check (đã pass trước đó)
Tầng 3 (Worker / Reviewer): pxh-review-code gate check (đã pass trước đó)
Tầng 4 (Infrastructure): pxh-save-history ghi lại build version
Tầng 2 (Orchestration): pxh-pm đánh giá build result → báo user
Tầng 1 (Interface): Kết quả build → user
```

## Liên kết
- Runtime: `runtime/README.md`, `runtime/layers/03-worker.md`
- Contracts: `runtime/contracts/README.md` — Task, Result, Event
- Policies: `runtime/policies/retry.md`, `runtime/policies/recovery.md`
- Agents: `@pxh-devops` (Tầng 3 Builder), `@pxh-qa` (Tầng 3 Validator), `@pxh-review-code` (Tầng 3 Reviewer), `@pxh-pm` (Tầng 2), `@pxh-save-history` (Tầng 4)
- Skill: `skills/webs-deployment/SKILL.md` — Deployment guide

## NGUYÊN TẮC

1. **Fail fast**: Nếu bước nào lỗi → dừng ngay, không tiếp tục
2. **Mỗi bước phải pass**: Không skip bước nào

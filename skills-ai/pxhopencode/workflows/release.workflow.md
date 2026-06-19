# 🚀 Release Workflow — Build Pipeline

Workflow này thực hiện build pipeline: lint → typecheck → test → build. Bạn tự deploy sau khi build xong.

## 🚀 QUY TRÌNH RELEASE

### Gate Check (Điều kiện tiên quyết)

```
☐ QA passed (`@pxh-qa` đã approve)
☐ Code reviewed (`@pxh-review-code` đã approve)
☐ Git status clean (git status)
```

Nếu bất kỳ điều kiện nào không thỏa → **TỪ CHỐI RELEASE**, báo PM.

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

Sau khi build xong, gọi `@pxh-save-history update-status` để:
- Cập nhật phase RELEASE ✅
- Ghi lại build version, output size, ngày release

---

## 📋 MẪU BÁO CÁO RELEASE

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

## NGUYÊN TẮC

1. **Fail fast**: Nếu bước nào lỗi → dừng ngay, không tiếp tục
2. **Mỗi bước phải pass**: Không skip bước nào

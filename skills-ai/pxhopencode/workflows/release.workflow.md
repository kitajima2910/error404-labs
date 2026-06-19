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
$isPython = Test-Path "pyproject.toml"

if ($isNode) {
  npm run lint; if ($?) { Write-Output "✅ Lint pass" } else { exit 1 }
  npx tsc --noEmit; if ($?) { Write-Output "✅ TypeCheck pass" } else { exit 1 }
}
```

### Step 2: Test Suite

```bash
if ($isNode) {
  npm test; if ($?) { Write-Output "✅ Tests pass" } else {
    Write-Warning "⚠️  Tests fail → báo QA, không release"
    exit 1
  }
}
```

### Step 3: Build

```bash
if ($isNode) {
  npm run build; if ($?) {
    $size = (Get-ChildItem -Path ".next" -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Output "✅ Build success (${size}MB)"
  } else { exit 1 }
}
```

### Step 4: Bạn tự deploy

Build xong, báo user:
```
✅ Build thành công!
📁 Output: dist/ (hoặc .next/)
👉 Bạn chạy live server hoặc deploy lên hosting tuỳ ý.
```

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

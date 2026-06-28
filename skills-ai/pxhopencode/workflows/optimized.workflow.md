# 🎯 Optimized Workflow — Prompt Optimization → Planning → Execute → Giải thích

Workflow này thêm một lớp Prompt Optimization trước khi chạy pipeline chuẩn. User có thể nhập tiếng Việt, hệ thống tự động translate + optimize prompt → break thành tasks → architect → code → review → test → giải thích kết quả bằng tiếng Việt.

```
User (Vietnamese)
  │
  ▼
┌─────────────────────────────────────────────┐
│ PHASE 0: PROMPT OPTIMIZATION [Tầng 1+]       │
│ pxh-prompt-optimizer                         │
│ • Phát hiện ngôn ngữ (Việt/Anh)              │
│ • Translate → English (nếu cần)              │
│ • Rewrite → Prompt Engineering chuẩn          │
│ • Gap Analysis → Bổ sung requirement         │
└──────────────────┬──────────────────────────┘
                   │ Optimized Prompt
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 1: PLANNING [Tầng 2]                   │
│ pxh-planner                                  │
│ • Phân tích prompt đã optimize                │
│ • Break thành tasks nhỏ                       │
│ • Tạo Task contracts                          │
│ • Sắp xếp thứ tự ưu tiên                      │
└──────────────────┬──────────────────────────┘
                   │ Plan
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 2: ARCHITECT [Tầng 3]                  │
│ pxh-architect                                │
│ • Thiết kế kiến trúc                         │
│ • Database schema, API design                │
│ • Component tree, data flow                  │
└──────────────────┬──────────────────────────┘
                   │ Architecture
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 3: CODE [Tầng 3]                       │
│ pxh-expert                                   │
│ • Implement theo kiến trúc                   │
│ • Chạy workflow phù hợp (web/game/ai)        │
│ • Gọi skills tương ứng                       │
└──────────────────┬──────────────────────────┘
                   │ Code
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 4: REVIEW [Tầng 3]                     │
│ pxh-review-code                              │
│ • Security check                             │
│ • Performance check                          │
│ • Convention check                           │
│ • Code quality                               │
└──────────────────┬──────────────────────────┘
                   │ Reviewed code
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 5: TEST [Tầng 3]                       │
│ pxh-qa                                       │
│ • Chạy test suite                            │
│ • Phát hiện bug                              │
│ • Edge case testing                          │
└──────────────────┬──────────────────────────┘
                   │ Test results
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 6: FIX (nếu cần) [Tầng 3]              │
│ pxh-fix-bugs                                 │
│ • Phân tích bug                              │
│ • Sửa lỗi                                    │
│ • Quay lại Test                              │
└──────────────────┬──────────────────────────┘
                   │ Fixed code
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 7: BUILD [Tầng 3]                      │
│ pxh-devops                                   │
│ • Lint + Typecheck                           │
│ • Build                                      │
└──────────────────┬──────────────────────────┘
                   │ Build artifacts
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 8: GIẢI THÍCH [Tầng 1]                 │
│ pxh-pm (hoặc pxh-help)                       │
│ • Giải thích kết quả bằng tiếng Việt         │
│ • Tóm tắt đã làm gì                          │
│ • Hướng dẫn chạy thử                         │
│ • Gợi ý bước tiếp theo                       │
└─────────────────────────────────────────────┘
```

## 🔄 QUY TRÌNH CHI TIẾT

### Phase 0: Prompt Optimization

Khi user gửi prompt (có thể tiếng Việt):

1. **pxh-prompt-optimizer** nhận prompt thô
2. Phát hiện ngôn ngữ:
   - Nếu tiếng Việt → dịch sang tiếng Anh chính xác
   - Nếu tiếng Anh → giữ nguyên
3. Rewrite theo cấu trúc Prompt Engineering:
   ```markdown
   ## Role
   [vai trò]
   
   ## Context  
   [bối cảnh]
   
   ## Task
   [nhiệm vụ]
   
   ## Requirements
   [yêu cầu]
   
   ## Constraints
   [ràng buộc]
   
   ## Output Format
   [định dạng đầu ra]
   ```
4. Gap Analysis: kiểm tra thiếu TARGET, tech stack, ràng buộc, audience
5. Bổ sung requirement suy luận từ ngữ cảnh
6. Trả về `Result{status: "optimized", optimized_prompt}`

### Phase 1: Planning

**pxh-planner** nhận prompt đã optimize:

1. Phân tích mục tiêu, công nghệ, phạm vi, ràng buộc
2. Break thành tasks nhỏ theo thứ tự
3. Tạo Task contracts đầy đủ
4. Trả về `Result{status: "planned", plan, tasks[]}` cho PM

### Phase 2: Architect

**pxh-architect** nhận Task contract từ Planner qua PM:

1. Thiết kế kiến trúc tổng thể
2. Database schema
3. API endpoints
4. Component tree
5. Data flow diagrams
6. Trả về `Result{status: "done", artifacts: {schema, api_docs, ...}}`

### Phase 3: Code

**pxh-expert** nhận kiến trúc:

1. Chọn workflow phù hợp (web/game/ai/tool)
2. Load skills tương ứng
3. Implement code theo kiến trúc
4. Chạy thử
5. Trả về `Result{status: "done", features: [], files: []}`

### Phase 4: Review

**pxh-review-code** review code:

1. Security scan
2. Performance check
3. Convention & style
4. Code quality
5. Trả về `Result{approved: true/false, issues: [], score}`

Nếu không approved → quay lại Phase 3 để fix.

### Phase 5: Test

**pxh-qa** kiểm thử:

1. Chạy test suite
2. Kiểm tra edge cases
3. Phát hiện bug
4. Trả về `Result{status: pass/fail, bugs: []}`

Nếu fail → Phase 6.

### Phase 6: Fix

**pxh-fix-bugs** sửa lỗi:

1. Phân tích bug từ QA
2. Tìm root cause
3. Fix code
4. Quay lại Phase 5 (test lại)

Vòng lặp Test → Fix tối đa 3 lần.

### Phase 7: Build

**pxh-devops** build:

1. Lint + Typecheck
2. Build
3. Trả về `Result{build: pass/fail, size, path}`

### Phase 8: Giải thích bằng tiếng Việt

Kết quả cuối được trình bày bằng tiếng Việt:

```markdown
## ✅ Hoàn thành: [Tên dự án]

### 📋 Tóm tắt
[giải thích ngắn gọn đã làm gì]

### 📁 Cấu trúc
```
project/
├── src/
│   ├── ...
│   └── ...
├── package.json
└── ...
```

### 🚀 Chạy thử
```bash
npm run dev
# Mở http://localhost:3000
```

### ✅ Đã làm
- [x] Tính năng 1
- [x] Tính năng 2

### 💡 Gợi ý
- Bước tiếp theo có thể làm: [gợi ý]
```

## 🔄 VÒNG LẶP

```
Phase 3 (Code) → Phase 4 (Review)
                    ↓ (có issue)
                 quay lại Phase 3

Phase 5 (Test) → Phase 6 (Fix) → Phase 5 (Test lại)

Tối đa 3 lần lặp fix. Nếu vẫn lỗi → báo user.
```

## 🚨 XỬ LÝ ĐẶC BIỆT

| Tình huống | Xử lý |
|-----------|-------|
| Prompt tiếng Việt khó dịch | Giải thích bằng tiếng Việt để user xác nhận lại |
| Thiếu TARGET | Hỏi user "Bạn muốn tác động vào file/thư mục nào?" |
| User không rõ tech stack | Đề xuất stack phổ biến, hỏi xác nhận |
| Quá 3 lần fix vẫn lỗi | Báo user bằng tiếng Việt, đề xuất giải pháp thay thế |
| Build fail | Log lỗi, giải thích bằng tiếng Việt, đề xuất hướng fix |

## Liên kết
- **Prompt Optimizer:** `agents/pxh-prompt-optimizer.md`
- **Planner:** `agents/pxh-planner.md`
- **Agents còn lại:** `agents/pxh-architect.md`, `agents/pxh-expert.md`, `agents/pxh-review-code.md`, `agents/pxh-qa.md`, `agents/pxh-fix-bugs.md`, `agents/pxh-devops.md`
- **Contracts:** `runtime/contracts/README.md`
- **Policies:** `runtime/policies/retry.md`, `runtime/policies/recovery.md`, `runtime/policies/reflection.md`

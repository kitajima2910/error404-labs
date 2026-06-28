# 🎯 Optimized Workflow — Auto Pipeline (tự động hoàn toàn)

Workflow này cho phép user nhập tiếng Việt, hệ thống tự động: translate → optimize → detect domain → detect effort → scale pipeline → execute → giải thích kết quả bằng tiếng Việt. Không routing table cứng, không manual chọn workflow.

```
User (Vietnamese)
  │
  ▼
┌─────────────────────────────────────────────┐
│ PHASE 0: PROMPT OPTIMIZATION [Tầng 1+]       │
│ pxh-prompt-optimizer                         │
│ • Phát hiện ngôn ngữ → translate → hiển thị  │
│ • Rewrite → Prompt Engineering chuẩn          │
│ • Gap Analysis → Bổ sung requirement         │
└──────────────────┬──────────────────────────┘
                   │ Optimized Prompt
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 1: AUTO PLANNING [Tầng 2]              │
│ pxh-planner                                  │
│ • Auto-detect: domain + workflow + effort    │
│ • Scale pipeline theo effort (small/large)   │
│ • Break thành tasks + Task contracts         │
└──────────────────┬──────────────────────────┘
                   │ Plan (workflow, domain, effort, tasks[])
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 2: EXECUTE [Tầng 3]                    │
│ Tuần tự theo plan từ Planner:                │
│                                              │
│ Small (effort: small):                       │
│   Expert → Build                             │
│                                              │
│ Medium (effort: medium):                     │
│   Architect → Expert → Review → Test → Build │
│                                              │
│ Large (effort: large):                       │
│   Meeting → Architect → Expert → Review      │
│   → Test → Fix → Build                      │
└──────────────────┬──────────────────────────┘
                   │ Results
                   ▼
┌─────────────────────────────────────────────┐
│ PHASE 3: GIẢI THÍCH [Tầng 1]                 │
│ Kết quả bằng tiếng Việt                      │
└─────────────────────────────────────────────┘
```

## 🔄 CHI TIẾT CÁC PHASE

### Phase 0: Prompt Optimization
1. `pxh-prompt-optimizer` nhận prompt thô
2. Phát hiện ngôn ngữ → nếu Việt → dịch Anh → hiển thị 🇬🇧
3. Rewrite Prompt Engineering (Role, Context, Task, Requirements, Constraints, Output Format)
4. Gap Analysis + bổ sung requirement
5. Trả về `Result{status: "optimized", translated_english, optimized_prompt}`

### Phase 1: Auto Planning (hoàn toàn tự động)
`pxh-planner` tự động:
1. **Detect domain**: Web / Game / AI / Tool / Debug (từ tech stack + features)
2. **Detect workflow**: Chọn workflow file phù hợp
3. **Estimate effort**: Small (1-2 tính năng) / Medium (3-5) / Large (6+)
4. **Scale pipeline**:
   - **Small** → 2 phases: Code → Build (skip Architect, Review, Test riêng)
   - **Medium** → 5 phases: Architect → Code → Review → Test → Build
   - **Large** → 7 phases: Meeting → Architect → Code → Review → Test → Fix → Build
5. **Break tasks**: Tạo Task contracts cho mỗi phase
6. Trả về `Result{status: "planned", workflow, domain, effort, tasks[]}`

### Phase 2: Execute (theo plan)
PM đọc `tasks[]` và route tuần tự. Mỗi task:
- Nhận Task contract → gọi agent → nhận Result
- Pass → task tiếp theo
- Fail → retry/fix policy
- Timeout → fallback

### Phase 3: Giải thích bằng tiếng Việt
Kết quả cuối trình bày bằng tiếng Việt với đầy đủ:
- Tóm tắt đã làm
- Cấu trúc file
- Hướng dẫn chạy thử
- Gợi ý bước tiếp theo

## 🔄 VÒNG LẶP

```
Execute → Test pass? → Build → Done
                ↓ fail
            Fix → Test lại (max 3 lần)
                ↓ vẫn fail
            Báo user
```

## 🛡 RUNTIME GUARDS

| Phase | Timeout | Fallback |
|-------|---------|----------|
| Prompt Optimization | 30s | Dùng prompt thô |
| Planning | 30s | Plan mặc định: Code → Build |
| Architect/Code/Review | 60s | Retry 1, skip nếu timeout |
| Test/Fix/Build | 120s | Retry 1, skip nếu timeout |
| Toàn bộ workflow | 10 phút | Kill + báo user |

## Liên kết
- **Prompt Optimizer:** `agents/pxh-prompt-optimizer.md`
- **Planner (auto-detect):** `agents/pxh-planner.md`
- **PM (orchestrator):** `agents/pxh-pm.md`
- **Contracts:** `runtime/contracts/README.md`
- **Policies:** `runtime/policies/retry.md`, `runtime/policies/recovery.md`, `runtime/policies/reflection.md`

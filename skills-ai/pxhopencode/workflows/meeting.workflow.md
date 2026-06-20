# 👥 Workflow Họp — Agents thảo luận & quyết định

Workflow này triệu tập các agents lại để thảo luận, phản biện, và đưa ra quyết định chung. Mỗi agent đóng góp ý kiến từ chuyên môn của mình.

## 🚀 CÁCH HOẠT ĐỘNG

Khi được gọi với chủ đề, workflow sẽ:
1. Triệu tập các agents liên quan
2. Mỗi agent đưa ra ý kiến + lý do
3. Agents phản biện lẫn nhau
4. Tổng hợp và quyết định

## 👥 DANH SÁCH AGENTS THAM GIA

| Agent | Vai trò | Góc nhìn |
|-------|---------|----------|
| `@pxh-architect` | Kiến trúc sư | Tech stack, database, API, scale |
| `@pxh-expert` | Chuyên gia | Tính khả thi, best practice, performance |
| `@pxh-qa` | QA | Testability, edge cases, quality |
| `@pxh-devops` | DevOps | Deploy, infra cost, monitoring |
| `@pxh-save-history` | Thư ký | Ghi lại biên bản meeting |

## 📋 QUY TRÌNH HỌP

### Step 1: Khai mạc (PM)
```
📋 CHỦ ĐỀ: [Mô tả]
🎯 MỤC TIÊU: Quyết định [vấn đề]
⏱ THỜI GIAN: 5 phút
```

### Step 2: Trình bày (từng agent)
Mỗi agent trình bày theo format:

```markdown
### Agent: pxh-architect

#### Đề xuất
[giải pháp được đề xuất]

#### Lý do
1. [Lý do chính]
2. [Lý do phụ]

#### Ưu điểm
- [Ưu điểm 1]
- [Ưu điểm 2]

#### Nhược điểm / Rủi ro
- [Rủi ro 1]
- [Rủi ro 2]

#### Giải pháp thay thế
[Option khác nếu có]
```

### Step 3: Phản biện (cross-discussion)
Các agents phản biện lẫn nhau:

```
Architect: "Tôi đề xuất Next.js + PostgreSQL"
Expert: "Tôi đồng ý, nhưng nếu MVP nhanh thì SQLite đủ"
QA: "Next.js giúp dễ test E2E với Playwright"
DevOps: "Vercel deploy Next.js rất dễ, không cần DevOps phức tạp"
```

### Step 4: Tổng hợp & Quyết định

```markdown
## 📋 BIÊN BẢN HỌP

### 🎯 Chủ đề: [Chủ đề]

### 👥 Tham gia
- [Agent 1] → Đồng ý / Phản đối
- [Agent 2] → Đồng ý / Phản đối
- [Agent 3] → Đề xuất thay đổi

### ✅ Quyết định
Chọn: [Giải pháp cuối cùng]

### 📝 Lý do
1. [Lý do]
2. [Lý do]

### 🔄 Action items
- [ ] PM: Chọn workflow + skill
- [ ] Architect: Viết ADR
- [ ] Expert: Bắt đầu code
- [ ] QA: Chuẩn bị test strategy
```

### Step 5: Persist — Tầng 2 gửi Event contract đến Tầng 4

Orchestration gửi `Event{type: decision}` đến `@pxh-save-history`:
```json
{
  "phase": "MEETING",
  "decision": "[giải pháp được chọn]",
  "tech_stack": "[công nghệ đã chọn]",
  "action_items": ["[danh sách]"]
}
```
Tầng 4 nhận Event → lưu biên bản + cập nhật .opencode/STATUS.md. Trả về `Confirmed` cho Tầng 2.

## 📊 MA TRẬN QUYẾT ĐỊNH

Khi có nhiều lựa chọn, dùng ma trận:

| Tiêu chí | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Time to ship | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Performance | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Maintainability | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Scalability | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| Chi phí | ⭐⭐⭐ | ⭐⭐ | ⭐ |

**Tổng**: A (10) / B (9) / C (9) → Chọn A

## 🚨 XỬ LÝ BẤT ĐỒNG

| Tình huống | Cách xử lý |
|-----------|-----------|
| 2 agents có ý kiến trái ngược | PM yêu cầu mỗi agent đưa thêm evidence |
| Không đạt consensus | PM quyết định, nhưng ghi lại dissent |
| User có ý kiến riêng | User là sếp → làm theo user |
| Vấn đề quá phức tạp | Tạm dừng, yêu cầu user cung cấp thêm thông tin |

## Ngữ cảnh Runtime (Các tầng)
```
Tầng 2 (Orchestration): pxh-pm triệu tập meeting
Tầng 3 (Worker / Planner): pxh-architect phản biện architecture
Tầng 3 (Worker / Executor): pxh-expert đánh giá khả thi
Tầng 3 (Worker / Validator): pxh-qa đề xuất test strategy
Tầng 3 (Worker / Builder): pxh-devops đánh giá infra cost
Tầng 4 (Infrastructure): pxh-save-history ghi biên bản + quyết định
```

## Liên kết
- Runtime: `runtime/layers/02-orchestration.md`, `runtime/layers/03-worker.md`, `runtime/layers/04-infrastructure.md`
- Contracts: `runtime/contracts/README.md` — Event{decision}
- Agents: Tất cả 9 agents tham gia tuỳ chủ đề

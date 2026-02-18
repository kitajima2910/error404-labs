# Phần Mềm Quản Lý Thuế Thu Nhập Cá Nhân (TNCN)

Hệ thống quản lý thuế thu nhập cá nhân theo luật thuế Việt Nam, dành cho nhân viên kế toán.

## 🚀 Tính năng chính

### ✅ Đã hoàn thành

1. **Xác thực ngưởi dùng**
   - Đăng nhập/Đăng xuất với Supabase Auth
   - Phân quyền 3 cấp: Admin, Quản lý, Kế toán

2. **Dashboard**
   - Thống kê tổng quan
   - Số liệu nhân viên, ngưởi phụ thuộc, thuế

3. **Quản lý Nhân viên**
   - CRUD nhân viên (Thêm, Sửa, Xóa, Xem)
   - Import danh sách từ Excel
   - Tìm kiếm và lọc
   - Đánh dấu nhân viên đã nghỉ việc

4. **Quản lý Ngưởi phụ thuộc**
   - Giao diện quản lý ngưởi phụ thuộc
   - Theo dõi thờigian giảm trừ

5. **Tính thuế TNCN**
   - Giao diện tính thuế
   - Hiển thị công thức và thuế suất
   - Chọn tháng/năm tính thuế

### 🔄 Đang phát triển

- Import thu nhập từ Excel
- Tính toán thuế tự động
- Lịch sử đóng thuế
- Khóa/Mở khóa sổ tháng
- Báo cáo và xuất Excel/PDF

## 📋 Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn
- Tài khoản Supabase (đã cấu hình)

## 🛠️ Cài đặt

### 1. Clone và cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình môi trường

File `.env` đã được tạo sẵn với thông tin Supabase của bạn:

```env
VITE_SUPABASE_URL=https://aepdnyqevmiiqzueheou.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_XTJJFbI1JWSjuFo_mZA0WA_ZU0TI_BD
```

### 3. Cài đặt Database

Xem hướng dẫn chi tiết trong file `DATABASE_SETUP.md`

Tóm tắt:
1. Vào Supabase Dashboard
2. Mở SQL Editor
3. Chạy các lệnh trong `database/schema.sql`
4. Chạy các lệnh trong `database/schema_policies.sql`
5. Tạo user admin trong Authentication

### 4. Chạy ứng dụng

```bash
npm run dev
```

Mở trình duyệt và truy cập: http://localhost:5173

## 👤 Tài khoản đăng nhập

- **Email:** error404labs
- **Password:** qwer1234
- **Vai trò:** Admin

## 📁 Cấu trúc dự án

```
vn-pit-v2/
├── .env                          # Environment variables
├── database/
│   ├── schema.sql               # Database schema
│   └── schema_policies.sql      # RLS policies
├── src/
│   ├── components/
│   │   ├── ui/                  # UI components (Button, Input, Card...)
│   │   └── layout/              # Layout components (Sidebar)
│   ├── features/
│   │   ├── auth/                # Đăng nhập/Đăng xuất
│   │   ├── dashboard/           # Trang tổng quan
│   │   ├── employees/           # Quản lý nhân viên
│   │   ├── dependents/          # Quản lý ngưởi phụ thuộc
│   │   └── tax/                 # Tính thuế TNCN
│   ├── hooks/
│   │   ├── useAuth.ts           # Authentication hook
│   │   └── useRole.ts           # Role permission hook
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   ├── constants.ts         # Constants (tax rates...)
│   │   └── utils.ts             # Utility functions
│   ├── types/
│   │   └── database.ts          # TypeScript types
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
└── README.md                    # This file
```

## 🔐 Phân quyền

| Chức năng | Admin | Quản lý | Kế toán |
|-----------|-------|---------|---------|
| Dashboard | ✅ | ✅ | ✅ |
| Xem nhân viên | ✅ | ✅ | ✅ |
| Thêm/Sửa nhân viên | ✅ | ❌ | ✅ |
| Xóa nhân viên | ✅ | ❌ | ❌ |
| Import nhân viên | ✅ | ❌ | ✅ |
| Xem ngưởi phụ thuộc | ✅ | ✅ | ✅ |
| Thêm/Sửa ngưởi phụ thuộc | ✅ | ❌ | ✅ |
| Tính thuế | ✅ | ❌ | ✅ |
| Import thu nhập | ✅ | ❌ | ✅ |
| Xem báo cáo | ✅ | ✅ | ✅ |
| Xuất báo cáo | ✅ | ✅ | ❌ |
| Khóa/Mở khóa sổ | ✅ | ✅ | ❌ |
| Cài đặt hệ thống | ✅ | ❌ | ❌ |

## 🧮 Luật thuế TNCN áp dụng

### Giảm trừ gia cảnh
- **Bản thân:** 11,000,000 VNĐ/tháng
- **Ngưởi phụ thuộc:** 4,400,000 VNĐ/ngưởi/tháng

### Thuế suất lũy tiến

| Bậc | Thu nhập tính thuế/tháng | Thuế suất | Số trừ |
|-----|-------------------------|-----------|--------|
| 1 | Đến 5,000,000 | 5% | 0 |
| 2 | Trên 5,000,000 đến 10,000,000 | 10% | 250,000 |
| 3 | Trên 10,000,000 đến 18,000,000 | 15% | 750,000 |
| 4 | Trên 18,000,000 đến 32,000,000 | 20% | 1,650,000 |
| 5 | Trên 32,000,000 đến 52,000,000 | 25% | 3,250,000 |
| 6 | Trên 52,000,000 đến 80,000,000 | 30% | 5,850,000 |
| 7 | Trên 80,000,000 | 35% | 9,850,000 |

### Công thức tính
```
Thu nhập tính thuế = Tổng thu nhập - Không chịu thuế - Bảo hiểm 
                    - Giảm trừ bản thân - Giảm trừ ngưởi phụ thuộc

Thuế phải nộp = Thu nhập tính thuế × Thuế suất - Số trừ
```

## 📝 Mẫu file Excel

### Import nhân viên
| Mã NV | Họ tên | Đơn vị | Mã số thuế | Số CCCD | Đã nghỉ việc |
|-------|--------|--------|------------|---------|--------------|
| NV001 | Nguyễn Văn A | Phòng Kế toán | 1234567890 | 012345678901 | false |

### Import thu nhập
| Mã NV | Họ tên | Mã số thuế | Tổng thu nhập | Không chịu thuế | Bảo hiểm |
|-------|--------|------------|---------------|-----------------|----------|
| NV001 | Nguyễn Văn A | 1234567890 | 20000000 | 0 | 1500000 |

## 🛟 Hỗ trợ

Nếu gặp vấn đề:

1. Kiểm tra lại cấu hình Supabase trong file `.env`
2. Đảm bảo đã chạy đầy đủ các lệnh SQL trong `database/schema.sql`
3. Kiểm tra user đã được tạo trong Supabase Authentication
4. Xem console log để biết chi tiết lỗi

## 📄 License

Copyright © 2026 - Hệ thống Quản lý Thuế TNCN

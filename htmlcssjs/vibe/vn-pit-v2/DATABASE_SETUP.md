# HƯỚNG DẪN CÀI ĐẶT DATABASE

## 1. Truy cập Supabase Dashboard

Mở trình duyệt và vào: https://supabase.com/dashboard

Chọn project của bạn: `aepdnyqevmiiqzueheou`

## 2. Mở SQL Editor

1. Click vào **SQL Editor** trong menu bên trái
2. Click **New query**
3. Copy toàn bộ nội dung file `database/schema.sql`
4. Paste vào SQL Editor
5. Click **Run** để tạo các bảng

## 3. Chạy Policies

1. Tạo query mới
2. Copy nội dung file `database/schema_policies.sql`
3. Paste vào SQL Editor
4. Click **Run** để thiết lập phân quyền

## 4. Tạo User Admin

Nếu chưa tạo user admin trong Dashboard:

1. Vào **Authentication** > **Users**
2. Click **Add user**
3. Nhập:
   - Email: error404labs@info.vn
   - Password: qwer1234
4. Click **Create user**

## 5. Cập nhật Role cho User

1. Vào **Table Editor**
2. Chọn bảng **profiles**
3. Tìm user vừa tạo
4. Cập nhật cột **role** thành: `admin`

## 6. Kiểm tra

Chạy lệnh sau trong SQL Editor để kiểm tra:

```sql
SELECT * FROM profiles;
SELECT * FROM employees;
SELECT * FROM dependents;
SELECT * FROM tax_records;
SELECT * FROM month_locks;
```

Nếu không có lỗi, database đã sẵn sàng!

## Cấu trúc bảng

### 1. profiles

Lưu thông tin bổ sung của user sau khi đăng ký

- `id`: UUID (khóa chính, liên kết với auth.users)
- `full_name`: Tên đầy đủ
- `role`: Vai trò (admin/manager/accountant)

### 2. employees

Danh sách nhân viên

- `id`: UUID (khóa chính)
- `ma_nv`: Mã nhân viên (duy nhất)
- `ho_ten`: Họ và tên
- `don_vi`: Đơn vị/phòng ban
- `ma_so_thue`: Mã số thuế
- `so_cccd`: Số CCCD
- `da_nghi_viec`: Trạng thái nghỉ việc

### 3. dependents

Ngưởi phụ thuộc của nhân viên

- `id`: UUID (khóa chính)
- `employee_id`: ID nhân viên (khóa ngoại)
- `ho_ten`: Họ và tên
- `moi_quan_he`: Mối quan hệ
- `ngay_sinh`: Ngày sinh
- `ma_so_thue`: Mã số thuế
- `so_cccd`: Số CCCD
- `tu_thang/tu_nam`: Thờigian bắt đầu giảm trừ
- `den_thang/den_nam`: Thờigian kết thúc giảm trừ
- `khong_con_su_dung`: Đánh dấu không còn sử dụng

### 4. tax_records

Bản ghi thuế hàng tháng

- `id`: UUID (khóa chính)
- `employee_id`: ID nhân viên (khóa ngoại)
- `thang/nam`: Tháng/năm tính thuế
- `tong_thu_nhap`: Tổng thu nhập
- `khong_chiu_thue`: Thu nhập không chịu thuế
- `bao_hiem`: Tiền bảo hiểm
- `giam_tru_ban_than`: Giảm trừ gia cảnh bản thân
- `giam_tru_phu_thuoc`: Giảm trừ ngưởi phụ thuộc
- `so_nguoi_phu_thuoc`: Số ngưởi phụ thuộc
- `thu_nhap_tinh_thue`: Thu nhập tính thuế
- `thue_phai_nop`: Thuế phải nộp
- `da_khoa_so`: Trạng thái khóa sổ

### 5. month_locks

Quản lý khóa sổ tháng

- `id`: UUID (khóa chính)
- `thang/nam`: Tháng/năm
- `da_khoa`: Trạng thái khóa
- `khoa_boi`: Ngưởi khóa
- `ngay_khoa`: Ngày khóa

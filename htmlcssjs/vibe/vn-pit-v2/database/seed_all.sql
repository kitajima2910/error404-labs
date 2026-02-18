-- ============================================
-- SEED ALL DATA - FILE TỔNG HỢP
-- ============================================
-- File này chạy tất cả các file seed data theo thứ tự
-- Chạy trong Supabase SQL Editor

-- ============================================
-- LƯU Ý QUAN TRỌNG
-- ============================================
-- 1. Đảm bảo đã chạy schema.sql và schema_policies.sql trước
-- 2. Đảm bảo đã tạo user admin trong Authentication
-- 3. Chạy từng phần hoặc chạy toàn bộ file

-- ============================================
-- PHẦN 1: NHÂN VIÊN (150 ngưởi)
-- ============================================
\ir seed_data/01_employees.sql

-- ============================================
-- PHẦN 2: NGƯỜI PHỤ THUỘC (~220 ngưởi)
-- ============================================
\ir seed_data/02_dependents.sql

-- ============================================
-- PHẦN 3: BẢN GHI THUẾ (883 bản ghi)
-- ============================================
\ir seed_data/03_tax_records.sql

-- ============================================
-- PHẦN 4: KHÓA SỔ THÁNG
-- ============================================
\ir seed_data/04_month_locks.sql

-- ============================================
-- KIỂM TRA DỮ LIỆU
-- ============================================

-- Kiểm tra nhân viên
SELECT 'Tổng nhân viên' as metric, COUNT(*) as value FROM employees
UNION ALL
SELECT 'NV đang làm việc', COUNT(*) FROM employees WHERE da_nghi_viec = false
UNION ALL
SELECT 'NV đã nghỉ việc', COUNT(*) FROM employees WHERE da_nghi_viec = true;

-- Kiểm tra ngưởi phụ thuộc
SELECT 'Tổng ngưởi phụ thuộc' as metric, COUNT(*) as value FROM dependents
UNION ALL
SELECT 'Đang active', COUNT(*) FROM dependents WHERE khong_con_su_dung = false
UNION ALL
SELECT 'Không còn sử dụng', COUNT(*) FROM dependents WHERE khong_con_su_dung = true;

-- Kiểm tra bản ghi thuế
SELECT 
  'Tháng ' || thang || '/' || nam as period,
  COUNT(*) as so_ban_ghi,
  SUM(thue_phai_nop) as tong_thue,
  CASE WHEN da_khoa_so THEN 'Đã khóa' ELSE 'Chưa khóa' END as trang_thai
FROM tax_records 
GROUP BY nam, thang, da_khoa_so 
ORDER BY nam, thang;

-- Kiểm tra khóa sổ
SELECT 
  thang || '/' || nam as thang_nam,
  CASE WHEN da_khoa THEN 'Đã khóa' ELSE 'Chưa khóa' END as trang_thai,
  ngay_khoa
FROM month_locks 
ORDER BY nam, thang;

-- ============================================
-- THỐNG KÊ TỔNG QUAN
-- ============================================
SELECT 
  '=== THỐNG KÊ TỔNG QUAN ===' as info;

SELECT 
  'Tổng số nhân viên' as description, 
  COUNT(*)::text as value 
FROM employees;

SELECT 
  'Tổng số ngưởi phụ thuộc' as description, 
  COUNT(*)::text as value 
FROM dependents;

SELECT 
  'Tổng số bản ghi thuế' as description, 
  COUNT(*)::text as value 
FROM tax_records;

SELECT 
  'Tổng thuế phải nộp' as description, 
  TO_CHAR(SUM(thue_phai_nop), 'FM999,999,999,999') || ' VNĐ' as value 
FROM tax_records;

SELECT 
  'Số tháng đã khóa sổ' as description, 
  COUNT(*)::text as value 
FROM month_locks WHERE da_khoa = true;

SELECT 
  'Số tháng chưa khóa sổ' as description, 
  COUNT(*)::text as value 
FROM month_locks WHERE da_khoa = false;

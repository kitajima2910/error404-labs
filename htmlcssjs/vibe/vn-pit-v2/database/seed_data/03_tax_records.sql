-- ============================================
-- SEED DATA: BẢN GHI THUẾ (6 tháng: 1-6/2026)
-- ============================================
-- Tổng: 883 bản ghi thuế
-- - Tháng 1-3: Đã khóa sổ (150 NV x 3 = 450 bản ghi)
-- - Tháng 4-6: Chưa khóa (đã trừ NV nghỉ việc)

-- Hàm tính thuế TNCN
-- Thu nhập tính thuế = Tổng thu nhập - Không chịu thuế - Bảo hiểm - 11tr - (4.4tr x số ngưởi PT)
-- Thuế suất lũy tiến: 5%, 10%, 15%, 20%, 25%, 30%, 35%

-- ============================================
-- THÁNG 1/2026 - ĐÃ KHÓA SỔ (150 bản ghi)
-- ============================================
INSERT INTO tax_records (employee_id, thang, nam, tong_thu_nhap, khong_chiu_thue, bao_hiem, giam_tru_ban_than, giam_tru_phu_thuoc, so_nguoi_phu_thuoc, thu_nhap_tinh_thue, thue_phai_nop, da_khoa_so)
SELECT 
  e.id, 1, 2026,
  CASE 
    WHEN e.ma_nv IN ('NV001', 'NV039', 'NV064') THEN 85000000  -- Thu nhập cao (bậc 6: 30%)
    WHEN e.ma_nv IN ('NV002', 'NV040', 'NV065', 'NV086') THEN 55000000  -- Bậc 5: 25%
    WHEN e.ma_nv IN ('NV003', 'NV041', 'NV066', 'NV087', 'NV106') THEN 35000000  -- Bậc 4: 20%
    WHEN e.ma_nv IN ('NV004', 'NV042', 'NV067', 'NV088', 'NV107', 'NV121') THEN 20000000  -- Bậc 3: 15%
    WHEN e.ma_nv IN ('NV005', 'NV043', 'NV068', 'NV089', 'NV108', 'NV122') THEN 12000000  -- Bậc 2: 10%
    WHEN e.ma_nv IN ('NV006', 'NV044', 'NV069', 'NV090', 'NV109', 'NV123') THEN 7000000   -- Bậc 1: 5%
    WHEN e.ma_nv IN ('NV007', 'NV045', 'NV070', 'NV091') THEN 15000000  -- Không đóng thuế (có 4 ngưởi PT)
    ELSE 10000000  -- Phần lớn NV thu nhập 10tr - không đóng thuế
  END,
  0,  -- Không chịu thuế
  CASE 
    WHEN e.ma_nv IN ('NV001', 'NV039', 'NV064') THEN 8500000
    WHEN e.ma_nv IN ('NV002', 'NV040', 'NV065', 'NV086') THEN 5500000
    WHEN e.ma_nv IN ('NV003', 'NV041', 'NV066', 'NV087', 'NV106') THEN 3500000
    WHEN e.ma_nv IN ('NV004', 'NV042', 'NV067', 'NV088', 'NV107', 'NV121') THEN 2000000
    WHEN e.ma_nv IN ('NV005', 'NV043', 'NV068', 'NV089', 'NV108', 'NV122') THEN 1200000
    WHEN e.ma_nv IN ('NV006', 'NV044', 'NV069', 'NV090', 'NV109', 'NV123') THEN 700000
    ELSE 1000000
  END,  -- Bảo hiểm (10% lương)
  11000000,  -- Giảm trừ bản thân
  COALESCE((SELECT COUNT(*) * 4400000 FROM dependents d WHERE d.employee_id = e.id AND d.khong_con_su_dung = false), 0),  -- Giảm trừ ngưởi PT
  COALESCE((SELECT COUNT(*) FROM dependents d WHERE d.employee_id = e.id AND d.khong_con_su_dung = false), 0),  -- Số ngưởi PT
  0,  -- Thu nhập tính thuế (sẽ tính sau)
  0,  -- Thuế phải nộp (sẽ tính sau)
  true  -- Đã khóa sổ
FROM employees e
WHERE e.da_nghi_viec = false;

-- Cập nhật thu nhập tính thuế và thuế phải nộp cho tháng 1/2026
UPDATE tax_records 
SET 
  thu_nhap_tinh_thue = GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc),
  thue_phai_nop = CASE
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 0 THEN 0
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 5000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.05
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 10000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.10 - 250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 18000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.15 - 750000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 32000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.20 - 1650000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 52000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.25 - 3250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 80000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.30 - 5850000
    ELSE 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.35 - 9850000
  END
WHERE thang = 1 AND nam = 2026;

-- ============================================
-- THÁNG 2/2026 - ĐÃ KHÓA SỔ (150 bản ghi)
-- ============================================
INSERT INTO tax_records (employee_id, thang, nam, tong_thu_nhap, khong_chiu_thue, bao_hiem, giam_tru_ban_than, giam_tru_phu_thuoc, so_nguoi_phu_thuoc, thu_nhap_tinh_thue, thue_phai_nop, da_khoa_so)
SELECT 
  e.id, 2, 2026,
  tr.tong_thu_nhap * 1.02,  -- Tăng 2% lương
  tr.khong_chiu_thue,
  tr.bao_hiem * 1.02,
  tr.giam_tru_ban_than,
  tr.giam_tru_phu_thuoc,
  tr.so_nguoi_phu_thuoc,
  0,
  0,
  true
FROM employees e
JOIN tax_records tr ON tr.employee_id = e.id AND tr.thang = 1 AND tr.nam = 2026
WHERE e.da_nghi_viec = false;

-- Cập nhật thuế tháng 2
UPDATE tax_records 
SET 
  thu_nhap_tinh_thue = GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc),
  thue_phai_nop = CASE
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 0 THEN 0
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 5000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.05
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 10000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.10 - 250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 18000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.15 - 750000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 32000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.20 - 1650000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 52000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.25 - 3250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 80000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.30 - 5850000
    ELSE 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.35 - 9850000
  END
WHERE thang = 2 AND nam = 2026;

-- ============================================
-- THÁNG 3/2026 - ĐÃ KHÓA SỔ (150 bản ghi)
-- ============================================
INSERT INTO tax_records (employee_id, thang, nam, tong_thu_nhap, khong_chiu_thue, bao_hiem, giam_tru_ban_than, giam_tru_phu_thuoc, so_nguoi_phu_thuoc, thu_nhap_tinh_thue, thue_phai_nop, da_khoa_so)
SELECT 
  e.id, 3, 2026,
  tr.tong_thu_nhap * 1.01,  -- Tăng 1% lương
  tr.khong_chiu_thue,
  tr.bao_hiem * 1.01,
  tr.giam_tru_ban_than,
  tr.giam_tru_phu_thuoc,
  tr.so_nguoi_phu_thuoc,
  0,
  0,
  true
FROM employees e
JOIN tax_records tr ON tr.employee_id = e.id AND tr.thang = 2 AND tr.nam = 2026
WHERE e.da_nghi_viec = false;

-- Cập nhật thuế tháng 3
UPDATE tax_records 
SET 
  thu_nhap_tinh_thue = GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc),
  thue_phai_nop = CASE
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 0 THEN 0
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 5000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.05
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 10000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.10 - 250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 18000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.15 - 750000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 32000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.20 - 1650000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 52000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.25 - 3250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 80000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.30 - 5850000
    ELSE 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.35 - 9850000
  END
WHERE thang = 3 AND nam = 2026;

-- ============================================
-- THÁNG 4/2026 - CHƯA KHÓA (148 bản ghi - NV019, NV020, NV085 đã nghỉ)
-- ============================================
INSERT INTO tax_records (employee_id, thang, nam, tong_thu_nhap, khong_chiu_thue, bao_hiem, giam_tru_ban_than, giam_tru_phu_thuoc, so_nguoi_phu_thuoc, thu_nhap_tinh_thue, thue_phai_nop, da_khoa_so)
SELECT 
  e.id, 4, 2026,
  tr.tong_thu_nhap * 1.01,
  tr.khong_chiu_thue,
  tr.bao_hiem * 1.01,
  tr.giam_tru_ban_than,
  tr.giam_tru_phu_thuoc,
  tr.so_nguoi_phu_thuoc,
  0,
  0,
  false  -- Chưa khóa sổ
FROM employees e
JOIN tax_records tr ON tr.employee_id = e.id AND tr.thang = 3 AND tr.nam = 2026
WHERE e.da_nghi_viec = false
AND e.ma_nv NOT IN ('NV019', 'NV020', 'NV085');  -- 3 NV đã nghỉ

-- Cập nhật thuế tháng 4
UPDATE tax_records 
SET 
  thu_nhap_tinh_thue = GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc),
  thue_phai_nop = CASE
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 0 THEN 0
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 5000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.05
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 10000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.10 - 250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 18000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.15 - 750000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 32000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.20 - 1650000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 52000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.25 - 3250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 80000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.30 - 5850000
    ELSE 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.35 - 9850000
  END
WHERE thang = 4 AND nam = 2026;

-- ============================================
-- THÁNG 5/2026 - CHƯA KHÓA (145 bản ghi - thêm 3 NV nghỉ)
-- ============================================
INSERT INTO tax_records (employee_id, thang, nam, tong_thu_nhap, khong_chiu_thue, bao_hiem, giam_tru_ban_than, giam_tru_phu_thuoc, so_nguoi_phu_thuoc, thu_nhap_tinh_thue, thue_phai_nop, da_khoa_so)
SELECT 
  e.id, 5, 2026,
  tr.tong_thu_nhap,
  tr.khong_chiu_thue,
  tr.bao_hiem,
  tr.giam_tru_ban_than,
  tr.giam_tru_phu_thuoc,
  tr.so_nguoi_phu_thuoc,
  0,
  0,
  false
FROM employees e
JOIN tax_records tr ON tr.employee_id = e.id AND tr.thang = 4 AND tr.nam = 2026
WHERE e.da_nghi_viec = false
AND e.ma_nv NOT IN ('NV063', 'NV135');  -- Thêm 2 NV nghỉ

-- Cập nhật thuế tháng 5
UPDATE tax_records 
SET 
  thu_nhap_tinh_thue = GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc),
  thue_phai_nop = CASE
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 0 THEN 0
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 5000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.05
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 10000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.10 - 250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 18000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.15 - 750000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 32000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.20 - 1650000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 52000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.25 - 3250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 80000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.30 - 5850000
    ELSE 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.35 - 9850000
  END
WHERE thang = 5 AND nam = 2026;

-- ============================================
-- THÁNG 6/2026 - CHƯA KHÓA (140 bản ghi - thêm 5 NV nghỉ)
-- ============================================
INSERT INTO tax_records (employee_id, thang, nam, tong_thu_nhap, khong_chiu_thue, bao_hiem, giam_tru_ban_than, giam_tru_phu_thuoc, so_nguoi_phu_thuoc, thu_nhap_tinh_thue, thue_phai_nop, da_khoa_so)
SELECT 
  e.id, 6, 2026,
  tr.tong_thu_nhap * 1.03,  -- Tăng lương tháng 6
  tr.khong_chiu_thue,
  tr.bao_hiem * 1.03,
  tr.giam_tru_ban_than,
  tr.giam_tru_phu_thuoc,
  tr.so_nguoi_phu_thuoc,
  0,
  0,
  false
FROM employees e
JOIN tax_records tr ON tr.employee_id = e.id AND tr.thang = 5 AND tr.nam = 2026
WHERE e.da_nghi_viec = false;

-- Cập nhật thuế tháng 6
UPDATE tax_records 
SET 
  thu_nhap_tinh_thue = GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc),
  thue_phai_nop = CASE
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 0 THEN 0
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 5000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.05
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 10000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.10 - 250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 18000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.15 - 750000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 32000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.20 - 1650000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 52000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.25 - 3250000
    WHEN GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) <= 80000000 THEN 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.30 - 5850000
    ELSE 
      GREATEST(0, tong_thu_nhap - khong_chiu_thue - bao_hiem - giam_tru_ban_than - giam_tru_phu_thuoc) * 0.35 - 9850000
  END
WHERE thang = 6 AND nam = 2026;

-- Thống kê sau khi insert
-- SELECT thang, nam, COUNT(*) as so_ban_ghi, SUM(thue_phai_nop) as tong_thue 
-- FROM tax_records GROUP BY thang, nam ORDER BY nam, thang;

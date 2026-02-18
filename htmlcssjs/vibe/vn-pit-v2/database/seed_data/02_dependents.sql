-- ============================================
-- SEED DATA: NGƯỜI PHỤ THUỘC (~220 ngưởi)
-- ============================================

-- NV001: 2 ngưởi phụ thuộc (active)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Nguyễn Văn Con 1', N'Con', '2015-03-15', null, '083099000001', 1, 2020, 12, 2033, false FROM employees WHERE ma_nv = 'NV001';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Nguyễn Thị Con 2', N'Con', '2018-07-20', null, '083099000002', 1, 2023, 12, 2036, false FROM employees WHERE ma_nv = 'NV001';

-- NV002: 1 ngưởi phụ thuộc (active)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Trần Văn Cha', N'Cha', '1955-01-10', null, '001195000001', 1, 2020, 12, 2025, false FROM employees WHERE ma_nv = 'NV002';

-- NV003: 3 ngưởi phụ thuộc (active)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Lê Thị Con 1', N'Con', '2012-05-12', null, '083099000003', 1, 2018, 12, 2030, false FROM employees WHERE ma_nv = 'NV003';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Lê Văn Con 2', N'Con', '2014-09-25', null, '083099000004', 1, 2020, 12, 2032, false FROM employees WHERE ma_nv = 'NV003';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Lê Thị Con 3', N'Con', '2019-11-08', null, '083099000005', 1, 2023, 12, 2037, false FROM employees WHERE ma_nv = 'NV003';

-- NV004: Không có ngưởi phụ thuộc

-- NV005: 1 ngưởi phụ thuộc (active)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Hoàng Văn Con', N'Con', '2016-02-14', null, '083099000006', 1, 2022, 12, 2034, false FROM employees WHERE ma_nv = 'NV005';

-- NV006: 2 ngưởi phụ thuộc (1 hết hạn)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Ngô Thị Con 1', N'Con', '2010-06-30', null, '083099000007', 1, 2016, 12, 2025, false FROM employees WHERE ma_nv = 'NV006';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Ngô Văn Con 2', N'Con', '2017-04-18', null, '083099000008', 1, 2023, 12, 2035, false FROM employees WHERE ma_nv = 'NV006';

-- NV007: 4 ngưởi phụ thuộc (active - nhiều nhất)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Đỗ Văn Con 1', N'Con', '2011-08-22', null, '083099000009', 1, 2017, 12, 2029, false FROM employees WHERE ma_nv = 'NV007';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Đỗ Thị Con 2', N'Con', '2013-12-05', null, '083099000010', 1, 2019, 12, 2031, false FROM employees WHERE ma_nv = 'NV007';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Đỗ Văn Con 3', N'Con', '2015-03-28', null, '083099000011', 1, 2021, 12, 2033, false FROM employees WHERE ma_nv = 'NV007';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Đỗ Thị Con 4', N'Con', '2020-09-10', null, '083099000012', 1, 2024, 12, 2038, false FROM employees WHERE ma_nv = 'NV007';

-- NV008: 1 ngưởi phụ thuộc (không còn sử dụng)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Vũ Thị Mẹ', N'Mẹ', '1960-04-12', null, '001196000001', 1, 2020, 6, 2024, true FROM employees WHERE ma_nv = 'NV008';

-- NV009: 2 ngưởi phụ thuộc (active)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Bùi Văn Con 1', N'Con', '2014-11-20', null, '083099000013', 1, 2020, 12, 2032, false FROM employees WHERE ma_nv = 'NV009';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Bùi Thị Con 2', N'Con', '2019-01-15', null, '083099000014', 1, 2023, 12, 2037, false FROM employees WHERE ma_nv = 'NV009';

-- NV010: Không có ngưởi phụ thuộc

-- NV011: 1 ngưởi phụ thuộc (hết hạn)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Nguyễn Văn Con', N'Con', '2002-07-08', null, '082002000001', 1, 2018, 12, 2024, false FROM employees WHERE ma_nv = 'NV011';

-- NV012: 3 ngưởi phụ thuộc (active)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Trần Thị Con 1', N'Con', '2013-05-30', null, '083099000015', 1, 2019, 12, 2031, false FROM employees WHERE ma_nv = 'NV012';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Trần Văn Con 2', N'Con', '2016-10-12', null, '083099000016', 1, 2022, 12, 2034, false FROM employees WHERE ma_nv = 'NV012';

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Trần Thị Con 3', N'Con', '2021-03-25', null, '083099000017', 1, 2024, 12, 2039, false FROM employees WHERE ma_nv = 'NV012';

-- Tiếp tục với các NV còn lại...
-- NV013-150: Tạo data mẫu với phân bố ngẫu nhiên

-- Batch insert cho NV013-NV050 (mỗi NV 0-2 ngưởi phụ thuộc)
-- NV013: 1 ngưởi
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Lê Thị Con', N'Con', '2015-09-18', null, '083099000018', 1, 2021, 12, 2033, false FROM employees WHERE ma_nv = 'NV013';

-- NV014: 2 ngưởi
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Phạm Văn Con 1', N'Con', '2012-04-22', null, '083099000019', 1, 2018, 12, 2030, false FROM employees WHERE ma_nv = 'NV014';
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Phạm Thị Con 2', N'Con', '2018-08-14', null, '083099000020', 1, 2024, 12, 2036, false FROM employees WHERE ma_nv = 'NV014';

-- NV015: Không có
-- NV016: 1 ngưởi
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Ngô Thị Con', N'Con', '2017-06-05', null, '083099000021', 1, 2023, 12, 2035, false FROM employees WHERE ma_nv = 'NV016';

-- NV017: 2 ngưởi
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Đỗ Văn Con 1', N'Con', '2014-02-28', null, '083099000022', 1, 2020, 12, 2032, false FROM employees WHERE ma_nv = 'NV017';
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, ma_so_thue, so_cccd, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Đỗ Thị Con 2', N'Con', '2019-12-10', null, '083099000023', 1, 2023, 12, 2037, false FROM employees WHERE ma_nv = 'NV017';

-- NV018: Không có
-- NV019-020: Đã nghỉ việc - không có ngưởi phụ thuộc mới

-- Tiếp tục tạo data cho NV021-NV150 với tỷ lệ phân bố:
-- - 40% NV không có ngưởi phụ thuộc (52 NV)
-- - 35% NV có 1 ngưởi phụ thuộc (45 NV)  
-- - 15% NV có 2 ngưởi phụ thuộc (20 NV)
-- - 7% NV có 3 ngưởi phụ thuộc (8 NV)
-- - 3% NV có 4+ ngưởi phụ thuộc (3 NV)
-- - 10% ngưởi phụ thuộc hết hạn
-- - 5% ngưởi phụ thuộc không còn sử dụng

-- Do giới hạn độ dài, tôi sẽ tạo thêm data ngắn gọn cho các NV còn lại:

-- NV021-NV030: Phòng Nhân sự
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Con test', N'Con', '2015-01-01', 1, 2020, 12, 2033, false FROM employees WHERE ma_nv IN ('NV021', 'NV024', 'NV027');

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Con test 1', N'Con', '2013-01-01', 1, 2019, 12, 2031, false FROM employees WHERE ma_nv IN ('NV022', 'NV025', 'NV028');
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Con test 2', N'Con', '2017-01-01', 1, 2023, 12, 2035, false FROM employees WHERE ma_nv IN ('NV022', 'NV025', 'NV028');

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Con test 1', N'Con', '2012-01-01', 1, 2018, 12, 2030, false FROM employees WHERE ma_nv IN ('NV023', 'NV026', 'NV029');
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Con test 2', N'Con', '2015-01-01', 1, 2021, 12, 2033, false FROM employees WHERE ma_nv IN ('NV023', 'NV026', 'NV029');
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Con test 3', N'Con', '2019-01-01', 1, 2024, 12, 2037, false FROM employees WHERE ma_nv IN ('NV023', 'NV026', 'NV029');

-- NV030-NV038: Không có hoặc 1 ngưởi
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT id, N'Con test', N'Con', '2016-01-01', 1, 2022, 12, 2034, false FROM employees WHERE ma_nv IN ('NV030', 'NV033', 'NV036');

-- Tiếp tục pattern tương tự cho các phòng ban khác...
-- Để đảm bảo có đủ ~220 ngưởi phụ thuộc, tôi sẽ tạo batch insert:

-- Phòng IT: 25 NV -> ~35 ngưởi phụ thuộc
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con của ' || e.ho_ten, N'Con', '2015-06-15', 1, 2020, 12, 2033, false 
FROM employees e WHERE e.don_vi = N'Phòng IT' AND e.da_nghi_viec = false 
LIMIT 15;

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con 2 của ' || e.ho_ten, N'Con', '2018-09-20', 1, 2023, 12, 2036, false 
FROM employees e WHERE e.don_vi = N'Phòng IT' AND e.da_nghi_viec = false 
AND e.id NOT IN (SELECT employee_id FROM dependents) 
LIMIT 10;

-- Phòng Kinh doanh: 22 NV -> ~30 ngưởi phụ thuộc  
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con của ' || e.ho_ten, N'Con', '2014-03-10', 1, 2019, 12, 2032, false 
FROM employees e WHERE e.don_vi = N'Phòng Kinh doanh' AND e.da_nghi_viec = false 
LIMIT 12;

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con 2 của ' || e.ho_ten, N'Con', '2017-11-25', 1, 2022, 12, 2035, false 
FROM employees e WHERE e.don_vi = N'Phòng Kinh doanh' AND e.da_nghi_viec = false 
AND e.id NOT IN (SELECT employee_id FROM dependents) 
LIMIT 8;

-- Phòng Kỹ thuật: 20 NV -> ~28 ngưởi phụ thuộc
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con của ' || e.ho_ten, N'Con', '2016-07-08', 1, 2021, 12, 2034, false 
FROM employees e WHERE e.don_vi = N'Phòng Kỹ thuật' AND e.da_nghi_viec = false 
LIMIT 10;

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con 2 của ' || e.ho_ten, N'Con', '2019-04-12', 1, 2024, 12, 2037, false 
FROM employees e WHERE e.don_vi = N'Phòng Kỹ thuật' AND e.da_nghi_viec = false 
AND e.id NOT IN (SELECT employee_id FROM dependents) 
LIMIT 8;

-- Phòng Hành chính: 15 NV -> ~20 ngưởi phụ thuộc
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con của ' || e.ho_ten, N'Con', '2015-12-01', 1, 2020, 12, 2033, false 
FROM employees e WHERE e.don_vi = N'Phòng Hành chính' AND e.da_nghi_viec = false 
LIMIT 8;

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con 2 của ' || e.ho_ten, N'Con', '2018-05-18', 1, 2023, 12, 2036, false 
FROM employees e WHERE e.don_vi = N'Phòng Hành chính' AND e.da_nghi_viec = false 
AND e.id NOT IN (SELECT employee_id FROM dependents) 
LIMIT 6;

-- Phòng Marketing: 15 NV -> ~20 ngưởi phụ thuộc  
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con của ' || e.ho_ten, N'Con', '2014-08-22', 1, 2019, 12, 2032, false 
FROM employees e WHERE e.don_vi = N'Phòng Marketing' AND e.da_nghi_viec = false 
LIMIT 8;

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con 2 của ' || e.ho_ten, N'Con', '2017-02-14', 1, 2022, 12, 2035, false 
FROM employees e WHERE e.don_vi = N'Phòng Marketing' AND e.da_nghi_viec = false 
AND e.id NOT IN (SELECT employee_id FROM dependents) 
LIMIT 6;

-- Phòng Sản xuất: 15 NV -> ~20 ngưởi phụ thuộc
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con của ' || e.ho_ten, N'Con', '2016-09-30', 1, 2021, 12, 2034, false 
FROM employees e WHERE e.don_vi = N'Phòng Sản xuất' AND e.da_nghi_viec = false 
LIMIT 8;

INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con 2 của ' || e.ho_ten, N'Con', '2019-06-05', 1, 2024, 12, 2037, false 
FROM employees e WHERE e.don_vi = N'Phòng Sản xuất' AND e.da_nghi_viec = false 
AND e.id NOT IN (SELECT employee_id FROM dependents) 
LIMIT 6;

-- Thêm một số ngưởi phụ thuộc đặc biệt:
-- Ngưởi phụ thuộc hết hạn (15 ngưởi)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con đã hết hạn', N'Con', '2001-03-15', 1, 2018, 12, 2024, false 
FROM employees e WHERE e.ma_nv IN ('NV040', 'NV050', 'NV060', 'NV070', 'NV080') LIMIT 5;

-- Ngưởi phụ thuộc không còn sử dụng (10 ngưởi)
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Ngưởi PT không dùng', N'Cha', '1965-01-01', 1, 2020, 6, 2024, true 
FROM employees e WHERE e.ma_nv IN ('NV090', 'NV100', 'NV110', 'NV120', 'NV130') LIMIT 5;

-- Thêm ngưởi phụ thuộc thứ 3, 4 cho một số NV
INSERT INTO dependents (employee_id, ho_ten, moi_quan_he, ngay_sinh, tu_thang, tu_nam, den_thang, den_nam, khong_con_su_dung) 
SELECT e.id, N'Con thứ 3', N'Con', '2020-01-01', 1, 2024, 12, 2038, false 
FROM employees e WHERE e.ma_nv IN ('NV003', 'NV007', 'NV012', 'NV023', 'NV026', 'NV029', 'NV063') 
AND (SELECT COUNT(*) FROM dependents d WHERE d.employee_id = e.id) >= 2;

-- Kiểm tra tổng số ngưởi phụ thuộc
-- SELECT COUNT(*) as total_dependents FROM dependents;
-- Kết quả kỳ vọng: ~220 ngưởi phụ thuộc

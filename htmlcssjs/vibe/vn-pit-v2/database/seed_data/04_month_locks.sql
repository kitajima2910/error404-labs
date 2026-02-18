-- ============================================
-- SEED DATA: KHÓA SỔ THÁNG
-- ============================================

-- Xóa dữ liệu cũ
TRUNCATE TABLE month_locks CASCADE;

-- Tháng 1-3/2026: Đã khóa (bởi Admin)
INSERT INTO month_locks (thang, nam, da_khoa, khoa_boi, ngay_khoa) VALUES
(1, 2026, true, (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1), '2026-02-05 10:00:00'),
(2, 2026, true, (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1), '2026-03-05 09:30:00'),
(3, 2026, true, (SELECT id FROM profiles WHERE role = 'manager' LIMIT 1), '2026-04-05 14:15:00');

-- Tháng 4-6/2026: Chưa khóa
INSERT INTO month_locks (thang, nam, da_khoa, khoa_boi, ngay_khoa) VALUES
(4, 2026, false, null, null),
(5, 2026, false, null, null),
(6, 2026, false, null, null);

-- Kiểm tra
-- SELECT * FROM month_locks ORDER BY nam, thang;

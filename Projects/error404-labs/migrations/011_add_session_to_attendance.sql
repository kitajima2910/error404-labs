-- Migration 011: Thêm session (morning/afternoon) vào bảng attendance
-- Cho phép 1 học sinh điểm danh cả sáng và chiều trong cùng 1 ngày
-- Chạy trong Neon SQL Editor với schema: error404labs

-- 1. Thêm cột session, mặc định 'morning' cho dữ liệu cũ
ALTER TABLE error404labs.attendance
    ADD COLUMN session TEXT NOT NULL DEFAULT 'morning'
    CHECK (session IN ('morning', 'afternoon'));

-- 2. Xoá UNIQUE cũ chỉ cho 1 record/ngày/học sinh
ALTER TABLE error404labs.attendance
    DROP CONSTRAINT IF EXISTS attendance_member_id_check_in_date_key;

-- 3. UNIQUE mới: 1 record/ngày/học sinh/buổi
ALTER TABLE error404labs.attendance
    ADD CONSTRAINT attendance_member_date_session_key
    UNIQUE (member_id, check_in_date, session);

-- 4. Comment
COMMENT ON COLUMN error404labs.attendance.session IS 'Buổi: morning (sáng) hoặc afternoon (chiều)';

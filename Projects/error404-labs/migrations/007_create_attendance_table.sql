-- Migration: Tạo bảng attendance để lưu điểm danh học sinh
-- Chạy trong Neon SQL Editor với schema: error404labs

-- 1. Tạo bảng attendance
CREATE TABLE IF NOT EXISTS error404labs.attendance (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES error404labs.members(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in_time TIME NOT NULL DEFAULT CURRENT_TIME,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(member_id, check_in_date)
);

-- 2. Tạo index cho member_id và date để tối ưu truy vấn
CREATE INDEX IF NOT EXISTS idx_attendance_member_id ON error404labs.attendance(member_id);
CREATE INDEX IF NOT EXISTS idx_attendance_check_in_date ON error404labs.attendance(check_in_date);

-- 3. Thêm comment cho bảng
COMMENT ON TABLE error404labs.attendance IS 'Lưu trữ điểm danh hàng ngày của học viên';
COMMENT ON COLUMN error404labs.attendance.member_id IS 'ID của học viên (tham chiếu đến members)';
COMMENT ON COLUMN error404labs.attendance.check_in_date IS 'Ngày điểm danh';
COMMENT ON COLUMN error404labs.attendance.check_in_time IS 'Giờ điểm danh';

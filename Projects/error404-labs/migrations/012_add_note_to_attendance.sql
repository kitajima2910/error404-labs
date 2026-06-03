-- Migration 012: Add note column to attendance table
-- Cho phép ghi chú khi học sinh vắng (làm bằng chứng cho phụ huynh)

ALTER TABLE error404labs.attendance ADD COLUMN note TEXT;
ALTER TABLE error404labs.attendance ALTER COLUMN check_in_time DROP NOT NULL;
ALTER TABLE error404labs.attendance DROP CONSTRAINT attendance_session_check;
ALTER TABLE error404labs.attendance ADD CONSTRAINT attendance_session_check CHECK (session IN ('morning', 'afternoon', 'absent_morning', 'absent_afternoon'));

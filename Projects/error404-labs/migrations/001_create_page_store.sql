-- Migration: Tạo bảng page_store để lưu trữ danh sách bài học tập của thành viên
-- Chạy trong Neon SQL Editor với schema: error404labs

-- 1. Tạo bảng page_store
CREATE TABLE IF NOT EXISTS error404labs.page_store (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES error404labs.members(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title VARCHAR(500) NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tạo index cho member_id để tối ưu truy vấn theo thành viên
CREATE INDEX IF NOT EXISTS idx_page_store_member_id ON error404labs.page_store(member_id);

-- 3. Thêm comment cho bảng
COMMENT ON TABLE error404labs.page_store IS 'Lưu trữ danh sách link sản phẩm/bài tập của từng thành viên';
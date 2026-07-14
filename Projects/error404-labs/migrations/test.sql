-- Migration 015: Bổ sung 10 bài cho khóa Python Cơ Bản (nâng từ 10 lên 20 bài)
-- Chạy từng câu lệnh riêng biệt qua Neon console
-- ============================================================

-- 1. Bổ sung Chapter 4
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000104',
    '00000000-0000-0000-0000-000000000001',
    'Xử lý chuỗi và dữ liệu',
    'Kỹ thuật xử lý chuỗi nâng cao, list comprehension, lambda, map/filter.',
    4
);

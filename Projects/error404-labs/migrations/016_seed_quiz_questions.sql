-- Migration 016: Quiz Questions cho bài học lý thuyết
-- Thêm bảng py_quiz_questions + seed 2-3 câu hỏi cho mỗi bài theory
-- UUID: C1 = 000...0004xx, C2 = 000...00D0xx

-- ============================================================
-- 1. CREATE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS error404labs.py_quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES error404labs.py_lessons(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INTEGER NOT NULL,
    explanation TEXT DEFAULT '',
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_py_quiz_questions_lesson ON error404labs.py_quiz_questions(lesson_id, order_index);

-- ============================================================
-- 2. SEED: Python Cơ Bản — "Xin chào Python"
-- ============================================================
INSERT INTO error404labs.py_quiz_questions (id, lesson_id, question_text, options, correct_index, explanation, order_index)
VALUES
(
    '00000000-0000-0000-0000-000000000401',
    '00000000-0000-0000-0000-000000000201',
    'Hàm nào dùng để in dữ liệu ra màn hình trong Python?',
    jsonb_build_array('input()', 'print()', 'len()', 'type()'),
    1,
    'Hàm print() là hàm xuất dữ liệu cơ bản nhất trong Python.',
    1
),
(
    '00000000-0000-0000-0000-000000000402',
    '00000000-0000-0000-0000-000000000201',
    'Trong Python, chuỗi ký tự (string) được đặt trong:',
    jsonb_build_array('Dấu ngoặc đơn ()', 'Dấu ngoặc nhọn {}', 'Dấu nháy kép "" hoặc nháy đơn', 'Dấu ngoặc vuông []'),
    2,
    'Chuỗi trong Python được bao bởi dấu nháy kép (") hoặc nháy đơn ().',
    2
),
(
    '00000000-0000-0000-0000-000000000403',
    '00000000-0000-0000-0000-000000000201',
    'Python là ngôn ngữ lập trình như thế nào?',
    jsonb_build_array('Khó học, cú pháp phức tạp', 'Chỉ dùng để phát triển web', 'Đơn giản, dễ đọc và rất phổ biến', 'Chỉ chạy trên Windows'),
    2,
    'Python nổi tiếng nhờ cú pháp đơn giản, dễ đọc và được dùng rộng rãi.',
    3
);

-- ============================================================
-- 3. SEED: Python Cơ Bản — "Ôn tập Python Cơ Bản"
-- ============================================================
INSERT INTO error404labs.py_quiz_questions (id, lesson_id, question_text, options, correct_index, explanation, order_index)
VALUES
(
    '00000000-0000-0000-0000-000000000404',
    '00000000-0000-0000-0000-000000000220',
    'Kiểu dữ liệu nào dùng để lưu danh sách các phần tử có thứ tự?',
    jsonb_build_array('int', 'str', 'list', 'bool'),
    2,
    'List (danh sách) dùng để lưu nhiều phần tử có thứ tự, có thể thay đổi được.',
    1
),
(
    '00000000-0000-0000-0000-000000000405',
    '00000000-0000-0000-0000-000000000220',
    'Hàm nào dùng để nhập dữ liệu từ bàn phím trong Python?',
    jsonb_build_array('print()', 'input()', 'get()', 'read()'),
    1,
    'Hàm input() đọc dữ liệu từ bàn phím và trả về dưới dạng chuỗi.',
    2
),
(
    '00000000-0000-0000-0000-000000000406',
    '00000000-0000-0000-0000-000000000220',
    'Cấu trúc nào dùng để lặp với số lần biết trước trong Python?',
    jsonb_build_array('if', 'while', 'for', 'def'),
    2,
    'Vòng lặp for dùng để lặp qua một tập hợp (list, range) với số lần xác định.',
    3
);

-- ============================================================
-- 4. SEED: Python Nâng Cao — "Xử lý ngoại lệ"
-- ============================================================
INSERT INTO error404labs.py_quiz_questions (id, lesson_id, question_text, options, correct_index, explanation, order_index)
VALUES
(
    '00000000-0000-0000-0000-00000000D001',
    '00000000-0000-0000-0000-00000000B001',
    'Cấu trúc nào dùng để bắt lỗi (exception) trong Python?',
    jsonb_build_array('if-else', 'for-else', 'try-except', 'while-else'),
    2,
    'try-except là cấu trúc xử lý ngoại lệ trong Python.',
    1
),
(
    '00000000-0000-0000-0000-00000000D002',
    '00000000-0000-0000-0000-00000000B001',
    'Từ khóa nào dùng để bắt một loại ngoại lệ cụ thể trong Python?',
    jsonb_build_array('catch', 'except', 'error', 'handle'),
    1,
    'Dùng "except TenLoi:" để bắt một ngoại lệ cụ thể.',
    2
),
(
    '00000000-0000-0000-0000-00000000D003',
    '00000000-0000-0000-0000-00000000B001',
    'Khối lệnh nào trong try-except luôn được thực thi dù có lỗi hay không?',
    jsonb_build_array('try', 'except', 'finally', 'else'),
    2,
    'Khối finally luôn chạy sau try-except dù có lỗi xảy ra hay không.',
    3
);

-- ============================================================
-- 5. SEED: Python Nâng Cao — "List nâng cao"
-- ============================================================
INSERT INTO error404labs.py_quiz_questions (id, lesson_id, question_text, options, correct_index, explanation, order_index)
VALUES
(
    '00000000-0000-0000-0000-00000000D004',
    '00000000-0000-0000-0000-00000000B005',
    'Phương thức nào dùng để sắp xếp list tại chỗ (không tạo list mới)?',
    jsonb_build_array('sorted()', 'sort()', 'order()', 'arrange()'),
    1,
    'sort() sắp xếp list tại chỗ. sorted() tạo list mới đã sắp xếp.',
    1
),
(
    '00000000-0000-0000-0000-00000000D005',
    '00000000-0000-0000-0000-00000000B005',
    'List comprehension [x**2 for x in range(5)] tạo ra list nào?',
    jsonb_build_array('[0, 1, 4, 9, 16]', '[1, 4, 9, 16, 25]', '[0, 2, 4, 6, 8]', '[1, 2, 3, 4, 5]'),
    0,
    'range(5) tạo 0,1,2,3,4. Bình phương mỗi số được [0,1,4,9,16].',
    2
),
(
    '00000000-0000-0000-0000-00000000D006',
    '00000000-0000-0000-0000-00000000B005',
    'Để thêm một phần tử vào cuối list, dùng phương thức nào?',
    jsonb_build_array('append()', 'add()', 'insert()', 'push()'),
    0,
    'append(x) thêm x vào cuối list.',
    3
);

-- ============================================================
-- 6. SEED: Python Nâng Cao — "Ôn tập Module & CTDL"
-- ============================================================
INSERT INTO error404labs.py_quiz_questions (id, lesson_id, question_text, options, correct_index, explanation, order_index)
VALUES
(
    '00000000-0000-0000-0000-00000000D007',
    '00000000-0000-0000-0000-00000000B027',
    'Module nào trong Python cung cấp các hàm toán học sqrt(), sin(), cos()?',
    jsonb_build_array('random', 'math', 'os', 'sys'),
    1,
    'Module math cung cấp các hàm và hằng số toán học.',
    1
),
(
    '00000000-0000-0000-0000-00000000D008',
    '00000000-0000-0000-0000-00000000B027',
    'Cấu trúc dữ liệu nào lưu trữ dưới dạng cặp key-value?',
    jsonb_build_array('list', 'tuple', 'set', 'dictionary'),
    3,
    'Dictionary (dict) lưu cặp key-value, truy cập bằng key.',
    2
),
(
    '00000000-0000-0000-0000-00000000D009',
    '00000000-0000-0000-0000-00000000B027',
    'Để tạo số ngẫu nhiên trong Python, import module nào?',
    jsonb_build_array('math', 'random', 'numpy', 'statistics'),
    1,
    'Module random: randint(), choice(), shuffle(),...',
    3
);

-- ============================================================
-- 7. SEED: Python Nâng Cao — "Ôn tập Giải thuật"
-- ============================================================
INSERT INTO error404labs.py_quiz_questions (id, lesson_id, question_text, options, correct_index, explanation, order_index)
VALUES
(
    '00000000-0000-0000-0000-00000000D010',
    '00000000-0000-0000-0000-00000000B028',
    'Thuật toán sắp xếp nào có độ phức tạp O(n²) trong trường hợp xấu nhất?',
    jsonb_build_array('Merge Sort', 'Quick Sort', 'Bubble Sort', 'Binary Search'),
    2,
    'Bubble Sort có O(n²) vì dùng 2 vòng lặp lồng nhau.',
    1
),
(
    '00000000-0000-0000-0000-00000000D011',
    '00000000-0000-0000-0000-00000000B028',
    'Binary Search (tìm kiếm nhị phân) yêu cầu mảng đã được:',
    jsonb_build_array('Sắp xếp', 'Đảo ngược', 'Xáo trộn', 'Nén'),
    0,
    'Binary Search chỉ hoạt động trên mảng đã được sắp xếp.',
    2
),
(
    '00000000-0000-0000-0000-00000000D012',
    '00000000-0000-0000-0000-00000000B028',
    'Đệ quy (recursion) là kỹ thuật hàm gọi lại:',
    jsonb_build_array('Một hàm khác', 'Chính nó', 'Tất cả các hàm', 'Hàm main()'),
    1,
    'Đệ quy là kỹ thuật một hàm gọi lại chính nó để chia nhỏ bài toán.',
    3
);

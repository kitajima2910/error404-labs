-- Migration 014: Seed Python Course Data
-- Khóa "Python Cơ Bản" với 3 chapters, 10 lessons, test cases
-- UUIDs hardcoded để dễ reference giữa các bảng
-- Chạy từng câu lệnh riêng biệt qua Neon console

-- ============================================================
-- 1. COURSE
-- ============================================================
INSERT INTO error404labs.py_courses (id, title, slug, description, difficulty, published)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Python Cơ Bản',
    'python-co-ban',
    'Khóa học Python từ cơ bản đến nâng cao. Dành cho người mới bắt đầu, không cần kinh nghiệm lập trình. Học qua thực hành với các bài tập tương tác.',
    'beginner',
    true
);

-- ============================================================
-- 2. CHAPTER 1: Python Cơ Bản
-- ============================================================
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000001',
    'Python Cơ Bản',
    'Làm quen với ngôn ngữ Python. Viết chương trình đầu tiên, làm việc với biến, kiểu dữ liệu và nhập xuất cơ bản.',
    1
);

-- Lesson 1: Lý thuyết - Xin chào Python
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000201',
    '00000000-0000-0000-0000-000000000101',
    'Xin chào Python',
    'xin-chao-python',
    'Làm quen với Python, viết chương trình đầu tiên',
    'theory',
    E'# Xin chào Python!\n\nPython là một ngôn ngữ lập trình đơn giản, dễ học và rất phổ biến.\n\n## Tại sao nên học Python?\n- **Dễ đọc, dễ viết**: Cú pháp rõ ràng, gần gũi với tiếng Anh\n- **Ứng dụng rộng rãi**: Web, Data Science, AI, Automation, Game...\n- **Cộng đồng lớn**: Nhiều thư viện hỗ trợ, dễ tìm tài liệu\n\n## Chương trình Python đầu tiên\n\n```python\nprint("Xin chào! Mình tên là Python.")\n```\n\nHàm `print()` dùng để in dữ liệu ra màn hình. Nội dung in ra được đặt trong cặp dấu ngoặc đơn `()` và nếu là chữ thì phải đặt trong dấu nháy kép `""` hoặc nháy đơn `''`.\n\n## Trong bài này, bạn sẽ học:\n- Cách viết và chạy chương trình Python đầu tiên\n- Sử dụng hàm `print()` để in thông tin\n- Làm quen với môi trường lập trình tương tác',
    '-- Chào mừng bạn đến với Python!\n-- Hãy viết chương trình đầu tiên của bạn\n-- Dùng hàm print() để in ra màn hình\n\nprint("Xin chào! Mình tên là Python.")\n',
    'easy',
    5,
    5,
    'exact',
    10000,
    1,
    true
);

-- Lesson 2: Thực hành - In tên của bạn
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000202',
    '00000000-0000-0000-0000-000000000101',
    'In tên của bạn',
    'in-ten-cua-ban',
    'Dùng print() để in thông tin',
    'practice',
    E'# In tên của bạn\n\nThực hành sử dụng hàm `print()` để in thông tin ra màn hình.\n\n## Yêu cầu\n\nViết chương trình in ra màn hình dòng chữ:\n```\nXin chào! Mình tên là Python.\n```\n\n## Ví dụ\n\n**Output:**\n```\nXin chào! Mình tên là Python.\n```\n\n## Gợi ý\n- Dùng hàm `print()`\n- Đặt nội dung trong dấu nháy kép `""`\n- Nhớ dấu chấm cuối câu',
    E'# Viết chương trình in ra màn hình dòng chữ:\n# "Xin chào! Mình tên là Python."\n# Gợi ý: dùng hàm print()\n\n# Viết code của bạn ở dưới:\n',
    'easy',
    10,
    5,
    'exact',
    10000,
    2,
    true
);

-- Lesson 3: Thực hành - Tính tổng hai số
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000203',
    '00000000-0000-0000-0000-000000000101',
    'Tính tổng hai số',
    'tinh-tong-hai-so',
    'Nhập và tính toán với số',
    'practice',
    E'# Tính tổng hai số\n\nLuyện tập nhập dữ liệu từ bàn phím và thực hiện phép tính cộng.\n\n## Yêu cầu\n\nViết chương trình nhập hai số nguyên từ bàn phím (mỗi số trên một dòng) và in ra tổng của chúng.\n\n## Ví dụ\n\n**Input:**\n```\n3\n5\n```\n\n**Output:**\n```\n8\n```\n\n## Gợi ý\n- Dùng `input()` để đọc dữ liệu\n- Dùng `int()` để chuyển chuỗi thành số\n- Dùng toán tử `+` để tính tổng\n- Dùng `print()` để in kết quả',
    E'# Viết chương trình nhập hai số từ bàn phím\n# và in ra tổng của chúng.\n#\n# Đầu vào: hai số nguyên, mỗi số trên một dòng\n# Đầu ra: tổng của hai số\n\n# Viết code của bạn ở dưới:\n',
    'easy',
    10,
    10,
    'exact',
    10000,
    3,
    true
);

-- ============================================================
-- 3. CHAPTER 2: Cấu trúc điều khiển
-- ============================================================
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000001',
    'Cấu trúc điều khiển',
    'Tìm hiểu về câu lệnh điều kiện if-else và vòng lặp for, while. Giải quyết bài toán có logic rẽ nhánh và lặp.',
    2
);

-- Lesson 4: Số chẵn hay lẻ
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000204',
    '00000000-0000-0000-0000-000000000102',
    'Số chẵn hay lẻ',
    'so-chan-hay-le',
    'Dùng if-else kiểm tra số',
    'practice',
    E'# Số chẵn hay lẻ\n\nLuyện tập câu lệnh điều kiện `if-else` để kiểm tra một số là chẵn hay lẻ.\n\n## Yêu cầu\n\nViết chương trình nhập một số nguyên từ bàn phím và kiểm tra:\n- Nếu số đó là **số chẵn**, in ra `"Đây là số chẵn"`\n- Nếu số đó là **số lẻ**, in ra `"Đây là số lẻ"`\n\n## Ví dụ\n\n**Input:**\n```\n4\n```\n\n**Output:**\n```\nĐây là số chẵn\n```\n\n## Gợi ý\n- Một số chẵn khi chia cho 2 dư 0: `so % 2 == 0`\n- Toán tử `%` (modulo) trả về phần dư của phép chia',
    E'# Viết chương trình nhập một số nguyên và kiểm tra\n# số đó là chẵn hay lẻ.\n#\n# Gợi ý: dùng if-else và toán tử %\n\n# Viết code của bạn ở dưới:\n',
    'easy',
    10,
    8,
    'contains',
    10000,
    4,
    true
);

-- Lesson 5: So sánh hai số
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000205',
    '00000000-0000-0000-0000-000000000102',
    'So sánh hai số',
    'so-sanh-hai-so',
    'So sánh và tìm số lớn hơn',
    'practice',
    E'# So sánh hai số\n\nLuyện tập so sánh hai số và tìm ra số lớn hơn.\n\n## Yêu cầu\n\nViết chương trình nhập hai số nguyên từ bàn phím (mỗi số trên một dòng) và so sánh:\n- Nếu số thứ nhất lớn hơn: in ra `"Số thứ nhất lớn hơn"` kèm giá trị\n- Nếu số thứ hai lớn hơn: in ra `"Số thứ hai lớn hơn"` kèm giá trị\n- Nếu hai số bằng nhau: in ra `"Hai số bằng nhau"`\n\n## Ví dụ\n\n**Input:**\n```\n5\n3\n```\n\n**Output:**\n```\nSố thứ nhất lớn hơn: 5\n```',
    E'# Viết chương trình nhập hai số và so sánh chúng.\n# In ra số lớn hơn hoặc "Hai số bằng nhau"\n\n# Viết code của bạn ở dưới:\n',
    'easy',
    10,
    8,
    'contains',
    10000,
    5,
    true
);

-- Lesson 6: Tính tổng từ 1 đến n
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000206',
    '00000000-0000-0000-0000-000000000102',
    'Tính tổng từ 1 đến n',
    'tinh-tong-1-den-n',
    'Vòng lặp for và tính tổng',
    'practice',
    E'# Tính tổng từ 1 đến n\n\nLuyện tập sử dụng vòng lặp `for` để tính tổng các số từ 1 đến n.\n\n## Yêu cầu\n\nViết chương trình nhập một số nguyên dương n và tính tổng các số từ 1 đến n.\n\nCông thức: `S = 1 + 2 + 3 + ... + n`\n\n## Ví dụ\n\n**Input:**\n```\n5\n```\n\n**Output:**\n```\n15\n```\n(Giải thích: 1 + 2 + 3 + 4 + 5 = 15)\n\n## Gợi ý\n- Dùng `range(1, n+1)` để duyệt từ 1 đến n\n- Khởi tạo biến `tong = 0` trước vòng lặp\n- Cộng dồn vào biến tổng',
    E'# Viết chương trình tính tổng từ 1 đến n.\n#\n# Đầu vào: một số nguyên dương n\n# Đầu ra: tổng từ 1 đến n\n\n# Viết code của bạn ở dưới:\n',
    'medium',
    15,
    10,
    'exact',
    10000,
    6,
    true
);

-- Lesson 7: Bảng cửu chương
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000207',
    '00000000-0000-0000-0000-000000000102',
    'Bảng cửu chương',
    'bang-cuu-chuong',
    'Vòng lặp lồng nhau',
    'practice',
    E'# Bảng cửu chương\n\nLuyện tập vòng lặp lồng nhau để in bảng cửu chương.\n\n## Yêu cầu\n\nViết chương trình nhập một số nguyên n (1-9) từ bàn phím và in ra bảng cửu chương của số đó.\n\n## Ví dụ\n\n**Input:**\n```\n2\n```\n\n**Output:**\n```\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n```\n\n## Gợi ý\n- Dùng vòng lặp `for i in range(1, 10)`\n- In theo định dạng: `print(f"{n} x {i} = {n*i}")`',
    E'# Viết chương trình in bảng cửu chương.\n# Nhập một số n (1-9) và in bảng cửu chương của n.\n\n# Viết code của bạn ở dưới:\n',
    'medium',
    15,
    10,
    'contains',
    10000,
    7,
    true
);

-- ============================================================
-- 4. CHAPTER 3: Hàm và Collection
-- ============================================================
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000001',
    'Hàm và Collection',
    'Làm việc với danh sách (list), định nghĩa hàm và kết hợp cả hai để giải quyết bài toán phức tạp hơn.',
    3
);

-- Lesson 8: Làm việc với danh sách
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000208',
    '00000000-0000-0000-0000-000000000103',
    'Làm việc với danh sách',
    'danh-sach',
    'Thao tác với list Python',
    'practice',
    E'# Làm việc với danh sách\n\nLuyện tập thao tác với kiểu dữ liệu list (danh sách) trong Python.\n\n## Yêu cầu\n\nViết chương trình đọc các số nguyên từ bàn phím (mỗi số trên một dòng, nhập "done" để kết thúc) và in ra **tổng** của tất cả các số đó.\n\n## Ví dụ\n\n**Input:**\n```\n1\n2\n3\n4\n5\ndone\n```\n\n**Output:**\n```\n15\n```\n\n## Gợi ý\n- Tạo list rỗng: `numbers = []`\n- Dùng vòng lặp `while True` để đọc cho đến khi gặp "done"\n- Dùng `int()` để chuyển thành số và `append()` để thêm vào list\n- Dùng `sum()` để tính tổng',
    E'# Viết chương trình đọc các số từ bàn phím\n# (nhập "done" để kết thúc) và in ra tổng.\n#\n# Gợi ý: dùng list, while loop, sum()\n\n# Viết code của bạn ở dưới:\n',
    'medium',
    15,
    12,
    'contains',
    10000,
    8,
    true
);

-- Lesson 9: Viết hàm tính giai thừa
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000209',
    '00000000-0000-0000-0000-000000000103',
    'Viết hàm tính giai thừa',
    'ham-giai-thua',
    'Định nghĩa hàm',
    'practice',
    E'# Viết hàm tính giai thừa\n\nLuyện tập định nghĩa hàm trong Python.\n\n## Yêu cầu\n\nViết hàm `giai_thua(n)` tính n! (n giai thừa) với n là số nguyên không âm.\n\nBiết rằng: `n! = 1 × 2 × 3 × ... × n` và `0! = 1`\n\nSau đó viết chương trình nhập n từ bàn phím và in ra kết quả.\n\n## Ví dụ\n\n**Input:**\n```\n5\n```\n\n**Output:**\n```\n120\n```\n(Giải thích: 5! = 1 × 2 × 3 × 4 × 5 = 120)\n\n## Gợi ý\n- Định nghĩa hàm: `def giai_thua(n):`\n- Dùng vòng lặp hoặc đệ quy\n- Nhớ xử lý trường hợp n = 0',
    E'# Viết hàm giai_thua(n) tính n giai thừa.\n# Sau đó nhập n và in ra kết quả.\n#\n# Gợi ý: 0! = 1, n! = 1 * 2 * 3 * ... * n\n\ndef giai_thua(n):\n    # Viết code của bạn ở đây\n    pass\n\n# Nhập n và in kết quả\n',
    'medium',
    20,
    12,
    'exact',
    10000,
    9,
    true
);

-- Lesson 10: Tính tổng dãy số
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000210',
    '00000000-0000-0000-0000-000000000103',
    'Tính tổng dãy số',
    'tinh-tong-day-so',
    'Kết hợp hàm và list',
    'practice',
    E'# Tính tổng dãy số\n\nKết hợp kỹ năng về list và hàm để giải quyết bài toán tổng hợp.\n\n## Yêu cầu\n\nViết chương trình nhập một dãy số nguyên từ bàn phím (mỗi số trên một dòng, nhập "done" để kết thúc) và tính tổng các số trong dãy.\n\n## Ví dụ\n\n**Input:**\n```\n1\n2\n3\n4\n5\ndone\n```\n\n**Output:**\n```\n15\n```\n\n## Gợi ý\n- Tạo hàm `tinh_tong(numbers)` nhận list và trả về tổng\n- Đọc dữ liệu vào list cho đến khi gặp "done"\n- Gọi hàm và in kết quả',
    E'# Viết chương trình tính tổng dãy số.\n# Tạo hàm tinh_tong() và xử lý nhập liệu.\n\n# Viết code của bạn ở dưới:\n',
    'medium',
    20,
    12,
    'exact',
    10000,
    10,
    true
);

-- ============================================================
-- 5. TEST CASES
-- ============================================================

-- Lesson 2: In tên của bạn (3 tests)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000301',
    '00000000-0000-0000-0000-000000000202',
    '',
    'Xin chào! Mình tên là Python.',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000302',
    '00000000-0000-0000-0000-000000000202',
    '',
    'Python',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000303',
    '00000000-0000-0000-0000-000000000202',
    '',
    'Xin chào',
    true,
    3
);

-- Lesson 3: Tính tổng hai số (3 tests)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000304',
    '00000000-0000-0000-0000-000000000203',
    E'3\n5',
    '8',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000305',
    '00000000-0000-0000-0000-000000000203',
    E'10\n20',
    '30',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000306',
    '00000000-0000-0000-0000-000000000203',
    E'100\n200',
    '300',
    true,
    3
);

-- Lesson 4: Số chẵn hay lẻ (3 tests - dùng contains mode)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000307',
    '00000000-0000-0000-0000-000000000204',
    '4',
    'chẵn',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000308',
    '00000000-0000-0000-0000-000000000204',
    '7',
    'lẻ',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000309',
    '00000000-0000-0000-0000-000000000204',
    '0',
    'chẵn',
    true,
    3
);

-- Lesson 5: So sánh hai số (3 tests - dùng contains mode)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000310',
    '00000000-0000-0000-0000-000000000205',
    E'5\n3',
    'lớn',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000311',
    '00000000-0000-0000-0000-000000000205',
    E'2\n8',
    'lớn',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000312',
    '00000000-0000-0000-0000-000000000205',
    E'4\n4',
    'bằng',
    true,
    3
);

-- Lesson 6: Tính tổng từ 1 đến n (3 tests)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000313',
    '00000000-0000-0000-0000-000000000206',
    '5',
    '15',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000314',
    '00000000-0000-0000-0000-000000000206',
    '10',
    '55',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000315',
    '00000000-0000-0000-0000-000000000206',
    '100',
    '5050',
    true,
    3
);

-- Lesson 7: Bảng cửu chương (3 tests - dùng contains mode)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000316',
    '00000000-0000-0000-0000-000000000207',
    '2',
    '2 x 1 = 2',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000317',
    '00000000-0000-0000-0000-000000000207',
    '3',
    '3 x 5 = 15',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000318',
    '00000000-0000-0000-0000-000000000207',
    '9',
    '9 x 9 = 81',
    true,
    3
);

-- Lesson 8: Làm việc với danh sách (3 tests - dùng contains mode)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000319',
    '00000000-0000-0000-0000-000000000208',
    E'1\n2\n3\n4\n5\ndone',
    '15',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000320',
    '00000000-0000-0000-0000-000000000208',
    E'10\n20\ndone',
    '30',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000321',
    '00000000-0000-0000-0000-000000000208',
    E'100\n200\n300\ndone',
    '600',
    true,
    3
);

-- Lesson 9: Viết hàm tính giai thừa (3 tests)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000322',
    '00000000-0000-0000-0000-000000000209',
    '5',
    '120',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000323',
    '00000000-0000-0000-0000-000000000209',
    '3',
    '6',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000324',
    '00000000-0000-0000-0000-000000000209',
    '7',
    '5040',
    true,
    3
);

-- Lesson 10: Tính tổng dãy số (3 tests)
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000325',
    '00000000-0000-0000-0000-000000000210',
    E'1\n2\n3\n4\n5\ndone',
    '15',
    false,
    1
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000326',
    '00000000-0000-0000-0000-000000000210',
    E'10\n20\n30\ndone',
    '60',
    false,
    2
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000327',
    '00000000-0000-0000-0000-000000000210',
    E'-5\n10\n-3\n8\ndone',
    '10',
    true,
    3
);

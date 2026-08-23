-- Migration 019: Seed "Python Nâng Cao" course
-- Chạy trên Neon console

-- 1. COURSE
INSERT INTO error404labs.py_courses (id, title, slug, description, difficulty, published)
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'Python Nâng Cao',
    'python-nang-cao',
    'Khóa học Python nâng cao dành cho người đã biết cơ bản. OOP, Xử lý lỗi, Decorators, Generators và nhiều hơn nữa.',
    'advanced',
    true
) ON CONFLICT (id) DO NOTHING;

-- 2. CHAPTER 1: OOP
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000301',
    '00000000-0000-0000-0000-000000000002',
    'Lập trình hướng đối tượng (OOP)',
    'Tìm hiểu Class, Object, Inheritance trong Python.',
    1
) ON CONFLICT DO NOTHING;

-- Lesson 1: Class và Object
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000401',
    '00000000-0000-0000-0000-000000000301',
    'Class và Object',
    'class-va-object',
    'Tạo và sử dụng Class, Object trong Python',
    'practice',
    E'# Class và Object\n\n## Class là gì?\n\nClass là "bản thiết kế" để tạo ra Object. Trong Python, ta định nghĩa class bằng từ khóa `class`.\n\n```python\nclass Nguoi:\n    def __init__(self, ten, tuoi):\n        self.ten = ten\n        self.tuoi = tuoi\n    \n    def chao(self):\n        return f"Xin chào, mình tên là {self.ten}"\n```\n\n## Tạo Object\n```python\nnguoi1 = Nguoi("An", 20)\nprint(nguoi1.chao())  # Xin chào, mình tên là An\n```\n\n## Trong bài này\nBạn sẽ viết một class `HinhChuNhat` có:\n- Attribute `dai` và `rong`\n- Method `dien_tich()` trả về diện tích\n- Method `chu_vi()` trả về chu vi',
    E'# Viết class HinhChuNhat với:\n# - __init__(self, dai, rong)\n# - dien_tich(self) trả về dai * rong\n# - chu_vi(self) trả về 2 * (dai + rong)\n\nclass HinhChuNhat:\n    pass\n\n# Test\nh1 = HinhChuNhat(3, 2)\nprint(h1.dien_tich())  # 6\nprint(h1.chu_vi())     # 10\n',
    'medium',
    20,
    15,
    'exact',
    10000,
    1,
    true
);

-- Lesson 2: Kế thừa
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000402',
    '00000000-0000-0000-0000-000000000301',
    'Kế thừa (Inheritance)',
    'ke-thua',
    'Tái sử dụng code qua kế thừa class',
    'practice',
    E'# Kế thừa (Inheritance)\n\nKế thừa cho phép class "con" nhận Attribute và Method từ class "cha".\n\n```python\nclass DongVat:\n    def __init__(self, ten):\n        self.ten = ten\n    \n    def tieng_keu(self):\n        return "..." \n\nclass Cho(DongVat):\n    def tieng_keu(self):\n        return "Gâu gâu!"\n```\n\n## Trong bài này\nTạo class `NhanVien` kế thừa từ `Nguoi`:\n- `Nguoi` có `ten`, `tuoi`\n- `NhanVien` thêm `phong_ban`\n- Override method `chao()` để thêm thông tin phòng ban',
    E'class Nguoi:\n    def __init__(self, ten, tuoi):\n        self.ten = ten\n        self.tuoi = tuoi\n    \n    def chao(self):\n        return f"Xin chào, mình tên là {self.ten}, {self.tuoi} tuổi"\n\n# Viết class NhanVien kế thừa từ Nguoi\n# có thêm attribute phong_ban\n# và override method chao()\n\nclass NhanVien(Nguoi):\n    pass\n\n# Test\nnv = NhanVien("An", 25)\nnv.phong_ban = "IT"\nprint(nv.chao())  # Phải in ra thông tin phòng ban\n',
    'medium',
    20,
    15,
    'exact',
    10000,
    2,
    true
);

-- 3. CHAPTER 2: Xử lý lỗi
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000303',
    '00000000-0000-0000-0000-000000000002',
    'Xử lý lỗi (Error Handling)',
    'Try/Except, Exception tùy chỉnh và các phương pháp tốt nhất.',
    2
) ON CONFLICT DO NOTHING;

-- Lesson 3: Try/Except
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000405',
    '00000000-0000-0000-0000-000000000303',
    'Try/Except cơ bản',
    'try-except',
    'Bắt và xử lý lỗi trong Python',
    'practice',
    E'# Try/Except cơ bản\n\n`try/except` giúp "bắt" lỗi và xử lý.\n\n```python\ntry:\n    so = int("abc")\nexcept ValueError:\n    print("Không thể chuyển thành số!")\n```\n\n## Trong bài này\nViết ham `chia(a, b)`:\n- Trả về `a / b` nếu chia được\n- Trả về "Lỗi: không thể chia cho 0" nếu `b == 0`\n- Trả về "Lỗi: đầu vào không hợp lệ" nếu không phải số',
    E'# Viết ham chia(a, b)\n# trả về kết quả phép chia hoặc thông báo lỗi\n\ndef chia(a, b):\n    # Viết code của bạn ở đây\n    pass\n',
    'medium',
    15,
    10,
    'exact',
    10000,
    1,
    true
);

-- 4. CHAPTER 3: Khái niệm nâng cao
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES (
    '00000000-0000-0000-0000-000000000304',
    '00000000-0000-0000-0000-000000000002',
    'Khái niệm nâng cao',
    'Decorators, Generators, List Comprehensions và nhiều hơn nữa.',
    3
) ON CONFLICT DO NOTHING;

-- Lesson 4: Decorators
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000406',
    '00000000-0000-0000-0000-000000000304',
    'Decorators',
    'decorators',
    'Bọc hàm bằng decorator để mở rộng chức năng',
    'practice',
    E'# Decorators\n\nDecorator là hàm "bọc" một hàm khác, thêm chức năng mà không sửa code gốc.\n\n```python\ndef log(func):\n    def wrapper(*args, **kwargs):\n        print(f"Gọi {func.__name__}")\n        result = func(*args, **kwargs)\n        print(f"Kết quả: {result}")\n        return result\n    return wrapper\n\n@log\ndef add(a, b):\n    return a + b\n```\n\n## Trong bài này\nViết decorator `repeat(n)`:\n- Chạy hàm được decor n lần\n- Trả về kết quả lần cuối cùng',
    E'# Viết decorator repeat(n)\n# chạy hàm được decor n lần\n# trả về kết quả lần cuối\n\ndef repeat(n):\n    # Viết code của bạn ở đây\n    pass\n\n# Test:\n@repeat(3)\ndef say_hello():\n    print("Hello!")\n    return "done"\n\nresult = say_hello()\n',
    'hard',
    25,
    20,
    'exact',
    10000,
    1,
    true
);

-- Lesson 5: Generators
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000407',
    '00000000-0000-0000-0000-000000000304',
    'Generators',
    'generators',
    'Tạo iterator tiết kiệm bộ nhớ với yield',
    'practice',
    E'# Generators\n\nGenerator là hàm dùng `yield` thay vì `return`.\n\n```python\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nfor so in fibonacci(5):\n    print(so)  # 0 1 1 2 3\n```\n\n## Trong bài này\nViết generator `so_nguyen_to(n)`:\n- Yield n số nguyên tố đầu tiên',
    E'# Viết generator so_nguyen_to(n)\n# yield n số nguyên tố đầu tiên\n\ndef so_nguyen_to(n):\n    # Viết code của bạn ở đây\n    pass\n\n# Test:\nlist(so_nguyen_to(5))  # [2, 3, 5, 7, 11]\n',
    'hard',
    25,
    20,
    'exact',
    10000,
    2,
    true
);

-- Lesson 6: List Comprehensions
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000408',
    '00000000-0000-0000-0000-000000000304',
    'List Comprehensions',
    'list-comprehensions',
    'Viết list ngắn gọn và mạnh mẽ',
    'practice',
    E'# List Comprehensions\n\nCách viết ngắn gọn để tạo list mới từ list cũ.\n\n```python\nsquares = [x ** 2 for x in range(10)]\neven_squares = [x ** 2 for x in range(10) if x % 2 == 0]\n```\n\n## Trong bài này\nViết list comprehension `binh_phuong_chan(n)`:\n- Trả về danh sách bình phương của các số chẵn từ 0 đến n',
    E'# Viết list comprehension binh_phuong_chan(n)\n# trả về danh sách bình phương số chẵn từ 0 đến n\n\ndef binh_phuong_chan(n):\n    # Viết code của bạn ở đây\n    return []\n\n# Test:\nbinh_phuong_chan(10)  # [0, 4, 16, 36, 64, 100]\n',
    'medium',
    20,
    15,
    'exact',
    10000,
    3,
    true
);

-- 5. TEST CASES
-- Class và Object: HinhChuNhat
INSERT INTO error404labs.py_test_cases (lesson_id, stdin, expected_output, is_hidden, order_index) VALUES
('00000000-0000-0000-0000-000000000401', '', E'6\n10', false, 1),
('00000000-0000-0000-0000-000000000401', '', E'12\n16', false, 2),
('00000000-0000-0000-0000-000000000401', '', E'25\n40', true, 3);

-- Kế thừa: NhanVien
INSERT INTO error404labs.py_test_cases (lesson_id, stdin, expected_output, is_hidden, order_index) VALUES
('00000000-0000-0000-0000-000000000402', '', 'Xin chào, mình tên là An, 25 tuổi - Phòng: IT', false, 1),
('00000000-0000-0000-0000-000000000402', '', 'Xin chào, mình tên là Bình, 30 tuổi - Phòng: Kế toán', true, 2);

-- Try/Except: chia
INSERT INTO error404labs.py_test_cases (lesson_id, stdin, expected_output, is_hidden, order_index) VALUES
('00000000-0000-0000-0000-000000000405', E'10\n2', '5.0', false, 1),
('00000000-0000-0000-0000-000000000405', E'7\n0', 'Lỗi: không thể chia cho 0', false, 2),
('00000000-0000-0000-0000-000000000405', E'abc\n2', 'Lỗi: đầu vào không hợp lệ', true, 3);

-- Decorators: repeat
INSERT INTO error404labs.py_test_cases (lesson_id, stdin, expected_output, is_hidden, order_index) VALUES
('00000000-0000-0000-0000-000000000406', '', 'Hello!\nHello!\nHello!\ndone', false, 1),
('00000000-0000-0000-0000-000000000406', E'1\n2', 'Hello!\nHello!\nHello!\ndone', true, 2);

-- Generators: so_nguyen_to
INSERT INTO error404labs.py_test_cases (lesson_id, stdin, expected_output, is_hidden, order_index) VALUES
('00000000-0000-0000-0000-000000000407', '', '[2, 3, 5, 7, 11]', false, 1),
('00000000-0000-0000-0000-000000000407', '', '[2, 3, 5]', false, 2),
('00000000-0000-0000-0000-000000000407', '', '[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]', true, 3);

-- List Comprehensions: binh_phuong_chan
INSERT INTO error404labs.py_test_cases (lesson_id, stdin, expected_output, is_hidden, order_index) VALUES
('00000000-0000-0000-0000-000000000408', '', '[0, 4, 16, 36, 64, 100]', false, 1),
('00000000-0000-0000-0000-000000000408', '', '[0, 4, 16]', false, 2),
('00000000-0000-0000-0000-000000000408', '', '[0, 4, 16, 36, 64, 100, 144, 196]', true, 3);

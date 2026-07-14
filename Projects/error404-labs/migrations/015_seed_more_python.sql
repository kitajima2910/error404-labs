-- Migration 015: Bổ sung 10 bài Python Cơ Bản + Tạo Python Nâng Cao (30 bài)
-- Designed for Tin học trẻ Bảng B & C

-- ============================================================
-- PHẦN 1: THÊM 10 BÀI CHO PYTHON CƠ BẢN
-- ============================================================

INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES ( '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000001', 'Xử lý chuỗi và dữ liệu', 'Kỹ thuật xử lý chuỗi, list comprehension, lambda, ôn tập.', 4 );

-- Lesson 21: Cắt chuỗi và định dạng
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000211',
    '00000000-0000-0000-0000-000000000104',
    'Cắt chuỗi và định dạng',
    'cat-chuoi-va-dinh-dang',
    'Kỹ thuật slicing và f-strings',
    'practice',
    E'# Cắt chuỗi và định dạng

Slicing: `s[start:stop:step]`
- `s[0:3]` → 3 ký tự đầu
- `s[-3:]` → 3 ký tự cuối
- `s[::-1]` → đảo ngược

## Yêu cầu

Nhập một chuỗi, in ra:
1. "Đầu: " + 3 ký tự đầu
2. "Cuối: " + 3 ký tự cuối
3. "Đảo: " + chuỗi đảo ngược

## Ví dụ

Input: Python
Output: Đầu: Pyt, Cuối: hon, Đảo: nohtyP',
    E'# Viết chương trình cắt chuỗi dùng slicing

# Viết code của bạn ở dưới:',
    'medium',15,10,'contains',10000,11,true
);

-- Lesson 22: List Comprehension
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000212',
    '00000000-0000-0000-0000-000000000104',
    'List Comprehension',
    'list-comprehension',
    'Tạo list nhanh với comprehension',
    'practice',
    E'# List Comprehension

Cách viết gọn để tạo list từ iterable:
```python
so_chan = [x for x in range(20) if x % 2 == 0]
```

## Yêu cầu

Nhập n, tạo list các **số chẵn** từ 0 đến n bằng list comprehension và in ra.

## Ví dụ

Input: 10 → Output: [0, 2, 4, 6, 8, 10]',
    E'# Viết chương trình dùng list comprehension tạo số chẵn từ 0 đến n

# Viết code của bạn ở dưới:',
    'medium',15,10,'contains',10000,12,true
);

-- Lesson 23: Hàm Lambda
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000213',
    '00000000-0000-0000-0000-000000000104',
    'Hàm Lambda',
    'ham-lambda',
    'Viết hàm ẩn danh với lambda',
    'practice',
    E'# Hàm Lambda

Lambda là hàm ẩn danh: `lambda x: x * x`
Kết hợp với `map()` và `filter()`:
```python
bp = list(map(lambda x: x*x, [1, 2, 3]))  # [1, 4, 9]
```

## Yêu cầu

Nhập dãy số (1 dòng, cách nhau khoảng trắng). Dùng `map()` với lambda tính bình phương mỗi số và in list kết quả.

## Ví dụ

Input: 1 2 3 4 5 → Output: Binh phuong: 1 4 9 16 25',
    E'# Viết chương trình dùng lambda và map() tính bình phương
numbers = list(map(int, input().split()))
# Viết tiếp',
    'hard',20,12,'contains',10000,13,true
);

-- Lesson 24: Dictionary nâng cao
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000214',
    '00000000-0000-0000-0000-000000000104',
    'Dictionary nâng cao',
    'dictionary-nang-cao',
    'Xử lý dữ liệu với dict',
    'practice',
    E'# Dictionary nâng cao

Dictionary lưu cặp key-value. Có thể dùng để đếm tần suất:

```python
dem = {}
for x in [1,2,2,3]:
    dem[x] = dem.get(x, 0) + 1
```

## Yêu cầu

Nhập dãy số (1 dòng). Đếm số lần xuất hiện của mỗi số, in theo thứ tự tăng dần: `{số}: {số_lần}`

## Ví dụ

Input: 3 1 2 1 3 3
Output:
1: 2
2: 1
3: 3',
    E'# Đếm tần suất bằng dict
numbers = list(map(int, input().split()))
# Viết code',
    'medium',15,12,'contains',10000,14,true
);

-- Lesson 25: Xử lý ma trận
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000215',
    '00000000-0000-0000-0000-000000000104',
    'Xử lý ma trận',
    'xu-ly-ma-tran',
    'Làm việc với mảng 2 chiều',
    'practice',
    E'# Xử lý ma trận

Ma trận là list lồng nhau:
```python
matrix = [[1,2],[3,4]]
print(matrix[0][1])  # 2
```

## Yêu cầu

Nhập n và m (dòng 1). Sau đó nhập n dòng, mỗi dòng m số. In ra tổng các phần tử.

## Ví dụ

Input:
2 3
1 2 3
4 5 6
Output: 21',
    E'# Tính tổng ma trận
n, m = map(int, input().split())
tong = 0
# Viết tiếp',
    'medium',15,12,'contains',10000,15,true
);

-- Lesson 26: Xử lý chuỗi nâng cao
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000216',
    '00000000-0000-0000-0000-000000000104',
    'Xử lý chuỗi nâng cao',
    'xu-ly-chuoi-nang-cao',
    'Các thao tác xử lý chuỗi',
    'practice',
    E'# Xử lý chuỗi nâng cao

Chuỗi trong Python hỗ trợ nhiều phương thức:
- `.split(sep)`: tách thành list
- `.join(list)`: nối list thành chuỗi
- `.strip()`: xóa khoảng trắng đầu/cuối
- `.replace(a,b)`: thay thế

## Yêu cầu

Nhập một câu, đếm số từ (các từ cách nhau khoảng trắng). In ra số từ và in từng từ trên một dòng.

## Ví dụ

Input: Toi hoc Python
Output:
3
Toi
hoc
Python',
    E'# Đếm số từ và in từng từ
s = input().strip()
# Viết code',
    'medium',15,10,'contains',10000,16,true
);

-- Lesson 27: Vẽ hình với vòng lặp
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000217',
    '00000000-0000-0000-0000-000000000104',
    'Vẽ hình với vòng lặp',
    've-hinh-voi-vong-lap',
    'In ra các hình bằng vòng lặp',
    'practice',
    E'# Vẽ hình với vòng lặp

## Yêu cầu

Nhập n, in ra tam giác vuông đặc có chiều cao n bằng dấu `*`

## Ví dụ

Input: 4
Output:
*
**
***
****',
    E'# Vẽ tam giác vuông
n = int(input())
# Viết code',
    'medium',15,10,'contains',10000,17,true
);

-- Lesson 28: Số chính phương
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000218',
    '00000000-0000-0000-0000-000000000104',
    'Số chính phương',
    'so-chinh-phuong',
    'Kiểm tra số chính phương',
    'practice',
    E'# Số chính phương

Số chính phương là bình phương của một số nguyên: 0, 1, 4, 9, 16...

## Yêu cầu

Nhập n, in ra các số chính phương từ 1 đến n (cách nhau khoảng trắng).
Dùng `int(sqrt(n))**2 == n` để kiểm tra.

## Ví dụ

Input: 20
Output: 1 4 9 16',
    E'# In số chính phương từ 1 đến n
import math
n = int(input())
# Viết code',
    'easy',10,8,'contains',10000,18,true
);

-- Lesson 29: Hoán đổi và sắp xếp
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000219',
    '00000000-0000-0000-0000-000000000104',
    'Hoán đổi và sắp xếp',
    'hoan-doi-va-sap-xep',
    'Kỹ thuật swap và sort cơ bản',
    'practice',
    E'# Hoán đổi và sắp xếp

## Yêu cầu

Nhập dãy số, in ra:
- Dòng 1: dãy đã sắp xếp tăng dần
- Dòng 2: số lớn nhất và số nhỏ nhất

## Ví dụ

Input: 5 2 8 1 9
Output:
1 2 5 8 9
9 1',
    E'# Sắp xếp và tìm min, max
numbers = list(map(int, input().split()))
# Viết code',
    'easy',10,8,'contains',10000,19,true
);

-- Lesson 30: Ôn tập Python Cơ Bản
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-000000000220',
    '00000000-0000-0000-0000-000000000104',
    'Ôn tập Python Cơ Bản',
    'on-tap-python-co-ban',
    'Tổng kết kiến thức đã học',
    'theory',
    E'# Ôn tập Python Cơ Bản

Chúc mừng bạn đã hoàn thành khóa **Python Cơ Bản**!

## Những gì đã học:
1. Biến, kiểu dữ liệu, print, input
2. If-else, for, while, break
3. Hàm, list, tuple, set, dictionary
4. Xử lý chuỗi: slicing, split, join
5. List comprehension, lambda, map

Hãy chuyển sang khóa **Python Nâng Cao** để luyện thi Tin học trẻ!',
    E'print("Hoàn thanh Python Co Ban!")',
    'easy',10,5,'exact',10000,20,true
);

-- ---- TEST CASES ----
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000328', '00000000-0000-0000-0000-000000000211', E'Python', E'Đầu: Pyt', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000329', '00000000-0000-0000-0000-000000000211', E'Python', E'Đảo: nohtyP', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000330', '00000000-0000-0000-0000-000000000211', E'abcdef', E'Cuối: def', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000331', '00000000-0000-0000-0000-000000000212', E'10', E'0, 2, 4, 6, 8, 10', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000332', '00000000-0000-0000-0000-000000000212', E'5', E'0, 2, 4', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000333', '00000000-0000-0000-0000-000000000212', E'1', E'0', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000334', '00000000-0000-0000-0000-000000000213', E'1 2 3 4 5', E'1 4 9 16 25', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000335', '00000000-0000-0000-0000-000000000213', E'2 4 6', E'4 16 36', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000336', '00000000-0000-0000-0000-000000000213', E'10 20 30', E'100 400 900', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000337', '00000000-0000-0000-0000-000000000214', E'3 1 2 1 3 3', E'1: 2', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000338', '00000000-0000-0000-0000-000000000214', E'3 1 2 1 3 3', E'3: 3', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000339', '00000000-0000-0000-0000-000000000214', E'5 5 5', E'5: 3', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000340', '00000000-0000-0000-0000-000000000215', E'2 3
1 2 3
4 5 6', E'21', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000341', '00000000-0000-0000-0000-000000000215', E'1 1
7', E'7', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000342', '00000000-0000-0000-0000-000000000215', E'3 2
1 2
3 4
5 6', E'21', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000343', '00000000-0000-0000-0000-000000000216', E'Toi hoc Python', E'3', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000344', '00000000-0000-0000-0000-000000000216', E'Toi hoc Python', E'Python', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000345', '00000000-0000-0000-0000-000000000216', E'hello', E'hello', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000346', '00000000-0000-0000-0000-000000000217', E'3', E'**', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000347', '00000000-0000-0000-0000-000000000217', E'3', E'***', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000348', '00000000-0000-0000-0000-000000000217', E'5', E'*****', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000349', '00000000-0000-0000-0000-000000000218', E'20', E'1 4 9 16', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000350', '00000000-0000-0000-0000-000000000218', E'10', E'1 4 9', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000351', '00000000-0000-0000-0000-000000000218', E'1', E'1', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000352', '00000000-0000-0000-0000-000000000219', E'5 2 8 1 9', E'1 2 5 8 9', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000353', '00000000-0000-0000-0000-000000000219', E'5 2 8 1 9', E'9 1', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-000000000354', '00000000-0000-0000-0000-000000000219', E'3 1 2', E'3 1', true, 3);

-- ============================================================
-- PHẦN 2: KHÓA PYTHON NÂNG CAO (30 BÀI)
-- Designed for Tin học trẻ Bảng B & C
-- ============================================================

INSERT INTO error404labs.py_courses (id, title, slug, description, difficulty, published)
VALUES ( '00000000-0000-0000-0000-000000000002', 'Python Nâng Cao', 'python-nang-cao', 'Khóa học Python nâng cao dành cho thi Tin học trẻ Bảng B & C. Gồm module, xử lý lỗi, cấu trúc dữ liệu, giải thuật kinh điển, thuật toán nâng cao và luyện đề.', 'advanced', true );

INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES ( '00000000-0000-0000-0000-000000000A01', '00000000-0000-0000-0000-000000000002', 'Xử lý lỗi và Module', 'Xử lý ngoại lệ, import module, tự tạo thư viện hàm.', 1 );
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES ( '00000000-0000-0000-0000-000000000A02', '00000000-0000-0000-0000-000000000002', 'Cấu trúc dữ liệu', 'List nâng cao, Stack, Map/Filter, đếm tần suất, hai con trỏ, mảng cộng dồn.', 2 );
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES ( '00000000-0000-0000-0000-000000000A03', '00000000-0000-0000-0000-000000000002', 'Giải thuật kinh điển', 'Sắp xếp, tìm kiếm nhị phân, đệ quy, số nguyên tố, Fibonacci, UCLN, Palindrome.', 3 );
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES ( '00000000-0000-0000-0000-000000000A04', '00000000-0000-0000-0000-000000000002', 'Thuật toán nâng cao', 'Tham lam, sinh hoán vị/tổ hợp, QHĐ, sàng nguyên tố, sắp xếp, số lớn.', 4 );
INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)
VALUES ( '00000000-0000-0000-0000-000000000A05', '00000000-0000-0000-0000-000000000002', 'Luyện thi', 'Ôn tập tổng hợp, luyện đề Bảng B & Bảng C.', 5 );

-- CHƯƠNG 1: XỬ LÝ LỖI VÀ MODULE
-- Lesson 1: Xử lý ngoại lệ
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B001',
    '00000000-0000-0000-0000-000000000A01',
    'Xử lý ngoại lệ',
    'xu-ly-ngoai-le',
    'Try-except bắt lỗi',
    'theory',
    E'# Xử lý ngoại lệ

Khi code bị lỗi, chương trình sẽ dừng đột ngột. Dùng `try-except` để bắt lỗi:

```python
try:
    so = int(input())
    print(10 / so)
except ValueError:
    print("Loi: khong phai so!")
except ZeroDivisionError:
    print("Loi: chia cho 0!")
finally:
    print("Luon chay")
```

## Các loại lỗi thường gặp
- `ValueError`: sai kiểu dữ liệu
- `ZeroDivisionError`: chia cho 0
- `IndexError`: truy cập ngoài mảng
- `KeyError`: key không tồn tại trong dict',
    E'# Các loại ngoại lệ
def chia(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Khong the chia cho 0!"

print(chia(10, 2))
print(chia(10, 0))',
    'medium',10,8,'exact',10000,1,true
);

-- Lesson 2: Try-Except thực hành
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B002',
    '00000000-0000-0000-0000-000000000A01',
    'Try-Except thực hành',
    'try-except-thuc-hanh',
    'Thực hành bắt lỗi',
    'practice',
    E'# Try-Except thực hành

## Yêu cầu
Nhập hai số a, b. Tính a/b. Dùng try-except bắt:
- `ValueError`: in "Loi: khong phai so!"
- `ZeroDivisionError`: in "Loi: chia cho 0!"
- Thành công: in "Ket qua: {thuong}"

## Ví dụ
Input: 10 3 → Output: Ket qua: 3.3333333333333335
Input: 5 0 → Output: Loi: chia cho 0!',
    E'# Try-Except - Tinh thuong hai so
# Viet code',
    'medium',15,10,'contains',10000,2,true
);

-- Lesson 3: Module và import
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B003',
    '00000000-0000-0000-0000-000000000A01',
    'Module và import',
    'module-va-import',
    'Import math, random',
    'practice',
    E'# Module và import

Module trong Python là các thư viện có sẵn:
```python
import math
print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.14...

import random
print(random.randint(1, 10))  # so ngau nhien
```

## Yêu cầu
Nhập n, in ra:
- "Can bac 2: {sqrt(n)}" (lam tron 2 so)
- "Số ngau nhien: {so}" (1..n)

## Ví dụ
Input: 25
Output:
Can bac 2: 5.00
So ngau nhien: 17',
    E'import math
import random

n = int(input())
# Viet code',
    'medium',15,10,'contains',10000,3,true
);

-- Lesson 4: Thư viện hàm tự tạo
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B004',
    '00000000-0000-0000-0000-000000000A01',
    'Thư viện hàm tự tạo',
    'thu-vien-ham-tu-tao',
    'Viết hàm tiện ích',
    'practice',
    E'# Thư viện hàm tự tạo

## Yêu cầu
Viết 3 hàm:
1. `la_so_nguyen_to(n)` → True/False
2. `tong_uoc(n)` → tổng ước số (không kể n)
3. `so_hoan_hao(n)` → True nếu tổng ước = n

Nhập n, in:
- "{n} la/khong la so nguyen to"
- "Tong uoc: {tong}"
- "{n} la/khong la so hoan hao"

## Ví dụ
Input: 6
Output:
6 khong la so nguyen to
Tong uoc: 6
6 la so hoan hao',
    E'def la_so_nguyen_to(n):
    pass
def tong_uoc(n):
    pass
def so_hoan_hao(n):
    pass

n = int(input())
# In ket qua',
    'hard',20,15,'contains',10000,4,true
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C001', '00000000-0000-0000-0000-00000000B002', E'10 3', E'Ket qua', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C002', '00000000-0000-0000-0000-00000000B002', E'5 0', E'Loi: chia cho 0', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C003', '00000000-0000-0000-0000-00000000B002', E'a 2', E'Loi: khong phai so', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C004', '00000000-0000-0000-0000-00000000B003', E'25', E'5.00', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C005', '00000000-0000-0000-0000-00000000B003', E'25', E'So ngau nhien', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C006', '00000000-0000-0000-0000-00000000B003', E'100', E'10.00', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C007', '00000000-0000-0000-0000-00000000B004', E'6', E'khong la so nguyen to', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C008', '00000000-0000-0000-0000-00000000B004', E'6', E'Tong uoc: 6', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C009', '00000000-0000-0000-0000-00000000B004', E'28', E'so hoan hao', true, 3);

-- CHƯƠNG 2: CẤU TRÚC DỮ LIỆU
-- Lesson 5: List nâng cao
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B005',
    '00000000-0000-0000-0000-000000000A02',
    'List nâng cao',
    'list-nang-cao',
    'Sort, reverse, nested list',
    'theory',
    E'# List nâng cao

## Sắp xếp và đảo ngược
```python
so = [3, 1, 4, 1, 5]
so.sort()  # [1, 1, 3, 4, 5]
sorted_so = sorted(so, reverse=True)
```

## List lồng nhau
```python
matrix = [[1,2,3],[4,5,6]]
print(matrix[1][2])  # 6
```

## Các phương thức: append, insert, pop, remove, count, index, extend',
    E'so = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"Sap xep: {sorted(so)}")
print(f"Giam: {sorted(so, reverse=True)}")
print(f"Tong: {sum(so)}, Max: {max(so)}, Min: {min(so)}")',
    'medium',10,8,'exact',10000,5,true
);

-- Lesson 6: Stack và Queue
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B006',
    '00000000-0000-0000-0000-000000000A02',
    'Stack và Queue',
    'stack-va-queue',
    'Mô phỏng stack LIFO',
    'practice',
    E'# Stack và Queue

**Stack** (LIFO): append + pop

## Yêu cầu
Mô phỏng stack với lệnh:
- `push x`: thêm x
- `pop`: lấy ra (in giá trị, rỗng thì "Stack rong!")
- `exit`: kết thúc

## Ví dụ
Input:
push 1
push 2
pop
pop
pop
exit
Output:
2
1
Stack rong!',
    E'stack = []
while True:
    line = input()
    if line == "exit":
        break
    elif line.startswith("push "):
        pass
    elif line == "pop":
        pass',
    'hard',20,15,'contains',10000,6,true
);

-- Lesson 7: Map - Filter - Reduce
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B007',
    '00000000-0000-0000-0000-000000000A02',
    'Map - Filter - Reduce',
    'map-filter-reduce',
    'Xử lý dãy số với hàm bậc cao',
    'practice',
    E'# Map - Filter - Reduce

```python
so = [1,2,3,4,5,6]
# map: biến đổi
bp = list(map(lambda x: x*x, so))
# filter: lọc
chan = list(filter(lambda x: x%2==0, so))
```

## Yêu cầu
Nhập dãy số. In:
- Dòng 1: tổng số chẵn
- Dòng 2: tích số lẻ

## Ví dụ
Input: 1 2 3 4 5 6
Output:
12
15',
    E'from functools import reduce

# Nhập và xử lý',
    'hard',20,15,'contains',10000,7,true
);

-- Lesson 8: Đếm tần suất
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B008',
    '00000000-0000-0000-0000-000000000A02',
    'Đếm tần suất',
    'dem-tan-suat',
    'Đếm số lần xuất hiện',
    'practice',
    E'# Đếm tần suất

## Yêu cầu
Nhập chuỗi. Đếm từng ký tự (chỉ chữ cái, không phân biệt hoa/thường).
In: "{ky_tu}: {so_lan}" mỗi dòng, theo alphabet.

## Ví dụ
Input: Hello
Output:
e: 1
h: 1
l: 2
o: 1',
    E'# Đếm ký tự trong chuỗi (không phân biệt hoa thường)
s = input().lower()
# Viet code',
    'medium',15,12,'contains',10000,8,true
);

-- Lesson 9: Kỹ thuật hai con trỏ
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B009',
    '00000000-0000-0000-0000-000000000A02',
    'Kỹ thuật hai con trỏ',
    'ky-thuat-hai-con-tro',
    'Two Pointers cơ bản',
    'practice',
    E'# Kỹ thuật hai con trỏ (Two Pointers)

Kỹ thuật dùng 2 chỉ số i, j để duyệt mảng, thường dùng với mảng đã sắp xếp.

## Yêu cầu
Nhập mảng đã sắp xếp tăng dần (dòng 1) và số x (dòng 2). Tìm xem có cặp số nào tổng bằng x không. In "YES" hoặc "NO".

## Ví dụ
Input:
1 2 3 4 5 6
7
Output: YES (vì 1+6=7, 2+5=7, 3+4=7)

Input:
1 2 3 4 5 6
20
Output: NO',
    E'# Tìm cặp tổng bằng x dùng hai con trỏ
a = list(map(int, input().split()))
x = int(input())
i, j = 0, len(a)-1
# Viet code',
    'hard',25,15,'contains',10000,9,true
);

-- Lesson 10: Mảng cộng dồn
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B010',
    '00000000-0000-0000-0000-000000000A02',
    'Mảng cộng dồn',
    'mang-cong-don',
    'Prefix Sum',
    'practice',
    E'# Mảng cộng dồn (Prefix Sum)

Mảng cộng dồn giúp tính tổng đoạn nhanh: `prefix[i] = a[0] + ... + a[i]`.
Tổng từ l đến r = `prefix[r] - prefix[l-1]`.

## Yêu cầu
Nhập n (dòng 1), mảng a (dòng 2), q (dòng 3), và q cặp l r. Với mỗi cặp, in tổng từ a[l] đến a[r] (chỉ số 0-based).

## Ví dụ
Input:
5
1 2 3 4 5
2
0 2
1 4
Output:
6
14',
    E'# Tính tổng đoạn dùng prefix sum
n = int(input())
a = list(map(int, input().split()))
q = int(input())
# Tiền xử lý prefix[] rồi trả lời q truy vấn',
    'hard',25,15,'contains',10000,10,true
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C010', '00000000-0000-0000-0000-00000000B006', E'push 10
push 20
pop
exit', E'20', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C011', '00000000-0000-0000-0000-00000000B006', E'push 5
pop
pop
exit', E'Stack rong', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C012', '00000000-0000-0000-0000-00000000B006', E'pop
exit', E'Stack rong', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C013', '00000000-0000-0000-0000-00000000B007', E'1 2 3 4 5 6', E'12', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C014', '00000000-0000-0000-0000-00000000B007', E'1 2 3 4 5 6', E'15', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C015', '00000000-0000-0000-0000-00000000B007', E'2 4 6 8', E'20', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C016', '00000000-0000-0000-0000-00000000B008', E'Hello', E'e: 1', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C017', '00000000-0000-0000-0000-00000000B008', E'Hello', E'l: 2', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C018', '00000000-0000-0000-0000-00000000B008', E'aabbcc', E'c: 2', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C019', '00000000-0000-0000-0000-00000000B009', E'1 2 3 4 5 6
7', E'YES', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C020', '00000000-0000-0000-0000-00000000B009', E'1 2 3 4 5 6
20', E'NO', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C021', '00000000-0000-0000-0000-00000000B009', E'1 3 5 7 9
10', E'YES', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C022', '00000000-0000-0000-0000-00000000B010', E'5
1 2 3 4 5
2
0 2
1 4', E'6', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C023', '00000000-0000-0000-0000-00000000B010', E'5
1 2 3 4 5
2
0 2
1 4', E'14', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C024', '00000000-0000-0000-0000-00000000B010', E'3
10 20 30
1
0 2', E'60', true, 3);

-- CHƯƠNG 3: GIẢI THUẬT KINH ĐIỂN
-- Lesson 11: Sắp xếp
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B011',
    '00000000-0000-0000-0000-000000000A03',
    'Sắp xếp',
    'sap-xep',
    'Thực hành sorted()',
    'practice',
    E'# Sắp xếp

## Yêu cầu
Nhập dãy số (1 dòng). In ra:
- Dòng 1: tăng dần
- Dòng 2: giảm dần

## Ví dụ
Input: 5 2 8 1 9 3
Output:
1 2 3 5 8 9
9 8 5 3 2 1',
    E'# Nhập dãy số, in tăng và giảm
numbers = list(map(int, input().split()))
# Viet code',
    'medium',15,10,'contains',10000,11,true
);

-- Lesson 12: Tìm kiếm nhị phân
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B012',
    '00000000-0000-0000-0000-000000000A03',
    'Tìm kiếm nhị phân',
    'tim-kiem-nhi-phan',
    'Binary Search',
    'practice',
    E'# Tìm kiếm nhị phân

```python
def binary_search(arr, x):
    left, right = 0, len(arr)-1
    while left <= right:
        mid = (left+right)//2
        if arr[mid] == x: return mid
        elif arr[mid] < x: left = mid+1
        else: right = mid-1
    return -1
```

## Yêu cầu
Nhập dãy số (sorted) và x. In vị trí hoặc "Khong tim thay".

## Ví dụ
Input:
1 3 5 7 9 11
5
Output: 2',
    E'def binary_search(arr, x):
    pass

# Nhập và in kết quả',
    'hard',20,15,'contains',10000,12,true
);

-- Lesson 13: Đệ quy
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B013',
    '00000000-0000-0000-0000-000000000A03',
    'Đệ quy',
    'de-quy',
    'Đệ quy tính giai thừa',
    'practice',
    E'# Đệ quy (Recursion)

Hàm gọi chính nó. Cần **base case** để dừng.

## Yêu cầu
Viết hàm đệ quy `giai_thua(n)` tính n! (với n >= 0).

Nhập n, in ra n!

## Ví dụ
Input: 5
Output: 120',
    E'def giai_thua(n):
    pass

n = int(input())
print(giai_thua(n))',
    'medium',15,10,'contains',10000,13,true
);

-- Lesson 14: Tìm kiếm chuỗi con
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B014',
    '00000000-0000-0000-0000-000000000A03',
    'Tìm kiếm chuỗi con',
    'tim-kiem-chuoi-con',
    'Tìm vị trí xuất hiện',
    'practice',
    E'# Tìm kiếm chuỗi con

## Yêu cầu
Nhập chuỗi S (dòng 1) và chuỗi T (dòng 2). In các vị trí T xuất hiện trong S, cách nhau khoảng trắng. Không tìm thấy in -1.

## Ví dụ
Input:
abcabcabc
abc
Output: 0 3 6

Input:
Python
Java
Output: -1',
    E'# Tìm vị trí chuỗi con
S = input().strip()
T = input().strip()
# Viet code',
    'medium',15,12,'contains',10000,14,true
);

-- Lesson 15: Số nguyên tố
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B015',
    '00000000-0000-0000-0000-000000000A03',
    'Số nguyên tố',
    'so-nguyen-to',
    'Kiểm tra và in số nguyên tố',
    'practice',
    E'# Số nguyên tố

Số nguyên tố > 1, chỉ chia hết cho 1 và chính nó.

## Yêu cầu
Nhập n, in các số nguyên tố từ 2 đến n (cách nhau khoảng trắng).

## Ví dụ
Input: 20
Output: 2 3 5 7 11 13 17 19',
    E'# In số nguyên tố từ 2 đến n
n = int(input())
# Viet code',
    'medium',15,12,'contains',10000,15,true
);

-- Lesson 16: Dãy Fibonacci
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B016',
    '00000000-0000-0000-0000-000000000A03',
    'Dãy Fibonacci',
    'day-fibonacci',
    'In n số Fibonacci',
    'practice',
    E'# Dãy Fibonacci

F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)

## Yêu cầu
Nhập n, in n số Fibonacci đầu tiên (cách nhau khoảng trắng).

## Ví dụ
Input: 8
Output: 0 1 1 2 3 5 8 13',
    E'# In n số Fibonacci đầu tiên
n = int(input())
# Viet code',
    'medium',15,12,'contains',10000,16,true
);

-- Lesson 17: UCLN và BCNN
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B017',
    '00000000-0000-0000-0000-000000000A03',
    'UCLN và BCNN',
    'ucln-va-bcnn',
    'Thuật toán Euclid',
    'practice',
    E'# UCLN và BCNN

Thuật toán Euclid:
```python
def ucln(a, b):
    while b:
        a, b = b, a % b
    return a
```
BCNN = a * b / UCLN

## Yêu cầu
Nhập a, b. In "UCLN: {kq}" và "BCNN: {kq}".

## Ví dụ
Input:
12
18
Output:
UCLN: 6
BCNN: 36',
    E'def ucln(a, b):
    pass

a = int(input())
b = int(input())
# In UCLN và BCNN',
    'medium',15,10,'contains',10000,17,true
);

-- Lesson 18: Kiểm tra Palindrome
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B018',
    '00000000-0000-0000-0000-000000000A03',
    'Kiểm tra Palindrome',
    'kiem-tra-palindrome',
    'Chuỗi đối xứng',
    'practice',
    E'# Kiểm tra Palindrome

Palindrome đọc xuôi ngược đều giống nhau: radar, madam, 12321.

## Yêu cầu
Nhập chuỗi. Bỏ qua khoảng trắng và viết hoa/thường. In "YES" hoặc "NO".

## Ví dụ
Input: radar
Output: YES

Input: Python
Output: NO',
    E'# Kiểm tra Palindrome (chuỗi đối xứng)
s = input().strip()
# Viet code',
    'medium',15,10,'contains',10000,18,true
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C025', '00000000-0000-0000-0000-00000000B011', E'5 2 8 1 9 3', E'1 2 3 5 8 9', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C026', '00000000-0000-0000-0000-00000000B011', E'5 2 8 1 9 3', E'9 8 5 3 2 1', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C027', '00000000-0000-0000-0000-00000000B011', E'3 1 2', E'1 2 3', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C028', '00000000-0000-0000-0000-00000000B012', E'1 3 5 7 9 11
5', E'2', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C029', '00000000-0000-0000-0000-00000000B012', E'1 3 5 7 9 11
6', E'Khong tim thay', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C030', '00000000-0000-0000-0000-00000000B012', E'1 3 5 7 9 11
11', E'5', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C031', '00000000-0000-0000-0000-00000000B013', E'5', E'120', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C032', '00000000-0000-0000-0000-00000000B013', E'0', E'1', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C033', '00000000-0000-0000-0000-00000000B013', E'7', E'5040', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C034', '00000000-0000-0000-0000-00000000B014', E'abcabcabc
abc', E'0 3 6', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C035', '00000000-0000-0000-0000-00000000B014', E'Python
Java', E'-1', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C036', '00000000-0000-0000-0000-00000000B014', E'aaaa
aa', E'0 1 2', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C037', '00000000-0000-0000-0000-00000000B015', E'20', E'2 3 5 7 11 13 17 19', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C038', '00000000-0000-0000-0000-00000000B015', E'5', E'2 3 5', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C039', '00000000-0000-0000-0000-00000000B015', E'1', E'', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C040', '00000000-0000-0000-0000-00000000B016', E'8', E'0 1 1 2 3 5 8 13', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C041', '00000000-0000-0000-0000-00000000B016', E'1', E'0', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C042', '00000000-0000-0000-0000-00000000B016', E'5', E'0 1 1 2 3', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C043', '00000000-0000-0000-0000-00000000B017', E'12
18', E'UCLN: 6', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C044', '00000000-0000-0000-0000-00000000B017', E'12
18', E'BCNN: 36', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C045', '00000000-0000-0000-0000-00000000B017', E'7
13', E'UCLN: 1', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C046', '00000000-0000-0000-0000-00000000B018', E'radar', E'YES', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C047', '00000000-0000-0000-0000-00000000B018', E'Python', E'NO', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C048', '00000000-0000-0000-0000-00000000B018', E'Racecar', E'YES', true, 3);

-- CHƯƠNG 4: THUẬT TOÁN NÂNG CAO CHO THI
-- Lesson 19: Thuật toán tham lam
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B019',
    '00000000-0000-0000-0000-000000000A04',
    'Thuật toán tham lam',
    'thuat-toan-tham-lam',
    'Greedy cơ bản',
    'practice',
    E'# Thuật toán tham lam (Greedy)

Thuật toán tham lam chọn phương án **tốt nhất tại mỗi bước** để đạt kết quả tối ưu toàn cục.

## Yêu cầu
Một máy ATM có các tờ tiền: 500, 200, 100, 50, 20, 10.
Nhập số tiền n, in ra số tờ tiền **ít nhất** để đổi được n.
Nếu không thể đổi, in "-1".

## Ví dụ
Input: 750
Output: 4 (1 to 500 + 1 to 200 + 1 to 50)

Input: 30
Output: 3 (1 to 20 + 1 to 10)',
    E'# Đổi tiền ATM - tham lam
menh_gia = [500, 200, 100, 50, 20, 10]
n = int(input())
# Viet code',
    'hard',25,15,'contains',10000,19,true
);

-- Lesson 20: Sinh hoán vị
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B020',
    '00000000-0000-0000-0000-000000000A04',
    'Sinh hoán vị',
    'sinh-hoan-vi',
    'Sinh tất cả hoán vị',
    'practice',
    E'# Sinh hoán vị (Permutation)

Dùng `itertools.permutations` hoặc đệ quy để sinh hoán vị.

## Yêu cầu
Nhập n, in ra tất cả hoán vị của 1..n, mỗi hoán vị trên một dòng, các số cách nhau khoảng trắng.

## Ví dụ
Input: 3
Output:
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1',
    E'# Sinh hoán vị 1..n
from itertools import permutations
n = int(input())
# Viet code',
    'hard',25,15,'contains',10000,20,true
);

-- Lesson 21: Sinh tổ hợp
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B021',
    '00000000-0000-0000-0000-000000000A04',
    'Sinh tổ hợp',
    'sinh-to-hop',
    'Sinh tổ hợp chập k',
    'practice',
    E'# Sinh tổ hợp (Combination)

Dùng `itertools.combinations` để sinh tổ hợp.

## Yêu cầu
Nhập n và k. In ra tất cả tổ hợp chập k của 1..n, mỗi tổ hợp trên một dòng.

## Ví dụ
Input:
4 2
Output:
1 2
1 3
1 4
2 3
2 4
3 4',
    E'# Sinh tổ hợp chập k của n
from itertools import combinations
n, k = map(int, input().split())
# Viet code',
    'hard',25,15,'contains',10000,21,true
);

-- Lesson 22: Quy hoạch động cơ bản
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B022',
    '00000000-0000-0000-0000-000000000A04',
    'Quy hoạch động cơ bản',
    'quy-hoach-dong-co-ban',
    'QHĐ với Fibonacci',
    'practice',
    E'# Quy hoạch động (Dynamic Programming)

QHĐ giải bài toán bằng cách lưu kết quả các bài toán con để tái sử dụng.

## Yêu cầu
Tính Fibonacci thứ n (n ≤ 90) bằng QHĐ (dùng vòng lặp, mảng). In F(n).
Lưu ý: F(0)=0, F(1)=1.

## Ví dụ
Input: 50
Output: 12586269025',
    E'# Fibonacci với QHĐ
n = int(input())
# Dùng mảng hoặc 2 biến để tính',
    'hard',25,15,'contains',10000,22,true
);

-- Lesson 23: QHĐ - Dãy con
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B023',
    '00000000-0000-0000-0000-000000000A04',
    'QHĐ - Dãy con',
    'qhd-day-con',
    'Dãy con tăng dài nhất',
    'practice',
    E'# QHĐ - Dãy con tăng dài nhất (LIS)

Tìm độ dài dãy con tăng dần dài nhất (không nhất thiết liên tiếp).

## Yêu cầu
Nhập n (dòng 1) và dãy a (dòng 2). In độ dài dãy con tăng dài nhất.

## Ví dụ
Input:
8
10 22 9 33 21 50 41 60
Output: 5',
    E'# Dãy con tăng dài nhất (LIS)
n = int(input())
a = list(map(int, input().split()))
# Viet code QHD',
    'hard',30,20,'contains',10000,23,true
);

-- Lesson 24: Sàng nguyên tố
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B024',
    '00000000-0000-0000-0000-000000000A04',
    'Sàng nguyên tố',
    'sang-nguyen-to',
    'Sàng Eratosthenes',
    'practice',
    E'# Sàng nguyên tố (Eratosthenes)

Sàng giúp tìm tất cả số nguyên tố ≤ n với độ phức tạp O(n log log n).

## Yêu cầu
Nhập n, in ra số lượng số nguyên tố từ 1 đến n.

## Ví dụ
Input: 20
Output: 8 (2,3,5,7,11,13,17,19)',
    E'# Sàng Eratosthenes đếm số nguyên tố
n = int(input())
# Viết sàng',
    'medium',20,12,'contains',10000,24,true
);

-- Lesson 25: Sắp xếp nổi bọt
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B025',
    '00000000-0000-0000-0000-000000000A04',
    'Sắp xếp nổi bọt',
    'sap-xep-noi-bot',
    'Bubble Sort tự cài',
    'practice',
    E'# Sắp xếp nổi bọt (Bubble Sort)

Cài đặt giải thuật sắp xếp bằng tay:

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(n-1-i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
```

## Yêu cầu
Nhập dãy số, in dãy đã sắp xếp tăng dần.

## Ví dụ
Input: 5 2 9 1 7 3
Output: 1 2 3 5 7 9',
    E'def bubble_sort(arr):
    pass

# Nhập và in',
    'hard',20,15,'contains',10000,25,true
);

-- Lesson 26: Xử lý số lớn
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B026',
    '00000000-0000-0000-0000-000000000A04',
    'Xử lý số lớn',
    'xu-ly-so-lon',
    'Tính toán với số lớn',
    'practice',
    E'# Xử lý số lớn

Python mặc định hỗ trợ số nguyên lớn không giới hạn.

## Yêu cầu
Nhập n. Tính n! (n giai thừa). In kết quả.
n có thể tới 1000, kết quả có thể rất lớn.

## Ví dụ
Input: 10
Output: 3628800',
    E'# Tính n! (với n lớn)
n = int(input())
# Python tự xử lý số lớn',
    'medium',15,10,'contains',10000,26,true
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C049', '00000000-0000-0000-0000-00000000B019', E'750', E'4', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C050', '00000000-0000-0000-0000-00000000B019', E'30', E'3', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C051', '00000000-0000-0000-0000-00000000B019', E'3', E'-1', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C052', '00000000-0000-0000-0000-00000000B020', E'3', E'1 2 3', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C053', '00000000-0000-0000-0000-00000000B020', E'3', E'3 2 1', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C054', '00000000-0000-0000-0000-00000000B020', E'2', E'2 1', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C055', '00000000-0000-0000-0000-00000000B021', E'4 2', E'1 2', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C056', '00000000-0000-0000-0000-00000000B021', E'4 2', E'3 4', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C057', '00000000-0000-0000-0000-00000000B021', E'3 3', E'1 2 3', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C058', '00000000-0000-0000-0000-00000000B022', E'50', E'12586269025', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C059', '00000000-0000-0000-0000-00000000B022', E'10', E'55', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C060', '00000000-0000-0000-0000-00000000B022', E'90', E'2880067194370816120', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C061', '00000000-0000-0000-0000-00000000B023', E'8
10 22 9 33 21 50 41 60', E'5', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C062', '00000000-0000-0000-0000-00000000B023', E'4
1 2 3 4', E'4', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C063', '00000000-0000-0000-0000-00000000B023', E'4
4 3 2 1', E'1', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C064', '00000000-0000-0000-0000-00000000B024', E'20', E'8', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C065', '00000000-0000-0000-0000-00000000B024', E'10', E'4', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C066', '00000000-0000-0000-0000-00000000B024', E'2', E'1', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C067', '00000000-0000-0000-0000-00000000B025', E'5 2 9 1 7 3', E'1 2 3 5 7 9', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C068', '00000000-0000-0000-0000-00000000B025', E'3 1 2', E'1 2 3', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C069', '00000000-0000-0000-0000-00000000B025', E'1 2 3', E'1 2 3', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C070', '00000000-0000-0000-0000-00000000B026', E'10', E'3628800', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C071', '00000000-0000-0000-0000-00000000B026', E'5', E'120', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C072', '00000000-0000-0000-0000-00000000B026', E'0', E'1', true, 3);

-- CHƯƠNG 5: LUYỆN THI
-- Lesson 27: Ôn tập: Module & CTDL
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B027',
    '00000000-0000-0000-0000-000000000A05',
    'Ôn tập: Module & CTDL',
    'on-tap-module-ctdl',
    'Ôn tập kiến thức đã học',
    'theory',
    E'# Ôn tập: Module & CTDL

## Module & Xử lý lỗi
- `import math`, `import random`
- `try-except` bắt lỗi
- Tự viết hàm tiện ích

## Cấu trúc dữ liệu
- List: sort, append, pop, insert
- Stack (LIFO), Queue (FIFO)
- Map, Filter, Reduce
- Đếm tần suất bằng dict
- Hai con trỏ, Mảng cộng dồn',
    E'print("On tap Module & CTDL")',
    'easy',10,5,'exact',10000,27,true
);

-- Lesson 28: Ôn tập: Giải thuật
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B028',
    '00000000-0000-0000-0000-000000000A05',
    'Ôn tập: Giải thuật',
    'on-tap-giai-thuat',
    'Ôn tập các giải thuật',
    'theory',
    E'# Ôn tập: Giải thuật

## Giải thuật kinh điển
- Sắp xếp (sorted, bubble sort)
- Tìm kiếm nhị phân (Binary Search)
- Đệ quy (giai thừa, Fibonacci)
- Tìm kiếm chuỗi con
- Số nguyên tố, Sàng Eratosthenes
- Dãy Fibonacci
- UCLN (Euclid)
- Palindrome

## Nâng cao
- Tham lam (Greedy)
- Sinh hoán vị, tổ hợp
- QHĐ (DP) - Fibonacci, LIS
- Xử lý số lớn',
    E'print("On tap Giai thuat")',
    'easy',10,5,'exact',10000,28,true
);

-- Lesson 29: Luyện đề Bảng B
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B029',
    '00000000-0000-0000-0000-000000000A05',
    'Luyện đề Bảng B',
    'luyen-de-bang-b',
    'Đề thi thử THCS',
    'project',
    E'# Luyện đề Bảng B

Giải đề thi Tin học trẻ **Bảng B (THCS)**:

## Đề bài
Nhập n và dãy a gồm n số nguyên.

1. In ra các số chính phương trong dãy
2. In ra số xuất hiện nhiều nhất (có thể có nhiều số)
3. Kiểm tra xem dãy có tạo thành cấp số cộng không (các số cách đều)

## Ví dụ
Input:
6
1 4 7 9 10 13
Output:
1 4 9
1
YES',
    E'# Giải đề thi Bảng B
n = int(input())
a = list(map(int, input().split()))
# Viet code',
    'hard',50,30,'contains',20000,29,true
);

-- Lesson 30: Luyện đề Bảng C
INSERT INTO error404labs.py_lessons (id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published)
VALUES (
    '00000000-0000-0000-0000-00000000B030',
    '00000000-0000-0000-0000-000000000A05',
    'Luyện đề Bảng C',
    'luyen-de-bang-c',
    'Đề thi thử THPT',
    'project',
    E'# Luyện đề Bảng C

Giải đề thi Tin học trẻ **Bảng C (THPT)**:

## Đề bài
Nhập n và dãy a gồm n số nguyên (1 ≤ n ≤ 10^5).

1. In YES nếu dãy đã được sắp xếp tăng dần, NO nếu không
2. Tìm đoạn con liên tiếp có tổng lớn nhất (Kadane)
3. Đếm số cặp (i,j) với i<j và a[i]+a[j] = x (x nhập từ bàn phím)

## Ví dụ
Input:
6
1 4 2 5 3 6
7
Output:
NO
12 (do 4+2+5+1=12... hoặc day con max: 4+2+5+3+6=20...)
2 (cap 1+6, 4+3)',
    E'# Giải đề thi Bảng C
n = int(input())
a = list(map(int, input().split()))
x = int(input())
# Viet code giai 3 cau',
    'hard',50,30,'contains',20000,30,true
);

INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C073', '00000000-0000-0000-0000-00000000B029', E'6
1 4 7 9 10 13', E'1 4 9', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C074', '00000000-0000-0000-0000-00000000B029', E'6
1 4 7 9 10 13', E'1', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C075', '00000000-0000-0000-0000-00000000B029', E'3
1 3 5', E'YES', true, 3);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C076', '00000000-0000-0000-0000-00000000B030', E'6
1 4 2 5 3 6
7', E'NO', false, 1);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C077', '00000000-0000-0000-0000-00000000B030', E'6
1 4 2 5 3 6
7', E'2', false, 2);
INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)
VALUES ('00000000-0000-0000-0000-00000000C078', '00000000-0000-0000-0000-00000000B030', E'5
1 2 3 4 5
9', E'2', true, 3);
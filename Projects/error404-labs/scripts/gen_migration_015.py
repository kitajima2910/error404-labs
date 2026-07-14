"""Generate migration 015: add 10 lessons to Python Co Ban + create Python Nang Cao (30 lessons for Tin học trẻ)"""
import os

# -- UUIDs --
C1 = '00000000-0000-0000-0000-000000000001'
C2 = '00000000-0000-0000-0000-000000000002'

# Chapters
C1_CH104 = '00000000-0000-0000-0000-000000000104'
C2_CH_A01 = '00000000-0000-0000-0000-000000000A01'  # Xử lý lỗi & Module
C2_CH_A02 = '00000000-0000-0000-0000-000000000A02'  # Cấu trúc dữ liệu
C2_CH_A03 = '00000000-0000-0000-0000-000000000A03'  # Giải thuật kinh điển
C2_CH_A04 = '00000000-0000-0000-0000-000000000A04'  # Thuật toán nâng cao cho thi
C2_CH_A05 = '00000000-0000-0000-0000-000000000A05'  # Luyện thi

# Lesson ID prefixes
C1_L = '00000000-0000-0000-0000-0000000002'  # 11-20
C2_L = '00000000-0000-0000-0000-00000000B0'  # 01-30
# Test case ID prefixes
C1_TC = '00000000-0000-0000-0000-0000000003'  # 28-51
C2_TC = '00000000-0000-0000-0000-00000000C0'  # 01-78


# ========== HELPERS ==========

def esc(text):
    """Escape string for PostgreSQL E'...' syntax."""
    return text.replace("\\", "\\\\").replace("'", "''").replace("\n", "\n")

def make_lesson_insert(uid, chapter_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order):
    cols = "id, chapter_id, title, slug, description, lesson_type, content_markdown, starter_code, difficulty, xp_reward, estimated_minutes, comparison_mode, time_limit_ms, order_index, published"
    return (
        f"INSERT INTO error404labs.py_lessons ({cols})\n"
        f"VALUES (\n"
        f"    '{uid}',\n"
        f"    '{chapter_id}',\n"
        f"    '{title}',\n"
        f"    '{slug}',\n"
        f"    '{desc}',\n"
        f"    '{ltype}',\n"
        f"    E'{esc(content)}',\n"
        f"    E'{esc(starter)}',\n"
        f"    '{diff}',{xp},{mins},'{comp}',{tlim},{order},true\n"
        f");"
    )

def make_tc(uid, lesson_id, stdin, expected, hidden, order):
    return (
        f"INSERT INTO error404labs.py_test_cases (id, lesson_id, stdin, expected_output, is_hidden, order_index)\n"
        f"VALUES ('{uid}', '{lesson_id}', E'{esc(stdin)}', E'{esc(expected)}', {str(hidden).lower()}, {order});"
    )


# ========== PART 1: ADD 10 LESSONS TO PYTHON CO BAN ==========
# (Same as before — Chapter 104 + Lessons 11-20 + test cases)

part1_lessons = [
    # (uid suffix, chapter_id, title, slug, desc, type, content, starter, diff, xp, mins, comp, tlim, order)
    (11, C1_CH104, 'Cắt chuỗi và định dạng', 'cat-chuoi-va-dinh-dang', 'Kỹ thuật slicing và f-strings', 'practice',
     """# Cắt chuỗi và định dạng

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
Output: Đầu: Pyt, Cuối: hon, Đảo: nohtyP""",
     """# Viết chương trình cắt chuỗi dùng slicing

# Viết code của bạn ở dưới:""",
     'medium',15,10,'contains',10000,11),

    (12, C1_CH104, 'List Comprehension', 'list-comprehension', 'Tạo list nhanh với comprehension', 'practice',
     """# List Comprehension

Cách viết gọn để tạo list từ iterable:
```python
so_chan = [x for x in range(20) if x % 2 == 0]
```

## Yêu cầu

Nhập n, tạo list các **số chẵn** từ 0 đến n bằng list comprehension và in ra.

## Ví dụ

Input: 10 → Output: [0, 2, 4, 6, 8, 10]""",
     """# Viết chương trình dùng list comprehension tạo số chẵn từ 0 đến n

# Viết code của bạn ở dưới:""",
     'medium',15,10,'contains',10000,12),

    (13, C1_CH104, 'Hàm Lambda', 'ham-lambda', 'Viết hàm ẩn danh với lambda', 'practice',
     """# Hàm Lambda

Lambda là hàm ẩn danh: `lambda x: x * x`
Kết hợp với `map()` và `filter()`:
```python
bp = list(map(lambda x: x*x, [1, 2, 3]))  # [1, 4, 9]
```

## Yêu cầu

Nhập dãy số (1 dòng, cách nhau khoảng trắng). Dùng `map()` với lambda tính bình phương mỗi số và in list kết quả.

## Ví dụ

Input: 1 2 3 4 5 → Output: Binh phuong: 1 4 9 16 25""",
     """# Viết chương trình dùng lambda và map() tính bình phương
numbers = list(map(int, input().split()))
# Viết tiếp""",
     'hard',20,12,'contains',10000,13),

    (14, C1_CH104, 'Dictionary nâng cao', 'dictionary-nang-cao', 'Xử lý dữ liệu với dict', 'practice',
     """# Dictionary nâng cao

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
3: 3""",
     """# Đếm tần suất bằng dict
numbers = list(map(int, input().split()))
# Viết code""",
     'medium',15,12,'contains',10000,14),

    (15, C1_CH104, 'Xử lý ma trận', 'xu-ly-ma-tran', 'Làm việc với mảng 2 chiều', 'practice',
     """# Xử lý ma trận

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
Output: 21""",
     """# Tính tổng ma trận
n, m = map(int, input().split())
tong = 0
# Viết tiếp""",
     'medium',15,12,'contains',10000,15),

    (16, C1_CH104, 'Xử lý chuỗi nâng cao', 'xu-ly-chuoi-nang-cao', 'Các thao tác xử lý chuỗi', 'practice',
     """# Xử lý chuỗi nâng cao

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
Python""",
     """# Đếm số từ và in từng từ
s = input().strip()
# Viết code""",
     'medium',15,10,'contains',10000,16),

    (17, C1_CH104, 'Vẽ hình với vòng lặp', 've-hinh-voi-vong-lap', 'In ra các hình bằng vòng lặp', 'practice',
     """# Vẽ hình với vòng lặp

## Yêu cầu

Nhập n, in ra tam giác vuông đặc có chiều cao n bằng dấu `*`

## Ví dụ

Input: 4
Output:
*
**
***
****""",
     """# Vẽ tam giác vuông
n = int(input())
# Viết code""",
     'medium',15,10,'contains',10000,17),

    (18, C1_CH104, 'Số chính phương', 'so-chinh-phuong', 'Kiểm tra số chính phương', 'practice',
     """# Số chính phương

Số chính phương là bình phương của một số nguyên: 0, 1, 4, 9, 16...

## Yêu cầu

Nhập n, in ra các số chính phương từ 1 đến n (cách nhau khoảng trắng).
Dùng `int(sqrt(n))**2 == n` để kiểm tra.

## Ví dụ

Input: 20
Output: 1 4 9 16""",
     """# In số chính phương từ 1 đến n
import math
n = int(input())
# Viết code""",
     'easy',10,8,'contains',10000,18),

    (19, C1_CH104, 'Hoán đổi và sắp xếp', 'hoan-doi-va-sap-xep', 'Kỹ thuật swap và sort cơ bản', 'practice',
     """# Hoán đổi và sắp xếp

## Yêu cầu

Nhập dãy số, in ra:
- Dòng 1: dãy đã sắp xếp tăng dần
- Dòng 2: số lớn nhất và số nhỏ nhất

## Ví dụ

Input: 5 2 8 1 9
Output:
1 2 5 8 9
9 1""",
     """# Sắp xếp và tìm min, max
numbers = list(map(int, input().split()))
# Viết code""",
     'easy',10,8,'contains',10000,19),

    (20, C1_CH104, 'Ôn tập Python Cơ Bản', 'on-tap-python-co-ban', 'Tổng kết kiến thức đã học', 'theory',
     """# Ôn tập Python Cơ Bản

Chúc mừng bạn đã hoàn thành khóa **Python Cơ Bản**!

## Những gì đã học:
1. Biến, kiểu dữ liệu, print, input
2. If-else, for, while, break
3. Hàm, list, tuple, set, dictionary
4. Xử lý chuỗi: slicing, split, join
5. List comprehension, lambda, map

Hãy chuyển sang khóa **Python Nâng Cao** để luyện thi Tin học trẻ!""",
     """print("Hoàn thanh Python Co Ban!")""",
     'easy',10,5,'exact',10000,20),
]

# Test cases for Part 1 lessons (order 11-20)
part1_tcs = [
    (28, 11, 'Python', 'Đầu: Pyt', False, 1),
    (29, 11, 'Python', 'Đảo: nohtyP', False, 2),
    (30, 11, 'abcdef', 'Cuối: def', True, 3),
    (31, 12, '10', '0, 2, 4, 6, 8, 10', False, 1),
    (32, 12, '5', '0, 2, 4', False, 2),
    (33, 12, '1', '0', True, 3),
    (34, 13, '1 2 3 4 5', '1 4 9 16 25', False, 1),
    (35, 13, '2 4 6', '4 16 36', False, 2),
    (36, 13, '10 20 30', '100 400 900', True, 3),
    (37, 14, '3 1 2 1 3 3', '1: 2', False, 1),
    (38, 14, '3 1 2 1 3 3', '3: 3', False, 2),
    (39, 14, '5 5 5', '5: 3', True, 3),
    (40, 15, '2 3\n1 2 3\n4 5 6', '21', False, 1),
    (41, 15, '1 1\n7', '7', False, 2),
    (42, 15, '3 2\n1 2\n3 4\n5 6', '21', True, 3),
    (43, 16, 'Toi hoc Python', '3', False, 1),
    (44, 16, 'Toi hoc Python', 'Python', False, 2),
    (45, 16, 'hello', 'hello', True, 3),
    (46, 17, '3', '**', False, 1),
    (47, 17, '3', '***', False, 2),
    (48, 17, '5', '*****', True, 3),
    (49, 18, '20', '1 4 9 16', False, 1),
    (50, 18, '10', '1 4 9', False, 2),
    (51, 18, '1', '1', True, 3),
    (52, 19, '5 2 8 1 9', '1 2 5 8 9', False, 1),
    (53, 19, '5 2 8 1 9', '9 1', False, 2),
    (54, 19, '3 1 2', '3 1', True, 3),
]


# ========== PART 2: PYTHON NANG CAO - TIN HOC TRE EDITION ==========

# Chapter A01: Xử lý lỗi & Module (4 bài)
a01_lessons = [
    # 1 - Xử lý ngoại lệ (theory)
    (1, C2_CH_A01, 'Xử lý ngoại lệ', 'xu-ly-ngoai-le', 'Try-except bắt lỗi', 'theory',
     """# Xử lý ngoại lệ

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
- `KeyError`: key không tồn tại trong dict""",
     """# Các loại ngoại lệ
def chia(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Khong the chia cho 0!"

print(chia(10, 2))
print(chia(10, 0))""",
     'medium',10,8,'exact',10000,1),

    # 2 - Try-Except thực hành
    (2, C2_CH_A01, 'Try-Except thực hành', 'try-except-thuc-hanh', 'Thực hành bắt lỗi', 'practice',
     """# Try-Except thực hành

## Yêu cầu
Nhập hai số a, b. Tính a/b. Dùng try-except bắt:
- `ValueError`: in "Loi: khong phai so!"
- `ZeroDivisionError`: in "Loi: chia cho 0!"
- Thành công: in "Ket qua: {thuong}"

## Ví dụ
Input: 10 3 → Output: Ket qua: 3.3333333333333335
Input: 5 0 → Output: Loi: chia cho 0!""",
     """# Try-Except - Tinh thuong hai so
# Viet code""",
     'medium',15,10,'contains',10000,2),

    # 3 - Module và import
    (3, C2_CH_A01, 'Module và import', 'module-va-import', 'Import math, random', 'practice',
     """# Module và import

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
So ngau nhien: 17""",
     """import math
import random

n = int(input())
# Viet code""",
     'medium',15,10,'contains',10000,3),

    # 4 - Thư viện hàm tự tạo
    (4, C2_CH_A01, 'Thư viện hàm tự tạo', 'thu-vien-ham-tu-tao', 'Viết hàm tiện ích', 'practice',
     """# Thư viện hàm tự tạo

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
6 la so hoan hao""",
     """def la_so_nguyen_to(n):
    pass
def tong_uoc(n):
    pass
def so_hoan_hao(n):
    pass

n = int(input())
# In ket qua""",
     'hard',20,15,'contains',10000,4),
]

a01_tcs = [
    (1, 2, '10 3', 'Ket qua', False, 1),
    (2, 2, '5 0', 'Loi: chia cho 0', False, 2),
    (3, 2, 'a 2', 'Loi: khong phai so', True, 3),
    (4, 3, '25', '5.00', False, 1),
    (5, 3, '25', 'So ngau nhien', False, 2),
    (6, 3, '100', '10.00', True, 3),
    (7, 4, '6', 'khong la so nguyen to', False, 1),
    (8, 4, '6', 'Tong uoc: 6', False, 2),
    (9, 4, '28', 'so hoan hao', True, 3),
]

# Chapter A02: Cấu trúc dữ liệu (6 bài)
a02_lessons = [
    # 5 - List nâng cao (theory)
    (5, C2_CH_A02, 'List nâng cao', 'list-nang-cao', 'Sort, reverse, nested list', 'theory',
     """# List nâng cao

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

## Các phương thức: append, insert, pop, remove, count, index, extend""",
     """so = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"Sap xep: {sorted(so)}")
print(f"Giam: {sorted(so, reverse=True)}")
print(f"Tong: {sum(so)}, Max: {max(so)}, Min: {min(so)}")""",
     'medium',10,8,'exact',10000,5),

    # 6 - Stack và Queue
    (6, C2_CH_A02, 'Stack và Queue', 'stack-va-queue', 'Mô phỏng stack LIFO', 'practice',
     """# Stack và Queue

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
Stack rong!""",
     """stack = []
while True:
    line = input()
    if line == "exit":
        break
    elif line.startswith("push "):
        pass
    elif line == "pop":
        pass""",
     'hard',20,15,'contains',10000,6),

    # 7 - Map, Filter, Reduce
    (7, C2_CH_A02, 'Map - Filter - Reduce', 'map-filter-reduce', 'Xử lý dãy số với hàm bậc cao', 'practice',
     """# Map - Filter - Reduce

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
15""",
     """from functools import reduce

# Nhập và xử lý""",
     'hard',20,15,'contains',10000,7),

    # 8 - Đếm tần suất
    (8, C2_CH_A02, 'Đếm tần suất', 'dem-tan-suat', 'Đếm số lần xuất hiện', 'practice',
     """# Đếm tần suất

## Yêu cầu
Nhập chuỗi. Đếm từng ký tự (chỉ chữ cái, không phân biệt hoa/thường).
In: "{ky_tu}: {so_lan}" mỗi dòng, theo alphabet.

## Ví dụ
Input: Hello
Output:
e: 1
h: 1
l: 2
o: 1""",
     """# Đếm ký tự trong chuỗi (không phân biệt hoa thường)
s = input().lower()
# Viet code""",
     'medium',15,12,'contains',10000,8),

    # 9 - Kỹ thuật hai con trỏ (NEW)
    (9, C2_CH_A02, 'Kỹ thuật hai con trỏ', 'ky-thuat-hai-con-tro', 'Two Pointers cơ bản', 'practice',
     """# Kỹ thuật hai con trỏ (Two Pointers)

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
Output: NO""",
     """# Tìm cặp tổng bằng x dùng hai con trỏ
a = list(map(int, input().split()))
x = int(input())
i, j = 0, len(a)-1
# Viet code""",
     'hard',25,15,'contains',10000,9),

    # 10 - Mảng cộng dồn (NEW)
    (10, C2_CH_A02, 'Mảng cộng dồn', 'mang-cong-don', 'Prefix Sum', 'practice',
     """# Mảng cộng dồn (Prefix Sum)

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
14""",
     """# Tính tổng đoạn dùng prefix sum
n = int(input())
a = list(map(int, input().split()))
q = int(input())
# Tiền xử lý prefix[] rồi trả lời q truy vấn""",
     'hard',25,15,'contains',10000,10),
]

a02_tcs = [
    (10, 6, 'push 10\npush 20\npop\nexit', '20', False, 1),
    (11, 6, 'push 5\npop\npop\nexit', 'Stack rong', False, 2),
    (12, 6, 'pop\nexit', 'Stack rong', True, 3),
    (13, 7, '1 2 3 4 5 6', '12', False, 1),
    (14, 7, '1 2 3 4 5 6', '15', False, 2),
    (15, 7, '2 4 6 8', '20', True, 3),
    (16, 8, 'Hello', 'e: 1', False, 1),
    (17, 8, 'Hello', 'l: 2', False, 2),
    (18, 8, 'aabbcc', 'c: 2', True, 3),
    (19, 9, '1 2 3 4 5 6\n7', 'YES', False, 1),
    (20, 9, '1 2 3 4 5 6\n20', 'NO', False, 2),
    (21, 9, '1 3 5 7 9\n10', 'YES', True, 3),
    (22, 10, '5\n1 2 3 4 5\n2\n0 2\n1 4', '6', False, 1),
    (23, 10, '5\n1 2 3 4 5\n2\n0 2\n1 4', '14', False, 2),
    (24, 10, '3\n10 20 30\n1\n0 2', '60', True, 3),
]

# Chapter A03: Giải thuật kinh điển (8 bài)
a03_lessons = [
    # 11 - Sắp xếp
    (11, C2_CH_A03, 'Sắp xếp', 'sap-xep', 'Thực hành sorted()', 'practice',
     """# Sắp xếp

## Yêu cầu
Nhập dãy số (1 dòng). In ra:
- Dòng 1: tăng dần
- Dòng 2: giảm dần

## Ví dụ
Input: 5 2 8 1 9 3
Output:
1 2 3 5 8 9
9 8 5 3 2 1""",
     """# Nhập dãy số, in tăng và giảm
numbers = list(map(int, input().split()))
# Viet code""",
     'medium',15,10,'contains',10000,11),

    # 12 - Tìm kiếm nhị phân
    (12, C2_CH_A03, 'Tìm kiếm nhị phân', 'tim-kiem-nhi-phan', 'Binary Search', 'practice',
     """# Tìm kiếm nhị phân

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
Output: 2""",
     """def binary_search(arr, x):
    pass

# Nhập và in kết quả""",
     'hard',20,15,'contains',10000,12),

    # 13 - Đệ quy
    (13, C2_CH_A03, 'Đệ quy', 'de-quy', 'Đệ quy tính giai thừa', 'practice',
     """# Đệ quy (Recursion)

Hàm gọi chính nó. Cần **base case** để dừng.

## Yêu cầu
Viết hàm đệ quy `giai_thua(n)` tính n! (với n >= 0).

Nhập n, in ra n!

## Ví dụ
Input: 5
Output: 120""",
     """def giai_thua(n):
    pass

n = int(input())
print(giai_thua(n))""",
     'medium',15,10,'contains',10000,13),

    # 14 - Tìm kiếm chuỗi con
    (14, C2_CH_A03, 'Tìm kiếm chuỗi con', 'tim-kiem-chuoi-con', 'Tìm vị trí xuất hiện', 'practice',
     """# Tìm kiếm chuỗi con

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
Output: -1""",
     """# Tìm vị trí chuỗi con
S = input().strip()
T = input().strip()
# Viet code""",
     'medium',15,12,'contains',10000,14),

    # 15 - Số nguyên tố
    (15, C2_CH_A03, 'Số nguyên tố', 'so-nguyen-to', 'Kiểm tra và in số nguyên tố', 'practice',
     """# Số nguyên tố

Số nguyên tố > 1, chỉ chia hết cho 1 và chính nó.

## Yêu cầu
Nhập n, in các số nguyên tố từ 2 đến n (cách nhau khoảng trắng).

## Ví dụ
Input: 20
Output: 2 3 5 7 11 13 17 19""",
     """# In số nguyên tố từ 2 đến n
n = int(input())
# Viet code""",
     'medium',15,12,'contains',10000,15),

    # 16 - Dãy Fibonacci
    (16, C2_CH_A03, 'Dãy Fibonacci', 'day-fibonacci', 'In n số Fibonacci', 'practice',
     """# Dãy Fibonacci

F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)

## Yêu cầu
Nhập n, in n số Fibonacci đầu tiên (cách nhau khoảng trắng).

## Ví dụ
Input: 8
Output: 0 1 1 2 3 5 8 13""",
     """# In n số Fibonacci đầu tiên
n = int(input())
# Viet code""",
     'medium',15,12,'contains',10000,16),

    # 17 - UCLN & BCNN
    (17, C2_CH_A03, 'UCLN và BCNN', 'ucln-va-bcnn', 'Thuật toán Euclid', 'practice',
     """# UCLN và BCNN

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
BCNN: 36""",
     """def ucln(a, b):
    pass

a = int(input())
b = int(input())
# In UCLN và BCNN""",
     'medium',15,10,'contains',10000,17),

    # 18 - Palindrome
    (18, C2_CH_A03, 'Kiểm tra Palindrome', 'kiem-tra-palindrome', 'Chuỗi đối xứng', 'practice',
     """# Kiểm tra Palindrome

Palindrome đọc xuôi ngược đều giống nhau: radar, madam, 12321.

## Yêu cầu
Nhập chuỗi. Bỏ qua khoảng trắng và viết hoa/thường. In "YES" hoặc "NO".

## Ví dụ
Input: radar
Output: YES

Input: Python
Output: NO""",
     """# Kiểm tra Palindrome (chuỗi đối xứng)
s = input().strip()
# Viet code""",
     'medium',15,10,'contains',10000,18),
]

a03_tcs = [
    (25, 11, '5 2 8 1 9 3', '1 2 3 5 8 9', False, 1),
    (26, 11, '5 2 8 1 9 3', '9 8 5 3 2 1', False, 2),
    (27, 11, '3 1 2', '1 2 3', True, 3),
    (28, 12, '1 3 5 7 9 11\n5', '2', False, 1),
    (29, 12, '1 3 5 7 9 11\n6', 'Khong tim thay', False, 2),
    (30, 12, '1 3 5 7 9 11\n11', '5', True, 3),
    (31, 13, '5', '120', False, 1),
    (32, 13, '0', '1', False, 2),
    (33, 13, '7', '5040', True, 3),
    (34, 14, 'abcabcabc\nabc', '0 3 6', False, 1),
    (35, 14, 'Python\nJava', '-1', False, 2),
    (36, 14, 'aaaa\naa', '0 1 2', True, 3),
    (37, 15, '20', '2 3 5 7 11 13 17 19', False, 1),
    (38, 15, '5', '2 3 5', False, 2),
    (39, 15, '1', '', True, 3),
    (40, 16, '8', '0 1 1 2 3 5 8 13', False, 1),
    (41, 16, '1', '0', False, 2),
    (42, 16, '5', '0 1 1 2 3', True, 3),
    (43, 17, '12\n18', 'UCLN: 6', False, 1),
    (44, 17, '12\n18', 'BCNN: 36', False, 2),
    (45, 17, '7\n13', 'UCLN: 1', True, 3),
    (46, 18, 'radar', 'YES', False, 1),
    (47, 18, 'Python', 'NO', False, 2),
    (48, 18, 'Racecar', 'YES', True, 3),
]

# Chapter A04: Thuật toán nâng cao cho thi (8 bài)
a04_lessons = [
    # 19 - Thuật toán tham lam (NEW)
    (19, C2_CH_A04, 'Thuật toán tham lam', 'thuat-toan-tham-lam', 'Greedy cơ bản', 'practice',
     """# Thuật toán tham lam (Greedy)

Thuật toán tham lam chọn phương án **tốt nhất tại mỗi bước** để đạt kết quả tối ưu toàn cục.

## Yêu cầu
Một máy ATM có các tờ tiền: 500, 200, 100, 50, 20, 10.
Nhập số tiền n, in ra số tờ tiền **ít nhất** để đổi được n.
Nếu không thể đổi, in "-1".

## Ví dụ
Input: 750
Output: 4 (1 to 500 + 1 to 200 + 1 to 50)

Input: 30
Output: 3 (1 to 20 + 1 to 10)""",
     """# Đổi tiền ATM - tham lam
menh_gia = [500, 200, 100, 50, 20, 10]
n = int(input())
# Viet code""",
     'hard',25,15,'contains',10000,19),

    # 20 - Sinh hoán vị (NEW)
    (20, C2_CH_A04, 'Sinh hoán vị', 'sinh-hoan-vi', 'Sinh tất cả hoán vị', 'practice',
     """# Sinh hoán vị (Permutation)

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
3 2 1""",
     """# Sinh hoán vị 1..n
from itertools import permutations
n = int(input())
# Viet code""",
     'hard',25,15,'contains',10000,20),

    # 21 - Sinh tổ hợp (NEW)
    (21, C2_CH_A04, 'Sinh tổ hợp', 'sinh-to-hop', 'Sinh tổ hợp chập k', 'practice',
     """# Sinh tổ hợp (Combination)

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
3 4""",
     """# Sinh tổ hợp chập k của n
from itertools import combinations
n, k = map(int, input().split())
# Viet code""",
     'hard',25,15,'contains',10000,21),

    # 22 - Quy hoạch động - Fibonacci (NEW)
    (22, C2_CH_A04, 'Quy hoạch động cơ bản', 'quy-hoach-dong-co-ban', 'QHĐ với Fibonacci', 'practice',
     """# Quy hoạch động (Dynamic Programming)

QHĐ giải bài toán bằng cách lưu kết quả các bài toán con để tái sử dụng.

## Yêu cầu
Tính Fibonacci thứ n (n ≤ 90) bằng QHĐ (dùng vòng lặp, mảng). In F(n).
Lưu ý: F(0)=0, F(1)=1.

## Ví dụ
Input: 50
Output: 12586269025""",
     """# Fibonacci với QHĐ
n = int(input())
# Dùng mảng hoặc 2 biến để tính""",
     'hard',25,15,'contains',10000,22),

    # 23 - QHĐ - Dãy con (NEW)
    (23, C2_CH_A04, 'QHĐ - Dãy con', 'qhd-day-con', 'Dãy con tăng dài nhất', 'practice',
     """# QHĐ - Dãy con tăng dài nhất (LIS)

Tìm độ dài dãy con tăng dần dài nhất (không nhất thiết liên tiếp).

## Yêu cầu
Nhập n (dòng 1) và dãy a (dòng 2). In độ dài dãy con tăng dài nhất.

## Ví dụ
Input:
8
10 22 9 33 21 50 41 60
Output: 5""",
     """# Dãy con tăng dài nhất (LIS)
n = int(input())
a = list(map(int, input().split()))
# Viet code QHD""",
     'hard',30,20,'contains',10000,23),

    # 24 - Sàng số nguyên tố (NEW)
    (24, C2_CH_A04, 'Sàng nguyên tố', 'sang-nguyen-to', 'Sàng Eratosthenes', 'practice',
     """# Sàng nguyên tố (Eratosthenes)

Sàng giúp tìm tất cả số nguyên tố ≤ n với độ phức tạp O(n log log n).

## Yêu cầu
Nhập n, in ra số lượng số nguyên tố từ 1 đến n.

## Ví dụ
Input: 20
Output: 8 (2,3,5,7,11,13,17,19)""",
     """# Sàng Eratosthenes đếm số nguyên tố
n = int(input())
# Viết sàng""",
     'medium',20,12,'contains',10000,24),

    # 25 - Sắp xếp nổi bọt
    (25, C2_CH_A04, 'Sắp xếp nổi bọt', 'sap-xep-noi-bot', 'Bubble Sort tự cài', 'practice',
     """# Sắp xếp nổi bọt (Bubble Sort)

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
Output: 1 2 3 5 7 9""",
     """def bubble_sort(arr):
    pass

# Nhập và in""",
     'hard',20,15,'contains',10000,25),

    # 26 - Xử lý số lớn (NEW)
    (26, C2_CH_A04, 'Xử lý số lớn', 'xu-ly-so-lon', 'Tính toán với số lớn', 'practice',
     """# Xử lý số lớn

Python mặc định hỗ trợ số nguyên lớn không giới hạn.

## Yêu cầu
Nhập n. Tính n! (n giai thừa). In kết quả.
n có thể tới 1000, kết quả có thể rất lớn.

## Ví dụ
Input: 10
Output: 3628800""",
     """# Tính n! (với n lớn)
n = int(input())
# Python tự xử lý số lớn""",
     'medium',15,10,'contains',10000,26),
]

a04_tcs = [
    (49, 19, '750', '4', False, 1),
    (50, 19, '30', '3', False, 2),
    (51, 19, '3', '-1', True, 3),
    (52, 20, '3', '1 2 3', False, 1),
    (53, 20, '3', '3 2 1', False, 2),
    (54, 20, '2', '2 1', True, 3),
    (55, 21, '4 2', '1 2', False, 1),
    (56, 21, '4 2', '3 4', False, 2),
    (57, 21, '3 3', '1 2 3', True, 3),
    (58, 22, '50', '12586269025', False, 1),
    (59, 22, '10', '55', False, 2),
    (60, 22, '90', '2880067194370816120', True, 3),
    (61, 23, '8\n10 22 9 33 21 50 41 60', '5', False, 1),
    (62, 23, '4\n1 2 3 4', '4', False, 2),
    (63, 23, '4\n4 3 2 1', '1', True, 3),
    (64, 24, '20', '8', False, 1),
    (65, 24, '10', '4', False, 2),
    (66, 24, '2', '1', True, 3),
    (67, 25, '5 2 9 1 7 3', '1 2 3 5 7 9', False, 1),
    (68, 25, '3 1 2', '1 2 3', False, 2),
    (69, 25, '1 2 3', '1 2 3', True, 3),
    (70, 26, '10', '3628800', False, 1),
    (71, 26, '5', '120', False, 2),
    (72, 26, '0', '1', True, 3),
]

# Chapter A05: Luyện thi (4 bài)
a05_lessons = [
    # 27 - Ôn tập CTDL
    (27, C2_CH_A05, 'Ôn tập: Module & CTDL', 'on-tap-module-ctdl', 'Ôn tập kiến thức đã học', 'theory',
     """# Ôn tập: Module & CTDL

## Module & Xử lý lỗi
- `import math`, `import random`
- `try-except` bắt lỗi
- Tự viết hàm tiện ích

## Cấu trúc dữ liệu
- List: sort, append, pop, insert
- Stack (LIFO), Queue (FIFO)
- Map, Filter, Reduce
- Đếm tần suất bằng dict
- Hai con trỏ, Mảng cộng dồn""",
     """print("On tap Module & CTDL")""",
     'easy',10,5,'exact',10000,27),

    # 28 - Ôn tập giải thuật
    (28, C2_CH_A05, 'Ôn tập: Giải thuật', 'on-tap-giai-thuat', 'Ôn tập các giải thuật', 'theory',
     """# Ôn tập: Giải thuật

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
- Xử lý số lớn""",
     """print("On tap Giai thuat")""",
     'easy',10,5,'exact',10000,28),

    # 29 - Luyện đề Bảng B
    (29, C2_CH_A05, 'Luyện đề Bảng B', 'luyen-de-bang-b', 'Đề thi thử THCS', 'project',
     """# Luyện đề Bảng B

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
YES""",
     """# Giải đề thi Bảng B
n = int(input())
a = list(map(int, input().split()))
# Viet code""",
     'hard',50,30,'contains',20000,29),

    # 30 - Luyện đề Bảng C
    (30, C2_CH_A05, 'Luyện đề Bảng C', 'luyen-de-bang-c', 'Đề thi thử THPT', 'project',
     """# Luyện đề Bảng C

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
2 (cap 1+6, 4+3)""",
     """# Giải đề thi Bảng C
n = int(input())
a = list(map(int, input().split()))
x = int(input())
# Viet code giai 3 cau""",
     'hard',50,30,'contains',20000,30),
]

a05_tcs = [
    (73, 29, '6\n1 4 7 9 10 13', '1 4 9', False, 1),
    (74, 29, '6\n1 4 7 9 10 13', '1', False, 2),
    (75, 29, '3\n1 3 5', 'YES', True, 3),
    (76, 30, '6\n1 4 2 5 3 6\n7', 'NO', False, 1),
    (77, 30, '6\n1 4 2 5 3 6\n7', '2', False, 2),
    (78, 30, '5\n1 2 3 4 5\n9', '2', True, 3),
]


# ========== BUILD SQL ==========

lines = []

def emit(s):
    lines.append(s)

emit("-- Migration 015: Bổ sung 10 bài Python Cơ Bản + Tạo Python Nâng Cao (30 bài)")
emit("-- Designed for Tin học trẻ Bảng B & C")
emit("")

# ---- PART 1: ADD 10 LESSONS TO PYTHON CO BAN ----
emit("-- ============================================================")
emit("-- PHẦN 1: THÊM 10 BÀI CHO PYTHON CƠ BẢN")
emit("-- ============================================================")
emit("")

# Chapter 4
emit(f"INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)")
emit(f"VALUES ( '{C1_CH104}', '{C1}', 'Xử lý chuỗi và dữ liệu', 'Kỹ thuật xử lý chuỗi, list comprehension, lambda, ôn tập.', 4 );")
emit("")

# Part 1 lessons
for uid_suffix, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order in part1_lessons[:10]:
    uid = f"{C1_L}{uid_suffix}"
    emit(f"-- Lesson {10+uid_suffix}: {title}")
    emit(make_lesson_insert(uid, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order))
    emit("")

# Part 1 test cases
emit("-- ---- TEST CASES ----")
for tc_suffix, lesson_order, stdin, expected, hidden, order in part1_tcs:
    uid = f"{C1_TC}{tc_suffix}"
    lesson_uid = f"{C1_L}{lesson_order}"
    emit(make_tc(uid, lesson_uid, stdin, expected, hidden, order))
emit("")

# ---- PART 2: PYTHON NANG CAO ----
emit("-- ============================================================")
emit("-- PHẦN 2: KHÓA PYTHON NÂNG CAO (30 BÀI)")
emit("-- Designed for Tin học trẻ Bảng B & C")
emit("-- ============================================================")
emit("")

# Course
emit(f"INSERT INTO error404labs.py_courses (id, title, slug, description, difficulty, published)")
emit(f"VALUES ( '{C2}', 'Python Nâng Cao', 'python-nang-cao', 'Khóa học Python nâng cao dành cho thi Tin học trẻ Bảng B & C. Gồm module, xử lý lỗi, cấu trúc dữ liệu, giải thuật kinh điển, thuật toán nâng cao và luyện đề.', 'advanced', true );")
emit("")

# Chapters
chapters = [
    (C2_CH_A01, 'Xử lý lỗi và Module', 'Xử lý ngoại lệ, import module, tự tạo thư viện hàm.', 1),
    (C2_CH_A02, 'Cấu trúc dữ liệu', 'List nâng cao, Stack, Map/Filter, đếm tần suất, hai con trỏ, mảng cộng dồn.', 2),
    (C2_CH_A03, 'Giải thuật kinh điển', 'Sắp xếp, tìm kiếm nhị phân, đệ quy, số nguyên tố, Fibonacci, UCLN, Palindrome.', 3),
    (C2_CH_A04, 'Thuật toán nâng cao', 'Tham lam, sinh hoán vị/tổ hợp, QHĐ, sàng nguyên tố, sắp xếp, số lớn.', 4),
    (C2_CH_A05, 'Luyện thi', 'Ôn tập tổng hợp, luyện đề Bảng B & Bảng C.', 5),
]
for ch_id, title, desc, order in chapters:
    emit(f"INSERT INTO error404labs.py_chapters (id, course_id, title, description, order_index)")
    emit(f"VALUES ( '{ch_id}', '{C2}', '{title}', '{desc}', {order} );")
emit("")

# Chapter A01 lessons
emit("-- CHƯƠNG 1: XỬ LÝ LỖI VÀ MODULE")
for uid_suffix, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order in a01_lessons:
    uid = f"{C2_L}{uid_suffix:02d}"
    emit(f"-- Lesson {uid_suffix}: {title}")
    emit(make_lesson_insert(uid, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order))
    emit("")

for tc_num, lesson_num, stdin, expected, hidden, order in a01_tcs:
    uid = f"{C2_TC}{tc_num:02d}"
    lesson_uid = f"{C2_L}{lesson_num:02d}"
    emit(make_tc(uid, lesson_uid, stdin, expected, hidden, order))

emit("")
emit("-- CHƯƠNG 2: CẤU TRÚC DỮ LIỆU")
for uid_suffix, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order in a02_lessons:
    uid = f"{C2_L}{uid_suffix:02d}"
    emit(f"-- Lesson {uid_suffix}: {title}")
    emit(make_lesson_insert(uid, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order))
    emit("")

for tc_num, lesson_num, stdin, expected, hidden, order in a02_tcs:
    uid = f"{C2_TC}{tc_num:02d}"
    lesson_uid = f"{C2_L}{lesson_num:02d}"
    emit(make_tc(uid, lesson_uid, stdin, expected, hidden, order))

emit("")
emit("-- CHƯƠNG 3: GIẢI THUẬT KINH ĐIỂN")
for uid_suffix, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order in a03_lessons:
    uid = f"{C2_L}{uid_suffix:02d}"
    emit(f"-- Lesson {uid_suffix}: {title}")
    emit(make_lesson_insert(uid, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order))
    emit("")

for tc_num, lesson_num, stdin, expected, hidden, order in a03_tcs:
    uid = f"{C2_TC}{tc_num:02d}"
    lesson_uid = f"{C2_L}{lesson_num:02d}"
    emit(make_tc(uid, lesson_uid, stdin, expected, hidden, order))

emit("")
emit("-- CHƯƠNG 4: THUẬT TOÁN NÂNG CAO CHO THI")
for uid_suffix, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order in a04_lessons:
    uid = f"{C2_L}{uid_suffix:02d}"
    emit(f"-- Lesson {uid_suffix}: {title}")
    emit(make_lesson_insert(uid, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order))
    emit("")

for tc_num, lesson_num, stdin, expected, hidden, order in a04_tcs:
    uid = f"{C2_TC}{tc_num:02d}"
    lesson_uid = f"{C2_L}{lesson_num:02d}"
    emit(make_tc(uid, lesson_uid, stdin, expected, hidden, order))

emit("")
emit("-- CHƯƠNG 5: LUYỆN THI")
for uid_suffix, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order in a05_lessons:
    uid = f"{C2_L}{uid_suffix:02d}"
    emit(f"-- Lesson {uid_suffix}: {title}")
    emit(make_lesson_insert(uid, ch_id, title, slug, desc, ltype, content, starter, diff, xp, mins, comp, tlim, order))
    emit("")

for tc_num, lesson_num, stdin, expected, hidden, order in a05_tcs:
    uid = f"{C2_TC}{tc_num:02d}"
    lesson_uid = f"{C2_L}{lesson_num:02d}"
    emit(make_tc(uid, lesson_uid, stdin, expected, hidden, order))


# Write file
output = '\n'.join(lines)
filepath = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'migrations', '015_seed_more_python.sql')
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(output)
print(f"Written: {filepath}")
print(f"Size: {len(output)} bytes")
print(f"Lines: {len(lines)}")

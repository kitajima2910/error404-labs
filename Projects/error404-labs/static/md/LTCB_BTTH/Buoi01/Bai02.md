# Bài học: Chuyển đổi ký tự sang mã ASCII trong C++

## Mô tả bài học
Chương trình minh họa cách nhập một ký tự từ bàn phím và hiển thị mã ASCII (giá trị số nguyên) tương ứng của ký tự đó.

## Mã nguồn đầy đủ

```cpp
#include <iostream>
using namespace std;

int main()
{
    char kyTu;
    cout << "Nhập vào ký tự: ";
    cin >> kyTu;
    cout << (int)kyTu;
    return 0;
}
```

## Giải thích chi tiết

### 1. Khai báo thư viện

```cpp
#include <iostream>
using namespace std;
```
- `#include <iostream>`: Thư viện chuẩn cho phép sử dụng `cin` và `cout`
- `using namespace std`: Cho phép sử dụng `cin`, `cout` mà không cần viết `std::cin`, `std::cout`

### 2. Khai báo biến

```cpp
char kyTu;
```
- Khai báo biến `kyTu` với kiểu dữ liệu `char` (ký tự)
- Biến `char` lưu trữ 1 ký tự đơn: `'A'`, `'b'`, `'@'`, `'5'`, ...
- Mỗi ký tự có một **mã ASCII** tương ứng (số nguyên từ 0-127)

### 3. Nhập ký tự từ bàn phím

```cpp
cout << "Nhập vào ký tự: ";
cin >> kyTu;
```
- `cout`: Hiển thị thông báo yêu cầu người dùng nhập
- `cin >> kyTu`: Đọc 1 ký tự từ bàn phím và lưu vào biến `kyTu`

**Ví dụ:**
- Người dùng nhập: `A` → `kyTu = 'A'`
- Người dùng nhập: `z` → `kyTu = 'z'`
- Người dùng nhập: `5` → `kyTu = '5'` (ký tự số, không phải số 5)

### 4. Chuyển đổi ký tự sang mã ASCII

```cpp
cout << (int)kyTu;
```

#### 📌 Ép kiểu (Type Casting): `(int)kyTu`

- **Cú pháp**: `(kiểu_dữ_liệu_mới)biến`
- **Chức năng**: Chuyển đổi giá trị từ kiểu `char` sang kiểu `int`
- **Kết quả**: Hiển thị mã ASCII của ký tự

#### 🔍 Cách hoạt động:

```
Ký tự → Mã ASCII (số nguyên)
-------------------------------
'A'   →   65
'B'   →   66
'Z'   →   90
'a'   →   97
'b'   →   98
'z'   →   122
'0'   →   48
'1'   →   49
'9'   →   57
' '   →   32  (khoảng trắng)
'@'   →   64
'!'   →   33
```

## Bảng mã ASCII quan trọng

### Chữ cái viết hoa (A-Z)

| Ký tự | Mã ASCII | Ký tự | Mã ASCII | Ký tự | Mã ASCII |
|-------|----------|-------|----------|-------|----------|
| A | 65 | J | 74 | S | 83 |
| B | 66 | K | 75 | T | 84 |
| C | 67 | L | 76 | U | 85 |
| D | 68 | M | 77 | V | 86 |
| E | 69 | N | 78 | W | 87 |
| F | 70 | O | 79 | X | 88 |
| G | 71 | P | 80 | Y | 89 |
| H | 72 | Q | 81 | Z | 90 |
| I | 73 | R | 82 | | |

### Chữ cái viết thường (a-z)

| Ký tự | Mã ASCII | Ký tự | Mã ASCII | Ký tự | Mã ASCII |
|-------|----------|-------|----------|-------|----------|
| a | 97 | j | 106 | s | 115 |
| b | 98 | k | 107 | t | 116 |
| c | 99 | l | 108 | u | 117 |
| d | 100 | m | 109 | v | 118 |
| e | 101 | n | 110 | w | 119 |
| f | 102 | o | 111 | x | 120 |
| g | 103 | p | 112 | y | 121 |
| h | 104 | q | 113 | z | 122 |
| i | 105 | r | 114 | | |

### Ký tự số (0-9)

| Ký tự | Mã ASCII |
|-------|----------|
| '0' | 48 |
| '1' | 49 |
| '2' | 50 |
| '3' | 51 |
| '4' | 52 |
| '5' | 53 |
| '6' | 54 |
| '7' | 55 |
| '8' | 56 |
| '9' | 57 |

### Ký tự đặc biệt

| Ký tự | Mô tả | Mã ASCII |
|-------|-------|----------|
| ' ' | Khoảng trắng (Space) | 32 |
| '!' | Dấu chấm than | 33 |
| '@' | At | 64 |
| '#' | Hash | 35 |
| '$' | Dollar | 36 |
| '%' | Percent | 37 |
| '&' | And | 38 |
| '*' | Asterisk | 42 |
| '+' | Plus | 43 |
| '-' | Minus | 45 |
| '/' | Slash | 47 |
| '=' | Equal | 61 |

## Ví dụ chạy chương trình

### Ví dụ 1: Nhập chữ hoa
```
Nhập vào ký tú: A
65
```
**Giải thích:** Ký tự `'A'` có mã ASCII là `65`

### Ví dụ 2: Nhập chữ thường
```
Nhập vào ký tự: a
97
```
**Giải thích:** Ký tự `'a'` có mã ASCII là `97`

### Ví dụ 3: Nhập ký tự số
```
Nhập vào ký tự: 5
53
```
**Giải thích:** Ký tự `'5'` (không phải số 5) có mã ASCII là `53`

### Ví dụ 4: Nhập ký tự đặc biệt
```
Nhập vào ký tự: @
64
```
**Giải thích:** Ký tự `'@'` có mã ASCII là `64`

## Kiến thức mở rộng

### 1. Các cách ép kiểu khác

```cpp
// Cách 1: C-style cast (dùng trong bài)
cout << (int)kyTu;

// Cách 2: C++-style cast (khuyến khích)
cout << static_cast<int>(kyTu);

// Cách 3: Cộng với 0
cout << kyTu + 0;

// Cách 4: Dùng hàm int()
cout << int(kyTu);
```

### 2. Hiển thị cả ký tự và mã ASCII

```cpp
#include <iostream>
using namespace std;

int main()
{
    char kyTu;
    cout << "Nhập vào ký tự: ";
    cin >> kyTu;
    
    cout << "Ký tự: " << kyTu << endl;
    cout << "Mã ASCII: " << (int)kyTu << endl;
    
    return 0;
}
```

**Kết quả:**
```
Nhập vào ký tự: A
Ký tự: A
Mã ASCII: 65
```

### 3. Chuyển đổi ngược: Từ mã ASCII sang ký tự

```cpp
#include <iostream>
using namespace std;

int main()
{
    int maASCII;
    cout << "Nhập mã ASCII: ";
    cin >> maASCII;
    
    cout << "Ký tự tương ứng: " << (char)maASCII << endl;
    
    return 0;
}
```

**Kết quả:**
```
Nhập mã ASCII: 65
Ký tự tương ứng: A
```

### 4. Quy luật quan trọng

```cpp
// Chuyển chữ HOA → chữ thường
char hoaThanh = 'A';
char thuong = hoaThanh + 32;  // 'A' + 32 = 65 + 32 = 97 = 'a'

// Chuyển chữ thường → chữ HOA
char thuongThanh = 'a';
char hoa = thuongThanh - 32;  // 'a' - 32 = 97 - 32 = 65 = 'A'

// Chuyển ký tự số → số nguyên thực sự
char kyTuSo = '5';
int soThuc = kyTuSo - '0';  // '5' - '0' = 53 - 48 = 5
```

## Ứng dụng thực tế

### 1. Kiểm tra chữ hoa hay chữ thường

```cpp
char c = 'A';
if (c >= 65 && c <= 90) {
    cout << "Chữ hoa";
} else if (c >= 97 && c <= 122) {
    cout << "Chữ thường";
}
```

### 2. Mã hóa Caesar Cipher đơn giản

```cpp
char c = 'A';
char maHoa = c + 3;  // A → D (dịch 3 vị trí)
cout << maHoa;  // Kết quả: D
```

## Tổng kết

### ✅ Kiến thức đã học:
1. Mỗi ký tự có một **mã ASCII** tương ứng
2. Sử dụng **ép kiểu `(int)`** để chuyển ký tự sang số
3. Chữ hoa (A-Z): mã ASCII **65-90**
4. Chữ thường (a-z): mã ASCII **97-122**
5. Ký tự số ('0'-'9'): mã ASCII **48-57**
6. Khoảng cách giữa chữ hoa và chữ thường: **32**

### 🎯 Bài tập thực hành:

1. **Bài 1:** Viết chương trình nhập 1 ký tự, hiển thị cả ký tự và mã ASCII của nó
2. **Bài 2:** Viết chương trình nhập mã ASCII, hiển thị ký tự tương ứng
3. **Bài 3:** Viết chương trình nhập chữ hoa, chuyển thành chữ thường (hoặc ngược lại)
4. **Bài 4:** Viết chương trình nhập ký tự số ('0'-'9'), chuyển thành số nguyên thực sự
5. **Bài 5:** Tạo bảng hiển thị tất cả ký tự từ A-Z và mã ASCII của chúng

### 💡 Thử thách:

Viết chương trình kiểm tra ký tự nhập vào là:
- Chữ hoa (A-Z)
- Chữ thường (a-z)
- Ký tự số ('0'-'9')
- Ký tự đặc biệt (các ký tự khác)

---

**Lưu ý quan trọng:** 
- `'5'` (ký tự) ≠ `5` (số nguyên)
- `'5'` có mã ASCII là 53, không phải 5
- Để chuyển `'5'` thành số 5, dùng: `'5' - '0'` = `53 - 48` = `5`
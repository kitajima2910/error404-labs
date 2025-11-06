# Bài học: Nhập xuất dữ liệu và định dạng với printf trong C++

## Mô tả bài học
Chương trình minh họa cách nhập dữ liệu từ bàn phím và xuất dữ liệu có định dạng sử dụng hàm `printf()` trong C++.

## Mã nguồn đầy đủ

```cpp
#include <iostream>
using namespace std;

int main()
{
    char kyTu;
    int soNguyen;
    float soThuc;
    
    cout << "Nhập vào ký tự: ";
    cin >> kyTu;
    cout << "Nhập vào số nguyên: ";
    cin >> soNguyen;
    cout << "Nhập vao số thực: ";
    cin >> soThuc;
    
    printf("\n");
    printf("Ký tự    :%3c\n", kyTu);
    printf("Số nguyên:%6d\n", soNguyen);
    printf("Số thực  :%8.3f", soThuc);
    // printf("\n%3c%6d%8.3f\n", kyTu, soNguyen, soThuc);
    
    return 0;
}
```

## Giải thích chi tiết

### 1. Khai báo thư viện và biến

```cpp
#include <iostream>
using namespace std;
```
- `#include <iostream>`: Thư viện cho phép sử dụng `cin`, `cout`
- `using namespace std`: Không cần viết `std::` trước `cin`, `cout`

```cpp
char kyTu;      // Biến lưu 1 ký tự (a, b, @, #,...)
int soNguyen;   // Biến lưu số nguyên (-5, 0, 100,...)
float soThuc;   // Biến lưu số thực (3.14, -2.5, 10.0,...)
```

### 2. Nhập dữ liệu từ bàn phím

```cpp
cout << "Nhập vào ký tự: ";
cin >> kyTu;
```
- `cout <<`: Hiển thị thông báo ra màn hình
- `cin >>`: Nhận dữ liệu từ bàn phím và lưu vào biến

**Ví dụ:**
- Người dùng nhập: `A` → biến `kyTu` = 'A'
- Người dùng nhập: `25` → biến `soNguyen` = 25
- Người dùng nhập: `3.14159` → biến `soThuc` = 3.14159

### 3. Xuất dữ liệu có định dạng với printf

#### 📌 Cú pháp printf
```cpp
printf("chuỗi định dạng", biến1, biến2, ...);
```

#### 📌 Các ký hiệu định dạng chính

| Ký hiệu | Kiểu dữ liệu | Ví dụ |
|---------|--------------|-------|
| `%c` | Ký tự (char) | 'A', 'x' |
| `%d` | Số nguyên (int) | 25, -100 |
| `%f` | Số thực (float) | 3.14, -2.5 |

#### 📌 Định dạng độ rộng và độ chính xác

```cpp
printf("Ký tự    :%3c\n", kyTu);
```
- `%3c`: Dành **3 ô** để hiển thị ký tự, căn lề phải
- Nếu `kyTu = 'A'` → kết quả: `  A` (2 khoảng trắng + chữ A)

```cpp
printf("Số nguyên:%6d\n", soNguyen);
```
- `%6d`: Dành **6 ô** để hiển thị số nguyên, căn lề phải
- Nếu `soNguyen = 25` → kết quả: `    25` (4 khoảng trắng + 25)

```cpp
printf("Số thực  :%8.3f", soThuc);
```
- `%8.3f`: 
  - **8** = tổng chiều rộng (bao gồm cả dấu chấm)
  - **.3** = hiển thị 3 chữ số sau dấu phẩy
- Nếu `soThuc = 3.14159` → kết quả: `   3.142` (3 khoảng trắng + 3.142)

### 4. Ví dụ chạy chương trình

```
Nhập vào ký tự: A
Nhập vào số nguyên: 125
Nhập vao số thực: 9.87654

Ký tự    :  A
Số nguyên:   125
Số thực  :   9.877
```

**Giải thích kết quả:**
- Ký tự 'A' được căn sang phải trong 3 ô: `  A`
- Số 125 được căn sang phải trong 6 ô: `   125`
- Số 9.87654 làm tròn thành 9.877, căn sang phải trong 8 ô: `   9.877`

### 5. Dòng code được comment

```cpp
// printf("\n%3c%6d%8.3f\n", kyTu, soNguyen, soThuc);
```
Dòng này in tất cả trên **một dòng duy nhất** thay vì 3 dòng riêng biệt.

Nếu bỏ comment, kết quả sẽ là:
```
  A   125   9.877
```

## Tổng kết

### ✅ Kiến thức đã học:
1. Khai báo biến với các kiểu `char`, `int`, `float`
2. Nhập dữ liệu với `cin >>`
3. Xuất dữ liệu định dạng với `printf()`
4. Sử dụng `%c`, `%d`, `%f` để định dạng
5. Căn lề và làm tròn số với `%8.3f`

### 🎯 Bài tập thực hành:
1. Thay đổi `%6d` thành `%3d` và quan sát kết quả
2. Thay đổi `%8.3f` thành `%10.2f` và so sánh
3. Bỏ comment dòng cuối và chạy lại chương trình
4. Thử nhập số âm và số lớn hơn để xem cách định dạng hoạt động

---

**Lưu ý:** Trong C++ hiện đại, người ta thường khuyến khích dùng `cout` thay vì `printf`, nhưng `printf` vẫn rất hữu ích khi cần định dạng chính xác!
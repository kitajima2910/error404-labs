# 📊 Chương trình Tính Tổ Hợp C(n, k)

## 📝 Tổng quan

Chương trình này tính toán **tổ hợp chập k của n phần tử** (ký hiệu: C(n,k) hoặc nCk), còn được gọi là **hệ số nhị thức**.

### Công thức toán học

$$C(n, k) = \frac{n!}{k!(n-k)!}$$

Trong đó:
- `n`: Số phần tử tổng cộng
- `k`: Số phần tử được chọn
- `!`: Giai thừa

---

## 💻 Code đầy đủ

```cpp
#include <iostream>
using namespace std;

long double toHop(int n, int k)
{
    if (k > n)
        return 0;
    if (k == 0 || k == n)
        return 1;
    if (k == 1 || k == n - 1)
        return n;
    if (k > n - k)
        k = n - k; // tối ưu hoá
    long double result = 1;
    for (int i = 1; i <= k; i++)
    {
        result = result * (n - i + 1) / i;
    }
    return result;
}

int main()
{
    int n, k;
    cout << "Nhap n: ";
    cin >> n;
    cout << "Nhap k: ";
    cin >> k;
    cout << "C(" << n << ", " << k << ") = " << toHop(n, k) << endl;
    return 0;
}
```

---

## 🔍 Giải thích chi tiết

### 1️⃣ Hàm `toHop(int n, int k)`

Hàm này tính tổ hợp C(n, k) với các trường hợp đặc biệt và tối ưu:

#### **Các trường hợp biên:**

```cpp
if (k > n)
    return 0;
```
- **Ý nghĩa:** Không thể chọn k phần tử từ n phần tử khi k > n
- **Ví dụ:** C(5, 7) = 0

```cpp
if (k == 0 || k == n)
    return 1;
```
- **Ý nghĩa:** 
  - C(n, 0) = 1: Chỉ có 1 cách chọn 0 phần tử (không chọn gì)
  - C(n, n) = 1: Chỉ có 1 cách chọn tất cả n phần tử
- **Ví dụ:** C(5, 0) = 1, C(5, 5) = 1

```cpp
if (k == 1 || k == n - 1)
    return n;
```
- **Ý nghĩa:**
  - C(n, 1) = n: Có n cách chọn 1 phần tử từ n phần tử
  - C(n, n-1) = n: Có n cách loại bỏ 1 phần tử
- **Ví dụ:** C(5, 1) = 5, C(5, 4) = 5

#### **Tối ưu hóa:**

```cpp
if (k > n - k)
    k = n - k;
```
- **Ý nghĩa:** Sử dụng tính chất C(n, k) = C(n, n-k)
- **Mục đích:** Giảm số vòng lặp xuống còn tối đa n/2
- **Ví dụ:** C(100, 98) = C(100, 2) → Chỉ cần tính 2 vòng lặp thay vì 98

#### **Vòng lặp tính toán:**

```cpp
long double result = 1;
for (int i = 1; i <= k; i++)
{
    result = result * (n - i + 1) / i;
}
```

**Cách hoạt động:**
- Tính theo công thức: $C(n,k) = \frac{n \times (n-1) \times ... \times (n-k+1)}{1 \times 2 \times ... \times k}$
- Nhân và chia luân phiên để **tránh tràn số**
- Sử dụng `long double` để lưu kết quả lớn

**Ví dụ tính C(5, 3):**
- Bước 1 (i=1): `result = 1 * (5-1+1) / 1 = 5`
- Bước 2 (i=2): `result = 5 * (5-2+1) / 2 = 10`
- Bước 3 (i=3): `result = 10 * (5-3+1) / 3 = 10`
- **Kết quả:** C(5, 3) = 10

---

### 2️⃣ Hàm `main()`

```cpp
int n, k;
cout << "Nhap n: ";
cin >> n;
cout << "Nhap k: ";
cin >> k;
cout << "C(" << n << ", " << k << ") = " << toHop(n, k) << endl;
```

**Chức năng:**
1. Nhập giá trị n (tổng số phần tử)
2. Nhập giá trị k (số phần tử cần chọn)
3. Gọi hàm `toHop()` và in kết quả

---

## ▶️ Ví dụ chạy chương trình

### **Test case 1:**
```
Nhap n: 5
Nhap k: 2
C(5, 2) = 10
```
**Giải thích:** Số cách chọn 2 phần tử từ 5 phần tử là 10

### **Test case 2:**
```
Nhap n: 10
Nhap k: 3
C(10, 3) = 120
```

### **Test case 3:**
```
Nhap n: 50
Nhap k: 25
C(50, 25) = 1.26411e+14
```
**Lưu ý:** Kết quả rất lớn, hiển thị dạng số mũ

### **Test case 4:**
```
Nhap n: 5
Nhap k: 0
C(5, 0) = 1
```

---

## ⚙️ Ưu điểm của thuật toán

| Ưu điểm | Mô tả |
|---------|-------|
| ✅ **Tránh tràn số** | Nhân và chia luân phiên thay vì tính giai thừa riêng |
| ✅ **Tối ưu tốc độ** | Tối đa k ≤ n/2 nhờ tính chất đối xứng |
| ✅ **Xử lý trường hợp đặc biệt** | Trả về ngay kết quả cho các trường hợp biên |
| ✅ **Độ chính xác cao** | Sử dụng `long double` cho số lớn |

---

## 🎯 Độ phức tạp

- **Thời gian:** O(min(k, n-k))
- **Không gian:** O(1)

---

## 🔧 Cách biên dịch và chạy

### **Trên Windows (Dev-C++, Code::Blocks):**
```bash
g++ -o combination combination.cpp
combination.exe
```

### **Trên Linux/Mac:**
```bash
g++ -o combination combination.cpp
./combination
```

---

## 📚 Ứng dụng thực tế

1. **Xác suất thống kê:** Tính số cách chọn mẫu
2. **Lý thuyết trò chơi:** Tính số tổ hợp trong xổ số, poker
3. **Tổ hợp học:** Giải các bài toán đếm
4. **Sinh học:** Tính số cách sắp xếp gen

---

## 💡 Lưu ý quan trọng

⚠️ **Giới hạn:**
- Với n, k quá lớn (n > 1000), kết quả có thể vượt quá giới hạn của `long double`
- Cân nhắc sử dụng thư viện số lớn (BigInteger) hoặc lấy modulo khi cần

⚠️ **Kiểm tra đầu vào:**
- Nên thêm kiểm tra `n >= 0` và `k >= 0` để tránh lỗi

---

## 🚀 Bài tập mở rộng

1. Thêm kiểm tra đầu vào hợp lệ (n, k >= 0)
2. Tính và in ra tam giác Pascal với n hàng
3. Viết hàm tính số tổ hợp lặp C'(n, k)
4. Tối ưu hơn nữa với Dynamic Programming (Quy hoạch động)

---

**📅 Ngày tạo:** 2025  
**👨‍💻 Ngôn ngữ:** C++  
**📖 Chủ đề:** Toán học - Tổ hợp - Combinatorics
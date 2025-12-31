# 🌟 Bài Giảng: Số Hoàn Hảo (Perfect Numbers)

---

## 📚 Mục Lục

1. [Định Nghĩa](#định-nghĩa)
2. [Ví Dụ Minh Họa](#ví-dụ-minh-họa)
3. [Phân Tích Code](#phân-tích-code)
4. [Giải Thích Chi Tiết Thuật Toán](#giải-thích-chi-tiết-thuật-toán)
5. [Lịch Sử Và Ứng Dụng](#lịch-sử-và-ứng-dụng)
6. [Bài Tập Thực Hành](#bài-tập-thực-hành)

---

## 🎯 Định Nghĩa

### Số Hoàn Hảo là gì?

**Số hoàn hảo** là một số tự nhiên bằng tổng của tất cả các ước số thực sự của nó (không bao gồm chính nó).

**Công thức toán học:**

```
n = d₁ + d₂ + d₃ + ... + dₖ

Trong đó:
- n là số hoàn hảo
- d₁, d₂, ..., dₖ là tất cả các ước số của n (1 ≤ dᵢ < n)
```

---

## 💡 Ví Dụ Minh Họa

### 🔹 Ví Dụ 1: Số 6 (Số Hoàn Hảo Nhỏ Nhất)

Các ước số của **6** (không bao gồm 6):

```
├─ 1 (6 ÷ 1 = 6)
├─ 2 (6 ÷ 2 = 3)
└─ 3 (6 ÷ 3 = 2)

Tổng: 1 + 2 + 3 = 6 ✅
```

**Kết luận:** 6 là số hoàn hảo vì tổng các ước số đúng bằng chính nó.

---

### 🔹 Ví Dụ 2: Số 28 (Số Hoàn Hảo Thứ Hai)

Các ước số của **28** (không bao gồm 28):

```
├─ 1  (28 ÷ 1 = 28)
├─ 2  (28 ÷ 2 = 14)
├─ 4  (28 ÷ 4 = 7)
├─ 7  (28 ÷ 7 = 4)
└─ 14 (28 ÷ 14 = 2)

Tổng: 1 + 2 + 4 + 7 + 14 = 28 ✅
```

**Kết luận:** 28 là số hoàn hảo!

---

### 🔹 Ví Dụ 3: Số 12 (KHÔNG Phải Số Hoàn Hảo)

Các ước số của **12** (không bao gồm 12):

```
├─ 1  (12 ÷ 1 = 12)
├─ 2  (12 ÷ 2 = 6)
├─ 3  (12 ÷ 3 = 4)
├─ 4  (12 ÷ 4 = 3)
└─ 6  (12 ÷ 6 = 2)

Tổng: 1 + 2 + 3 + 4 + 6 = 16 ≠ 12 ❌
```

**Kết luận:** 12 KHÔNG là số hoàn hảo vì tổng các ước số (16) khác với chính nó.

---

## 🔧 Phân Tích Code

```cpp
#include <iostream>
#include <cmath>
using namespace std;

bool laSoHoanHao(long long n)
{
    if (n <= 1)
        return false;
    long long sum = 1;
    for (long long i = 2; i <= sqrt(n); i++)
    {
        if (n % i == 0)
        {
            sum += i;
            if (i != n / i)
                sum += n / i;
        }
    }
    return sum == n;
}

int main()
{
    long long n;
    cout << "Nhập n: ";
    cin >> n;
    if (laSoHoanHao(n))
        cout << "So vua nhap la so hoan hao\n";
    else
        cout << "So vua nhap khong phai la so hoan hao\n";
    return 0;
}
```

---

## 📖 Giải Thích Chi Tiết Thuật Toán

### 📌 Bước 1: Kiểm Tra Điều Kiện Cơ Bản

```cpp
if (n <= 1)
    return false;
```

**Lý do:**

- Số hoàn hảo phải ≥ 6 (nhỏ nhất)
- Số ≤ 1 không thể là số hoàn hảo

---

### 📌 Bước 2: Khởi Tạo Tổng Các Ước Số

```cpp
long long sum = 1;
```

**Giải thích:**

- Luôn bắt đầu với `sum = 1` vì **1 luôn là ước số của n**
- Không cần kiểm tra 1 trong vòng lặp

---

### 📌 Bước 3: Tìm Tất Cả Các Ước Số

```cpp
for (long long i = 2; i <= sqrt(n); i++)
{
    if (n % i == 0)
    {
        sum += i;
        if (i != n / i)
            sum += n / i;
    }
}
```

**Thuật toán chia nửa tìm ước:**

| Bước                  | Giải thích                                                 |
| --------------------- | ---------------------------------------------------------- |
| `i = 2` đến `sqrt(n)` | ✅ Chỉ cần lặp đến căn bậc 2 của n (tiết kiệm thời gian)   |
| `if (n % i == 0)`     | ✅ Nếu i chia hết n, thì i và n/i đều là ước               |
| `sum += i`            | ✅ Thêm ước số i vào tổng                                  |
| `if (i != n / i)`     | ✅ Tránh cộng trùng nếu i = n/i (khi n là số chính phương) |
| `sum += n / i`        | ✅ Thêm ước số đôi n/i vào tổng                            |

**Ví dụ: n = 28**

| i                     | 28 % i | i là ước? | n/i | sum          |
| --------------------- | ------ | --------- | --- | ------------ |
| 1                     | -      | -         | -   | 1 (khởi tạo) |
| 2                     | 0      | ✅        | 14  | 1+2+14=17    |
| 3                     | 1      | ❌        | -   | 17           |
| 4                     | 0      | ✅        | 7   | 17+4+7=28    |
| 5                     | 3      | ❌        | -   | 28           |
| **DỪNG** (√28 ≈ 5.29) | -      | -         | -   | -            |

**Kết quả:** sum = 28 = n → Đúng! ✅

---

### 📌 Bước 4: So Sánh Và Trả Kết Quả

```cpp
return sum == n;
```

- Nếu tổng các ước bằng n → Trả về `true` (là số hoàn hảo)
- Nếu tổng khác n → Trả về `false` (không phải số hoàn hảo)

---

### 🎯 Tại Sao Chỉ Cần Kiểm Tra Đến sqrt(n)?

**Nguyên lý:**

```
Nếu i là ước của n, thì n/i cũng là ước của n.
Và i × (n/i) = n

Chứng minh:
- Nếu i ≤ sqrt(n) thì n/i ≥ sqrt(n)
- Do đó, chỉ cần kiểm tra đến sqrt(n) là đã tìm được cặp ước (i, n/i)
- Tiết kiệm 50% thời gian!
```

**Ví dụ: n = 36**

```
√36 = 6

i = 1: Ước (1, 36)
i = 2: Ước (2, 18)
i = 3: Ước (3, 12)
i = 4: Ước (4, 9)
i = 5: KHÔNG là ước
i = 6: Ước (6, 6) → Chỉ cộng 1 lần!

Dừng tại i = 6 (= √36) ✅
```

---

## 🌍 Lịch Sử Và Ứng Dụng

### 📜 Lịch Sử

| Thời Kỳ             | Sự Kiện                                                       |
| ------------------- | ------------------------------------------------------------- |
| **Cổ Đại (Hy Lạp)** | Pythagoras phát hiện số 6 và 28 là số hoàn hảo (6 thế kỷ TCN) |
| **Thế Kỷ 1**        | Nicomachus tìm được số hoàn hảo thứ 3: **496**                |
| **Thế Kỷ 15-16**    | Phát hiện số hoàn hảo thứ 4: **8128**                         |
| **1952+**           | Dùng máy tính, phát hiện hơn 50 số hoàn hảo                   |
| **Hiện tại**        | Biết 52 số hoàn hảo (tính đến 2024)                           |

---

### 🔬 Các Số Hoàn Hảo Đầu Tiên

```
🥇 6      = 1 + 2 + 3
🥈 28     = 1 + 2 + 4 + 7 + 14
🥉 496    = 1 + 2 + 4 + 8 + 16 + 31 + 62 + 124 + 248
🏅 8128   = 1 + 2 + 4 + 8 + 16 + 32 + 64 + 127 + 254 + 508 + ...
```

---

### 💎 Tính Chất Thú Vị

1. **Mọi số hoàn hảo đều là chẵn** (tính đến hiện nay, chưa có bằng chứng cho số hoàn hảo lẻ)

2. **Công thức Euclid-Euler:**

   ```
   Nếu 2^p - 1 là số nguyên tố
   → 2^(p-1) × (2^p - 1) là số hoàn hảo

   Ví dụ:
   p = 2: 2^1 × (2^2 - 1) = 2 × 3 = 6 ✅
   p = 3: 2^2 × (2^3 - 1) = 4 × 7 = 28 ✅
   p = 5: 2^4 × (2^5 - 1) = 16 × 31 = 496 ✅
   ```

3. **Chữ số cuối cùng** luôn là 6 hoặc 28 trong 2 chữ số cuối

---

### 🎨 Ứng Dụng Thực Tiễn

- **Lý thuyết số học:** Nghiên cứu cấu trúc số
- **Mã hóa:** Thuật toán phân tích số nguyên tố liên quan
- **Khoa học máy tính:** Tối ưu hóa tìm kiếm và sắp xếp
- **Triết học & Tôn giáo:** Cổ xưa, số 6 được xem là "hoàn hảo" vì Chúa tạo thế giới trong 6 ngày

---

## ✏️ Bài Tập Thực Hành

### 🎓 Bài 1: Xác Định Số Hoàn Hảo

Kiểm tra các số sau có phải số hoàn hảo không?

```
a) 15  →  Ước: 1, 3, 5. Tổng: 9 ≠ 15 → ❌
b) 24  →  Ước: 1, 2, 3, 4, 6, 8, 12. Tổng: 36 ≠ 24 → ❌
c) 496 →  ? (Gợi ý: Nó là số hoàn hảo thứ 3)
```

---

### 🎓 Bài 2: Viết Chương Trình Tìm Tất Cả Số Hoàn Hảo

Viết chương trình in ra **tất cả số hoàn hảo từ 1 đến 10000**.

```
Kết quả dự kiến:
Các số hoàn hảo từ 1 đến 10000: 6, 28, 496, 8128
```

---

### 🎓 Bài 3: Tìm Các Ước Số

Viết hàm tìm và in ra tất cả các ước số của một số n.

```cpp
void inUocSo(long long n)
{
    // TODO: In tất cả ước số của n
}

// Test
inUocSo(28);  // Output: 1 2 4 7 14
```

---

### 🎓 Bài 4: Mở Rộng

Viết chương trình tìm **số dồi dào** (abundant number):

```
Số dồi dào là số nhỏ hơn tổng các ước số thực sự của nó.
Ví dụ: 12 = 1+2+3+4+6 = 16 > 12 → Dồi dào
```

---

## 🧠 Độ Phức Tạp Thuật Toán

```
Thời gian: O(√n)
  → Vòng lặp chạy từ 2 đến √n
  → Mỗi phép kiểm tra mất O(1)

Không gian: O(1)
  → Chỉ dùng một vài biến
```

**So sánh:**
| Phương pháp | Thời gian | Ghi chú |
|-------------|-----------|---------|
| Naive (kiểm tra tất cả i từ 1 đến n-1) | O(n) | Chậm 🐢 |
| **Tối ưu (đến √n)** | **O(√n)** | **Nhanh ⚡** |

---

## 🎬 Lời Kết

Số hoàn hảo là một khái niệm toán học kỳ thú kết hợp giữa:

- **Lý thuyết:** Sâu sắc về tính chất số học
- **Thực hành:** Giúp hiểu rõ thuật toán tối ưu
- **Ứng dụng:** Cơ sở cho nhiều bài toán phức tạp

Hy vọng bài học này giúp bạn nắm vững kiến thức về số hoàn hảo! 🌟

---

_Biên soạn: Bài giảng số hoàn hảo - Perfect Numbers_  
_Cập nhật: 2025_

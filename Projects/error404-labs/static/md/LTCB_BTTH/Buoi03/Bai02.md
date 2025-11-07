# 🎓 Bài Giảng: Tính Tổ Hợp (Combination) trong C++

## 📚 Mục Lục
- [1. Khái Niệm Cơ Bản](#khái-niệm)
- [2. Công Thức Toán Học](#công-thức)
- [3. Phân Tích Code](#phân-tích)
- [4. Chi Tiết Từng Hàm](#chi-tiết)
- [5. Ví Dụ Minh Họa](#ví-dụ)
- [6. Bài Tập](#bài-tập)

---

## 1️⃣ Khái Niệm Cơ Bản {#khái-niệm}

### 💡 Tổ Hợp là gì?

Tổ hợp chập k của n phần tử (ký hiệu: **C(n,k)** hoặc **Cₙᵏ**) là số cách chọn **k phần tử** từ **n phần tử** mà **không phân biệt thứ tự** và **không được lặp lại**.

### 📊 Ví Dụ Thực Tế

Giả sử bạn có 4 chiếc kẹo: 🍬 🍭 🍫 🍯

Hỏi: Có bao nhiêu cách chọn 2 chiếc kẹo?

**Đáp án:** C(4,2) = 6 cách
- 🍬 + 🍭
- 🍬 + 🍫
- 🍬 + 🍯
- 🍭 + 🍫
- 🍭 + 🍯
- 🍫 + 🍯

**Lưu ý:** Chọn 🍬 rồi 🍭 giống như chọn 🍭 rồi 🍬 (không phân biệt thứ tự)

---

## 2️⃣ Công Thức Toán Học {#công-thức}

### 🔢 Công Thức Chính

$$C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}$$

**Trong đó:**
- **n!** (n giai thừa) = n × (n-1) × (n-2) × ... × 2 × 1
- **k!** = k × (k-1) × (k-2) × ... × 2 × 1
- **(n-k)!** = (n-k) × (n-k-1) × ... × 2 × 1

### 📌 Các Trường Hợp Đặc Biệt

| Điều kiện | Kết quả | Giải thích |
|-----------|--------|-----------|
| k = 0 | C(n, 0) = 1 | Có 1 cách chọn 0 phần tử (chọn không cái gì) |
| k = n | C(n, n) = 1 | Có 1 cách chọn tất cả n phần tử |
| k = 1 | C(n, 1) = n | Có n cách chọn 1 phần tử |
| k > n | C(n, k) = 0 | Không thể chọn nhiều hơn số phần tử có sẵn |
| k < 0 | C(n, k) = 0 | Số lượng âm không có ý nghĩa |

### 🎯 Tính Chất Đối Xứng

$$C(n, k) = C(n, n-k)$$

**Ví dụ:** C(5, 2) = C(5, 3) = 10

---

## 3️⃣ Phân Tích Code {#phân-tích}

### 📋 Cấu Trúc Chương Trình

```
┌─────────────────────────────────┐
│   NHẬP DỮ LIỆU (n, k)           │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   KIỂM TRA TÍNH HỢP LỆ          │
│   - n, k có phải số nguyên?     │
│   - k ≤ n?                      │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   TÍnh TỔNG HỢP toHop(n, k)     │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   XUẤT KẾT QUẢ                  │
└─────────────────────────────────┘
```

---

## 4️⃣ Chi Tiết Từng Hàm {#chi-tiết}

### 🔧 Hàm toHop()

```cpp
long double toHop(int n, int k)
```

**Chức năng:** Tính C(n, k) - số tổ hợp chập k của n phần tử

**Kiểu dữ liệu:**
- **Input:** n, k (số nguyên)
- **Output:** long double (số thập phân dài để chứa các số rất lớn)

#### 📍 Bước 1: Kiểm Tra Điều Kiện Hợp Lệ

```cpp
if (n < 0 || k < 0 || k > n)
    return 0;
```

**Lý do:** Nếu n âm, k âm, hoặc k > n thì không thể có tổ hợp hợp lệ
- k > n: Không thể chọn 5 phần tử từ 3 phần tử ❌

#### 📍 Bước 2: Xử Lý Các Trường Hợp Cơ Bản

```cpp
if (k == 0 || k == n)
    return 1;
```

**Giải thích:**
- C(n, 0) = 1: Chỉ có 1 cách chọn không cái gì
- C(n, n) = 1: Chỉ có 1 cách chọn tất cả

```cpp
if (k == 1 || k == n - 1)
    return n;
```

**Giải thích:**
- C(n, 1) = n: Chọn 1 phần tử trong n phần tử → n cách
- C(n, n-1) = n: Chọn n-1 phần tử = bỏ đi 1 phần tử → n cách

#### 📍 Bước 3: Tối Ưu Hóa

```cpp
if (k > n - k)
    k = n - k;
```

**Lý do:** Sử dụng tính chất đối xứng C(n, k) = C(n, n-k)

**Ví dụ:**
- C(10, 8) = C(10, 2)
- Tính C(10, 2) nhanh hơn tính C(10, 8)

#### 📍 Bước 4: Tính Toán

```cpp
long double result = 1;
for (int i = 1; i <= k; i++)
{
    result = result * (n - i + 1) / i;
}
return result;
```

**Công thức sử dụng:**

$$C(n, k) = \frac{n}{1} \times \frac{n-1}{2} \times \frac{n-2}{3} \times ... \times \frac{n-k+1}{k}$$

**Cách hoạt động:**

| i | Phép tính | Kết quả |
|---|----------|--------|
| 1 | result = 1 × (n) / 1 | n |
| 2 | result = n × (n-1) / 2 | n(n-1)/2 |
| 3 | result = ... × (n-2) / 3 | n(n-1)(n-2)/6 |
| ... | ... | ... |
| k | result = ... × (n-k+1) / k | C(n,k) |

**Ưu điểm:** 
- ✅ Tránh tính giai thừa quá lớn
- ✅ Giảm lỗi làm tròn
- ✅ Nhanh hơn cách tính trực tiếp

### 🔧 Hàm main()

```cpp
int main()
{
    int n, k;
    
    // Nhập và kiểm tra n
    cout << "Nhap n: ";
    if (!(cin >> n)) {
        cout << "Loi: n phai la so nguyen!" << endl;
        return 1;
    }
    
    // Nhập và kiểm tra k
    cout << "Nhap k: ";
    if (!(cin >> k)) {
        cout << "Loi: k phai la so nguyen!" << endl;
        return 1;
    }
    
    // Tính và in kết quả
    cout << "C(" << n << ", " << k << ") = " << toHop(n, k) << endl;
    return 0;
}
```

**Công dụng:** Chương trình chính - giao tiếp với người dùng

---

## 5️⃣ Ví Dụ Minh Họa {#ví-dụ}

### 📝 Ví Dụ 1: Chọn kẹo

**Bài toán:** Có 5 chiếc kẹo khác nhau. Chọn 2 chiếc. Có bao nhiêu cách?

**Giải:**
```
C(5, 2) = 5! / (2! × 3!)
        = (5 × 4 × 3 × 2 × 1) / (2 × 1 × 3 × 2 × 1)
        = 120 / 12
        = 10
```

**Lần chạy chương trình:**
```
Nhap n: 5
Nhap k: 2
C(5, 2) = 10
```

### 📝 Ví Dụ 2: Chọn học sinh

**Bài toán:** Lớp có 10 học sinh. Chọn 3 học sinh lập ban cán sự (không phân biệt chức vụ). Có bao nhiêu cách?

**Giải:**
```
C(10, 3) = 10! / (3! × 7!)
         = (10 × 9 × 8) / (3 × 2 × 1)
         = 720 / 6
         = 120
```

**Lần chạy chương trình:**
```
Nhap n: 10
Nhap k: 3
C(10, 3) = 120
```

### 📝 Ví Dụ 3: Input không hợp lệ

**Lần chạy chương trình:**
```
Nhap n: abc
Loi: n phai la so nguyen!
```

### 📝 Ví Dụ 4: k > n

**Bài toán:** Chọn 8 học sinh từ 5 học sinh - không thể!

**Lần chạy chương trình:**
```
Nhap n: 5
Nhap k: 8
C(5, 8) = 0
```

---

## 6️⃣ Bài Tập {#bài-tập}

### 🎯 Bài Tập 1: Kiến Thức Cơ Bản

**Câu 1:** Tính C(6, 2)
- A) 10
- B) 15 ✓
- C) 20
- D) 30

**Câu 2:** Tính C(8, 3)
- A) 32
- B) 56 ✓
- C) 64
- D) 84

**Câu 3:** C(n, 0) bằng?
- A) 0
- B) 1 ✓
- C) n
- D) n!

### 🔨 Bài Tập 2: Ứng Dụng Thực Tế

**Câu 1:** Có bao nhiêu cách chọn 2 bạn từ 7 bạn để đi chơi?
```
Đáp án: C(7, 2) = 21 cách
```

**Câu 2:** Có bao nhiêu cách chọn 4 quân bài từ bộ 52 quân?
```
Đáp án: C(52, 4) = 270,725 cách
```

**Câu 3:** Một bộ đồ thể thao có 3 áo và 4 quần. Có bao nhiêu cách chọn 1 áo và 1 quần?
```
Đáp án: C(3, 1) × C(4, 1) = 3 × 4 = 12 cách
```

### 💻 Bài Tập 3: Lập Trình

**Câu 1:** Sửa code để tính hoán vị A(n, k) thay vì tổ hợp?
```
Gợi ý: A(n, k) = n! / (n-k)!
       A(n, k) = n × (n-1) × ... × (n-k+1)
```

**Câu 2:** Thêm xử lý lỗi để kiểm tra n, k có vượt quá 100 không?

**Câu 3:** Viết chương trình in ra tam giác Pascal sử dụng hàm toHop()?

---

## 📊 Bảng Tra Cứu Nhanh

```
C(n,k)  k=0  k=1  k=2  k=3  k=4  k=5
n=0      1
n=1      1    1
n=2      1    2    1
n=3      1    3    3    1
n=4      1    4    6    4    1
n=5      1    5   10   10    5    1
n=6      1    6   15   20   15    6    1
n=7      1    7   21   35   35   21    1
n=8      1    8   28   56   70   56   28
```

---

## ⚡ Độ Phức Tạp

| Yếu tố | Chi tiết |
|--------|----------|
| **Thời gian** | O(k) hoặc O(n-k) - tùy whichever nhỏ hơn |
| **Không gian** | O(1) - chỉ dùng một biến result |
| **Độ chính xác** | Sử dụng long double để tránh overflow |

---

## 🎓 Kết Luận

**Những điểm quan trọng cần nhớ:**

✓ Tổ hợp C(n, k) = n! / (k!(n-k)!)

✓ Tính chất đối xứng: C(n, k) = C(n, n-k)

✓ Các trường hợp đặc biệt: C(n, 0) = C(n, n) = 1

✓ Tối ưu hóa: Tính toán với k nhỏ hơn

✓ Sử dụng long double để xử lý số lớn

---

**📖 Tài Liệu Tham Khảo:**
- Lý thuyết tổ hợp và xác suất
- Thuật toán tính toán hiệu quả
- Xử lý lỗi input trong C++

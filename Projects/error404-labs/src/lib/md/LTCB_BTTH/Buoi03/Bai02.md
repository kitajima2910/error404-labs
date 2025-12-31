# 📚 Bài Giảng: Tính Tổ Hợp C(n,k) trong C++

---

## 🎯 Mục Tiêu Bài Học

Sau bài học này, bạn sẽ hiểu được:

- ✅ Khái niệm tổ hợp toán học
- ✅ Công thức tính tổ hợp C(n,k)
- ✅ Cách cài đặt hiệu quả bằng C++
- ✅ Ứng dụng thực tế của tổ hợp

---

## 📖 1. Khái Niệm Tổ Hợp (Combination)

### 📌 Định Nghĩa

**Tổ hợp C(n,k)** là số cách chọn **k phần tử** từ **n phần tử** mà **không quan tâm đến thứ tự**.

Ký hiệu: **C(n,k)** hoặc **C(n,k)** hoặc **C\_{n}^{k}**

### 🔢 Công Thức Toán Học

$$C(n,k) = \frac{n!}{k!(n-k)!}$$

Trong đó:

- **n!** = 1 × 2 × 3 × ... × n (giai thừa của n)
- **k!** = giai thừa của k
- **(n-k)!** = giai thừa của (n-k)

### 💡 Ví Dụ Đơn Giản

**Bài toán:** Có 5 bạn học sinh {A, B, C, D, E}. Hãy chọn 2 bạn để tham gia câu lạc bộ. Có bao nhiêu cách chọn?

**Giải:**

- Các cách chọn: {A,B}, {A,C}, {A,D}, {A,E}, {B,C}, {B,D}, {B,E}, {C,D}, {C,E}, {D,E}
- Tổng cộng: **10 cách**
- Tính toán: C(5,2) = 5!/(2!×3!) = 120/(2×6) = 10 ✓

---

## 🏢 2. Ứng Dụng Thực Tế của Tổ Hợp

### 📋 Các Ứng Dụng Phổ Biến

| 🎲 Lĩnh Vực       | 📝 Ứng Dụng                                               |
| ----------------- | --------------------------------------------------------- |
| **🎰 Xổ số**      | Tính số kết quả có thể của xổ số (ví dụ: chọn 6 số từ 45) |
| **🏀 Thể thao**   | Xếp hạng vòng tròn, chọn đội hình từ danh sách cầu thủ    |
| **💼 Kinh doanh** | Chọn nhân viên cho dự án, lập team từ bộ phận             |
| **🍕 Thực phẩm**  | Tính toán các tổ hợp topping pizza, combo đồ uống         |
| **🎓 Giáo dục**   | Tính số cách sắp xếp đề thi, chọn câu hỏi                 |
| **🧬 Sinh học**   | Phân tích tổ hợp gene, xác suất di truyền                 |

### 🎯 Ví Dụ Thực Tế Chi Tiết

**Ví dụ 1: Xổ số Mega 6/45**

- Chọn 6 số từ 45 số
- C(45,6) = 8.145.060 cách
- ➜ Xác suất trúng độc đắc: 1/8.145.060 ≈ 0.0000123%

**Ví dụ 2: Lựa chọn tâm sự nhân viên**

- Công ty có 10 nhân viên, cần chọn 3 người vào ban quản lý
- C(10,3) = 10!/(3!×7!) = 120 cách

---

## 💻 3. Phân Tích Code

### 🔍 Hàm Chính: `toHop(int n, int k)`

```cpp
long double toHop(int n, int k)
{
    // Bước 1: Kiểm tra điều kiện hợp lệ
    if (n < 0 || k < 0 || k > n) {
        return 0;
    }

    // Bước 2: Trường hợp cơ sở
    if (k == 0 || k == n) {
        return 1;  // C(n,0) = 1 và C(n,n) = 1
    }

    // Bước 3: Tối ưu hóa
    if (k > n - k) {
        k = n - k;  // Dùng tính chất C(n,k) = C(n,n-k)
    }

    // Bước 4: Tính toán
    long double result = 1.0L;
    for (int i = 1; i <= k; i++) {
        result = result * (n - i + 1) / i;
    }

    return result;
}
```

### 📌 Chi Tiết Từng Bước

#### **Bước 1: Kiểm tra điều kiện**

```cpp
if (n < 0 || k < 0 || k > n) {
    return 0;
}
```

- ✅ **n ≥ 0**: n phải là số tự nhiên
- ✅ **k ≥ 0**: k phải là số tự nhiên
- ✅ **k ≤ n**: không thể chọn nhiều phần tử hơn tổng số phần tử

#### **Bước 2: Trường hợp cơ sở**

```cpp
if (k == 0 || k == n) {
    return 1;
}
```

- **C(n,0) = 1**: chỉ có 1 cách chọn 0 phần tử (chọn không gì cả)
- **C(n,n) = 1**: chỉ có 1 cách chọn n phần tử (chọn hết)

Ví dụ:

- C(5,0) = 1 ✓
- C(5,5) = 1 ✓

#### **Bước 3: Trường hợp đặc biệt**

```cpp
if (k == 1 || k == n - 1) {
    return n;
}
```

- **C(n,1) = n**: chọn 1 từ n phần tử có n cách
- **C(n,n-1) = n**: chỏn n-1 từ n tương đương loại 1 phần tử, có n cách

Ví dụ:

- C(5,1) = 5 ✓
- C(5,4) = 5 ✓

#### **Bước 4: Tối ưu hóa (Pruning)**

```cpp
if (k > n - k) {
    k = n - k;
}
```

- **Tính chất**: C(n,k) = C(n,n-k)
- **Lợi ích**: Giảm số vòng lặp, tiết kiệm thời gian
- Ví dụ: C(10,7) = C(10,3), chỉ cần tính 3 lần thay vì 7 lần

#### **Bước 5: Tính toán chính**

```cpp
long double result = 1.0L;
for (int i = 1; i <= k; i++) {
    result = result * (n - i + 1) / i;
}
```

**Giải thích công thức:**

Thay vì tính $\frac{n!}{k!(n-k)!}$ trực tiếp (dễ overflow), ta tính tuần tự:

$$C(n,k) = \frac{n}{1} \times \frac{n-1}{2} \times \frac{n-2}{3} \times ... \times \frac{n-k+1}{k}$$

**Ví dụ với C(5,2):**

- i=1: result = 1.0 × (5-1+1)/1 = 5.0/1 = 5.0
- i=2: result = 5.0 × (5-2+1)/2 = 5.0 × 4.0/2 = 10.0 ✓

---

## 🎮 4. Hàm Main: Nhập/Xuất Dữ Liệu

```cpp
int main()
{
    int n, k;

    // Nhập n
    cout << "Nhap n: ";
    if (!(cin >> n)) {
        cout << "Loi: n phai la so nguyen!\n";
        return 1;
    }

    // Nhập k
    cout << "Nhap k: ";
    if (!(cin >> k)) {
        cout << "Loi: k phai la so nguyen!\n";
        return 1;
    }

    // Kiểm tra điều kiện
    if (n < 0 || k < 0 || k > n) {
        cout << "Loi: dieu kien n >= k >= 0 khong dung!\n";
        return 1;
    }

    // Tính và in kết quả
    cout << "C(" << n << ", " << k << ") = " << toHop(n, k) << endl;
    return 0;
}
```

### 🛡️ Xử Lý Lỗi

1. **Kiểm tra đầu vào không phải số**: `if (!(cin >> n))`
2. **Kiểm tra điều kiện toán học**: `if (n < 0 || k < 0 || k > n)`

---

## 🧪 5. Các Bài Test Thực Hành

### Test 1️⃣: Trường Hợp Cơ Bản

```
Nhập n: 5
Nhập k: 2
Output: C(5, 2) = 10
```

### Test 2️⃣: Trường Hợp Đặc Biệt

```
Nhập n: 5
Nhập k: 0
Output: C(5, 0) = 1

Nhập n: 5
Nhập k: 5
Output: C(5, 5) = 1

Nhập n: 5
Nhập k: 1
Output: C(5, 1) = 5
```

### Test 3️⃣: Bài Toán Lớn

```
Nhập n: 20
Nhập k: 10
Output: C(20, 10) = 184756
```

### Test 4️⃣: Kiểm Tra Tối Ưu

```
Nhập n: 20
Nhập k: 15
Output: C(20, 15) = 15504
(tương đương C(20, 5) = 15504)
```

### Test 5️⃣: Kiểm Tra Lỗi

```
Nhập n: 5
Nhập k: 10
Output: Loi: dieu kien n >= k >= 0 khong dung!

Nhập n: -1
Nhập k: 2
Output: Loi: dieu kien n >= k >= 0 khong dung!
```

---

## 📊 6. Bảng Tính Tổ Hợp Thường Gặp

| n   | k   | C(n,k)    | Ứng dụng              |
| --- | --- | --------- | --------------------- |
| 5   | 2   | 10        | Chọn 2 từ 5           |
| 6   | 3   | 20        | Lập team 3 người từ 6 |
| 10  | 3   | 120       | Chọn 3 từ 10          |
| 10  | 5   | 252       | Chọn 5 từ 10          |
| 20  | 2   | 190       | Chọn 2 từ 20          |
| 52  | 5   | 2.598.960 | Bộ bài 5 cây từ 52    |
| 45  | 6   | 8.145.060 | Xổ số Mega 6/45       |

---

## 🎓 7. Bài Tập Về Nhà

### 📝 Bài 1: Tính Tổ Hợp

Tính C(8,3). Kiểm chứng bằng công thức: $C(8,3) = \frac{8!}{3!×5!}$

### 📝 Bài 2: Ứng Dụng Thực Tế

Một lớp học có 30 học sinh, cần chọn 5 bạn để tham gia cuộc thi. Có bao nhiêu cách chọn?

### 📝 Bài 3: So Sánh

So sánh:

- C(10, 3) vs C(10, 7)
- C(12, 5) vs C(12, 7)
- Rút ra nhận xét

### 📝 Bài 4: Mở Rộng Code

Viết chương trình tính **Chỉnh hợp A(n,k)** = $\frac{n!}{(n-k)!}$

### 📝 Bài 5: Vấn đề Thực Tế

Một nhà hàng có 10 loại topping, cần tạo pizza "combo" với 3 loại topping khác nhau. Có bao nhiêu cách tạo combo? Nếu có 2 loại topping bắt buộc, có bao nhiêu cách?

---

## 🔑 Ghi Nhớ Quan Trọng

- ⭐ **C(n,k) = C(n,n-k)**: Tính chất đối xứng
- ⭐ **C(n,0) = C(n,n) = 1**: Trường hợp cơ sở
- ⭐ **Không quan tâm thứ tự**: Đó là điểm khác giữa Tổ hợp (Combination) và Chỉnh hợp (Permutation)
- ⭐ **Dùng `long double`**: Tránh overflow với số lớn
- ⭐ **Chia trong vòng lặp**: Giữ giá trị nhỏ, tránh tràn số

---

## 📚 Tham Khảo Thêm

**Thuật ngữ Tiếng Anh:**

- Combination (Tổ hợp)
- Permutation (Chỉnh hợp)
- Factorial (Giai thừa)
- Binomial Coefficient (Hệ số nhị thức)

**Liên hệ với các chủ đề khác:**

- Xác suất thống kê: tính xác suất biến cố
- Đại số: hệ số trong khai triển (a+b)ⁿ
- Lý thuyết đồ thị: đếm đường đi, chu trình

---

✨ **HẾT** ✨

# 📘 **Nhập xuất dữ liệu - Tính tổng bình phương hai số**

## 🎯 **Học được gì qua bài này**

- Sử dụng kiểu dữ liệu **`long`** trong C++<br/><br/>
- Thực hiện phép toán lũy thừa bằng hàm **`pow()`**<br/><br/>
- Tính **bình phương** và **tổng bình phương** của hai số<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tổng bình phương**

Tổng bình phương của hai số a, b được tính bằng công thức:

```
Tổng bình phương = a² + b²
```

**Ví dụ:** Tổng bình phương của 3 và 4 là `3² + 4² = 9 + 16 = 25`

---

### 🌟 **Hàm `pow()` trong thư viện `<cmath>`**

Hàm `pow(x, y)` dùng để tính x mũ y (x^y).

**Cú pháp:** `pow(cơ_số, số_mũ)`

**Ví dụ:**

- `pow(2, 3)` = 2³ = 8
- `pow(5, 2)` = 5² = 25
- `pow(3, 2.0f)` = 3² = 9

**Lưu ý:** Khi sử dụng `pow()`, cần include thư viện `#include <cmath>`

---

## 💡 **Code mẫu**---

<details>
<summary>Xem code mẫu</summary>

<iframe title="Nhập xuất dữ liệu - Tính tổng bình phương hai số" scrolling="no" loading="eager" style="height:600px; width: 100%; border:1px solid black; border-radius:6px;" src="https://www.online-cpp.com/I7kgKCBdD3">
</iframe>

</details>

---

## 📊 **Ví dụ kết quả**

**Input:**

```
Nhập a = 3
Nhập b = 4
```

**Output:**

```
Tong binh phuong = 25
```

**Input:**

```
Nhập a = 5
Nhập b = 12
```

**Output:**

```
Tong binh phuong = 169
```

---

## 💡 **Mở rộng bài học**

**Cách 1: Tính bình phương trực tiếp (không dùng `pow()`)**

```cpp
long tong = a * a + b * b;
cout << "Tong binh phuong = " << tong;
```

**Cách 2: Tính và lưu kết quả vào biến riêng**

```cpp
long binhPhuongA = pow(a, 2.0f);
long binhPhuongB = pow(b, 2.0f);
long tong = binhPhuongA + binhPhuongB;
cout << "Tong binh phuong = " << tong;
```

**Cách 3: Tính tổng bình phương của ba số**

```cpp
long a, b, c;
// nhập a, b, c
long tong = pow(a, 2.0f) + pow(b, 2.0f) + pow(c, 2.0f);
cout << "Tong binh phuong = " << tong;
```

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** C/C++ cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thành công!_

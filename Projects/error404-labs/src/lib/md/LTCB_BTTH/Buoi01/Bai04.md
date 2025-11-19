# 📘 **Nhập xuất dữ liệu - Tính trung bình cộng hai số**

## 🎯 **Học được gì qua bài này**

- Sử dụng kiểu dữ liệu **`int`** và **`float`** trong C++<br/><br/>
- Hiểu về **ép kiểu dữ liệu** để thực hiện phép chia chính xác<br/><br/>
- Làm việc với **số thực (float)** có chữ số thập phân<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Phép chia trong C++**

```cpp
int a = 10, b = 3;
int ketQua1 = a / b;        // Kết quả: 3 (chia lấy phần nguyên)
float ketQua2 = a / b;      // Kết quả: 3.0 (vẫn là phần nguyên)
float ketQua3 = (float)a / b;     // Kết quả: 3.333... (chia chính xác)
float ketQua4 = a / (1.0 * b);    // Kết quả: 3.333... (chia chính xác)
```

**Giải thích:**

- Khi chia hai số nguyên, C++ chỉ giữ phần nguyên
- Để có kết quả chính xác, phải ép kiểu một trong hai số thành `float`

---

### 🌟 **Ép kiểu dữ liệu (Casting)**

| Cách ép kiểu    | Ví dụ            | Kết quả    |
| --------------- | ---------------- | ---------- |
| `(float)a / b`  | `(float)10 / 3`  | `3.333...` |
| `a / (float)b`  | `10 / (float)3`  | `3.333...` |
| `a / (1.0 * b)` | `10 / (1.0 * 3)` | `3.333...` |

**Giải thích:**

- **`(float)a`**: Ép kiểu tường minh, chuyển `a` thành `float`
- **`1.0 * b`**: Nhân với số thực để tự động chuyển thành `float`
- Cả ba cách đều cho kết quả chính xác

---

### 🌟 **Trung bình cộng**

Trung bình cộng của hai số a và b được tính bằng công thức:

```
Trung bình cộng = (a + b) / 2
```

Hoặc cách khác:

```
Trung bình cộng = a / 2 + b / 2
```

---

## 💡 **Code mẫu**---

<details>
<summary>Xem code mẫu</summary>

<iframe title="Nhập xuất dữ liệu - Tính trung bình cộng hai số" scrolling="no" loading="eager" style="height:600px; width: 100%; border:1px solid black; border-radius:6px;" src="https://www.online-cpp.com/lkBiDYdUXV">
</iframe>

</details>

---

## 📊 **Ví dụ kết quả**

**Input:**

```
Nhập số a: 10
Nhập số b: 3
```

**Output:**

```

Trung bình cộng: 3.33333
```

**Input:**

```
Nhập số a: 15
Nhập số b: 4
```

**Output:**

```

Trung bình cộng: 3.75
```

---

## ⚠️ **Chú ý quan trọng**

**Không nên làm:**

```cpp
int a = 10, b = 3;
float trungBinh = a / b;  // Sai! Kết quả vẫn là số nguyên
```

**Nên làm:**

```cpp
float trungBinh = (float)a / b;      // Đúng! Kết quả là số thực
float trungBinh = a / (1.0 * b);     // Đúng! Kết quả là số thực
```

---

## 💡 **Mở rộng bài học**

**Tính trung bình cộng của hai số theo công thức:**

```cpp
float trungBinh = ((float)(a + b)) / 2;
cout << "Trung bình cộng: " << trungBinh;
```

**Định dạng kết quả với `printf`:**

```cpp
printf("Trung bình cộng: %.2f\n", trungBinh);  // Hiển thị 2 chữ số thập phân
```

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** C/C++ cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thành công!_

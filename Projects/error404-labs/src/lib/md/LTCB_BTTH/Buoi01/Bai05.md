# 📘 **Nhập xuất dữ liệu - Tính trung bình cộng ba số**

## 🎯 **Học được gì qua bài này**

- Sử dụng kiểu dữ liệu **`float`** trong C++<br/><br/>
- Thực hiện phép toán cộng và chia trên **số thực**<br/><br/>
- Tính **trung bình cộng** của ba số<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Trung bình cộng**

Trung bình cộng của ba số x, y, z được tính bằng công thức:

```
Trung bình cộng = (x + y + z) / 3
```

**Ví dụ:** Trung bình cộng của 5, 8, 10 là `(5 + 8 + 10) / 3 = 23 / 3 = 7.666...`

---

### 🌟 **Thứ tự ưu tiên toán tử**

| Toán tử  | Độ ưu tiên | Thứ tự |
| -------- | ---------- | ------ |
| `()`     | Cao nhất   | 1      |
| `*`, `/` | Trung bình | 2      |
| `+`, `-` | Thấp nhất  | 3      |

**Giải thích:** `(x + y + z) / 3` sẽ tính tổng trước, rồi chia cho 3

---

## 💡 **Code mẫu**---

<details>
<summary>Xem code mẫu</summary>

<iframe title="Nhập xuất dữ liệu - Tính trung bình cộng ba số" scrolling="no" loading="eager" style="height:600px; width: 100%; border:1px solid black; border-radius:6px;" src="https://www.online-cpp.com/FtTI0EBZLZ">
</iframe>

</details>

---

## 📊 **Ví dụ kết quả**

**Input:**

```
Nhập x: 5
Nhập y: 8
Nhập z: 10
```

**Output:**

```

Trung bình: 7.66667
```

**Input:**

```
Nhập x: 3.5
Nhập y: 4.2
Nhập z: 5.8
```

**Output:**

```

Trung bình: 4.5
```

---

## 💡 **Mở rộng bài học**

**Cách 1: Lưu kết quả vào biến rồi xuất**

```cpp
float trungBinh = (x + y + z) / 3;
cout << "\nTrung bình: " << trungBinh;
```

**Cách 2: Định dạng kết quả với `printf`**

```cpp
printf("\nTrung bình: %.2f\n", (x + y + z) / 3);  // Hiển thị 2 chữ số thập phân
```

**Cách 3: Tính trung bình cộng của 4 số**

```cpp
float a, b, c, d;
// nhập a, b, c, d
cout << "\nTrung bình: " << (a + b + c + d) / 4;
```

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** C/C++ cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thành công!_

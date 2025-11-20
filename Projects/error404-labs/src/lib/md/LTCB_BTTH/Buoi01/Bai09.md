# 📘 **Nhập xuất dữ liệu - Tính chu vi và diện tích hình tròn**

## 🎯 **Học được gì qua bài này**

- Sử dụng kiểu dữ liệu **`double`** trong C++<br/><br/>
- Thực hiện phép toán nhân trên **số thực**<br/><br/>
- Tính **chu vi và diện tích hình tròn** từ bán kính<br/><br/>
- Sử dụng hàm **`round()`** để làm tròn số<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Chu vi và diện tích hình tròn**

Cho hình tròn có bán kính R, ta có các công thức:

```
Chu vi hình tròn = 2 × π × R
Diện tích hình tròn = π × R²
```

**Ví dụ:** Với R = 5

- Chu vi = 2 × 3.14 × 5 = 31.4
- Diện tích = 3.14 × 5 × 5 = 78.5

---

### 🌟 **Thứ tự ưu tiên toán tử**

| Toán tử  | Độ ưu tiên | Thứ tự |
| -------- | ---------- | ------ |
| `()`     | Cao nhất   | 1      |
| `*`, `/` | Trung bình | 2      |
| `+`, `-` | Thấp nhất  | 3      |

**Giải thích:** `3.14 * R * R` sẽ tính nhân từ trái sang phải

---

### 🌟 **Hàm `round()` để làm tròn số**

Hàm `round()` từ thư viện `<cmath>` giúp làm tròn số đến số nguyên gần nhất.

```cpp
round(19.625 * 100) / 100  // Làm tròn đến 2 chữ số thập phân
```

---

## 💡 **Code mẫu**---

<details>
<summary>Xem code mẫu</summary>

<iframe title="Nhập xuất dữ liệu - Tính chu vi và diện tích hình tròn" scrolling="no" loading="eager" style="height:600px; width: 100%; border:1px solid black; border-radius:6px;" src="https://www.online-cpp.com/0wTYLEJKWq">
</iframe>

</details>

---

## 📊 **Ví dụ kết quả**

**Input:**

```
Nhập bán kính R: 5
```

**Output:**

```
Chu vi hình tròn: 31.40
Diện tích hình tròn: 78.50
```

**Input:**

```
Nhập bán kính R: 3.5
```

**Output:**

```
Chu vi hình tròn: 21.98
Diện tích hình tròn: 38.47
```

---

## 💡 **Mở rộng bài học**

**Cách 1: Sử dụng hằng số `M_PI` cho π**

```cpp
#include <cmath>
double chuViHinhTron = 2 * M_PI * R;
double dienTichHinhTron = M_PI * R * R;
```

**Cách 2: Lưu kết quả vào biến rồi xuất**

```cpp
double chuVi = 3.14 * 2 * R;
double dienTich = 3.14 * R * R;
cout << "Chu vi hình tròn: " << fixed << setprecision(2) << chuVi << endl;
cout << "Diện tích hình tròn: " << fixed << setprecision(2) << dienTich << endl;
```

**Cách 3: Tính thêm chiều dài của cung tròn**

```cpp
double goc = 90;  // độ
double chieuDaiCung = (goc / 360) * 2 * 3.14 * R;
printf("Chiều dài cung: %.2f\n", chieuDaiCung);
```

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** C/C++ cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thành công!_

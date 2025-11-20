# 📘 **Nhập xuất dữ liệu - Tính chu vi và diện tích hình chữ nhật**

## 🎯 **Học được gì qua bài này**

- Sử dụng kiểu dữ liệu **`double`** trong C++<br/><br/>
- Thực hiện phép toán cộng và nhân trên **số thực**<br/><br/>
- Tính **chu vi và diện tích hình chữ nhật** từ chiều dài và chiều rộng<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Chu vi và diện tích hình chữ nhật**

Cho hình chữ nhật có chiều dài d và chiều rộng r, ta có các công thức:

```
Chu vi hình chữ nhật = (d + r) × 2
Diện tích hình chữ nhật = d × r
```

**Ví dụ:** Với d = 10, r = 5

- Chu vi = (10 + 5) × 2 = 30
- Diện tích = 10 × 5 = 50

---

### 🌟 **Thứ tự ưu tiên toán tử**

| Toán tử  | Độ ưu tiên | Thứ tự |
| -------- | ---------- | ------ |
| `()`     | Cao nhất   | 1      |
| `*`, `/` | Trung bình | 2      |
| `+`, `-` | Thấp nhất  | 3      |

**Giải thích:** `(d + r) * 2` sẽ tính tổng trong ngoặc trước, rồi mới nhân với 2

---

## 💡 **Code mẫu**---

<details>
<summary>Xem code mẫu</summary>

<iframe title="Nhập xuất dữ liệu - Tính chu vi và diện tích hình chữ nhật" scrolling="no" loading="eager" style="height:600px; width: 100%; border:1px solid black; border-radius:6px;" src="https://www.online-cpp.com/mId9u2ekmR">
</iframe>

</details>

---

## 📊 **Ví dụ kết quả**

**Input:**

```
Chiều dài : 10
Chiều rộng: 5
```

**Output:**

```
Chu vi hình chữ nhật   : 30
Diện tích hình chữ nhật: 50
```

**Input:**

```
Chiều dài : 7.5
Chiều rộng: 4.2
```

**Output:**

```
Chu vi hình chữ nhật   : 23.4
Diện tích hình chữ nhật: 31.5
```

---

## 💡 **Mở rộng bài học**

**Cách 1: Lưu kết quả vào biến rồi xuất**

```cpp
double chuVi = (d + r) * 2;
double dienTich = d * r;
cout << "Chu vi hình chữ nhật   : " << chuVi << "\n";
cout << "Diện tích hình chữ nhật: " << dienTich;
```

**Cách 2: Định dạng kết quả với `printf`**

```cpp
printf("Chu vi hình chữ nhật   : %.2f\n", (d + r) * 2);
printf("Diện tích hình chữ nhật: %.2f\n", (d * r));
```

**Cách 3: Tính thêm đường chéo của hình chữ nhật**

```cpp
#include <cmath>
double duongCheo = sqrt(d * d + r * r);
cout << "Đường chéo hình chữ nhật: " << duongCheo;
```

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** C/C++ cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thành công!_

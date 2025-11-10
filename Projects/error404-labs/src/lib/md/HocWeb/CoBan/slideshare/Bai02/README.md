# 🧩 Sử dụng các tag cơ bản (tt)

## 🎯 Mục tiêu

Giúp làm quen với các **thẻ HTML nâng cao** và **thuộc tính CSS về màu sắc** để định dạng văn bản trên trang web, hiểu cách sử dụng màu chữ, màu nền, đường kẻ ngang và kết hợp nhiều thuộc tính CSS.

---

## 📘 Kiến thức trong bài

### **HTML Tags**

| Thẻ     | Chức năng                  |
| ------- | -------------------------- |
| `<h1>`  | 🏷️ Tiêu đề lớn nhất        |
| `<h2>`  | 🏷️ Tiêu đề nhỏ hơn         |
| `<p>`   | 📝 Đoạn văn bản            |
| `<div>` | 📦 Khối nội dung tổng quát |
| `<br>`  | ⬇️ Xuống dòng              |
| `<hr>`  | ➖ Đường kẻ ngang          |

### **Thuộc tính HTML**

| Thuộc tính | Chức năng                                       |
| ---------- | ----------------------------------------------- |
| `align`    | ↔️ Căn chỉnh vị trí nội dung (trái, phải, giữa) |
| `style`    | 🎨 Viết CSS trực tiếp trong thẻ                 |
| `width`    | 📏 Độ rộng của phần tử                          |

### **CSS Properties**

| Thuộc tính           | Chức năng                        |
| -------------------- | -------------------------------- |
| `color`              | 🎨 Màu chữ                       |
| `background-color`   | 🖌️ Màu nền                       |
| `text-decoration`    | ➖ Gạch chân, gạch ngang, v.v.   |
| `font-weight`        | 💪 Độ đậm của chữ (normal, bold) |
| `text-align`         | ↔️ Căn chỉnh vị trí văn bản      |

---

## 🧠 Bài tập

![Bài tập minh họa](demo.png)

### **Yêu cầu:**

| STT | Đối tượng        | Yêu cầu mô tả                                       | Ghi chú                                                    |
| --- | ---------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| 1   | Trang web        | 🖥️ Tiêu đề cửa sổ: **Sử dụng các tag cơ bản (tt)** | Sử dụng thẻ `<title>`                                      |
| 2   | Dòng 1           | 🔹 Canh giữa, màu xanh lá                           | `<h1 align="center" style="color: green">`                 |
| 3   | Dòng 2           | ✏️ Gạch chân, màu xanh dương                        | `<h2 style="text-decoration: underline; color: #0000ff">` |
| 4   | Dòng 3           | 💪 In đậm nội dung                                  | `<p style="font-weight: bold">`                            |
| 5   | Tiêu đề "BÀN PHÍM" | 🎨 Canh giữa, nền hồng, chữ đỏ, in đậm              | Nền `#fecffd`, chữ `#ff3399`                               |
| 6   | Khung nội dung   | 📦 Nền vàng nhạt, canh giữa                         | `<div align="center" style="background-color: #ffffcc">`   |
| 7   | Đoạn thơ 1       | 🔵 Màu xanh dương, xuống dòng                       | `<p style="color: blue">` với `<br>`                       |
| 8   | Đường kẻ         | ➖ Độ rộng 30%                                      | `<hr style="width: 30%">`                                  |
| 9   | Đoạn thơ 2       | 🟢 Màu xanh lá, xuống dòng                          | `<p style="color: green">` với `<br>`                      |

---

## 🧩 Hướng dẫn từng bước

| STT | Bước                      | Cách thực hiện                                      | Mã minh họa                                                                          |
| --- | ------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | Thêm tiêu đề trang        | Sử dụng thẻ `<title>` trong phần `<head>`           | `<title>Sử dụng các tag cơ bản (tt)</title>`                                        |
| 2   | Tạo tiêu đề màu xanh lá   | Dùng `<h1>` với `color: green` và căn giữa          | `<h1 align="center" style="color: green">Bài 02...</h1>`                            |
| 3   | Gạch chân màu xanh dương  | Dùng `<h2>` với `text-decoration` và `color`        | `<h2 style="text-decoration: underline; color: #0000ff">Yêu cầu</h2>`               |
| 4   | In đậm văn bản            | Dùng `<p>` với `font-weight: bold`                  | `<p style="font-weight: bold">Thiết kế trang web...</p>`                            |
| 5   | Tạo tiêu đề "BÀN PHÍM"    | Dùng `<h2>` với nền, màu chữ, căn giữa và in đậm    | `<h2 align="center" style="background-color: #fecffd; color: #ff3399;">...</h2>`    |
| 6   | Tạo khung nền vàng        | Dùng `<div>` với `background-color` và căn giữa     | `<div align="center" style="background-color: #ffffcc">`                             |
| 7   | Thêm đoạn thơ màu xanh    | Dùng `<p>` với `color: blue` và `<br>` xuống dòng   | `<p style="color: blue">Bàn phím im lìm...<br/>Mười ngón tay...</p>`                |
| 8   | Thêm đường kẻ ngang       | Dùng `<hr>` với `width: 30%`                        | `<hr style="width: 30%">`                                                            |
| 9   | Thêm đoạn thơ màu xanh lá | Dùng `<p>` với `color: green` và `<br>` xuống dòng  | `<p style="color: green">Gõ nhịp thời gian...<br/>Công việc, giải trí...</p>`       |

---

## 🧩 Tham khảo

<details>
<summary>💻 Xem mã HTML mẫu</summary>

```html
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sử dụng các tag cơ bản (tt)</title>
    </head>
    <body>
        <h1 align="center" style="color: green">
            Bài 02: Sử dụng các tag cơ bản (tt)
        </h1>
        <h2 style="text-decoration: underline; color: #0000ff">Yêu cầu</h2>
        <p style="font-weight: bold">Thiết kế trang web có nội dung như sau:</p>
        <h2
            align="center"
            style="background-color: #fecffd; color: #ff3399; font-weight: bold"
        >
            -:- BÀN PHÍM -:-
        </h2>
        <div align="center" style="background-color: #ffffcc">
            <p style="color: blue">
                Bàn phím im lìm dưới ánh đèn,<br />
                Mười ngón tay lướt trên nền,<br />
                Nét chữ, dòng thơ, hay nốt nhạc,<br />
                Âm thanh cất lên, chẳng còn im lặng.
            </p>
            <hr style="width: 30%" />
            <p style="color: green">
                Gõ nhịp thời gian, từng giây, từng phút,<br />
                Công việc, giải trí, chẳng chút ngập ngừng,<br />
                Dù là sáng tác hay làm bài tập,<br />
                Bàn phím âm thầm, bên cạnh ta cùng.
            </p>
        </div>
    </body>
</html>
```

</details>

---

✍️ **Người soạn:** _Phạm Xuân Hoài_ <br />
📚 **Chủ đề:** HTML cơ bản

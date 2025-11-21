# 📘 **Bài 08: Tạo bảng**

## 🎯 **Học được gì qua bài này**

- Hiểu cấu trúc cơ bản của bảng HTML<br/><br/>
- Sử dụng các tag HTML để tạo bảng với hàng, cột, tiêu đề<br/><br/>
- Áp dụng các attribute để định dạng bảng<br/><br/>
- Trang trí bảng bằng CSS để tăng tính thẩm mỹ<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tag HTML cơ bản**

| Tag       | Ý nghĩa                                   | Ví dụ                                        |
| --------- | ----------------------------------------- | -------------------------------------------- |
| `<table>` | Tạo một bảng                              | `<table><tr><td>Dữ liệu</td></tr></table>`   |
| `<thead>` | Định nghĩa phần đầu bảng (tiêu đề)        | `<thead><tr><th>Tiêu đề 1</th></tr></thead>` |
| `<tr>`    | Tạo một hàng trong bảng (table row)       | `<tr><td>Ô 1</td><td>Ô 2</td></tr>`          |
| `<td>`    | Tạo một ô dữ liệu trong hàng (table data) | `<td>Nội dung ô</td>`                        |
| `<th>`    | Tạo một ô tiêu đề (table header)          | `<th>Tiêu đề</th>`                           |
| `<tbody>` | Định nghĩa phần thân bảng (dữ liệu chính) | `<tbody><tr><td>Dữ liệu</td></tr></tbody>`   |
| `<tfoot>` | Định nghĩa phần chân bảng (kết luận)      | `<tfoot><tr><td>Tổng cộng</td></tr></tfoot>` |

**Giải thích:**

- `<table>`: Container chứa toàn bộ bảng
- `<thead>`: Chứa hàng tiêu đề, thường có màu nền khác biệt
- `<tbody>`: Chứa dữ liệu chính của bảng
- `<tfoot>`: Chứa thông tin tóm tắt hoặc tổng cộng (tùy chọn)
- `<tr>`: Mỗi hàng là một `<tr>`, bên trong chứa các `<td>` hoặc `<th>`
- `<td>`: Ô dữ liệu thông thường
- `<th>`: Ô tiêu đề (tự động in đậm và canh giữa)

---

### 🌟 **Attribute HTML**

| Attribute     | Mô tả                                                       | Ví dụ                                   |
| ------------- | ----------------------------------------------------------- | --------------------------------------- |
| `border`      | Thêm đường viền xung quanh bảng và các ô (giá trị 1 hoặc 0) | `<table border="1">`                    |
| `bordercolor` | Định màu của đường viền (cần border)                        | `<table border="1" bordercolor="blue">` |
| `cellpadding` | Khoảng cách giữa nội dung ô và đường viền (px)              | `<table cellpadding="10">`              |
| `cellspacing` | Khoảng cách giữa các ô (px)                                 | `<table cellspacing="5">`               |
| `width`       | Chiều rộng của bảng (px hoặc %)                             | `<table width="100%">`                  |
| `bgcolor`     | Màu nền của bảng (cần CSS để thay thế)                      | `<table bgcolor="#f0f0f0">`             |
| `colspan`     | Gộp nhiều cột thành một ô                                   | `<td colspan="2">Gộp 2 cột</td>`        |
| `rowspan`     | Gộp nhiều hàng thành một ô                                  | `<td rowspan="3">Gộp 3 hàng</td>`       |

**Giải thích:**

- `border`: Hiển thị viền quanh bảng (border="1" để hiển thị, border="0" để ẩn)
- `cellpadding`: Tăng không gian bên trong các ô để dễ đọc hơn
- `cellspacing`: Tạo khoảng cách giữa các ô, tạo hiệu ứng "riêng biệt"
- `colspan` và `rowspan`: Dùng khi muốn gộp ô để tạo layout phức tạp
- Lưu ý: Nhiều attribute này không được khuyến nghị trong HTML5, nên dùng CSS thay thế

---

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS     | Ý nghĩa                                           | Ví dụ                                            |
| ------------------ | ------------------------------------------------- | ------------------------------------------------ |
| `border-collapse`  | Gộp hoặc tách các viền ô (collapse / separate)    | `table { border-collapse: collapse; }`           |
| `border`           | Đặt viền cho bảng hoặc ô                          | `td { border: 1px solid #333; }`                 |
| `padding`          | Khoảng cách bên trong ô (thay cellpadding)        | `td { padding: 10px; }`                          |
| `background-color` | Màu nền của ô hoặc hàng                           | `thead { background-color: #4CAF50; }`           |
| `text-align`       | Canh lề nội dung (left / center / right)          | `th { text-align: center; }`                     |
| `color`            | Màu chữ                                           | `thead { color: white; }`                        |
| `font-weight`      | Độ đậm của chữ (normal / bold)                    | `th { font-weight: bold; }`                      |
| `width`            | Chiều rộng của cột                                | `td { width: 25%; }`                             |
| `height`           | Chiều cao của hàng                                | `tr { height: 40px; }`                           |
| `text-transform`   | Biến đổi chữ (uppercase / lowercase / capitalize) | `th { text-transform: uppercase; }`              |
| `justify-content`  | Canh nội dung theo trục ngang (flex)              | `td { display: flex; justify-content: center; }` |
| `hover`            | Hiệu ứng khi di chuột vào hàng                    | `tr:hover { background-color: #f5f5f5; }`        |

**Giải thích:**

- `border-collapse: collapse;` là tiêu chuẩn để loại bỏ khoảng cách giữa các viền
- CSS cho phép tùy chỉnh bảng nhiều hơn so với attribute HTML cũ
- Sử dụng `padding` thay vì `cellpadding`, `margin` thay vì `cellspacing`
- Có thể áp dụng pseudo-class `:hover` để tạo hiệu ứng tương tác
- `background-color: #f9f9f9;` cho các hàng chẵn, `#ffffff;` cho hàng lẻ tạo hiệu ứng sọc

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                        | Mã màu        |
| --------- | -------------------------------------------------------------- | ------------- |
| Trang web | - Tiêu đề trang web: Tạo bảng                                  |               |
| Nội dung  | - Nền màu hột gà                                               | #ffedca       |
|           | - Hình ảnh: Canh trái                                          |               |
|           | - Định dạng bảng:                                              |               |
|           | <ul>Dòng tiêu đề: Nền màu nâu đất và chữ màu</ul>              | #cc6600, #fff |
|           | <ul>Màu nền xen kẽ giữa các dòng là màu trắng và màu vỏ hột gà | #fff, #ffedca |

### 📸 Hình ảnh minh hoạ bài tập (tài nguyên: <a href="/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-08/assets.rar" download="">tải xuống</a>)

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-08/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

<iframe title="Tạo bảng" scrolling="no" loading="eager" style="height:500px; width: 100%; border:1px solid black; border-radius:6px;" src="https://embed.plnkr.co/plunk/Q8ySDZ205entJVJv">
</iframe>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

# 📘 **Bài 07: Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết**

## 🎯 **Học được gì qua bài này**

- Sử dụng các ký tự đặc biệt trong HTML<br/><br/>
- Chèn và định dạng hình ảnh trên trang web<br/><br/>
- Tạo danh sách có thứ tự (ordered list) và danh sách không thứ tự (unordered list)<br/><br/>
- Tạo liên kết siêu văn bản (hyperlink) để điều hướng trang web<br/><br/>
- Sử dụng các thuộc tính CSS để điều chỉnh khoảng cách (padding, margin) và hiển thị (display)<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tag HTML cơ bản**

| Tag     | Ý nghĩa                              | Ví dụ                                 |
| ------- | ------------------------------------ | ------------------------------------- |
| `<img>` | Chèn hình ảnh vào trang web          | `<img src="anh.jpg" alt="Ảnh mô tả">` |
| `<ol>`  | Tạo danh sách có thứ tự (1, 2, 3...) | `<ol><li>Item 1</li></ol>`            |
| `<ul>`  | Tạo danh sách không thứ tự (•, ◦...) | `<ul><li>Item 1</li></ul>`            |
| `<li>`  | Tạo mục trong danh sách              | `<li>Mục trong danh sách</li>`        |
| `<a>`   | Tạo liên kết (hyperlink)             | `<a href="trang.html">Link</a>`       |

**Giải thích:**

- **`<img>`**: Tag này dùng để hiển thị hình ảnh. Nó là tag tự đóng (self-closing), không cần tag đóng.
- **`<ol>` và `<ul>`**: Hai tag này tạo danh sách. `<ol>` tạo danh sách đánh số, còn `<ul>` tạo danh sách dấu đầu dòng.
- **`<li>`**: Luôn phải nằm bên trong `<ol>` hoặc `<ul>` để tạo từng mục của danh sách.
- **`<a>`**: Tag này tạo liên kết cho phép người dùng nhấp chuột để truy cập URL khác.

---

### 🌟 **Attribute HTML**

| Attribute | Mô tả                                                              | Ví dụ                                           |
| --------- | ------------------------------------------------------------------ | ----------------------------------------------- |
| `alt`     | Mô tả văn bản thay thế cho hình ảnh (dùng khi ảnh không tải được)  | `<img src="anh.jpg" alt="Mô tả ảnh">`           |
| `height`  | Chiều cao của hình ảnh (px hoặc %)                                 | `<img src="anh.jpg" height="200">`              |
| `width`   | Chiều rộng của hình ảnh (px hoặc %)                                | `<img src="anh.jpg" width="300">`               |
| `type`    | Xác định loại danh sách trong `<ol>` (1, a, A, i, I)               | `<ol type="a"><li>a</li></ol>`                  |
| `target`  | Xác định cách mở liên kết (\_blank: tab mới, \_self: tab hiện tại) | `<a href="trang.html" target="_blank">Link</a>` |

**Giải thích:**

- **`alt`**: Rất quan trọng cho SEO và tính năng trợ năng. Khi hình ảnh không tải, người dùng sẽ thấy văn bản này.
- **`height` và `width`**: Nên sử dụng cả hai để tránh ảnh bị méo. Nếu chỉ set một chiều, chiều kia sẽ tự điều chỉnh theo tỉ lệ.
- **`type`**: Trong `<ol>`, `type="1"` (mặc định), `type="a"` (a, b, c...), `type="A"` (A, B, C...), `type="i"` (i, ii, iii...)
- **`target="_blank"`**: Mở liên kết trong tab mới thay vì thay thế trang hiện tại.

---

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS   | Ý nghĩa                                                                         | Ví dụ                                            |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------ |
| `display`        | Kiểm soát cách phần tử hiển thị (block, inline, inline-block, none, flex, grid) | `display: block;`                                |
| `display: flex`  | Sắp xếp các phần tử theo hàng hoặc cột với căn chỉnh linh hoạt                  | `display: flex; justify-content: center;`        |
| `display: grid`  | Sắp xếp các phần tử theo lưới (hàng và cột)                                     | `display: grid; grid-template-columns: 1fr 1fr;` |
| `padding`        | Khoảng cách từ nội dung đến viền phần tử (4 phía)                               | `padding: 20px;`                                 |
| `padding-top`    | Khoảng cách từ nội dung đến viền trên                                           | `padding-top: 10px;`                             |
| `padding-right`  | Khoảng cách từ nội dung đến viền phải                                           | `padding-right: 15px;`                           |
| `padding-bottom` | Khoảng cách từ nội dung đến viền dưới                                           | `padding-bottom: 10px;`                          |
| `padding-left`   | Khoảng cách từ nội dung đến viền trái                                           | `padding-left: 15px;`                            |
| `margin`         | Khoảng cách từ viền phần tử đến các phần tử khác (4 phía)                       | `margin: 20px;`                                  |
| `margin-top`     | Khoảng cách từ viền trên phần tử đến phần tử khác                               | `margin-top: 10px;`                              |
| `margin-right`   | Khoảng cách từ viền phải phần tử đến phần tử khác                               | `margin-right: 15px;`                            |
| `margin-bottom`  | Khoảng cách từ viền dưới phần tử đến phần tử khác                               | `margin-bottom: 10px;`                           |
| `margin-left`    | Khoảng cách từ viền trái phần tử đến phần tử khác                               | `margin-left: 15px;`                             |

**Giải thích:**

- **`display`**: `block` (chiếm toàn bộ chiều rộng), `inline` (chỉ chiếm không gian cần thiết), `inline-block` (vừa inline vừa block), `none` (ẩn phần tử), `flex` (sắp xếp linh hoạt), `grid` (sắp xếp lưới).
- **`display: flex`**: Dùng để sắp xếp các phần tử con theo hàng ngang (default) hoặc cột dọc. Rất hữu ích cho layout, căn giữa, và tạo menu.
- **`display: grid`**: Dùng để tạo lưới 2 chiều (hàng và cột). Mạnh hơn flex khi cần sắp xếp phức tạp.
- **`padding`**: Khoảng cách bên trong phần tử (giữa nội dung và viền).
- **`margin`**: Khoảng cách bên ngoài phần tử (giữa viền và các phần tử khác).
- Cú pháp viết tắt `padding: 10px 15px 10px 15px;` (top, right, bottom, left) hoặc `padding: 10px 15px;` (top/bottom, left/right).

---

### 🌟 **Ký tự đặc biệt**

| Ký tự HTML | Ý nghĩa                                           | Ví dụ                            |
| ---------- | ------------------------------------------------- | -------------------------------- |
| `&nbsp;`   | Khoảng trắng không được nhập (non-breaking space) | `Hello&nbsp;World` → Hello World |
| `&copy;`   | Ký hiệu bản quyền ©                              | `&copy; 2024` → © 2024          |

**Giải thích:**

- **`&nbsp;`**: Dùng khi muốn chèn khoảng trắng mà không bị lược bỏ bởi HTML. Có thể dùng nhiều lần để tạo khoảng cách lớn hơn.
- **`&copy;`**: Ký hiệu bản quyền. Các ký tự đặc biệt khác: `&reg;` (®), `&trade;` (™), `&euro;` (€), `&yen;` (¥).

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                                             | Mã màu        |
| --------- | ----------------------------------------------------------------------------------- | ------------- |
| Trang web | - Tiêu đề trang web: Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết       |               |
| Nội dung  | - Sử dụng các tag định dạng văn bản như hình dưới                                   | #d21e61, #fff |
|           | - Khi nhấn vào chữ "Error404-Labs" mở trang web: https://www.error404-labs.info.vn/ |               |
|           | - Khi nhấn vào chữ "ART KID GARDEN" mở trang web: https://artkidgarden.edu.vn/      |               |

### 📸 Hình ảnh minh hoạ bài tập (tài nguyên: <a href="/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-07/assets.rar" download="">tải xuống</a>)

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-07/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

<iframe title="Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết" scrolling="no" loading="eager" style="height:500px; width: 100%; border:1px solid black; border-radius:6px;" src="https://embed.plnkr.co/plunk/9hhV93LjAS1m7Glw">
</iframe>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

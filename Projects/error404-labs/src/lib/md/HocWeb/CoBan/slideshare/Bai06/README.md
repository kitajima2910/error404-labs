# 📘 **Bài 06: Định dạng văn bản (tt)**

## 🎯 **Học được gì qua bài này**

- Hiểu và sử dụng thẻ **`<span>`** để định dạng một phần nhỏ của văn bản mà không xuống dòng.<br/><br/>
- Áp dụng các thuộc tính **CSS cơ bản** như `font-size`, `border-width`, `border-style`, `border-color` để định dạng giao diện.<br/><br/>
- Biết cách **canh lề văn bản** (trái, phải) bằng thuộc tính CSS `text-align`.<br/><br/>
- Kết hợp HTML + CSS để tạo bố cục và định dạng đoạn văn theo **màu sắc**, **nền**, **kích thước chữ**, **tô màu ký tự riêng lẻ**.<br/><br/>
- Thực hành tái tạo giao diện theo mẫu dựa trên các tag định dạng văn bản: màu chữ, màu nền, căn chỉnh, nhấn mạnh ký tự hoặc tên riêng bằng thẻ `<span>`.<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tag HTML cơ bản**

| Tag      | Ý nghĩa                                                          | Ví dụ                                     |
| -------- | ---------------------------------------------------------------- | ----------------------------------------- |
| `<span>` | Định dạng một phần nhỏ text trong cùng một dòng (inline element) | `<span style="color: red;">Chữ đỏ</span>` |

**Giải thích:**
`<span>` là một thẻ HTML dùng để bao quanh một phần text hoặc các phần tử inline khác mà không tạo dòng mới. Nó thường được sử dụng kết hợp với CSS để định dạng các phần nhỏ của nội dung như thay đổi màu chữ, font chữ, kích thước, v.v.

---

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS | Ý nghĩa                                                | Ví dụ                                           |
| -------------- | ------------------------------------------------------ | ----------------------------------------------- |
| `font-size`    | Thay đổi kích thước của chữ                            | `font-size: 16px;` hoặc `font-size: 1.5em;`     |
| `border-width` | Xác định độ dày của đường viền                         | `border-width: 2px;`                            |
| `border-style` | Xác định kiểu đường viền (solid, dashed, dotted, v.v.) | `border-style: solid;`                          |
| `border-color` | Xác định màu sắc của đường viền                        | `border-color: #333;` hoặc `border-color: red;` |

**Giải thích:**

- `font-size`: Được sử dụng để điều chỉnh kích thước text. Có thể sử dụng pixel (px), em, rem, hoặc các đơn vị khác.
- `border-width`: Điều khiển độ dày của viền, có thể dùng px, em, hoặc các giá trị như thin, medium, thick.
- `border-style`: Định kiểu dáng viền như solid (liền), dashed (gạch), dotted (chấm), double (đôi), v.v.
- `border-color`: Đặt màu cho viền, có thể dùng tên màu, mã hex, RGB, hoặc HSL.

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                                   | Mã màu           |
| --------- | ------------------------------------------------------------------------- | ---------------- |
| Trang web | - Tiêu đề trang web: Định dạng văn bản (tt)                               |                  |
| Nội dung  | - Sử dụng các tag định dạng văn bản như hình dưới                         |                  |
|           | - Đoạn văn đầu: Canh lề trái                                              |                  |
|           | - Dòng "HỆ SINH THÁI MINDFLOW ART!": Canh lề phải, màu chữ trắng, nền cam | #fff, #ee710e    |
|           | - Đoạn văn thứ hai: Canh lề phải                                          |                  |
|           | - Chú ý: Chữ "A" to có màu đỏ nâu, "Phan Tường An" có nền vàng đậm        | #9c0105, #facb02 |

### 📸 Hình ảnh minh hoạ bài tập

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-06/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

<iframe title="Định dạng văn bản (tt)" scrolling="no" loading="eager" style="height:500px; width: 100%; border:1px solid black; border-radius:6px;" src="https://embed.plnkr.co/plunk/P6cmxLxDdu3J7fSk">
</iframe>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

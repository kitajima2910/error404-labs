# 📘 **Bài 03: Định dạng trang web**

## 🎯 **Học được gì qua bài này**

- Xây dựng cấu trúc trang Web bằng cách sử dụng các **thẻ HTML** cơ bản và hiệu quả<br/><br/>
- Tùy chỉnh và định dạng các phần tử trang web thông qua **thuộc tính HTML**<br/><br/>
- Trang trí giao diện Web một cách chuyên nghiệp bằng **CSS cơ bản**, bao gồm nền, màu chữ, vị trí và kích thước<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS          | Ý nghĩa                                    | Ví dụ                                             |
| ----------------------- | ------------------------------------------ | ------------------------------------------------- |
| `background-image`      | Đặt hình ảnh làm nền cho phần tử           | `background-image: url('image.jpg');`             |
| `background-position`   | Xác định vị trí hiển thị của hình ảnh nền  | `background-position: center;` hoặc `50% 50%;`    |
| `background-repeat`     | Kiểm soát cách lặp lại hình ảnh nền        | `background-repeat: no-repeat;` hoặc `repeat-x;`  |
| `background-attachment` | Xác định cách nền cuộn khi trang di chuyển | `background-attachment: fixed;` hoặc `scroll;`    |
| `background-size`       | Đặt kích thước của hình ảnh nền            | `background-size: cover;` hoặc `100px 200px;`     |
| `background-blend-mode` | Xác định cách pha trộn hình ảnh nền        | `background-blend-mode: multiply;` hoặc `screen;` |
| `text-transform`        | Chuyển đổi kiểu chữ của văn bản            | `text-transform: uppercase;` hoặc `capitalize;`   |

**Giải thích:**

- **`background-image`**: Được sử dụng để thêm một hoặc nhiều hình ảnh làm nền. Giá trị thường là `url('đường-dẫn-ảnh')`. Nếu không có hình ảnh, bạn có thể sử dụng `background-color` để set màu nền thay thế.

- **`background-position`**: Xác định vị trí bắt đầu của hình ảnh nền. Các giá trị phổ biến bao gồm `top`, `bottom`, `left`, `right`, `center`, hoặc sử dụng tọa độ như `10px 20px` (trái, trên) hay phần trăm `25% 75%`.

- **`background-repeat`**: Kiểm soát việc lặp lại hình ảnh nền. Các giá trị bao gồm:
  - `repeat` (mặc định): lặp lại cả chiều ngang và dọc
  - `repeat-x`: chỉ lặp lại theo chiều ngang
  - `repeat-y`: chỉ lặp lại theo chiều dọc
  - `no-repeat`: không lặp lại

- **`background-attachment`**: Kiểm soát xem hình ảnh nền có cuộn cùng nội dung hay cố định:
  - `scroll` (mặc định): hình ảnh cuộn cùng nội dung
  - `fixed`: hình ảnh cố định và không cuộn khi trang di chuyển
  - `local`: hình ảnh cuộn với nội dung phần tử

- **`background-size`**: Đặt kích thước hiển thị của hình ảnh nền:
  - `cover`: phóng to ảnh để che phủ toàn bộ phần tử (có thể cắt)
  - `contain`: hiển thị toàn bộ ảnh trong phần tử
  - `100% 100%`: kéo giãn ảnh theo kích thước phần tử
  - `200px 150px`: đặt kích thước cụ thể

- **`background-blend-mode`**: Xác định cách pha trộn hình ảnh nền với màu nền hoặc nội dung phía dưới:
  - `multiply`: làm tối hơn
  - `screen`: làm sáng hơn
  - `overlay`: kết hợp multiply và screen
  - `darken`, `lighten`, `color-dodge`, v.v.

- **`text-transform`**: Chuyển đổi kiểu chữ của văn bản mà không thay đổi HTML:
  - `uppercase`: chuyển tất cả thành CHỮ HOA
  - `lowercase`: chuyển tất cả thành chữ thường
  - `capitalize`: viết hoa chữ cái đầu của mỗi từ
  - `none` (mặc định): không thay đổi

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                                      | Mã màu  |
| --------- | ---------------------------------------------------------------------------- | ------- |
| Trang web | - Tiêu đề trang web: Định dạng trang web                                     |         |
| Nội dung  | - Định dạng chung:<br/>                                                      |         |
|           | <ul><li>Nền: Màu nâu đất</li></ul>                                           | #A06D21 |
|           | <ul><li>Chữ: Màu trắng</li></ul>                                             | #FFFFFF |
|           | <ul><li>Hình nền: Đặt giữa trang và không di chuyển khi cuộn trang</li></ul> |         |
|           | - Dòng đầu tiên: Canh giữa, màu vàng đậm, chữ in hoa                         | #FFCC00 |

### 📸 Hình ảnh minh hoạ bài tập (tài nguyên: <a href="/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-03/assets.rar" download="">tải xuống</a>)

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-03/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

<iframe title="Định dạng trang web" scrolling="no" loading="eager" style="height:500px; width: 100%; border:1px solid black; border-radius:6px;" src="https://embed.plnkr.co/plunk/nU2LSNOB8uGtwq3C">
</iframe>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

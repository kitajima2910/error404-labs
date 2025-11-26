# 📘 **Bài 02: Sử dụng các tag cơ bản (tt)**

## 🎯 **Học được gì qua bài này**

- Sử dụng được **thẻ `<hr>`** để tạo đường phân cách nội dung.
- Biết cách dùng **attribute `width`** để điều chỉnh chiều rộng của hình ảnh, bảng, video…
- Áp dụng được **CSS màu sắc**: `color` (màu chữ), `background-color` (màu nền)
- Dùng được **font-style** (normal, italic) để tạo định dạng chữ nghiêng.
- Kết hợp nhiều thẻ và CSS để tạo bố cục nội dung như:
  tiêu đề, thơ, đường kẻ ngang, màu nền, màu chữ.
- Hoàn thành một bài thơ có bố cục đẹp, đúng màu sắc và có đường phân cách như mẫu.

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tag HTML cơ bản**

| Tag    | Ý nghĩa                                                           | Ví dụ                |
| ------ | ----------------------------------------------------------------- | -------------------- |
| `<hr>` | Tạo một đường thẳng ngang (horizontal rule) để phân chia nội dung | `<hr>` hoặc `<hr />` |

**Giải thích:**

- **`<hr>`**: Là tag tự đóng (self-closing tag), dùng để vẽ một đường ngang trên trang web

---

### 🌟 **Attribute HTML**

| Attribute | Mô tả                                                                                       | Ví dụ                                                           |
| --------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `width`   | Xác định chiều rộng của một phần tử (hình ảnh, bảng, video, v.v.) theo pixel hoặc phần trăm | `<img src="image.jpg" width="300">` hoặc `<table width="100%">` |

**Giải thích:**

Attribute `width` được sử dụng để thiết lập chiều rộng cụ thể cho các phần tử HTML. Có thể được chỉ định bằng:

- **Pixel (px)**: `width="300"` hoặc `width="300px"`
- **Phần trăm (%)**: `width="100%"` (chiều rộng tương đối so với phần tử cha)
- Thường dùng cho: hình ảnh (`<img>`), bảng (`<table>`), video (`<video>`), iframe (`<iframe>`)

---

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS     | Ý nghĩa                                        | Ví dụ                                                       |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------- |
| `color`            | Đặt màu cho chữ (văn bản)                      | `color: red;` hoặc `color: #FF0000;`                        |
| `background-color` | Đặt màu nền cho phần tử                        | `background-color: blue;` hoặc `background-color: #0000FF;` |
| `font-style`       | Thiết lập kiểu chữ (bình thường, nghiêng, ...) | `font-style: italic;` hoặc `font-style: normal;`            |

**Giải thích:**

- **`color`**: Dùng để thay đổi màu sắc của văn bản. Có thể dùng tên màu (red, blue, green...), mã hex (#FF0000), RGB (rgb(255, 0, 0)) hoặc HSL
- **`background-color`**: Dùng để đặt màu nền cho phần tử HTML. Giống như `color`, có thể sử dụng các định dạng màu khác nhau
- **`font-style`**: Dùng để thay đổi kiểu chữ. Các giá trị phổ biến là `normal` (bình thường), `italic` (chữ nghiêng), và `oblique` (chữ nghiêng nhưng khác italic)

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                                            | Mã màu            |
| --------- | ---------------------------------------------------------------------------------- | ----------------- |
| Trang web | - Tiêu đề trang web: Sử dụng các tag cơ bản                                        |                   |
| Nội dung  | - Dòng 1: Canh giữa, màu xanh lá mạ                                                | #006600           |
|           | - Dòng 2: Màu xanh dương                                                           | #0000FF           |
|           | - Dòng 4 - tựa đề "-:- BÀN PHÍM -:-": Chữ đậm có màu hồng đậm và nền màu hồng nhạt | #FF3399 , #FECFFD |
|           | - 2 đoạn thơ: in nghiêng, có 2 màu chữ khác nhau                                   |                   |
|           | - Giữa 2 đoạn cách nhau bởi một đường thẳng ngang                                  |                   |
|           | - Toàn bộ bài thơ có màu nền là màu vàng nhạt                                      | #FFFFCC           |

### 📸 Hình ảnh minh hoạ bài tập

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-02/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Sử dụng các tag cơ bản</title>
	</head>
	<body>
		<h1 align="center" style="color: #006600">Bài 02: Sử dụng các tag cơ bản (tt)</h1>
		<h2 style="text-decoration: underline; color: #0000ff">Yêu cầu</h2>
		<p style="font-weight: 700">Thiết kế trang web có nội dung như sau:</p>
		<h2 align="center" style="color: #ff3399; background-color: #fecffd">-:- BÀN PHÍM -:-</h2>
		<div style="background-color: #ffffcc">
			<p align="center" style="color: #0000ff; font-style: italic">
				Bàn phím im lìm dưới ánh đèn,<br />Mười ngón tay lướt trên nền,<br />Nét chữ, dòng thơ, hay
				nốt nhạc,<br />Âm thanh cất lên, chẳng còn im lặng.
			</p>
			<hr width="250" />
			<p align="center" style="color: #006600; font-style: italic">
				Gõ nhịp thời gian, từng giây, từng phút,<br />Công việc, giải trí, chẳng chút ngập ngừng,<br />Dù
				là sáng tác hay làm bài tập,<br />Bàn phím âm thầm, bênh cạnh ta cùng.
			</p>
		</div>
	</body>
</html>
```

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

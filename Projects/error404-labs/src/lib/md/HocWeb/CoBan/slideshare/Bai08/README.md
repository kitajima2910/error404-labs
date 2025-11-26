# 📘 **Bài 08: Tạo bảng**

## 🎯 **Học được gì qua bài này**

- Hiểu cấu trúc cơ bản của bảng HTML
- Sử dụng các tag HTML để tạo bảng với hàng, cột, tiêu đề
- Áp dụng các attribute để định dạng bảng
- Trang trí bảng bằng CSS để tăng tính thẩm mỹ

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

## 📝 **Ví dụ thực tế**

### Bảng cơ bản:

```html
<table border="1">
	<thead>
		<tr>
			<th>Tên</th>
			<th>Tuổi</th>
			<th>Thành phố</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Nguyễn Văn A</td>
			<td>25</td>
			<td>Hà Nội</td>
		</tr>
		<tr>
			<td>Trần Thị B</td>
			<td>28</td>
			<td>TP. Hồ Chí Minh</td>
		</tr>
	</tbody>
</table>
```

### Bảng có CSS:

```html
<style>
	table {
		border-collapse: collapse;
		width: 100%;
		font-family: Arial, sans-serif;
	}

	thead {
		background-color: #4caf50;
		color: white;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 12px;
		text-align: left;
	}

	tbody tr:hover {
		background-color: #f5f5f5;
	}

	tbody tr:nth-child(even) {
		background-color: #f9f9f9;
	}
</style>
```

---

## 🎓 **Lưu ý quan trọng**

1. Luôn sử dụng `<thead>`, `<tbody>`, `<tfoot>` để cấu trúc bảng rõ ràng
2. Dùng `<th>` cho tiêu đề, không phải `<td>`
3. CSS hiệu quả hơn attribute HTML cũ, tránh dùng `border`, `bordercolor`, `bgcolor`
4. Sử dụng `border-collapse: collapse;` để bảng trông gọn gàng
5. Thêm `padding` và `text-align` để làm bảng dễ đọc hơn

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

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Tạo bảng</title>
	</head>
	<body style="background-color: #ffedca">
		<div style="text-align: center; color: #cc6600">
			<h1 style="text-transform: capitalize">Các món ngon Sài Gòn</h1>
		</div>
		<div style="display: flex; justify-content: center">
			<div style="width: 300px; height: 200px">
				<img src="https://iili.io/f2sr8UG.png" alt="Cafe" width="100%" height="100%" />
			</div>
			<div>
				<table
					width="300px"
					border="1"
					bordercolor="#a5818e"
					cellpadding="5"
					cellspacing="0"
					style="border-collapse: collapse"
				>
					<thead style="background-color: #cc6600; color: #ffffff; font-weight: 700">
						<tr>
							<th>STT</th>
							<th>Tên món ăn</th>
						</tr>
					</thead>
					<tr style="background-color: #fff">
						<td>1.</td>
						<td>Cháo lòng</td>
					</tr>
					<tr>
						<td>2.</td>
						<td>Bánh mì</td>
					</tr>
					<tr style="background-color: #fff">
						<td>3.</td>
						<td>Xôi</td>
					</tr>
					<tr>
						<td>4.</td>
						<td>Bột chiên</td>
					</tr>
					<tr style="background-color: #fff">
						<td>5.</td>
						<td>Bún bò</td>
					</tr>
					<tr>
						<td>6.</td>
						<td>Hủ tiếu</td>
					</tr>
					<tr style="background-color: #fff">
						<td>7.</td>
						<td>Bánh canh</td>
					</tr>
					<tr>
						<td>8.</td>
						<td>Cơm tấm</td>
					</tr>
					<tr style="background-color: #fff">
						<td>9.</td>
						<td>Bánh khọt</td>
					</tr>
					<tr>
						<td>10.</td>
						<td>Bánh xèo</td>
					</tr>
				</table>
			</div>
		</div>
	</body>
</html>
```

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

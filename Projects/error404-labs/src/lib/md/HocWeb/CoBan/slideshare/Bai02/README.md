# 🎓 BÀI 02: SỬ DỤNG CÁC TAG CƠ BẢN HTML (PHẦN TIẾP THEO)

---

## 📋 MỤC LỤC

1. [Ôn Tập Tag Cơ Bản](#ôn-tập-tag-cơ-bản)
2. [Các Tag Định Dạng Văn Bản](#các-tag-định-dạng-văn-bản)
3. [Tag Định Dạng Cấu Trúc Trang](#tag-định-cấu-trúc-trang)
4. [Tag Liên Kết Và Tài Nguyên](#tag-liên-kết-và-tài-nguyên)
5. [Thuộc Tính Phổ Biến](#thuộc-tính-phổ-biến)
6. [Bài Tập Thực Hành](#bài-tập-thực-hành)

---

## 🔄 Ôn Tập Tag Cơ Bản

### Tag Tiêu Đề (Heading Tags)

| Tag             | Mục Đích                        | Ví Dụ                    |
| --------------- | ------------------------------- | ------------------------ |
| `<h1>`          | Tiêu đề cấp 1 (quan trọng nhất) | `<h1>Chào mừng bạn</h1>` |
| `<h2>`          | Tiêu đề cấp 2                   | `<h2>Phần 1</h2>`        |
| `<h3>` - `<h6>` | Tiêu đề cấp 3 đến 6             | `<h3>Mục phụ</h3>`       |

**💡 Lưu ý quan trọng:**

- Nên chỉ sử dụng một `<h1>` trên mỗi trang
- Không nên bỏ qua cấp tiêu đề (ví dụ: từ h1 nhảy thẳng h3)
- Dùng h1-h6 cho cấu trúc logic, không phải để thay đổi kích thước

**✅ Ví dụ tốt:**

```html
<h1>Bộ Sưu Tập Thơ Ca</h1>
<h2>Thơ Trung Đại</h2>
<h3>Tiền Tân</h3>
<h2>Thơ Hiện Đại</h2>
```

---

## ✨ Các Tag Định Dạng Văn Bản

### 1️⃣ Tag Nhấn Mạnh

#### `<b>` - Bold (Đậm)

```html
<p>Đây là <b>văn bản đậm</b> trong câu.</p>
```

**Khi nào dùng:** Khi muốn làm nổi bật về mặt trực quan mà không cần ý nghĩa ngữ nghĩa

#### `<strong>` - Strong (Mạnh)

```html
<p><strong>Cảnh báo:</strong> Không chỉnh sửa file này!</p>
```

**Khi nào dùng:** Khi muốn nhấn mạnh có ý nghĩa (quan trọng, cảnh báo)

#### `<i>` - Italic (Nghiêng)

```html
<p>Tên sách: <i>Harry Potter</i> rất nổi tiếng</p>
```

**Khi nào dùng:** Tên sách, tên phim, từ khóa kỹ thuật

#### `<em>` - Emphasis (Nhấn mạnh)

```html
<p>Tôi <em>thực sự</em> yêu thích lập trình.</p>
```

**Khi nào dùng:** Nhấn mạnh cảm xúc, tính cấp bách

### 2️⃣ Tag Đánh Dấu Văn Bản

#### `<mark>` - Highlight (Tô sáng)

```html
<p>Hãy chú ý <mark>phần này</mark> là rất quan trọng!</p>
```

**Hiệu quả:** Nền vàng để đánh dấu

#### `<del>` - Deleted (Xóa)

```html
<p>Giá gốc: <del>500,000đ</del> | Giá mới: 300,000đ</p>
```

**Hiệu quả:** Gạch ngang văn bản

#### `<ins>` - Inserted (Chèn)

```html
<p>Phiên bản <del>1.0</del> <ins>2.0</ins> được phát hành</p>
```

**Hiệu quả:** Underline văn bản

#### `<sub>` - Subscript (Chỉ số dưới)

```html
<p>Công thức nước: H<sub>2</sub>O</p>
```

#### `<sup>` - Superscript (Chỉ số trên)

```html
<p>Diện tích hình vuông = a<sup>2</sup></p>
```

### 3️⃣ Tag Định Dạng Mã

#### `<code>` - Inline Code

```html
<p>Để khai báo biến trong Python, dùng <code>var_name = value</code></p>
```

#### `<pre>` - Preformatted Text

```html
<pre>
  *
 * *
* * *
</pre>
```

**Đặc điểm:** Giữ nguyên khoảng trắng và xuống dòng

---

## 🏗️ Tag Định Dạng Cấu Trúc Trang

### `<div>` - Khối Nội Dung (Block)

```html
<div style="background-color: #f0f0f0; padding: 20px;">
	<h2>Danh Mục Sản Phẩm</h2>
	<p>Nội dung danh mục sản phẩm</p>
</div>
```

**Đặc điểm:**

- Chiếm toàn bộ chiều rộng (block element)
- Dùng để nhóm các phần tử liên quan
- Thường dùng chung với CSS để tạo layout

### `<span>` - Inline Container

```html
<p>
	Tôi thích <span style="color: red;">lập trình</span> và <span style="color: blue;">thiết kế</span>
</p>
```

**Đặc điểm:**

- Chỉ chiếm không gian cần thiết (inline element)
- Thường dùng để định dạng phần nhỏ của văn bản

### `<hr>` - Đường Kẻ Nganh Cách

```html
<h2>Tiêu đề 1</h2>
<hr />
<h2>Tiêu đề 2</h2>
```

**Định dạng:**

```html
<hr style="width: 50%; border: 2px solid blue;" />
```

---

## 🔗 Tag Liên Kết Và Tài Nguyên

### `<a>` - Hyperlink (Liên Kết)

```html
<!-- Liên kết tới trang khác -->
<a href="https://www.google.com">Đi tới Google</a>

<!-- Liên kết tới phần trong trang -->
<a href="#section2">Đi tới Phần 2</a>

<!-- Email link -->
<a href="mailto:info@example.com">Gửi Email</a>

<!-- Tải file -->
<a href="file.pdf" download>Tải File PDF</a>

<!-- Mở trong tab mới -->
<a href="https://example.com" target="_blank">Mở tab mới</a>
```

### `<img>` - Hình Ảnh

```html
<img src="hinhanh.jpg" alt="Mô tả hình ảnh" width="300" height="200" />
```

**Thuộc tính:**

- `src`: Đường dẫn hình ảnh
- `alt`: Mô tả (quan trọng cho SEO và accessibility)
- `width`, `height`: Kích thước

### `<br>` - Xuống Dòng

```html
<p>
	Dòng 1<br />
	Dòng 2<br />
	Dòng 3
</p>
```

---

## 🎯 Thuộc Tính Phổ Biến

### 1. Thuộc Tính `align` (Canh Lề)

```html
<h1 align="center">Tiêu đề Giữa</h1>
<h1 align="left">Tiêu đề Trái</h1>
<h1 align="right">Tiêu đề Phải</h1>
<div align="center">Nội dung giữa</div>
```

**⚠️ Lưu ý:** Deprecated (cũ), nên dùng CSS `text-align` thay thế

```html
<h1 style="text-align: center;">Tiêu đề Giữa</h1>
```

### 2. Thuộc Tính `style` (CSS Inline)

```html
<!-- Màu sắc -->
<p style="color: red;">Văn bản màu đỏ</p>

<!-- Kích thước font -->
<p style="font-size: 20px;">Văn bản lớn</p>

<!-- Nền màu -->
<p style="background-color: yellow;">Nền vàng</p>

<!-- Kết hợp nhiều -->
<p style="color: white; background-color: black; padding: 10px;">Văn bản trắng, nền đen</p>
```

### 3. Thuộc Tính `id` và `class`

```html
<!-- ID - duy nhất -->
<h1 id="title">Tiêu Đề Chính</h1>

<!-- Class - có thể tái sử dụng -->
<p class="highlight">Đoạn 1</p>
<p class="highlight">Đoạn 2</p>
```

---

## 📝 Bài Tập Thực Hành

### Bài 1: Tạo Trang Web Về Sở Thích

![Trang Web Về Sở Thích](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-02/bai-1.png)

<details>
<summary>Xem code mẫu</summary>

```html
<!DOCTYPE html>
<html lang="vi">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Sở Thích Của Tôi</title>
	</head>
	<body>
		<h1 align="center" style="color: #2c3e50;">Các Sở Thích Của Tôi</h1>

		<h2 style="color: #3498db; text-decoration: underline;">📚 Đọc Sách</h2>
		<p>
			Tôi <strong>yêu thích</strong> đọc sách, đặc biệt là các tác phẩm của
			<em>Nguyễn Nhật Ánh</em> và <em>Haruki Murakami</em>.
		</p>

		<h2 style="color: #e74c3c; text-decoration: underline;">🎮 Chơi Game</h2>
		<p>
			Trò yêu thích của tôi là <mark>Elden Ring</mark> - một game <del>đơn giản</del>
			<ins>thử thách</ins> và rất hấp dẫn.
		</p>

		<h2 style="color: #27ae60; text-decoration: underline;">🍳 Nấu Ăn</h2>
		<div style="background-color: #ecf0f1; padding: 15px; border-left: 4px solid #27ae60;">
			<p>Công thức yêu thích: Cơm tấm truyền thống</p>
			<p style="color: #7f8c8d;">Nguyên liệu: <code>150g gạo, nước, muối</code></p>
		</div>

		<hr style="width: 60%;" />
		<p align="center" style="color: #95a5a6;">
			<em>Cập nhật: Tháng 11 năm 2024</em>
		</p>
	</body>
</html>
```

</details>

### Bài 2: Tạo Trang Giới Thiệu Sản Phẩm

![Trang Giới Thiệu Sản Phẩm](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-02/bai-2.png)

<details>
<summary>Xem code mẫu</summary>

```html
<!DOCTYPE html>
<html lang="vi">
	<head>
		<meta charset="UTF-8" />
		<title>Sản Phẩm Mới</title>
	</head>
	<body>
		<h1 align="center" style="background-color: #ff6b6b; color: white; padding: 20px;">
			🎁 GIỚI THIỆU SẢN PHẨM MỚI
		</h1>

		<div align="center" style="background-color: #fff3cd; padding: 20px;">
			<h2 style="color: #ff6b6b;">Tai Nghe Bluetooth Chuyên Nghiệp</h2>

			<p><strong>Giá:</strong> <del>2,500,000đ</del> → <mark>1,799,000đ</mark></p>

			<h3>✨ Tính Năng Nổi Bật:</h3>
			<p>
				• Pin 30 giờ<br />
				• Chất lượng âm thanh <em>Hi-Res</em><br />
				• Chế độ chống ồn ANC<sup>*</sup>
			</p>

			<hr />

			<p style="font-size: 12px; color: #666;"><sup>*</sup>Công nghệ khử tiếng ồn hoạt động</p>

			<a
				href="mua-hang.html"
				style="background-color: #28a745; color: white; 
           padding: 10px 20px; text-decoration: none;"
			>
				🛒 MUA NGAY
			</a>
		</div>
	</body>
</html>
```

</details>

## 🎨 Mẹo Thiết Kế

### Color Palette Gợi Ý

| Tên      | Mã Hex    | Ứng Dụng                     |
| -------- | --------- | ---------------------------- |
| Đỏ       | `#e74c3c` | Tiêu đề quan trọng, cảnh báo |
| Xanh     | `#3498db` | Thông tin, liên kết          |
| Xanh Lục | `#27ae60` | Thành công, điều tích cực    |
| Tím      | `#9b59b6` | Đặc biệt, sáng tạo           |
| Cam      | `#f39c12` | Cảnh báo nhẹ, chú ý          |
| Xám      | `#95a5a6` | Phụ, ghi chú                 |

### Padding & Margin Cơ Bản

```html
<!-- Padding: khoảng cách bên trong -->
<div style="padding: 20px;">Nội dung</div>

<!-- Margin: khoảng cách bên ngoài -->
<div style="margin: 20px;">Nội dung</div>

<!-- Border: viền -->
<div style="border: 2px solid #333;">Nội dung</div>

<!-- Kết hợp -->
<div style="padding: 15px; margin: 10px; border: 1px solid #ccc;">Nội dung được căn chỉnh</div>
```

---

## 📌 Kiểm Tra Hiểu Biết

**Câu 1:** Sự khác biệt giữa `<b>` và `<strong>` là gì?  
**Đáp:** `<b>` chỉ làm đậm về mặt trực quan, `<strong>` nhấn mạnh về mặt ngữ nghĩa (quan trọng)

**Câu 2:** Khi nào sử dụng `<div>`?  
**Đáp:** Khi cần nhóm các phần tử lại với nhau hoặc áp dụng CSS cho một khối nội dung

**Câu 3:** `align="center"` có phải cách tốt nhất không?  
**Đáp:** Không, nên dùng CSS `text-align: center;` vì HTML5 không hỗ trợ align

---

## 🔗 Tài Liệu Tham Khảo

- <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">MDN Web Docs - HTML</a>
- <a href="https://www.w3schools.com/html/" target="_blank">W3Schools - HTML Tutorial</a>
- <a href="https://html.spec.whatwg.org/" target="_blank">HTML Living Standard</a>

---

**✍️ Ghi chú:** Luôn nhớ kiểm tra mã HTML của bạn bằng cách mở file `.html` trên trình duyệt và so sánh kết quả với yêu cầu!

**Happy Coding! 🚀**

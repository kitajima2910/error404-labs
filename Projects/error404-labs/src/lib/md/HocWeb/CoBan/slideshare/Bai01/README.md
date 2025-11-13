# 📚 Bài 01: Sử dụng các Tag Cơ Bản HTML

## ✨ Giới Thiệu

HTML (HyperText Markup Language) là ngôn ngữ đánh dấu siêu văn bản, được sử dụng để tạo ra cấu trúc và nội dung của các trang web. Nó không phải là ngôn ngữ lập trình mà là ngôn ngữ markup - tức là sử dụng các tag (thẻ) để định dạng thành phần trong trang web.

---

## 🎯 Yêu Cầu Bài Học

Thiết kế trang web có nội dung như sau:

![Bài tập minh họa](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-01/demo.png)

---

## 📖 Kiến Thức Cơ Bản

### 1️⃣ Cấu Trúc Cơ Bản của Một Trang HTML

Mỗi trang HTML đều có cấu trúc chuẩn như sau:

```html
<!DOCTYPE html>
<html lang="vi">
	<head>
		<!-- Phần thông tin metadata của trang -->
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Tiêu đề trang web</title>
	</head>
	<body>
		<!-- Phần nội dung hiển thị trên trang -->
	</body>
</html>
```

**Giải thích từng phần:**

- **`<!DOCTYPE html>`**: Khai báo loại tài liệu là HTML5
- **`<html>`**: Thẻ gốc chứa toàn bộ nội dung
- **`<head>`**: Phần đầu chứa metadata, không hiển thị trực tiếp
- **`<body>`**: Phần thân chứa nội dung hiển thị trên trình duyệt

### 2️⃣ Các Tag Quan Trọng Trong Bài

#### 🏷️ Tag Heading (Tiêu đề)

**Định nghĩa:** Dùng để tạo các tiêu đề với mức độ quan trọng khác nhau.

**Các mức heading:**

- `<h1>` - Tiêu đề cấp 1 (Lớn nhất, quan trọng nhất)
- `<h2>` - Tiêu đề cấp 2
- `<h3>` - Tiêu đề cấp 3
- ... cho đến `<h6>` - Tiêu đề cấp 6 (Nhỏ nhất)

**Ví dụ thực tế:**

```html
<h1>Lập trình Web tại Error404-Labs</h1>
<h2>Yêu cầu</h2>
<h3>Các điều kiện cơ bản</h3>
```

**Lưu ý:**

- Chỉ nên sử dụng 1 thẻ `<h1>` trên mỗi trang
- Các thẻ heading này rất quan trọng cho SEO

---

#### 📝 Tag Paragraph (Đoạn văn)

**Định nghĩa:** Dùng để tạo các đoạn văn bản.

**Ví dụ:**

```html
<p>Đây là một đoạn văn bản thông thường.</p>
<p>Mỗi thẻ p tạo ra một đoạn mới với khoảng cách phía trên và dưới.</p>
```

**Lưu ý:**

- Các khoảng trắng và xuống dòng trong HTML sẽ bị bỏ qua
- Phải sử dụng các tag để định dạng

---

#### 🔗 Tag Break Line (Ngắt dòng)

**Định nghĩa:** Tạo một ngắt dòng trong nội dung.

**Ví dụ:**

```html
<p>
	Lập trình Web tại Error404-Labs<br />
	Chào mừng các bạn đến với ngôn ngữ HTML
</p>
```

**Lưu ý:**

- `<br />` là tag tự đóng (self-closing tag)
- Không nên lạm dụng `<br />`, hãy sử dụng CSS để tạo khoảng cách

---

#### 🎨 Tag Meta (Siêu dữ liệu)

**Định nghĩa:** Cung cấp thông tin về tài liệu HTML mà trình duyệt và công cụ tìm kiếm cần.

**Các meta tag quan trọng:**

```html
<!-- Khai báo bộ ký tự (rất quan trọng cho tiếng Việt) -->
<meta charset="UTF-8" />

<!-- Responsive design - Tối ưu hóa cho thiết bị di động -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Mô tả trang (hiển thị trong kết quả tìm kiếm) -->
<meta name="description" content="Bài học HTML cơ bản" />

<!-- Từ khóa -->
<meta name="keywords" content="HTML, Web, Programming" />
```

---

## 🛠️ Các Thuộc Tính (Attributes)

### 1. Thuộc tính `align` (Căn lề)

**Định nghĩa:** Căn lề nội dung (trái, giữa, phải).

**Ví dụ:**

```html
<!-- Căn giữa -->
<h1 align="center">Bài 01: Sử dụng các tag cơ bản</h1>

<!-- Căn trái (mặc định) -->
<p align="left">Nội dung căn trái</p>

<!-- Căn phải -->
<p align="right">Nội dung căn phải</p>
```

**Lưu ý:**

- Thuộc tính `align` đã bị lỗi thời (deprecated)
- Nên sử dụng CSS thay thế: `style="text-align: center"`

---

### 2. Thuộc tính `style` (Định dạng inline)

**Định nghĩa:** Áp dụng CSS trực tiếp vào thẻ HTML.

**Ví dụ thực tế:**

```html
<!-- Gạch chân text -->
<h2 style="text-decoration: underline">Yêu cầu</h2>

<!-- In đậm text -->
<p style="font-weight: bold">Thiết kế trang web có nội dung như sau:</p>

<!-- Kết hợp nhiều style -->
<p style="color: red; font-size: 18px; text-align: center;">Nội dung căn giữa, màu đỏ</p>

<!-- In nghiêng -->
<p style="font-style: italic;">Nội dung in nghiêng</p>

<!-- Background color -->
<div style="background-color: yellow; padding: 10px;">Hộp có nền vàng</div>
```

**Các thuộc tính CSS thường dùng:**

| Thuộc tính         | Ý nghĩa           | Ví dụ                        |
| ------------------ | ----------------- | ---------------------------- |
| `color`            | Màu chữ           | `color: red`                 |
| `font-size`        | Kích thước chữ    | `font-size: 24px`            |
| `font-weight`      | Độ đậm            | `font-weight: bold`          |
| `font-style`       | Kiểu chữ          | `font-style: italic`         |
| `text-align`       | Căn lề            | `text-align: center`         |
| `text-decoration`  | Trang trí chữ     | `text-decoration: underline` |
| `background-color` | Màu nền           | `background-color: #f0f0f0`  |
| `padding`          | Khoảng cách trong | `padding: 10px`              |
| `margin`           | Khoảng cách ngoài | `margin: 20px`               |

---

## 📝 Code Mẫu

<details>
<summary>Yêu Cầu Bài Học</summary>

```html
<!DOCTYPE html>
<html lang="vi">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Sử dụng các tag cơ bản</title>
	</head>
	<body>
		<!-- Tiêu đề chính, căn giữa -->
		<h1 align="center">Bài 01: Sử dụng các tag cơ bản</h1>

		<!-- Tiêu đề phụ với gạch chân -->
		<h2 style="text-decoration: underline">Yêu cầu</h2>

		<!-- Đoạn văn in đậm -->
		<p style="font-weight: bold">Thiết kế trang web có nội dung như sau:</p>

		<!-- Nội dung căn giữa với ngắt dòng -->
		<p align="center">
			Lập trình Web tại Error404-Labs<br />
			Chào mừng các bạn đến với ngôn ngữ HTML
		</p>
	</body>
</html>
```

</details>

---

## 🎓 Bài Tập Thực Hành

### Bài tập 1: Tạo trang giới thiệu bản thân

![Giới thiệu về tôi](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-01/bai-tap-1.png)

<details>
<summary>Xem code mẫu</summary>

```html
<!DOCTYPE html>
<html lang="vi">
	<head>
		<meta charset="UTF-8" />
		<title>Giới thiệu về tôi</title>
	</head>
	<body>
		<h1 align="center">Giới Thiệu Về Tôi</h1>

		<h2>Thông tin cơ bản</h2>
		<p>Tôi là một lập trình viên đam mê học hỏi.</p>

		<h2>Kỹ năng</h2>
		<p style="font-weight: bold">HTML, CSS, JavaScript</p>

		<p align="center" style="color: blue; margin-top: 30px;">Cảm ơn bạn đã ghé thăm!</p>
	</body>
</html>
```

</details>

### Bài tập 2: Tạo trang sản phẩm

![Sản phẩm cơ bản](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-01/bai-tap-2.png)

<details>
<summary>Xem code mẫu</summary>

```html
<!DOCTYPE html>
<html lang="vi">
	<head>
		<meta charset="UTF-8" />
		<title>Sản phẩm</title>
	</head>
	<body>
		<h1 style="text-align: center; color: green;">Sản Phẩm Của Chúng Tôi</h1>

		<h2 style="text-decoration: underline;">Sản phẩm 1: Laptop Gaming</h2>
		<p style="font-weight: bold;">Giá: 25.000.000 VNĐ</p>
		<p>Laptop chuyên dụng cho gaming với cấu hình mạnh mẽ.</p>

		<h2 style="text-decoration: underline;">Sản phẩm 2: Điện thoại thông minh</h2>
		<p style="font-weight: bold;">Giá: 15.000.000 VNĐ</p>
		<p>Điện thoại cao cấp với camera 108MP.</p>
	</body>
</html>
```

</details>

---

## ⚠️ Những Lưu Ý Quan Trọng

| ✅ Nên Làm                                   | ❌ Không Nên Làm                          |
| -------------------------------------------- | ----------------------------------------- |
| Sử dụng charset UTF-8 để hỗ trợ tiếng Việt   | Bỏ qua khai báo charset                   |
| Sử dụng CSS thay vì thuộc tính HTML lỗi thời | Lạm dụng thuộc tính align                 |
| Đặt tiêu đề logic (h1 trước h2)              | Lẫn lộn thứ tự heading                    |
| Viết code có thụt đầu dòng rõ ràng           | Viết code không sắp xếp                   |
| Đóng tất cả các tag                          | Quên đóng tag                             |
| Sử dụng `<br />` tiết kiệm                   | Sử dụng nhiều `<br />` để tạo khoảng cách |

---

## 🔗 Tài Liệu Tham Khảo

- MDN Web Docs: https://developer.mozilla.org/vi/docs/Web/HTML
- W3Schools HTML Tutorial: https://www.w3schools.com/html/
- HTML Living Standard: https://html.spec.whatwg.org/

---

## 📌 Tóm Tắt

Trong bài học này, bạn đã học được:

✅ Cấu trúc cơ bản của một trang HTML
✅ Cách sử dụng các tag heading `<h1>` đến `<h6>`
✅ Cách sử dụng tag `<p>` để tạo đoạn văn
✅ Cách sử dụng tag `<br />` để ngắt dòng
✅ Cách sử dụng thuộc tính `align` và `style`
✅ Cách áp dụng CSS inline cho HTML elements

---

_Chúc bạn học tập vui vẻ! 🚀_

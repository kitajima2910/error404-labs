# 📘 **Bài 01: Sử dụng các tag cơ bản**

## 🎯 **Học được gì qua bài này**

- Sử dụng các **thẻ HTML** cơ bản để tạo ra trang Web
- Định dạng Web với **thuộc tính** trong thẻ HTML
- Sử dụng **CSS** cơ bản để định dạng Web

---

## 🧩 **Kiến thức cần dùng trong bài học**

### 🌟 **Tag HTML cơ bản**

| Tag               | Ý nghĩa                               | Ví dụ                            |
| ----------------- | ------------------------------------- | -------------------------------- |
| `<title>`         | Tiêu đề trang web (hiển thị trên tab) | `<title>Trang chủ</title>`       |
| `<h1>` đến `<h6>` | Tiêu đề từ lớn nhất đến nhỏ nhất      | `<h1>Tiêu đề chính</h1>`         |
| `<h2>`            | Tiêu đề cấp 2                         | `<h2>Tiêu đề phụ</h2>`           |
| `<p>`             | Đoạn văn bản                          | `<p>Đây là một đoạn văn bản</p>` |
| `<div>`           | Khối chứa nội dung (dùng để nhóm)     | `<div>Nội dung trong div</div>`  |
| `<br>`            | Xuống dòng                            | `Dòng 1<br>Dòng 2`               |

**Giải thích:**

- **`<title>`**: Dùng trong phần `<head>`, không hiển thị trên trang nhưng quan trọng cho SEO
- **`<h1>` - `<h6>`**: Các tag tiêu đề có độ ưu tiên khác nhau, `<h1>` là quan trọng nhất
- **`<p>`**: Dùng để bao bọc các đoạn văn bản, tự động tạo khoảng cách trước và sau
- **`<div>`**: Một container đa năng, dùng để tổ chức cấu trúc trang
- **`<br>`**: Thẻ tự đóng (self-closing), không cần `</br>`

---

### 🌟 **Attribute HTML**

| Attribute | Mô tả                                    | Ví dụ                             |
| --------- | ---------------------------------------- | --------------------------------- |
| `align`   | Căn chỉnh nội dung (left, center, right) | `<h1 align="center">Tiêu đề</h1>` |

**Giải thích:**

- **`align`**: Căn chỉnh vị trí hiển thị của phần tử
  - `align="left"`: Căn trái (mặc định)
  - `align="center"`: Căn giữa
  - `align="right"`: Căn phải

---

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS    | Ý nghĩa                                                     | Ví dụ                         |
| ----------------- | ----------------------------------------------------------- | ----------------------------- |
| `text-decoration` | Trang trí văn bản (underline, overline, line-through, none) | `text-decoration: underline;` |
| `font-weight`     | Độ dày của chữ (normal, bold, 100-900)                      | `font-weight: bold;`          |

**Giải thích:**

- **`text-decoration`**:
  - `underline`: Gạch dưới
  - `overline`: Gạch trên
  - `line-through`: Gạch ngang (xóa)
  - `none`: Không có trang trí
- **`font-weight`**:
  - `normal`: Bình thường (400)
  - `bold`: Đậm (700)
  - Có thể dùng giá trị 100-900 để điều chỉnh độ dày

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                                                           | Mã màu |
| --------- | ------------------------------------------------------------------------------------------------- | ------ |
| Trang web | - Tiêu đề trang web: Sử dụng các tag cơ bản                                                       |        |
| Nội dung  | - Dòng 1: Canh giữa                                                                               |        |
|           | - Đoạn văn bản <span style="color: #2a7a88">_"Lập trình Web ... ngôn ngữ HTML"_</span>: Canh giữa |        |

### 📸 Hình ảnh minh hoạ bài tập

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-01/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

<iframe title="Sử dụng các  tag cơ bản" scrolling="no" loading="lazy" style="height:500px; width: 100%; border:1px solid black; border-radius:6px;" src="https://livecodes.io/?x=id/a2qw5gt7zir&embed=true&loading=eager">
</iframe>

</details>

---

## 🧪 **Bài tập thực hành**

### 🔥 Bài tập 1: Tạo trang giới thiệu bản thân

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

### 🔥 Bài tập 2: Tạo trang sản phẩm

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

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

# 📘 **Bài 01: Sử dụng các tag cơ bản**

## 🎯 **Học được gì qua bài này**

- Hiểu và sử dụng các **thẻ HTML cơ bản** như `<title>`, `<h1>…<h6>`, `<p>`, `<div>`, `<br>`.
- Tạo được **một trang web đơn giản** có tiêu đề, tiêu đề chính, đoạn văn và bố cục cơ bản.
- Biết cách dùng **thuộc tính HTML (attribute)** để căn giữa nội dung.
- Biết áp dụng **CSS cơ bản** để định dạng chữ: gạch dưới, in đậm.
- Tự tay xây dựng một giao diện giống hình mẫu bài tập.

---

## 🧩 **Kiến thức cần học thêm**

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

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

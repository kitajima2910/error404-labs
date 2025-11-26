# 📘 **Bài 04: Định dạng trang web (tt)**

## 🎯 **Học được gì qua bài này**

- Sử dụng các thẻ HTML cơ bản để xây dựng cấu trúc trang Web
- Tùy chỉnh phần tử trang web bằng các thuộc tính HTML
- Định dạng giao diện Web với CSS cơ bản: nền, màu chữ, căn chỉnh, kích thước
- Kết hợp hình ảnh nền và định dạng văn bản để tạo giao diện chuyên nghiệp

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS | Ý nghĩa                                                        | Ví dụ                 |
| -------------- | -------------------------------------------------------------- | --------------------- |
| `text-align`   | Căn chỉnh văn bản theo chiều ngang (trái, phải, giữa, justify) | `text-align: center;` |

**Giải thích:**

- **left**: Căn trái (mặc định)
- **right**: Căn phải
- **center**: Căn giữa
- **justify**: Căn đều (kéo dài để vừa với chiều rộng container)

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                           | Mã màu           |
| --------- | ----------------------------------------------------------------- | ---------------- |
| Trang web | - Tiêu đề trang web: Định dạng trang web (tt)                     |                  |
| Nội dung  | - Định dạng chung:<br/>                                           |                  |
|           | <ul><li>Nền: Tô đầy trang bằng hình ảnh</li></ul>                 |                  |
|           | <ul><li>Chữ: Màu xanh ve chai đậm</li></ul>                       | #008888          |
|           | - Dòng đầu tiên: Khổ chữ lớn và canh giữa                         |                  |
|           | - Dòng thứ hai: Nền màu xanh ve chai, chữ trắng in đậm và nghiêng | #339999, #FFFFFF |

### 📸 Hình ảnh minh hoạ bài tập (tài nguyên: <a href="/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-04/assets.rar" download="">tải xuống</a>)

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-04/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

```html
<!doctype html>
<html lang="vi">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Định dạng trang web (tt)</title>
	</head>
	<body style="background-image: url('https://iili.io/fdcwRZF.jpg'); color: #008888">
		<h1 style="text-align: center">lorem ipsum</h1>
		<p style="background-color: #339999; color: #fff; font-weight: 700; font-style: italic">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptate optio non
			dignissimos culpa ipsum nulla esse ab nihil veniam? Possimus quaerat excepturi totam
			dignissimos? Labore quis recusandae ab quod porro itaque deserunt sit maiores sint ut quisquam
			nesciunt quasi vitae tempore exercitationem, animi nostrum officiis iste, rerum illo eaque!
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est vel voluptate sequi optio
			impedit, doloremque corrupti nihil natus, aliquid adipisci minus fugiat cum ratione et
			voluptatum magnam ex non consequatur.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vel illo earum a sint magni. Ab
			cupiditate fuga vel, accusamus tempore facere consectetur sunt quod. Dignissimos est debitis
			hic ullam libero saepe, dolore provident asperiores in architecto necessitatibus, non laborum
			praesentium, eos minima atque velit alias! Autem officiis perferendis nemo.
		</p>
	</body>
</html>
```

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

# 📘 **Bài 05: Định dạng văn bản**

## 🎯 **Học được gì qua bài này**

- Sử dụng các tag HTML định dạng văn bản: `<b>`, `<i>`, `<u>`, `<sub>`, `<sup>`, `<pre>`
- Tùy chỉnh màu sắc chữ bằng thuộc tính `color` trong HTML/CSS
- Áp dụng CSS cơ bản: màu nền (`background-color`), căn chỉnh (`text-align`)
- Kết hợp các tag và CSS để tạo giao diện trang web chuyên nghiệp

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tag HTML cơ bản**

| Tag      | Ý nghĩa                                                  | Ví dụ                                          |
| -------- | -------------------------------------------------------- | ---------------------------------------------- |
| `<b>`    | Làm cho chữ **đậm** (bold)                               | `<b>Chữ đậm</b>`                               |
| `<u>`    | <u>Gạch chân</u> chữ (underline)                         | `<u>Chữ gạch chân</u>`                         |
| `<i>`    | Làm cho chữ _nghiêng_ (italic)                           | `<i>Chữ nghiêng</i>`                           |
| `<font>` | Thay đổi **font chữ, màu sắc, kích thước**               | `<font color="red" size="5">Chữ màu đỏ</font>` |
| `<sub>`  | Chỉ số **dưới** (subscript)                              | `H<sub>2</sub>O`                               |
| `<sup>`  | Chỉ số **trên** (superscript)                            | `x<sup>2</sup>`                                |
| `<pre>`  | Hiển thị **chữ định dạng sẵn** (giữ nguyên khoảng trắng) | `<pre>  Dòng 1\n  Dòng 2</pre>`                |

**Giải thích:**

- `<b>` và `<i>`: Dùng để định dạng văn bản cơ bản
- `<font>`: Tag này đã lỗi thời, nên dùng CSS thay thế
- `<sub>` và `<sup>`: Thường dùng cho công thức toán học, hóa học
- `<pre>`: Dùng để hiển thị code hoặc văn bản cần giữ nguyên định dạng

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                       | Mã màu           |
| --------- | ------------------------------------------------------------- | ---------------- |
| Trang web | - Tiêu đề trang web: Định dạng văn bản                        |                  |
| Nội dung  | - Sử dụng các tag định dạng văn bản như hình dưới             |                  |
|           | - Dòng đầu tiên: Chữ màu xanh ve chai                         | #008888          |
|           | - Công thức hóa học và biểu thức toán học: Có chữ màu đỏ      | #FF0000          |
|           | - Đoạn code vòng lặp For: Chữ màu xanh dương đậm, nền màu xám | #0000CC, #CCCCCC |

### 📸 Hình ảnh minh hoạ bài tập

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-05/demo.png)

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
		<title>Định dạng văn bản</title>
	</head>
	<body>
		<h1 style="text-align: center; color: #008888">Định dạng văn bản</h1>
		<div>
			<b><u>Hóa học:</u></b> <i>Nước:</i><font color="red">H<sub>2</sub>O</font>;
			<i>Axit Sunfuric:</i> <font color="red">H<sub>2</sub>SO<sub>4</sub></font>
		</div>
		<div>
			<b><u>Toán học:</u></b> <i>Pương trình bậc 2:</i>
			<font color="red">ax<sup>2</sup> + bx + c = 0</font>
		</div>
		<div>
			<b><u>Tin học:</u></b> <i>Vòng lặp For:</i>
		</div>
		<pre style="color: #0000cc; background-color: #ccc">
			
			for(int i = 0; i < 10; i++) {
				cout << i << endl;
			}
		</pre
		>
	</body>
</html>
```

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

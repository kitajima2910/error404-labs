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

<pre class="code_syntax" style="color:#000000;background:#ffffff;"><span class="line_wrapper"><span style="color:#004a43; ">&lt;!DOCTYPE html&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#274796; "> </span><span style="color:#074726; ">lang</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"vi"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">charset</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"UTF-8"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">name</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"viewport"</span><span style="color:#274796; "> </span><span style="color:#074726; ">content</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"width=device-width, initial-scale=1.0"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span>Sử dụng các tag cơ bản<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#696969; ">&lt;!-- Tiêu đề chính, căn giữa --&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#274796; "> </span><span style="color:#074726; ">align</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"center"</span><span style="color:#a65700; ">&gt;</span>Bài <span style="color:#008c00; ">01</span>: Sử dụng các tag cơ bản<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#696969; ">&lt;!-- Tiêu đề phụ với gạch chân --&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">text-decoration</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">underline</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>Yêu cầu<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#696969; ">&lt;!-- Đoạn văn in đậm --&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">font-weight</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">bold</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>Thiết kế trang web có nội dung như sau:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#696969; ">&lt;!-- Nội dung căn giữa với ngắt dòng --&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#274796; "> </span><span style="color:#074726; ">align</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"center"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            Lập trình Web tại Error404-Labs<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">br</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">            Chào mừng các bạn đến với ngôn ngữ HTML</span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#a65700; ">&gt;</span></span></pre>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

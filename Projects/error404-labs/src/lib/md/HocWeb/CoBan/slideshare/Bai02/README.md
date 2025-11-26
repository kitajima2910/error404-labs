# 📘 **Bài 02: Sử dụng các tag cơ bản (tt)**

## 🎯 **Học được gì qua bài này**

- Sử dụng được **thẻ `<hr>`** để tạo đường phân cách nội dung.
- Biết cách dùng **attribute `width`** để điều chỉnh chiều rộng của hình ảnh, bảng, video…
- Áp dụng được **CSS màu sắc**:
  - `color` (màu chữ)
  - `background-color` (màu nền)

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

<pre class="code_syntax" style="color:#000000;background:#ffffff;"><span class="line_wrapper"><span style="color:#004a43; ">&lt;!doctype html&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#274796; "> </span><span style="color:#074726; ">lang</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"en"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">  <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">charset</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"UTF-8"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">name</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"viewport"</span><span style="color:#274796; "> </span><span style="color:#074726; ">content</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"width=device-width, initial-scale=1.0"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span>Sử dụng các tag cơ bản<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">  <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">  <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#274796; "> </span><span style="color:#074726; ">align</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"center"</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">006600</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">      Bài <span style="color:#008c00; ">02</span>: Sử dụng các tag cơ bản (tt)</span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">text-decoration</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">underline</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">0000ff</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>Yêu cầu<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">font-weight</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">700</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>Thiết kế trang web có nội dung như sau:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#274796; "> </span><span style="color:#074726; ">align</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"center"</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">ff3399</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">background-color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">fecffd</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">      -:- BÀN PHÍM -:-</span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">div</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">background-color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">ffffcc</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">      <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#274796; "> </span><span style="color:#074726; ">align</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"center"</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">0000ff</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">font-style</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">italic</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        Bàn phím im lìm dưới ánh đèn,<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">br</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span>Mười ngón tay lướt trên nền,<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">br</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span>Nét</span>
<span class="line_wrapper">        chữ, dòng thơ, hay nốt nhạc,<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">br</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span>Âm thanh cất lên, chẳng còn im lặng<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">      <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">      <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">hr</span><span style="color:#274796; "> </span><span style="color:#074726; ">width</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"250"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">      <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#274796; "> </span><span style="color:#074726; ">align</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"center"</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">006600</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">font-style</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">italic</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        Gõ nhịp thời gian, từng giây, từng phút,<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">br</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span>Công việc, giải trí, chẳng</span>
<span class="line_wrapper">        chút ngập ngừng,<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">br</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span>Dù là sáng tác hay làm bài tập,<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">br</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span>Bàn phím âm</span>
<span class="line_wrapper">        thầm, bênh cạnh ta cùng<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">      <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">div</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">  <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"></span></pre>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

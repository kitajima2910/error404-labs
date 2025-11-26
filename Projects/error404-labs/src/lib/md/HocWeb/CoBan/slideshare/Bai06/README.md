# 📘 **Bài 06: Định dạng văn bản (tt)**

## 🎯 **Học được gì qua bài này**

- Hiểu và sử dụng thẻ **`<span>`** để định dạng một phần nhỏ của văn bản mà không xuống dòng.
- Áp dụng các thuộc tính **CSS cơ bản** như `font-size`, `border-width`, `border-style`, `border-color` để định dạng giao diện.
- Biết cách **canh lề văn bản** (trái, phải) bằng thuộc tính CSS `text-align`.
- Kết hợp HTML + CSS để tạo bố cục và định dạng đoạn văn theo **màu sắc**, **nền**, **kích thước chữ**, **tô màu ký tự riêng lẻ**.
- Thực hành tái tạo giao diện theo mẫu dựa trên các tag định dạng văn bản: màu chữ, màu nền, căn chỉnh, nhấn mạnh ký tự hoặc tên riêng bằng thẻ `<span>`.

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tag HTML cơ bản**

| Tag      | Ý nghĩa                                                          | Ví dụ                                     |
| -------- | ---------------------------------------------------------------- | ----------------------------------------- |
| `<span>` | Định dạng một phần nhỏ text trong cùng một dòng (inline element) | `<span style="color: red;">Chữ đỏ</span>` |

**Giải thích:**
`<span>` là một thẻ HTML dùng để bao quanh một phần text hoặc các phần tử inline khác mà không tạo dòng mới. Nó thường được sử dụng kết hợp với CSS để định dạng các phần nhỏ của nội dung như thay đổi màu chữ, font chữ, kích thước, v.v.

---

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS | Ý nghĩa                                                | Ví dụ                                           |
| -------------- | ------------------------------------------------------ | ----------------------------------------------- |
| `font-size`    | Thay đổi kích thước của chữ                            | `font-size: 16px;` hoặc `font-size: 1.5em;`     |
| `border-width` | Xác định độ dày của đường viền                         | `border-width: 2px;`                            |
| `border-style` | Xác định kiểu đường viền (solid, dashed, dotted, v.v.) | `border-style: solid;`                          |
| `border-color` | Xác định màu sắc của đường viền                        | `border-color: #333;` hoặc `border-color: red;` |

**Giải thích:**

- `font-size`: Được sử dụng để điều chỉnh kích thước text. Có thể sử dụng pixel (px), em, rem, hoặc các đơn vị khác.
- `border-width`: Điều khiển độ dày của viền, có thể dùng px, em, hoặc các giá trị như thin, medium, thick.
- `border-style`: Định kiểu dáng viền như solid (liền), dashed (gạch), dotted (chấm), double (đôi), v.v.
- `border-color`: Đặt màu cho viền, có thể dùng tên màu, mã hex, RGB, hoặc HSL.

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                                   | Mã màu           |
| --------- | ------------------------------------------------------------------------- | ---------------- |
| Trang web | - Tiêu đề trang web: Định dạng văn bản (tt)                               |                  |
| Nội dung  | - Sử dụng các tag định dạng văn bản như hình dưới                         |                  |
|           | - Đoạn văn đầu: Canh lề trái                                              |                  |
|           | - Dòng "HỆ SINH THÁI MINDFLOW ART!": Canh lề phải, màu chữ trắng, nền cam | #fff, #ee710e    |
|           | - Đoạn văn thứ hai: Canh lề phải                                          |                  |
|           | - Chú ý: Chữ "A" to có màu đỏ nâu, "Phan Tường An" có nền vàng đậm        | #9c0105, #facb02 |

### 📸 Hình ảnh minh hoạ bài tập

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-06/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

<pre class="code_syntax" style="color:#000000;background:#ffffff;"><span class="line_wrapper"><span style="color:#004a43; ">&lt;!doctype html&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#274796; "> </span><span style="color:#074726; ">lang</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"en"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">charset</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"UTF-8"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">name</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"viewport"</span><span style="color:#274796; "> </span><span style="color:#074726; ">content</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"width=device-width, initial-scale=1.0"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span>ART KID GARDEN<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#5f5035; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">           </span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">                </span><span style="color:#bb7977; font-weight:bold; ">border-width</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">3</span><span style="color:#006600; ">px</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">                </span><span style="color:#bb7977; font-weight:bold; ">border-style</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">solid</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">                </span><span style="color:#bb7977; font-weight:bold; ">border-color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">ee710e</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">                </span><span style="color:#bb7977; font-weight:bold; ">text-align</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">center</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">                </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">ee710e</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            </span><span style="color:#0000e6; ">"</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">        </span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            ART KID GARDEN</span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">font-size</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">50</span><span style="color:#006600; ">px</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">9c0105</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">font-weight</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">700</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>A<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#a65700; ">&gt;</span>rt Kid Garden là lớp</span>
<span class="line_wrapper">            học giáo dục nghệ thuật và kĩ năng dành cho nhóm trẻ từ <span style="color:#008c00; ">4</span> đến <span style="color:#008c00; ">12</span> tuổi, tập trung vào mục tiêu</span>
<span class="line_wrapper">            phát triển <span style="color:#008c00; ">4</span> năng lực nền tảng và cân bằng gốc thông qua các hoạt động đa dạng do Nhà giáo dục</span>
<span class="line_wrapper">            Phan Tường An (Cô Cỏ) xây dựng và phát triển<span style="color:#008c00; ">.</span> Nhiệm vụ của Art Kid Garden là xây dựng môi</span>
<span class="line_wrapper">            trường phù hợp <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">b</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">u</span><span style="color:#a65700; ">&gt;</span>cho sự phát triển tự nhiên của trẻ<span style="color:#008c00; ">.</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">u</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">b</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">text-align</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">right</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">background-color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">ee710e</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">fff</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            HỆ SINH THÁI MINDFLOW ART!</span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">text-align</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">right</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">font-size</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">50</span><span style="color:#006600; ">px</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">9c0105</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">font-weight</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">700</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>A<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#a65700; ">&gt;</span>rt Kid Garden là lớp</span>
<span class="line_wrapper">            học giáo dục <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">9c0105</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">font-weight</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">700</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>nghệ thuật<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#a65700; ">&gt;</span> và</span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">9c0105</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">font-weight</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">700</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>kĩ năng<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#a65700; ">&gt;</span> cho trẻ từ <span style="color:#008c00; ">4</span> đến <span style="color:#008c00; ">12</span> tuổi, thành</span>
<span class="line_wrapper">            lập từ năm <span style="color:#008c00; ">2018.</span> Sử dụng chương trình giáo dục nghệ thuật Mindflow Art do Nhà giáo dục</span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">background-color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">facb02</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>Phan Tường An<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">span</span><span style="color:#a65700; ">&gt;</span> xây dựng và phát triển<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"></span></pre>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

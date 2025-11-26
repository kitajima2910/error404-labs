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

<pre class="code_syntax" style="color:#000000;background:#ffffff;"><span class="line_wrapper"><span style="color:#004a43; ">&lt;!doctype html&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#274796; "> </span><span style="color:#074726; ">lang</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"en"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">charset</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"UTF-8"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">name</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"viewport"</span><span style="color:#274796; "> </span><span style="color:#074726; ">content</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"width=device-width, initial-scale=1.0"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span>Định dạng văn bản<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">text-align</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">center</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">008888</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>Định dạng văn bản<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">div</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">b</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">u</span><span style="color:#a65700; ">&gt;</span>Hóa học:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">u</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">b</span><span style="color:#a65700; ">&gt;</span> <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">i</span><span style="color:#a65700; ">&gt;</span>Nước:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">i</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">font</span><span style="color:#274796; "> </span><span style="color:#074726; ">color</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"red"</span><span style="color:#a65700; ">&gt;</span>H<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">sub</span><span style="color:#a65700; ">&gt;</span><span style="color:#008c00; ">2</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">sub</span><span style="color:#a65700; ">&gt;</span>O<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">font</span><span style="color:#a65700; ">&gt;</span>;</span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">i</span><span style="color:#a65700; ">&gt;</span>Axit Sunfuric:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">i</span><span style="color:#a65700; ">&gt;</span> <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">font</span><span style="color:#274796; "> </span><span style="color:#074726; ">color</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"red"</span><span style="color:#a65700; ">&gt;</span>H<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">sub</span><span style="color:#a65700; ">&gt;</span><span style="color:#008c00; ">2</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">sub</span><span style="color:#a65700; ">&gt;</span>SO<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">sub</span><span style="color:#a65700; ">&gt;</span><span style="color:#008c00; ">4</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">sub</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">font</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">div</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">div</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">b</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">u</span><span style="color:#a65700; ">&gt;</span>Toán học:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">u</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">b</span><span style="color:#a65700; ">&gt;</span> <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">i</span><span style="color:#a65700; ">&gt;</span>Pương trình bậc <span style="color:#008c00; ">2</span>:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">i</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">font</span><span style="color:#274796; "> </span><span style="color:#074726; ">color</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"red"</span><span style="color:#a65700; ">&gt;</span>ax<span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">sup</span><span style="color:#a65700; ">&gt;</span><span style="color:#008c00; ">2</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">sup</span><span style="color:#a65700; ">&gt;</span> + bx + c = <span style="color:#008c00; ">0</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">font</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">div</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">div</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">b</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">u</span><span style="color:#a65700; ">&gt;</span>Tin học:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">u</span><span style="color:#a65700; ">&gt;</span><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">b</span><span style="color:#a65700; ">&gt;</span> <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">i</span><span style="color:#a65700; ">&gt;</span>Vòng lặp For:<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">i</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">div</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">pre</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">0000cc</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">background-color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">ccc</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            </span>
<span class="line_wrapper">            for(int i = <span style="color:#008c00; ">0</span>; i &lt; <span style="color:#008c00; ">10</span>; i++) {</span>
<span class="line_wrapper">                cout &lt;<span style="color:#a65700; ">&lt;</span> <span style="color:#800000; font-weight:bold; ">i</span><span style="color:#274796; "> &lt;&lt; endl;</span></span>
<span class="line_wrapper"><span style="color:#274796; ">            }</span></span>
<span class="line_wrapper"><span style="color:#274796; ">        &lt;/pre</span></span>
<span class="line_wrapper"><span style="color:#274796; ">        </span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"></span></pre>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

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

<pre class="code_syntax" style="color:#000000;background:#ffffff;"><span class="line_wrapper"><span style="color:#004a43; ">&lt;!doctype html&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#274796; "> </span><span style="color:#074726; ">lang</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"vi"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">charset</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"UTF-8"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">name</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"viewport"</span><span style="color:#274796; "> </span><span style="color:#074726; ">content</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"width=device-width, initial-scale=1.0"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span>Định dạng trang web (tt)<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">background-image</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#400000; ">url</span><span style="color:#808030; ">(</span><span style="color:#0000e6; ">'</span><span style="color:#666616; ">https</span><span style="color:#800080; ">:</span><span style="color:#800000; font-weight:bold; ">//</span><span style="color:#5555dd; ">iili.io</span><span style="color:#40015a; ">/fdcwRZF.jpg</span><span style="color:#0000e6; ">'</span><span style="color:#808030; ">)</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">008888</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">text-align</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">center</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>lorem ipsum<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h1</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">background-color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">339999</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">fff</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">font-weight</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">700</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">font-style</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">italic</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            Lorem ipsum dolor sit amet consectetur adipisicing elit<span style="color:#008c00; ">.</span> Veritatis voluptate optio non</span>
<span class="line_wrapper">            dignissimos culpa ipsum nulla esse ab nihil veniam? Possimus quaerat excepturi totam</span>
<span class="line_wrapper">            dignissimos? Labore quis recusandae ab quod porro itaque deserunt sit maiores sint ut quisquam</span>
<span class="line_wrapper">            nesciunt quasi vitae tempore exercitationem, animi nostrum officiis iste, rerum illo eaque!</span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            Lorem ipsum dolor, sit amet consectetur adipisicing elit<span style="color:#008c00; ">.</span> Est vel voluptate sequi optio</span>
<span class="line_wrapper">            impedit, doloremque corrupti nihil natus, aliquid adipisci minus fugiat cum ratione et</span>
<span class="line_wrapper">            voluptatum magnam ex non consequatur<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            Lorem ipsum dolor sit amet consectetur adipisicing elit<span style="color:#008c00; ">.</span> Enim vel illo earum a sint magni<span style="color:#008c00; ">.</span> Ab</span>
<span class="line_wrapper">            cupiditate fuga vel, accusamus tempore facere consectetur sunt quod<span style="color:#008c00; ">.</span> Dignissimos est debitis</span>
<span class="line_wrapper">            hic ullam libero saepe, dolore provident asperiores in architecto necessitatibus, non laborum</span>
<span class="line_wrapper">            praesentium, eos minima atque velit alias! Autem officiis perferendis nemo<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"></span></pre>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_

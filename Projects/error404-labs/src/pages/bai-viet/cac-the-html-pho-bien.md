---
layout: '../../layouts/BlogPostLayout.astro'
title: '[HTMLB2LT]: Các thẻ HTML phổ biến phần 1'
date: 2026-01-09
author: Phạm Xuân Hoài
image:
    {
        src: '/images/html/cac-the-html-pho-bien-phan-1.webp',
        alt: 'Cấu trúc cơ bản của trang HTML',
    }
description: Khám phá các thẻ HTML phổ biến nhất giúp xây dựng cấu trúc website nhanh chóng, dễ hiểu và chuẩn nền tảng cho người mới bắt đầu học lập trình web 🚀
draft: false
category: HTML
---

<h2 class="text-2xl font-semibold" >Thẻ Tiêu đề (Headings): &lt;h1&gt; đến &lt;h6&gt;</h2>
<br/>

- Tiêu đề là cực kỳ quan trọng để cấu trúc nội dung và giúp người đọc hiểu được bố cục bài viết.
- HTML cung cấp 6 cấp độ tiêu đề, từ &lt;h1&gt; đến &lt;h6&gt;.

<br/>

**Lưu ý:**

- &lt;h1&gt;: quan trọng nhất, thường là tiêu đề chính của trang hoặc bài viết.
- &lt;h6&gt;: ít quan trọng nhất, cho các tiêu đề phụ rất nhỏ.

<br/>

**Ví dụ:**

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Tiêu đề trang web</title>
    </head>

    <body>
        <h1>Đây là tiêu đề quan trọng nhất (lớn nhất)</h1>
        <h2>Đây là tiêu đề quan trọng thứ nhì (lớn thứ nhì)</h2>
        <h3>Đây là tiêu đề quan trọng thứ ba (lớn thứ ba)</h3>
        <h4>Đây là tiêu đề quan trọng thứ tư (lớn thứ tư)</h4>
        <h5>Đây là tiêu đề quan trọng thứ năm (lớn thứ năm)</h5>
        <h6>Đây là tiêu đề ít quan trọng nhất (nhỏ nhất)</h6>
    </body>
</html>
```

<br/>

**Hiển thị trên web:**

<div class="border">

![Thẻ tiêu đề h1 đến h6](/images/html/cac-the-html-pho-bien-phan-1-01.webp)

</div>

<br/>

<h2 class="text-2xl font-semibold">Thẻ Đoạn văn (Paragraph): &lt;p&gt;</h2>
<br/>

- Thẻ &lt;p&gt; dùng để định nghĩa một đoạn văn.

<br/>

**Ví dụ:**

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Tiêu đề trang web</title>
    </head>

    <body>
        <p>Đây là đoạn văn thứ nhất rất dài... rất rất dài...</p>
        <p>Đây là đoạn văn thứ hai rất dài... rất rất dài...</p>
        <p>Đây là đoạn văn thứ ba rất dài... rất rất dài...</p>
    </body>
</html>
```

<br/>

**Hiển thị trên web:**

<div class="border">

![Thẻ đoạn văn p](/images/html/cac-the-html-pho-bien-phan-1-02.webp)

</div>

<br/>

<h2 class="text-2xl font-semibold">Thẻ Định dạng Văn bản (Text Formatting)</h2>
<br/>

- HTML cung cấp nhiều thẻ để thay đổi cách hiển thị hoặc thêm ý nghĩa cho văn bản.

<br/>

- &lt;strong&gt; và &lt;b&gt;: **In đậm văn bản**. (strong dùng cho văn bản quan trọng, b dùng cho văn bản định dạng)
- &lt;em&gt; và &lt;i&gt;: _In nghiêng văn bản_. (em dùng cho văn bản quan trọng, i dùng cho văn bản định dạng)
- &lt;mark&gt;: <mark>Đánh dấu (highlight) văn bản</mark>.
- &lt;del&gt;: <del>Gạch ngang văn bản (ví dụ: giá cũ)</del>.
- &lt;ins&gt; và &lt;u&gt;: <u>Gạch chân văn bản</u>. (ins dùng cho văn bản quan trọng, u dùng cho văn bản định dạng)
- &lt;sub&gt;: Chỉ số dưới (ví dụ: H₂O).
- &lt;sup&gt;: Chỉ số trên (ví dụ: x²).

<br/>

**Ví dụ:**

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Tiêu đề trang web</title>
    </head>

    <body>
        <p>
            Đây là văn bản <strong>quan trọng</strong> và đây là văn bản
            <b>được in đậm</b>.
        </p>
    </body>
</html>
```

<br/>

**Hiển thị trên web:**

<div class="border">

![Thẻ định dạng văn bản](/images/html/cac-the-html-pho-bien-phan-1-03.webp)

</div>

<br/>

<h2 class="text-2xl font-semibold">Thẻ Liên kết (Links): &lt;a&gt;</h2>
<br/>

- Thẻ &lt;a&gt; dùng để tạo liên kết. (bên trong trang web hoặc bên ngoài trang web)

<br/>

**Ví dụ:**

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Tiêu đề trang web</title>
    </head>

    <body>
        <p>
            Truy cập <a href="https://www.google.com">Trang tìm kiếm Google</a>.
        </p>

        <p>
            Xem <a href="/gioi-thieu-v2">Giới thiệu về tôi</a> (liên kết nội
            bộ).
        </p>

        <p>
            Tải xuống
            <a href="/og-image.jpg" download>Tài liệu PDF</a> (liên kết tải
            xuống).
        </p>

        <p>
            Gửi email:
            <a href="mailto:kitajima2910@gmail.com">kitajima2910@gmail.com</a>.
        </p>

        <p>Gọi điện: <a href="tel:+84901858004">0901858004</a>.</p>
    </body>
</html>
```

<br/>

**Hiển thị trên web:**

<div class="border">

![Thẻ liên kết](/images/html/cac-the-html-pho-bien-phan-1-04.webp)

</div>

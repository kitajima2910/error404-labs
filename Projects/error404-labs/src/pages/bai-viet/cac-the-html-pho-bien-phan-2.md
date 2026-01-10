---
layout: '../../layouts/BlogPostLayout.astro'
title: '[HTMLB3LT]: Các thẻ HTML phổ biến phần 2'
date: 2026-01-10
author: Phạm Xuân Hoài
image:
    {
        src: '/images/html/cac-the-html-pho-bien-phan-2.webp',
        alt: 'Các thẻ HTML phổ biến phần 2',
    }
description: 🚀 Khám phá các thẻ HTML phổ biến nhất giúp bạn xây dựng cấu trúc website 🧱, định dạng nội dung ✍️ và tạo giao diện web chuyên nghiệp 🌐 một cách nhanh – gọn – hiệu quả ⚡
draft: false
category: HTML
---

<h2 class="text-2xl font-semibold" >Thẻ Danh sách (Lists): &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</h2>
<br/>

**HTML hỗ trợ hai loại danh sách chính:**

- &lt;ul&gt; (Unordered List): Danh sách không có thứ tự cụ thể.
- &lt;ol&gt; (Ordered List): Danh sách có thứ tự.
- &lt;li&gt; (List Item): Mỗi mục trong danh sách (dùng cho cả &lt;ul&gt; và &lt;ol&gt;).

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
        <h3>Dụng cụ để vẽ:</h3>
        <ul>
            <li>Giấy</li>
            <li>Màu</li>
            <li>Giá đỡ</li>
        </ul>

        <h3>Các bước thực hiện:</h3>
        <ol>
            <li>Lên ý tưởng.</li>
            <li>Thực hiện ý tưởng.</li>
            <li>Thưởng thức thành quả.</li>
        </ol>
    </body>
</html>
```

<br/>

**Hiển thị trên web:**

<div class="border">

![Thẻ Danh sách (Lists)](/images/html/cac-the-html-pho-bien-phan-2-01.webp)

</div>

<br/>

<h2 class="text-2xl font-semibold" >Thẻ &lt;div&gt;, &lt;span&gt;</h2>
<br/>

- &lt;div&gt; (Division): Là một thẻ khối (block-level).
- &lt;span&gt;: Là một thẻ nội tuyến (inline-level).

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
        <div>
            <h3>Tiêu đề trong Div</h3>
            <p>
                Đoạn văn này và tiêu đề trên được nhóm lại trong một thẻ div.
                Mỗi div sẽ đứng trên một dòng riêng.
            </p>
        </div>

        <div>
            <p>Đây là div thứ hai, nó cũng bắt đầu trên một dòng mới.</p>
        </div>

        <p>
            Đây là một đoạn văn bản chứa một
            <span><b>cụm từ được định dạng riêng</b></span> bằng thẻ span.
        </p>
    </body>
</html>
```

<br/>

**Hiển thị trên web:**

<div class="border">

![Thẻ div, span](/images/html/cac-the-html-pho-bien-phan-2-02.webp)

</div>

<br/>

<h2 class="text-2xl font-semibold" >Các Thẻ Ngữ nghĩa của HTML5 (Semantic Tags)</h2>
<br/>

- HTML5 giới thiệu nhiều thẻ mới giúp chúng ta mô tả ý nghĩa của nội dung một cách rõ ràng hơn thay vì chỉ dùng &lt;div&gt; cho mọi thứ. (giúp cho SEO tốt)

<br/>

**Một số thẻ ngữ nghĩa phổ biến:**

- &lt;header&gt;: Phần đầu của trang hoặc một phần tử (như bài viết), thường chứa tiêu đề, logo, điều hướng.
- &lt;nav&gt;: Chứa các liên kết điều hướng chính của trang web.
- &lt;main&gt;: Chứa nội dung chính, độc lập và duy nhất của tài liệu. Chỉ nên có một thẻ &lt;main&gt; trên mỗi trang.
- &lt;article&gt;: Chứa một phần nội dung độc lập và có ý nghĩa riêng (ví dụ: một bài blog, một mục tin tức, một bình luận).
- &lt;section&gt;: Định nghĩa một phần (section) trong tài liệu, thường có tiêu đề riêng.
- &lt;aside&gt;: Chứa nội dung liên quan đến nội dung chính nhưng có thể độc lập (ví dụ: sidebar, hộp thông tin liên quan).
- &lt;footer&gt;: Phần chân trang của tài liệu hoặc một phần tử, thường chứa thông tin bản quyền, liên hệ, liên kết phụ.

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
        <header>
            <h1>Tên Trang Web / Logo</h1>
            <nav>
                <a href="/">Trang chủ</a>
                <a href="/blog">Blog</a>
                <a href="/contact">Liên hệ</a>
            </nav>
        </header>

        <main>
            <article>
                <h2>Tiêu đề Bài Viết A</h2>
                <p>Nội dung chính của bài viết A...</p>
                <section>
                    <h3>Bình luận</h3>
                    <p>Một bình luận...</p>
                </section>
            </article>

            <aside>
                <h3>Bài viết liên quan</h3>
                <ul>
                    <li><a href="#">Bài viết B</a></li>
                    <li><a href="#">Bài viết C</a></li>
                </ul>
            </aside>
        </main>

        <footer>
            <p>&copy; 2023 Tên của bạn.</p>
        </footer>
    </body>
</html>
```

<br/>

**Hiển thị trên web:**

<div class="border">

![Thẻ ngữ nghĩa của HTML5](/images/html/cac-the-html-pho-bien-phan-2-03.webp)

</div>

<br/>

<h2 class="text-2xl font-semibold" >Thẻ Ngắt dòng và Đường kẻ ngang (&lt;br&gt;, &lt;hr&gt;)</h2>
<br/>

- Hai thẻ này là những thẻ &quot;tự đóng&quot; (không có thẻ đóng &lt;/br&gt; hay &lt;/hr&gt;).

<br/>

- &lt;br&gt; (Break Rule): Tạo một dòng mới ngay tại vị trí của thẻ.
- &lt;hr&gt; (Horizontal Rule): Vẽ một đường kẻ ngang, dùng để phân chia nội dung theo chủ đề.

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
            Địa chỉ của tôi:<br />
            Số 123, Đường ABC,<br />
            Quận XYZ, Thành phố HCM.
        </p>

        <p>Phần đầu của nội dung.</p>
        <hr />
        <p>Phần tiếp theo của nội dung, được phân cách bằng đường kẻ.</p>
    </body>
</html>
```

<br/>

**Hiển thị trên web:**

<div class="border">

![Thẻ ngắt dòng và Đường kẻ ngang](/images/html/cac-the-html-pho-bien-phan-2-04.avif)

</div>

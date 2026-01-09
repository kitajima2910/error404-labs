---
layout: '../../layouts/BlogPostLayout.astro'
title: '[HTMLB1LT]: Cấu trúc cơ bản của trang HTML'
date: 2026-01-09
author: Phạm Xuân Hoài
image:
    {
        src: '/images/html/cau-truc-co-ban-cua-trang-html.webp',
        alt: 'Cấu trúc cơ bản của trang HTML',
    }
description: Tìm hiểu cách một trang web được tạo nên từ những dòng HTML đầu tiên — nền tảng quan trọng giúp bước vào thế giới lập trình web 🌐
draft: false
category: HTML
---

<h2 class="text-2xl font-semibold">Giới thiệu về HTML</h2>
<br/>

- HTML là ngôn ngữ dùng để mô tả một trang web.
- HTML viết tắt của từ Hyper **T**ext **M**arkup **L**anguage.
- HTML không phải là ngôn ngữ lập trình.
- HTML là ngôn ngữ đánh dấu (markup language) sử dụng các thẻ (tag) để mô tả trang web.

<br/>

<h2 class="text-2xl font-semibold">Cấu trúc cơ bản của trang HTML</h2>
<br/>
Cấu trúc cơ bản của trang HTML có dạng như sau, thường gồm 3 phần:

- `- <!DOCTYPE html>`: Phần khai báo chuẩn của html.
- `- <head></head>`: Phần khai báo ban đầu, khai báo về meta, title, css, javascript…
- `- <body></body>`: Phần chứa nội dung của trang web, nơi hiển thị nội dung.

<br/>

**Cấu trúc cơ bản**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Tiêu đề trang web</title>
    </head>

    <body>
        ...Phần chứa nội dung của trang web...
    </body>
</html>
```

<br/>
<h2 class="text-2xl font-semibold">Cấu trúc cơ bản của trang web</h2>
<br/>

Mỗi trang web đều có cách thể hiện cấu trúc khác nhau, có trang 1 cột, có trang 2 và cũng có trang chứa nhiều cột.

Bên dưới tham khảo mô tả của một trang đơn giản sử dụng 2 cột để dựng layout.

<br/>

![Cấu trúc cơ bản của trang web](/images/html/cau-truc-co-ban-cua-trang-html-01.webp)

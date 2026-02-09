---
layout: '../../layouts/BlogPostLayout.astro'
title: '🎨 Xây dựng UI - Tags'
date: 2026-02-09
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-tags.avif',
        alt: '🎨 Xây dựng UI - Tags',
    }
description: Hôm nay chúng ta cùng học cách tạo UI Các Thẻ (Tag / Chip) siêu xinh ✨ Từ những khối HTML đơn giản, mình sẽ biến chúng thành các thẻ màu sắc giống web học lập trình thật 🎨 Học xong là có thể tự làm danh sách chủ đề cho blog hoặc game của mình luôn 🚀
draft: false
category: KH_WEB_CB_2026_01
---

## 🧩 Tổng Quan Cấu Trúc

```
UI Tag List
 ├── Phần 1 – Khung chứa
 ├── Phần 2 – Tiêu đề
 ├── Phần 3 – Danh sách thẻ
 └── Phần 4 – Trang trí & Hover
```

Chúng ta học từng phần, rồi ghép lại 🔧

---

# 🥇 Phần 1 – Khung Chứa UI

## Level 1 – HTML

Khung chứa giống như cái hộp đựng tất cả thẻ bên trong 📦

```html
<section class="tag-list"></section>
```

Giải thích dễ hiểu:

- `section` = khu vực
- `class="tag-list"` = đặt tên để lát CSS trang trí

---

## Level 2 – CSS

```css
.tag-list {
    max-width: 100%;
    width: 350px;
    margin: 0 auto;
}
```

Giải thích:

- `width: 350px` → chiều ngang hộp
- `margin: 0 auto` → căn giữa màn hình

👉 Giống đặt cái hộp vào giữa bàn.

---

## Level 3 – Trang trí

Chưa cần làm gì ở đây

---

# 🥈 Phần 2 – Tiêu đề

## Level 1 – HTML

```html
<h2 class="title">Các Thẻ</h2>
```

Giải thích:

- `h2` = tiêu đề lớn
- Nội dung: “Các Thẻ”

---

## Level 2 – CSS

Hiện tại bạn **chưa style** → OK để Level basic.

Sau này có thể thêm:

- màu chữ
- font
- size

---

## Level 3 – Trang trí

Có thể mở rộng sau:

- thêm icon 🎨
- thêm gạch chân
- thêm background

(Trong bài này giữ nguyên 👍)

---

# 🥉 Phần 3 – Danh Sách Thẻ

## Level 1 – HTML

```html
<div class="tags">
    <div>html</div>
    <div>css</div>
    <div>javascript</div>
    <div>web design</div>
    <div>responsive</div>
    <div>frontend</div>
    <div>backend</div>
    <div>fullstack</div>
    <div>astro</div>
    <div>nodejs</div>
</div>
```

Giải thích dễ hiểu:

- `tags` = khu vực chứa nhiều thẻ nhỏ
- Mỗi `<div>` = 1 cái thẻ 🏷️

---

## Level 2 – CSS (Sắp xếp)

```css
.tag-list .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
```

Giải thích:

- `display: flex` → xếp ngang
- `wrap` → chật thì xuống dòng
- `gap: 10px` → khoảng cách giữa thẻ

👉 Giống xếp sticker lên bàn.

---

## Level 3 – Trang trí thẻ

```css
.tag-list .tags div {
    padding: 5px 10px;
    background-color: #01bacf;
    color: #fff;
    cursor: pointer;
}
```

Giải thích:

- `padding` → làm thẻ to ra
- `background-color` → màu nền
- `color` → màu chữ
- `cursor: pointer` → rê chuột thành bàn tay

👉 Giống nút bấm mini.

---

# 🏅 Phần 4 – Hover (Hiệu Ứng)

## Level 1 – HTML

Không cần thêm gì.

---

## Level 2 – CSS

```css
.tag-list .tags div:hover {
    background-color: #9be75c;
}
```

---

## Level 3 – Trang trí

Hiệu ứng:

- Rê chuột → đổi màu
- Tạo cảm giác “bấm được”

👉 Giống nút game khi chạm vào sáng lên 🎮

---

# 🧠 Ghép Lại Hoàn Chỉnh

Quy trình:

1. Tạo hộp chứa
2. Thêm tiêu đề
3. Thêm danh sách thẻ
4. Xếp ngang bằng Flex
5. Tô màu
6. Thêm hover

---

# 🎯 Kiến Thức Học Được

Sau UI này, học sinh hiểu:

- HTML chia khối
- class để gọi CSS
- Flexbox cơ bản
- Wrap xuống dòng
- Padding làm to UI
- Hover effect

---

## 🎉 Tham khảo code

<details>
    <summary>Xem code</summary>

```html
<!-- index.html -->
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Tiêu đề trang web</title>
        <link rel="stylesheet" href="main.css" />
    </head>

    <body>
        <section class="tag-list">
            <h2 class="title">Các Thẻ</h2>
            <div class="tags">
                <div>html</div>
                <div>css</div>
                <div>javascript</div>
                <div>web design</div>
                <div>responsive</div>
                <div>frontend</div>
                <div>backend</div>
                <div>fullstack</div>
                <div>astro</div>
                <div>nodejs</div>
            </div>
        </section>
    </body>
</html>
```

```css
/* main.css */
.tag-list {
    max-width: 100%;
    width: 350px;
    margin: 0 auto;

    /* border: 1px solid #ccc; */
}

.tag-list .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tag-list .tags div {
    /* border: 1px solid #ccc; */
    padding: 5px 10px;
    background-color: #01bacf;
    color: #fff;
    cursor: pointer;
}

.tag-list .tags div:hover {
    background-color: #9be75c;
}
```

</details>

---
layout: '../../layouts/BlogPostLayout.astro'
title: '📘 Website được tạo ra như thế nào?'
date: 2026-01-13
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_2026_01/kh-web-2026-01-website-duoc-tao-ra-nhu-the-nao.avif',
        alt: '📘 Website được tạo ra như thế nào?',
    }
description: Từ vài dòng chữ ✍️, hình ảnh 🖼️ và một chút “phép thuật” 💫 của HTML & CSS, cả thế giới web đã ra đời! Cùng khám phá hành trình biến ý tưởng 💡 thành một website sống động nhé 🚀💻
draft: false
category: KH_WEB_2026_01
---

## 🌍 Website là gì?

👉 Website là **một trang hiển thị trên trình duyệt** (Chrome, Edge, Safari…)

Trình duyệt sẽ:

- Đọc **HTML** → hiểu cấu trúc
- Đọc **CSS** → hiểu cách hiển thị
- Rồi vẽ ra màn hình cho người dùng xem

---

## 🧱 Website được tạo từ mấy phần?

Một website cơ bản gồm **3 phần chính**:

```
HTML  → Khung xương
CSS   → Quần áo
Browser → Người vẽ ra màn hình
```

👉 Trong khóa này, chúng ta tập trung vào **HTML & CSS**.

---

## 🧩 HTML dùng để làm gì?

HTML trả lời câu hỏi:

> “Đây là cái gì?”

Ví dụ:

- Đây là **tiêu đề**
- Đây là **đoạn chữ**
- Đây là **hình ảnh**
- Đây là **nút bấm**

HTML **không làm đẹp**, chỉ nói cho trình duyệt biết:

> “Phần này là gì”

---

## 🎨 CSS dùng để làm gì?

CSS trả lời câu hỏi:

> “Nó trông như thế nào?”

Ví dụ:

- Chữ to hay nhỏ?
- Màu gì?
- Nằm bên trái hay ở giữa?

👉 **HTML + CSS = website hoàn chỉnh**

---

## 🧱 Khung HTML cơ bản (Boilerplate)

Mọi website HTML đều bắt đầu từ **một khung cơ bản**:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <!-- Nội dung website nằm ở đây -->
    </body>
</html>
```

---

### Giải thích ngắn gọn từng phần

- `<!DOCTYPE html>`
  → Báo cho trình duyệt biết: **đây là HTML hiện đại**

- `<head>`
  → Nơi chứa **thông tin cho trình duyệt**
  (không hiển thị ra màn hình)

- `<body>`
  → Nơi chứa **tất cả những gì người dùng nhìn thấy**

👉 **Tất cả UI bạn học sau này đều nằm trong `<body>`**

---

## 🎯 Trong khóa này, chúng ta học như thế nào?

Chúng ta **không học HTML & CSS rời rạc**.

Thay vào đó:

1. Nhìn một giao diện (UI)
2. Chia UI thành phần nhỏ
3. Viết HTML cho từng phần
4. Dùng CSS làm đẹp
5. Ghép lại thành website

👉 Đây là **cách frontend developer làm việc ngoài đời**

---

## 🚀 Kết thúc bài mở đầu

Từ bài sau:

- Chúng ta **bắt đầu làm UI thật**
- Không nói lý thuyết dài
- Mỗi bài đều ra **một phần của website**

> _Website không khó – chỉ là nhiều mảnh nhỏ ghép lại đúng chỗ._

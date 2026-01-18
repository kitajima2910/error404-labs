---
layout: '../../layouts/BlogPostLayout.astro'
title: '📘 Xây dựng UI - Thu Thập E-Mail'
date: 2026-01-16
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-ui-ve-thu-thap-email.avif',
        alt: '📘 Xây dựng UI - Thu Thập E-Mail',
    }
description: Bài viết hướng dẫn từng bước từ phân tích giao diện, chia bố cục, chia level học cho đến ghép UI hoàn chỉnh. Phù hợp cho người mới học frontend, học sinh – sinh viên và giáo viên dạy lập trình.
draft: false
category: KH_WEB_CB_2026_01
---

## 🧠 UI là gì? (Hiểu trước khi làm)

**UI (User Interface)** là **giao diện người dùng** – những gì ta **nhìn thấy và bấm vào** trên website/app:

- Chữ ✍️
- Nút bấm 🔘
- Ô nhập email 📩
- Màu sắc 🎨
- Khoảng cách 📐

👉 **UI giống như một bức tranh LEGO**
Muốn xây được → **phải tách từng mảnh nhỏ ra trước**

---

## 🧩 Sơ đồ học UI (Cách học CHUẨN cho người mới)

```
UI
├── Phần 1 – Level 1: HTML | Level 2: CSS | Level 3: Trang trí
├── Phần 2 – Level 1: HTML | Level 2: CSS | Level 3: Trang trí
├── Phần 3 – Level 1: HTML | Level 2: CSS | Level 3: Trang trí
└── Phần 4 – Level 1: HTML | Level 2: CSS | Level 3: Trang trí
```

📌 **Thứ tự học đúng:**

> **UI → Chia phần → Chia level → Ghép lại**

---

# 🧱 PHẦN 1: KHUNG UI (CÁI HỘP LỚN)

## 🔹 Level 1 – HTML: Tạo khung UI

HTML giống như **xây nhà bằng gạch**, chưa cần đẹp.

```html
<section class="invite"></section>
```

📌 Giải thích:

- `<section>` = **một khu vực**
- `invite` = **đặt tên để lát nữa trang trí**

👉 Lúc này UI **chưa thấy gì**, chỉ là khung vô hình.

---

## 🔹 Level 2 – CSS: Cho khung có hình dạng

```css
.invite {
    background-color: #f2f2f2;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 20px;
}
```

🧠 Hiểu đơn giản:

- `background-color` → tô màu nền
- `max-width` → không cho UI quá rộng
- `margin: 0 auto` → căn giữa
- `padding` → chừa chỗ cho nội dung thở 😄

---

## 🔹 Level 3 – Trang trí: Nhìn cho “ra UI”

➡️ Chỉ cần **màu nền + căn giữa** là đã thấy **một khối UI rõ ràng**

---

# 🧱 PHẦN 2: BIỂU TƯỢNG (ICON)

Cho icon:

- https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
- https://fontawesome.com/v4/icons/

## 🔹 Level 1 – HTML: Thêm icon

```html
<div class="icon">
    <i class="fa fa-envelope-o"></i>
</div>
```

📌 Giải thích:

- `<div>` = cái hộp nhỏ
- `<i>` = icon (lá thư 📩)

---

## 🔹 Level 2 – CSS: Làm icon tròn

```css
.invite .icon {
    border: 2px solid #5ac6d0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
```

🧠 Cho học sinh:

- `border-radius: 50%` → hình tròn 🎯
- `flex` → căn icon vào giữa

---

## 🔹 Level 3 – Trang trí: Tô màu icon

```css
.invite .icon i {
    color: #5ac6d0;
    font-size: 20px;
}
```

🎨 UI bắt đầu **có cảm xúc**

---

# 🧱 PHẦN 3: TIÊU ĐỀ & MÔ TẢ

## 🔹 Level 1 – HTML: Văn bản

```html
<h2 class="title">Khơi Dậy Sáng Tạo & Tư Duy</h2>
<p class="description">Vừa vẽ tranh, vừa học lập trình cơ bản qua trò chơi.</p>
```

---

## 🔹 Level 2 – CSS: Căn giữa & làm rõ chữ

```css
.invite .title {
    text-align: center;
}

.invite .description {
    text-align: center;
    font-weight: 600;
}
```

📌 Giải thích:

- `text-align: center` → chữ ra giữa
- `font-weight: 600` → chữ đậm vừa

---

## 🔹 Level 3 – Trang trí: Tạo cảm giác “giáo dục – thân thiện”

➡️ Chữ **không quá to – không quá nhỏ**

➡️ Dễ đọc cho trẻ em

---

# 🧱 PHẦN 4: FORM NHẬP EMAIL

## 🔹 Level 1 – HTML: Form

```html
<form>
    <input type="text" placeholder="Nhập email" />
    <button>Nhận Tư Vấn</button>
</form>
```

📌 Giải thích:

- `input` → ô gõ chữ ✍️
- `button` → nút bấm 🔘

---

## 🔹 Level 2 – CSS: Xếp dọc, căn giữa

```css
.invite form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
}
```

---

## 🔹 Level 3 – Trang trí: Làm nút đẹp

```css
.invite form input {
    width: 100%;
    max-width: 30%;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

.invite form button {
    padding: 10px;
    border-radius: 5px;
    background-color: #5ac6d0;
    border: none;
    color: #fff;
}
```

🎉 **Lúc này UI đã hoàn chỉnh**

---

# 🧠 TỔNG KẾT – TƯ DUY UI CHUẨN CHO NGƯỜI MỚI

✅ **Không học lan man**

✅ **Không copy mù**

✅ **Hiểu từng khối**

📌 Công thức nhớ mãi:

> **UI → Chia phần → Mỗi phần 3 level → Ghép lại**

---

## 📝 Tham khảo code

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
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
    </head>

    <body>
        <section class="invite">
            <div class="icon">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </div>
            <h2 class="title">Khơi Dậy Sáng Tạo & Tư Duy</h2>
            <p class="description">
                Vừa vẽ tranh, vừa học lập trình cơ bản qua trò chơi và hoạt động
                sáng tạo mỗi ngày.
            </p>
            <form action="" method="get">
                <input type="text" placeholder="Nhập email" />
                <button>Nhận Tư Vấn</button>
            </form>
        </section>
    </body>
</html>
```

```css
/* main.css */
.invite {
    background-color: #f2f2f2;
    /* border: 1px solid #000; */

    width: 100%;
    max-width: 1024px;

    margin: 0 auto;

    padding: 20px;
}

.invite .icon {
    border: 2px solid #5ac6d0;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 auto;
}

.invite .icon i {
    color: #5ac6d0;
    font-size: 20px;
}

.invite .title {
    text-align: center;
}

.invite .description {
    text-align: center;
    font-weight: 600;
}

.invite form {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    gap: 30px;
}

.invite form input {
    width: 100%;
    max-width: 30%;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

.invite form button {
    padding: 10px;
    border-radius: 5px;
    background-color: #5ac6d0;
    border: none;
    color: #fff;
}
```

</details>

---
layout: '../../layouts/BlogPostLayout.astro'
title: '💻 Xây dựng UI - Analytic'
date: 2026-02-02
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-analytic.avif',
        alt: '💻 Xây dựng UI - Analytic',
    }
description: 🎨💻 Từ những dòng code đầu tiên đến UI xịn xò. Học HTML & CSS thật nhẹ nhàng, chia nhỏ từng bước, ai cũng làm được ✨ Không cần biết trước – chỉ cần thích vẽ & thích khám phá 🚀🧩🎮 Code không khô – UI không khó. Xây giao diện bằng HTML & CSS theo cách dễ hiểu nhất 🌱 Học như chơi, chơi mà học 😄
draft: false
category: KH_WEB_CB_2026_01
---

## 🧩 UI LÀ GÌ?

**UI (User Interface)** là **giao diện người dùng**

👉 Những gì **mắt chúng ta nhìn thấy** trên màn hình:

- Chữ
- Hình ảnh
- Icon
- Nút bấm
- Màu sắc

Trong bài này, UI của chúng ta là **một thanh gồm 4 ô thống kê**.

---

## 🗺️ SƠ ĐỒ HỌC

Chúng ta học theo thứ tự:

```
UI
├── Phần 1
│   ├── Level 1: HTML
│   ├── Level 2: CSS
│   └── Level 3: Trang trí
├── Phần 2
├── Phần 3
└── Phần 4
```

👉 Mỗi **phần** là **1 ô thống kê**

👉 Mỗi ô đều có **icon + số + chữ**

- Font Awesome: <a href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css</a>
- Icons: <a href="https://fontawesome.com/v4/icons/">https://fontawesome.com/v4/icons/</a>

---

# 🔷 PHẦN 1 – TÁC PHẨM & PROJECT VẼ

---

## ✅ Level 1 – HTML (Xây khung)

HTML giống như **xây nhà** 🧱
Chúng ta chỉ quan tâm:

- Có mấy phòng?
- Trong phòng có gì?

### 📌 Code HTML

```html
<div class="content">
    <i class="fa fa-paint-brush"></i>
    <p class="number">1,248</p>
    <p class="text">Tác phẩm & Project Vẽ</p>
</div>
```

### 🧠 Giải thích:

- `<div class="content">` → 1 ô UI
- `<i>` → icon cây cọ (vẽ)
- `<p class="number">` → con số lớn
- `<p class="text">` → chữ mô tả

👉 **Chưa đẹp cũng không sao**, vì mới là Level 1.

---

## 🎨 Level 2 – CSS (Sắp xếp)

CSS giống như **dọn đồ trong phòng** 🪑

```css
.analytic .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    max-width: 150px;
    padding: 0 50px;
}
```

### 🧠 Hiểu đơn giản:

- `flex-direction: column` → xếp **icon → số → chữ**
- `align-items: center` → căn giữa
- `text-align: center` → chữ ở giữa

---

## ✨ Level 3 – Trang trí (Làm đẹp)

```css
.analytic .content i,
.analytic .content p.number,
.analytic .content p.text {
    color: #fff;
}

.analytic .content i,
.analytic .content p.number {
    font-size: xx-large;
    font-weight: bolder;
}
```

👉 Icon + số **to và nổi bật**

👉 Chữ màu trắng để nổi trên nền ảnh

---

# 🔷 PHẦN 2 – DÒNG CODE ĐÃ VIẾT

---

## Level 1 – HTML

```html
<div class="content">
    <i class="fa fa-code"></i>
    <p class="number">2,936</p>
    <p class="text">Dòng Code Đã Viết</p>
</div>
```

🧠 Chỉ đổi:

- Icon → `fa-code`
- Nội dung chữ & số

👉 **Cấu trúc y chang phần 1**

---

## Level 2 – CSS

👉 Không cần viết thêm CSS mới

👉 Dùng lại CSS cũ → **tiết kiệm công sức**

---

## Level 3 – Trang trí

👉 Vì tất cả dùng chung class `.content`

👉 Giao diện tự động **đồng bộ & đẹp đều**

---

# 🔷 PHẦN 3 – GAME & MINI PROJECT

---

## Level 1 – HTML

```html
<div class="content">
    <i class="fa fa-gamepad"></i>
    <p class="number">1,572</p>
    <p class="text">Game & Mini Project</p>
</div>
```

🧠 Icon tay cầm chơi game → nhìn là hiểu liền 🎮

---

## Level 2 – CSS

👉 Không cần sửa

👉 Flexbox tự canh đều 4 ô

---

## Level 3 – Trang trí

👉 Font to – icon rõ – chữ dễ đọc

👉 Phù hợp cả **trẻ em & người mới học**

---

# 🔷 PHẦN 4 – HỌC VIÊN & DEV ĐỒNG HÀNH

---

## Level 1 – HTML

```html
<div class="content">
    <i class="fa fa-users"></i>
    <p class="number">412</p>
    <p class="text">Học Viên & Dev Đồng Hành</p>
</div>
```

🧠 Icon nhiều người → biểu tượng cộng đồng 👥

---

## Level 2 – CSS

👉 Vẫn dùng chung layout

👉 Không rối – không phức tạp

---

## Level 3 – Trang trí

👉 Số nhỏ hơn nhưng vẫn nổi bật

👉 Tạo cảm giác **đáng tin & chuyên nghiệp**

---

# 🧩 GHÉP LẠI THÀNH UI HOÀN CHỈNH

---

## HTML tổng

```html
<section class="analytic">
    <!-- 4 content ở đây -->
</section>
```

## CSS tổng

Tải ảnh: <a href="/bg_analytic.avif" download>bg_analytic.avif</a>

```css
.analytic {
    max-width: 1024px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    background-image: url('bg_analytic.avif');
    background-repeat: no-repeat;
    padding: 30px 0;
}
```

🧠 Hiểu đơn giản:

- `display: flex` → xếp ngang
- `space-between` → giãn đều
- `background-image` → làm UI đẹp hơn

---

# 🎯 TỔNG KẾT CHO NGƯỜI MỚI

Sau bài này, bạn đã biết:

✅ UI là gì

✅ Cách **chia UI thành từng phần nhỏ**

✅ HTML để xây khung

✅ CSS để sắp xếp & trang trí

✅ Dùng **Font Awesome 4.7** để thêm icon

✅ Làm được **UI giống website thật**

---

## 🚀 Tham khảo code

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
        <section class="analytic">
            <div class="content">
                <i class="fa fa-paint-brush"></i>
                <p class="number">1,248</p>
                <p class="text">Tác phẩm & Project Vẽ</p>
            </div>
            <div class="content">
                <i class="fa fa-code"></i>
                <p class="number">2,936</p>
                <p class="text">Dòng Code Đã Viết</p>
            </div>
            <div class="content">
                <i class="fa fa-gamepad"></i>
                <p class="number">1,572</p>
                <p class="text">Game & Mini Project</p>
            </div>
            <div class="content">
                <i class="fa fa-users"></i>
                <p class="number">412</p>
                <p class="text">Học Viên & Dev Đồng Hành</p>
            </div>
        </section>
    </body>
</html>
```

```css
/* main.css */
.analytic {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    /* border: 1px solid #000; */
}

.analytic {
    background-image: url('bg_analytic.avif');
    background-position: left top;
    background-repeat: no-repeat;
    padding: 30px 0;
}

.analytic .content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 150px;
    text-align: center;
    padding: 0 50px;
}

.analytic .content i,
.analytic .content p.number,
.analytic .content p.text {
    color: #fff;
}

.analytic .content i,
.analytic .content p.number {
    font-size: xx-large;
    font-weight: bolder;
}

.analytic .content p {
    margin: 0;
    padding: 10px 0;
}
```

</details>

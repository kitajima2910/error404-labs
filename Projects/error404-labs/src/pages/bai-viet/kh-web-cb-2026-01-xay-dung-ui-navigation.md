---
layout: '../../layouts/BlogPostLayout.astro'
title: '🌈 Xây dựng UI – Navigation 🧭✨'
date: 2026-02-11
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-navigation.avif',
        alt: '🌈 Xây dựng UI – Navigation 🧭✨',
    }
description: Thanh Navigation giống như một tấm bản đồ nhỏ 🗺️ nằm trên đầu website. Biết mình đang ở đâu 📍 Đi tới trang khác 🚀 Đăng nhập tài khoản 🔐 Giống như menu trong game 🎮 hoặc bảng chọn trong lớp học 🏫 vậy đó. Nếu website không có Navigation… Người dùng sẽ bị lạc đường luôn 😵‍💫
draft: false
category: KH_WEB_CB_2026_01
---

## 🧭 Sơ đồ học UI

```
UI – Thanh Menu Website
 ├── Phần 1 – Khung Menu Tổng
 │     ├── Level 1: HTML
 │     ├── Level 2: CSS
 │     └── Level 3: Trang trí
 │
 ├── Phần 2 – Logo
 │     ├── Level 1: HTML
 │     ├── Level 2: CSS
 │     └── Level 3: Trang trí
 │
 ├── Phần 3 – Menu Chữ
 │     ├── Level 1: HTML
 │     ├── Level 2: CSS
 │     └── Level 3: Trang trí
 │
 └── Phần 4 – Nút Đăng Nhập + Icon
       ├── Level 1: HTML
       ├── Level 2: CSS
       └── Level 3: Trang trí
```

---

# 🧱 PHẦN 1 — KHUNG MENU TỔNG

---

## 🥚 Level 1 — HTML

```html
<section class="navigation"></section>
```

Đây là **hộp lớn nhất** chứa toàn bộ thanh menu.

Hiểu đơn giản:

👉 Giống cái **bàn dài** để đặt:

- Logo
- Menu chữ
- Nút đăng nhập

---

## 🎨 Level 2 — CSS

```css
.navigation {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
```

Giải thích dễ hiểu:

| Thuộc tính    | Ý nghĩa            |
| ------------- | ------------------ |
| width 100%    | Rộng hết màn hình  |
| max-width     | Không quá 1024px   |
| margin auto   | Canh giữa          |
| flex          | Xếp ngang          |
| space-between | Dãn cách đều       |
| align-center  | Canh giữa dọc      |
| wrap          | Hết chỗ xuống dòng |

---

## ✨ Level 3 — Trang trí

Chưa cần trang trí, có thể tạo khung border để căn chỉnh

```css
/* border: 1px solid #ccc; */
```

---

# 🖼️ PHẦN 2 — LOGO

---

## 🥚 Level 1 — HTML

```html
<img src="https://placehold.co/190x50" alt="Logo" />
```

Đây là hình logo website.

Hiểu như:

👉 Bảng hiệu cửa hàng 🏪

---

## 🎨 Level 2 — CSS

```css
.navigation img {
    width: 190px;
    height: 50px;
    aspect-ratio: 19 / 5;
    object-fit: cover;
}
```

Ý nghĩa:

- Luôn giữ size 190×50
- Không bị méo hình

---

## ✨ Level 3 — Trang trí

Logo đang để **vuông góc** — chưa bo góc, chưa đổ bóng.

---

# 📚 PHẦN 3 — MENU CHỮ

---

## 🥚 Level 1 — HTML

```html
<div class="menus">
    <div class="active">Trang Chủ</div>
    <div>Khóa Học</div>
    <div>Dự Án</div>
    <div>Tài Nguyên</div>
    <div>Đánh Giá</div>
    <div>Liên Hệ</div>
</div>
```

Đây là các **nút chuyển trang**.

Giống menu game 🎮 hoặc menu app 📱

---

## 🎨 Level 2 — CSS

```css
.navigation .menus {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 30px;
    width: 100%;
    padding-left: 50px;
    flex: 1;
    flex-wrap: wrap;
}
```

Giải thích:

| Thuộc tính   | Dễ hiểu            |
| ------------ | ------------------ |
| flex         | Xếp ngang          |
| gap          | Khoảng cách chữ    |
| padding-left | Thụt vào           |
| flex:1       | Chiếm khoảng trống |
| wrap         | Hết chỗ xuống dòng |

---

### Chữ không bị bể dòng

```css
white-space: nowrap;
```

Nếu không có:

```
Tài
Nguyên
```

Có rồi:

```
Tài Nguyên
```

---

## ✨ Level 3 — Trang trí

Menu đang chọn:

```css
.navigation .menus div.active {
    color: rgb(27, 179, 179);
}
```

👉 Đổi màu để biết đang ở trang nào.

---

# 🔐 PHẦN 4 — NÚT ĐĂNG NHẬP + ICON

---

## 🥚 Level 1 — HTML

```html
<button><i class="fa fa-sign-in" aria-hidden="true"></i> Đăng Nhập</button>
```

Gồm:

- Icon đăng nhập
- Chữ “Đăng Nhập”

Icon lấy từ **Font Awesome**.

---

## 🎨 Level 2 — CSS

```css
.navigation button {
    width: 140px;
    height: 35px;
    border: 1px dashed #ccc;
    background-color: transparent;
    flex: 0.2;
    cursor: pointer;
    white-space: nowrap;
}
```

Hiểu đơn giản:

| Thuộc tính  | Ý nghĩa         |
| ----------- | --------------- |
| width       | Ngang nút       |
| height      | Cao nút         |
| dashed      | Viền nét đứt    |
| transparent | Nền trong       |
| cursor      | Hover thành tay |
| nowrap      | Không bể chữ    |

---

## ✨ Level 3 — Hover

```css
.navigation button:hover {
    color: rgb(27, 179, 179);
    background-color: rgba(27, 179, 179, 0.1);
}
```

Hiệu ứng:

- Rê chuột → đổi màu
- Có nền nhẹ

---

# 🧩 GHÉP UI LẠI

Khi ghép tất cả:

```
[ Logo ] [ Menu Menu Menu ] [ Đăng Nhập ]
```

Thanh này gọi là:

👉 **Navigation Bar** (Thanh điều hướng)

Dùng để:

- Đi trang
- Xem nội dung
- Đăng nhập

---

## 🌈 Tham khảo code

<details>
    <summary>Xem code</summary>

```html
<!-- index.html -->
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Tiêu đề trang web</title>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="stylesheet" href="main.css" />
    </head>

    <body>
        <section class="navigation">
            <img src="https://placehold.co/190x50" alt="Logo" />
            <div class="menus">
                <div class="active">Trang Chủ</div>
                <div>Khóa Học</div>
                <div>Dự Án</div>
                <div>Tài Nguyên</div>
                <div>Đánh Giá</div>
                <div>Liên Hệ</div>
            </div>
            <button>
                <i class="fa fa-sign-in" aria-hidden="true"></i> Đăng Nhập
            </button>
        </section>
    </body>
</html>
```

```css
/* main.css */
.navigation {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    /* border: 1px solid #ccc; */
}

.navigation img {
    width: 190px;
    height: 50px;
    aspect-ratio: 19 / 5;
    object-fit: cover;
}

.navigation .menus {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 30px;
    width: 100%;
    padding-left: 50px;
    flex: 1;

    flex-wrap: wrap;
}

.navigation .menus div {
    cursor: pointer;
    white-space: nowrap;
}

.navigation .menus div.active {
    color: rgb(27, 179, 179);
}

.navigation button {
    width: 140px;
    height: 35px;
    border: 1px dashed #ccc;
    background-color: transparent;
    flex: 0.2;
    cursor: pointer;
    white-space: nowrap;
}

.navigation button:hover {
    color: rgb(27, 179, 179);
    background-color: rgba(27, 179, 179, 0.1);
}
```

</details>

---
layout: '../../layouts/BlogPostLayout.astro'
title: '🎨 Xây dựng UI - Hero'
date: 2026-01-14
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-hero-section-xay-giao-dien-tu-nhung-phan-nho.avif',
        alt: '🎨 Xây dựng UI - Hero',
    }
description: Trong bài này, chúng ta sẽ xây dựng Hero Section – phần mở đầu của một website. Thay vì code một giao diện lớn ngay từ đầu, ta sẽ chia nhỏ giao diện thành từng phần, hoàn thành từng phần theo level, rồi ghép lại thành một UI hoàn chỉnh.
draft: false
category: KH_WEB_CB_2026_01
---

## 🌱 UI là gì? (Hiểu thật đơn giản)

👉 **UI (User Interface)** là **giao diện** mà người dùng nhìn thấy và bấm vào.
Ví dụ:

- Chữ trên màn hình
- Nút bấm
- Màu sắc
- Hình ảnh

👉 Khi làm UI, ta **không làm một lần cho xong**, mà **xây từng khối nhỏ**, giống như **xếp LEGO** 🧱

---

## 🧩 Cách học UI trong bài này

Chúng ta học theo **đúng thứ tự dễ hiểu nhất**:

```
UI
 ├── Phần 1
 │    ├── Level 1: HTML (xây khung)
 │    ├── Level 2: CSS (tô màu – chỉnh chữ)
 │    └── Level 3: Trang trí (đẹp hơn, vui hơn)
 ├── Phần 2
 ├── Phần 3
 └── Phần 4
```

👉 **Luôn nhớ công thức:**

> **UI → chia phần → chia level → ghép lại**

---

# 🖥️ UI CHÚNG TA ĐANG LÀM

Đây là **phần đầu trang (Hero Section)** của một website học **Vẽ & Lập Trình**.

Nó gồm:

- Nhãn nhỏ ở trên
- Tiêu đề lớn
- Mô tả
- 2 nút bấm

---

# 🧱 PHẦN 1 – KHUNG UI (HTML)

## 🎯 Mục tiêu

👉 Chỉ **xây hình dạng**, **chưa cần đẹp**

---

## 🔹 Level 1 – HTML (Xây khung)

```html
<section class="hero">
    <div class="banner">
        <p class="text">VẼ & LẬP TRÌNH</p>
    </div>

    <h2 class="title">
        Nền Tảng <span>Học Vẽ & Lập Trình</span> Cho Mọi Người
    </h2>

    <p class="description">
        Học vẽ – học code – rèn tư duy sáng tạo qua các dự án thú vị
    </p>

    <div class="group-button">
        <button class="btn-1">Bắt Đầu Học Ngay</button>
        <button class="btn-1">Xem Nội Dung Khóa Học</button>
    </div>
</section>
```

### 🧠 Giải thích

- `<section>` → 1 **khu vực lớn**
- `<div>` → 1 **hộp**
- `<h2>` → chữ **to**
- `<p>` → chữ **thường**
- `<button>` → **nút bấm**

👉 HTML giống như **vẽ khung nhà bằng bút chì**

---

## 🔹 Level 2 – CSS (Chỉnh vị trí & chữ)

```css
.hero {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
}
```

👉 Giải thích:

- `max-width` → không cho UI quá rộng
- `margin: 0 auto` → căn giữa màn hình

---

```css
.hero .title {
    text-align: center;
    font-size: 30px;
}

.hero .description {
    text-align: center;
    font-weight: 600;
}
```

👉 Chữ:

- **ở giữa**
- **to hơn**
- **đậm hơn**

---

## 🔹 Level 3 – Trang trí (Đẹp hơn 🎨)

```css
.hero .title span {
    color: #00aeef;
}
```

👉 Tô màu chữ quan trọng ✨

---

# 🏷️ PHẦN 2 – BANNER NHỎ (HTML → CSS → TRANG TRÍ)

## 🔹 Level 1 – HTML

```html
<div class="banner">
    <p class="text">VẼ & LẬP TRÌNH</p>
</div>
```

👉 Đây là **nhãn nhỏ** để gây chú ý

---

## 🔹 Level 2 – CSS (Tạo hình chữ nhật)

```css
.hero .banner {
    width: 190px;
    height: 50px;
    background-color: #8598cc;
    margin: 0 auto;
}
```

👉 Ta tạo **1 cái hộp màu**

---

## 🔹 Level 3 – Trang trí (Căn chữ giữa)

```css
.hero .banner {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero .banner .text {
    color: white;
}
```

👉 Chữ nằm **chính giữa hộp**

👉 Nhìn gọn gàng, rõ ràng ✅

---

# 🔘 PHẦN 3 – NÚT BẤM (BUTTON)

## 🔹 Level 1 – HTML

```html
<div class="group-button">
    <button class="btn-1">Bắt Đầu Học Ngay</button>
    <button class="btn-1">Xem Nội Dung Khóa Học</button>
</div>
```

👉 Có **2 nút**

---

## 🔹 Level 2 – CSS (Tạo hình nút)

```css
.hero .group-button .btn-1 {
    background-color: black;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
}
```

👉 Nút:

- Có màu
- Bo tròn
- Dễ bấm 👍

---

## 🔹 Level 3 – Trang trí (Hiệu ứng hover ✨)

```css
.hero .group-button .btn-1:hover {
    background-color: #00aeef;
}
```

👉 Khi rê chuột:

- Nút **đổi màu**
- Nhìn **xịn hơn web bình thường**

---

# 🧠 PHẦN 4 – GHÉP LẠI THÀNH UI HOÀN CHỈNH

👉 Khi ghép lại, ta có:

- HTML → **xương**
- CSS → **da**
- Trang trí → **quần áo + cảm xúc**

💡 **UI đẹp không phải vì code khó
mà vì biết chia nhỏ và làm đúng thứ tự**

---

## 🎯 TỔNG KẾT CHO NGƯỜI MỚI

✅ Luôn nhớ:

1. **UI lớn**
2. → **Chia phần**
3. → **HTML trước**
4. → **CSS sau**
5. → **Trang trí cuối**

🎁 Sau bài này, bạn đã:

- Hiểu UI là gì
- Biết đọc HTML & CSS
- Biết làm 1 phần giao diện thật sự

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
        <section class="hero">
            <div class="banner">
                <p class="text">VẼ & LẬP TRÌNH</p>
            </div>
            <h2 class="title">
                Nền Tảng <span>Học Vẽ & Lập Trình</span> Cho Mọi Người
            </h2>
            <p class="description">
                Học vẽ – học code – rèn tư duy sáng tạo qua các dự án thú vị và
                bài học dễ hiểu
            </p>
            <div class="group-button">
                <button class="btn-1">Bắt Đầu Học Ngay</button>
                <button class="btn-1">Xem Nội Dung Khóa Học</button>
            </div>
        </section>
    </body>
</html>
```

```css
/* main.css */
.hero {
    width: 100%;
    max-width: 1024px;

    /* border: 1px solid #000; */

    margin: 0 auto;
}

.hero .banner {
    width: 190px;
    height: 50px;
    background-color: #8598cc;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 auto;
}

.hero .banner .text {
    color: #fff;
}

.hero .title {
    text-align: center;
    font-size: 30px;
}

.hero .title span {
    color: #00aeef;
}

.hero .description {
    text-align: center;
    font-weight: 600;
    padding-bottom: 10px;
}

.hero .group-button .btn-1,
.hero .group-button .btn-2 {
    background-color: black;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.hero .group-button {
    text-align: center;
}

.hero .group-button .btn-1,
.hero .group-button .btn-2 {
    margin: 10px;
}

.hero .group-button .btn-1:hover,
.hero .group-button .btn-2:hover {
    background-color: #00aeef;
}
```

</details>

---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧩 Xây dựng UI - Card Grid'
date: 2026-01-23
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-card-grid.avif',
        alt: '🧩 Xây dựng UI - Card Grid',
    }
description: 💡 Học cách chia giao diện thành từng phần nhỏ 🧩 Ghép HTML + CSS để tạo UI hoàn chỉnh 🚀 Không cần biết gì, học từ con số 0 Rèn logic qua từng khối giao diện 🧩 Từng bước xây dựng UI từ HTML đến CSS ✨ Phù hợp cho người mới bắt đầu
draft: false
category: KH_WEB_CB_2026_01
---

👉 Mục tiêu bài học:

- Biết **UI là gì**
- Biết chia **UI thành các phần nhỏ**
- Biết mỗi phần có **HTML – CSS – Trang trí**
- Biết **ghép tất cả lại thành 1 giao diện hoàn chỉnh**

---

## 🧠 UI là gì? (Nói cho dễ hiểu)

**UI (User Interface)** là **những gì mắt mình nhìn thấy trên màn hình**:

- Tiêu đề
- Hình ảnh
- Nút bấm
- Khung, hàng, cột

👉 Là “khuôn mặt” của website.

---

# 🧱 UI này gồm mấy phần?

Nhìn UI của chúng ta, ta chia thành **4 phần chính**:

```
UI
 ├── Phần 1: Khung ngoài (section)
 ├── Phần 2: Tiêu đề có gạch ngang
 ├── Phần 3: Khu vực chứa các thẻ (card)
 └── Phần 4: Hình ảnh trong mỗi card
```

👉 Bây giờ ta học **từng phần**, mỗi phần đều có **3 level**.

---

# 📦 PHẦN 1 – KHUNG NGOÀI (SECTION)

## 🔹 Level 1 – HTML (Khung xương)

```html
<section class="card-grid"></section>
```

👉 Giải thích:

- `<section>`: 1 khu vực lớn
- `card-grid`: đặt tên để lát nữa CSS điều khiển

---

## 🔹 Level 2 – CSS (Sắp xếp)

```css
.card-grid {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
}
```

👉 Hiểu đơn giản:

- `width: 100%` → chiếm toàn chiều ngang
- `max-width: 1024px` → không quá to
- `margin: 0 auto` → **tự căn giữa**

---

## 🔹 Level 3 – Trang trí

👉 Chưa trang trí gì, vì đây là **khung nền**.

---

# 🏷️ PHẦN 2 – TIÊU ĐỀ + GẠCH NGANG

## 🔹 Level 1 – HTML

```html
<h2 class="title">
    <span class="hr"></span>
    <span>Tư Duy Logic & Sáng Tạo</span>
    <span class="hr"></span>
</h2>
```

👉 Giải thích:

- `h2`: tiêu đề
- `span`: từng miếng nhỏ
- 2 span rỗng → dùng làm gạch ngang

---

## 🔹 Level 2 – CSS (Căn hàng)

```css
.card-grid .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
}
```

👉 Dễ hiểu:

- `flex` → xếp **trên 1 hàng**
- `space-between` → tách đều hai bên
- `align-items: center` → căn giữa theo chiều dọc

---

## 🔹 Level 3 – Trang trí

```css
.card-grid .title .hr {
    width: 30%;
    height: 1px;
    background-color: #ccc;
}
```

👉 Tạo **đường kẻ mảnh hai bên tiêu đề**

---

# 🧩 PHẦN 3 – KHU VỰC CARD (GRID)

## 🔹 Level 1 – HTML

```html
<div class="card">
    <img src="https://placehold.co/215x130" />
    <img src="https://placehold.co/215x130" />
    <img src="https://placehold.co/215x130" />
    <img src="https://placehold.co/215x130" />
</div>
```

👉 Mỗi ảnh = 1 card đơn giản.

---

## 🔹 Level 2 – CSS (GRID – phần quan trọng nhất)

```css
.card-grid .card {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
    gap: 15px;
}
```

👉 Giải thích kiểu học sinh:

- `grid` → xếp theo **hàng & cột**
- `215px` → kích thước chuẩn
- `1fr` → **tự co giãn**
- Màn hình to → nhiều cột
- Màn hình nhỏ → ít cột
- ❌ Không bị scroll ngang

---

## 🔹 Level 3 – Trang trí

👉 Khoảng cách đều, nhìn gọn gàng.

---

# 🖼️ PHẦN 4 – HÌNH ẢNH

## 🔹 Level 1 – HTML

👉 Chỉ là thẻ `<img>`

---

## 🔹 Level 2 – CSS (Giữ tỉ lệ)

```css
.card-grid .card img {
    width: 100%;
    aspect-ratio: 215 / 130;
}
```

👉 Hiểu đơn giản:

- `width: 100%` → ảnh full ô
- `aspect-ratio` → **ảnh không méo**

---

## 🔹 Level 3 – Trang trí (tuỳ chọn)

Sau này có thể thêm:

- bo góc
- bóng đổ
- hover

---

# 🧠 GHÉP LẠI → UI HOÀN CHỈNH

👉 Ta đã:

1. Có **khung UI**
2. Có **tiêu đề đẹp**
3. Có **grid thông minh**
4. Có **ảnh không méo**

🎉 → Đây là **UI CARD GRID chuẩn**, dùng được cho:

- học vẽ
- học lập trình
- gallery
- khóa học
- website cá nhân

---

## 👉 Tham khảo code

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
        <section class="card-grid">
            <h2 class="title">
                <span class="hr"></span>
                <span>Tư Duy Logic & Sáng Tạo</span>
                <span class="hr"></span>
            </h2>
            <div class="card">
                <img src="https://placehold.co/215x130" alt="Ảnh Đẹp 1" />
                <img src="https://placehold.co/215x130" alt="Ảnh Đẹp 2" />
                <img src="https://placehold.co/215x130" alt="Ảnh Đẹp 3" />
                <img src="https://placehold.co/215x130" alt="Ảnh Đẹp 4" />
            </div>
        </section>
    </body>
</html>
```

```css
/* main.css */
.card-grid {
    width: 100%;
    max-width: 1024px;

    /* border: 1px solid #000; */

    margin: 0 auto;
}
.card-grid .card {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
    gap: 15px;
}
.card-grid .card img {
    width: 100%;
    aspect-ratio: 215 / 130;
}
.card-grid .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
}
.card-grid .title .hr {
    display: block;
    width: 30%;
    height: 1px;
    background-color: #ccc;
}
```

</details>

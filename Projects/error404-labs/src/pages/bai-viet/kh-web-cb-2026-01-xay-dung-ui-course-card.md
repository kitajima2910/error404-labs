---
layout: '../../layouts/BlogPostLayout.astro'
title: '🎨 Xây dựng UI – Course Card'
date: 2026-01-27
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-course-card.avif',
        alt: '🎨 Xây dựng UI – Course Card',
    }
description: 🌈 Học bằng sáng tạo 🧠 Nghĩ bằng logic ✨ Lớn lên cùng công nghệ 🎨 Vẽ vui mỗi ngày 💻 Code từng bước thật dễ hiểu 🧩 Xây dựng UI – Course Card
draft: false
category: KH_WEB_CB_2026_01
---

👉 **Mục tiêu bài học:**

* Biết **UI là gì**
* Biết chia **UI thành các phần nhỏ**
* Biết mỗi phần gồm **HTML – CSS – Trang trí**
* Biết **ghép các phần lại thành 1 UI Course Card hoàn chỉnh**
* Biết cách trình bày **lộ trình học bằng giao diện**

---

## 🧠 UI là gì? (Nói cho dễ hiểu)

**UI (User Interface)** là **những gì mắt mình nhìn thấy trên màn hình**:

* Dòng chữ
* Hình ảnh
* Các khối (card)
* Cách mọi thứ được xếp hàng, căn giữa

👉 UI chính là **“khuôn mặt” của website**

👉 Website đẹp hay không, **UI quyết định rất nhiều**

---

# 🧱 UI COURSE CARD GỒM MẤY PHẦN?

Nhìn UI Course Card của chúng ta, ta chia thành **4 phần chính**:

```
UI – Course Card
 ├── Phần 1: Khung ngoài (cards-grid)
 ├── Phần 2: Dòng mô tả (description)
 ├── Phần 3: Khu vực chứa các card (cards)
 └── Phần 4: Nội dung trong mỗi card (icon + tiêu đề)
```

👉 Bây giờ ta học **từng phần**,

👉 Mỗi phần đều có **3 level: HTML – CSS – Trang trí**

---

# 📦 PHẦN 1 – KHUNG NGOÀI (CARDS-GRID)

## 🔹 Level 1 – HTML (Khung xương)

```html
<section class="cards-grid"></section>
```

👉 Giải thích:

* `<section>`: một khu vực lớn
* `cards-grid`: đặt tên để CSS điều khiển

👉 Đây là **khung bao toàn bộ UI**

---

## 🔹 Level 2 – CSS (Sắp xếp)

```css
.cards-grid {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
}
```

👉 Hiểu đơn giản:

* `width: 100%` → chiếm toàn chiều ngang
* `max-width: 1024px` → không quá rộng
* `margin: 0 auto` → **tự căn giữa màn hình**

---

## 🔹 Level 3 – Trang trí

👉 Phần này **chưa cần trang trí**,

vì nó chỉ là **khung nền chứa nội dung**.

---

# 📝 PHẦN 2 – DÒNG MÔ TẢ (DESCRIPTION)

## 🔹 Level 1 – HTML

```html
<h2 class="description">
    Học vẽ để nuôi dưỡng sáng tạo và học lập trình để rèn luyện tư duy logic và giải quyết vấn đề
</h2>
```

👉 Đây là **thông điệp chính của khóa học**

---

## 🔹 Level 2 – CSS (Căn giữa & giới hạn độ rộng)

```css
.cards-grid .description {
    text-align: center;
    color: #837e7e;
    max-width: 720px;
    margin: 20px auto;
    padding-bottom: 40px;
}
```

👉 Giải thích:

* `text-align: center` → chữ nằm giữa
* `max-width: 720px` → chữ không quá dài
* `margin: auto` → căn giữa
* `padding-bottom` → tạo khoảng trống phía dưới

---

## 🔹 Level 3 – Trang trí

👉 Màu chữ xám nhẹ

👉 Khoảng cách thoáng

👉 Tạo cảm giác **giáo dục – nhẹ nhàng – dễ đọc**

---

# 🧩 PHẦN 3 – KHU VỰC CHỨA CARD (CARDS)

## 🔹 Level 1 – HTML

```html
<div class="cards">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
</div>
```

👉 Mỗi `card` là **1 bước học**

---

## 🔹 Level 2 – CSS (Flexbox – rất quan trọng)

```css
.cards-grid .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
```

👉 Hiểu theo cách học sinh:

* `flex` → xếp trên **một hàng**
* `space-between` → các card giãn đều
* `wrap` → màn hình nhỏ thì tự xuống hàng

👉 ❌ Không bị tràn ngang

👉 ✅ Tự thích nghi với màn hình

---

## 🔹 Level 3 – Trang trí

👉 Các card:

* Cách đều nhau
* Dễ nhìn
* Rõ ràng từng bước học

---

# 🎴 PHẦN 4 – NỘI DUNG TRONG MỖI CARD

## 🔹 Level 1 – HTML

```html
<div class="card">
    <img src="https://placehold.co/42x42" />
    <h3>Làm quen & định hướng</h3>
</div>
```

👉 Mỗi card gồm:

* 1 hình (icon)
* 1 tiêu đề ngắn

---

## 🔹 Level 2 – CSS (Căn giữa & xếp dọc)

```css
.cards-grid .cards .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 150px;
}
```

👉 Giải thích:

* `column` → xếp từ trên xuống
* `align-items: center` → căn giữa
* `gap` → khoảng cách giữa hình & chữ

---

## 🔹 Level 3 – Trang trí hình & chữ

```css
.cards-grid .cards .card img {
    width: 42px;
    aspect-ratio: 42 / 42;
    object-fit: contain;
}

.cards-grid .cards .card h3 {
    font-size: 14px;
    text-align: center;
}
```

👉 Icon **không méo**

👉 Chữ **vừa đủ đọc, không rối**

---

# 🧠 GHÉP LẠI → UI COURSE CARD HOÀN CHỈNH

👉 Chúng ta đã:

1️⃣ Có **khung UI**

2️⃣ Có **dòng mô tả rõ ràng**

3️⃣ Có **khu vực card sắp xếp thông minh**

4️⃣ Có **card gọn gàng, dễ hiểu**

🎉 → Đây là **UI Course Card chuẩn**, dùng được cho:

* Trang khóa học
* Website giáo dục
* Landing page
* Blog dạy vẽ & lập trình

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
        <section class="cards-grid">
            <h2 class="description">Học vẽ để nuôi dưỡng sáng tạo và học lập trình để rèn luyện tư duy logic và giải quyết vấn đề</h2>
            <div class="cards">
                <div class="card">
                    <img src="https://placehold.co/42x42" alt="Ảnh Đẹp 1" />
                    <h3>Làm quen & định hướng</h3>
                </div>
                <div class="card">
                    <img src="https://placehold.co/42x42" alt="Ảnh Đẹp 1" />
                    <h3>Thực hành vẽ sáng tạo code từng bước</h3>
                </div>
                <div class="card">
                    <img src="https://placehold.co/42x42" alt="Ảnh Đẹp 1" />
                    <h3>Hoàn thiện sản phẩm cá nhân</h3>
                </div>
                <div class="card">
                    <img src="https://placehold.co/42x42" alt="Ảnh Đẹp 1" />
                    <h3>Tự tin sáng tạo và phát triển lâu dài</h3>
                </div>
            </div>
        </section>
    </body>
</html>

```

```css
/* main.css */
.cards-grid {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    /* border: 1px solid #ddd; */
}

.cards-grid .description {
    text-align: center;
    color: #837e7e;
    max-width: 720px;
    letter-spacing: 0.5px;
    margin: 20px auto;
    padding-bottom: 40px;
}

.cards-grid .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.cards-grid .cards .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 150px;
}

.cards-grid .cards .card img {
    width: 42px;
    aspect-ratio: 42 / 42;
    object-fit: contain;
}

.cards-grid .cards .card h3 {
    font-size: 14px;
    text-align: center;
}
```

</details>

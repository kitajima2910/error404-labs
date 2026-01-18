---
layout: '../../layouts/BlogPostLayout.astro'
title: '🎓 Xây dựng UI - Giới Thiệu Khóa Học'
date: 2026-01-18
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-gioi-thieu-khoa-hoc.avif',
        alt: '🎓 Xây dựng UI - Giới Thiệu Khóa Học',
    }
description: Một giao diện giới thiệu khóa học, được xây dựng từng bước bằng HTML và CSS cho người mới.
draft: false
category: KH_WEB_CB_2026_01
---

## Mục tiêu bài học

Sau bài này, bạn sẽ:

- Hiểu **UI là gì**
- Biết cách **chia UI thành từng phần**
- Biết **HTML dùng để tạo khung**
- Biết **CSS dùng để làm đẹp**
- Ghép tất cả lại thành **1 giao diện hoàn chỉnh**

---

## 🧩 TỔNG QUAN UI

UI này gồm **2 phần chính**:

```
UI
├── Phần 1: Khung tổng (section)
├── Phần 2: Bên trái (hình ảnh)
├── Phần 3: Bên phải (chữ)
└── Phần 4: Nút bấm (button)
```

👉 Ta sẽ học **từng phần một**, mỗi phần có **3 level**:

```
Level 1: HTML  → Tạo hình dạng
Level 2: CSS   → Sắp xếp
Level 3: Trang trí → Đẹp hơn
```

---

# 🟦 PHẦN 1: KHUNG TỔNG UI (SECTION)

## 🎯 Phần này dùng để làm gì?

- Gom **toàn bộ UI** vào một khối
- Giúp website **gọn gàng, dễ quản lý**

---

## ✅ Level 1 – HTML (Tạo khung)

```html
<section class="intro"></section>
```

🧒 Giải thích:

- `<section>` giống như **một tờ giấy lớn**
- `class="intro"` là **tên gọi**, để lát nữa CSS biết cần trang trí ai

---

## ✅ Level 2 – CSS (Sắp xếp)

```css
.intro {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
}
```

🧠 Giải thích:

- `width: 100%` → rộng hết màn hình
- `max-width: 1024px` → không quá to
- `margin: 0 auto` → nằm **chính giữa**
- `display: flex` → cho các phần **nằm ngang**

👉 **Flex = xếp đồ chơi thành hàng**

---

## 🎨 Level 3 – Trang trí

Phần này **chưa cần màu mè**, vì đây là khung tổng.

---

# 🟩 PHẦN 2: BÊN TRÁI – HÌNH ẢNH

## 🎯 Phần này dùng để làm gì?

- Hiển thị **ảnh minh họa**
- Thu hút người xem trước tiên

---

## ✅ Level 1 – HTML

```html
<div class="left">
    <img src="https://placehold.co/300x400" alt="Ảnh Đẹp" />
</div>
```

🧒 Giải thích:

- `<div>` = hộp
- `<img>` = hình ảnh
- `src` = địa chỉ hình
- `alt` = chữ dự phòng nếu ảnh lỗi

---

## ✅ Level 2 – CSS

```css
.intro .left {
    width: 300px;
    height: 400px;
}
```

👉 Hộp ảnh **có kích thước rõ ràng**, không bị lung tung

---

## 🎨 Level 3 – Trang trí ảnh

```css
.intro .left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

🧠 Giải thích:

- `object-fit: cover` → ảnh **không méo**
- Ảnh luôn **đầy khung**

---

# 🟨 PHẦN 3: BÊN PHẢI – NỘI DUNG CHỮ

## 🎯 Phần này dùng để làm gì?

- Giải thích **học gì**
- Dành cho phụ huynh & người học đọc

---

## ✅ Level 1 – HTML

```html
<div class="right">
    <h2>VẼ HÌNH – TƯ DUY – LẬP TRÌNH</h2>

    <p class="sub-title-1">...</p>
    <p class="sub-title-2">...</p>
    <p class="sub-title-3">...</p>
</div>
```

🧒 Giải thích:

- `<h2>` = tiêu đề lớn
- `<p>` = đoạn văn
- Mỗi đoạn có **class riêng** để dễ chỉnh

---

## ✅ Level 2 – CSS (Canh chữ đẹp)

```css
.intro .right {
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
```

🧠 Giải thích:

- `padding` → chừa khoảng trống cho chữ thở
- `flex-direction: column` → chữ **xếp dọc**
- `justify-content: space-between` → chia đều khoảng cách

---

## 🎨 Level 3 – Trang trí chữ (gợi ý cho học sinh)

```css
.intro .right h2 {
    font-size: 24px;
}

.intro .right p {
    font-size: 16px;
    line-height: 1.6;
}
```

👉 Chữ **dễ đọc – không mỏi mắt**

---

# 🟥 PHẦN 4: NÚT BẤM (BUTTON)

## 🎯 Phần này dùng để làm gì?

- Dẫn người học sang bài tiếp theo
- Gây hành động: **BẮT ĐẦU HỌC**

---

## ✅ Level 1 – HTML

```html
<button class="btn-detail">BẮT ĐẦU HỌC</button>
```

🧒 Giải thích:

- `<button>` = nút bấm
- Class để CSS nhận diện

---

## ✅ Level 2 – CSS

```css
.intro .right .btn-detail {
    width: 150px;
    height: 50px;
    background-color: transparent;
    cursor: pointer;
}
```

👉 `cursor: pointer` = rê chuột vào thấy **tay chỉ**

---

## 🎨 Level 3 – Hiệu ứng hover

```css
.intro .right .btn-detail:hover {
    background-color: #000;
    color: #fff;
}
```

🧠 Giải thích:

- Khi rê chuột → nút đổi màu
- Tạo cảm giác **web “sống”**

---

# 🔗 GHÉP TẤT CẢ LẠI – TƯ DUY QUAN TRỌNG

🧩 **HTML**
→ Tạo khung, tạo hộp, tạo chữ

🎨 **CSS**
→ Sắp xếp, làm đẹp, tạo cảm xúc

🧠 **UI tốt cho người mới**

- Ít màu
- Ít chữ
- Rõ ràng
- Dễ đọc

---

## ✅ TỔNG KẾT

> 💡 Muốn làm UI:

1. Nhìn tổng thể
2. Chia thành từng phần
3. Mỗi phần: HTML → CSS → Trang trí
4. Ghép lại thành sản phẩm hoàn chỉnh

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
        <section class="intro">
            <div class="left">
                <img src="https://placehold.co/300x400" alt="Ảnh Đẹp" />
            </div>
            <div class="right">
                <h2>VẼ HÌNH – TƯ DUY – LẬP TRÌNH</h2>
                <p class="sub-title-1">
                    Không cần biết trước về máy tính hay code, bạn chỉ cần thích
                    vẽ và tò mò về công nghệ. Học chậm rãi, vui vẻ và dễ tiếp
                    cận.
                </p>
                <p class="sub-title-2">
                    Bạn sẽ học cách vẽ hình, suy nghĩ logic và biến ý tưởng
                    thành hình ảnh, chuyển động và trò chơi nhỏ.
                </p>
                <p class="sub-title-3">
                    Không cần kiến thức trước, chỉ cần yêu thích sáng tạo.
                </p>
                <button class="btn-detail">BẮT ĐẦU HỌC</button>
            </div>
        </section>
    </body>
</html>
```

```css
/* main.css */
.intro {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    display: flex;
    /* border: 1px solid #000; */
}

.intro .left {
    width: 300px;
    height: 400px;
}

.intro .left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.intro .right {
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.intro .right .btn-detail {
    width: 150px;
    height: 50px;
    background-color: transparent;
    cursor: pointer;
}

.intro .right .btn-detail:hover {
    background-color: #000;
    color: #fff;
}
```

</details>

---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Hero Section – Xây giao diện từ những phần nhỏ'
date: 2026-01-14
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_2026_01/kh-web-2026-01-hero-section-xay-giao-dien-tu-nhung-phan-nho.avif',
        alt: 'Hero Section – Xây giao diện từ những phần nhỏ',
    }
description: Trong bài này, chúng ta sẽ xây dựng Hero Section – phần mở đầu của một website. Thay vì code một giao diện lớn ngay từ đầu, ta sẽ chia nhỏ giao diện thành từng phần, hoàn thành từng phần theo level, rồi ghép lại thành một UI hoàn chỉnh.
draft: false
category: KH_WEB_2026_01
---

## 🎯 Mục tiêu bài học

Sau bài này, bạn sẽ:

- Hiểu Hero Section gồm những phần nào
- Biết **chọn thẻ HTML phù hợp**
- Biết **đặt tên class có ý nghĩa**
- Biết cách **kết nối file CSS**
- Hoàn thành **Hero Section hoàn chỉnh**

---

## 📦 Chuẩn bị: Cấu trúc HTML & CSS cơ bản

Trước khi làm UI, ta cần **khung HTML cơ bản**.

### File `index.html`

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Tiêu đề trang web</title>

        <!-- Kết nối file CSS -->
        <link rel="stylesheet" href="main.css" />
    </head>

    <body>
        <!-- Hero Section sẽ nằm ở đây -->
    </body>
</html>
```

### 📌 Giải thích nhanh

- `<head>`: chứa thông tin cho trình duyệt (không hiển thị)
- `<body>`: nơi chứa **toàn bộ UI người dùng nhìn thấy**
- `<link rel="stylesheet" href="main.css">`
  → dùng để **kết nối file CSS với HTML**

👉 Từ đây về sau, **chúng ta chỉ tập trung vào phần bên trong `<body>`**.

---

# 🧩 Phân tích Hero Section

Hero Section này gồm **4 phần nhỏ**:

1. Banner (nhãn nhỏ phía trên)
2. Headline (tiêu đề chính)
3. Sub-headline (mô tả)
4. Group Button (2 nút bấm)

👉 Mỗi phần sẽ được làm **riêng**, có **điểm bắt đầu – điểm kết thúc rõ ràng**.

---

# 🟦 PHẦN 1 – BANNER (VẼ & LẬP TRÌNH)

## 🎯 Mục tiêu

Tạo một **nhãn chữ nhỏ**, có nền màu và căn giữa.

---

## Level 1 – HTML Structure

```html
<div class="banner">
    <p>VẼ & LẬP TRÌNH</p>
</div>
```

### Giải thích

- `div`: tạo **một khối (hộp)**
- `p`: hiển thị **nội dung chữ**
- `banner`: tên class thể hiện **đây là nhãn banner**

---

## Level 2 – CSS kích thước & màu nền

```css
.banner {
    width: 190px;
    height: 50px;
    background-color: #8598cc;
}
```

### Giải thích

- `width`, `height`: kích thước hộp
- `background-color`: màu nền

---

## Level 3 – Căn giữa banner & chữ

```css
.banner {
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
}

.banner p {
    color: #fff;
}
```

### Giải thích

- `margin: 0 auto`: căn **banner ra giữa trang**
- `display: flex`: bật chế độ sắp xếp linh hoạt
- `justify-content`, `align-items`: căn chữ vào giữa hộp

✔ **Banner hoàn thành**

---

# 🟦 PHẦN 2 – HEADLINE (TIÊU ĐỀ CHÍNH)

## 🎯 Mục tiêu

Tạo **tiêu đề lớn**, trong đó **một phần chữ có màu khác**.

---

## Level 1 – HTML Structure

```html
<div class="headline">
    <h2>Nền Tảng <span>Học Vẽ & Lập Trình</span> Cho Mọi Người</h2>
</div>
```

### Giải thích

- `h2`: tiêu đề của section
- `span`: bọc **phần chữ cần tô màu**
- `headline`: nhóm nội dung tiêu đề

---

## Level 2 – CSS chữ & màu

```css
.headline {
    text-align: center;
}

.headline h2 {
    font-size: 30px;
}

.headline h2 span {
    color: #00aeef;
}
```

### Giải thích

- `text-align: center`: căn chữ ra giữa
- `font-size`: chỉnh cỡ chữ
- `span`: chỉ tô màu **một phần nội dung**

✔ **Headline hoàn thành**

---

# 🟦 PHẦN 3 – SUB-HEADLINE (MÔ TẢ)

## 🎯 Mục tiêu

Hiển thị **đoạn mô tả ngắn**, dễ đọc.

---

## Level 1 – HTML

```html
<div class="sub-headline">
    <p>
        Học vẽ – học code – rèn tư duy sáng tạo qua các dự án thú vị và bài học
        dễ hiểu
    </p>
</div>
```

---

## Level 2 – CSS căn giữa

```css
.sub-headline {
    text-align: center;
}
```

### Giải thích

- Dùng `p` cho đoạn chữ
- Căn giữa để **đồng bộ với headline**

✔ **Sub-headline hoàn thành**

---

# 🟦 PHẦN 4 – GROUP BUTTON

## 🎯 Mục tiêu

Tạo **2 nút bấm đẹp**, có hover.

---

## Level 1 – HTML Structure

```html
<div class="group-button">
    <button class="button-1">Bắt Đầu Học Ngay</button>
    <button class="button-2">Xem Nội Dung Khóa Học</button>
</div>
```

### Giải thích

- `button`: nút bấm thật
- `group-button`: nhóm các nút
- `button-1`, `button-2`: phân biệt từng nút

---

## Level 2 – CSS giao diện nút

```css
.group-button .button-1,
.group-button .button-2 {
    background-color: black;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}
```

---

## Level 3 – Khoảng cách & căn giữa

```css
.group-button {
    text-align: center;
}

.group-button .button-1 {
    margin-right: 10px;
}
```

---

## Level 4 – Hover

```css
.group-button .button-1:hover,
.group-button .button-2:hover {
    background-color: #00aeef;
}
```

### Giải thích

- `:hover`: hiệu ứng khi rê chuột
- Giúp website **có phản hồi**

✔ **Button hoàn chỉnh**

---

# 🧱 GHÉP TOÀN BỘ HERO SECTION

```html
<div>
    <div class="banner">...</div>
    <div class="headline">...</div>
    <div class="sub-headline">...</div>
    <div class="group-button">...</div>
</div>
```

👉 **Không học thêm kiến thức mới**

👉 Chỉ là **lắp các phần đã làm**

---

## ✅ Tổng kết bài học

- Website được tạo từ **những phần nhỏ**
- Mỗi phần:
    - Chọn thẻ HTML đúng
    - Đặt class rõ ràng
    - CSS vừa đủ

- Ghép lại → ra UI hoàn chỉnh

> **Học UI không phải học thuộc – mà là học cách ráp.**
